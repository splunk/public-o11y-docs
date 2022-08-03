(host-metadata)=

# Host metadata properties

<meta name="description" content="Documentation on the host-metadata monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `host-metadata` monitor  via the Smart Agent Receiver.

The host-metadata monitor collects metadata properties about a host.  It is required for some views in Splunk Observability Cloud to operate. This monitor accepts endpoints. This monitor does not allow multiple instances.

```yaml
monitors:
  - type: host-metadata
```

In containerized environments host `/etc` and `/proc` may not be located
directly under the root path.  You can specify the path to `proc` and `etc` using the top level agent configurations `procPath` and `etcPath`

```yaml
procPath: /proc
etcPath: /etc
monitors:
  - type: host-metadata
```

Metadata updates occur on a sparse interval of approximately
1m, 1m, 1h, 1d and continue repeating once per day.
Setting the `Interval` configuration for this monitor does not affect the
sparse interval on which metadata is collected.

## Installation

This monitor is provided by the Smart Agent and is available by using the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver) in the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector). 

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `host-metadata` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: host-metadata
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/host-metadata:
    type: collectd/host-metadata
    ... # Additional config
```

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="host-metadata"  include="markdown"></div>

### Non-default metrics (version 4.7.0+)

To emit metrics that are not _default_, you can add those metrics in the
generic monitor-level `extraMetrics` config option.  Metrics that are derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics`.

To see a list of metrics that will be emitted you can run `agent-status
monitors` after configuring this monitor in a running agent instance.

## Dimensions

The following dimensions may occur on metrics emitted by this monitor.  Some dimensions may be specific to certain metrics.

| Name | Description |
| ---  | ---         |
| `collectd` | The version of collectd in the signalfx-agent |
| `kernel_name` | The name of the host kernel |
| `kernel_release` | The release of the host kernel |
| `kernel_version` | The version of the host kernel |
| `os_version` | The version of the os on the host |
| `signalfx_agent` | The version of the signalfx-agent |



