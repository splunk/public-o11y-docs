(procstat)=


# procstat

<meta name="description" content="Documentation on the procstat monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `procstat` monitor via the Smart Agent Receiver.

This monitor reports metrics about processes.

See [procstat](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/telegraf/monitors/procstat) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

This Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `procstat` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: procstat
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/procstat:
    type: procstat
    ...  # Additional config
```

The following table shows the configuration options for the `procstat` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `exe` | no | `string` | The name of an executable to monitor. (ie: `exe: "signalfx-agent*"`) |
| `pattern` | no | `string` | Regular expression pattern to match against. |
| `user` | no | `string` | Username to match against |
| `pidFile` | no | `string` | Path to pid file to monitor. (ie: `pidFile: "/var/run/signalfx-agent.pid"`) |
| `processName` | no | `string` | Used to override the process name dimension |
| `prefix` | no | `string` | Prefix to be added to each dimension |
| `pidTag` | no | `bool` | Whether to add PID as a dimension instead of part of the metric name (**default:** `false`) |
| `cmdLineTag` | no | `bool` | When true add the full cmdline as a dimension. (**default:** `false`) |
| `cGroup` | no | `string` | The name of the cgroup to monitor. This cgroup name will be appended to the configured `sysPath`. See the agent config schema for more information about the `sysPath` agent configuration. |
| `WinService` | no | `string` | The name of a windows service to report procstat information on. |

Note that the Smart Agent supports the `native` pid finder only and the `cgroup` and `systemd unit` options are not supported at this time.

On Linux hosts, this monitor relies on the `/proc` filesystem. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, specify the path using the top-level configuration `procPath`.


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="telegraf/procstat" include="markdown"></div>
