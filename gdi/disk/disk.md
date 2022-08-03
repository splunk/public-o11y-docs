(disk)=

# Disk and partition

<meta name="description" content="Documentation on the disk monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) deploys this integration as the `disk` monitor  via the Smart Agent Receiver. This plugin tracks the space available on disks. Use alerts and thresholds based on the plugin metrics to avoid filling disks to capacity.  The [Smart Agent plugin](https://github.com/signalfx/integrations/tree/master/signalfx-metadata) computes aggregated utilization metrics based on the output of this plugin.

The `disk` plugin collects performance statistics of hard-disks and, where supported, partitions. While the “octets” and “operations” are quite straightforward, the other two datasets need a little explanation:

 * `merged` - the number of operations that could be merged into other, already queued operations. For example, one physical disk access served two or more logical operations. Of course, the higher that number, the better.
 * `time` - the average time an I/O-operation took to complete. It is approximate.
 
 Since 5.5, there are additional metrics on the Linux platform:
 * `io_time` - the time spent doing I/Os (ms). You can treat this metric as a device load percentage. The value of 1 sec time spent matches 100% of load.
 * `weighted_io_time` - the measure of both I/O completion time and the backlog that may be accumulating.
 * `pending_operations` - the queue size of pending I/O operations.
For details about these metrics, you can also read [kernel documentation](https://www.kernel.org/doc/Documentation/iostats.txt), which includes explanations of "Field 9", "Field 10" and "Field 11".

See [signalfx-agent/pkg/monitors/collectd/disk/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/disk) for the monitor source.

<!--- 
This plugin requires:

| Software  | Version        |
|-----------|----------------|
| collectd  | 1.5+ |

--> 

## Installation

This monitor is provided by the Smart Agent and is available by using the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver) in the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector). 

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `disk` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: disk
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/disk:
    type: disk
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| configuration option | definition | default value |
| ---------------------|------------|---------------|
| Disk | Include specific Disk(s) | "sda" "/^hd/" |
| IgnoreSelected  | Ignore the designation of specific Disks | false |


## Metrics
These are the metrics available for this integration.

<div class="metrics-table" type="collectd-disk"  include="markdown"></div>
