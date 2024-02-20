.. _otel-components-receivers:

******************************************
Collector components: Receivers
******************************************

.. meta::
    :description: Learn about the components that make up the Splunk Observability Cloud OpenTelemetry Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    databricks-receiver
    filelog-receiver   
    fluentd-receiver
    host-metrics-receiver
    jaeger-receiver    
    jmx-receiver    
    kubelet-stats-receiver
    kubernetes-cluster-receiver     
    mongodb-atlas-receiver
    mysql-receiver
    oracledb-receiver
    otlp-receiver                
    postgresql-receiver
    prometheus-receiver
    receiver-creator-receiver
    simple-prometheus-receiver
    signalfx-receiver
    smartagent-receiver
    splunk-hec-receiver
    sqlquery-receiver     
    syslog-receiver 
    tcp-receiver     
    udp-receiver
    windowsperfcounters-receiver
    zipkin-receiver 

The OpenTelemetry Collector includes the following component types:

* :ref:`Receivers <collector-components-receivers>`: Get data into the Collector from multiple sources.
* :ref:`Processors <collector-components-processors>`: Perform operations on data before it's exported. For example, filtering.
* :ref:`Exporters <collector-components-exporters>`: Send data to one or more backends or destinations. 
* :ref:`Extensions <collector-components-extensions>`: Extend the capabilities of the Collector.

You can activate components by configuring :ref:`service pipelines <otel-data-processing>` in the Collector configuration. See :ref:`otel-configuration` to learn how to define multiple instances of components as well as their pipelines.

The Splunk Distribution of the OpenTelemetry Collector includes and supports the components listed on this doc.

.. note:: The following lists might not contain all the latest additions. For a complete list of Collector components, including components that aren't included in the Splunk Distribution of OpenTelemetry Collector, see the ``opentelemetry-contrib`` repository in GitHub.

.. _collector-components-receivers:

.. raw:: html

  <embed>
    <h2>Receivers<a name="collector-components-receivers" class="headerlink" href="#collector-components-receivers" title="Permalink to this headline">¶</a></h2>
  </embed>

.. list-table::
   :widths: 25 55 20
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
     - Wraps the receiver creator to facilitate the discovery of metric collection targets. See :ref:`discovery_mode`.
     - Logs
   * - :ref:`filelog-receiver` (``filelog``)
     - Tails and parses logs from files.
     - Logs
   * - :ref:`fluentd-receiver` (``fluentforward``)
     - Runs a TCP server that accepts events through the Fluentd Forward protocol.
     - Logs
   * - :ref:`host-metrics-receiver` (``hostmetrics``)
     - Generates system metrics from various sources. Use this receiver when deploying the Collector as an agent. 
     - Metrics
   * - :ref:`jaeger-receiver` (``jaeger``)
     - Receives trace data in Jaeger format.
     - Traces
   * - :ref:`jmx-receiver` (``jmx``)
     - Works in conjunction with the :new-page:`OpenTelemetry JMX Metric Gatherer <https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/README.md>` to report metrics from an MBean server.
     - Metrics
   * - ``journald``
     - Parses Journald events from the systemd journal. The ``journalctl`` binary must be in the same ``$PATH`` of the agent.
     - Logs
   * - ``kafkametrics``
     - Collects Kafka metrics such as brokers, topics, partitions, and consumer groups from Kafka server, and converts them to OTLP format.
     - Metrics
   * - ``kafka``
     - Receives metrics, logs, and traces from Kafka. Metrics and logs only support the OTLP format.
     - Metrics, logs, traces
   * - :ref:`kubernetes-cluster-receiver` (``k8s_cluster``)
     - Collects cluster-level metrics from the Kubernetes API server. It uses the Kubernetes API to listen for updates. You can use a single instance of this receiver to monitor a cluster.
     - Metrics
   * - ``k8s_events``
     - Collects all new and updated events from the Kubernetes API server. Supports authentication through service accounts only.
     - Logs
   * - ``k8sobjects``
     - Collects objects from the Kubernetes API server. Supports authentication through service accounts only.
     - Logs
   * - :ref:`kubelet-stats-receiver` (``kubeletstats``)
     - Pulls pod metrics from the API server on a kubelet.
     - Metrics
   * - :ref:`mongodb-atlas-receiver` (``mongodbatlas``)
     - Retrieves metrics from MongoDB Atlas using their monitoring APIs.
     - Metrics
   * - :ref:`mysql-receiver` (``mysql``)
     - Queries and retrieves metrics about MySQL's global status and InnoDB tables.
     - Metrics      
   * - :ref:`oracledb` (``oracledb``) |br|
     - Connects to an Oracle Database instance and obtains metrics such as physical reads, CPU, time, and others.
     - Metrics
   * - :ref:`otlp-receiver` (``otlp``)
     - Receives data through gRPC or HTTP using OTLP format.
     - Metrics, logs, traces
   * - :ref:`postgresql-receiver` (``postgresql``)
     - Queries the PostgreSQL statistics collector. Supports PostgreSQL version 9.6 and higher.
     - Metrics
   * - :ref:`prometheus-receiver` (``prometheus``)
     - Provides a simple configuration interface to scrape metrics from a single target.
     - Metrics
   * - :ref:`simple-prometheus-receiver` (``prometheus_simple``)
     - Wraps the ``prometheus`` receiver to provide simplified settings for single targets.
     - Metrics
   * - :ref:`receiver-creator-receiver` (``receiver_creator``)
     - Instantiates other receivers at runtime based on whether observed endpoints match a configured rule. To use the receiver creator, configure one or more observer extensions to discover networked endpoints.
     - N/A
   * - ``redis``
     - Retrieves Redis ``INFO`` data from a specific Redis instance and builds metrics from it.
     - Metrics
   * - ``sapm``
     - Receives traces from other collectors or from the SignalFx Smart Agent.
     - Traces
   * - :ref:`signalfx-receiver` (``signalfx``)
     - Accepts metrics and logs in the proto format.
     - Metrics, logs
   * - :ref:`smartagent-receiver` (``smartagent``)
     - Uses the existing Smart Agent monitors as Collector metric receivers. Learn more in :ref:`migration-monitors`.
     - Metrics
   * - :ref:`splunk-hec-receiver` (``splunk_hec``)
     - Accepts telemetry in the Splunk HEC format.
     - Metrics, logs, traces
   * - :ref:`sqlquery-receiver` (``sqlquery``)
     - Runs custom SQL queries to generate metrics from a database connection.
     - Metrics
   * - ``statsd``
     - Collects StatsD messages to generate metrics.
     - Metrics
   * - :ref:`syslog-receiver` (``syslog``)
     - Parses syslog messages received over TCP or UDP.
     - Logs
   * - :ref:`tcp-logs-receiver` (``tcplog``)
     - Receives logs over TCP.
     - Logs
   * - :ref:`udp-logs-receiver` (``udplog``) 
     - Receives logs over UDP.
     - Logs
   * - ``windowseventlog``
     - Tails and parses logs from the Windows Event log API.
     - Logs
   * - :ref:`windowsperfcounters-receiver` (``windowsperfcounters``) (Windows only)
     - Collects the configured system, application, or custom performance counter data from the Windows Registry.
     - Metrics
   * - :ref:`zipkin-receiver` (``zipkin``)
     - Receives spans from Zipkin versions 1 and 2.
     - Traces

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

Read on to learn how to:

* :ref:`otel-install-platform`.
* 