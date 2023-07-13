(ntp)=

# NTP server

<meta name="Description" content="Use this Splunk Observability Cloud integration for the NTP server monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `ntp` monitor type to retrieve clock offset from an NTP server. The minimum interval is 30 minutes.

This receiver is available on Kubernetes, Linux, and Windows.

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
  smartagent/ntp:
    type: ntp
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/ntp/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
