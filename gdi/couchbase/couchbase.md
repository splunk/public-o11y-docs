(couchbase)=

# Couchbase server

<meta name="description" content="Documentation for the couchbase monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `couchbase` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). The integration collects metrics from Couchbase servers.

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/couchbase) on GitHub.

## Installation

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Complete the [Configuration](#splunk-opentelemetry-collector-configuration).

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `couchbase` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: couchbase
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
    smartagent/couchbase:
        type: couchbase
        ...  # Additional config
```

The following table shows the configuration options for this monitor:

## Metrics

These metrics are available for this integration.

The integration emits some metrics about the bucket’s performance across the cluster, and some metrics about the bucket’s performance per node. Metrics beginning with `gauge.bucket.basic.*` and `gauge.bucket.quota.*` are reported once per cluster. All other bucket metrics (`gauge.bucket.*`) are reported by every node that hosts that bucket. In order to analyze bucket performance for the entire bucket, apply functions like `Sum` or `Mean` to group node-level metrics together by bucket.

<div class="metrics-table" type="couchbase"  include="markdown"></div>
