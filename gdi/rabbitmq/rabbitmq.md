(rabbitmq)=

# RabbitMQ

<meta name="description" content="Documentation on the rabbitmq monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `rabbitmq` monitor via the Smart Agent Receiver.

This monitor keeps track of an instance of RabbitMQ by using the [RabbitMQ Python Plugin](https://github.com/signalfx/collectd-rabbitmq). This monitor uses the [RabbitMQ Management HTTP API](https://www.rabbitmq.com/management.html) to poll for statistics on a RabbitMQ server, then reports them to the agent. This monitor works for RabbitMQ 3.0 and higher.

See [rabbitmq](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/rabbitmq) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `rabbitmq` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: rabbitmq
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/rabbitmq:
    type: rabbitmq
    ...  # Additional config
```

The following table shows the configuration options for the `rabbitmq` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary to use to execute the Python code. If not set, a built-in runtime is used. Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `brokerName` | no | `string` | Name of the particular RabbitMQ instance. Can be a Go template using other configuration options. This is used as the `plugin_instance` dimension. (**default:** `{{.host}}-{{.port}}`) |
| `collectChannels` | no | `bool` |  (**default:** `false`) |
| `collectConnections` | no | `bool` |  (**default:** `false`) |
| `collectExchanges` | no | `bool` |  (**default:** `false`) |
| `collectNodes` | no | `bool` |  (**default:** `false`) |
| `collectQueues` | no | `bool` |  (**default:** `false`) |
| `httpTimeout` | no | `integer` |  |
| `verbosityLevel` | no | `string` |  |
| `username` | **yes** | `string` |  |
| `password` | **yes** | `string` |  |
| `useHTTPS` | no | `bool` | Whether to enable HTTPS. (**default:** `false`) |
| `sslCACertFile` | no | `string` | Path to the SSL/TLS certificate of the root certificate authority implicitly trusted by this monitor. |
| `sslCertFile` | no | `string` | Path to this monitor's own SSL/TLS certificate. |
| `sslKeyFile` | no | `string` | Path to this monitor's private SSL/TLS key file. |
| `sslKeyPassphrase` | no | `string` | This monitor's private SSL/TLS key file password, if any. |
| `sslVerify` | no | `bool` | Whether the monitor should verify the RabbitMQ Management plugin SSL/TLS certificate. (**default:** `false`) |

**Note:** You must individually enable each of the five `collect*` options to get metrics pertaining to those facets of a RabbitMQ instance. If none of them are enabled, no metrics will be sent.


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="rabbitmq" include="markdown"></div>
