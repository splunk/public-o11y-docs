(vsphere)=

# VMware vSphere

<meta name="description" content="Documentation on the vsphere monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `vsphere` monitor via the Smart Agent Receiver.

A VMware vSphere deployment includes physical hosts, ESXi hypervisors, virtual machines, and a vCenter Server.

To report metrics for a vSphere deployment, this monitor logs into a vCenter Server and retrieves data about the deployment and its real-time performance data on a regular interval.

When the monitor first runs, it logs in to the vCenter Server and traverses the inventory, gathering and caching all of the hosts and virtual machines and their available metrics.

After this initial sweep, the monitor will query the vCenter for performance data and metrics. This query takes place every 20 seconds, which is the interval at which the vCenter makes real-time performance data available. As a result, regardless of the `intervalSeconds` value in the agent configuration, this monitor will run every 20 seconds.

The monitor also refreshes, at a configurable interval, the cache of hosts, virtual machines, and metrics. By default, this refresh takes place every 60 seconds; however, this interval can be changed by updating the configuration field `InventoryRefreshInterval`.

This monitor uses VMware’s govmomi SDK, which officially supports vCenter 6.5, 6.7, and 7.0. While this monitor may work with vCenter 5.1, 5.5, and 6.0, these versions are not officially supported.

**Note:** When you add a custom role and do not assign any privileges to it, the role is created as a Read-Only role with three system-defined privileges: System.Anonymous, System.View, and System.Read. For more information, see <a href="https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.security.doc/GUID-18071E9A-EED1-4968-8D51-E0B4F526FDA3.html" target="_blank">Using Roles to Assign Privileges</a>.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `vsphere` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: vsphere
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/vsphere:
    type: vsphere
    ...  # Additional config
```


### Example `vsphere` Smart Agent monitor configurations

```yaml
monitors:
  - type: vsphere
    host: "172.16.248.140"
    username: "administrator@vsphere.local"
    password: "S3cr3t"
    insecureSkipVerify: true
```

The following table shows the configuration options for the `vsphere` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` |  |
| `port` | no | `integer` |  (**default:** `0`) |
| `username` | no | `string` | This is the vSphere username. |
| `password` | no | `string` | This is the vSphere password. |
| `insecureSkipVerify` | no | `bool` | Indicate whether we verify the server's certificate chain and host name. (**default:** `false`) |
| `inventoryRefreshInterval` | no | `integer` | Indicate how often to reload the inventory and inventory metrics. (**default:** `60s`) |
| `perfBatchSize` | no | `integer` | Indicate the maximum number of inventory objects to be queried for performance data per request. Set this value to `0` (zero) to request performance data for all inventory objects at a time. (**default:** `10`) |
| `tlsCACertPath` | no | `string` | This is the path to the CA certificate file. |
| `tlsClientCertificatePath` | no | `string` | Use this to configure client certificates. Indicate the path to the client certificate. Both `tlsClientKeyPath` and `tlsClientCertificatePath` must be present. The files must contain PEM encoded data. |
| `tlsClientKeyPath` | no | `string` | This is the path to the keyfile. |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="vsphere" include="markdown"></div>
