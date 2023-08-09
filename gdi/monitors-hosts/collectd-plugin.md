(collectd-plugin)=

# Collectd custom plugin

<meta name="description" content="Use this Splunk Observability Cloud integration for the Collectd custom plugin monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `collectd/custom` monitor type to customize the collectd configuration of your managed collectd instances.

This integration is only available on Kubernetes and Linux.

## Benefits

```{include} /_includes/benefits.md
```

##  Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```
### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/custom:
    type: collectd/custom
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/custom/collectd]
```
### Configuration settings 

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | This option is filled in by the agent if using service discovery. It can be accessed in the provided configuration template with `{{.Host}}`. This option is set to the hostname or IP address of the discovered service. If you aren't using service discovery, you can hard code the host/port in the configuration template and ignore these fields. |
| `port` | no | `integer` | This option is filled in by the agent if using service discovery. It can be accessed in the provided configuration template with `{{.Port}}`. This option is set to the port of the discovered service, if it is a TCP/UDP endpoint. (**default:** `0`)|
| `name` | no | `string` | This option is filled in by the agent if using service discovery. It can be accessed in the provided configuration template with `{{.Name}}`. This option is set to the name that the observer creates for the endpoint upon discovery. You can generally ignore this field. |
| `template` | no | `string` | A configuration template for collectd. You can include as many plugin blocks as you want in this value.  It is rendered as a standard Go template, so be mindful of the delimiters `{{` and `}}`. |
| `templates` | no | `list of strings` | A list of templates, but otherwise equivalent to the above `template` option. This lets you have a single directory with collectd configuration files and load them all by using a globbed remote configuration value. |
| `collectdReadThreads` | no | `integer` | The number of read threads to use in collectd. This option defaults to the number of templates provided, capped at 10, but if you manually specify it, there is no limit. (**default:** `0`)|

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics coming out of this integration.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```