(traefik)=

# Traefik

<meta name="description" content="Use this Splunk Observability Cloud integration for the Traefik monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `traefik` monitor type to collect metrics from Traefik.

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
  smartagent/traefik:
    type: traefik
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/traefik]
```

### Configuration settings

The following table shows the configuration options for the `traefik` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | No | `int64` | HTTP timeout duration for both reads and writes. Must be a duration string accepted by `ParseDuration`. Default value is `10s`. |
| `username` | No | `string` | Username to use on each request. |
| `password` | No | `string` | Password to use on each request. |
| `useHTTPS` | No | `bool` | If true, the agent connects to the server using HTTPS instead of plain HTTP. Default value is `false`. |
| `httpHeaders` | No | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header are supported. |
| `skipVerify` | No | `bool` | If both `useHTTPS` and `skipVerify` are `true`, the TLS certificate of the exporter is not verified. Default value is `false`. |
| `caCertPath` | No | `string` | Path to the CA certificate that has signed the TLS certificate, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | No | `string` | Path to the client TLS certificate to use for TLS required connections. |
| `clientKeyPath` | No | `string` | Path to the client TLS key to use for TLS required connections. |
| `host` | Yes | `string` | Host of the exporter. |
| `port` | Yes | `integer` | Port of the exporter. |
| `useServiceAccount` | No | `bool` | Use pod service account to authenticate. Default value is `false`. |
| `metricPath` | No | `string` | Path to the metrics endpoint on the exporter server. The default value is `/metrics`. |
| `sendAllMetrics` | No | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has No effect when using the Prometheus exporter monitor directly, since there is No built-in filtering. Default value is `false`. |
The Collector or Smart Agent must have network access to Traefik.

### Traefik configuration

Edit the Traefik configuration file, for example `traefik.toml`, to activate Traefik to expose Prometheus metrics at an endpoint. By default, the endpoint is on path `/metrics`. When running the Traefik binary, pass the path to the configuration file using the `-c` argument. For example, `./traefik -c traefik.toml`.

When running the Traefik Docker image, use the `/etc/traefik/traefik.toml` volume. For example, `docker run -d -p 8080:8080 -p 80:80 -v $PWD/traefik.toml:/etc/traefik/traefik.toml`.

If the Traefik configuration file is not available, use the sample configuration file to get started. For more information, see the Traefik documentation.

## Metrics

Traefik exports Prometheus metrics which can be categorized into Traefik, entrypoint, and back-end metrics. 

- Traefik-related metrics are for monitoring Traefik itself and are prefixed by `go_` and `process_`. For instance, the `go_memstats_sys_bytes` metric can be used to plot Traefik memory usage. 
- Entrypoint and back-end metrics are the number and duration of requests measured at entrypoints and back ends. Entrypoint-related metrics are prefixed by `traefik_entrypoint_`. Backend-related metrics are prefixed by `traefik_backend_`.

The following table shows the metrics that are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/traefik/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
