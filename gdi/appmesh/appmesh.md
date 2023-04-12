
(appmesh)=

# AWS AppMesh Envoy Proxy
<meta name="description" content="Use this Splunk Observability Cloud integration for the AWS AppMesh Envoy Proxy monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `appmesh` monitor for the Smart Agent Receiver.

Use this integration to report metrics from AWS AppMesh Envoy Proxy.

To use this integration, you must also activate the Envoy StatsD sink on AppMesh and deploy the agent as a sidecar in the 
services that need to be monitored.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Splunk Distribution of OpenTelemetry Collector

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/appmesh:
    type: appmesh
      ... # Additional config
```
To complete the integration, include the monitor in a metrics pipeline. Add the monitor item to the 
`service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/appmesh]
```

See the examples directory in the Splunk Distribution of OpenTelemetry Collector GitHub repo at 
<a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">https://githubcom/signalfx/splunk-otel-collector/tree/main/examples</a>
for specific use cases that show how the Collector can integrate and complement existing environments.

### AWS AppMesh Envoy Proxy

To configure the AWS AppMesh Envoy Proxy, add the following lines to your configuration of the Envoy StatsD sink on AppMesh:

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

Because you need to remove the prefix in metric names before metric name conversion, set value of the `prefix` field
with the value of the `metricPrefix` configuration field described in the following table. This change 
causes the monitor to remove this specified prefix. If you don't specify a value for the `prefix` field, it
defaults to `envoy`.

To learn more, see the [Envoy API reference](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/metrics/v2/stats.proto#envoy-api-msg-config-metrics-v2-statsdsink).

The following table shows the configuration options for this monitor:

| Option          | Required | Type      | Description                                                                                               |
|-----------------|----------|-----------|-----------------------------------------------------------------------------------------------------------|
| `listenAddress` | no       | `string`  | This host address binds the UDP listener that accepts statsd datagrams. The default value is `localhost`. |
| `listenPort`    | no       | `integer` | This value indicates the port on which to listen for statsd messages. The default value is `8125`.        |
| `metricPrefix`  | no       | `string`  | This string sets the prefix in metric names that the monitor removes before metric name conversion        |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/appmesh/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
