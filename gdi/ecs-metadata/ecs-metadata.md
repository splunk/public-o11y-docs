(ecs-metadata)=

# Amazon ECS Task Metadata

<meta name="Description" content="Use this Splunk Observability Cloud integration for the ECS metadata monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `ecs-metadata` monitor type by using the Smart Agent Receiver.

This integration reads container stats from Amazon ECS Task Metadata Endpoint version 2. The task metadata endpoint retrieves various task metadata and Docker stats.

This monitor does not currently support CPU share/quota metrics.

This monitor is available on Linux and Windows.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/ecs-metadata:
    type: ecs-metadata
    ...  # Additional config
```

To complete the integration, include the monitor in a `metrics` pipeline. To do this, add the monitor item to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/ecs-metadata]
```

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/ecs/metadata.yaml"></div>

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
