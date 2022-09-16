(jaeger-grpc)=

# Jaeger gRPC

<meta name="Description" content="Documentation on the Jaeger gRPC monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `jaeger-grpc` monitor by using the SignalFx Smart Agent Receiver.

Use this monitor to run a gRPC server that listens for Jaeger trace batches and forwards them to Splunk Observability Cloud (or the configured ingest host in the `writer` section of the agent config).

By default, the server listens on localhost port `14250`, but can be configured to anything.

**Note:** This is a valid Smart Agent monitor, but Smart Agent is deprecated. For details, see the [Deprecation Notice](https://github.com/signalfx/signalfx-agent/blob/main/docs/smartagent-deprecation-notice.md). If you are using OpenTelemetry, consider using the native OpenTelemetry Jaeger receiver instead. To learn more, see [the Jaeger receiver documentation in GitHub](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jaegerreceiver).


## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```
### Configuration example

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/jaeger-grpc: 
    type: jaeger-grpc
    ... # Additional config
```


To complete the integration, include this monitor  in a `metrics` pipeline. To do this, add the monitor to the `service/pipelines/traces/receivers` section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/jaeger-grpc]
```

See the [configuration example](https://github.com/signalfx/splunk-otel-collector/tree/main/examples) on GitHub for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

For Prometheus, see the [Prometheus Federation Endpoint Example](https://github.com/signalfx/splunk-otel-collector/tree/main/examples/prometheus-federation) in GitHub for an example of how the Collector works with Splunk Enterprise and an existing Prometheus deployment.

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

## Get help

```{include} /_includes/troubleshooting.md
```
