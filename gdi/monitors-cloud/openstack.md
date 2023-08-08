(openstack)=

# OpenStack

<meta name="description" content="Use this Splunk Observability Cloud integration for the OpenStack monitor, based on the Python plugin. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the OpenStack monitor type to gather metrics from OpenStack instances.

This integration covers the following OpenStack components:

* Nova (Compute)
* Cinder (Block Storage)
* Neutron (Network)

This integration is available on Linux and Kubernetes. 

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
  smartagent/openstack:
    type: collectd/openstack
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/openstack]
```

### Configuration settings

The following table shows the configuration options for the OpenStack monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | No | `string` | Path to the Python binary. If not set, a built-in runtime is used. This setting can include arguments to the binary. |
| `authURL` | Yes | `string` | Keystone authentication URL or endpoint for the OpenStack cloud. |
| `username` | Yes | `string` | Username to authenticate with keystone identity. |
| `password` | Yes | `string` | Password to authenticate with keystone identity. |
| `projectName` | No | `string` | Specify the name of the project to be monitored. The default value is `demo`. |
| `projectDomainID` | No | `string` | The project domain. The default value is `default`. |
| `regionName` | No | `string` | The region name for URL discovery. The region name defaults to the first region if multiple regions are available. |
| `userDomainID` | No | `string` | The user domain ID. The default value is `default`. |
| `skipVerify` | No | `bool` | Skips SSL certificate validation. The default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/openstack/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
