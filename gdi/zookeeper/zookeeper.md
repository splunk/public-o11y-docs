(zookeeper)=

# Apache Zookeeper
<meta name="description" content="Use this Splunk Observability Cloud integration for the Apache Zookeeper monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Apache Zookeeper monitor using the Smart Agent Receiver.

This monitor keeps track of an Apache Zookeeper instance using the Zookeeper plugin. This plugin is installed with the Smart 
Agent so no additional installation is required to use this monitor. The plugin supports Zookeeper 3.4.0 and higher.

This integration is available for Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Configuration example

```
receivers:
smartagent/zookeeper:
type: collectd/zookeeper
... # Additional config
```

To complete the integration, include the monitor in a metrics pipeline. Add the monitor item to the 
`service/pipelines/metrics/receivers` section of your configuration file. For example:

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

### Group leader metrics

All of the following metrics are part of the `leader` metric group. To enable them, add `leader` to the `extraGroups` setting:

 - `gauge.zk_followers`
 - `gauge.zk_pending_syncs`
 - `gauge.zk_synced_followers`

## Get help

```{include} /_includes/troubleshooting.md
```
