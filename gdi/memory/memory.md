(memory)=

# Memory usage
<meta name="description" content="Documentation on the memory monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `memory` monitor type by using the SignalFx Smart Agent Receiver. This monitor type sends memory usage stats for the underlying host. This monitor type is available on Kubernetes, Linux, and Windows.

On Linux hosts, this monitor type relies on the `/proc` filesystem. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, specify the path using the top-level configuration `procPath`, as shown in the following example:

```
procPath: /proc
monitors:
 - type: memory
```

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
monitors:
  smartagent/collectd/memory: 
    type: collectd/memory
    ... # Additional config
```

To complete the integration, include the monitor type in a metrics pipeline. Add the monitor type to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/memory]
 ```     

To collect memory utilization metrics only, use the {ref}`host-metrics-receiver`.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/memory/metadata.yaml"></div>

To emit metrics that are not default, you can add those metrics in the generic monitor-level `extraMetrics` configuration option. Metrics that are derived from specific configuration options that do not appear in the above list of metrics do not need to be added to `extraMetrics.`

To see a list of metrics that will be emitted, you can run `agent-status monitors` after configuring this monitor type in a running agent instance.

## Get help

```{include} /_includes/troubleshooting.md
```
