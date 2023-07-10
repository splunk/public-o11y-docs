(cloudfoundry-firehose-nozzle)=

# Cloud Foundry Loggregator Firehose

<meta name="description" content="Use this Splunk Observability Cloud integration for the Cloud Foundry Loggregator Firehose monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Cloud Foundry Loggregator Firehose monitor type to create a Cloud Foundry Firehose nozzle. The integration connects to the Cloud Foundry Reverse Log Proxy (RLP) Gateway that feeds metrics from the Loggregator. It supports gauge and counter metrics.

This integration is available on Linux. 

This integration uses the new RLP Gateway model that was introduced in Pivotal Cloud Foundry (PCF) 2.4, so it doesn't work with older releases.

## Benefits 

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux-only.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/cloudfoundry-firehose-nozzle
    type: cloudfoundry-firehose-nozzle
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/cloudfoundry-firehose-nozzle]
```

### Configuration settings

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `rlpGatewayUrl` | no | `string` | The base URL to the RLP Gateway server. This is quite often of the form ``https://log-stream.<CLOUD CONTROLLER SYSTEM DOMAIN>`` if using PCF 2.4+. |
| `rlpGatewaySkipVerify` | no | `bool` | Whether to skip SSL/TLS verification when using HTTPS to connect to the RLP Gateway (**default:** `false`) |
| `uaaUser` | no | `string` | The UAA username for a user that has the appropriate authority to fetch logs from the Firehose (usually the `logs.admin` authority) |
| `uaaPassword` | no | `string` | The password for the above UAA user |
| `uaaUrl` | no | `string` | The URL to the UAA server. This monitor obtains an access token from this server that it uses to authenticate with the RLP Gateway. |
| `uaaSkipVerify` | no | `bool` | Whether to skip SSL/TLS verification when using HTTPS to connect to the UAA server (**default:** `false`) |
| `shardId` | no | `string` | The nozzle's shard ID.  All nozzle instances with the same ID receive an exclusive subset of the data from the Firehose. The default should suffice in the vast majority of use cases. (**default:** `signalfx_nozzle`) |

### PCF configuration

Most of PCF Key Performance Indicators (KPIs) come through the Firehose. Refer to PCF documentation for more information on KPIs to determine when to scale up or down your cluster.

To create Cloud Foundry User Account and Authentication (UAA) user with the proper permissions to access the RLP Gateway, run the following command: 

```
$ uaac client add my-v2-nozzle \
    --name signalfx-nozzle \
    --secret <signalfx-nozzle client secret> \
    --authorized_grant_types client_credentials,refresh_token \
    --authorities logs.admin
```

Set the ``uaaUsername`` config value to ``signalfx-nozzle`` and the ``uaaPassword`` field to the ``<signalfx-nozzle client secret>`` that you select.

## Metrics

The gauge and counter metrics are collected from PCF Platform apps and platform components in the following way:

* Firehose gauge metrics are converted to Splunk Infrastructure Monitoring gauges.
* Firehose counter metrics are converted to Infrastructure Monitoring cumulative counters metrics.
* All of the tags in the Firehose envelopes are converted to dimensions when sending to Infrastructure Monitoring.

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cloudfoundry/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```
## Troubleshooting

```{include} /_includes/troubleshooting.md
```