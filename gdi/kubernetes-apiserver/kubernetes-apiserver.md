(kubernetes-apiserver)=

# Kubernetes API Server
<meta name="Description" content="Documentation on kubernetes-apiserver monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `kubernetes-apiserver` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).


This monitor queries the Kubernetes API server for kube-apiserver metrics in Prometheus format.
The monitor queries path `/metrics` by default when no path is configured. The monitor converts
the Prometheus metric types to SignalFx metric types as described in the documentation for [prometheus-exporter](../prometheus-exporter/prometheus-exporter.md).

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kubernetes-apiserver` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: kubernetes-apiserver
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/kubernetes-apiserver:
    type: kubernetes-apiserver
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

Example YAML configuration:

```yaml
monitors:
- type: kubernetes-apiserver
  discoveryRule: Get(container_labels, "component") == "kube-apiserver"
  extraDimensions:
    metric_source: kubernetes-apiserver
```

## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="kubernetes-apiserver" include="markdown"></div>