(collectd-systemd)=

# systemd

<meta name="description" content="Use this Splunk Observability Cloud integration for the Collectd Systemd monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `collectd/systemd` monitor type to collect metrics about the state of configured systemd services.

This integration is available on Kubernetes and Linux.

## Benefits

```{include} /_includes/benefits.md
```

## Requirements

This integration reads the status of systemd services from `/var/run/dbus/system_bus_socket`. You must mount the host location to the container in which the Collector or the Smart Agent is running. The agent container must also run in privileged mode. The following example shows an excerpt of the `docker run` command:

```yaml
docker run ...\
  --privileged \
  -v /var/run/dbus/system_bus_socket:/var/run/dbus/system_bus_socket:ro \
...
```

##  Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/systemd:
    type: collectd/systemd
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/systemd]
```

### Advanced examples

The following is an excerpt of a YAML configuration for monitoring the state of `docker` and `ubuntu-fan` services:

```yaml
receivers:
  smartagent/systemd:
    type: collectd/systemd
    intervalSeconds: 10
    services:
      - docker
      - ubuntu-fan
```

By default, the `gauge.substate.running` metrics, which indicates whether a service is running or not, is the only metric reported. Configure additional metrics using the `sendActiveState`, `sendSubState`, and `sendLoadState` configuration flags, as shown in the following example:

```yaml
receivers:
  smartagent/systemd:
    type: collectd/systemd
    intervalSeconds: 10
    services:
      - docker
      - ubuntu-fan
    sendActiveState: true
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `services` | Yes | `list of strings` | Services to report on. |
| `sendActiveState` | No | `bool` | Flag for sending metrics about the state of systemd services. The default value is `false`. |
| `sendSubState` | No | `bool` | Flag for sending more detailed metrics about the state of systemd services. The default value is `false`. |
| `sendLoadState` | No | `bool` | Flag for sending metrics about the load state of systemd services. The default value is `false`. |

A service is in the state that a metric represents if the metric value is `1` and not in that state if the metric value is `0`. The integration assigns the name of monitored services to the `systemd_service` dimension.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/systemd/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
