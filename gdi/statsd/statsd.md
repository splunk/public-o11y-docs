(statsd)=

# statsd

<meta name="description" content="Documentation on the statsd">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `statsd` monitor via the Smart Agent Receiver.

This monitor receives and aggregates statsd metrics and converts them to datapoints. It listens on a configured address and port in order to receive the statsd metrics. Note that this monitor does not support statsd extensions such as tags.

The monitor supports the `Counter`, `Timer`, `Gauge` and `Set` types, which are dispatched as the Observability Cloud types `counter`, `gauge`, `gauge` and `gauge` respectively.

**Note**: Datapoints get a `host` dimension of the current host that the agent is running on, not the host from which the statsd metric was sent. For this reason, send statsd metrics to a local agent instance. If you don't want the `host` dimension, you can set `disableHostDimensions: true` on the monitor configuration.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.

### Verifying installation

You can send statsd metrics locally with `netcat` as follows, then verify in Observability Cloud that the metric arrived (assuming the default config).

```
$ echo "statsd.test:1|g" | nc -w 1 -u 127.0.0.1 8125
```

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `statsd` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: statsd
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/statsd:
    type: statsd
    ...  # Additional config
```

The following table shows the configuration options for the `statsd` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `listenAddress` | no | `string` | The host/address on which to bind the UDP listener that accepts statsd datagrams (**default:** `localhost`) |
| `listenPort` | no | `integer` | The port on which to listen for statsd messages (**default:** `8125`) |
| `metricPrefix` | no | `string` | A prefix in metric names that needs to be removed before metric name conversion |
| `converters` | no | `list of objects (see below)` | A list converters to convert statsd metric names into SignalFx metric names and dimensions |

The **nested** `converters` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pattern` | no | `string` | A pattern to match against statsd metric names |
| `metricName` | no | `string` | A format to compose a metric name to report to SignalFx |

The agent does not do any built-in filtering of metrics that come out of this monitor.

## Metrics

This section describes how metrics can be collected with this monitor.

### Adding dimensions to statsd metrics

The statsd monitor can parse keywords from a statsd metric name by a set of converters that was configured by user.

```
converters:
  - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
    ...
```

This converter will parse `traffic`, `mesh`, `service` and `action` as dimensions from a metric name `cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success`.
If a section has only a pair of brackets without a name, it will not capture a dimension.

When multiple converters are provided, a metric is converted by the first converter with a matching pattern to the metric name.

### Formatting metric name

You can customize a metric name by providing a format string within the converter configuration.

```
converters:
  - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
    metricName: "{traffic}.{action}"
```

The metrics which match to the given pattern will be reported to SignalFx as `{traffic}.{action}`.
For instance, metric `cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success`
will be reported as `egress.update_success`.

`metricName` is required for a converter configuration. A converter will be
disabled if `metricName` is not provided.
