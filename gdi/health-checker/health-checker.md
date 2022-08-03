(health-checker)=

# Health Checker

<meta name="description" content="Documentation for the health-checker monitor">

## Description 

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `health-checker` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). The integration checks whether the configured JSON value is returned in the response body.

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/chrony) on GitHub.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `health-checker` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: health-checker
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/health-checker:
    type: health-checker
    ...  # Additional config
```

The following table shows the configuration options for the `health-checker` monitor:


| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` |  |
| `path` | no | `string` | The HTTP path that contains a JSON document to verify (**default:** `/`) |
| `jsonKey` | no | `string` | If `jsonKey` and `jsonVal` are given, the given endpoint will be interpreted as a JSON document and will be expected to contain the given key and value for the service to be considered healthy. |
| `jsonVal` | no | `any` | This can be either a string or numeric type |
| `useHTTPS` | no | `bool` | If true, the endpoint will be connected to on HTTPS instead of plain HTTP.  It is invalid to specify this if `tcpCheck` is true. (**default:** `false`) |
| `skipSecurity` | no | `bool` | If true, and `useHTTPS` is true, the server's SSL/TLS cert will not be verified. (**default:** `false`) |
| `tcpCheck` | no | `bool` | If true, the plugin will verify that it can connect to the given host/port value. JSON checking is not supported. (**default:** `false`) |


## Metrics

There are no metrics available for this integration.