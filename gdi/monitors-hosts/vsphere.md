(vsphere)=

# VMware vSphere

<meta name="description" content="Use this Splunk Observability Cloud integration for the vSphere monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `vsphere` monitor type to collect metrics from vSphere through the vSphere API. 

This integration is available on Kubernetes, Linux, and Windows. You can install it on the same server used by vSphere if it's running on Linux or Windows.

This integration uses VMware `govmomi` SDK, which officially supports vCenter 6.5, 6.7, and 7.0. While this monitor might work with vCenter 5.1, 5.5, and 6.0, these versions are not officially supported.

```{note}
When you add a custom role, don't assign any privileges to it. The role is created as a read-only role with three system-defined privileges: `System.Anonymous`, `System.View`, and `System.Read`. For more information, see the vSphere official documentation on user roles.
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

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/vsphere:
    type: vsphere
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/vsphere]
```

See the following example with extended config options:

```yaml
receivers:
  smartagent/vsphere:
    type: vsphere
    host: hostname
    username: user
    password: pass
    insecureSkipVerify: true
exporters:
  signalfx:
    access_token: abc123
    realm: us2
service:
  pipelines:
    metrics:
      receivers:
        - smartagent/vsphere
      exporters:
        - signalfx
```

### Configuration settings

The following table shows the configuration options for the `vsphere` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | No | `string` | Hostname or IP address of the vSphere instance. For example, `127.0.0.1`. |
| `port` | No | `integer` | Port of the vSphere instance. The default value is `0`) |
| `username` | No | `string` | vSphere username. |
| `password` | No | `string` | vSphere password. |
| `insecureSkipVerify` | No | `bool` | Controls whether a client verifies the server's certificate chain and host name. The default value is `false`. |
| `inventoryRefreshInterval` | No | `integer` | Controls how often to reload the inventory and inventory metrics. The default value is `60s`. |
| `perfBatchSize` | No | `integer` | Controls the maximum number of inventory objects to be queried for performance data per request. Set this value to `0` to request performance data for all inventory objects at a time. The default value is `10`. |
| `tlsCACertPath` | No | `string` | Path to the CA certificate file. |
| `tlsClientCertificatePath` | No | `string` | Path to the client certificate. Both `tlsClientKeyPath` and `tlsClientCertificatePath` must be present. The files must contain PEM encoded data. |
| `tlsClientKeyPath` | No | `string` | Path to the keyfile. |

To report metrics for a vSphere deployment, this monitor logs into a vCenter Server and retrieves data about the deployment and real time performance data on a regular interval. When the monitor first runs, it logs in to the vCenter Server and traverses the inventory, gathering and caching all of the hosts and virtual machines and their available metrics.

After the initial sweep, the monitor queries the vCenter for performance data and metrics. This query runs every 20 seconds, which is the interval at which the vCenter makes real time performance data available. As a result, regardless of the `intervalSeconds` value in the agent configuration, this monitor runs every 20 seconds.

The monitor also refreshes, at a configurable interval, the cache of hosts, virtual machines, and metrics. By default, this refresh takes place every 60 seconds; however, this interval can be changed by updating the configuration field `InventoryRefreshInterval`.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/vsphere/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```