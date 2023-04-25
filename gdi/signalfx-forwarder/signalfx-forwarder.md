(signalfx-forwarder)=

# SignalFx Forwarder
<meta name="Description" content="Use this Splunk Observability Cloud integration for the SignalFX forwarder receiver. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `signalfx-forwarder` monitor type for the Smart Agent Receiver.

The SignalFx Forwarder receiver runs an HTTP server that listens for data points and trace spans and forwards them to Splunk Observability Cloud. The receiver supports the latest formats for data points and spans that the Splunk ingest API endpoint supports.

This receiver is available on Linux and Windows.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/signalfx-forwarder:
    type: signalfx-forwarder
    ... # Additional config
```

To complete the receiver activation, you must also include the receiver in both a `metrics` pipeline and a `traces` pipeline. To do this, add the receiver to the `service` > `pipelines` > `metrics` (or `traces`) > `receivers` section of your configuration file. 

For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/signalfx-forwarder]
    traces:
      receivers: [smartagent/signalfx-forwarder]
```

Notice that the `defaultSpanTagsFromEndpoint` and `extraSpanTagsFromEndpoint` config options are not compatible with the `signalfx-forwarder` receiver.

### Configuration settings

The following table shows the configuration options for the signalfx-forwarder receiver:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `listenAddress` | no | `string` | The host and port on which to listen for data points. The listening server accepts data points on the same HTTP path as the ingest endpoint or gateway. For example, `/v2/datapoint` or `/v1/trace`. Requests to other paths return errors with HTTP code 404. The default value is `127.0.0.1:9080`. |
| `serverTimeout` | no | `int64` | HTTP timeout duration for both read and write operations. Accepts a duration string for https://golang.org/pkg/time/#ParseDuration. The default value is `5s`. |
| `sendInternalMetrics` | no | `bool` | Whether to emit internal metrics about the HTTP listener. The default value is `false`. |

## Metrics

There are no metrics available for this integration.

## Get help

```{include} /_includes/troubleshooting.md
```

