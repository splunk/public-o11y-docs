(cassandra)=

# Cassandra
<meta name="description" content="Use this Splunk Observability Cloud integration for the Cassandra monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Cassandra monitor type to monitor Cassandra.

This integration is only available on Kubernetes and Linux.

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

```
receivers:
  smartagent/cassandra:
    type: collectd/cassandra
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/cassandra]
```

### Configuration settings

The following table shows the configuration options for this integration:

| Option   | Required | Type | Description |
|--------|-----|------------|-------|
| `host`  | **yes**  | `string`   | Use this string to specify the host to connect to.     |
| `port` | **yes**  | `integer`    | Use this number to specify the JMX connection port (not the RMI port) for the application.  This value corresponds to the `com.sun.management.jmxremote.port` Java property that you need to set for the JVM when you run the application. |
| `name`    | no  | `string`     |   |
| `serviceName` | no | `string`| This value appears as the service type in the Splunk Observability Cloud UI, which lets you retrieve built-in content for the service. For custom JMX integrations, you can set it to any value.                                                                                                      |
| `serviceURL`  | no | `string` | Use this value to define the JMX connection string.  The system interprets it as a Go template, so you can specify the value using replaceable variables that map to your configuration options. Note: Avoid setting this string directly. Instead, set the `host` and `port` options. (**default:** `service:jmx:rmi:///jndi/rmi://{{.Host}}:{{.Port}}/jmxrmi`)   |
| `instancePrefix`   | no    | `string`  | The system adds this value as a prefix to the generated plugin instance name. If you specify a second `instancePrefix` in a referenced MBean block, the prefix specified in the Connection block will appear at the beginning of the plugin instance, and the prefix specified in the MBean block will be appended to it.  |
| `username`  | no | `string` | Use this value to specify the user name you want to send to the server for authentication.  |
| `password`  | no    | `string`   | Use this value to specify the password for the user name.  |
| `customDimensions` | no   | `map of strings`  | This object specifies custom dimensions to add at the connection level.  |
| `mBeansToCollect`  | no  | `list of strings`  | This array specifies a list of the MBeans defined in `mBeanDefinitions` that you want to collect. If you don't provide the array, the monitor collects all defined MBeans.   |
| `mBeansToOmit`     | no   | `list of strings` | This array specifies a list of the MBeans defined in `mBeanDefinitions` that you want to omit. Use this list when you want to omit only a few MBeans from the default list.  |
| `mBeanDefinitions` | no    | `map of objects` (see the following table for details) | This object specifies how to map JMX MBean values to metrics.  Cassandra comes pre-loaded with a set of mappings. Any mappings that you add in this option are merged with the pre-loaded ones. To learn more, see [https://collectd.org/documentation/manpages/collectd-java.5.shtml#genericjmx_plugin](https://collectd.org/documentation/manpages/collectd-java.5.shtml#genericjmx_plugin). |


The `mBeanDefinitions` configuration option has the following fields:

| Option| Required | Type | Description  |
| --- | --- | --- |-------------|
| `objectName` | no | `string` | This name sets a pattern that the monitor uses to retrieve MBeans from the MBeanServer. If the server returns more than one MBean, use the `instanceFrom` option to make the MBean identifiers unique.  |
| `instancePrefix` | no | `string` | This value prefixes the generated plugin instance.   |
| `instanceFrom` | no | `list of strings` | This array specifies a list of object names used by JMX to identify MBeans, including properties that are key-value pairs. If the given object name is not unique and the server returns multiple MBeans, the values of these properties usually differ. Use the `instanceFrom` option to build the plugin instance from the appropriate property values. You can have multiple values of this option in your configuration, so you can generate the plugin instance from multiple property values. |
| `values` | no | `list of objects` (see the following table for details) | This array specifies a list of objects corresponding to blocks in the `values` option. Each block maps the attributes of an MBean to a value list in `collectd`. You need to specify at least one `value` object for each MBean.  |
| `dimensions` | no | `list of strings` |  |

The `values` configuration option has the following fields:

| Option | Required | Type | Description  |
| --- | --- | --- |----------|
| `type` | no | `string` | Use this value to set the data set used within `collectd` to handle the values of the MBean attribute   |
| `table` | no | `bool` | Set this flag to `true` if the returned attribute is a composite type. If you set it to `true`, the server appends keys within the composite type to the type instance. (**default:** `false`)    |
| `instancePrefix` | no | `string` | See the definition of `instancePrefix` in the description of `mBeanDefinitions`. This option is similar, but it sets the type instance instead.   |
| `instanceFrom` | no | `list of strings` | See the definition of `instancePrefix` in the description of `mBeanDefinitions`. This option is similar, but it sets the type instance instead.  |
| `attribute` | no | `string` | Use this value to set the name of the attribute from which to read the value. You can access the keys of composite types by using a dot to concatenate the key name to the attribute name. For example, `attrib0.key42` specifies the `key42` attribute in the `attrib0` object. If you set the `table` option to `true`, the path must point to a composite type, otherwise it must point to a numeric type. |
| `attributes` | no | `list of strings` | Use this option to derive multiple metrics from a single MBean.   |


## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/cassandra/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
