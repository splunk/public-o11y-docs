(redis)=

# Redis

<meta name="description" content="Documentation on the redis monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) deploys this integration as the `redis` monitor  via the Smart Agent Receiver.

The `redis` monitor accepts endpoints and allows multiple instances. It monitors a Redis instance using the [Python Redis plugin](https://github.com/signalfx/redis-collectd-plugin). This monitor supports Redis 2.8 and later.

With this monitor, you can capture Redis metrics, such as the following:

 * Memory used
 * Commands processed per second
 * Number of connected clients and slaves
 * Number of blocked clients
 * Number of keys stored (per database)
 * Uptime
 * Changes since last save
 * Replication delay (per slave)

See [redis](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/redis) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `redis` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: redis
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/redis:
    type: redis
    ...  # Additional config
```

The following table shows the configuration options for the `redis` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` | The name for the node is a canonical identifier which is used as plugin instance. It is limited to 64 characters in length.  (**default**: "{host}:{port}") |
| `auth` | no | `string` | Password to use for authentication. |
| `sendListLengths` | no | `list of objects (see below)` | Specify a pattern of keys to lists for which to send their length as a metric. See below for more details. |
| `verbose` | no | `bool` | If `true`, verbose logging from the plugin will be enabled. (**default:** `false`) |


The **nested** `sendListLengths` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `databaseIndex` | **yes** | `integer` | The database index. |
| `keyPattern` | **yes** | `string` | Can be a globbed pattern (only * is supported), in which case all keys matching that glob will be processed.  The pattern should be placed in single quotes (').  Ex. `'mylist*'` |


### Monitor the length of Redis lists

To monitor the length of list keys, the key and database index must be
specified in the config. Specify keys in the config file in the form
`sendListLengths: [{databaseIndex: $db_index, keyPattern: "$key_name"}]`.
`$key_name` can be a globbed pattern (only `*` is supported), in which case
all keys matching that glob will be processed.  Surround
the pattern with double quotes so that the asterisks are correctly interpreted.  If any keys match the glob that are not lists, an error
will be sent to the logs.

Lengths will be reported under the metric `gauge.key_llen`, a
separate time series for each list.

**Warning**: The `KEYS` command matches the globs. Don't attempt to
match something that is very big because this command is not highly optimized and can block other commands from executing.

**Note**: To avoid duplication reporting, this should only be reported in one node.
Keys can be defined in either the master or slave config.


### Example `redis` Smart Agent monitor configurations

```yaml
monitors:
- type: redis
  host: 127.0.0.1
  port: 9100
```

Here is a sample YAML configuration with list lengths:

```yaml
monitors:
- type: redis
  host: 127.0.0.1
  port: 9100
  sendListLengths:
  - databaseIndex: 0
    keyPattern: 'mylist*'
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="redis" include="markdown"></div>
