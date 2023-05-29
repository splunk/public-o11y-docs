(mongodb-atlas)=

# MongoDB Atlas (deprecated)

<meta name="description" content="Use this Splunk Observability Cloud integration for the MongoDB Atlas monitor. See benefits, install, configuration, and metrics">

```{note}
This monitor is deprecated in favor of the Otel native component `mongodbatlas` receiver. See {ref}`MongoDB Atlas Receiver <mongodb-atlas-receiver>` for more information.
```

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the MongoDB Atlas monitor type to provide MongoDB as an on-demand fully managed service. Atlas exposes MongoDB cluster monitoring and logging data through its [monitoring and logs](https://docs.atlas.mongodb.com/reference/api/monitoring-and-logs/) REST API endpoints. These Atlas monitoring API resources are grouped into measurements for MongoDB processes, host disks, and MongoDB databases.

This integration repeatedly scrapes MongoDB monitoring data from Atlas at the configured time interval. It scrapes the process and disk measurements into metric groups called mongodb and hardware. The original measurement names are included in the metric descriptions.

A set of data points are fetched at the configured granularity and period for each measurement. Metric values are set to the latest non-empty data point value in the set. The finest granularity supported by Atlas is 1 minute. The configured period for the monitor type needs to be wider than the interval at which Atlas provides values for measurements, otherwise some of the sets of fetched data points will contain only empty values. The default configured period is 20 minutes, which works across all measurements and gives a reasonable response payload size.

## Configuration settings

The following table shows the configuration options for the `mongodb-atlas` monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `projectID` | **yes** | `string` | ProjectID is the Atlas project ID |
| `publicKey` | **yes** | `string` | PublicKey is the Atlas public API key |
| `privateKey` | **yes** | `string` | PrivateKey is the Atlas private API key |
| `timeout` | no | `integer` | Timeout for HTTP requests to get MongoDB process measurements from Atlas. This should be a duration string that is accepted by [`func ParseDuration`](https://golang.org/pkg/time/#ParseDuration) (**default:** `5s`) |
| `enableCache` | no | `bool` | Activates  locally cached Atlas metric measurements to be used when true. The metric measurements that were supposed to be fetched are in fact always fetched asynchronously and cached. (**default:** `true`) |
| `granularity` | no | `string` | Granularity is the duration in ISO 8601 notation that specifies the interval between measurement data points from Atlas over the configured period. The default is shortest duration supported by Atlas of 1 minute. (**default:** `PT1M`) |
| `period` | no | `string` | Period the duration in ISO 8601 notation that specifies how far back in the past to retrieve measurements from Atlas. (**default:** `PT20M`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/mongodb/atlas/metadata.yaml"></div>


### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
