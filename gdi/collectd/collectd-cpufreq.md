
(collectd-cpufreq)=

# Collectd CPUFreq
<meta name="Description" content="Use this Splunk Observability Cloud integration for the Collectd cpufreq monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `collectd/cpufreq` monitor type for the Smart Agent Receiver.

Use this integration to monitor the clock speed of each CPU on a host. This is useful for systems that vary the clock speed to save energy.

```{note}
This monitor is not available on Windows as collectd plugins are only supported in Linux and Kubernetes. 
```

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/ collectd/cpufreq:
    type: collectd/cpufreq
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the service > pipelines > metrics > receivers section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/ collectd/cpufreq]
```



## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/collectd-cpu/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```