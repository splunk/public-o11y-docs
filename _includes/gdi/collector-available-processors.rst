.. list-table::
   :widths: 25 55 20
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - :ref:`attributes-processor` (``attributes``)
     - Modifies attributes of a span or log record.
     - Logs, traces
   * - :ref:`batch-processor` (``batch``)
     - Accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. This processor supports both size-based and time-based batching.
     - Metrics, logs, traces
   * - :ref:`cumulative-to-delta-processor` (``cumulativetodelta``)
     - Convert cumulative monotonic metrics to delta aggregation temporality. This enhances the usage of cumulative metrics in Splunk Observability Cloud.
     - Metrics
   * - :ref:`filter-processor` (``filter``)
     - Can be configured to include or exclude metrics based on metric name in the case of the ``strict`` or ``regexp`` match types, or based on other metric attributes in the case of the ``expr`` match type.
     - Metrics
   * - :ref:`groupbyattrs-processor` (``groupbyattrs``)
     - Reassociates spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource.
     - Metrics, logs, traces
   * - :ref:`kubernetes-attributes-processor` (``k8sattributes``)
     - Allows automatic tagging of spans, metrics, and logs with Kubernetes metadata. Formerly known as ``k8s_tagger``.
     - Metrics, logs, traces
   * - :ref:`memory-limiter-processor` (``memory_limiter``) 
     - Prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector.
     - Metrics, logs, traces
   * - :ref:`metrics-transform-processor` (``metricstransform``) 
     - Renames metrics, and adds, renames, or deletes label keys and values.
     - Metrics
   * - :ref:`probabilistic-sampler-processor` (``probabilisticsampler``) 
     - Supports several modes of sampling for spans and log records.
     - Traces, logs
   * - :ref:`redaction-processor` (``redaction``)
     - Deletes span attributes that don't match a list of allowed attributes. It also masks span attribute values that match a blocked value list.
     - Traces
   * - :ref:`resource-processor` (``resource``)
     - Applies changes to resource attributes. Attributes represent actions that can be applied on resources.
     - Metrics, logs, traces
   * - :ref:`resourcedetection-processor` (``resourcedetection``)
     - Detects resource information from the host, in a format that conforms to the OpenTelemetry resource semantic conventions, and appends or overrides the resource value in telemetry data with this information.
     - Metrics, logs, traces
   * - :ref:`routing-processor` (``routing``) 
     - Reads a header from the incoming HTTP request or reads a resource attribute, and then directs the trace information to specific exporters based on the value.
     - Metrics, logs, traces
   * - :ref:`span-processor` (``span``)
     - Modifies either the span name or attributes of a span based on the span name.
     - Traces
   * - :ref:`tail-sampling-processor` (``tail_sampling``) 
     - Samples traces based on a set of defined policies. All spans for a given trace must be received by the same Collector instance for effective sampling decisions.
     - Traces
   * - :ref:`transform-processor` (``transform``)
     - Modifies telemetry based on OpenTelemetry Transformation Language functions.
     - Metrics, logs, traces