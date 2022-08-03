(dotnet)=

# Microsoft .NET

<meta name="description" content="Documentation on the dotnet monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `dotnet` monitor via the Smart Agent Receiver.

This monitor reports metrics for .NET applications.

This monitor is only available on Windows.

See [signalfx-agent/pkg/monitors/dotnet/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/dotnet) for the monitor source.


### Windows Performance Counters

The underlying source for these metrics are Windows Performance Counters. Most of the performance counters that we query in this monitor are actually Gauges that represent rates per second and percentages.

This monitor reports the instantaneous values for these Windows Performance Counters. This means that in a collection interval, spikes could occur on the Performance Counters. The best way to mitigate this limitation is to increase the reporting interval on this monitor to collect more frequently.

Here is a list of the most critical .NET performance counters:

* Exceptions

* Logical threads

* Physical threads

* Heap bytes

* Time in GC

* Committed bytes

* Pinned objects


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `dotnet` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.


To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: dotnet
    ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/dotnet:
    type: dotnet
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `counterRefreshInterval` | no | `int64` | Number of seconds that wildcards in counter paths should be expanded and how often to refresh counters from configuration. (**default:** `60s`) |
| `printValid` | no | `bool` | Print out the configurations that match available performance counters. This used for debugging. (**default:** `false`) |


## Metrics

These are the metrics available for this integration.

This monitor emits all metrics by default. However, none are categorized as [container/host](https://docs.signalfx.com/en/latest/admin-guide/usage.html#about-custom-bundled-and-high-resolution-metrics). They are all custom.

<div class="metrics-table" type="dotnet" include="markdown"></div>
