(protocols)=

# Network protocols

<meta name="description" content="Documentation on the protocols monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `protocols` monitor via the Smart Agent Receiver.

This monitor gathers metrics about the network protocol stacks running on the system.

See [protocols](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/protocols) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `protocols` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: protocols
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/protocols:
    type: protocols
    ...  # Additional config
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="collectd-protocols" include="markdown"></div>
