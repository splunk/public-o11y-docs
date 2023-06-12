(apache-tomcat)=

# Apache Tomcat

<meta name="description" content="Use this Splunk Observability Cloud integration for the Collectd Tomcat monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Collectd Tomcat monitor type to monitor Tomcat. You must activate JMX Remote to monitor Tomcat remotely. See [GenericJMX](https://docs.splunk.com/Observability/gdi/monitors-languages/genericjmx.html) for more information.

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

```yaml
receivers:
  smartagent/tomcat:
    type: collectd/tomcat
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/tomcat]
```

### Configuration settings 

The following tables show the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The host to connect to. JMX must be configured for remote access and accessible from the agent. |
| `port` | **yes** | `integer` | The JMX connection port. This is not the same as the remote method invocation (RMI) port on the application. This corresponds to the `com.sun.management.jmxremote.port` Java property to set on the JVM when running the application. |
| `name` | no | `string` |  |
| `serviceName` | no | `string` | This is how the service type is identified in the UI so that you can get built-in content for it. For custom JMX integrations, it can be set to whatever you like. |
| `serviceURL` | no | `string` | The JMX connection string. This is rendered as a Go template and has access to the other values in this configuration. Note that under normal circumstances, it is not advised to set this string directly. Setting the host and port as specified above is preferred. The default value is `service:jmx:rmi:///jndi/rmi://{{.Host}}:{{.Port}}/jmxrmi`). |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with prefix. If a second `instancePrefix` is specified in a referenced MBean block, the prefix specified in the Connection block appears at the beginning of the plugin instance, and the prefix specified in the MBean block is appended to it. |
| `username` | no | `string` | The username to authenticate to the server. |
| `password` | no | `string` | The user password to authenticate to the server. |
| `customDimensions` | no | `map of strings` | Takes in key-values pairs of custom dimensions at the connection level. |
| `mBeansToCollect` | no | `list of strings` | A list of the MBeans defined in `mBeanDefinitions` to actually collect. If not provided, then all defined MBeans are collected. |
| `mBeansToOmit` | no | `list of strings` | A list of the MBeans to omit. This is useful in cases where only a few MBeans need to be omitted from the default list. |
| `mBeanDefinitions` | no | `map of objects` (see below) | Specifies how to map JMX MBean values to metrics. If using a specific service monitor such as Cassandra, Kafka, or ActiveMQ, they come pre-loaded with a set of mappings, and any that you add in this option are merged with those. |

The **nested** `mBeanDefinitions` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `objectName` | no | `string` | Sets the pattern, which is used to retrieve MBeans from the MBeanServer. If more than one MBean is returned, use the `instanceFrom` option to make the identifiers unique. |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with prefix. |
| `instanceFrom` | no | `list of strings` | The object names used by JMX to identify MBeans include so called "properties", which are basically key-value-pairs. If the given object name is not unique and multiple MBeans are returned, the values of those properties usually differ. Use this option to build the plugin instance from the appropriate property values. This is optional and can be repeated to generate the plugin instance from multiple property values. |
| `values` | no | `list of objects` (see below) | The `value` blocks map one or more attributes of an MBean to a value list in collectd. There must be at least one `value` block within each MBean block. |
| `dimensions` | no | `list of strings` | &nbsp; |

The **nested** `values` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | no | `string` | Sets the data set used within collectd to handle the values of the MBean attribute. |
| `table` | no | `bool` | Set to `true` if the returned attribute is a composite type. If set to `true`, the keys within the composite type are appended to the type instance. The default value is `false`. |
| `instancePrefix` | no | `string` | Works like the option of the same name directly beneath the MBean block, but sets the type instance instead. |
| `instanceFrom` | no | `list of strings` | Works like the option of the same name directly beneath the MBean block, but sets the type instance instead. |
| `attribute` | no | `string` | Sets the name of the attribute from which to read the value. You can access the keys of composite types by using a dot to concatenate the key name to the attribute name. For example, “attrib0.key42”. If `table` is set to `true`, then the path must point to a composite type, otherwise, it must point to a numeric type. |
| `attributes` | no | `list of strings` | The plural form of the `attribute` configuration above. Used to derive multiple metrics from a single MBean. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/tomcat/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
