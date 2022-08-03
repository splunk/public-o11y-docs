
(kube-controller-manager)=

# Kubernetes controller manager
<meta name="Description" content="Documentation on kube-controller-manager monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `kube-controller-manager` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).


This monitor exports Prometheus metrics from the [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/).
The monitor queries path `/metrics` by default when no path is configured. The monitor converts
the Prometheus metric types to Splunk Observability Cloud metric types as described in the documentation for [prometheus-exporter](../prometheus-exporter/prometheus-exporter.md).


Note that all metrics of this monitor are non-default and are only emitted if specified explicitly.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kube-controller-manager` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.


To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: kube-controller-manager
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/kube-controller-manager:
    type: kube-controller-manager
    ... # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is true and this option is also true, the exporter's TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |

## Example configurations

This is an example configuration of this monitor:

```yaml
monitors:
- type: kube-controller-manager
  discoveryRule: kubernetes_pod_name =~ "kube-controller-manager" && target == "pod"
  port: 10252
  extraDimensions:
    metric_source: kube-controller-manager
```

## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="kube-controller-manager" include="markdown"></div>
