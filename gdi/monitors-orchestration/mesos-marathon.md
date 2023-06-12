(marathon)=
# Mesos Marathon

<meta name="description" content="Use this Splunk Observability Cloud integration for the Marathon monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Mesos Marathon monitor type to monitor a Mesos Marathon instance using the [Marathon Python plugin](https://github.com/signalfx/signalfx-agent/blob/main/docs/monitors/collectd-marathon.md).

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

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/marathon:
    type: collectd/marathon
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/marathon]
```

### Configuration settings

The following table shows the configuration options for the Mesos Marathon monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `username` | no | `string` | Username used to authenticate with Marathon. |
| `password` | no | `string` | Password used to authenticate with Marathon. |
| `scheme` | no | `string` | Set to either `http` or `https`. (**default:** `http`) |
| `dcosAuthURL` | no | `string` | The dcos authentication URL that the plugin uses to get authentication tokens from. Set scheme to "https" if operating DC/OS in strict mode and dcosAuthURL to "https://leader.mesos/acs/api/v1/auth/login" (which is the default DNS entry provided by DC/OS) |

## Metrics

The following metrics are available for this integration:

<!--- using type="marathon" adds a duplicate, non-table-formatted list of metrics at the bottom -->
<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/marathon/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
