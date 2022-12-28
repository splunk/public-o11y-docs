(collectd-kafka-producer)=

# Collectd Kafka producer
<meta name="Description" content="Use this Splunk Observability Cloud integration for the Collectd Java-based Kafka producer monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `collectd/kafka_producer` monitor type by using the SignalFx Smart Agent Receiver.

Use this integration to monitor a Java-based Kafka producer using GenericJMX. This monitor has a set of built-in MBeans configured for which it pulls metrics from the Kafka producer's JMX endpoint.

## Requirements

The collectd/kafka_producer monitor requires Kafka version 0.9.0.0 or higher and collects metrics from the new producer API.

The following is a sample configuration:

```yaml
monitors:
  - type: collectd/kafka_producer
    host: localhost
    port: 8099
```

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/ collectd/kafka_producer:
    type: collectd/kafka_producer
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the service > pipelines > metrics > receivers section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/ collectd/kafka_producer]
```

### Configuration settings

The following table shows the configuration options for the collectd/kafka_producer monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | Host to connect to. JMX must be configured for remote access and be accessible from the agent. |
| `port` | **yes** | `integer` | JMX connection port on the application. Not the RMI port. This correponds to the `com.sun.management.jmxremote.port` Java property set on the JVM when running the application. |
| `name` | no | `string` |  |
| `serviceName` | no | `string` | How the service type is identified in Splunk Observability Cloud so that you can get built-in content for it.  For custom JMX integrations, set it to an arbitrary value so that metrics get the special property `sf_hostHasService` set to that value. |
| `serviceURL` | no | `string` | The JMX connection string. Rendered as a Go template. Has access to the other values in this configuration. Under normal circumstances, don't set this string directly and use the host and port settings instead. The default value is `service:jmx:rmi:///jndi/rmi://{{.Host}}:{{.Port}}/jmxrmi`. |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with a prefix. If a second `instancePrefix` is specified in a referenced MBean block, the prefix specified in the Connection block appears at the beginning of the plugin instance, and the prefix specified in the MBean block is appended to it. |
| `username` | no | `string` | Username to authenticate to the server. |
| `password` | no | `string` | User password to authenticate to the server. |
| `customDimensions` | no | `map of strings` | Takes in key-values pairs of custom dimensions at the connection level. |
| `mBeansToCollect` | no | `list of strings` | A list of the MBeans to be collected, as defined in `mBeanDefinitions`. If not provided, all defined MBeans are collected. |
| `mBeansToOmit` | no | `list of strings` | A list of the MBeans to omit. This can be useful when only a few MBeans need to omitted from the default list. |
| `mBeanDefinitions` | no | `map of objects (see below)` | Specifies how to map JMX MBean values to metrics. Specific service monitors such as Cassandra, Kafka, or Activemq, are configured with a set of mappings: additional mappings are merged with those. See the official collectd GenericJMX documentation for more details. |
| `nodeType` | **yes** | `string` | Hadoop nodeType. |

The nested `mBeanDefinitions` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `objectName` | no | `string` | Sets the pattern used to retrieve MBeans from the MBeanServer. If more than one MBean is returned, use the `instanceFrom` option to make the identifiers unique. |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with a prefix. |
| `instanceFrom` | no | `list of strings` | The object names used by JMX to identify MBeans include properties, which are in the form of key-value-pairs. If the given object name is not unique and multiple MBeans are returned, the values of those properties might differ. Use this option to build the plugin instance from the appropriate property values. To generate the plugin instance from multiple property values, use multiple instances of this setting. |
| `values` | no | `list of objects (see below)` | The `value` blocks map one or more attributes of an MBean to a value list in collectd. There must be at least one `value` block within each MBean block. |
| `dimensions` | no | `list of strings` | A list of strings for the dimensions. |

The nested `values` config object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | no | `string` | Sets the dataset used within collectd to handle the values of the MBean attribute. |
| `table` | no | `bool` | Whether the returned attribute is a composite type. If set to `true`, the keys within the composite type are appended to the type instance. The default value is `false`. |
| `instancePrefix` | no | `string` | Similar to the `instancePrefix` option under the MBean block, but sets the type instance instead. |
| `instanceFrom` | no | `list of strings` | Similar to the `instancePrefix` option under the MBean block, but sets the type instance instead. |
| `attribute` | no | `string` | The name of the attribute from which the value is read. You can access the keys of composite types by using a dot to concatenate the key name to the attribute name. For example, `attrib0.key42`. If `table` is set to `true`, the path must point to a composite type, otherwise it must point to a numeric type. |
| `attributes` | no | `list of strings` | The plural form of the `attribute` setting. Used to derive multiple metrics from a single MBean. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/kafkaproducer/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```

