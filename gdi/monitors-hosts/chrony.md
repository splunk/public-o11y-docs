(chrony)=

# Chrony NTP
<meta name="description" content="Use this Splunk Observability Cloud integration for the Chrony NTP monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Chrony NTP monitor type to monitor NTP data from a chrony server, such as clock skew and per-peer stratum. To talk to chronyd, this integration mimics what the chronyc control program does on the wire.

This integration is only available on Kubernetes and Linux.

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
  smartagent/chrony:
    type: collectd/chrony
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/chrony]
```
### Configuration options

The following table shows the configuration options for this integration:

 Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The hostname of the chronyd instance. |
| `port` | no | `integer` | The UDP port number of the chronyd instance.  Defaults to 323 in collectd if unspecified. |
| `timeout` | no | `unsigned integer` | How long to wait for a response from chronyd before considering it down. Defaults to 2 seconds in the collectd plugin if not specified. |

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics coming out of this integration.
## Troubleshooting

```{include} /_includes/troubleshooting.md
```
