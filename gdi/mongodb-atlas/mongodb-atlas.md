(mongodb-atlas)=

# MongoDB Atlas cluster

<meta name="description" content="Use this Splunk Observability Cloud integration for the MongoDB Atlas monitor. See benefits, install, configuration, and metrics">

> _**Note:**_ Use the [MongoDB Atlas receiver](https://docs.splunk.com/Observability/gdi/mongodb-atlas/mongodb-atlas-receiver.html) in place of the SignalFx Smart Agent ``mongodb-atlas`` cluster monitor. The Smart Agent is deprecated. For details, see the [deprecation notice](https://github.com/signalfx/signalfx-agent/blob/main/docs/smartagent-deprecation-notice.md). 

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `mongodb-atlas` monitor type by using the SignalFx Smart Agent Receiver.

MongoDB Atlas provides MongoDB as an on-demand fully managed service. Atlas exposes MongoDB cluster monitoring and logging data through its [monitoring and logs](https://docs.atlas.mongodb.com/reference/api/monitoring-and-logs/) REST API endpoints. These Atlas monitoring API resources are grouped into measurements for MongoDB processes, host disks, and MongoDB databases.

This monitor type repeatedly scrapes MongoDB monitoring data from Atlas at the configured time interval. It scrapes the process and disk measurements into metric groups called mongodb and hardware. The original measurement names are included in the metric descriptions.

A set of data points are fetched at the configured granularity and period for each measurement. Metric values are set to the latest non-empty data point value in the set. The finest granularity supported by Atlas is 1 minute. The configured period for the monitor type needs to be wider than the interval at which Atlas provides values for measurements, otherwise some of the sets of fetched data points will contain only empty values. The default configured period is 20 minutes, which works across all measurements and gives a reasonable response payload size.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

To activate this monitor type in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/mongodb-atlas:
    type: mongodb-atlas
    ...  # Additional config
```

To complete the activation, you must also include the ``smartagent/mongodb-atlas`` in a ``metrics`` pipeline. To do this, add the receiver item to the ``service/pipelines/metrics/receivers`` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/mongodb-atlas]
```

### Configuration settings

The following table shows the configuration options for the `mongodb-atlas` monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `projectID` | **yes** | `string` | ProjectID is the Atlas project ID |
| `publicKey` | **yes** | `string` | PublicKey is the Atlas public API key |
| `privateKey` | **yes** | `string` | PrivateKey is the Atlas private API key |
| `timeout` | no | `integer` | Timeout for HTTP requests to get MongoDB process measurements from Atlas. This should be a duration string that is accepted by [`func ParseDuration`](https://golang.org/pkg/time/#ParseDuration) (**default:** `5s`) |
| `enableCache` | no | `bool` | EnableCache enables locally cached Atlas metric measurements to be used when true. The metric measurements that were supposed to be fetched are in fact always fetched asynchronously and cached. (**default:** `true`) |
| `granularity` | no | `string` | Granularity is the duration in ISO 8601 notation that specifies the interval between measurement data points from Atlas over the configured period. The default is shortest duration supported by Atlas of 1 minute. (**default:** `PT1M`) |
| `period` | no | `string` | Period the duration in ISO 8601 notation that specifies how far back in the past to retrieve measurements from Atlas. (**default:** `PT20M`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/mongodb-atlas/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
