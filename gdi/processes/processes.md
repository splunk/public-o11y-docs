(processes)=

# Host process

<meta name="description" content="Documentation on the processes monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `processes` monitor via the Smart Agent Receiver.

This monitor gathers information about processes running on the host.

See [processes](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/processes) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `processes` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: processes
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/processes:
    type: processes
    ...  # Additional config
```

The following table shows the configuration options for the `processes` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `processes` | no | `list of strings` | A list of process names to match |
| `processMatch` | no | `map of strings` | A map with keys specifying the `plugin_instance` value to send for regex values that match process names. See the example configuration. |
| `collectContextSwitch` | no | `bool` | Collects metrics on the number of context switches made by the process (**default:** `false`) |
| `procFSPath` | no | `string` | (Deprecated) Set the agent configuration `procPath` instead of this monitor configuration option. This option is useful for overriding the path to the `proc` filesystem if the agent is running in a container. |


### Example `processes` Smart Agent monitor configuration

This configuration will process metrics for processes named *mysql* and *myapp*, along with additional metrics on the number of context switches the process has made. Also, all processes that start with `docker` will have their process metrics aggregated together and sent with a `plugin_instance` value of `docker`.

```yaml
 procPath: /proc
 monitors:
  - type: processes
    processes:
      - mysql
      - myapp
    processMatch:
      docker: "docker.*"
    collectContextSwitch: true
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="collectd/processes" include="markdown"></div>
