(signalfx-forwarder)=

# SignalFx Forwarder

<meta name="Description" content="Use this Splunk Observability Cloud integration for the SignalFX forwarder receiver. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `signalfx-forwarder` monitor type to run an HTTP server that listens for data points and trace spans, and forward them to Splunk Observability Cloud. This integration supports the latest formats for data points and spans that the Splunk ingest API endpoint supports.

This integration is available on Linux and Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/signalfx-forwarder:
    type: signalfx-forwarder
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/signalfx-forwarder]
    traces:
      receivers: [smartagent/signalfx-forwarder]
```

Note that the `defaultSpanTagsFromEndpoint` and `extraSpanTagsFromEndpoint` config options are not compatible with the `signalfx-forwarder` receiver.

### Configuration settings

The following table shows the configuration options for the `signalfx-forwarder` integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `listenAddress` | no | `string` | The host and port on which to listen for data points. The listening server accepts data points on the same HTTP path as the ingest endpoint or gateway. For example, `/v2/datapoint` or `/v1/trace`. Requests to other paths return errors with HTTP code 404. The default value is `127.0.0.1:9080`. |
| `serverTimeout` | no | `int64` | HTTP timeout duration for both read and write operations. Accepts a duration string for https://golang.org/pkg/time/#ParseDuration. The default value is `5s`. |
| `sendInternalMetrics` | no | `bool` | Whether to emit internal metrics about the HTTP listener. The default value is `false`. |

## Metrics

There are no metrics available for this integration.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

