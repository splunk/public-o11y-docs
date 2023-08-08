(prometheus-exporter)=

# Prometheus Exporter

<meta name="description" content="Use this Splunk Observability Cloud integration for the Prometheus Exporter monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `prometheus-exporter` monitor type to read all metric types from a [Prometheus Exporter](https://prometheus.io/docs/instrumenting/exporters/) endpoint. 

A Prometheus Exporter is a piece of software that fetches statistics from another, non-Prometheus system, and turns them into Prometheus metrics. For a description of the Prometheus metric types, see [Metric Types](https://prometheus.io/docs/concepts/metric_types/).

This monitor is available on Kubernetes, Linux, and Windows.

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
  smartagent/prometheus-exporter:
    type: prometheus-exporter
    discoveryRule: port >= 9100 && port <= 9500 && container_image =~ "exporter"
    extraDimensions:
       metric_source: prometheus    
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/prometheus-exporter]
```

For specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments, see <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a>.

See the <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples/prometheus-federation" target="_blank">Prometheus Federation Endpoint Example</a> in GitHub for an example of how the OTel Collector works with Splunk Enterprise and an existing Prometheus deployment.

### Configuration options

The following table shows the configuration options for the `prometheus-exporter` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [func ParseDuration](https://golang.org/pkg/time/#ParseDuration) (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is `true` and this option is also `true`, the exporter TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |

## Authentication

For basic HTTP authentication, use the `username` and `password` options.

On Kubernetes, if the monitored service requires authentication, use the `useServiceAccount` option to use the service account of the agent when connecting. Make sure that the Smart Agent service account has sufficient permissions for the monitored service.

## Metrics

There are no metrics available for this integration.

### Prometheus metric conversion details

This is how Prometheus metrics are converted:

* Gauges are converted directly to Splunk Infrastructure Monitoring gauges.
* Counters are converted directly to Infrastructure Monitoring cumulative counters.
* Untyped metrics are converted directly to Infrastructure Monitoring gauges.
* Summary metrics are converted to three distinct metrics, where `<basename>` is the root name of the metric:
    * The total count is converted to a cumulative counter called `<basename>_count`.
    * The total sum is converted to a cumulative counter called `<basename>`.
    * Each quantile value is converted to a gauge called `<basename>_quantile` and includes a dimension called `quantile` that specifies the quantile.
* Histogram metrics are converted to three distinct metrics, where `<basename>` is the root name of the metric:
    * The total count is converted to a cumulative counter called `<basename>_count`.
    * The total sum is converted to a cumulative counter called `<basename>`.
    * Each histogram bucket is converted to a cumulative counter called `<basename>_bucket` and includes a dimension called `upper_bound` that specifies the maximum value in that bucket. This metric specifies the number of events with a value that is less than or equal to the upper bound.

All Prometheus labels are converted directly to Infrastructure Monitoring dimensions.

This supports service discovery so you can set a discovery rule such as `port >= 9100 && port <= 9500 && containerImage =~ "exporter"`, assuming you are running exporters in container images that have the word "exporter" in them that fall within the standard exporter port range.

In Kubernetes, you can also try matching on the container port name as defined in the pod spec, which is the `name` variable in discovery rules for the `k8s-api` observer.

Filtering can be very useful here, because exporters tend to be verbose.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

### Log contains the error `net/http: HTTP/1.x transport connection broken: malformed HTTP response`

Solution: Activate HTTPS with `useHTTPS`.

### Log contains the error `forbidden: User \"system:anonymous\" cannot get path \"/metrics\"`

Solution: Activate `useServiceAccount` and make sure the service account that the Splunk Distribution of OpenTelemetry Collector is running with has the necessary permissions.



