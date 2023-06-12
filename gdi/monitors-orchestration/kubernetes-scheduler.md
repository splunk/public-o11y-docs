(kubernetes-scheduler)=

# Kubernetes scheduler

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Kubernetes scheduler monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `kubernetes-proxy` monitor type to export Prometheus metrics from the [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler).

This monitor type is available on Kubernetes, Linux, and Windows.

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
  smartagent/kubernetes-scheduler
    type: kubernetes-scheduler
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
   pipelines:
     metrics:
       receivers: [smartagent/kubernetes-scheduler]
```

### Configuration settings

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration **Default** is `10s`. |
| `username` | no | `string` | Basic authentication username to use on each request, if any. |
| `password` | no | `string` | Basic authentication password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. **Default** is `false`. |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is true and this option is also true, the exporter TLS cert will not be verified. **Default** is `false` |
| `sniServerName` | no | `string` | If useHTTPS is true and skipVerify is true, the sniServerName is used to verify the hostname on the returned certificates. It is also included in the client's handshake to support virtual hosting unless it is an IP address. |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections. |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | **yes** | `string` | Host of the exporter. |
| `port` | **yes** | `integer` | Port of the exporter. |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. **Default** is `false`. |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics`. **Default** is `/metrics`. |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. **Default** is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/kubernetes/scheduler/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Non-default metrics (version 4.7.0+)

To emit metrics that are not _default_, you can add those metrics in the generic monitor-level `extraMetrics` config option.  Metrics that are derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics`.

To see a list of metrics that will be emitted you can run `agent-status monitors` after configuring this monitor in a running agent instance.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
