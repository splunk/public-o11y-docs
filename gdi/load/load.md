(load)=

# Host process load

<meta name="description" content="Documentation on the load monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `load` monitor via the Smart Agent Receiver.

`load` monitors process load on the host. Process load is the average number of running or waiting processes over a certain time period (1, 5, and 15 minutes).

This monitor is only available on Linux.

See [signalfx-agent/pkg/monitors/load/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/load) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `load` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.


To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: load
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/load:
    type: load
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `perCPU` | no | `bool` |  (**default:** `false`) |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="collectd-load" include="markdown"></div>
