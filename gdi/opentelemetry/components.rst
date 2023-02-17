.. _otel-components:

******************************************
Components
******************************************

.. meta::
    :description: Learn about the components that make up the Splunk Observability Cloud OpenTelemetry Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    opentelemetry-exporters.rst
    data-processing.rst

The OpenTelemetry Collector is made up of the following components:

* Receivers: How to get data in. Receivers can be push or pull based. See :ref:`monitor-data-sources` for the list of receivers.
* Processors: What to do with received data.
* Exporters: Where to send received data. Exporters can be push or pull based. See :ref:`otel-exporters` for the list of exporters.
* Extensions: Provide capabilities on top of the primary functionality of the Splunk Distribution of OpenTelemetry Collector.

You can enable these components through :ref:`pipelines <otel-data-processing>`. 

.. :note::

  See :ref:`otel-configuration` to learn how to define multiple instances of components as well as pipelines.

The Splunk Distribution of OpenTelemetry Collector offers support for the components described in the following tables.

.. _collector-components-receivers:

.. raw:: html

  <embed>
    <h2>Receivers</h2>
  </embed>

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Name
     - Description
     - Supported pipeline type
   * - ``fluentforward``
     - Runs a TCP server that accepts events through the Fluentd Forward protocol.
     - Logs
   * - :ref:`host-metrics-receiver` (``hostmetrics``)
     - Generates metrics about the host system scraped from various sources. Use this receiver when the Collector is deployed as an agent. 
     - Metrics
   * - ``jaeger``
     - Receives trace data in Jaeger format.
     - Traces
   * - :ref:`kubernetes-cluster-receiver` (``k8s_cluster``)
     - Collects cluster-level metrics from the Kubernetes API server. It uses the Kubernetes API to listen for updates. You can use a single instance of this receiver to monitor a cluster.
     - Metrics
   * - :ref:`kubelet-stats-receiver` (``kubeletstats``)
     - Pulls pod metrics from the API server on a kubelet.
     - Metrics
   * - ``otlp``
     - Receives data through gRPC or HTTP using OTLP format.
     - Metrics, logs, traces
   * - ``receiver_creator``
     - Instantiates other receivers at runtime based on whether observed endpoints match a configured rule. To use the receiver creator, you must first configure one or more observer extensions to discover networked endpoints that you might be interested in.
     - N/A
   * - :ref:`splunk-apm-exporter` (``sapm``)
     - Builds on the Jaeger proto. Use this exporter to receive traces from other collectors.
     - Traces
   * - ``signalfx``
     - Accepts metrics and logs in the proto format.
     - Metrics, logs
   * - ``prometheus_simple``
     - Provides a simple configuration interface to configure the Prometheus receiver to scrape metrics from a single target.
     - Metrics
   * - :ref: `smartagent <migration-monitors>` (``smartagent``)
     - Utilizes the existing Smart Agent monitors as OpenTelemetry Collector metric receivers.
     - Metrics
   * - ``splunk_hec``
     - Accepts metrics in the Splunk HEC format.
     - Metrics, logs, traces
   * - ``zipkin``
     - Receives spans from Zipkin versions 1 and 2.
     - Traces

.. _collector-components-processors:

.. raw:: html

  <embed>
    <h2>Processors</h2>
  </embed>

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Name
     - Description
     - Supported pipeline type
   * - ``attributes``
     - Modifies attributes of a span or log record.
     - Logs, traces
   * - ``batch``
     - Accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. This processor supports both size-based and time-based batching.
     - Metrics, logs, traces
   * - ``groupbyattrs``
     - Reassociates spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are "grouped" under the same resource.
     - Metrics, logs, traces
   * - ``filter``
     - Can be configured to include or exclude metrics based on metric name in the case of the ``strict`` or ``regexp`` match types, or based on other metric attributes in the case of the ``expr`` match type.
     - Metrics
   * - ``k8s_tagger``
     - Allows automatic tagging of spans, metrics, and logs with Kubernetes metadata.
     - Metrics, logs, traces
   * - ``memorylimiter``
     - Prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector.
     - Metrics, logs, traces
   * - ``metricstransform``
     - Renames metrics, and adds, renames, or deletes label keys and values.
     - Metrics
   * - ``probabilisticsampler``
     - Provides samples based on hash values determined by trace IDs.
     - Traces
   * - ``resource``
     - Applies changes to resource attributes. Attributes represent actions that can be applied on resources. OpenCensus has defined  standard attributes for resources, including services, environments, and hosts. Do not change the host name, as this can cause issues with infrastructure correlation. 
     - Metrics, logs, traces
   * - ``resourcedetection``
     - Detects resource information from the host, in a format that conforms to the OpenTelemetry resource semantic conventions, and appends or overrides the resource value in telemetry data with this information.
     - Metrics, logs, traces
   * - ``routing``
     - Reads a header from the incoming HTTP request (gRPC or plain HTTP) or reads a resource attribute, and then directs the trace information to specific exporters based on the value read.
     - Metrics, logs, traces
   * - ``span``
     - Modifies either the span name or attributes of a span based on the span name.
     - Traces

.. _collector-components-exporters:

.. raw:: html

  <embed>
    <h2>Exporters</h2>
  </embed>

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Name
     - Description
     - Supported pipeline type
   * - ``file``
     - Writes pipeline data to a JSON file. The data is written in Protobuf JSON encoding using OpenTelemetry protocol. 
     - Metrics, logs, traces
   * - ``logging``
     - Exports data to the console through zap.Logger. This exporter does not send its output to Windows Event Viewer by default. Run the Splunk Distribution of OpenTelemetry Collector directly from the PowerShell terminal to send output to Windows Event Viewer.
     - Metrics, logs, traces
   * - ``otlp``
     - Exports data through gRPC using OTLP format. By default, this exporter requires TLS and offers queued retry capabilities. 
     - Metrics, traces
   * - ``otlphttp``
     - Exports traces and/or metrics via HTTP using OTLP format. 
     - Metrics, traces
   * - ``sapm``
     - Builds on the Jaeger proto and adds additional batching on top, which allows the Splunk Distribution of OpenTelemetry Collector to export traces from multiple nodes or services in a single batch. 
     - Traces
   * - ``signalfx``
     - Sends metrics, events, and trace correlation to Infrastructure Monitoring. 
     - Logs (events), metrics, traces (trace to metric correlation only)
   * - ``splunk_hec``
     - Sends metrics to a Splunk HEC endpoint. 
     - Metrics, logs, traces

.. _collector-components-extensions:

.. raw:: html

  <embed>
    <h2>Extensions</h2>
  </embed>

.. list-table::
   :widths: 50 50
   :header-rows: 1

   * - Name
     - Description
   * - ``docker_observer``
     - Detects and reports container endpoints discovered through the Docker API. Only containers that are in the state of ``Running`` and not ``Paused`` emit endpoints. docker_observer watches the Docker engine's stream of events to dynamically create, update, and remove endpoints as events are processed. 
   * - ``ecs_observer``
     - Uses the ECS/EC2 API to discover Prometheus scrape targets from all running tasks and filter them based on service names, task definitions, and container labels. If you run the Collector as a sidecar, consider using the ECS resource detector instead of the ECS observer. The ECS resource detector does not have services or EC2 instances because it only queries the local API.
   * - ``healthcheck``
     - Enables an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. You can use this extension as a liveness or readiness probe on Kubernetes.
   * - ``httpforwarder``
     - Accepts HTTP requests and optionally adds headers to them and forwards them. The RequestURIs of the original requests are preserved by the extension. 
   * - ``host_observer``
     - Looks at the current host for listening network endpoints. Uses the /proc filesystem and requires the SYS_PTRACE and DAC_READ_SEARCH capabilities so that it can determine what processes own the listening sockets. 
   * - ``k8s_observer``
     - Uses the Kubernetes API to discover pods running on the local node. This extension assumes the Splunk Distribution of OpenTelemetry Collector is deployed in Agent mode where it is running on each individual node or host instance. 
   * - ``pprof``
     - Enables the golang ``net/http/pprof`` endpoint, which is typically used by developers to collect performance profiles and investigate issues with the service.
   * - ``smartagent``
     - Provides a mechanism to specify configuration options that are not specific only to a single instance of the Smart Agent Receiver but are applicable to all instances. This component provides a means of migrating your existing Smart Agent configuration to the Splunk Distribution of OpenTelemetry Collector. 
   * - ``zpages``
     - Enables an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components that were properly instrumented for such. 

.. raw:: html

  <embed>
    <h2>Next steps</h2>
  </embed>

Read on to learn how to:

* :ref:`otel-install-platform`.
* :ref:`otel-configuration`.

.. note::
  Docs on each component are coming! In the meantime, find additional information in the :new-page:`Splunk Distribution of OpenTelemetry Collector GitHub repository <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/components.md>`. 