(prometheus-node)=

# Prometheus Node 

<meta name="description" content="Use this Splunk Observability Cloud integration for the Prometheus Node Exporter monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `prometheus/node` monitor type to wrap the {ref}`prometheus-exporter` to export server level and OS level metrics and send them to Splunk Observability Cloud. The Node Exporter measures various server resources such as RAM, disk space, and CPU utilization. 

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
  smartagent/prometheus-node:
    type: prometheus/node
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/prometheus-node]
```

### Configuration settings

The following table shows the configuration options for the `prometheus/node` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | No | `int64` | HTTP timeout duration for both reads and writes. Must be a duration string accepted by `ParseDuration`. Default value is `10s`. |
| `username` | No | `string` | Username to use on each request. |
| `password` | No | `string` | Password to use on each request. |
| `useHTTPS` | No | `bool` | If true, the agent connects to the server using HTTPS instead of plain HTTP. Default value is `false`. |
| `httpHeaders` | No | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header are supported. |
| `skipVerify` | No | `bool` | If both `useHTTPS` and `skipVerify` are `true`, the TLS certificate of the exporter is not verified. Default value is `false`. |
| `caCertPath` | No | `string` | Path to the CA certificate that has signed the TLS certificate, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | No | `string` | Path to the client TLS certificate to use for TLS required connections. |
| `clientKeyPath` | No | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | Yes | `string` | Host of the exporter. |
| `port` | Yes | `integer` | Port of the exporter. |
| `useServiceAccount` | No | `bool` | Use pod service account to authenticate. Default value is `false`. |
| `metricPath` | No | `string` | Path to the metrics endpoint on the exporter server. The default value is `/metrics`. |
| `sendAllMetrics` | No | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has No effect when using the Prometheus exporter monitor directly, since there is No built-in filtering. Default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/prometheus/node/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
