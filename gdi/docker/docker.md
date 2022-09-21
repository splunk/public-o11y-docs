(docker)=

# Docker Containers

<meta name="description" content="Documentation on the docker monitor">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` deploys this integration as the `docker-container-stats` monitor via the Smart Agent Receiver. This monitor reads container stats from a Docker API server. The monitor does not currently support CPU share/quota metrics.

This integration is available for Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

This monitor is provided by the Smart Agent and is available by using the SignalFx Smart Agent Receiver in the {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>`.

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. If using this monitor with the default Docker daemon's domain socket, you might need to add the `splunk-otel-collector` user to the `docker` group to have permission to access the Docker API. If running with the Smart Agent use the `signalfx-agent` user instead.
   ```yaml
   usermod -aG docker splunk-otel-collector
   ```
3. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `docker-container-stats` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

### Smart Agent

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: docker-container-stats
   ...  # Additional config
```

See <a href="https://github.com/signalfx/signalfx-agent/blob/main/deployments/docker/agent.yaml" target="_blank">Docker agent.yaml</a> for an example configuration file, with default values where applicable. See [Docker Deployment](https://github.com/signalfx/signalfx-agent/blob/main/deployments/docker) for a link to the Docker image.

### Splunk Distribution of OpenTelemetry Collector

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/docker-container-stats:
    type: docker-container-stats
    ...  # Additional config
```

To complete the monitor activation, you must also include the `smartagent/docker-container-stats` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file.

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `enableExtraBlockIOMetrics` | no | `bool` | Sends all extra block IO metrics. The default value is `false` |
| `enableExtraCPUMetrics` | no | `bool` | Sends all extra CPU metrics. The default value is `false` |
| `enableExtraMemoryMetrics` | no | `bool` | Sends all extra memory metrics. The default value is `false` |
| `enableExtraNetworkMetrics` | no | `bool` | Sends all extra network metrics. The default value is `false` |
| `dockerURL` | no | `string` | The URL of the docker server. The default value is `unix:///var/run/docker.sock`. For Windows, set it to `npipe:////.//pipe//docker_engine`. |
| `timeoutSeconds` | no | `integer` | The maximum amount of time to wait for docker API requests. The default value is `5` |
| `cacheSyncInterval` | no | `integer` | The time to wait before resyncing the list of containers the monitor maintains through the docker event listener. An example is `cacheSyncInterval: "20m"` The default value is `60m` |
| `labelsToDimensions` | no | `map of strings` | A mapping of container label names to dimension names. The corresponding label values become the dimension value for the mapped name. For example, `io.kubernetes.container.name: container_spec_name` results in a dimension called `container_spec_name` that has the value of the `io.kubernetes.container.name` container label. |
| `envToDimensions` | no | `map of strings` | A mapping of container environment variable names to dimension names. The corresponding env var values become the dimension values on the emitted metrics. For example, `APP_VERSION: version` results in data points having a dimension called `version` whose value is the value of the `APP_VERSION` envvar configured for that particular container, if present. |
| `excludedImages` | no | `list of strings` | A list of filters of images to exclude. Supports literals, globs, and regex. |


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/master/docker/metrics.yaml"></div>


## Troubleshooting

### Protocol not available error

If you get the following error message when configuring the monitor on a Windows host:

```
Error: Error initializing Docker client: protocol not available
```

edit the configuration and replace `unix:///var/run/docker.sock` with `npipe:////.//pipe//docker_engine`.

## Get help

```{include} /_includes/troubleshooting.md
```
