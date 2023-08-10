(telegraf-win-perf-counters)=

# Windows Performance Counters

<meta name="description" content="Use this Splunk Observability Cloud integration for the Telegraf win_perf_counters monitor for Windows. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `telegraf/win_perf_counters` monitor type to receive metrics from Windows performance counters.

This monitor is available on Windows.

```{note}
For information on the OpenTelemetry receiver based on the Windows Performance Counters input plugin, see {ref}`Windows Performance Counters receiver <windowsperfcounters-receiver>`.
```

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

```yaml
receivers:
  smartagent/telegraf/win_perf_counters:
    type: telegraf/win_perf_counters
    ... # Additional config
```

The following snippet shows a sample configuration with counters and settings:

```yaml
receivers:
 - type: telegraf/win_perf_counters
   printValid: true
   objects:
    - objectName: "Processor"
      instances:
       - "*"
      counters:
       - "% Idle Time"
       - "% Interrupt Time"
       - "% Privileged Time"
       - "% User Time"
       - "% Processor Time"
      includeTotal: true
      measurement: "win_cpu"
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/telegraf/win_perf_counters]
```

### Configuration settings

The following table shows the configuration options for the `telegraf/win_perf_counters` receiver:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `objects` | No | `list of objects (see below)` | Contains the configuration of the monitor. |
| `counterRefreshInterval` | No | `int64` | Frequency of expansion of the counter paths and counter refresh. The default value is `5s`) |
| `useWildCardExpansion` | No | `bool` | If set to `true`, instance indexes are included in instance names, and wildcards are expanded and localized when applicable. The default value is `false`. |
| `printValid` | No | `bool` | Print the configurations that match available performance counters. The default value is `false`. |
| `pcrMetricNames` | No | `bool` | If `true`, metric names are emitted in the `PerfCounterReporter` format. The default value is `false`. |

The nested `objects` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `objectName` | No | `string` | The name of a Windows performance counter object. |
| `counters` | No | `list of strings` | The name of the counters to collect from the performance counter object. |
| `instances` | No | `list of strings` | The Windows performance counter instances to retrieve for the performance counter object. |
| `measurement` | No | `string` | The name of the Telegraf measurement to be used as a metric name. |
| `warnOnMissing` | No | `bool` | Log a warning if the performance counter object is missing. The default value is `false`. |
| `failOnMissing` | No | `bool` | Throws an error if the performance counter object is missing. The default value is `false`. |
| `includeTotal` | No | `bool` | Include the total instance when collecting performance counter metrics. The default value is `false`. |

## Metrics

The Splunk Distribution of OpenTelemetry Collector doesn't filter metrics for this receiver.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```