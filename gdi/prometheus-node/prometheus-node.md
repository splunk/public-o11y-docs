(prometheus-node)=

# Prometheus Node Exporter

<meta name="description" content="Documentation on the prometheus/node monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `prometheus/node` monitor via the Smart Agent Receiver.

This monitor scrapes [Prometheus Node Exporter](https://github.com/prometheus/node_exporter) metrics and sends them to Splunk Observability Cloud. It is a wrapper around the `prometheus-exporter` monitor that provides a restricted, but expandable, set of metrics.

See [signalfx-agent/pkg/monitors/prometheus/node/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/prometheus/node) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `prometheus/node` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: prometheus/node
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/prometheus-node:
    type: prometheus/node
    ...  # Additional config
```

The following table shows the configuration options for the `prometheus/node` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [func ParseDuration](https://golang.org/pkg/time/#ParseDuration) (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If `useHTTPS` is true and this option is also true, the exporter's TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert. Unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics`. (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has no effect when using the `prometheus-exporter` monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="prometheus/node" include="markdown"></div>
