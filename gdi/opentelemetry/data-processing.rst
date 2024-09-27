.. _otel-data-processing:

*********************************************************************
Process your data with pipelines 
*********************************************************************

.. meta::
      :description: Learn how to process data collected with the Splunk Distribution of the OpenTelemetry Collector.

Use pipelines in your Collector's config file to define the path you want your ingested data to follow. Specify which components you want to use, starting from data reception using :ref:`receivers <otel-components-receivers>`, then data processing or modification with :ref:`processors <otel-components-processors>`, until data finally exits the Collector through :ref:`exporters <otel-components-exporters>`. For an overview of all available components and theire behavior refer to :ref:`otel-components`.

Pipelines operate on three data types: logs, traces, and metrics. To learn more about data in Splunk Observability Cloud, see :ref:`data-model`.

.. note:: See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`.

Define the pipeline
=========================================

The pipeline is constructed during Collector startup based on your Collector's config file. 

See more at:

* :ref:`Collector for Kubernetes <collector-kubernetes-intro>`
* :ref:`Collector for Linux <collector-linux-intro>`
* :ref:`Collector for Windows <collector-windows-intro>`   

The following applies:

* You need to specify a data type in your pipeline configuration. All the receivers, exporters, and processors you use in a pipeline must support the particular data type, otherwise you'll get the ``ErrDataTypeIsNotSupported`` error message when the configuration is loaded. 

* A pipeline can contain one or more receivers. 

* Data from all receivers is pushed to the first processor, which performs processing on it and then pushes it to the next processor and so on until the last processor in the pipeline uses a data fan-out connector to fan out (distribute) the data to multiple exporters.

  * Note that some types of processor "mutate" (duplicate) data before they pass it on to the next processor.

* If a pipeline uses more than one exporter, each exporter receives a copy of each data element from the last processor.
  
  * In case of failure, the rest of exporters continue to work independently. 

  * You can configure exporters to "mutate" (duplicate) the data they receive. In the Splunk OTel Collector this option is not enabled. 

Connect pipelines with connectors
--------------------------------------------------------------------

You can use connectors to connect two pipelines. Connectors consume data as an exporter at the end of one pipeline and emit data as a receiver at the start of another pipeline. They can consume and emit data of the same data type, or of different data types. Use connectors to generate and emit data which summarizes the data you've already consumed, or to simply replicate or route data. 

Learn more at:ref:`otel-components-connectors`.

Example of a pipeline configuration
--------------------------------------------------------------------

A pipeline configuration typically looks like this:

.. code-block:: yaml

  service:
    pipelines:
    # Pipelines can contain multiple subsections, one per pipeline.
      traces:
      # Traces is the pipeline type.
        receivers: [otlp, jaeger, zipkin]
        processors: [memory_limiter, batch]
        exporters: [otlp, splunk_hec, jaeger, zipkin]

This example defines a pipeline for ``traces``, with three receivers, two processors, and four exporters. The following table describes the receivers, processors, and exporters used in this example. 

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Component
     - Description
     - Pipeline type
   * - Receiver
     - ``otlp``: Receives data through gRPC or HTTP using OTLP format.
     - Traces, metrics, logs
   * - Receiver
     - ``jaeger``: Receives trace data in Jaeger format.
     - Traces
   * - Receiver
     - ``zipkin``: Receives spans from Zipkin (V1 and V2).
     - Traces
   * - Processor
     - ``memory_limiter``: Prevents out of memory situations.
     - Metrics, traces, logs
   * - Processor
     - ``batch``: Accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data.
     - Metrics, traces, logs
   * - Exporter
     - ``otlp``: Exports data through gRPC using OTLP format. By default, this exporter requires TLS and offers queued retry capabilities.
     - Traces, metrics
   * - Exporter
     - ``HEC``: Sends data to Splunk HTTP Event Collector (HEC) endpoints.
     - Metrics, logs     
   * - Exporter
     - ``jaeger``: Exports data through gRPC to Jaeger destinations. By default, this exporter requires TLS and offers queued retry capabilities.
     - Traces
   * - Exporter
     - ``zipkin``: Exports data to a Zipkin server. By default, this exporter requires TLS and offers queued retry capabilities.
     - Traces

Metadata transformations
============================================

Metadata refers to the name/value pair added to telemetry data. In the OpenTelemetry data model, tags are provided as attributes. After Splunk Observability Cloud ingests traces with attributes, these are available as tags. Alternatively, you could use attributes to create Monitoring Metric Sets, which can be used to drive alerting. Learn more at :ref:`otel-tags`.

.. _pipelines-next:

Next steps: See and manage the data you ingested
==================================================================================

After you've ingested and processed your data using the Collector, you can see the final, exported version in Splunk Observability Cloud. 

See and manage logs
---------------------------------------

To see and manage your logs, use :ref:`lo-connect-landing`.

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement. Learn more in :ref:`logs-logs`.

See and manage metrics
---------------------------------------

Splunk Observability Cloud offers several tools to track and manage your metrics:

* :ref:`metrics-finder-and-metadata-catalog`.
* See :ref:`metrics-pipeline` to manage metrics. 
* See also :ref:`org-metrics` for metrics generated by Splunk Observability Cloud. 

See and manage spans, traces, and tags
---------------------------------------

See :ref:`apm-traces-spans` and :ref:`otel-tags`.
