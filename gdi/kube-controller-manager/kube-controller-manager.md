
(kube-controller-manager)=

# Kubernetes Controller Manager
<meta name="Description" content="Use this Splunk Observability Cloud integration for the kube-controller-manager monitor. See benefits, install, configuration, and metrics">

## Description

**Note:** This monitor is deprecated in favor of the `prometheus-exporter` monitor. Switch to the Prometheus Exporter as the Smart Agent is deprecated. All Prometheus labels are converted directly to Infrastructure Monitoring dimensions. To learn more, see {ref}`prometheus-exporter`.

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `kube-controller-manager` monitor for the Smart Agent Receiver.

Use this integration to export Prometheus metrics from the [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/).

The monitor queries path `/metrics` by default when no path is configured. The monitor converts
the Prometheus metric types to Splunk Observability Cloud metric types as described in the documentation for [prometheus-exporter](../prometheus-exporter/prometheus-exporter.md).

**Note:** All metrics of this monitor are non-default and are only emitted if specified explicitly.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```
### Configuration example

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/kube-controller-manager:
    type: kube-controller-manager
    ... # Additional config
```

To complete the monitor activation, you must also include the `smartagent/kube-controller-manager` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/kube-controller-manager]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is `true` and this option is also `true`, the exporter's TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has no effect when using the Prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |

### Sample YAML configurations

The following is an example configuration of this monitor:

```yaml
monitors:
- type: kube-controller-manager
  discoveryRule: kubernetes_pod_name =~ "kube-controller-manager" && target == "pod"
  port: 10252
  extraDimensions:
    metric_source: kubernetes-controller-manager
```

## Metrics

These metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/kubernetes/controllermanager/metadata.yaml"></div>

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
