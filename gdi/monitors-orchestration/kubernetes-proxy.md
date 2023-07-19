(kubernetes-proxy)=

# Kubernetes proxy

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Kubernetes proxy monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `kubernetes-proxy` monitor type to export Prometheus metrics from the [kube-proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy) metrics in Prometheus format. 

The integration queries path `/metrics` by default when no path is configured, and converts the Prometheus metric types to Splunk Observability Cloud metric types as described [here](../monitors-monitoring/prometheus-exporter.md).

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
  smartagent/kubernetes-proxy
    type: kubernetes-proxy
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
   pipelines:
     metrics:
       receivers: [smartagent/kubernetes-proxy]
```

### Example: Kubernetes observer 

The following is an example YAML configuration:

```yaml
receivers:
  smartagent/kubernetes-proxy:
    type: kubernetes-proxy
    host: localhost
    port: 10249
    extraDimensions:
      metric_source: kubernetes-proxy
```

The OpenTelemetry Collector has a Kubernetes observer (`k8sobserver`) that can be implemented as an extension to discover networked endpoints, such as a Kubernetes pod. Using this observer assumes that the OpenTelemetry Collector is deployed in host monitoring (agent) mode, where it is running on each individual node or host instance.

To use the observer, you must create a receiver creator instance with an associated rule. For example:

```
extensions:
  # Configures the Kubernetes observer to watch for pod start and stop events.
  k8s_observer:
  host_observer:

receivers:
  receiver_creator/1:
    # Name of the extensions to watch for endpoints to start and stop.
    watch_observers: [k8s_observer]
    receivers:
      smartagent/kubernetes-kubeproxy:
        rule: type == "pod" && name matches "kube-proxy"
        type: kubernetes-proxy
        port: 10249
        extraDimensions:
          metric_source: kubernetes-proxy

      prometheus_simple:
        # Configure prometheus scraping if standard prometheus annotations are set on the pod.
        rule: type == "pod" && annotations["prometheus.io/scrape"] == "true"
        config:
          metrics_path: '`"prometheus.io/path" in annotations ? annotations["prometheus.io/path"] : "/metrics"`'
          endpoint: '`endpoint`:`"prometheus.io/port" in annotations ? annotations["prometheus.io/port"] : 9090`'

      redis/1:
        # If this rule matches an instance of this receiver will be started.
        rule: type == "port" && port == 6379
        config:
          # Static receiver-specific config.
          password: secret
          # Dynamic configuration value.
          collection_interval: `pod.annotations["collection_interval"]`
      resource_attributes:
          # Dynamic configuration value.
          service.name: `pod.labels["service_name"]`

      redis/2:
        # Set a resource attribute based on endpoint value.
        rule: type == "port" && port == 6379
        resource_attributes:
          # Dynamic value.
          app: `pod.labels["app"]`
          # Static value.
          source: redis

  receiver_creator/2:
    # Name of the extensions to watch for endpoints to start and stop.
    watch_observers: [host_observer]
    receivers:
      redis/on_host:
        # If this rule matches, an instance of this receiver is started.
        rule: type == "port" && port == 6379 && is_ipv6 == true
        resource_attributes:
          service.name: redis_on_host

processors:
  exampleprocessor:

exporters:
  exampleexporter:

service:
  pipelines:
    metrics:
      receivers: [receiver_creator/1, receiver_creator/2]
      processors: [exampleprocessor]
      exporters: [exampleexporter]
  extensions: [k8s_observer, host_observer]
```

See {ref}`Receiver creator <receiver-creator-receiver>` for more information.

### Configuration settings

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This can be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration **Default is** `10s`. |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. **Default** is `false`. |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is true and this option is also true, the exporter TLS certificate will not be verified. **Default** is `false`. |
| `sniServerName` | no | `string` | If useHTTPS is true and skipVerify is true, the sniServerName is used to verify the hostname on the returned certificates. It is also included in the client's handshake to support virtual hosting unless it is an IP address. |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections. |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | **yes** | `string` | Host of the exporter. |
| `port` | **yes** | `integer` | Port of the exporter. |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. **Default** is `false`. |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server. **Default** is `/metrics`. |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. **Default** is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/kubernetes/proxy/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Non-default metrics (version 4.7.0+)

To emit metrics that are not _default_, you can add those metrics in the generic monitor-level `extraMetrics` config option.  Metrics that are derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics`.

To see a list of metrics that will be emitted you can run `agent-status monitors` after configuring this monitor in a running agent instance.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
