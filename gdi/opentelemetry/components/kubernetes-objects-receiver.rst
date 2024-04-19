.. _kubernetes-objects-receiver:

****************************
Kubernetes objects receiver
****************************

.. meta::
      :description: Collects objects from the Kubernetes API server. Supports authentication through service accounts only.

The Kubernetes Objects receiver collects objects from the Kubernetes API server. The supported pipeline is ``logs``. See :ref:`otel-data-processing` and :ref:`kubernetes-config-logs` for more information.

.. note:: This receiver supports authentication via service accounts only at the moment. 

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

To complete the configuration, include the receiver in the ``logs`` pipelines of the ``service`` section of your configuration file. For example:

.. code:: yaml

    {{- if and (eq (include "splunk-otel-collector.objectsEnabled" .) "true") (eq (include "splunk-otel-collector.logsEnabled" .) "true") }}
    logs/objects:
      receivers:
        - k8sobjects

Main settings
--------------------------------------

These are the main configuration properties:

* ``auth_type``. ``serviceAccount`` by default. Determines how to authenticate to the Kubernetes API server. Values include none (for no authentication), ``serviceAccount`` (to use the standard service account token provided to the agent pod), or ``kubeConfig`` to use credentials from ``~/.kube/config``.

* ``name``. Name of the resource object to collect.

* ``mode``. Defines how the object is collected:

  * ``pull`` mode reads all objects of this type that use the list API at an interval.

  * ``watch`` mode sets up a long connection using the watch API to just get updates.

* ``label_selector``. Select objects by label(s).

* ``field_selector``. Select objects by field(s).

* ``interval``. ``60m`` (minutes) by default. In ``pull`` mode, the interval at which the object is pulled. 

* ``exclude_watch_type``. In ``watch`` mode, it allows excluding specific watch types. Valid values are ``ADDED``, ``MODIFIED``, ``DELETED``, ``BOOKMARK``, and ``ERROR``. 

* ``resource_version``. ``1`` by default. In ``watch`` mode, it allows watch resources starting from a specific version. If not specified, the receiver will do an initial list to get the ``resourceVersion`` before starting the watch. See Kubernetes' :new-page:`Efficient Detection of Change <https://kubernetes.io/docs/reference/using-api/api-concepts/#efficient-detection-of-changes>` for details on why this is necessary.

* ``namespaces``. ``all`` by default. An array of namespaces to collect events from. 

* ``group``. Optional. API group name. When a given resource object is present in multiple groups, use this field to specify which group to select. By default, it selects the first group. 

  * For example, if the ``events`` resource is available in both the ``v1`` and ``events.k8s.io/v1`` APIGroup, it will select ``v1`` by default.

See more at :ref:`kubernetes-objects-receiver-settings`.

Configure the resources for the Kubernetes deployment
==================================================================

Follow these sections to set up the various Kubernetes resources required to deploy the Collector with the receiver.

Configuration
--------------------------------------

Create a ConfigMap with the config for ``otelcontribcol``, replacing ``OTLP_ENDPOINT`` with a valid value.

.. code-block:: yaml

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

Service account
--------------------------------------

Create a service account for the Collector to use.

.. code-block:: yaml

   apiVersion: v1
   kind: ServiceAccount
   metadata:
      labels:
         app: otelcontribcol
      name: otelcontribcol

Role-based access control (RBAC)
--------------------------------------

Use the commands in this section to create a ``ClusterRole`` with the required permissions and a ``ClusterRoleBinding`` to grant the role to the service account created in the previous section. 

.. note:: This example will only collect pods and events. To collect other objects, add the appropriate rules.

When using ``watch`` mode you must also specify the ``list`` verb so that the receiver has permission to do its initial list if no ``resource_version`` was supplied, or use a list to recover from 410 Gone scenarios. Learn more in the official Kubernetes documentation at :new-page:`"410 Gone" responses <https://kubernetes.io/docs/reference/using-api/api-concepts/#410-gone-responses>`. 

.. code-block:: yaml

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

.. code-block:: yaml

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

Deployment
--------------------------------------

Deploy the Collector with the Kubernetes Objects receiver as one replica, otherwise it'll produce duplicated data.

.. code-block:: yaml

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

.. _kubernetes-objects-receiver-settings:

Settings
======================

The following table shows the configuration options for the receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/k8sobjects.yaml"></div>

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


