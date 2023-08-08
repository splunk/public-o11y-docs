(net-io)=

# Network interface I/O

<meta name="description" content="Use this Splunk Observability Cloud integration for the net-io monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `net-io` monitor type to report I/O metrics about network interfaces.

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
  smartagent/net-io:
    type: net-io
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [net-io]
```

### Configuration settings

The following table shows the configuration options for the `net-io` integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `interfaces` | no | `list of strings` | The network interfaces to send metrics about. This is an [overridable set](https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#filtering-data-using-the-smart-agent). (**default:** `[* !/^lo\d*$/ !/^docker.*/ !/^t(un|ap)\d*$/ !/^veth.*$/ !/^Loopback*/]`) |

On Linux hosts, this monitor relies on the `/proc` filesystem. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, specify the path using the top-level configuration `procPath`.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/netio/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
