(filesystems)=

# Free disk space

<meta name="description" content="Documentation on the filesystems monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `filesystem` monitor via the Smart Agent Receiver.

This monitor reports metrics about free disk space on mounted devices.

On Linux hosts, this monitor relies on the `/proc` filesystem. If the underlying host's `/proc` file system is mounted somewhere other than `/proc`, please specify the path using the top level configuration `procPath`.

```yaml
procPath: /hostfs/proc
monitors:
 - type: filesystems
   hostFSPath: /hostfs
```

This monitor does not accept endpoints. This monitor does allow multiple instances.

## Migrating from collectd/df
The `collectd/df` monitor is being deprecated in favor of the `filesystems`
monitor.  While the `collectd/df` monitor will still be available in
5.0, switch to the `filesystems` monitor soon after upgrading.  There are a few incompatibilities to be aware of between the two monitors:

 - `collectd/df` used a dimension called `plugin_instance` to identify the
   mount point or device of the filesystem.  This dimension is completely
   removed in the `filesystems` monitor and replaced by the `mountpoint`
   and `device` dimensions.  You no longer have to select between the two
   (the `reportByDevice` option on `collectd/df`) as both are always
   reported.

 - The mountpoints in the `plugin_instance` dimension of `collectd/df`
   were reported with `-` instead of the more conventional `/` separated
   path segments.  The `filesystems` monitor always reports mountpoints in
   the `mountpoint` dimension and uses the conventional `/` separator.

 - The `collectd/df` plugin set a dimension `plugin: df` on all datapoints, but `filesystems` has no such comparable dimension.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note**: Only one of the following configurations is required.

If you are using this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: filesystems
   ...  # Additional config
```

If you are using this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/filesystems:
    type: filesystems
    ... # Additional config
```

The following table shows the configuration options for this monitor.

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `hostFSPath` | no | `string` | Path to the root of the host filesystem.  It is useful when running in a container and the host filesystem is mounted in a subdirectory under /.  The disk usage metrics emitted will be based at this path. |
| `fsTypes` | no | `list of strings` | The filesystem types to include/exclude.  This is an [overridable set](https://docs.signalfx.com/en/latest/integrations/agent/filtering.html#overridable-filters). If this is not set, the default value is the set of all **non-logical/virtual filesystems** on the system.  On Linux this list is determined by reading the `/proc/filesystems` file and choosing the filesystems that do not have the `nodev` modifier. |
| `mountPoints` | no | `list of strings` | The mount paths to include/exclude. This is an [overridable set](https://docs.signalfx.com/en/latest/integrations/agent/filtering.html#overridable-filters). **Note**: If you are using the hostFSPath option, do not include the `/hostfs/` mount in the filter.  If both this and `fsTypes` are specified, the two filters combine in an AND relationship. |
| `sendModeDimension` | no | `bool` | Set to true to emit the "mode" dimension, which represents whether the mount is "rw" or "ro". (**default:** `false`) |


## Metrics

These are the metrics available for this monitor.

<div class="metrics-table" type="filesystems"  include="markdown"></div>


