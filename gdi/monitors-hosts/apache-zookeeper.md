(zookeeper)=

# Apache Zookeeper
<meta name="description" content="Use this Splunk Observability Cloud integration for the Apache Zookeeper monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Apache Zookeeper monitor type to keep track of an Apache Zookeeper instance using the Zookeeper plugin. 

This integration is only available on Kubernetes and Linux.

The plugin supports Zookeeper 3.4.0 and higher.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
smartagent/zookeeper:
type: collectd/zookeeper
... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/zookeeper]
```

### Configuration settings

The following table shows the configuration options for the Apache Zookeeper monitor:

| **Option**     | **Required** | **Type**  | **Description**                                                                                                                                                                                                       |
|----------------|--------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pythonBinary` | no           | `string`  | This string contains a path to a python binary that you want to use to execute the Python code. If you don't set it, the system uses a built-in runtime will be used. The string can include arguments to the binary. |
| `host`         | **yes**      | `string`  | This string specifies the host or IP address of the Apache Zookeeper node.                                                                                                                                            |
| `port`         | **yes**      | `integer` | This value specifies the main port of the Zookeeper node.                                                                                                                                                             |
| `name`         | no           | `string`  | If you provide this string, the system inserts it as the value of the `plugin_instance` dimension for emitted                                                                                                         |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/zookeeper/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Group leader metrics

All of the following metrics are part of the `leader` metric group. To activate them, add `leader` to the `extraGroups` setting:

 - `gauge.zk_followers`
 - `gauge.zk_pending_syncs`
 - `gauge.zk_synced_followers`

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
