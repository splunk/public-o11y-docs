(consul)=

# Consul datastore

<meta name="description" content="Use this Splunk Observability Cloud integration for the Consul datastore monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Consul datastore monitor type to monitor Consul datastores and collect metrics from the following endpoints:

- <a class="external" href="https://www.consul.io/api/agent.html#read-configuration" target="_blank">/agent/self</a>.
- <a class="external" href="https://www.consul.io/api/agent.html#view-metrics" target="_blank">/agent/metrics</a>.
- <a class="external" href="https://www.consul.io/api/catalog.html#list-nodes" target="_blank">/catalog/nodes</a>.
- <a class="external" href="https://www.consul.io/api/catalog.html#list-services-for-node" target="_blank">/catalog/node/:node</a>.
- <a class="external" href="https://www.consul.io/api/status.html#get-raft-leader" target="_blank">/status/leader</a>.
- <a class="external" href="https://www.consul.io/api/status.html#list-raft-peers" target="_blank">/status/peers</a>.
- <a class="external" href="https://www.consul.io/api/coordinate.html#read-wan-coordinates" target="_blank">/coordinate/datacenters</a>.
- <a class="external" href="https://www.consul.io/api/coordinate#read-lan-coordinates-for-all-nodes" target="_blank">/coordinate/nodes</a>.
- <a class="external" href="https://www.consul.io/api/health.html#list-checks-in-state" target="_blank">/health/state/any</a>.

This integration is only available on Kubernetes and Linux. 

This integration works with Consul 0.7.0 and higher.

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
  smartagent/consul:
    type: collectd/consul
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/consul]
```

### Configuration options

If you are running a version of Consul earlier than 0.9.1, configure each Consul agent you want to monitor to send metrics to the OpenTelemetry Collector. To do so, add the following configuration to each Consul agent configuration file:

```
{"telemetry":
   {"statsd_address": "<agent host>:<agent port, default 8125>"}
}
```
### Configuration settings

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `aclToken` | no | `string` | Consul ACL token |
| `useHTTPS` | no | `bool` | Set to `true` to connect to Consul using HTTPS. You can figure the certificate for the server with the `caCertificate` config option. (**default:** `false`) |
| `telemetryServer` | no | `bool` |  (**default:** `false`) |
| `telemetryHost` | no | `string` | IP address or DNS to which Consul is configured to send telemetry UDP packets. Relevant only if `telemetryServer` is set to `true`. (**default:** `0.0.0.0`) |
| `telemetryPort` | no | `integer` | Port to which Consul is configured to send telemetry UDP packets. Relevant only if `telemetryServer` is set to `true`. (**default:** `8125`) |
| `enhancedMetrics` | no | `bool` | Set to `true` to activate the collection all metrics from Consul runtime telemetry send using UDP or from the `/agent/metrics` endpoint. (**default:** `false`) |
| `caCertificate` | no | `string` | If Consul server has HTTPS activated for the API, specifies the path to the CA Certificate. |
| `clientCertificate` | no | `string` | If client-side authentication is activated, specifies the path to the certificate file. |
| `clientKey` | no | `string` | If client-side authentication is activated, specifies the path to the key file. |
| `signalFxAccessToken` | no | `string` |  |

## Metrics

These metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/consul/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
