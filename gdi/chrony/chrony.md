(chrony)=

# Chrony NTP

<meta name="description" content="Documentation for the chrony monitor">

## Description

The [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `chrony` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). The integration monitors NTP data from a chrony instance.

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/chrony) on GitHub.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Deploy the Splunk OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `chrony` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: chrony
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/chrony:
    type: chrony
    ...  # Additional config
```


## Metrics

There are no metrics available for this integration.


<!--- <div class="metrics-table" type="collectd-chrony"  include="markdown"></div> --> 