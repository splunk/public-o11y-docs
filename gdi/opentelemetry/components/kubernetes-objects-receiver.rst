.. _kubernetes-objects-receiver:

****************************
Kubernetes objects receiver
****************************

.. meta::
      :description: Collects objects from the Kubernetes API server. Supports authentication through service accounts only.

The Kubernetes Objects receiver collects objects from the Kubernetes API server.

Currently this receiver supports authentication via service accounts only. 

Get started
======================

To activate the Kubernetes Objects receiver manually in the Collector configuration, add ``k8sobjects`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

   k8sobjects:
     auth_type: serviceAccount
     objects:
       - name: pods
         mode: pull
         label_selector: environment in (production),tier in (frontend)
         field_selector: status.phase=Running
         interval: 15m
       - name: events
         mode: watch
         group: events.k8s.io
         namespaces: [default]

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [k8objects]

Main settings
--------------------------------------

These are the main configuration properties:

* auth_type (default = serviceAccount): Determines how to authenticate to the K8s API server. This can be one of none (for no auth), serviceAccount (to use the standard service account token provided to the agent pod), or kubeConfig to use credentials from ~/.kube/config.

* name: Name of the resource object to collect

* mode: define in which way it collects this type of object, either "poll" or "watch".

  * pull mode will read all objects of this type use the list API at an interval.

  * watch mode will do setup a long connection using the watch API to just get updates.

* label_selector: select objects by label(s)

* field_selector: select objects by field(s)

* interval: the interval at which object is pulled, default 60 minutes. Only useful for pull mode.

* exclude_watch_type: allows excluding specific watch types. Valid values are ADDED, MODIFIED, DELETED, BOOKMARK, and ERROR. Only usable in watch mode.

* resource_version allows watch resources starting from a specific version (default = 1). Only available for watch mode. If not specified, the receiver will do an initial list to get the resourceVersion before starting the watch. See Efficient Detection of Change for details on why this is necessary.

* namespaces: An array of namespaces to collect events from. (default = all)

* group: API group name. It is an optional config. When given resource object is present in multiple groups, use this config to specify the group to select. By default, it will select the first group. For example, events resource is available in both v1 and events.k8s.io/v1 APIGroup. In this case, it will select v1 by default.

See more at :ref:`kubernetes-objects-receiver-settings`.

Configure the resources for the Kubernetes deployment
==================================================================

Follow these sections to set up the various Kubernetes resources required for the deployment.

Configuration
--------------------------------------

Create a ConfigMap with the config for otelcontribcol. Replace OTLP_ENDPOINT with valid value.

.. code-block:: yaml

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
data:
  config.yaml: |
    receivers:
      k8sobjects:
        objects:
          - name: pods
            mode: pull
          - name: events
            mode: watch
    exporters:
      otlp:
        endpoint: <OTLP_ENDPOINT>
        tls:
          insecure: true

    service:
      pipelines:
        logs:
          receivers: [k8sobjects]
          exporters: [otlp]
EOF

Service account
--------------------------------------

Create a service account for the Collector to use.

.. code-block:: yaml

   <<EOF | kubectl apply -f -
   apiVersion: v1
   kind: ServiceAccount
   metadata:
      labels:
         app: otelcontribcol
      name: otelcontribcol

RBAC
--------------------------------------

Use the below commands to create a ClusterRole with required permissions and a ClusterRoleBinding to grant the role to the service account created above. Following config will work for collecting pods and events only. You need to add appropriate rule for collecting other objects.

When using watch mode you must also specify list verb so that the receiver has permission to do its initial list if no resource_version was supplied or a list to recover from 410 Gone scenarios.

.. code-block:: yaml

<<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
rules:
- apiGroups:
  - ""
  resources:
  - events
  - pods
  verbs:
  - get
  - list
  - watch
- apiGroups: 
  - "events.k8s.io"
  resources:
  - events
  verbs:
  - watch
  - list
EOF
<<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otelcontribcol
subjects:
- kind: ServiceAccount
  name: otelcontribcol
  namespace: default
EOF

Deployment
--------------------------------------

Create a Deployment to deploy the Collector. Deploy the Kubernetes Objects receiver as one replica, otherwise it'll produce duplicated data.

.. code-block:: yaml

   <<EOF | kubectl apply -f -
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: otelcontribcol
     labels:
        app: otelcontribcol

   spec:
      replicas: 1
      selector:
         matchLabels:
         app: otelcontribcol
   template:
      metadata:
         labels:
            app: otelcontribcol
      spec:
         serviceAccountName: otelcontribcol
         containers:
         - name: otelcontribcol
           image: otelcontribcol:latest # specify image
           args: ["--config", "/etc/config/config.yaml"]
           volumeMounts:
           - name: config
             mountPath: /etc/config
           imagePullPolicy: IfNotPresent
         volumes:
           - name: config
             configMap:
               name: otelcontribcol

   EOF

.. _kubernetes-objects-receiver-settings:

Settings
======================

The following table shows the configuration options for the receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/k8sobjects.yaml"></div>

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/k8sobjectsreceiver.yaml"></div>

Troubleshooting
======================

Ensure resources are allocated
--------------------------------------

If the receiver returns an error similar to the one below, make sure that ``resource`` is added to ``ClusterRole``.

.. code-block:: yaml

   {"kind": "receiver", "name": "k8sobjects", "pipeline": "logs", "resource": "events.k8s.io/v1, Resource=events", "error": "unknown"}

General troubleshooting
-----------------------------

.. include:: /_includes/troubleshooting-components.rst


