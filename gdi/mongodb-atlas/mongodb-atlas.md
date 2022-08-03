(mongodb-atlas)=


# MongoDB Atlas cluster

<meta name="description" content="Documentation on the mongodb-atlas monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `mongodb-atlas` monitor via the Smart Agent Receiver.

MongoDB Atlas provides MongoDB as an on-demand fully managed service. Atlas exposes MongoDB cluster monitoring and logging data through its [monitoring and logs](https://docs.atlas.mongodb.com/reference/api/monitoring-and-logs/) REST API endpoints. These Atlas monitoring API resources are grouped into measurements for MongoDB processes, host disks, and MongoDB databases.

This monitor repeatedly scrapes MongoDB monitoring data from Atlas at the configured time interval. It scrapes the process and disk measurements into metric groups called mongodb and hardware. The original measurement names are included in the metric descriptions.

A set of data points are fetched at the configured granularity and period for each measurement. Metric values are set to the latest non-empty data point value in the set. The finest granularity supported by Atlas is 1 minute. The configured period for the monitor needs to be wider than the interval at which Atlas provides values for measurements, otherwise some of the sets of fetched data points will contain only empty values. The default configured period is 20 minutes, which works across all measurements and gives a reasonable response payload size.

See [signalfx-agent/pkg/monitors/mongodb/atlas/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/mongodb/atlas) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `mongodb-atlas` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: mongodb-atlas
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/mongodb-atlas:
    type: mongodb-atlas
    ...  # Additional config
```

The following table shows the configuration options for the `mongodb-atlas` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `projectID` | **yes** | `string` | ProjectID is the Atlas project ID |
| `publicKey` | **yes** | `string` | PublicKey is the Atlas public API key |
| `privateKey` | **yes** | `string` | PrivateKey is the Atlas private API key |
| `timeout` | no | `integer` | Timeout for HTTP requests to get MongoDB process measurements from Atlas. This should be a duration string that is accepted by [`func ParseDuration`](https://golang.org/pkg/time/#ParseDuration) (**default:** `5s`) |
| `enableCache` | no | `bool` | EnableCache enables locally cached Atlas metric measurements to be used when true. The metric measurements that were supposed to be fetched are in fact always fetched asynchronously and cached. (**default:** `true`) |
| `granularity` | no | `string` | Granularity is the duration in ISO 8601 notation that specifies the interval between measurement data points from Atlas over the configured period. The default is shortest duration supported by Atlas of 1 minute. (**default:** `PT1M`) |
| `period` | no | `string` | Period the duration in ISO 8601 notation that specifies how far back in the past to retrieve measurements from Atlas. (**default:** `PT20M`) |


### Example `mongodb-atlas` Smart Agent monitor configurations

Here is an excerpt of the agent configuration YAML showing the minimal required fields. Note that `disableHostDimensions` is set to `true` so that the host name in which the agent/monitor is running is not used for the `host` metric dimension value. The names of the MongoDB cluster hosts from which metrics emanate are used instead.

```
monitors:
- type: mongodb-atlas
  projectID:  <Project ID>
  publicKey:  <Public API Key>
  privateKey: <Private API Key>
  disableHostDimensions: true
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="mongodb-atlas" include="markdown"></div>
