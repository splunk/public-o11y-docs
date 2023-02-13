(chrony)=

# Chrony NTP
<meta name="description" content="Use this Splunk Observability Cloud integration for the Chrony NTP monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Chrony NTP monitor type by using the SignalFx Smart Agent receiver. The integration monitors NTP data from a chrony server, such as clock skew and per-peer stratum. For talking to chronyd, this monitor type mimics what the chronyc control program does on the wire.

This integration is available for Kubernetes, Linux, and Windows.

## Benefits

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
  smartagent/chrony:
    type: collectd/chrony
    ...  # Additional config
```

To complete the integration, include the monitor type in a metrics pipeline. Add the monitor type to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/chrony]
```
### Configuration options

The following table shows the configuration options for this monitor type:

 Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The hostname of the chronyd instance. |
| `port` | no | `integer` | The UDP port number of the chronyd instance.  Defaults to 323 in collectd if unspecified. |
| `timeout` | no | `unsigned integer` | How long to wait for a response from chronyd before considering it down. Defaults to 2 seconds in the collectd plugin if not specified. |

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics coming out of this monitor type.

## Get help

```{include} /_includes/troubleshooting.md
```
