(filesystems)=

# Free disk space (filesystems)

<meta name="description" content="Use this Splunk Observability Cloud integrationfor the file systems / filesystems monitor. See benefits, install, configuration, and metrics">

```{note}
If you are using the Splunk Distribution of OpenTelemetry Collector and want to collect file system utilization metrics, use the native OTel component {ref}`host-metrics-receiver`.
```

## Configuration settings

The following table shows the configuration options for this monitor.

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `hostFSPath` | no | `string` | Path to the root of the host filesystem.  It is useful when running in a container and the host filesystem is mounted in a subdirectory under /.  The disk usage metrics emitted will be based at this path. |
| `fsTypes` | no | `list of strings` | The filesystem types to include/exclude.  This is an [overridable set](https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#filtering-data-using-the-smart-agent). If this is not set, the default value is the set of all **non-logical/virtual filesystems** on the system.  On Linux this list is determined by reading the `/proc/filesystems` file and choosing the filesystems that do not have the `nodev` modifier. |
| `mountPoints` | no | `list of strings` | The mount paths to include/exclude. This is an [overridable set](https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#filtering-data-using-the-smart-agent). **Note**: If you are using the hostFSPath option, do not include the `/hostfs/` mount in the filter.  If both this and `fsTypes` are specified, the two filters combine in an AND relationship. |
| `sendModeDimension` | no | `bool` | Set to `true` to emit the "mode" dimension, which represents whether the mount is "rw" or "ro". (**default:** `false`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/filesystems/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
