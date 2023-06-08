(java-monitor)=

# Java metrics 

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Java monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `java-monitor` to retrieve metrics from a Java application.

This integration is available on Linux and Windows.

```{note}
To activate metrics collection in the OpenTelemetry Java agent, see {ref}`Activate metrics collection <enable_automatic_metric_collection>`.
```

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/java-monitor:
    type: java-monitor
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [java-monitor]
```

### Configuration settings

The following table shows the configuration options for the `java-monitor`:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | Host is filled in by auto-discovery if the receiver has a discovery rule. |
| `port` | no | `integer` | Port is filled in by auto-discovery if the receiver has a discovery rule. Default value is `0`. |
| `jarFilePath` | no | `string` | Path to the jar file that implements the monitoring logic. |
| `javaBinary` | no | `string` | By default, the agent use its bundled Java runtime (Java 8). If you wish to use a Java runtime that already exists on the system, specify the full path to the `java` binary here in `/usr/bin/java`. |
| `mainClass` | no | `string` | The class within the specified `jarFilePath` that contains a main method to execute. |
| `classPath` | no | `list of strings` | Additional class paths to set on the invoked Java subprocess. |
| `extraJavaArgs` | no | `list of strings` | Additional flags to the Java subprocess |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/java/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

