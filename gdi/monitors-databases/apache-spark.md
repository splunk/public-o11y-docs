(spark)=

# Apache Spark
<meta name="description" content="Use this Splunk Observability Cloud integration for the Apache Sparck clusters monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Apache Spark monitor type to monitor Apache Spark clusters. It does not support fetching metrics from Spark Structured Streaming.

For the following cluster modes, the integration only supports HTTP endpoints:

- Standalone
- Mesos
- Hadoop YARN 

You need to select distinct monitor configurations and discovery rules for master and worker processes. For the master configuration, set `isMaster` to `true`. When you run Apache Spark on Hadoop YARN, this integration can only report application metrics from the master node.

This integration is only available on Kubernetes and Linux.

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

To activate this integration, add one of the following to your Collector configuration:

```yaml
receivers:
  smartagent/collectd_spark_master:
    type: collectd/spark
    ...  # Additional config
```
```yaml
receivers:
  smartagent/collectd_spark_worker:
    type: collectd/spark
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/collectd_spark_master]
```

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/collectd_spark_worker]
```

**Note:** The names `collectd_spark_master` and `collectd_spark_worker` are for identification purposes only and don't affect functionality. You can use either name in your configuration, but you need to select distinct monitor configurations and discovery rules for master and worker processes. For the master configuration, see the `isMaster` field in the [Configuration settings](#configuration-settings) section.

## Configuration settings

The following table shows the configuration options for this integration:

| Option | Required | Type | Description                                                                                                                                                                                                                                       |
| -------| -------- | ---- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pythonBinary` | no | `string` | This option specifies the path to a Python binary that executes the Python code. If you don't set this option, the system uses a built-in runtime. You can also include arguments to the binary.                                                  |
| `host` | **yes** | `string` |                                                                                                                                                                                                                                                   |
| `port` | **yes** | `integer` |                                                                                                                                                                                                                                                   |
| `isMaster` | no | `bool` | Set this option to `true` when you want to monitor a master Spark node. The default is `false`.                                                                                                                                                   |
| `clusterType` | **yes** | `string` | Set this option to the type of cluster you're monitoring. The allowed values are `Standalone`, `Mesos` or `Yarn`. The system doesn't collect cluster metrics for Yarn. Use the collectd/hadoop monitor to gain insights to your cluster's health. |
| `collectApplicationMetrics` | no | `bool` | The default is `false`.                                                                                                                                                                                                                           |
| `enhancedMetrics` | no | `bool` | The default is `false`.                                                                                                                                                                                                                           |

## Metrics

These are the metrics available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/spark/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```