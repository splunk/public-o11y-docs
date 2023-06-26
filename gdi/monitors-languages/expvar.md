(expvar)=

# Expvar (Go)

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Golang Expvar monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `expvar` monitor type to scrape metrics exposed by [expvar](https://golang.org/pkg/expvar/). 

The integration uses configured paths to get metric and dimension values from fetched JSON objects at an HTTP endpoint. 
The Metrics section in this document shows metrics derived from expvar variable [`memstats`](https://golang.org/pkg/runtime/), which is exposed by default. These `memstat` metrics are referred to as standard or default metrics. 

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
  smartagent/expvar:
    type: expvar
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/expvar]
```

### Configuration settings

The following tables show the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | Host of the expvar endpoint |
| `port` | **yes** | `integer` | Port of the expvar endpoint |
| `useHTTPS` | no | `bool` | If `true`, the agent will connect to the host using HTTPS instead of plain HTTP. (**default:** `false`) |
| `skipVerify` | no | `bool` | If useHTTPS is `true `and this option is also `true`, the host TLS cert will not be verified. (**default:** `false`) |
| `path` | no | `string` | Path to the expvar endpoint, usually `/debug/vars` (the default). (**default:** `/debug/vars`) |
| `enhancedMetrics` | no | `bool` | If `true`, sends metrics memstats.alloc, memstats.by_size.size, memstats.by_size.mallocs and memstats.by_size.frees (**default:** `false`) |
| `metrics` | no | `list of objects (see below)` | Metrics configurations |

The **nested** `metrics` configuration object has the following fields:

| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `name` | no | `string` | Metric name |
| `JSONPath` | **yes** | `string` | JSON path of the metric value |
| `type` | **yes** | `string` | SignalFx metric type. Possible values are "gauge" or "cumulative" |
| `dimensions` | no | `list of objects (see below)` | Metric dimensions |
| `pathSeparator` | no | `string` | Path separator character of metric value in JSON object (**default:** `.`) |

The **nested** `dimensions` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | **yes** | `string` | Dimension name |
| `JSONPath` | no | `string` | JSON path of the dimension value |
| `value` | no | `string` | Dimension value |

## Metrics

Do not configure the monitor for memstats metrics because they are standard metrics provided by default. The following metrics are also available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/expvar/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
