(processlist)=

# Host process list

<meta name="description" content="Documentation on the processlist monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `processlist` monitor via the Smart Agent Receiver.

This monitor reports the currently running processes for a host, analogous to how the `top` or `ps` command on Unix/Linux systems works. The output format is a special base64-encoded event that gets processed by our backend and displayed under the Infrastructure view for a specific host. Historical process information is not retained on the backend, only the most recent version.

See [signalfx-agent/pkg/monitors/processlist/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/processlist) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `processlist` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: processlist
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/processlist:
    type: processlist
    ...  # Additional config
```

When used with the Smart Agent Receiver, this monitor must be used in a `logs` pipeline with a [Resource Detection processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md). For more information, see [SignalFx Smart Agent Receiver Configuration](https://github.com/signalfx/splunk-otel-collector/blob/8a52d529697078b26c86774f20e44098b5287c1a/internal/receiver/smartagentreceiver/README.md#configuration).


## Metrics

There are no metrics available for this integration.
