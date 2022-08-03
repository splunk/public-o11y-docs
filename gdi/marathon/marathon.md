(marathon)=
# Mesos Marathon
<meta name="description" content="Documentation on the marathon monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `marathon` monitor via the Smart Agent Receiver. It monitors a Mesos Marathon instance using the [Marathon Python plugin](https://github.com/signalfx/signalfx-agent/blob/main/docs/monitors/collectd-marathon.md).


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `marathon` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: marathon
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/marathon:
    type: marathon
    ...  # Additional config
```

The following table shows the configuration options for the `marathon` monitor:


| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `username` | no | `string` | Username used to authenticate with Marathon. |
| `password` | no | `string` | Password used to authenticate with Marathon. |
| `scheme` | no | `string` | Set to either `http` or `https`. (**default:** `http`) |
| `dcosAuthURL` | no | `string` | The dcos authentication URL which the plugin uses to get authentication tokens from. Set scheme to "https" if operating DC/OS in strict mode and dcosAuthURL to "https://leader.mesos/acs/api/v1/auth/login" (which is the default DNS entry provided by DC/OS) |


Sample YAML configuration:

```yaml
monitors:
  - type: marathon
    host: 127.0.0.1
    port: 8080
    scheme: http
```

Sample YAML configuration for DC/OS:

```yaml
monitors:
  - type: marathon
    host: 127.0.0.1
    port: 8080
    scheme: https
    dcosAuthURL: https://leader.mesos/acs/api/v1/auth/login
```


## Metrics

These are the metrics available for this integration.

<!--- using type="marathon" adds a duplicate, non-table-formatted list of metrics at the bottom -->
<div class="metrics-table" type="marathon" include="markdown"></div>
