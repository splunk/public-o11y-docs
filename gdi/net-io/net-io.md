(net-io)=

# Network interface I/O

<meta name="description" content="Documentation on the net-io monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `net-io` monitor via the Smart Agent Receiver.

This monitor reports I/O metrics about network interfaces.

See [signalfx-agent/pkg/monitors/netio/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/netio) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `net-io` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: net-io
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/net-io:
    type: net-io
    ...  # Additional config
```

The following table shows the configuration options for the `net-io` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `interfaces` | no | `list of strings` | The network interfaces to send metrics about. This is an [overridable set](https://docs.signalfx.com/en/latest/integrations/agent/filtering.html#overridable-filters). (**default:** `[* !/^lo\d*$/ !/^docker.*/ !/^t(un|ap)\d*$/ !/^veth.*$/ !/^Loopback*/]`) |

On Linux hosts, this monitor relies on the `/proc` filesystem. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, specify the path using the top-level configuration `procPath`.

```yaml
procPath: /proc
monitors:
 - type: net-io
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="net-io" include="markdown"></div>
