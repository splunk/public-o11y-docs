.. _kubernetes-objects-receiver:

****************************
Kubernetes objects receiver
****************************

.. meta::
      :description: Collects objects from the Kubernetes API server. Supports authentication through service accounts only.

The Kubernetes cluster receiver collects cluster metrics using the Kubernetes API server. You can use a single instance of this receiver to monitor an entire Kubernetes cluster. The supported pipeline type is ``metrics``. To filter in or out other Kubernetes elements, such as containers, pods, nodes, namespaces, or clusters, use the Filter processor instead. Learn more at :ref:`filter-processor`. See :ref:`otel-data-processing` for more information on the different types of pipelines.

Kubernetes version 1.21 and higher is compatible with the Kubernetes navigator. Using lower versions of Kubernetes is not supported for this receiver and might result in the navigator not displaying all clusters.

Get started
======================

By default, the Kubernetes cluster receiver is already activated in the Helm chart of the Splunk OpenTelemetry Collectors. See :ref:`otel-kubernetes-config` for more information.

To activate the Kubernetes cluster receiver manually in the Collector configuration, add ``k8s_cluster`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

   receivers:
     k8s_cluster:
       auth_type: kubeConfig
       collection_interval: 30s
       node_conditions_to_report: ["Ready", "MemoryPressure"]
       allocatable_types_to_report: ["cpu","memory"]
       metadata_exporters: [signalfx]

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [k8s_cluster]

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

.. include:: /_includes/troubleshooting-components.rst


