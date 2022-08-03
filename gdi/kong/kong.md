(kong)=

# Kong

<meta name="description" content="Documentation for the kong monitor">

## Description

The [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `kong` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). This monitor requires Version 0.11.2+ of Kong and version 0.0.1+ of [kong-plugin-signalfx](https://github.com/signalfx/kong-plugin-signalfx).

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/kong) on GitHub.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Install the Lua module on all Kong servers. For more information, see [SignalFx Kong Plugin](https://github.com/signalfx/kong-plugin-signalfx/blob/master/README.md).
2. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
3. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kong` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: kong
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/kong:
    type: kong
    ...  # Additional config
```
## Metrics

These metrics are available for this integration.

<div class="metrics-table" type="kong"  include="markdown"></div>
