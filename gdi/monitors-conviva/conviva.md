(conviva)=

# Conviva Real-Time/Live video play

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Conviva monitor. See benefits, install, configuration, and metrics, including MetricLens">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Conviva monitor type to pull `Real-Time/Live` video playing experience metrics from Conviva. 

This integration uses version 2.4 of the Conviva Experience Insights REST APIs. 

Only `Live` conviva metrics listed on the
[Conviva Developer Community](https://community.conviva.com/site/global/apis_data/experience_insights_api/index.gsp#metrics) page are supported. All metrics are gauges. The Conviva metrics are converted to Splunk Observability Cloud metrics with dimensions named account and filter. The account dimension is the name of the Conviva account and the filter dimension is the name of the Conviva filter applied to the metric. In the case of MetricLenses, the constituent MetricLens metrics and MetricLens dimensions are included. The values of the MetricLens dimensions are derived from the values of the associated MetricLens dimension entities.

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

```
receivers:
  smartagent/conviva:
    type: conviva
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/conviva]
```

### Configuration settings

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pulseUsername` | **yes** | `string` | Conviva Pulse username required with each API request. |
| `pulsePassword` | **yes** | `string` | Conviva Pulse password required with each API request. |
| `timeoutSeconds` | no | `integer` |  (**default:** `10`) |
| `metricConfigs` | no | `list of objects (see below)` | Conviva metrics to fetch. The default is quality_metriclens metric with the "All Traffic" filter applied and all quality_metriclens dimensions. |

The **nested** `metricConfigs` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `account` | no | `string` | Conviva customer account name. The default account is fetched used if not specified. |
| `metricParameter` | no | `string` |  (**default:** `quality_metriclens`) |
| `filters` | no | `list of strings` | Filter names. The default is `All Traffic` filter. |
| `metricLensDimensions` | no | `list of strings` | MetricLens dimension names. The default is names of all MetricLens dimensions of the account |
| `excludeMetricLensDimensions` | no | `list of strings` | MetricLens dimension names to exclude. |
| `maxFiltersPerRequest` | no | `integer` | Max number of filters per request. The default is the number of filters. Multiple requests are made if the number of filters is more than maxFiltersPerRequest (**default:** `0`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/conviva/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
