(legacy-otel-mappings)=

# Metrics and metrics metadata

<meta name="Description" content="Documentation on the legacy SignalFX Smart Agent and OpenTelemetry Collector mappings in Splunk Observability Cloud">

This topic is for users that are migrating from using the SignalFx Smart Agent to using the Splunk Distribution of OpenTelemetry Collector. In addition to providing a table for OpenTelemetry values and their legacy equivalents, this topic describes how to use the Mapping Service.

## The Mapping Service

The Mapping Service is a transition tool that defines equivalencies between legacy SignalFx Smart Agent (deprecated) metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. Mapping supports multiple observers, deployment types, and kinds of metadata.

The Mapping Service enables you to migrate from Smart Agent deployments to OpenTelemetry deployments without significantly disrupting the form or content of your existing dashboards and detectors. The Mapping Service also enables you to slowly transition from the Smart Agent to OpenTelemetry across your organization (though you cannot use both agents simultaneously on the same host).

Mapping happens automatically as a background operation. Use the following links to learn more about mapping and to view mapping definitions:

- <a href="https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#how-mapping-makes-upgrades-easier" target="_blank">How mapping makes upgrades easier</a>, which describes the Mapping Service in more detail.
- <a href="https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#get-started-mapping-transition-rept" target="_blank">About the mapping service transition impact report</a>, which describes how to migrate your data and metadata from dashboards, charts, and detectors from the Smart Agent to the Splunk Distribution of OpenTelemetry Collector.
- <a href="https://docs.splunk.com/Observability/metrics-and-metadata/metrics-finder-metadata-catalog.html" target="_blank">Use the Metric Finder and Metadata Catalog</a>, which shows you how to use the Metric Finder and Metadata Catalog to find, view, and edit information about the metadata in your system.

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
