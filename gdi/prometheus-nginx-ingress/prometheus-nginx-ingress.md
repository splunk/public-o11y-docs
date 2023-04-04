(prometheus-nginx-ingress)=

# Prometheus NGINX Ingress
<meta name="Description" content="Use this Splunk Observability Cloud integration for the Prometheus NGINX Ingress monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `prometheus-nginx-ingress` monitor type for the Smart Agent Receiver.

This monitor wraps the {ref}`prometheus-exporter` to collect Ingress NGINX metrics for Splunk Observability Cloud, and relies on the Prometheus metric implementation that replaces VTS. If you use NGINX 0.15 or lower, use the {ref}`Prometheus NGINX VTS <prometheus-nginx-vts>` monitor.

This receiver is available on Linux and Windows.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Splunk Distribution of OpenTelemetry Collector

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```yaml 
receivers:
  smartagent/prometheus-nginx-ingress:
    type: prometheus/nginx-ingress
    ... # Additional config
```

To complete the receiver activation, you must also include the receiver in a `metrics` pipeline. To do this, add the receiver to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/prometheus/nginx-ingress]
```

### Ingress NGINX configuration

Activate the `controller.stats.enabled=true` and `controller.metrics.enabled=true` flags in the NGINX Ingress Controller chart.

### Agent configuration

Use the following configuration for service discovery:

```yaml
monitors:
- type: prometheus/nginx-ingress
  discoveryRule: container_image =~ "nginx-ingress-controller" && port == 10254
  port: 10254
```

### Configuration settings

The following table shows the configuration options for the `prometheus-nginx-ingress` monitor:

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

The following metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/prometheus/nginxingress/metadata.yaml"></div>

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```

