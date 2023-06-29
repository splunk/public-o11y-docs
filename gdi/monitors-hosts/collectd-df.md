(collectd-df)=

# Collectd df

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Collectd df plugin monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Collectd df monitor type to track free disk space on the host using the collectd df plugin.

This integration is only available on Linux. Note a file system must be mounted in the same file system namespace that the agent is running in for this monitor to be able to collect statistics about that file system. This might be an issue when running the agent in a container.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux-only.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/collectd/df:
    type: collectd/df
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/collectd/df]
```

### Configuration settings

The following table shows the configuration options for the collectd/df monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `hostFSPath` | no | `string` | Path to the root of the host file system.  Useful when running in a container and the host filesystem is mounted in some subdirectory under `/.` |
| `ignoreSelected` | no | `bool` | If true, the file systems selected by `fsTypes` and `mountPoints` are excluded, and all others are included. The default value is `true`. |
| `fsTypes` | no | `list of strings` | The file system types to include or exclude. The default values is `[aufs overlay tmpfs proc sysfs nsfs cgroup devpts selinuxfs devtmpfs debugfs mqueue hugetlbfs securityfs pstore binfmt_misc autofs]`. |
| `mountPoints` | no | `list of strings` | The mount paths to include or exclude, interpreted as a regular expression if surrounded by `/`.  Note that you need to include the full path as the agent sees it, irrespective of the hostFSPath option. The default value is `[/^/var/lib/docker/ /^/var/lib/rkt/pods/ /^/net// /^/smb//]`. |
| `reportByDevice` | no | `bool` |  The default value is `false`. |
| `reportInodes` | no | `bool` |  The default value is `false`. |
| `valuesPercentage` | no | `bool` | Whether true percent based metrics are reported. The default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/collectd-df/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```