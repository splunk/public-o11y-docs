.. list-table::
   :widths: 25 55 20
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - :ref:`apache-receiver` (``apache``) 
     - Fetches stats from a Apache Web Server.
     - Metrics
   * - :ref:`apache-spark-receiver` (``apachespark``) 
     - Fetches metrics for an Apache Spark cluster through the Apache Spark REST API. 
     - Metrics
   * - :ref:`activedirectory-ds-receiver` (``active_directory_ds``)
     - Metrics
     - Scrapes metrics relating to an Active Directory domain controller using the Windows Performance Counters.
   * - :ref:`awsecscontainermetrics-receiver` (``awsecscontainermetrics``) 
     - Reads task metadata and docker stats from Amazon ECS and generates resource usage metrics.
     - Metrics
   * - :ref:`azureeventhub-receiver` (``azureeventhub``) 
     - Pulls logs from an Azure event hub.
     - Logs
   * - :ref:`carbon-receiver` (``carbon``)
     - Receives metrics in Carbon plaintext protocol.
     - Metrics
   * - :ref:`chrony-receiver` (``chrony``)
     - Go implementation of the ``chronyc`` command to track portability across systems and platforms.
     - Metrics
   * - :ref:`cloudfoundry-receiver` (``cloudfoundry``)
     - Connects to the Reverse Log Proxy (RLP) gateway of Cloud Foundry to extract metrics.
     - Metrics
   * - :ref:`collectd-receiver` (``collectd``)
     - Receives data exported through the CollectD ``write_http`` plugin. Only supports the JSON format.
     - Metrics
   * - :ref:`discovery-receiver` (``discovery``) elasticsearch-receiver
     - Wraps the receiver creator to facilitate the discovery of metric collection targets. See :ref:`discovery_mode`.
     - Logs
   * - :ref:`elasticsearch-receiver` (``elasticsearch``) 
     - Queries the Elasticsearch node stats, cluster health and index stats endpoints to scrape metrics from a running Elasticsearch cluster.
     - Metrics      
   * - :ref:`filelog-receiver` (``filelog``)
     - Tails and parses logs from files.
     - Logs
   * - :ref:`fluentd-receiver` (``fluentforward``)
     - Runs a TCP server that accepts events through the Fluentd Forward protocol.
     - Logs
   * - :ref:`haproxy-receiver` (``haproxy``)
     - Generates metrics by polling periodically the HAProxy process through a dedicated socket or HTTP URL. 
     - Metrics
   * - :ref:`host-metrics-receiver` (``hostmetrics``)
     - Generates system metrics from various sources. Use this receiver when deploying the Collector as an agent. 
     - Metrics
   * - :ref:`http-check-receiver` (``httpcheck``)
     - Performs synthethic checks against HTTP endpoints.  
     - Metrics
   * - :ref:`jaeger-receiver` (``jaeger``)
     - Receives trace data in Jaeger format.
     - Traces
   * - :ref:`jmx-receiver` (``jmx``)
     - Works in conjunction with the :new-page:`OpenTelemetry JMX Metric Gatherer <https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/README.md>` to report metrics from an MBean server.
     - Metrics
   * - :ref:`journald-receiver` (``journald``)
     - Parses Journald events from the systemd journal. The ``journalctl`` binary must be in the same ``$PATH`` of the agent.
     - Logs
   * - :ref:`kafka-receiver` (``kafka``)
     - Receives metrics, logs, and traces from Kafka. Metrics and logs only support the OTLP format.
     - Metrics, logs, traces
   * - :ref:`kafkametrics-receiver` (``kafkametrics``)
     - Collects Kafka metrics such as brokers, topics, partitions, and consumer groups from Kafka server, and converts them to OTLP format.
     - Metrics
   * - :ref:`kubernetes-cluster-receiver` (``k8s_cluster``)
     - Collects cluster-level metrics from the Kubernetes API server. It uses the Kubernetes API to listen for updates. You can use a single instance of this receiver to monitor a cluster.
     - Metrics
   * - :ref:`kubernetes-events-receiver` (``k8s_events``)
     - Collects all new and updated events from the Kubernetes API server. Supports authentication through service accounts only.
     - Logs
   * - :ref:`kubernetes-objects-receiver` (``k8sobjects``)
     - Collects objects from the Kubernetes API server. Supports authentication through service accounts only.
     - Logs
   * - :ref:`kubelet-stats-receiver` (``kubeletstats``)
     - Pulls pod metrics from the API server on a kubelet.
     - Metrics
   * - :ref:`mongodb-receiver` (``mongodb``)
     - Fetches stats from a MongoDB instance using the Golang ``mongo`` driver. 
     - Metrics
   * - :ref:`mongodb-atlas-receiver` (``mongodbatlas``)
     - Retrieves metrics from MongoDB Atlas using their monitoring APIs.
     - Metrics
   * - :ref:`mssql-server-receiver` (``sqlserver``)
     - Grabs metrics from a Microsoft SQL Server instance. 
     - Metrics    
   * - :ref:`mysql-receiver` (``mysql``)
     - Queries and retrieves metrics about MySQL's global status and InnoDB tables.
     - Metrics      
   * - :ref:`nginx-receiver` (``nginx``)
     - Fetches stats from a NGINX instance using the ``ngx_http_stub_status_module`` module's status endpoint.
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
   * - :ref:`purefa-receiver` (``purefa``)
     - Receives metrics from the Pure Storage FlashArray.
     - Metrics
   * - :ref:`rabbitmq-receiver` (``rabbitmq``)
     - Fetches stats from a RabbitMQ node using the RabbitMQ Management Plugin.
     - Metrics
   * - :ref:`receiver-creator-receiver` (``receiver_creator``)
     - Instantiates other receivers at runtime based on whether observed endpoints match a configured rule. To use the receiver creator, configure one or more observer extensions to discover networked endpoints.
     - N/A
   * - :ref:`redis-receiver` (``redis``)
     - Retrieves Redis ``INFO`` data from a specific Redis instance and builds metrics from it.
     - Metrics
   * - :ref:`sapm-receiver` (``sapm``)
     - Receives traces from other collectors or from the SignalFx Smart Agent.
     - Traces
   * - :ref:`signalfx-gateway-prometheus-remote-write-receiver` (``signalfxgatewayprometheusremotewritereceiver``)
     - OTel native version of the SignalFx Prometheus remote write gateway.
     - Metrics
   * - :ref:`signalfx-receiver` (``signalfx``)
     - Accepts metrics and logs in the proto format.
     - Metrics, logs
   * - :ref:`smartagent-receiver` (``smartagent``)
     - Uses the existing Smart Agent monitors as Collector metric receivers. Learn more in :ref:`migration-monitors`.
     - Metrics
   * - :ref:`snowflake-receiver` (``snowflake``)
     - Collects metrics from a Snowflake account by connecting to and querying a Snowflake deployment.
     - Metrics
   * - :ref:`splunk-enterprise-receiver` (``splunkenterprise``)
     - Enables the ingestion of performance metrics describing the operational status of a user's Splunk Enterprise deployment.
     - Metrics
   * - :ref:`splunk-hec-receiver` (``splunk_hec``)
     - Accepts telemetry in the Splunk HEC format.
     - Metrics, logs, traces
   * - :ref:`sqlquery-receiver` (``sqlquery``)
     - Runs custom SQL queries to generate metrics from a database connection.
     - Metrics
   * - :ref:`sshcheck-receiver` (``sshcheck``)
     - Creates stats by connecting to an SSH server, might be an SFTP server.
     - Metrics
   * - :ref:`statsd-receiver` (``statsd``)
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
   * - :ref:`vcenter-receiver` (``vcenter``) 
     - Supports ESXi and vCenter.
     - Metrics
   * - :ref:`wavefront-receiver` (``wavefront``) 
     - Accepts metrics and depends on the ``carbon`` receiver proto and transport.
     - Metrics      
   * - :ref:`windowseventlog-receiver` (``windowseventlog``)
     - Tails and parses logs from the Windows Event log API.
     - Logs
   * - :ref:`windowsperfcounters-receiver` (``windowsperfcounters``) (Windows only)
     - Collects the configured system, application, or custom performance counter data from the Windows Registry.
     - Metrics
   * - :ref:`zipkin-receiver` (``zipkin``)
     - Receives spans from Zipkin versions 1 and 2.
     - Traces

