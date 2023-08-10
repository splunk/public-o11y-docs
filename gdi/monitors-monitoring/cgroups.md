(cgroups)=

# cgroups

<meta name="Description" content="Use this Splunk Observability Cloud integration for the cgroups monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the cgroups monitor type to report statistics about `cgroups` on Linux. This receiver supports cgroups version 1, not the newer cgroups version 2 unified implementation.

This monitor is available on Linux. 

For general information on cgroups, see the Linux control groups and Linux Kernel documentation: 

*  <a href="http://man7.org/linux/man-pages/man7/cgroups.7.html">http://man7.org/linux/man-pages/man7/cgroups.7.html</a>.

*  <a href="https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt">https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt</a>.

For detailed information on `cpu` and `memory` cgroup metrics, see the Red Hat guides:

*  <a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-cpu">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-cpu</a>. Note that the `cpuacct` cgroup is primarily an informational cgroup that gives detailed information on how long processes in a cgroup used the CPU.

* <a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory</a>.

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
  smartagent/cgroups: 
    type: cgroups
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/cgroups]
```

### Filtering

You can limit the cgroups for which metrics are generated with the `cgroups` config option to the receiver.

For example, the following will only monitor Docker-generated cgroups:

```yaml
receivers:
  smartagent/cgroups: 
    type: cgroups
    cgroups:
      "/docker/*"
```
### Configuration settings

The following table shows the configuration options for this receiver:
  
| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `cgroups` | no | `list of strings` | The cgroup names to include or exclude, based on the full hierarchy path. This set can be overridden. If not provided, `cgroups` defaults to a list of all cgroups. For example, to monitor all Docker container cgroups, you could use a value of `["/docker/*"]`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/cgroups/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
