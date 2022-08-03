(prometheus-exporter)=

# Prometheus Exporter

<meta name="description" content="Documentation on the prometheus-exporter">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `prometheus-exporter` monitor via the Smart Agent Receiver.

This monitor reads metrics from a [Prometheus exporter](https://prometheus.io/docs/instrumenting/exporters/) endpoint. All metric types are supported. For a description of the Prometheus metric types, see [Metric Types](https://prometheus.io/docs/concepts/metric_types/).

The conversion happens as follows:

* Gauges are converted directly to SignalFx gauges
* Counters are converted directly to SignalFx cumulative counters
* Untyped metrics are converted directly to SignalFx gauges
* Summary metrics are converted to three distinct metrics, where `<basename>` is the root name of the metric:
    * The total count gets converted to a cumulative counter called `<basename>_count`
    * The total sum gets converted to a cumulative counter called `<basename>`
    * Each quantile value is converted to a gauge called `<basename>_quantile` and will include a dimension called `quantile` that specifies the quantile.
* Histogram metrics are converted to three distinct metrics, where `<basename>` is the root name of the metric:
    * The total count gets converted to a cumulative counter called `<basename>_count`
    * The total sum gets converted to a cumulative counter called `<basename>`
    * Each histogram bucket is converted to a cumulative counter called `<basename>_bucket` and will include a dimension called `upper_bound` that specifies the maximum value in that bucket. This metric specifies the number of events with a value that is less than or equal to the upper bound.

All Prometheus labels will be converted directly to SignalFx dimensions.

This supports service discovery so you can set a discovery rule such as `port >= 9100 && port <= 9500 && containerImage =~ "exporter"`, assuming you are running exporters in container images that have the word "exporter" in them and fall within the standard exporter port range. In Kubernetes, you could also try matching on the container port name as defined in the pod spec, which is the `name` variable in discovery rules for the `k8s-api` observer.

Filtering can be very useful here since exporters tend to be fairly verbose.

See [signalfx-agent/pkg/monitors/prometheusexporter/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/prometheusexporter) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `prometheus-exporter` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: prometheus-exporter
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/prometheus-exporter:
    type: prometheus-exporter
    ...  # Additional config
```

The following table shows the configuration options for the `prometheus-exporter` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [func ParseDuration](https://golang.org/pkg/time/#ParseDuration) (**default:** `10s`) |
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

The agent does not do any built-in filtering of metrics coming out of this monitor.


### Example configuration

```
monitors:
 - type: prometheus-exporter
   discoveryRule: port >= 9100 && port <= 9500 && container_image =~ "exporter"
   extraDimensions:
     metric_source: prometheus
```


## Authentication

For basic HTTP authentication, use the `username` and `password` options.

On Kubernetes, if the monitored service requires authentication, use the `useServiceAccount` option to use the service account of the agent when connecting. Make sure that the SignalFx Smart Agent service account has sufficient permissions for the monitored service.


## Troubleshooting

* Log contains the error `net/http: HTTP/1.x transport connection broken: malformed HTTP response`

    **Solution**: Enable HTTPS with `useHTTPS`.

* Log contains the error `forbidden: User \"system:anonymous\" cannot get path \"/metrics\"`

    **Solution**: Enable `useServiceAccount` and make sure the service account Smart Agent is running with has the necessary permissions.


## Metrics

There are no metrics available for this integration.
