(hadoop)=
# Hadoop
<meta name="description" content="Documentation on the hadoop monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `hadoop` monitor via the Smart Agent Receiver. 

This monitor collects metrics about a Hadoop 2.0+ cluster using the [Hadoop Python plugin](https://github.com/signalfx/collectd-hadoop). If a remote JMX port is exposed in the hadoop cluster, then you may also configure the [hadoopjmx](https://github.com/signalfx/signalfx-agent/tree/main/docs/monitors/./collectd-hadoopjmx.md) monitor to collect additional metrics about the hadoop cluster.

The `hadoop` monitor will collect metrics from the Resource Manager
REST API for the following:
- Cluster Metrics
- Cluster Scheduler
- Cluster Applications
- Cluster Nodes
- MapReduce Jobs


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

<!--- links in source file

## Metric Endpoints in Hadoop
See the following links for more information about specific metric endpoints:

<a target="_blank" href="https://hadoop.apache.org/docs/r2.7.4/hadoop-project-dist/hadoop-common/Metrics.html">https://hadoop.apache.org/docs/r2.7.4/hadoop-project-dist/hadoop-common/Metrics.html</a>

<a target="_blank" href="https://hadoop.apache.org/docs/r2.7.4/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html">https://hadoop.apache.org/docs/r2.7.4/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html</a>

<a target="_blank" href="https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapredAppMasterRest.html">https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapredAppMasterRest.html</a>

-->

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `hadoop` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the
following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: hadoop
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/hadoop:
    type: hadoop
    ...  # Additional config
```


The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Resource Manager Hostname |
| `port` | **yes** | `integer` | Resource Manager Port |
| `verbose` | no | `bool` | Log verbose information about the plugin (**default:** `false`) |

### Sample YAML configuration:

```yaml
monitors:
- type: hadoop
  host: 127.0.0.1
  port: 8088
```

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="hadoop" include="markdown"></div>
