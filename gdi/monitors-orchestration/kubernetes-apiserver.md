(kubernetes-apiserver)=

# Kubernetes API server

<meta name="Description" content="Use this Splunk Observability Cloud integration for the kubernetes-apiserver monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Kubernetes API server monitor type to retrieve metrics from the API server's Prometheus metric endpoint.

This integration is available on Kubernetes, Linux, and Windows. 

This integration requires access to [kube-apiserver pods](https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver) to be able to access certain pods in the control plane. Since several Kubernetes-as-a-service distributions don't expose the control plane pods to the end user, metric collection might not be possible in these cases. 

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

```
  receivers:
    smartagent/kubernetes-apiserver:
      type: kubernetes-apiserver
      ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/kubernetes-apiserver]
```

See the [kubernetes-yaml examples](https://github.com/signalfx/splunk-otel-collector/tree/main/examples/kubernetes-yaml) in GitHub for the Agent and Gateway YAML files.

### Example: Kubernetes observer 

The following is an example YAML configuration:

```yaml
receivers:
  smartagent/kubernetes-apiserver:
    type: kubernetes-apiserver
    host: localhost
    port: 443
    extraDimensions:
      metric_source: kubernetes-apiserver
```

The OpenTelemetry Collector has a Kubernetes observer (`k8sobserver`) that can be implemented as an extension to discover networked endpoints, such as a Kubernetes pod. Using this observer assumes that the OpenTelemetry Collector is deployed in host monitoring (agent) mode, where it is running on each individual node or host instance.

To use the observer, create a receiver creator instance with an associated rule. For example:

```yaml
extensions:
  # Configures the Kubernetes observer to watch for pod start and stop events.
  k8s_observer:

receivers:
  receiver_creator/1:
    # Name of the extensions to watch for endpoints to start and stop.
    watch_observers: [k8s_observer]
    receivers:
      smartagent/kubernetes-apiserver:
        rule: type == "pod" && labels["k8s-app"] == "kube-apiserver"
        type: kubernetes-apiserver
        port: 443
        extraDimensions:
          metric_source: kubernetes-apiserver

processors:
  exampleprocessor:

exporters:
  exampleexporter:

service:
  pipelines:
    metrics:
      receivers: [receiver_creator/1]
      processors: [exampleprocessor]
      exporters: [exampleexporter]
  extensions: [k8s_observer]
```

See {ref}`Receiver creator <receiver-creator-receiver>` for more information.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration. (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If `useHTTPS` is `true` and this option is also `true`, the exporter TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections. |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | **yes** | `string` | Host of the exporter. |
| `port` | **yes** | `integer` | Port of the exporter. |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/kubernetes/apiserver/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/bind_address_error_msg.md
```

```{include} /_includes/missing_pipeline_configuration.md
```

```{include} /_includes/out_of_memory_error.md
```

```{include} /_includes/troubleshooting.md
```

