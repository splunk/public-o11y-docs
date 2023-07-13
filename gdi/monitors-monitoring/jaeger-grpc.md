(jaeger-grpc)=

# Jaeger gRPC

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Jaeger gRCP monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `jaeger-grpc` monitor type to run a gRPC server that listens for Jaeger trace batches and forwards them to Splunk Observability Cloud (or the configured ingest host in the `writer` section of the agent config). By default, the server listens on localhost port `14250`, but can be configured to anything.

```{note}
If you're using OpenTelemetry, consider using the native OpenTelemetry Jaeger receiver. To learn more, see [the Jaeger receiver documentation in GitHub](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jaegerreceiver).
```

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
  smartagent/jaeger-grpc: 
    type: jaeger-grpc
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/jaeger-grpc]
```

### Configuration settings

The following table shows the configuration options for this monitor:
  
| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `listenAddress` | no | `string` | The host:port on which to listen for traces. The default value is `0.0.0.0:14250`. |
| `tls` | no | `object (see below)` | TLS are optional tls credential settings to configure the GRPC server with |

The **nested** `tls` config object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `certFile` | no | `string` | The cert file to use for tls |
| `keyFile` | no | `string` | The key file to use for tls |

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics for this monitor.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
