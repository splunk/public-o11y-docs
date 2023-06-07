(cadvisor)=

# cAdvisor

<meta name="Description" content="Use this Splunk Observability Cloud integration for the cAdvisor monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the cAdvisor monitor type to pull metrics directly from cAdvisor. By default, it runs on port 4194, but it can be configured to any other port.

If you are using Kubernetes, consider the {ref}`kubelet-stats-receiver` because many Kubernetes nodes do not expose cAdvisor on a network port, even though they are running it within Kubelet.

If you are running containers with Docker, retrieved metrics might overlap with `docker-container-stats`'. Consider not enabling the Docker monitor in a Kubernetes environment, or else use filtering to allow only certain metrics. This will cause the built-in Docker dashboards to be blank, but container metrics will be available on the Kubernetes dashboards instead.

This integration is available on Kubernetes, Linux, and Windows. 

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

```yaml
receivers:
  smartagent/cadvisor: 
    type: cadvisor
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/cadvisor]
```

### Configuration settings

The following table shows the configuration options for this receiver:
  
| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `cadvisor URL` | no | `string` | Where to find cAdvisor. The default value is: `http://localhost:4194`. | 

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cadvisor/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
