(gitlab-sidekiq)=

# GitLab Sidekiq 

<meta name="Description" content="Use this Splunk Observability Cloud integration for the GitLab Sidekiq monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `gitlab-sidekiq` monitor type by using the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

This monitor scrapes the Gitlab Sidekiq Prometheus Exporter. 

This monitor is available on Kubernetes, Linux, and Windows.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/gitlab-sidekiq: 
    type: gitlab-sidekiq
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the `service > pipelines > metrics  > receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/sidekiq]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [ParseDuration](https://golang.org/pkg/time/#ParseDuration). The default value is `10s`. |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the agent will connect to the server using HTTPS instead of plain HTTP. The default value is `false`. |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If `useHTTPS` is `true` and this option is also `true`, the exporter's TLS cert will not be verified. The default value is `false`. |
| `sniServerName` | no | `string` | If `useHTTPS` is `true` and `skipVerify` is `true`, the `sniServerName` is used to verify the hostname on the returned certificates. It is also included in the client's handshake to support virtual hosting unless it is an IP address. |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. The default value is `false`. |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics`, which is the default value.  |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has no effect when using the Prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. The default value is `false`. |

## Metrics

These are the metrics available for this integration:

<div class="metrics-table" type="gitlab-sidekiq" include="markdown"></div>

<br>

See [Sidekiq Metrics](https://docs.gitlab.com/13.12/ee/administration/monitoring/prometheus/gitlab_metrics.html#sidekiq-metrics) for information on Sidekiq jobs. Sidekiq jobs may also gather metrics, and these metrics can be accessed if the Sidekiq exporter is enabled: for example, using the `monitoring.sidekiq_exporter` configuration option in `gitlab.yml`. These metrics are served from the `/metrics` path on the configured port.

## Get help

```{include} /_includes/troubleshooting.md
```
