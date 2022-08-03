(openstack)=

# OpenStack

<meta name="description" content="Documentation on the openstack monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `openstack` monitor via the Smart Agent Receiver.

Monitors [OpenStack](https://www.openstack.org/) by using the [OpenStack Python plugin](https://github.com/signalfx/collectd-openstack), which collects metrics from OpenStack instances. This plugin is installed with the Smart Agent, so no additional installation is required to use this monitor.

This monitor covers the following OpenStack components:

* Nova (Compute)

* Cinder (Block Storage)

* Neutron (Network)

See OpenStack [Operations/Monitoring](https://wiki.openstack.org/wiki/Operations/Monitoring) for more information.

See [openstack](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/openstack) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `openstack` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: openstack
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/openstack:
    type: openstack
    ...  # Additional config
```

The following table shows the configuration options for the `openstack` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `authURL` | **yes** | `string` | Keystone authentication URL/endpoint for the OpenStack cloud |
| `username` | **yes** | `string` | Username to authenticate with keystone identity |
| `password` | **yes** | `string` | Password to authenticate with keystone identity |
| `projectName` | no | `string` | Specify the name of Project to be monitored (**default**:"demo") |
| `projectDomainID` | no | `string` | The project domain (**default**:"default") |
| `userDomainID` | no | `string` | The user domain id (**default**:"default") |
| `skipVerify` | no | `bool` | Skip SSL certificate validation (**default:** `false`) |


### Deployment host

Identify a host on which the Smart Agent will run. This integration collects data from OpenStack remotely via APIs, and so those API endpoints must be visible to the host on which the agent runs.  We do not recommend installing the agent directly on a compute instance because a compute instance/resource under one project cannot get stats about the resources under other projects. Also, a compute instance may go down due to lack of resources in the project.


### Example `openstack` Smart Agent monitor configurations

```yaml
monitors:
- type: openstack
  authURL: "http://192.168.11.111/identity/v3"
  username: "<admin-username>"
  password: "<admin-password>"
```

Example using `skipVerify`

```yaml
monitors:
- type: openstack
  authURL: "https://192.168.11.111/identity/v3"
  username: "<admin-username>"
  password: "<admin-password>"
  skipVerify: true
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="openstack" include="markdown"></div>
