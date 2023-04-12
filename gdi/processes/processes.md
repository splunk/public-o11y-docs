(processes)=

# Host process

<meta name="description" content="Use this Splunk Observability Cloud integration for the processes monitor. See benefits, install, configuration, and metrics">


## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the Host process monitor type for the Smart Agent Receiver. 

To collect metrics about processes running on a host, use the {ref}`Host metrics receiver <host-metrics-receiver>`. 

```{note}
This monitor is not available on Windows as collectd plugins are only supported in Linux and Kubernetes. 
```

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md

```
## Configuration
This monitor type is available in the Smart Agent Receiver, which is part of the Splunk Distribution of OpenTelemetry Collector. You can use existing Smart Agent monitors as OpenTelemetry Collector metric receivers with the Smart Agent Receiver. This monitor type requires a properly configured environment on your system, in which you've installed a functional Smart Agent release bundle. The Splunk Distribution of OpenTelemetry Collector provides this bundle in the installation paths for ``x86_64/amd64``. 

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following lines to your <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector" target="_blank">configuration (YAML) file</a>:

```
receivers:
  smartagent/processes:
    type: collectd/processes  
    ...  # Additional config
```

To complete the integration, include the monitor type in a metrics pipeline. Add the monitor item to the ``service/pipelines/metrics/receivers`` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/processes] 
```

The following example configuration shows how to send process metrics for processes named ``mysql`` and ``myapp``, along with additional metrics on the number of context switches the process has made. In this example, all processes that start with ``docker`` will have their process metrics aggregated together and sent with a ``plugin_instance`` value of ``docker``.

```
procPath: /proc
 monitors:
  - type: collectd/processes
    processes:
      - mysql
      - myapp
    processMatch:
      docker: "docker.*"
    collectContextSwitch: true
  ``` 

### Configuration settings

The following table shows the configuration options for the host process monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `processes` | no | `list of strings` | A list of process names to match. |
| `processMatch` | no | `map of strings` | A map with keys specifying the `plugin_instance` value to send for regex values that match process names. See the example configuration. |
| `collectContextSwitch` | no | `bool` | Collects metrics on the number of context switches made by the process. The default value is `false`. |
| `procFSPath` | no | `string` | (Deprecated) Set the agent configuration `procPath` instead of this monitor configuration option. This option is useful for overriding the path to the `proc` file system if the agent is running in a container. |


## Metrics

Metrics produced by this receiver count towards the custom metric ingestion limit. See {ref}`System limits for Splunk Infrastructure Monitoring <sys-limits>`.

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/processes/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
