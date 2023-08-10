(couchbase)=

# Couchbase server

<meta name="description" content="Use this Splunk Observability Cloud integration for the Couchbase monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Couchbase server monitor type to collect metrics from Couchbase servers.

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
### Configuration options

The following configuration options are available for this integration:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a Python binary that should be used to execute the Python code. If not set, a built-in runtime will be used. This can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `collectTarget` | **yes** | `string` | Define what the module block will monitor: `NODE` for a Couchbase node, or `BUCKET` for a Couchbase bucket. |
| `collectBucket` | no | `string` | If `collectTarget` is `BUCKET`, `collectBucket` specifies the name of the bucket that this will monitor. |
| `clusterName` | no | `string` | Name of this Couchbase cluster. Defaults to `default`.|
| `collectMode` | no | `string` | Change to `detailed` to collect all available metrics from Couchbase stats API. Defaults to `default`, collecting a curated set that works well with SignalFx. |
| `username` | no | `string` | Username to authenticate with |
| `password` | no | `string` | Password to authenticate with |

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/couchbase:
    type: collectd/couchbase
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/couchbase]
```

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/couchbase/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
