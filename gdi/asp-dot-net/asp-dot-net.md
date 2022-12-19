(asp-dot-net)=

# ASP.NET
<meta name="description" content="Use this Splunk Observability Cloud integration to monitor ASP.NET applications. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `aspdotnet` monitor by using the SignalFx Smart Agent Receiver.

Use this integration to retrieve metrics for requests, errors, sessions, and worker processes from ASP.NET applications. 

This monitor is only available on Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Windows Performance Counters

Windows Performance Counters are the source of retrieved metrics. Most of the performance counters in this monitor are 
gauges that represent rates per second and percentages.

This monitor reports the instantaneous values of these Windows Performance Counters. Between collection intervals, spikes might occur in the
Performance Counters. To mitigate the effect of these spikes, decrease the reporting interval on the monitor so that it collects more frequently.

## Installation

```{include} /_includes/collector-installation-windows.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Configuration example

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/aspdotnet:
    type: aspdotnet
    ...  # Additional config
```

To complete the integration, include the monitor in a metrics pipeline. 
Add the monitor item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/aspdotnet]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| **Option**               | **Required** | **Type** | **Description**                                                                                                                                                      |
|--------------------------|--------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `counterRefreshInterval` | no           | `int64`  | This integer is the number of seconds that wildcards in counter paths should be expanded and how often to refresh counters from configuration. The default is `60s`. |
| `printValid`             | no           | `bool`   | Use this flag to print out the configurations that match available performance counters. Use the flag for debugging. The default is `false`.                         |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/dotnet/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
