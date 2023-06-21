(telegraf-win-services)=

# Windows Services

<meta name="description" content="Use this Splunk Observability Cloud integration for the Telegraf Win_services monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `telegraf/win_services` monitor type to ingest metrics about Windows services.

## Benefits

```{include} /_includes/benefits.md
```

##  Installation

```{include} /_includes/collector-installation-windows.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/win_services:
    type: telegraf/win_services
    ...  # Additional config

service:
  pipelines:
    metrics:
      receivers: [smartagent/win_services]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `serviceNames` | No | List of strings | Names of services to monitor. All services will be monitored if none are specified.|

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/winservices/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```