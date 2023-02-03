(ntp)=

# NTP Receiver
<meta name="Description" content="Use this Splunk Observability Cloud integration for the NTP server monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `ntp` monitor type by using the SignalFx Smart Agent Receiver.

Use the NTP receiver to retrieve clock offset from an NTP server. The receiver enforces a minimum interval of 30 minutes.

This receiver is available on Kubernetes, Linux, and Windows.

### Benefits

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

```yaml
receivers:
  smartagent/ntp:
    type: ntp
    ... # Additional config
```

To complete the receiver activation, you must also include the receiver in a `metrics` pipeline. To do this, add the receiver to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/ntp]
```

### Configuration settings

The following table shows the configuration options for the ntp receiver:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | `string` | The host or IP address of the NTP server. For example, `pool.ntp.org`. |
| `port` | No | `integer` | The port of the NTP server. Default is `123`. |
| `version` | No | `integer` | NTP protocol version. Default is `4`. |
| `timeout` | No | `int64` | Timeout in seconds for the request. Default is `5s`. |


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/ntp/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
