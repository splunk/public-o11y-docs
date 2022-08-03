
(appmesh)= 

# AWS AppMesh Envoy Proxy
<meta name="description" content="Documentation on the appmesh receiver">

## Description

This monitor starts a StatsD monitor to listen to StatsD metrics emitted
by AWS AppMesh Envoy Proxy.

The [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `appmesh` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

To report AppMesh Envoy metrics, enable Envoy StatsD sink on AppMesh
and deploy the agent as a sidecar in the services that need to be monitored.

The following code block is an example of an Envoy StatsD configuration:

```yaml
stats_sinks:
 -
  name: "envoy.statsd"
  config:
   address:
    socket_address:
     address: "127.0.0.1"
     port_value: 8125
     protocol: "UDP"
   prefix: statsd.appmesh
```
Since the prefix in metric names needs to be removed before metric name conversion, populate the `prefix` field 
with the value of the `metricPrefix` configuration for the monitor to remove this specified prefix. If not specified,
the `prefix` field defautls to `envoy`. 

To learn more, see the [Envoy API reference](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/metrics/v2/stats.proto#envoy-api-msg-config-metrics-v2-statsdsink).


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing an `appmesh` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: appmesh
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
	smartagent/appmesh:
		type: appmesh
		... # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `listenAddress` | no | `string` | The host/address on which to bind the UDP listener that accepts statsd datagrams (**default:** `localhost`) |
| `listenPort` | no | `integer` | The port on which to listen for statsd messages (**default:** `8125`) |
| `metricPrefix` | no | `string` | A prefix in metric names that needs to be removed before metric name conversion |

## Example configurations

This is a sample Smart Agent configuration:

```yaml
monitors:
 - type: appmesh
   listenAddress: 0.0.0.0
   listenPort: 8125
   metricPrefix: statsd.appmesh
```

## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="appmesh" include="markdown"></div>
