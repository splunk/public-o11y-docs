(interface)=

# Interface traffic

<meta name="description" content="Use this Splunk Observability Cloud integration for the interface monitor. See benefits, install, configuration, and metrics">

## Description

**Note:** This monitor is deprecated in favor of the `net-io` monitor. Switch to that monitor as the Smart Agent is deprecated. The `net-io` monitor uses the `interface` dimension to identify the network card instead of the `plugin_instance` dimension, but otherwise the metrics are the same. To learn more, see {ref}`net-io`.

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `interface` monitor for the Smart Agent Receiver.

Use this integration to collect information about the traffic (octets per second), packets per second and errors of interfaces (of course number of errors during one second).

If you're not interested in collecting information from all interfaces, select the interfaces you want to monitor using the plugin's configuration.

```{note}
This monitor is not available on Windows as collectd plugins are only supported in Linux and Kubernetes. 
```

<!--
## Requirements

This plugin requires:

| Software | Version |
|----------|---------|
| collectd | 1.0+    |  

-->
## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation-linux.md
```
## Configuration

```{include} /_includes/configuration.md
```

### Configuration example

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/interface:
    type: collectd/interface
    ...  # Additional config
```

To complete the monitor activation, you must also include the `smartagent/interface` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/interface]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `excludedInterfaces` | no | `list of strings` | List of interface names to exclude from monitoring (**default:** `[/^lo\d*$/ /^docker.*/ /^t(un|ap)\d*$/ /^veth.*$/]`) |
| `includedInterfaces` | no | `list of strings` | List of all the interfaces you want to monitor, all others will be ignored.  If you set both `included` and `excludedInterfaces`, only `includedInterfaces` will be honored. |


## Metrics
The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/netinterface/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
