(cadvisor)=

# cAdvisor

<meta name="Description" content="Use this Splunk Observability Cloud integration for the cAdvisor monitor. See benefits, install, configuration, and metrics">

## Description

This receiver pulls metrics directly from cAdvisor, which runs by default on port 4194, but can be configured to any other port.

If you are using Kubernetes, consider the {ref}`kubelet-stats-receiver` because many Kubernetes nodes do not expose cAdvisor on a network port, even though they are running it within Kubelet.

If you are running containers using Docker and the {ref}`docker` receiver, metrics duplication might happen, with the same metric data sent under different metric names. Consider not enabling the Docker Containers receiver in a Kubernetes environment, or use filtering to allow only certain metrics. Deactivating the Docker Containers receiver causes the built-in Docker dashboards to be empty, though container metrics are available on the Kubernetes dashboards instead.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

```yaml
receivers:
  smartagent/cadvisor: 
    type: cadvisor
    ... # Additional config
```

To complete the integration, include the receiver with this monitor type in a `metrics` pipeline. To do this, add the receiver to the `service > pipelines > metrics > receivers` section of your configuration file.

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/cadvisor]
```

See the [configuration example](https://github.com/signalfx/splunk-otel-collector/tree/main/examples) in GitHub for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this receiver:
  
| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `cadvisor URL` | no | `string` | Where to find cAdvisor. The default value is: `http://localhost:4194`. | 

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cadvisor/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
