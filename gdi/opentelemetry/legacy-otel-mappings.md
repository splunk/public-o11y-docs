(legacy-otel-mappings)=

# Mapping service and mapping report

<meta name="Description" content="Documentation on the legacy SignalFX Smart Agent and OpenTelemetry Collector mappings in Splunk Observability Cloud">

The mapping service lets you migrate from Smart Agent to OpenTelemetry deployments without significantly disrupting the form or content of your existing dashboards, charts, and detectors. It automatically translates collectd (Smart Agent) conventions into the syntax used by the Collector as a background operation. 

Mapping supports multiple observers, deployment types, and kinds of metadata. 

## How does the mapping service work?

The mapping service is a transition tool that defines equivalencies between legacy SignalFx Smart Agent metric naming and semantic conventions and the OpenTelemetry names and formats: 

- It applies to metrics and metric time series (MTS), dimensions, and properties. 
- Mapping logic treats any of the names for a metric or property as referring to that same metric or property in OpenTelemetry, without tracking versions.

For example, if you track CPU utilization for your Kubernetes pod, your analytics can use the ``kubernetes.container_cpu_limit`` value. In that case, the mapping service updates your existing queries to include both legacy semantics and new semantics (such as ``k8s.container.cpu_limit``) joined by an OR clause. 

### Navigate your data

Whether you're using the Smart Agent or the Collector, your original dashboards and detectors function the same way. 

- Infrastructure Navigator views use the mapping service to show both old collection data and new collection data.
- After you've migrated to the Collector, read <a href="https://docs.splunk.com/Observability/metrics-and-metadata/metrics-finder-metadata-catalog.html" target="_blank">Use the Metric Finder and Metadata Catalog</a> to learn how to use the Metric Finder and Metadata Catalog to find, view, and edit information about the metadata in your system.

## Obtain the transition mapping report

The **Mapping and OTel Transition Impact Report** explains how the transition from Smart Agent to OpenTelemetry affects some of the variables and saved filters in the following dashboards, charts, and detectors.

The mapping impact report also tells you where to find whatever subset of your content calls functions with Smart Agent names, so that you can update that content either by hand or programmatically to complete your transition to open telemetry.

### Access the transition report

To access the migration transition impact report, follow these steps:

1. Log in to Splunk Observability Cloud.
2. In the navigation menu, select **Settings** and then select **Billing and Usage**.
3. Click the **View detailed usage reports** link.
4. Select the **OpenTelemetry Migration** tab.
5. Click **Download** to open the report as a comma-separated values file.

### What is flagged for update in translation

The report is specific to your computing environment. It flags the following items and tells you where to find and update them in your collection of plots, filters, and functions:

- Wildcards
- Direct references to Smart Agent metrics
- Filters that use Smart Agent dimensions
- Aggregates that use Smart Agent dimensions

The mapping impact report also shows which OpenTelemetry metrics and dimensions work well as replacements for specific Smart Agent metrics and dimensions, with the important exception of wildcards not supported by OpenTelemetry.

### Interpret the mapping impact report

The Mapping and OTel Transition Impact Report summarizes the scope of component name change associated with your migration to open telemetry. It assesses your data set to list the tokens currently used as metric, dimension, property or tag names, and highlights migration rules that could generate conflict between old and new equivalence groups.

The report explains when migration from an old MTS to a new MTS will trigger detectors, and which detectors those are. For example, heartbeat detectors working with un-aggregated MTS are affected by design, but if a heartbeat detector is working with a dimension that continues across the transition to OTel, then the mapping service ensures continuity so that you do not have to restart that detector.

The mapping transition impact report assesses migration effects across three categories:

- Data object types
- Team responsibilities
- Migration mitigation steps you should take

#### Avoid unexpected results

Because the mapping service only renames existing MTS when filtering or grouping requires renaming to conform to OpenTelemetry Collector conventions, correlation across different datasets yields unexpected results when a mapped MTS is correlated with an unmapped MTS. This can happen, for example, when an MTS attempts to correlate with a time-shifted or transformed version of itself.

If you have charts and detectors built from formulas whose terms use different agents, you won't get the alerts you expect.

To resolve this issue, explicitly filter or group by dimensions so that Mapping Service renames the fields in all the MTS in the job to match the name you specified in the filter or grouping.

#### Data object type information

The mapping impact report explains migration impacts within your organization to the following object types:

- Dashboards
- Charts
- Detectors

The report shows how many objects of each type are affected, and includes tables that show where to find the affected objects. You can read the report to see, for example, a list of all affected charts on a given dashboard or within a dashboard group.

#### Team information

The mapping impact report extracts information from your data set about stakeholders, meaning the people who created object types or are affected by changes to them because they're on email lists of employees to be notified in the event of, for example, a detector being triggered by a critical alert condition.

When applicable, the report shows the names of teams linked to particular detectors. The report also identifies people or teams linked to particular dashboard groups.

#### Migration mitigation steps

The mapping impact report explains what effect migration will have on the content highlighted in it, so that you can modify that content as needed to ensure a smoother transition.

Flagged items that need to be modified include the following (as listed in the report):

- Wildcards used in a plot, filter, or function.
- Direct references to Smart Agent metrics.
- Filters that use Smart Agent dimensions.
- Aggregates that use Smart Agent dimensions.

While the mapping impact report highlights items that need revising because they use legacy syntax or conventions, it also pairs those items with the OTel-based metrics and dimensions that you can use as substitutes for them.

## OpenTelemetry values and their legacy equivalents

Refer to the following table for OpenTelemetry values and their legacy equivalents:

| **Legacy semantics** | **OpenTelemetry semantics** |
|---|---|
| `container_fs_usage_bytes` (Metric) | `container.filesystem.usage` (Metric) |
| `container_id` (Dimension) | `container.id` (dimension) |
| `container_image` (Dimension) | `container.image.name` (dimension) |
| `container_memory_available_bytes` (Metric) | `container.memory.available` (Metric) |
| `container_memory_major_page_faults` (Metric) | `container.memory.major_page_faults` (Metric) |
| `container_memory_page_faults` (Metric) | `container.memory.page_faults` (Metric) |
| `container_memory_rss_bytes` (Metric) | `container.memory.rss` (Metric) |
| `container_memory_usage_bytes` (Metric) | `container.memory.usage` (Metric) |
| `container_memory_working_set_bytes` (Metric) | `container.memory.working_set` (Metric) |
| `container_name` (Dimension) | `container.name` (dimension) |
| `container_spec_name` (Dimension) | `k8s.container.name` (dimension) |
| `container_status_reason` (Property) | `container.status.reason` (Property) |
| `container_status` (Property) | `container.status` (Property) |
| `cronJob_uid` (Property) | `k8s.cronjob.uid` (Property) |
| `cronJob` (Property) | `k8s.cronjob.name` (Property) |
| `daemonSet_uid` (Property) | `k8s.daemonset.uid` (Property) |
| `daemonSet` (Property) | `k8s.daemonset.name` (Property) |
| `deployment_uid` (Property) | `k8s.deployment.uid` (Property) |
| `deployment` (Property) | `k8s.deployment.name` (Property) |
| `df_complex.free` (Metric) | `system.filesystem.usage` (Metric) with dimension name `state` equal to `free` |
| `df_complex.reserved` (Metric) | `system.filesystem.usage` (Metric) with dimension name `state` equal to `reserved` |
| `df_complex.used` (Metric) | `system.filesystem.usage` (Metric) with dimension name `state` equal to `used` |
| `df_inodes.free` (Metric) | `system.filesystem.inodes.usage` (Metric) with dimension name `state` equal to `free` |
| `df_inodes.used` (Metric) | `system.filesystem.inodes.usage` (Metric) with dimension name `state` equal to `used` |
| `disk_merged.read` (Metric) | `system.disk.merged` (Metric) with dimension name `direction` equal to `read` and with the following dimensions renamed: `device` to `disk` |
| `disk_merged.write` (Metric) | `system.disk.merged` (Metric) with dimension name `direction` equal to `write` and with the following dimensions renamed: `device` to `disk` |
| `disk_octets.read` (Metric) | `system.disk.io` (Metric) with dimension name `direction` equal to `read` and with the following dimensions renamed: `device` to `disk` |
| `disk_octets.write` (Metric) | `system.disk.io` (Metric) with dimension name `direction` equal to `write` and with the following dimensions renamed: `device` to `disk` |
| `disk_ops.read` (Metric) | `system.disk.operations` (Metric) with dimension name `direction` equal to `read` and with the following dimensions renamed: `device` to `disk` |
| `disk_ops.write` (Metric) | `system.disk.operations` (Metric) with dimension name `direction` equal to `write` and with the following dimensions renamed: `device` to `disk` |
| `disk_time.read` (Metric) | `system.disk.time` (Metric) with dimension name `direction` equal to `read` and with the following dimensions renamed: `device` to `disk` |
| `disk_time.write` (Metric) | `system.disk.time` (Metric) with dimension name `direction` equal to `write` and with the following dimensions renamed: `device` to `disk` |
| `host` (dimension) | `host.name` (dimension) |
| `if_dropped.rx` (Metric) | `system.network.dropped` (Metric) with dimension name `direction` equal to `receive` and with the following dimensions renamed: `device` to `interface` |
| `if_dropped.tx` (Metric) | `system.network.dropped` (Metric) with dimension name `direction` equal to `transmit` and with the following dimensions renamed: `device` to `interface` |
| `if_errors.rx` (Metric) | `system.network.errors` (Metric) with dimension name `direction` equal to `receive` and with the following dimensions renamed: `device` to `interface` |
| `if_errors.tx` (Metric) | `system.network.errors` (Metric) with dimension name `direction` equal to `transmit` and with the following dimensions renamed: `device` to `interface` |
| `if_octets.rx` (Metric) | `system.network.io` (Metric) with dimension name `direction` equal to `receive` and with the following dimensions renamed: `device` to `interface` |
| `if_octets.tx` (Metric) | `system.network.io` (Metric) with dimension name `direction` equal to `transmit` and with the following dimensions renamed: `device` to `interface` |
| `if_packets.rx` (Metric) | `system.network.packets` (Metric) with dimension name `direction` equal to `receive` and with the following dimensions renamed: `device` to `interface` |
| `if_packets.tx` (Metric) | `system.network.packets` (Metric) with dimension name `direction` equal to `transmit` and with the following dimensions renamed: `device` to `interface` |
| `job_uid` (Property) | `k8s.job.uid` (Property) |
| `job` (Property) | `k8s.job.name` (Property) |
| `kubernetes.container_cpu_limit` (Metric) | `k8s.container.cpu_limit` (Metric) |
| `kubernetes.container_cpu_request` (Metric) | `k8s.container.cpu_request` (Metric) |
| `kubernetes.container_ephemeral_storage_limit` (Metric) | `k8s.container.ephemeral-storage_limit` (Metric) |
| `kubernetes.container_ephemeral_storage_request` (Metric) | `k8s.container.ephemeral-storage_request` (Metric) |
| `kubernetes.container_memory_limit` (Metric) | `k8s.container.memory_limit` (Metric) |
| `kubernetes.container_memory_request` (Metric) | `k8s.container.memory_request` (Metric) |
| `kubernetes.container_ready` (Metric) | `k8s.container.ready` (Metric) |
| `kubernetes.container_restart_count` (Metric) | `k8s.container.restarts` (Metric) |
| `kubernetes.cronjob.active` (Metric) | `k8s.cronjob.active_jobs` (Metric) and with the following dimensions renamed: `k8s.cronjob.name` to `kubernetes_name`, `k8s.cronjob.uid` to `kubernetes_uid` |
| `kubernetes.daemon_set.current_scheduled` (Metric) | `k8s.daemonset.current_scheduled_nodes` (Metric) and with the following dimensions renamed: `k8s.daemonset.name` to `kubernetes_name`, `k8s.daemonset.uid` to `kubernetes_uid` |
| `kubernetes.daemon_set.desired_scheduled` (Metric) | `k8s.daemonset.desired_scheduled_nodes` (Metric) and with the following dimensions renamed: `k8s.daemonset.name` to `kubernetes_name`, `k8s.daemonset.uid` to `kubernetes_uid` |
| `kubernetes.daemon_set.misscheduled` (Metric) | `k8s.daemonset.misscheduled_nodes` (Metric) and with the following dimensions renamed: `k8s.daemonset.name` to `kubernetes_name`, `k8s.daemonset.uid` to `kubernetes_uid` |
| `kubernetes.daemon_set.ready` (Metric) | `k8s.daemonset.ready_nodes` (Metric) and with the following dimensions renamed: `k8s.daemonset.name` to `kubernetes_name`, `k8s.daemonset.uid` to `kubernetes_uid` |
| `kubernetes.deployment.available` (Metric) | `k8s.deployment.available` (Metric) and with the following dimensions renamed: `k8s.deployment.name` to `kubernetes_name`, `k8s.deployment.uid` to `kubernetes_uid` |
| `kubernetes.deployment.desired` (Metric) | `k8s.deployment.desired` (Metric) and with the following dimensions renamed: `k8s.deployment.name` to `kubernetes_name`, `k8s.deployment.uid` to `kubernetes_uid` |
| `kubernetes.hpa.spec.max_replicas` (Metric) | `k8s.hpa.max_replicas` (Metric) and with the following dimensions renamed: `k8s.hpa.name` to `kubernetes_name`, `k8s.hpa.uid` to `kubernetes_uid` |
| `kubernetes.hpa.spec.min_replicas` (Metric) | `k8s.hpa.min_replicas` (Metric) and with the following dimensions renamed: `k8s.hpa.name` to `kubernetes_name`, `k8s.hpa.uid` to `kubernetes_uid` |
| `kubernetes.hpa.status.current_replicas` (Metric) | `k8s.hpa.current_replicas` (Metric) and with the following dimensions renamed: `k8s.hpa.name` to `kubernetes_name`, `k8s.hpa.uid` to `kubernetes_uid` |
| `kubernetes.hpa.status.desired_replicas` (Metric) | `k8s.hpa.desired_replicas` (Metric) and with the following dimensions renamed: `k8s.hpa.name` to `kubernetes_name`, `k8s.hpa.uid` to `kubernetes_uid` |
| `kubernetes.job.active` (Metric) | `k8s.job.active_pods` (Metric) and with the following dimensions renamed: `k8s.job.name` to `kubernetes_name`, `k8s.job.uid` to `kubernetes_uid` |
| `kubernetes.job.completions` (Metric) | `k8s.job.desired_successful_pods` (Metric) and with the following dimensions renamed: `k8s.job.name` to `kubernetes_name`, `k8s.job.uid` to `kubernetes_uid` |
| `kubernetes.job.failed` (Metric) | `k8s.job.failed_pods` (Metric) and with the following dimensions renamed: `k8s.job.name` to `kubernetes_name`, `k8s.job.uid` to `kubernetes_uid` |
| `kubernetes.job.parallelism` (Metric) | `k8s.job.max_parallel_pods` (Metric) and with the following dimensions renamed: `k8s.job.name` to `kubernetes_name`, `k8s.job.uid` to `kubernetes_uid` |
| `kubernetes.job.succeeded` (Metric) | `k8s.job.successful_pods` (Metric) and with the following dimensions renamed: `k8s.job.name` to `kubernetes_name`, `k8s.job.uid` to `kubernetes_uid` |
| `kubernetes.namespace_phase` (Metric) | `k8s.namespace.phase` (Metric) |
| `kubernetes.node_memory_pressure` (Metric) | `k8s.node.condition_memory_pressure` (Metric) |
| `kubernetes.node_network_unavailable` (Metric) | `k8s.node.condition_network_unavailable` (Metric) |
| `kubernetes.node_out_of_disk` (Metric) | `k8s.node.condition_out_of_disk` (Metric) |
| `kubernetes.node_p_i_d_pressure` (Metric) | `k8s.node.condition_p_i_d_pressure` (Metric) |
| `kubernetes.node_ready` (Metric) | `k8s.node.condition_ready` (Metric) |
| `kubernetes.pod_phase` (Metric) | `k8s.pod.phase` (Metric) |
| `kubernetes.replica_set.available` (Metric) | `k8s.replicaset.available` (Metric) and with the following dimensions renamed: `k8s.replicaset.name` to `kubernetes_name`, `k8s.replicaset.uid` to `kubernetes_uid` |
| `kubernetes.replica_set.desired` (Metric) | `k8s.replicaset.desired` (Metric) and with the following dimensions renamed: `k8s.replicaset.name` to `kubernetes_name`, `k8s.replicaset.uid` to `kubernetes_uid` |
| `kubernetes.replication_controller.available` (Metric) | `k8s.replication_controller.available` (Metric) and with the following dimensions renamed: `k8s.replicationcontroller.name` to `kubernetes_name`, `k8s.replicationcontroller.uid` to `kubernetes_uid` |
| `kubernetes.replication_controller.desired` (Metric) | `k8s.replication_controller.desired` (Metric) and with the following dimensions renamed: `k8s.replicationcontroller.name` to `kubernetes_name`, `k8s.replicationcontroller.uid` to `kubernetes_uid` |
| `kubernetes.resource_quota_hard` (Metric) | `k8s.resource_quota.hard_limit` (Metric) and with the following dimensions renamed: `k8s.resourcequota.uid` to `kubernetes_uid` |
| `kubernetes.resource_quota_used` (Metric) | `k8s.resource_quota.used` (Metric) and with the following dimensions renamed: `k8s.resourcequota.uid` to `kubernetes_uid` |
| `kubernetes.stateful_set.current` (Metric) | `k8s.statefulset.current_pods` (Metric) and with the following dimensions renamed: `k8s.statefulset.name` to `kubernetes_name`, `k8s.statefulset.uid` to `kubernetes_uid` |
| `kubernetes.stateful_set.desired` (Metric) | `k8s.statefulset.desired_pods` (Metric) and with the following dimensions renamed: `k8s.statefulset.name` to `kubernetes_name`, `k8s.statefulset.uid` to `kubernetes_uid` |
| `kubernetes.stateful_set.ready` (Metric) | `k8s.statefulset.ready_pods` (Metric) and with the following dimensions renamed: `k8s.statefulset.name` to `kubernetes_name`, `k8s.statefulset.uid` to `kubernetes_uid` |
| `kubernetes.stateful_set.updated` (Metric) | `k8s.statefulset.updated_pods` (Metric) and with the following dimensions renamed: `k8s.statefulset.name` to `kubernetes_name`, `k8s.statefulset.uid` to `kubernetes_uid` |
| `kubernetes.volume_available_bytes` (Metric) | `k8s.volume.available` (Metric) |
| `kubernetes.volume_capacity_bytes` (Metric) | `k8s.volume.capacity` (Metric) |
| `kubernetes.volume_inodes_free` (Metric) | `k8s.volume.inodes.free` (Metric) |
| `kubernetes.volume_inodes_used` (Metric) | `k8s.volume.inodes.used` (Metric) |
| `kubernetes.volume_inodes` (Metric) | `k8s.volume.inodes` (Metric) |
| `kubernetes_cluster` (Dimension) | `k8s.cluster.name` (dimension) |
| `kubernetes_namespace` (Dimension) | `k8s.namespace.name` (dimension) |
| `kubernetes_node_uid` (Dimension) | `k8s.node.uid` (dimension) |
| `kubernetes_node` (Dimension) | `k8s.node.name` (dimension) |
| `kubernetes_pod_name` (Dimension) | `k8s.pod.name` (dimension) |
| `kubernetes_pod_uid` (Dimension) | `k8s.pod.uid` (dimension) |
| `kubernetes_workload_name` (Property) | `k8s.workload.name` (Property) |
| `kubernetes_workload` (Property) | `k8s.workload.kind` (Property) |
| `load.longterm` (Metric) | `system.cpu.load_average.15m` (Metric) |
| `load.midterm` (Metric) | `system.cpu.load_average.5m` (Metric) |
| `load.shortterm` (Metric) | `system.cpu.load_average.1m` (Metric) |
| `memory.buffered` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `buffered` |
| `memory.cached` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `cached` |
| `memory.free` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `free` |
| `memory.inactive` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `inactive` |
| `memory.slab_recl` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `slab_reclaimable` |
| `memory.slab_unrecl` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `slab_unreclaimable` |
| `memory.used` (Metric) | `system.memory.usage` (Metric) with dimension name `state` equal to `used` |
| `pod_network_receive_bytes_total` (Metric) | `k8s.pod.network.io` (Metric) with dimension name `direction` equal to `receive` |
| `pod_network_receive_errors_total` (Metric) | `k8s.pod.network.errors` (Metric) with dimension name `direction` equal to `receive` |
| `pod_network_transmit_bytes_total` (Metric) | `k8s.pod.network.io` (Metric) with dimension name `direction` equal to `transmit` |
| `pod_network_transmit_errors_total` (Metric) | `k8s.pod.network.errors` (Metric) with dimension name `direction` equal to `transmit` |
| `process.rss_memory_bytes` (Metric) | `process.memory.physical_usage` (Metric) |
| `quota_name` (Dimension) | `k8s.resourcequota.name` (dimension) |
| `replicaSet_uid` (Property) | `k8s.replicaset.uid` (Property) |
| `replicaSet` (Property) | `k8s.replicaset.name` (Property) |
| `statefulSet_uid` (Property) | `k8s.statefulset.uid` (Property) |
| `statefulSet` (Property) | `k8s.statefulset.name` (Property) |
| `vmpage_faults.majflt` (Metric) | `system.paging.faults` (Metric) with dimension name `type` equal to `major` |
| `vmpage_faults.minflt` (Metric) | `system.paging.faults` (Metric) with dimension name `type` equal to `minor` |

You can find a table outlining OpenTelemetry values and their legacy equivalents in GitHub at <a href="https://github.com/signalfx/integrations/blob/mappings/mappings/mappings.md" target="_blank">Legacy to OTel semantics mapping table</a>.
