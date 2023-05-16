(disk)=

# Disk and partition

<meta name="description" content="Use this Splunk Observability Cloud integration for the disks monitor. See benefits, install, configuration, and metrics">

```{note}
If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect disk I/O metrics, use the native OTel component {ref}`host-metrics-receiver`.
```

## Configuration settings

If you're still using this monitor with the Smart Agent (deprecated), these are the configuration options:

The following table shows the configuration options for this monitor:

| Option | Definition | Default value |
| ---------------------|------------|---------------|
| Disk | Include specific Disk(s) | "sda" "/^hd/" |
| IgnoreSelected  | Ignore the designation of specific Disks | `false` |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/disk/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
