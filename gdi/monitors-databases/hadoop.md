(hadoop)=
# Hadoop

<meta name="description" content="Use this Splunk Observability Cloud integration for the hadoop monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Hadoop monitor type to collect metrics from the following components of a Hadoop 2.0 or higher cluster:

- Cluster Metrics
- Cluster Scheduler
- Cluster Applications
- Cluster Nodes
- MapReduce Jobs

This integration uses the REST API. If a remote JMX port is exposed in the Hadoop cluster, then you can also configure the `hadoopjmx` monitor to collect additional metrics about the Hadoop cluster.

This integration is only available on Kubernetes and Linux.

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
  smartagent/hadoop:
    type: collectd/hadoop
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/hadoop]
```

### Configuration options

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Resource Manager Hostname |
| `port` | **yes** | `integer` | Resource Manager Port |
| `verbose` | no | `bool` | Log verbose information about the plugin (**default:** `false`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/hadoop/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
