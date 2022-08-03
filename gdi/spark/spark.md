(spark)=

# Spark Cluster

<meta name="description" content="Documentation for the spark monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `spark` monitor via the [Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

The integration monitors Spark clusters.

The following cluster modes are supported only through HTTP endpoints:

- Standalone
- Mesos
- Hadoop YARN

You have to specify distinct monitor configurations and discovery rules for master and worker processes. For the master configuration, set `isMaster` to true.

When running Spark on Hadoop YARN, the integration capable of reporting only application metrics from the master node.

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/spark) on GitHub.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `spark` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: spark
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/spark:
    type: spark
    ...  # Additional config
```

## Metrics

These metrics are available for this integration.

<div class="metrics-table" type="spark"  include="markdown"></div>
