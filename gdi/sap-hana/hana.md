(hana)=

# SAP HANA

<meta name="Description" content="Use this Splunk Observability Cloud integration for the SAP HANA monitor. See benefits, install, configuration, and metrics">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://docs.splunk.com/Observability/gdi/opentelemetry/opentelemetry.html#nav-Install-and-configure-Splunk-Distribution-of-OpenTelemetry-Collector) provides this integration as the `hana` type by using the SignalFx Smart Agent Receiver.

Use this integration to get metrics from an SAP Hana database.

This monitor is available on Kubernetes, Linux, and Windows.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```yaml
receivers:
  smartagent/hana: 
    type: hana
    ... # Additional config
```

The following example shows additional configuration options:

```yaml
receivers:
  smartagent/hana: 
    type: hana
    host: myhost.hana.us.hanacloud.ondemand.com
    port: 443
    username: SOMEUSER
    password: s3cr3t
```

To complete the integration, include the Smart Agent receiver using this monitor in a `metrics` pipeline. To do this, add the receiver to the `service > pipelines > metrics > receivers` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/hana]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `tlsServerName` | no | `string` | `ServerName` to verify the host name. This option defaults to `Host` if not specified. |
| `insecureSkipVerify` | no | `bool` | Controls whether a client verifies the server's certificate chain and host name. The default value is `false`. |
| `rootCAFiles` | no | `list of strings` | Path to root certificate(s) (optional) |


## Metrics

These are the metrics and dimensions available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/hana/metadata.yaml"></div>


## Get help

```{include} /_includes/troubleshooting.md
```
