.. _signalfx-exporter:

*************************
SignalFx exporter
*************************

.. meta::
      :description: The SignalFx exporter allows the OpenTelemetry Collector to send traces, logs, and metrics to SignalFx endpoints. Read on to learn how to configure the component.

The SignalFx exporter allows the OpenTelemetry Collector to send metrics and events to SignalFx endpoints. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

.. note:: For information on the receiver, see :ref:`signalfx-receiver`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the SignalFx exporter in the ``traces``, ``metrics``, and ``logs/signalfx`` pipelines when deploying in agent mode. See :ref:`otel-deployment-mode` for more information.

Sample configurations
----------------------

The following example shows the default configuration of SignalFx exporter for metrics and events ingest, as well as trace and metrics correlation:

.. code-block:: yaml

   # Metrics + Events
   signalfx:
     access_token: "${SPLUNK_ACCESS_TOKEN}"
     api_url: "${SPLUNK_API_URL}"
     ingest_url: "${SPLUNK_INGEST_URL}"
     # Use instead when sending to gateway (http forwarder extension ingress endpoint)
     #api_url: http://${SPLUNK_GATEWAY_URL}:6060
     #ingest_url: http://${SPLUNK_GATEWAY_URL}:9943
     sync_host_metadata: true

When adding the SignalFx exporter, configure both the metrics and logs pipelines. Make sure to also add the SignalFx receiver as in the following example:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]
       logs:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]

.. _sfx-exporter-default-metric-filter:

Default metric filters
============================

To prevent unwanted custom metrics, the SignalFx exporter excludes a number of metrics by default. See :ref:`list-excluded-metrics` for more information.

To override default exclusions and include metrics manually, use the ``include_metrics`` option. For example:

.. code-block:: yaml

   exporters:
     signalfx:
       include_metrics:
         - metric_names: [cpu.interrupt, cpu.user, cpu.system]
         - metric_name: system.cpu.time
           dimensions:
             state: [interrupt, user, system]

The following example instructs the exporter to send only the ``cpu.interrupt`` metric with a ``cpu`` dimension value and both per core and aggregate ``cpu.idle`` metrics:

.. code-block:: yaml

   exporters:
     signalfx:
       include_metrics:
         - metric_name: "cpu.idle"
         - metric_name: "cpu.interrupt"
           dimensions:
             cpu: ["*"]

.. _list-excluded-metrics:

List of metrics excluded by default
---------------------------------------

Metrics excluded by default by the SignalFx exporter are listed in the default_metrics.go file. The following snippet shows the latest version of the list:

.. code-block:: yaml

   # DefaultExcludeMetricsYaml holds a list of hard coded metrics that's added to the
   # exclude list from the config. It includes non-default metrics collected by
   # receivers. This list is determined by categorization of metrics in the SignalFx
   # Agent. Metrics in the OpenTelemetry convention that have equivalents in the
   # SignalFx Agent that are categorized as non-default are also included in this list.

   exclude_metrics:

   # Metrics in SignalFx Agent Format
   - metric_names:
     # CPU metrics.
     - cpu.interrupt
     - cpu.nice
     - cpu.softirq
     - cpu.steal
     - cpu.system
     - cpu.user
     - cpu.utilization_per_core
     - cpu.wait

     # Disk-IO metrics
     - disk_ops.pending

     # Virtual memory metrics
     - vmpage_io.memory.in
     - vmpage_io.memory.out

   # Metrics in OpenTelemetry Convention

   # CPU Metrics
   - metric_name: system.cpu.time
     dimensions:
       state: [idle, interrupt, nice, softirq, steal, system, user, wait]

   - metric_name: cpu.idle
     dimensions:
       cpu: ["*"]
   
   # Memory metrics
   - metric_name: system.memory.usage
     dimensions:
       state: [inactive]

   # Filesystem metrics
   - metric_name: system.filesystem.usage
     dimensions:
       state: [reserved]
   - metric_name: system.filesystem.inodes.usage

   # Disk-IO metrics
   - metric_names:
     - system.disk.merged
     - system.disk.io
     - system.disk.time
     - system.disk.io_time
     - system.disk.operation_time
     - system.disk.pending_operations
     - system.disk.weighted_io_time

   # Network-IO metrics
   - metric_names:
     - system.network.packets
     - system.network.dropped
     - system.network.tcp_connections
     - system.network.connections

   # Processes metrics
   - metric_names:
     - system.processes.count
     - system.processes.created

   # Virtual memory metrics
   - metric_names:
     - system.paging.faults
     - system.paging.usage
   - metric_name: system.paging.operations
     dimensions:
       type: [minor]

    k8s metrics
   - metric_names:
     - k8s.cronjob.active_jobs
     - k8s.job.active_pods
     - k8s.job.desired_successful_pods
     - k8s.job.failed_pods
     - k8s.job.max_parallel_pods
     - k8s.job.successful_pods
     - k8s.statefulset.desired_pods
     - k8s.statefulset.current_pods
     - k8s.statefulset.ready_pods
     - k8s.statefulset.updated_pods
     - k8s.hpa.max_replicas
     - k8s.hpa.min_replicas
     - k8s.hpa.current_replicas
     - k8s.hpa.desired_replicas

     # matches all container limit metrics but k8s.container.cpu_limit and k8s.container.memory_limit
     - /^k8s\.container\..+_limit$/
     - '!k8s.container.memory_limit'
    - '!k8s.container.cpu_limit'

     # matches all container request metrics but k8s.container.cpu_request and k8s.container.memory_request
     - /^k8s\.container\..+_request$/
     - '!k8s.container.memory_request'
     - '!k8s.container.cpu_request'

     # matches any node condition but k8s.node.condition_ready
     - /^k8s\.node\.condition_.+$/
     - '!k8s.node.condition_ready'

     # kubelet metrics
     # matches (container|k8s.node|k8s.pod).memory...
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.memory\.available$/
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.memory\.major_page_faults$/
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.memory\.page_faults$/
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.memory\.rss$/
     - /^(?i:(k8s\.node)|(k8s\.pod))\.memory\.usage$/
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.memory\.working_set$/

     # matches (k8s.node|k8s.pod).filesystem...
     - /^k8s\.(?i:(node)|(pod))\.filesystem\.available$/
     - /^k8s\.(?i:(node)|(pod))\.filesystem\.capacity$/
     - /^k8s\.(?i:(node)|(pod))\.filesystem\.usage$/

     # matches (k8s.node|k8s.pod).cpu.time
     - /^k8s\.(?i:(node)|(pod))\.cpu\.time$/

     # matches (container|k8s.node|k8s.pod).cpu.utilization
     - /^(?i:(container)|(k8s\.node)|(k8s\.pod))\.cpu\.utilization$/

     # matches k8s.node.network.io and k8s.node.network.errors
     - /^k8s\.node\.network\.(?:(io)|(errors))$/

     # matches k8s.volume.inodes, k8s.volume.inodes and k8s.volume.inodes.used
     - /^k8s\.volume\.inodes(\.free|\.used)*$/

Settings
======================

The following table shows the configuration options for the SignalFx exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/signalfx.yaml"></div>

.. caution:: Use the ``access_token_passthrough`` setting if you're using a SignalFx receiver with the same setting. Only use the SignalFx receiver with the SignalFx exporter when activating this setting.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
