(redis)=

# Redis

<meta name="description" content="Use this Splunk Observability Cloud integration for the Redis monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `redis` monitor type to  capture the following metrics:

 * Memory used
 * Commands processed per second
 * Number of connected clients and followers
 * Number of blocked clients
 * Number of keys stored per database
 * Uptime
 * Changes since last save
 * Replication delay per follower

It accepts endpoints and allows multiple instances.

This integration is available on Kubernetes and Linux, and supports Redis 2.8 and higher.

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

```yaml
receivers:
  smartagent/redis:
    type: collectd/redis
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/redis]
```

### Configuration settings

The following table shows the configuration options for the Redis integration:

| Option            | Required | Type                          | Description                                                                                                                                    |
| ----------------- | -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`            | Yes      | `string`                      |                                                                                                                                                |
| `port`            | Yes      | `integer`                     |                                                                                                                                                |
| `pythonBinary`    | No       | `string`                      | Path to the Python binary. If you don't provide a path, the monitor uses its built-in runtime. The string can include arguments to the binary. |
| `name`            | No       | `string`                      | Name for the Redis instance. The maximum length is 64 characters. The default value is "{host}:{port}".                                        |
| `auth`            | No       | `string`                      | Authentication                                                                                                                                 |
| `sendListLengths` | No       | `list of objects (see below)` | List of keys that you want to monitor for length. To learn more, see the section **Monitor the length of Redis lists**.                        |
| `verbose`         | No       | `bool`                        | Flag that controls verbose logging for the plugin. If `true`, verbose logging is activated. The default value is`false`.                       |

The following table shows you the configuration options for the `sendListLengths` configuration object:

| Option          | Required | Type      | Description                                                                                                                                                                                                                                    |
| --------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `databaseIndex` | Yes      | `integer` | The database index                                                                                                                                                                                                                             |
| `keyPattern`    | Yes      | `string`  | A string or pattern to use for selecting keys. A string selects a single key. A pattern that uses `*` as a `glob` style wildcard processes all keys that match the pattern. Surround a pattern with single quotes ('), for example `'mylist*'` |

## Monitor the length of Redis lists

To monitor the length of list keys, you must specify the key and database index in the configuration using the following syntax:

```
sendListLengths: [{databaseIndex: $db_index, keyPattern: "$key_name"}]
```

You can specify `$key_name` as a glob-style pattern. The only supported wildcard is `*` . When you use a pattern, the configuration processes all keys that match the pattern. 

To ensure that the `*` is interpreted correctly, surround the pattern with double quotes (`""`). When a nonlist key matches the pattern, the Redis monitor writes an error to the agent logs.

in Splunk Observability Cloud, `gauge.key_llen` is the metric name for Redis list key lengths. Splunk Observability Cloud creates a separate MTS for each Redis list.

**Notes**:

1. The Redis monitor uses the `KEYS` command to match patterns. Because this command isn't optimized, you need to keep your match patterns small. Otherwise, the command can block other commands from executing.
2. To avoid duplicate reporting, choose a single node in which to monitor list lengths. You can use the main node configuration or a follower node configuration.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/redis/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

### Database Query Performance

You can troubleshoot Redis command performance issues using Database Query Performance in Splunk APM.

* For a sample scenario, see {ref}`redis-scenario`.
* For more information on Database Query Performance support for Redis, see {ref}`redis-db-query-performance`.
