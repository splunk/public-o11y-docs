(prometheus-go)=

# Prometheus Go

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Prometheus Go monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `prometheus-go` monitor type to wrap the {ref}`prometheus-exporter` to scrape Prometheus Go collector and Prometheus process collector metrics for Splunk Observability Cloud.

This integration is available on Linux and Windows.

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
  smartagent/prometheus-go:
    type: prometheus-go
    host: localhost
    port: 2112
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/prometheus-go]
```

### Configuration settings

The following table shows the configuration options for the `prometheus-go` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both reads and writes. Must be a duration string accepted by https://golang.org/pkg/time/#ParseDuration. Default value is `10s`. |
| `username` | no | `string` | User name to use on each request. |
| `password` | no | `string` | Password to use on each request. |
| `useHTTPS` | no | `bool` | If true, the agent connects to the server using HTTPS instead of plain HTTP. Default value is `false`. |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header are supported. |
| `skipVerify` | no | `bool` | If both `useHTTPS` and `skipVerify` are `true`, the TLS certificate of the exporter is not verified. Default value is `false`. |
| `caCertPath` | no | `string` | Path to the CA certificate that has signed the TLS certificate, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS certificate to use for TLS required connections. |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | **yes** | `string` | Host of the exporter. |
| `port` | **yes** | `integer` | Port of the exporter. |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. Default value is `false`. |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server. The default value is `/metrics`. |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has no effect when using the Prometheus exporter monitor directly, since there is no built-in filtering. Default value is `false`. |

## Metrics

The following metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/prometheus/go/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Non-default metrics (version 4.7.0+)

To emit metrics that are not default, you can add those metrics in the generic receiver-level `extraMetrics` config option. You don't need to add to `extraMetrics` any metric derived from configuration options that don't appear in the list of metrics.

To see a list of metrics that will be emitted you can run `agent-status monitors` after configuring the receiver in a running agent instance.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

