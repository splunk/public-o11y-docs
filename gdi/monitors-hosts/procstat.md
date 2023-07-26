(procstat)=

# procstat

<meta name="description" content="Use this Splunk Observability Cloud integration for the procstat monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `procstat` monitor type to collect metrics about processes.

This integration is available for Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/procstat:
    type: telegraf/procstat
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/procstat]
```

### Configuration settings

The following table shows the configuration options for the procstat monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `exe` | No | `string` | Name of an executable to monitor. For example, `exe: "signalfx-agent*"`. |
| `pattern` | No | `string` | Regular expression pattern to match against. |
| `user` | No | `string` | Username to match against. |
| `pidFile` | No | `string` | Path to pid file to monitor. For example, `pidFile: "/var/run/signalfx-agent.pid"`. |
| `processName` | No | `string` | Use to override the process name dimension. |
| `prefix` | No | `string` | Prefix to add to each dimension. |
| `pidTag` | No | `bool` | Whether to add PID as a dimension or as part of the metric name. The default value is `false`. |
| `cmdLineTag` | No | `bool` | When `true`, it adds the full `cmdline` as a dimension. The default value is `false`. |
| `cGroup` | No | `string` | The name of the cgroup to monitor. This cgroup name is appended to the configured `sysPath`. See the agent config schema for more information about the `sysPath` agent configuration. |
| `WinService` | No | `string` | The name of a Windows service to report procstat information on. |

On Linux hosts, this monitor relies on the `/proc` file system. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, specify the path using the top-level configuration `procPath`.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/procstat/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
