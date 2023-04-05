(load)=

# Host process load

<meta name="description" content="Use this Splunk Observability Cloud integration for the load monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `load` monitor type for the Smart Agent Receiver. If you want to collect CPU load metrics, use the {ref}`host-metrics-receiver` instead of this monitor type.

Use this integration to monitor process load on the host. The process load is defined as the number of runnable tasks in the run queue and is provided by many operating systems as a 1, 5, or 15 minute average.

This integration is only available on Linux.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation-linux-only.md
```
## Configuration

```{include} /_includes/configuration.md
```

```yaml
receivers:
  smartagent/load:
    type: collectd/load
    ...  # Additional config
```

To complete the integration, include the monitor type in a metrics pipeline. Add the monitor item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/load]
```

### Configuration options

The following table shows the configuration options for this monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `perCPU` | no | `bool` | The default value is `false`. |


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/load/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
