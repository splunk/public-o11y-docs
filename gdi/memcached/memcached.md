(memcached)=
# Memcached
<meta name="description" content="Documentation on the memcached monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `memcached` monitor via the Smart Agent Receiver.

This monitor collects the following information from Memcached nodes:

* request information (including hits, misses & evictions)
* current connections
* net input/output bytes
* number of items cached

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `memcached` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: memcached
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/memcached:
    type: memcached
    ...  # Additional config
```


The following table shows the configuration options for the `memcached` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` |  |
| `reportHost` | no | `bool` |  (**default:** `false`) |

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="memcached" include="markdown"></div>
