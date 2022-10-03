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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/receiver/mongodbatlasreceiver/metadata.yaml"></div>

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
