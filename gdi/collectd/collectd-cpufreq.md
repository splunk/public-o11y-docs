
(collectd-cpufreq)=

# Collectd CPUFreq
<meta name="Description" content="Documentation on the collectd/cpufreq integration for Splunk Observability Cloud.">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `collectd/cpufreq` monitor type by using the SignalFx Smart Agent Receiver.

Use this integration to monitor the clock speed of each CPU on a host. This is useful for systems that vary the clock speed to save energy.

This monitor is available on Linux.

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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/master/collectd-cpu/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```