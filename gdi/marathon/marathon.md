(marathon)=
# Mesos Marathon
<meta name="description" content="Documentation about the Marathon monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Mesos Marathon monitor type by using the Smart Agent Receiver.

Use this integration to monitor a Mesos Marathon instance using the [Marathon Python plugin](https://github.com/signalfx/signalfx-agent/blob/main/docs/monitors/collectd-marathon.md).

This monitor is available on Kubernetes, Linux, and Windows.


## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/marathon:
    type: collectd/marathon
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the `service > pipelines > metrics > receivers` section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/marathon]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.


### Configuration settings

The following table shows the configuration options for the Mesos Marathon monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `username` | no | `string` | Username used to authenticate with Marathon. |
| `password` | no | `string` | Password used to authenticate with Marathon. |
| `scheme` | no | `string` | Set to either `http` or `https`. (**default:** `http`) |
| `dcosAuthURL` | no | `string` | The dcos authentication URL that the plugin uses to get authentication tokens from. Set scheme to "https" if operating DC/OS in strict mode and dcosAuthURL to "https://leader.mesos/acs/api/v1/auth/login" (which is the default DNS entry provided by DC/OS) |



The following is a sample YAML configuration:

```yaml
monitors:
  - type: collectd/marathon
    host: 127.0.0.1
    port: 8080
    scheme: http
```

The following is a sample YAML configuration for DC/OS:

```yaml
monitors:
  - type: collectd/marathon
    host: 127.0.0.1
    port: 8080
    scheme: https
    dcosAuthURL: https://leader.mesos/acs/api/v1/auth/login
```


## Metrics

The following metrics are available for this integration:

<!--- using type="marathon" adds a duplicate, non-table-formatted list of metrics at the bottom -->
<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/master/marathon/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
