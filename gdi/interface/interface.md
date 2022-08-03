(interface)=

# Interface traffic

<meta name="description" content="Documentation for the interface monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `interface` monitor via the Smart Agent Receiver.

The Interface plugin collects information about the traffic (octets per second), packets per second and errors of interfaces (of course number of errors during one second). If you're not interested in all interfaces but want to exclude some, or only collect information of some selected interfaces, you can select the “interesting” interfaces using the plugin's configuration.

**Note:** This monitor is deprecated in favor of the `net-io` monitor. Please
switch to that monitor as this monitor will be removed in a future release
of the agent.  Note that the `net-io` monitor uses the `interface`
dimension to identify the network card instead of the `plugin_instance`
dimension, but otherwise the metrics are the same.


<!-- 
## Requirements

This plugin requires:

| Software | Version |
|----------|---------|
| collectd | 1.0+    |  

-->

## Installation

This monitor is provided by the Smart Agent and is available by using the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver) in the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector). 

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.


## Configuration


The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing an `interface` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: interface
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/interface:
    type: interface
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `excludedInterfaces` | no | `list of strings` | List of interface names to exclude from monitoring (**default:** `[/^lo\d*$/ /^docker.*/ /^t(un|ap)\d*$/ /^veth.*$/]`) |
| `includedInterfaces` | no | `list of strings` | List of all the interfaces you want to monitor, all others will be ignored.  If you set both included and excludedInterfaces, only includedInterfaces will be honored. |




## Metrics 
These are the metrics available for this integration.

<div class="metrics-table" type="collectd-interface"  include="markdown"></div>