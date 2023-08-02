(docker)=

# Docker Containers

<meta name="description" content="Use this Splunk Observability Cloud integration for the Docker monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `docker-container-stats` monitor type to read container stats from a Docker API server. Note it doesn't currently support CPU share/quota metrics.

This integration is available for Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

If you're using this integration with the default Docker daemon domain socket, you might need to add the `splunk-otel-collector` user to the `docker` group to have permission to access the Docker API. 

```yaml
usermod -aG docker splunk-otel-collector
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/docker-container-stats:
    type: docker-container-stats
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/docker-container-stats]
```

### Configuration settings

The following table shows the configuration options for this integration:

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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/docker/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

### Protocol not available error

If you get the following error message when configuring the monitor on a Windows host:

```
Error: Error initializing Docker client: protocol not available
```

edit the configuration and replace `unix:///var/run/docker.sock` with `npipe:////.//pipe//docker_engine`.



