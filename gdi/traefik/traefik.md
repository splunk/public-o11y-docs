(traefik)=

# Traefik

<meta name="description" content="Documentation on the traefik monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) deploys this integration as the `traefik` monitor via the Smart Agent Receiver.

Traefik is an open-source HTTP reverse proxy and load balancer. Traefik exports Prometheus metrics that can be scraped by the SignalFx Smart Agent. These metrics can be categorized into Traefik-related, entrypoint-related, and backend-related metrics. Traefik-related metrics are prefixed by `go_` and `process_`. Entrypoint-related metrics are prefixed by `traefik_entrypoint_`. Backend-related metrics are prefixed by `traefik_backend_`.

Traefik-related metrics are for monitoring Traefik itself. For instance, the `go_memstats_sys_bytes` metric can be used to plot Traefik memory usage. Entrypoint- and backend-related metrics are the number and duration of requests measured at entrypoints and backends. These metrics are used to compute measurements such as the average request duration.

See [signalfx-agent/pkg/monitors/traefik/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/traefik) for the monitor source.

This monitor requires signalfx-agent version 4.7.0 or later. 


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `traefik` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: traefik
    ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/traefik:
    type: traefik
    ...  # Additional config
```

The following table shows the configuration options for the `traefik` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [func ParseDuration](https://golang.org/pkg/time/#ParseDuration) (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is true and this option is also true, the exporter's TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |

The Smart Agent must have network access to Traefik.

For deployment-specific configuration instructions, see [deployments](https://github.com/signalfx/signalfx-agent/tree/main/deployments).


### Example configuration

This example configures the `traefik` monitor to scrape Prometheus metrics in the default path `/metrics` on port 8080 and add dimension `metric_source=traefik` to the metrics and export them to Splunk Observability Cloud.

```
monitors:
- type: traefik
  discoveryRule: port == 8080
  extraDimensions:
    metric_source: traefik
```


### Traefik configuration

Edit the Traefik configuration file, typically `traefik.toml`, to enable Traefik to expose prometheus metrics at an
endpoint. The endpoint is on path `/metrics` by default. When running the Traefik binary, the configuration file is
typically passed in as a command line argument. For example, `./traefik -c traefik.toml`

However, when running the Traefik Docker image, the configuration file is mounted to volume `/etc/traefik/traefik.toml`. For example, `docker run -d -p 8080:8080 -p 80:80 -v $PWD/traefik.toml:/etc/traefik/traefik.toml`

If the Traefik configuration file is not available, use the [sample configuration file](https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml) to get started.

For more information, see [Traefik documentation](https://docs.traefik.io/).


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="traefik" include="markdown"></div>
