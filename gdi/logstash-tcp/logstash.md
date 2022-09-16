(logstash-tcp)=

# Logstash TCP
<meta name="Description" content="Documentation on the Logstash TCP integration for Splunk Observability Cloud.">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `logstash-tcp` monitor by using the SignalFx Smart Agent Receiver.

Use this integration to monitor the health and performance of Logstash deployments through Logstash's Monitoring APIs.

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
  smartagent/logstash-tcp:
    type: logstash-tcp
    ... # Additional config
```
To complete the integration, include the monitor in a metrics pipeline. To do this, add the monitor to the service > pipelines > metrics > receivers section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/logstash-tcp]
```

### Configuration settings

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | The host name of the Logstash monitoring API. The default value is `127.0.0.1`. |
| `port` | no | `integer` | The port number of Logstash monitoring API. The default value is `9600`. |
| `useHTTPS` | no | `bool` | If true, the agent connects to the host using HTTPS instead of HTTP. The default value is `false`. |
| `timeoutSeconds` | no | `integer` | The maximum amount of time to wait for API requests, in seconds. The default value is `5`. |

## Metrics

There are no metrics available for this integration.

## Get help

```{include} /_includes/troubleshooting.md
```