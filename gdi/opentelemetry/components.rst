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

    components/attributes-processor
    components/batch-processor
    components/databricks-receiver
    components/filter-processor
    components/host-metrics-receiver
    components/kubelet-stats-receiver
    components/kubernetes-cluster-receiver
    components/mongodb-atlas-receiver
    components/oracledb-receiver
    components/prometheus-receiver
    components/receiver-creator-receiver
    components/splunk-apm-exporter
    components/splunk-hec-exporter
    components/splunk-hec-receiver

The OpenTelemetry Collector includes the following component types:

* Receivers: Get data into the Collector from multiple sources.
* Processors: Perform operations on data before it's exported. For example, filtering.
* Exporters: Send data to one or more back ends or destinations. 
* Extensions: Extend the capabilities of the Collector.

You can activate components by configuring :ref:`pipelines <otel-data-processing>` in the Collector configuration. See :ref:`otel-configuration` to learn how to define multiple instances of components as well as their pipelines.

The Splunk Distribution of OpenTelemetry Collector includes and supports the following components.

.. _collector-components-receivers:

.. raw:: html

  <embed>
    <h2>Receivers<a name="collector-components-receivers" class="headerlink" href="#collector-components-receivers" title="Permalink to this headline">¶</a></h2>
  </embed>

.. list-table::
   :widths: 25 50 25
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - ``azureeventhub``
     - Pulls logs from an Azure event hub.
     - Logs
   * - ``carbon``
     - Receives metrics in Carbon plaintext protocol.
     - Metrics
   * - ``cloudfoundry``
     - Connects to the Reverse Log Proxy (RLP) gateway of Cloud Foundry to extract metrics.
     - Metrics
   * - ``collectd``
     - Receives data exported through the CollectD ``write_http`` plugin. Only supports the JSON format.
     - Metrics
   * - :ref:`databricks_receiver` (``databricks``)
     - Uses the Databricks API to generate metrics about the operation of a Databricks instance.
     - Metrics
   * - ``discovery``
     - Tests the functional status of any receiver whose targed is reported by an observer extension.
     - Logs
   * - ``filelog``
     - Tails and parses logs from files.
     - Logs
   * - ``fluentforward``
     - Runs a TCP server that accepts events through the Fluentd Forward protocol.
     - Logs
   * - :ref:`host-metrics-receiver` (``hostmetrics``)
     - Generates system metrics from various sources. Use this receiver when deploying the Collector as an agent. 
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
   * - :ref:`mongodb-atlas-receiver` (``mongodbatlas``)
     - Retrieves metrics from MongoDB Atlas using their monitoring APIs.
     - Metrics
   * - :ref:`oracledb` (``oracledb``)
     - Connects to an Oracle Database instance and obtains metrics such as physical reads, CPU, time, and others.
     - Metrics
   * - ``otlp``
     - Receives data through gRPC or HTTP using OTLP format.
     - Metrics, logs, traces
   * - :ref:`receiver-creator-receiver` (``receiver_creator``)
     - Instantiates other receivers at runtime based on whether observed endpoints match a configured rule. To use the receiver creator, configure one or more observer extensions to discover networked endpoints.
     - N/A
   * - ``signalfx``
     - Accepts metrics and logs in the proto format.
     - Metrics, logs
   * - :ref:`prometheus-receiver` (``prometheus``)
     - Provides a simple configuration interface to scrape metrics from a single target.
     - Metrics
   * - ``smartagent``
     - Uses the existing Smart Agent monitors as Collector metric receivers. Learn more in :ref:`migration-monitors`.
     - Metrics
   * - :ref:`splunk-hec-receiver` (``splunk_hec``)
     - Accepts telemetry in the Splunk HEC format.
     - Metrics, logs, traces
   * - ``zipkin``
     - Receives spans from Zipkin versions 1 and 2.
     - Traces

.. _collector-components-processors:

.. raw:: html

  <embed>
    <h2>Processors<a name="collector-components-processors" class="headerlink" href="#collector-components-processors" title="Permalink to this headline">¶</a></h2>
  </embed>

.. list-table::
   :widths: 25 50 25
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
   * - ``groupbyattrs``
     - Reassociates spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource.
     - Metrics, logs, traces
   * - :ref:`filter-processor` (``filter``)
     - Can be configured to include or exclude metrics based on metric name in the case of the ``strict`` or ``regexp`` match types, or based on other metric attributes in the case of the ``expr`` match type.
     - Metrics
   * - ``k8s_tagger``
     - Allows automatic tagging of spans, metrics, and logs with Kubernetes metadata.
     - Metrics, logs, traces
   * - ``memory_limiter``
     - Prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector.
     - Metrics, logs, traces
   * - ``metricstransform``
     - Renames metrics, and adds, renames, or deletes label keys and values.
     - Metrics
   * - ``probabilisticsampler``
     - Provides samples based on hash values determined by trace IDs.
     - Traces
   * - ``resource``
     - Applies changes to resource attributes. Attributes represent actions that can be applied on resources.
     - Metrics, logs, traces
   * - ``resourcedetection``
     - Detects resource information from the host, in a format that conforms to the OpenTelemetry resource semantic conventions, and appends or overrides the resource value in telemetry data with this information.
     - Metrics, logs, traces
   * - ``routing``
     - Reads a header from the incoming HTTP request or reads a resource attribute, and then directs the trace information to specific exporters based on the value.
     - Metrics, logs, traces
   * - ``span``
     - Modifies either the span name or attributes of a span based on the span name.
     - Traces

.. _collector-components-exporters:
.. _otel-exporters:

.. raw:: html

  <embed>
    <h2>Exporters<a name="collector-components-exporters" class="headerlink" href="#collector-components-exporters" title="Permalink to this headline">¶</a></h2>
  </embed>

.. list-table::
   :widths: 25 50 25
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - ``file``
     - Writes pipeline data to a JSON file in Protobuf JSON encoding using the OpenTelemetry protocol. 
     - Metrics, logs, traces
   * - ``logging``
     - Exports data to the console. By default, ``logging`` doesn't send its output to Windows Event Viewer. Run the Splunk Distribution of OpenTelemetry Collector directly from the PowerShell terminal to send output to the Windows Event Viewer.
     - Metrics, logs, traces
   * - ``otlp``
     - Exports data through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 
     - Metrics, traces
   * - ``otlphttp``
     - Exports traces and metrics in OTLP format over the HTTP protocol. 
     - Metrics, traces
   * - :ref:`splunk-apm-exporter` (``sapm``)
     - Allows the Splunk Distribution of OpenTelemetry Collector to export traces from multiple nodes or services in a single batch. 
     - Traces  
   * - ``signalfx``
     - Sends metrics, events, and trace correlation to Splunk Observability Cloud. 
     - Logs (events), metrics, traces (trace to metric correlation only)
   * - :ref:`splunk-apm-exporter` (``sapm``)
     - Exports traces from multiple nodes or services in a single batch.
     - Traces
   * - :ref:`splunk-hec-exporter` (``splunk_hec``)
     - Sends telemetry to a Splunk HEC endpoint. 
     - Metrics, logs, traces


.. _collector-components-extensions:

.. raw:: html

  <embed>
    <h2>Extensions<a name="collector-components-extensions" class="headerlink" href="#collector-components-extensions" title="Permalink to this headline">¶</a></h2>
  </embed>

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Name
     - Description
   * - ``docker_observer``
     - Detects and reports container endpoints discovered through the Docker API. Only containers that are in the state of ``Running`` and not ``Paused`` emit endpoints. ``docker_observer`` watches the Docker engine's stream of events to dynamically create, update, and remove endpoints as events are processed. 
   * - ``ecs_observer``
     - Uses the ECS and EC2 API to discover Prometheus scrape targets from all running tasks and filter them based on service names, task definitions, and container labels. If you run the Collector as a sidecar, consider using the ECS resource detector instead of the ECS observer.
   * - ``health_check``
     - Activates an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. You can also use this extension as a liveness or readiness probe on Kubernetes.
   * - ``http_forwarder``
     - Accepts HTTP requests and optionally adds headers and forwards them. The RequestURIs of the original requests are preserved by the extension. 
   * - ``host_observer``
     - Looks at the current host for listening network endpoints. Uses the /proc file system and requires the ``SYS_PTRACE`` and ``DAC_READ_SEARCH`` capabilities so that it can determine what processes own the listening sockets. 
   * - ``memory_ballast``
     - Configures the memory ballast for the Collector process, either as a size in megabytes or as a size expressed as a percentage of the total memory. Sufficient ballast enhances the stability of Collector deployments.
   * - ``k8s_observer``
     - Uses the Kubernetes API to discover pods running on the local node. This extension assumes that the Splunk Distribution of OpenTelemetry Collector is deployed in agent mode where it is running on each individual node or host instance. 
   * - ``pprof``
     - Activates the golang ``net/http/pprof`` endpoint, which is used to collect performance profiles and investigate issues with a service.
   * - ``smartagent``
     - Provides a mechanism to set configuration options that are applicable to all instances of the Smart Agent receiver. Allows to migrate your existing Smart Agent configuration to the Splunk Distribution of OpenTelemetry Collector. 
   * - ``zpages``
     - Activates an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components.

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

Read on to learn how to:

* :ref:`otel-install-platform`.
* :ref:`otel-configuration`.