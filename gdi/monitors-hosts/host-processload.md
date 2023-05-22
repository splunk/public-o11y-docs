(load)=

# Host process load

<meta name="description" content="Use this Splunk Observability Cloud integration for the load monitor. See benefits, install, configuration, and metrics">

```{note}
If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect CPU load metrics, use the native OTel component {ref}`host-metrics-receiver`.
```

## Configuration options

The following table shows the configuration options for this monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `perCPU` | no | `bool` | The default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/load/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
