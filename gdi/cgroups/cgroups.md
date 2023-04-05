(cgroups)=

# cgroups

<meta name="Description" content="Use this Splunk Observability Cloud integration for the cgroups monitor. See benefits, install, configuration, and metrics">

## Description


The Splunk Distribution of OpenTelemetry Collector provides this integration as the cgroups type monitor for the Smart Agent Receiver.

Use this integration to reports statistics about `cgroups` on Linux. This receiver supports cgroups version 1, not the newer cgroups version 2 unified implementation.

This monitor is available on Linux. 

For general information on cgroups, see the Linux control groups documentation: 

*  <a href="http://man7.org/linux/man-pages/man7/cgroups.7.html">http://man7.org/linux/man-pages/man7/cgroups.7.html</a>.

For detailed information on `cpu` cgroup metrics, see the Red Hat guide to CPU management:

*  <a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-cpu">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-cpu</a>. Note that the `cpuacct` cgroup is primarily an informational cgroup that gives detailed information on how long processes in a cgroup used the CPU.

For detailed information on `memory` cgroup metrics, see the Red Hat guide to the Memory cgroup: 

* <a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory</a>.


Also refer to the Linux Kernel memory cgroup document:

*  <a href="https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt">https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt</a>.


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
  smartagent/cgroups: 
    type: cgroups
    ... # Additional config
```

To complete the integration, include the receiver with this monitor type in a `metrics` pipeline. To do this, add the receiver to the `service > pipelines > metrics > receivers` section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/cgroups]
```

See the [configuration example](https://github.com/signalfx/splunk-otel-collector/tree/main/examples) for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this receiver:
  
| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `cgroups` | no | `list of strings` | The cgroup names to include or exclude, based on the full hierarchy path. This set can be overridden. If not provided, `cgroups` defaults to a list of all cgroups. For example, to monitor all Docker container cgroups, you could use a value of `["/docker/*"]`. |

### Filtering
You can limit the cgroups for which metrics are generated with the `cgroups` config option to the receiver.

For example, the following will only monitor Docker-generated cgroups:

```yaml
monitors:
 - type: cgroups
   cgroups:
    - "/docker/*"
```


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cgroups/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
