(mongodb-atlas-receiver)=

# MongoDB Atlas

<meta name="Description" content="Documentation on the MongoDB Atlas receiver">

## Description

The MongoDB Atlas receiver receives metrics from MongoDB Atlas by using their monitoring APIs. The MongoDB Atlas receiver can receive database metrics dimensionalized by project and database attributes, for example, ``project_name`` and ``database_name``.

> _**Note:**_ Use the MongoDB Atlas receiver in place of the SignalFx Smart Agent ``mongodb-atlas`` cluster monitor. The Smart Agent is deprecated. For details, see the [deprecation notice](https://github.com/signalfx/signalfx-agent/blob/main/docs/smartagent-deprecation-notice.md). 

The supported pipeline type is metrics.

## Benefits

After you configure the integration, you can access these features:

- View metrics using the built-in dashboard. For information about dashboards, see [View dashboards in Observability Cloud](https://docs.splunk.com/Observability/data-visualization/dashboards/view-dashboards.html#nav-View-dashboards).
- View a data-driven visualization of the physical servers, virtual machines, AWS instances, and other resources in your environment that are visible to Infrastructure Monitoring. For information about navigators, see [Splunk Infrastructure Monitoring navigators](https://docs.splunk.com/Observability/infrastructure/navigators/navigators.html#nav-Splunk-Infrastructure-Monitoring-navigators).
- Access Metric Finder and search for metrics sent by the monitor. For information about Metric Finder, see [Use the Metric Finder](https://docs.splunk.com/Observability/metrics-and-metadata/metrics-finder-metadata-catalog.html#use-the-metric-finder).

## Installation

Follow these steps to deploy this integration:  

1. Follow the steps to deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   - {ref}`Install on Kubernetes <otel-install-k8s>`
   - {ref}`Install on Linux <otel-install-linux>`
   - {ref}`Install on Windows <otel-install-windows>`
2. Configure the receiver, as described in the Configuration section.
3. Restart the Splunk Distribution of OpenTelemetry Collector.

## Configuration

Include the MongoDB Atlas receiver in the ``receivers`` section of your configuration file, as shown in the following example:

```yaml
receivers:
  mongodbatlas:
    public_key: ${MONGODB_ATLAS_PUBLIC_KEY}
    # You can obtain the public key from the API Keys tab of the MongoDB Atlas Project Access Manager. 
    # This value is required.
    private_key: ${MONGODB_ATLAS_PRIVATE_KEY}
    # You can obtain the private key from the API Keys tab of the MongoDB Atlas Project Access Manager. 
    # This value is required.
```

In this example, both values are pulled from the environment.

To complete the integration, include the receiver in the``service/pipelines/metrics/receivers`` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [mongodbatlas]
```

### Configuration options

The following table shows the configuration options:

| Option | Description | Required |
|---|---|---|
| ``public_key`` | The public key acts as the username when making API requests. You can obtain the public key from the API Keys tab of the MongoDB Atlas Project Access Manager. | Yes |
| ``private_key`` | The private key acts as the password when making API requests. You can obtain the private key from the API Keys tab of the MongoDB Atlas Project Access Manager. | Yes |
| ``granularity`` | The duration that specifies the interval between measurement data points. The default value is ``PT1M``, which  specifies 1-minute granularity. | No |
| ``retry_on_failure`` | See the options described below. | No |
| ``enabled`` | The default value is ``true``.  | No |
| ``initial_interval`` | The default value is ``5s``.  | No |
| ``max_interval`` | The default value is ``30s``. | No |
| ``max_elapsed_time`` | The default value is ``5m``. | No |

## Metrics

These are the metrics available for this integration. All metrics are emitted by default.

| Name | Category | Description | Unit | Type | Attributes |
| ---- | ---- | ----------- | ---- | ---- | ---------- |
| **mongodbatlas.db.counts** |  | Database feature size aggregate of MongoDB metrics ``DATABASE_EXTENT_COUNT``, ``DATABASE_VIEW_COUNT``, ``DATABASE_COLLECTION_COUNT``, ``DATABASE_OBJECT_COUNT``, ``DATABASE_INDEX_COUNT`` | ``{objects}`` | Gauge (Double) | ``object_type`` |
| **mongodbatlas.db.size** |  | Database feature size aggregate of MongoDB metrics ``DATABASE_DATA_SIZE``, ``DATABASE_STORAGE_SIZE``, ``DATABASE_INDEX_SIZE``, ``DATABASE_AVERAGE_OBJECT_SIZE`` | ``By`` | Gauge (Double) | ``object_type``|
| **mongodbatlas.disk.partition.IOPS.average** |  | Disk partition IOPS aggregate of MongoDB metrics ``DISK_PARTITION_IOPS_READ``, ``DISK_PARTITION_IOPS_WRITE``, ``DISK_PARTITION_IOPS_TOTAL`` | ``{ops}/s``| Gauge (Double) | ``disk_direction`` |
| **mongodbatlas.disk.partition.IOPS.max** |  | Disk partition IOPS aggregate of MongoDB metrics ``MAX_DISK_PARTITION_IOPS_WRITE``, ``MAX_DISK_PARTITION_IOPS_TOTAL``, ``MAX_DISK_PARTITION_IOPS_READ`` | ``{ops}/s`` | Gauge (Double) | ``disk_direction`` |
| **mongodbatlas.disk.partition.latency.average** |  | Disk partition latency aggregate of MongoDB metrics ``DISK_PARTITION_LATENCY_WRITE``, ``DISK_PARTITION_LATENCY_READ`` | ``ms`` | Gauge (Double) | ``disk_direction`` |
| **mongodbatlas.disk.partition.latency.max** |  | Disk partition latency aggregate of MongoDB metrics ``MAX_DISK_PARTITION_LATENCY_WRITE``, ``MAX_DISK_PARTITION_LATENCY_READ`` | ``ms`` | Gauge (Double) | ``disk_direction``|
| **mongodbatlas.disk.partition.space.average** |  | Disk partition space aggregate of MongoDB metrics ``DISK_PARTITION_SPACE_FREE``, ``DISK_PARTITION_SPACE_USED`` | ``By`` | Gauge (Double) | ``disk_status`` |
| **mongodbatlas.disk.partition.space.max** |  | Disk partition space aggregate of MongoDB metrics ``DISK_PARTITION_SPACE_FREE``, ``DISK_PARTITION_SPACE_USED`` | ``By`` | Gauge (Double) | ``disk_status`` |
| **mongodbatlas.disk.partition.usage.average** |  | Disk partition usage (%) aggregate of MongoDB metrics ``DISK_PARTITION_SPACE_PERCENT_FREE``, ``DISK_PARTITION_SPACE_PERCENT_USED`` | ``1`` | Gauge (Double) | ``disk_status`` |
| **mongodbatlas.disk.partition.usage.max** |  | Disk partition usage (%) aggregate of MongoDB metrics ``MAX_DISK_PARTITION_SPACE_PERCENT_USED``, ``MAX_DISK_PARTITION_SPACE_PERCENT_FREE``| ``1 ``| Gauge (Double) | ``disk_status`` |
| **mongodbatlas.disk.partition.utilization.average** |  | Disk partition utilization (%) MongoDB metrics ``DISK_PARTITION_UTILIZATION`` | 1 | Gauge (Double) | |
| **mongodbatlas.disk.partition.utilization.max** |  | Disk partition utilization (%) MongoDB metrics ``MAX_DISK_PARTITION_UTILIZATION`` | ``1`` | Gauge (Double) |  |
| **mongodbatlas.process.asserts** |  | Number of assertions per second aggregate of MongoDB metrics ``ASSERT_REGULAR``, ``ASSERT_USER``, ``ASSERT_MSG``, ``ASSERT_WARNING`` | ``{assertions}/s`` | Gauge (Double) | ``assert_type`` |
| **mongodbatlas.process.background_flush** |  | Amount of data flushed in the background MongoDB Metric ``BACKGROUND_FLUSH_AVG`` | ``1`` | Gauge (Double) |  |
| **mongodbatlas.process.cache.io** |  | Cache throughput (per second) aggregate of MongoDB metrics ``CACHE_BYTES_READ_INTO``, ``CACHE_BYTES_WRITTEN_FROM`` | ``By`` | Gauge (Double) | ``cache_direction`` |
| **mongodbatlas.process.cache.size** |  | Cache sizes aggregate of MongoDB metrics ``CACHE_USED_BYTES``, ``CACHE_DIRTY_BYTES`` | ``By`` | Sum(Double) | ``cache_status`` |
| **mongodbatlas.process.connections** | Custom | Number of current connections MongoDB metric ``CONNECTIONS`` | ``{connections}`` | Sum(Double) |  |
| **mongodbatlas.process.cpu.children.normalized.usage.average** |  | CPU usage for child processes, normalized to pct aggregate of MongoDB metrics ``PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL``, ``PROCESS_NORMALIZED_CPU_CHILDREN_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.children.normalized.usage.max** |  | CPU usage for child processes, normalized to pct aggregate of MongoDB metrics ``MAX_PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL``, ``MAX_PROCESS_NORMALIZED_CPU_CHILDREN_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.children.usage.average** |  | CPU usage for child processes (%) aggregate of MongoDB metrics ``PROCESS_CPU_CHILDREN_KERNEL``, ``PROCESS_CPU_CHILDREN_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.children.usage.max** |  | CPU usage for child processes (%) aggregate of MongoDB metrics ``MAX_PROCESS_CPU_CHILDREN_USER``, ``MAX_PROCESS_CPU_CHILDREN_KERNEL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.normalized.usage.average** |  | CPU usage, normalized to pct aggregate of MongoDB metrics ``PROCESS_NORMALIZED_CPU_KERNEL``, ``PROCESS_NORMALIZED_CPU_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.normalized.usage.max** |  | CPU usage, normalized to pct aggregate of MongoDB metrics ``MAX_PROCESS_NORMALIZED_CPU_USER``, ``MAX_PROCESS_NORMALIZED_CPU_KERNEL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.usage.average** |  | CPU usage (%) aggregate of MongoDB metrics ``PROCESS_CPU_KERNEL``, ``PROCESS_CPU_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cpu.usage.max** |  | CPU usage (%) aggregate of MongoDB metrics ``MAX_PROCESS_CPU_KERNEL``, ``MAX_PROCESS_CPU_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.cursors** |  | Number of cursors aggregate of MongoDB metrics ``CURSORS_TOTAL_OPEN, CURSORS_TOTAL_TIMED_OUT | ``{cursors}`` | Gauge (Double) | ``cursor_state`` |
| **mongodbatlas.process.db.document.rate** | Custom | Document access rates aggregate of MongoDB metrics ``DOCUMENT_METRICS_UPDATED``, ``DOCUMENT_METRICS_DELETED``, ``DOCUMENT_METRICS_RETURNED``, ``DOCUMENT_METRICS_INSERTED`` | ``{documents}/s`` | Gauge (Double) | ``document_status`` |
| **mongodbatlas.process.db.operations.rate** | Custom | DB operation rates aggregate of MongoDB metrics ``OPCOUNTER_GETMORE``, ``OPERATIONS_SCAN_AND_ORDER``, ``OPCOUNTER_UPDATE``, ``OPCOUNTER_REPL_UPDATE``, ``OPCOUNTER_CMD``, ``OPCOUNTER_DELETE``, ``OPCOUNTER_REPL_DELETE``, ``OPCOUNTER_REPL_CMD``, ``OPCOUNTER_QUERY``, ``OPCOUNTER_REPL_INSERT``, ``OPCOUNTER_INSERT``| ``{operations}/s`` | Gauge (Double) | ``operation cluster_role`` |
| **mongodbatlas.process.db.operations.time** | Custom | DB operation times aggregate of MongoDB metrics ``OP_EXECUTION_TIME_WRITES``, ``OP_EXECUTION_TIME_COMMANDS``, ``OP_EXECUTION_TIME_READS`` | ``ms`` | Sum (Double) | ``execution_type`` |
| **mongodbatlas.process.db.query_executor.scanned** |  | Scanned objects aggregate of MongoDB metrics ``QUERY_EXECUTOR_SCANNED_OBJECTS``, ``QUERY_EXECUTOR_SCANNED`` | ``{objects}/s`` | Gauge (Double) | ``scanned_type`` |
| **mongodbatlas.process.db.query_targeting.scanned_per_returned** |  | Scanned objects per returned aggregate of MongoDB metrics ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED``, ``QUERY_TARGETING_SCANNED_PER_RETURNED`` | ``{scanned}/{returned}`` | Gauge (Double) | ``scanned_type`` |
| **mongodbatlas.process.db.storage** | Custom | Storage used by the database aggregate of MongoDB metrics ``DB_INDEX_SIZE_TOTAL``, ``DB_DATA_SIZE_TOTAL_WO_SYSTEM``, ``DB_STORAGE_TOTAL, DB_DATA_SIZE_TOTAL`` | ``By`` | Gauge (Double) | ``storage_status`` |
| **mongodbatlas.process.fts.cpu.usage** |  | Full text search CPU (%) aggregate of MongoDB metrics ``FTS_PROCESS_CPU_USER``, ``FTS_PROCESS_CPU_KERNEL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.process.global_lock** | Custom | Number and status of locks aggregate of MongoDB metrics ``GLOBAL_LOCK_CURRENT_QUEUE_WRITERS``, ``GLOBAL_LOCK_CURRENT_QUEUE_READERS``, ``GLOBAL_LOCK_CURRENT_QUEUE_TOTAL`` | ``{locks}``| Gauge (Double) | ``global_lock_state`` |
| **mongodbatlas.process.index.btree_miss_ratio** |  | Index miss ratio (%) MongoDB metric ``INDEX_COUNTERS_BTREE_MISS_RATIO`` | ``1`` | Gauge (Double) |  |
| **mongodbatlas.process.index.counters** |  | Indexes aggregate of MongoDB metrics ``INDEX_COUNTERS_BTREE_MISSES``, ``INDEX_COUNTERS_BTREE_ACCESSES``, ``INDEX_COUNTERS_BTREE_HITS`` | ``{indexes}`` | Gauge (Double) | ``btree_counter_type`` |
| **mongodbatlas.process.journaling.commits** |  | Journaling commits MongoDB metric ``JOURNALING_COMMITS_IN_WRITE_LOCK`` | ``{commits}`` | Gauge (Double) |  |
| **mongodbatlas.process.journaling.data_files** |  | Data file sizes MongoDB metric ``JOURNALING_WRITE_DATA_FILES_MB`` | ``MiBy`` | Gauge (Double) | |
| **mongodbatlas.process.journaling.written** |  | Journals written MongoDB metric ``JOURNALING_MB`` | ``MiBy`` | Gauge (Double) | |
| **mongodbatlas.process.memory.usage** | Custom | Memory usage aggregate of MongoDB metrics ``MEMORY_MAPPED, MEMORY_VIRTUAL``, ``COMPUTED_MEMORY``, ``MEMORY_RESIDENT`` | ``By`` | Gauge (Double) | ``memory_state`` |
| **mongodbatlas.process.network.io** | Custom | Network IO aggregate of MongoDB metrics ``NETWORK_BYTES_OUT``, ``NETWORK_BYTES_IN`` | ``By/s`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.process.network.requests** | Custom | Network requests MongoDB metric ``NETWORK_NUM_REQUESTS`` | ``{requests}`` | Sum(Double) | |
| **mongodbatlas.process.oplog.rate** |  | Execution rate by operation MongoDB metric ``OPLOG_RATE_GB_PER_HOUR`` | ``GiBy/h`` | Gauge (Double) | |
| **mongodbatlas.process.oplog.time** |  | Execution time by operation aggregate of MongoDB metrics ``OPLOG_MASTER_TIME``, ``OPLOG_SLAVE_LAG_MASTER_TIME``, ``OPLOG_MASTER_LAG_TIME_DIFF`` | ``s`` | Gauge (Double) | ``oplog_type`` |
| **mongodbatlas.process.page_faults** | Custom | Page faults aggregate of MongoDB metrics ``GLOBAL_PAGE_FAULT_EXCEPTIONS_THROWN``, ``EXTRA_INFO_PAGE_FAULTS``, ``GLOBAL_ACCESSES_NOT_IN_MEMORY`` | ``{faults}/s`` | Gauge (Double) | ``memory_issue_type`` |
| **mongodbatlas.process.restarts** |  | Restarts in last hour aggregate of MongoDB metrics ``RESTARTS_IN_LAST_HOUR`` | ``{restarts}/h`` | Gauge (Double) | |
| **mongodbatlas.process.tickets** |  | Tickets aggregate of MongoDB metrics ``TICKETS_AVAILABLE_WRITE``, ``TICKETS_AVAILABLE_READS`` | ``{tickets}`` | Gauge (Double) | ``ticket_type`` |
| **mongodbatlas.system.cpu.normalized.usage.average** | Custom | System CPU normalized to pct aggregate of MongoDB metrics ``SYSTEM_NORMALIZED_CPU_IOWAIT``, ``SYSTEM_NORMALIZED_CPU_GUEST``, ``SYSTEM_NORMALIZED_CPU_IRQ``, ``SYSTEM_NORMALIZED_CPU_KERNEL``, ``SYSTEM_NORMALIZED_CPU_STEAL``, ``SYSTEM_NORMALIZED_CPU_SOFTIRQ``, ``SYSTEM_NORMALIZED_CPU_NICE,`` ``SYSTEM_NORMALIZED_CPU_USER`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.cpu.normalized.usage.max** |  | System CPU normalized to pct aggregate of MongoDB metrics ``MAX_SYSTEM_NORMALIZED_CPU_USER``, ``MAX_SYSTEM_NORMALIZED_CPU_NICE``, ``MAX_SYSTEM_NORMALIZED_CPU_IOWAIT``, ``MAX_SYSTEM_NORMALIZED_CPU_SOFTIRQ``, ``MAX_SYSTEM_NORMALIZED_CPU_STEAL``, ``MAX_SYSTEM_NORMALIZED_CPU_KERNEL``, ``MAX_SYSTEM_NORMALIZED_CPU_GUEST``, ``MAX_SYSTEM_NORMALIZED_CPU_IRQ`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.cpu.usage.average** |  | System CPU usage (%) aggregate of MongoDB metrics ``SYSTEM_CPU_USER``, ``SYSTEM_CPU_GUEST``, ``SYSTEM_CPU_SOFTIRQ``, ``SYSTEM_CPU_IRQ``, ``SYSTEM_CPU_KERNEL``, ``SYSTEM_CPU_IOWAIT``, ``SYSTEM_CPU_NICE``, ``SYSTEM_CPU_STEAL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.cpu.usage.max** |  | System CPU usage (%) aggregate of MongoDB metrics ``MAX_SYSTEM_CPU_SOFTIRQ``, ``MAX_SYSTEM_CPU_IRQ``, ``MAX_SYSTEM_CPU_GUEST``, ``MAX_SYSTEM_CPU_IOWAIT``, ``MAX_SYSTEM_CPU_NICE``, ``MAX_SYSTEM_CPU_KERNEL``, ``MAX_SYSTEM_CPU_USER``, ``MAX_SYSTEM_CPU_STEAL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.fts.cpu.normalized.usage** |  | Full text search disk usage (%) aggregate of MongoDB metrics ``FTS_PROCESS_NORMALIZED_CPU_USER``, ``FTS_PROCESS_NORMALIZED_CPU_KERNEL`` | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.fts.cpu.usage** |  | Full-text search (%) | ``1`` | Gauge (Double) | ``cpu_state`` |
| **mongodbatlas.system.fts.disk.used** |  | Full text search disk usage MongoDB metric ``FTS_DISK_USAGE`` | ``By`` | Gauge (Double) |  |
| **mongodbatlas.system.fts.memory.usage** |  | Full-text search aggregate of MongoDB metrics ``FTS_MEMORY_MAPPED``, ``FTS_PROCESS_SHARED_MEMORY``, ``FTS_PROCESS_RESIDENT_MEMORY``, ``FTS_PROCESS_VIRTUAL_MEMORY`` | ``MiBy`` | Sum (Double) | ``memory_state`` |
| **mongodbatlas.system.memory.usage.average** |  | System memory usage aggregate of MongoDB metrics ``SYSTEM_MEMORY_AVAILABLE``, ``SYSTEM_MEMORY_BUFFERS``, ``SYSTEM_MEMORY_USED``, ``SYSTEM_MEMORY_CACHED``, ``SYSTEM_MEMORY_SHARED``, ``SYSTEM_MEMORY_FREE`` | ``KiBy`` | Gauge (Double) | ``memory_state`` |
| **mongodbatlas.system.memory.usage.max** |  | System memory usage aggregate of MongoDB metrics ``MAX_SYSTEM_MEMORY_CACHED``, ``MAX_SYSTEM_MEMORY_AVAILABLE``, ``MAX_SYSTEM_MEMORY_USED``, ``MAX_SYSTEM_MEMORY_BUFFERS``, ``MAX_SYSTEM_MEMORY_FREE``, ``MAX_SYSTEM_MEMORY_SHARED`` | ``KiBy`` | Gauge (Double) | ``memory_state`` |
| **mongodbatlas.system.network.io.average** |  | System Network IO aggregate of MongoDB metrics ``SYSTEM_NETWORK_IN``, ``SYSTEM_NETWORK_OUT`` | ``By/s`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.system.network.io.max** |  | System Network IO aggregate of MongoDB metrics ``MAX_SYSTEM_NETWORK_OUT``, ``MAX_SYSTEM_NETWORK_IN`` | ``By/s`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.system.paging.io.average** | | Swap IO aggregate of MongoDB metrics ``SWAP_IO_IN, SWAP_IO_OUT`` | ``{pages}/s`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.system.paging.io.max** |  | Swap IO aggregate of MongoDB metrics ``MAX_SWAP_IO_IN, MAX_SWAP_IO_OUT`` | ``{pages}/s`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.system.paging.usage.average** |  | Swap usage aggregate of MongoDB metrics ``SWAP_USAGE_FREE, SWAP_USAGE_USED`` | ``KiBy`` | Gauge (Double) | ``direction`` |
| **mongodbatlas.system.paging.usage.max** |  | Swap usage aggregate of MongoDB metrics ``MAX_SWAP_USAGE_FREE``, ``MAX_SWAP_USAGE_USED`` | ``KiBy`` | Gauge (Double) | ``direction`` |

### Metric attributes

The following table lists the attributes for each metric:

| Name | Description |
| ---- | ----------- |
| ``assert_type`` | MongoDB assertion type |
| ``btree_counter_type`` | Database index effectiveness |
| ``cache_direction`` | Whether read into or written from |
| ``cache_status`` | Cache status |
| ``cluster_role`` | Whether process is acting as replica or primary |
| ``cpu_state`` | CPU state |
| ``cursor_state`` | Whether cursor is open or timed out |
| ``direction`` | Network traffic direction |
| ``disk_direction`` | Measurement type for disk operation |
| ``disk_status`` | Disk measurement type |
| ``document_status`` | Status of documents in the database |
| ``execution_type`` | Type of command |
| ``global_lock_state`` | Which queue is locked |
| ``memory_issue_type`` | Type of memory issue encountered |
| ``memory_state`` | Memory usage type |
| ``object_type`` | MongoDB object type |
| ``operation`` | Type of database operation |
| ``oplog_type`` | Oplog type |
| ``scanned_type`` | Objects or indexes scanned during query |
| ``storage_status`` | Views on database size |
| ``ticket_type`` | Type of ticket available |

## Get help

```{include} /_includes/troubleshooting.md
```
