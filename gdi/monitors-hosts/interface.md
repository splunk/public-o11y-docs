(interface)=

# Interface traffic (deprecated)

<meta name="description" content="Use this Splunk Observability Cloud integration for the interface monitor. See benefits, install, configuration, and metrics">

```{note}
This integration is deprecated in favor of the `net-io` integration, which uses the `interface` dimension to identify the network card instead of the `plugin_instance` dimension and provides the same metrics. To learn more, see {ref}`net-io`.
```

## Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `excludedInterfaces` | no | `list of strings` | List of interface names to exclude from monitoring (**default:** `[/^lo\d*$/ /^docker.*/ /^t(un|ap)\d*$/ /^veth.*$/]`) |
| `includedInterfaces` | no | `list of strings` | List of all the interfaces you want to monitor, all others will be ignored.  If you set both `included` and `excludedInterfaces`, only `includedInterfaces` will be honored. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/netinterface/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Trobleshooting

```{include} /_includes/troubleshooting.md
```
