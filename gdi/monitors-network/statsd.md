(statsd)=

# Statsd

<meta name="description" content="Use this Splunk Observability Cloud integration for the Statsd monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `statsd` monitor type to collect statsd metrics. It listens on a configured address and port to receive the statsd metrics. 
 
This integration supports the `Counter`, `Timer`, `Gauge`, and `Set` types, which are dispatched as the Splunk Observability Cloud types `counter`, `gauge`, `gauge`, and `gauge` respectively. Statsd extensions such as tags are not supported.

This integration is available for Kubernetes and Linux.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Verify the installation

To verify the installation, send statsd metrics locally with `netcat` as follows, then verify in Splunk Observability Cloud that the metric arrived:

```
$ echo "statsd.test:1|g" | nc -w 1 -u 127.0.0.1 8125
```

For Kubernetes environments, use the `status.hostIP` environment variable to verify the installation. This environment variable is the IP address of the node where the pod is running. 

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml 
receivers:
  smartagent/statsd:
    type: statsd
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/statsd]
```

### Configuration settings

The following table shows the configuration options for the `statsd` monitor:

| Option          | Required | Type                          | Description                                                                                                            |
| --------------- | -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `listenAddress` | No       | `string`                      | The host or address on which to bind the UDP listener that accepts statsd datagrams. The default value is `localhost`. |
| `listenPort`    | No       | `integer`                     | The port on which to listen for statsd messages. The default value is `8125`.                                          |
| `metricPrefix`  | No       | `string`                      | A prefix in metric names that needs to be removed before metric name conversion.                                       |
| `converters`    | No       | `list of objects (see below)` | A list converters to convert statsd metric names into SignalFx metric names and dimensions.                            |

The nested `converters` configuration object has the following fields:

| Option       | Required | Type     | Description                                                                |
| ------------ | -------- | -------- | -------------------------------------------------------------------------- |
| `pattern`    | No       | `string` | A pattern to match against statsd metric names.                            |
| `metricName` | No       | `string` | A format to compose a metric name to report to Splunk Observability Cloud. |

The Smart Agent and Collector don't do any built-in filtering of metrics that come out of this monitor.

## Metrics

The agent does not do any built-in filtering of metrics coming out of this monitor.

See the section below to learn how metrics can be collected with this monitor.

### Add dimensions to statsd metrics

The statsd monitor can parse keywords from a statsd metric name by a set of converters configured by a user, as shown in the following example:

```yaml
converters:
  - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
    ...
```

This converter parses `traffic`, `mesh`, `service`, and `action` as dimensions from the `cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success` metric. If a section has only a pair of brackets without a name, it does not capture a dimension.

When multiple converters are provided, a metric is converted by the first converter with a matching pattern to the metric name.

### Format metric names

You can customize a metric name by providing a format string within the converter configuration, as shown in the following example:

```yaml
converters:
  - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
    metricName: "{traffic}.{action}"
```

The metrics that match to the given pattern are reported to Infrastructure Monitoring as `{traffic}.{action}`.
For instance, metric `cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success` is reported as `egress.update_success`.

`metricName` is required for a converter configuration. A converter is deactivated if `metricName` is not provided.

Data points get a `host` dimension of the current host that the agent is running on, not the host from which the statsd metric was sent. For this reason, send statsd metrics to a local agent instance. If you don't want the `host` dimension, you can set `disableHostDimensions: true` on the monitor configuration.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```