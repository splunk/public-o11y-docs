(cpu)=

# CPU

<meta name="description" content="Documentation on the cpu monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `cpu` monitor via the Smart Agent Receiver.

This monitor collects CPU usage data using the `cpu` monitor. It aggregates the per-core CPU data into a single metric and sends it to Splunk Observability Cloud. The plug converts raw jiffy counts from the `cpu` monitor to the `cpu.utilization` metric (percent utilization).

See [signalfx-agent/pkg/monitors/collectd/cpu/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/cpu) for the monitor source.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `cpu` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

If you are using this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: cpu
   ...  # Additional config
```

If you are using this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/cpu:
    type: cpu
    ... # Additional config
```

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="collectd-cpu"  include="markdown"></div>
