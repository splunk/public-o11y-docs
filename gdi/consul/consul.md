(consul)=

# Consul datastore

<meta name="description" content="Documentation for the consul monitor">

## Description

The [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `consul` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). 

Consul 0.7.0+ is supported.

The integration monitors Consul datastores, and collects metrics from these endpoints:

- [/agent/self](https://www.consul.io/api/agent.html#read-configuration)
- [/agent/metrics](https://www.consul.io/api/agent.html#view-metrics)
- [/catalog/nodes](https://www.consul.io/api/catalog.html#list-nodes)
- [/catalog/node/:node](https://www.consul.io/api/catalog.html#list-services-for-node)
- [/status/leader](https://www.consul.io/api/status.html#get-raft-leader)
- [/status/peers](https://www.consul.io/api/status.html#list-raft-peers)
- [/coordinate/datacenters](https://www.consul.io/api/coordinate.html#read-wan-coordinates)
- [/coordinate/nodes](https://www.consul.io/api/coordinate#read-lan-coordinates-for-all-nodes)
- [/health/state/any](https://www.consul.io/api/health.html#list-checks-in-state)

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/consul) on GitHub.

## Installation

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Complete the [Configuration](#splunk-opentelemetry-collector-configuration).

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `consul` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: consul
   ...  # Additional config
```

If you are running a version of consul earlier than 0.9.1, set the `telemetryServer` option to your agent configuration. This starts a UDP server listening on 0.0.0.0:8125 by default.

```
monitors:  # All monitor config goes under this key
   - type: consul
   telemetryServer: true
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
    smartagent/consul:
        type: consul
        ...  # Additional config
```

If you are running a version of consul earlier than 0.9.1, configure each consul agent you want to monitor to send metrics to the OpenTelemetry Collector. To do so, add the following configuration to each consul agent configuration file:

```
{"telemetry":
   {"statsd_address": "<agent host>:<agent port, default 8125>"}
}
```


The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `aclToken` | no | `string` | Consul ACL token |
| `useHTTPS` | no | `bool` | Set to `true` to connect to Consul using HTTPS.  You can figure the certificate for the server with the `caCertificate` config option. (**default:** `false`) |
| `telemetryServer` | no | `bool` |  (**default:** `false`) |
| `telemetryHost` | no | `string` | IP address or DNS to which Consul is configured to send telemetry UDP packets. Relevant only if `telemetryServer` is set to true. (**default:** `0.0.0.0`) |
| `telemetryPort` | no | `integer` | Port to which Consul is configured to send telemetry UDP packets. Relevant only if `telemetryServer` is set to true. (**default:** `8125`) |
| `enhancedMetrics` | no | `bool` | Set to *true* to enable collecting all metrics from Consul's runtime telemetry send via UDP or from the `/agent/metrics` endpoint. (**default:** `false`) |
| `caCertificate` | no | `string` | If Consul server has HTTPS enabled for the API, specifies the path to the CA's Certificate. |
| `clientCertificate` | no | `string` | If client-side authentication is enabled, specifies the path to the certificate file. |
| `clientKey` | no | `string` | If client-side authentication is enabled, specifies the path to the key file. |
| `signalFxAccessToken` | no | `string` |  |

## Metrics

These metrics are available for this integration.

<div class="metrics-table" type="consul"  include="markdown"></div>
