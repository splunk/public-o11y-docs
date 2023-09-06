.. _get-started-enablerelatedcontent:

*****************************************************************
Enable Related Content in Splunk Observability Cloud
*****************************************************************
Observability Cloud uses OpenTelemetry to correlate telemetry types. To enable this ability, your telemetry field names or metadata key names must exactly match the metadata key names used by OpenTelemetry and Splunk Observability Cloud.

When you deploy Splunk Distribution of Open Telemetry Collector to send your telemetry data to Observability Cloud, your metadata key names are automatically mapped correctly. When you do not use the Splunk Distribution of OpenTelemetry Collector, your telemetry data might have metadata key names that are not consistent with those used by Observability Cloud and OpenTelemetry. In that case, you must change your metadata key names.


For example, say Observability Cloud receives the following telemetry data:

- Splunk APM receives a trace with the metadata key ``trace_id: 2b78e7c951497655``

- Splunk Log Observer receives a log with the metadata key ``trace.id:2b78e7c951497655``

Although these refer to the same trace ID value, the log and the trace cannot be correlated in Observability Cloud because the field names, ``trace_id`` and ``trace.id`` do not match. In this case, rename your log metadata key ``trace.id`` to ``trace_id`` using the field copy processor in Logs Pipeline Management. Alternatively, you can re-instrument your log collection to make metadata key names align. When the field names in APM and Log Observer match, the trace and the log with the same trace ID value can be correlated in Observability Cloud. Then when you are viewing the trace in APM, you can click directly into the log with the same trace ID value and view the correlated log in Log Observer.

How to change your metadata key names
=================================================================
Metrics and traces
-----------------------------------------------------------------
Use the Splunk Distribution of OpenTelemetry Collector to ensure that your metrics and traces have the metadata key names required to use Observability Cloud's Related Content feature. If you did not use the Collector and your metrics or traces do not include the required metadata key names, you can instrument your applications and serverless functions to include them. See the following pages to learn how:

- :ref:`get-started-application`

- :ref:`instrument-serverless-functions`

- :ref:`rum-gdi`


Logs
-----------------------------------------------------------------
If the required key names use different names in your log fields, remap them using one of the methods listed in :ref:`remap-log-fields`.

The remainder of this page provides details on the required metadata fields for each view in Observability Cloud.


Splunk APM
=================================================================
To ensure full functionality of Related Content, do not change any of the metadata key names or span tags provided by the Splunk Distribution of OpenTelemetry Collector. To learn more about span tags in Splunk APM, see :ref:`apm-traces-spans`.

The Splunk Distribution of OpenTelemetry Collector provides the following APM span tags that enable Related Content:

- ``service.name``
- ``deployment.environment`` 

To learn more about deployment environments in Splunk APM, see :ref:`apm-environments`.

Leverage Related Content for pod-specific Kubernetes data
-----------------------------------------------------------------
For a Related Content tile in APM to link to data for a specific Kubernetes pod (k8s.pod.name), you must first filter on a specific Kubernetes cluster (k8s.cluster.name). APM cannot guarantee an accurate Related Content Kubernetes pod destination in Infrastructure Monitoring without both values because Kubernetes pod names are not required to be unique across clusters.

For example, consider a scenario in which Related Content needs to return data for a Kubernetes pod named :strong:`Pod-B`. As shown the following diagram, a Kubernetes implementation can have multiple pods with the same name. For Related Content to return the data for the correct :strong:`Pod-B`, you must also provide the name of the Kubernetes cluster the pod resides in. In this case, that name would be either :strong:`Cluster-West` or :strong:`Cluster-East`. This combination of filtering on cluster and pod names creates the unique combination that Related Content needs to link to the correct pod data in Infrastructure Monitoring.

.. source in figma: https://www.figma.com/file/sOEa3q92WJxB4uWb3Poftg/related-content-apm-k8s-constraint?node-id=0%3A1

.. image:: /_images/get-started/k8s-clusters-pods.png
  :width: 80%
  :alt: This diagram shows two uniquely named Kubernetes clusters, each containing pods that share names across clusters.


Splunk Infrastructure Monitoring
=================================================================
To ensure full functionality of Related Content, do not change any of the metadata key names provided by the Splunk Distribution of OpenTelemetry Collector.

The Splunk Distribution of OpenTelemetry Collector provides the following Infrastructure Monitoring metadata keys that enable Related Content:

- ``host.name``
- ``k8s.cluster.name``
- ``k8s.node.name``
- ``k8s.pod.name``
- ``container.id``
- ``k8s.namespace.name``
- ``kubernetes.workload.name``

.. _relatedcontent-log-observer:

Splunk Log Observer
=================================================================
To ensure full functionality of both Log Observer and Related Content, confirm that your log events fields are correctly mapped. Correct log field mappings enable built-in log filtering, embed logs in APM and
Infrastructure Monitoring functionality, and enable fast searches as well as the Related Content bar.

The following key names are required to enable Related Content for Log Observer:

- ``service.name``
- ``deployment.environment``
- ``host.name``
- ``trace_id``
- ``span_id``

If the key names in the preceding list use different names in your log fields, remap them to the key names listed here. For example, if you do not see values for :strong:`host.name` in the Log Observer UI, check to see whether your logs use a different field name, such as :strong:`host_name`. If your logs do not contain the default field names exactly as they appear in the preceding list, remap your logs using one of the methods in the following section. 


.. _remap-log-fields:

Methods of remapping log fields
--------------------------------------------------------------------------
The following table describes the four methods for remapping log fields:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Remapping Method`
     - :strong:`Instructions`

   * - Observability Cloud Logs Pipeline Management
     - Create and apply a field copy processor. See the
       :strong:`Field copy processors` section in 
       :ref:`logs-processors` to learn how. 
       Note: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can use this method. If you are using Log Observer Connect, use one of other methods in this table.

   * - Log Field Aliasing
     - Create and activate a field alias. See :ref:`logs-alias` to learn how. Learn when to use Log Field Aliasing in the next section.

   * - Client-side
     - Configure your app to remap the necessary fields.

   * - Collector-side
     - Use a Fluentd or FluentBit configuration. See
       :ref:`Configure Fluentd to send logs <fluentd>` to learn how.

When to use Log Field Aliasing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use Log Field Aliasing to remap fields in Observability Cloud when you cannot or do not want to create a copy processor because any of the following are true:

- You use Log Observer Connect to get logs data and do not have access to Log Observer Pipeline Management

- You do not want to use indexing capacity by creating additional log processing rules

- You do not want to transform your data at index time

- You want the new alias to affect every log message, even those that came in from a time before you created the alias.


Kubernetes log fields
--------------------------------------------------------------------------
Do not change the following fields, which Splunk Distribution of OpenTelemetry Collector injects into your Kubernetes logs:

- ``k8s.cluster.name``
- ``k8s.node.name``
- ``k8s.pod.name``
- ``container.id``
- ``k8s.namespace.name``
- ``kubernetes.workload.name``


Using Observability Collector for Kubernetes
----------------------------------------------------------------------------

For Kubernetes environments, instead of changing existing Fluentd configuration, you can install a configured agent provided as a helm chart. It goes with a configured Fluentd agent and OpenTelemetry collector for collecting logs, metrics, and traces with all metadata relevant to Kubernetes.

To learn more about Observability Collector for Kubernetes, see :new-page:`Observability Collector for Kubernetes helm chart <https://github.com/signalfx/o11y-collector-for-kubernetes>` on GitHub.


