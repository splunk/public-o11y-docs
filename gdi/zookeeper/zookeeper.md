(zookeeper)=

# Apache Zookeeper

<meta name="description" content="Documentation on the zookeeper monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `zookeeper` monitor via the Smart Agent Receiver.

This monitor keeps track of an Apache Zookeeper instance using the [Zookeeper plugin](https://github.com/signalfx/collectd-zookeeper). This plugin is installed with the Smart Agent so no additional installation is required to use this monitor. Supports Zookeeper 3.4.0 or later.

See [zookeeper](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/zookeeper) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `zookeeper` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: zookeeper
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/zookeeper:
    type: zookeeper
    ...  # Additional config
```

The following table shows the configuration options for the `zookeeper` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used. Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Host or IP address of the Zookeeper node |
| `port` | **yes** | `integer` | Main port of the Zookeeper node |
| `name` | no | `string` | This will be the value of the `plugin_instance` dimension on emitted metrics, if provided. |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="zookeeper" include="markdown"></div>
