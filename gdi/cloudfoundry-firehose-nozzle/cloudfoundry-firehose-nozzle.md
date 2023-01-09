(cloudfoundry-firehose-nozzle)=

# Cloud Foundry Loggregator Firehose

<meta name="description" content="Use this Splunk Observability Cloud integration for the Cloud Foundry Loggregator Firehose monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the
Cloud Foundry Loggregator Firehose via the Smart Agent Receiver. This integration supports gauge and counter metrics.

Use this monitor type to create a Cloud Foundry Firehose nozzle. This monitor connects to the Cloud Foundry Reverse Log Proxy (RLP) Gateway that feeds metrics from the Loggregator. This monitor uses the new RLP Gateway model that was introduced in Pivotal Cloud Foundry (PCF) 2.4, so it does not work with older releases.


This integration is available on Linux. 


## Benefits 

```{include} /_includes/benefits.md
```

## Installation

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. For instructions, see  {ref}`Install on Linux <otel-install-linux>`.

2. Configure the monitor type, as described in the next section.

3. Restart the Splunk Distribution of OpenTelemetry Collector.

## Configuration

Most of PCF's Key Performance Indicators (KPIs) come through the Firehose. Refer to PCF's documentation for more information on KPIs and the key capacity scaling indicators that help determine when to scale up or down your cluster.

The gauge and counter metrics are collected from PCF Platform apps and platform components in the following way:

* Firehose gauge metrics are converted to Splunk Infrastructure Monitoring gauges.
* Firehose counter metrics are converted to Infrastructure Monitoring cumulative counters metrics.
* All of the tags in the Firehose envelopes are converted to dimensions when sending to Infrastructure Monitoring.

Run the command to create Cloud Foundry User Account and Authentication (UAA) user with the proper permissions to access the RLP Gateway, as shown in the following example. Set the ``uaaUsername`` config value to ``signalfx-nozzle`` and the ``uaaPassword`` field to the ``<signalfx-nozzle client secret>`` that you select.

```
$ uaac client add my-v2-nozzle \
    --name signalfx-nozzle \
    --secret <signalfx-nozzle client secret> \
    --authorized_grant_types client_credentials,refresh_token \
    --authorities logs.admin
```

### Configuration Example

This monitor is available in the Smart Agent Receiver, which is part of the Splunk Distribution of OpenTelemetry Collector. You can use existing Smart Agent monitors as OpenTelemetry Collector metric receivers with the Smart Agent Receiver.

This monitor requires a properly configured environment on your system, in which you’ve installed a functional Smart Agent release bundle. The Splunk Distribution of OpenTelemetry Collector provides this bundle in the installation paths for ``x86_64/amd64``.

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:


```
receivers:
  smartagent/cloudfoundry-firehose-nozzle
    type: cloudfoundry-firehose-nozzle
    ... # Additional config
```
To complete the monitor activation, you must also include the cloudfoundry-firehose-nozzle receiver item in a metrics pipeline. To do this, add the receiver item to the cloudfoundry-firehose-nozzle section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/cloudfoundry-firehose-nozzle]
```


### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `rlpGatewayUrl` | no | `string` | The base URL to the RLP Gateway server. This is quite often of the form ``https://log-stream.<CLOUD CONTROLLER SYSTEM DOMAIN>`` if using PCF 2.4+. |
| `rlpGatewaySkipVerify` | no | `bool` | Whether to skip SSL/TLS verification when using HTTPS to connect to the RLP Gateway (**default:** `false`) |
| `uaaUser` | no | `string` | The UAA username for a user that has the appropriate authority to fetch logs from the Firehose (usually the `logs.admin` authority) |
| `uaaPassword` | no | `string` | The password for the above UAA user |
| `uaaUrl` | no | `string` | The URL to the UAA server. This monitor obtains an access token from this server that it uses to authenticate with the RLP Gateway. |
| `uaaSkipVerify` | no | `bool` | Whether to skip SSL/TLS verification when using HTTPS to connect to the UAA server (**default:** `false`) |
| `shardId` | no | `string` | The nozzle's shard ID.  All nozzle instances with the same ID receive an exclusive subset of the data from the Firehose. The default should suffice in the vast majority of use cases. (**default:** `signalfx_nozzle`) |


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cloudfoundry/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```