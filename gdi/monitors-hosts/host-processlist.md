(processlist)=

# Host process list

<meta name="description" content="Use this Splunk Observability Cloud integration for the processlist monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `processlist` monitor type to report the running processes for a host, similar to the output of the `top` or `ps` commands on *nix systems. The output format is a special base64-encoded event that appears under the Infrastructure view for a specific host. Historical process information is not retained on Splunk Observability Cloud.

This integration is available on Linux and Windows.

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

```yaml
receivers:
  smartagent/processlist:
    type: processlist
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file. The following example shows how to configure the `logs` pipeline using the required `signalfx` exporter:

```yaml
service:
  pipelines:
    logs/signalfx:
      receivers: [signalfx, smartagent/processlist]
      exporters: [signalfx]
      processors: [memory_limiter, batch, resourcedetection]
```

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics for this monitor.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
