.. _kubernetes-cluster-receiver:

Kubernetes Cluster receiver
****************************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the Kubernetes Cluster / k8s-cluster receiver. See benefits, install, configuration, and metrics.

The Kubernetes Cluster Receiver, ``k8s_cluster``, collects cluster-level
metrics from the Kubernetes API server. The receiver uses the Kubernetes
API to listen for updates. A single instance of this receiver can be
used to monitor a cluster.

This receiver is a native OpenTelemetry receiver and replaces the
``kubernetes-cluster`` SignalFx Smart Agent monitor.

.. note:: This receiver is in beta and configuration fields are subject to change.

Installation
==========================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

.. note:: Kubernetes version 1.21 and higher are compatible with the Kubernetes navigator. Using lower versions of Kubernetes is not fully supported for this receiver and may result in the navigator not displaying all clusters.

Configuration
==========================

Use the following example configuration to activate this receiver in the
Collector:

.. code:: yaml

   receivers:
     k8s_cluster:
       auth_type: kubeConfig
       collection_interval: 30s
       node_conditions_to_report: ["Ready", "MemoryPressure"]
       allocatable_types_to_report: ["cpu","memory"]
       metadata_exporters: [signalfx]

The following table shows the required and optional settings:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://github.com/splunk/collector-config-tools/raw/main/cfg-metadata/receiver/k8s_cluster.yaml"></div>

metadata_exporters
---------------------------------------

Sync the receiver with the metadata exporters you want to use to collect
metadata. Exporters specified in this list need to implement the
following interface. If an exporter doesn't implement the interface,
startup fails.

.. code:: yaml

   type MetadataExporter interface {
     ConsumeMetadata(metadata []*MetadataUpdate) error
   }

   type MetadataUpdate struct {
     ResourceIDKey string
     ResourceID    ResourceID
     MetadataDelta
   }

   type MetadataDelta struct {
     MetadataToAdd    map[string]string
     MetadataToRemove map[string]string
     MetadataToUpdate map[string]string
   }

node_conditions_to_report
----------------------------------------

Use the following configuration to have the ``k8s_cluster`` receiver
emit two metrics, ``k8s.node.condition_ready`` and
``k8s.node.condition_memory_pressure``, one for each condition in the
configuration. The value is ``1`` if the ``ConditionStatus`` for the
corresponding ``Condition`` is ``True``, ``0`` if it is ``False``, and
``-1`` if it is ``Unknown``.

.. code:: yaml

   # ...
   k8s_cluster:
     node_conditions_to_report:
       - Ready
       - MemoryPressure
   # ...

To learn more, search for “Conditions” on the Kubernetes documentation
site.

Configure with the SignalFx Exporter
====================================================

The following example shows a deployment of the Collector that sets up
the ``k8s_cluster`` receiver along with the SignalFx Metrics Exporter.

This example shows how to set up the following Kubernetes resources that
are required for the deployment:

-  ConfigMap
-  Service account
-  RBAC
-  Deployment

ConfigMap
-----------------

Create a ConfigMap with the configuration for ``otelcontribcol``.
Replace ``SIGNALFX_TOKEN`` and ``SIGNALFX_REALM`` with valid values.

.. code:: bash

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
         k8s_cluster:
           collection_interval: 10s
           metadata_exporters: [signalfx]
       exporters:
         signalfx:
           access_token: <SIGNALFX_TOKEN>
           realm: <SIGNALFX_REALM>

       service:
         pipelines:
           metrics:
             receivers: [k8s_cluster]
             exporters: [signalfx]
   EOF

Service account
-----------------------

Create a service account for the Collector:

.. code:: bash

   <<EOF | kubectl apply -f -
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     labels:
       app: otelcontribcol
     name: otelcontribcol
   EOF

Role-based access control (RBAC)
----------------------------------------------

Create a ``ClusterRole`` with required permissions:

.. code:: bash

   <<EOF | kubectl apply -f -
   apiVersion: rbac.authorization.k8s.io/v1beta1
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
     - namespaces
     - namespaces/status
     - nodes
     - nodes/spec
     - pods
     - pods/status
     - replicationcontrollers
     - replicationcontrollers/status
     - resourcequotas
     - services
     verbs:
     - get
     - list
     - watch
   - apiGroups:
     - apps
     resources:
     - daemonsets
     - deployments
     - replicasets
     - statefulsets
     verbs:
     - get
     - list
     - watch
   - apiGroups:
     - extensions
     resources:
     - daemonsets
     - deployments
     - replicasets
     verbs:
     - get
     - list
     - watch
   - apiGroups:
     - batch
     resources:
     - jobs
     - cronjobs
     verbs:
     - get
     - list
     - watch
   - apiGroups:
       - autoscaling
     resources:
       - horizontalpodautoscalers
     verbs:
       - get
       - list
       - watch
   EOF

Create a ``ClusterRoleBinding`` to grant the role to the service account
created in the service account example:

.. code:: bash

   <<EOF | kubectl apply -f -
   apiVersion: rbac.authorization.k8s.io/v1beta1
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
----------------------------------------------

Create a deployment to the Collector:

.. code:: bash

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

Metrics
=================

The following table shows the legacy metrics that are available for this
integration. See `OpenTelemetry values and their legacy
equivalents <https://docs.splunk.com/Observability/gdi/opentelemetry/legacy-otel-mappings.html#opentelemetry-values-and-their-legacy-equivalents>`__
for the Splunk Distribution of OpenTelemetry Collector equivalents.

.. raw:: html

   <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/kubernetes/cluster/metadata.yaml"></div>

Get help
--------

.. include:: /_includes/troubleshooting-components.rst
