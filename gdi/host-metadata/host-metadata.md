(host-metadata)=

# Host metadata properties

<meta name="description" content="Use this Splunk Observability Cloud integration for the host-metadata monitor. See benefits, install, configuration, and metrics">

## Description

**Note:** This monitor is deprecated in favor of the `host-metrics-receiver` monitor. Switch to that receiver as the Smart Agent is deprecated. To learn more, see {ref}`host-metrics-receiver`.

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `host-metadata` monitor for the Smart Agent Receiver.

Use this integration to collect metadata properties about a host.

This integration is required for some views in Splunk Observability Cloud to operate. This monitor accepts endpoints. This monitor does not allow multiple instances.

In containerized environments, host `/etc` and `/proc` might not be located
directly under the root path. You can specify the path to `proc` and `etc` using the top level agent configurations `procPath` and `etcPath`, as shown in the following example:

```yaml
procPath: /proc
etcPath: /etc
monitors:
  - type: host-metadata
```

Metadata updates occur on a sparse interval of approximately
1m, 1m, 1h, and 1d, and continue repeating once per day.
Setting the `Interval` configuration for this monitor does not affect the
sparse interval on which metadata is collected.

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

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/host-metadata:
    type: host-metadata
    ... # Additional config
```

To complete the monitor activation, you must also include the `smartagent/host-metadata` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/host-metadata]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/metadata/hostmetadata/metadata.yaml"></div>

```{include} /_includes/metric-defs.md
```

### Non-default metrics (version 4.7.0+)

To emit metrics that are not default, you can add those metrics in the
generic monitor-level `extraMetrics` configuration option. Metrics derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics`.

To see a list of metrics that will be emitted, you can run `agent-status
monitors` after configuring this monitor in a running agent instance.

## Get help

```{include} /_includes/troubleshooting.md
```