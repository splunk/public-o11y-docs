(microsoft-dotnet)=

# Microsoft .NET

<meta name="description" content="Use this Splunk Observability Cloud integration for the .Net (dotnet) apps monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `dotnet` monitor type to report metrics for .NET applications. 

This integration is only available on Windows.

This integration reports the instantaneous values for Windows Performance Counters. Most of these performance counters are gauges that represent rates per second and percentages. This means that in a collection interval, spikes might occur on the Performance Counters. The best way to mitigate this limitation is to increase the reporting interval on this monitor to collect more frequently.

The following is a list of the most critical .NET performance counters:

* Exceptions

* Logical threads

* Physical threads

* Heap bytes

* Time in GC

* Committed bytes

* Pinned objects

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-windows.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/dotnet:
    type: dotnet
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/dotnet]
```

### Configuration settings

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `counterRefreshInterval` | no | `int64` | Number of seconds that wildcards in counter paths should be expanded and how often to refresh counters from configuration. (**default:** `60s`) |
| `printValid` | no | `bool` | Print out the configurations that match available performance counters. This option is used for debugging. (**default:** `false`) |

## Metrics

This integration emits all metrics by default, but they are categorized as custom metrics. See the notes for more details.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/dotnet/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
