(host-metadata)=

# Host metadata properties

<meta name="description" content="Use this Splunk Observability Cloud integration for the host-metadata monitor. See benefits, install, configuration, and metrics">

```{note}
If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect metadata properties about a host, use the native OTel component {ref}`host-metrics-receiver`.
```
## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/metadata/hostmetadata/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Non-default metrics (version 4.7.0+)

To emit metrics that are not default, you can add those metrics in the generic monitor-level `extraMetrics` configuration option. Metrics derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics`.

To see a list of metrics that will be emitted, you can run `agent-status monitors` after configuring this monitor in a running agent instance.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```