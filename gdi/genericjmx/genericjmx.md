(genericjmx)=
# GenericJMX

<meta name="description" content="Documentation on the genericjmx monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `genericjmx` monitor via the SignalFx Smart Agent Receiver.

This integration monitors Java services that expose metrics on JMX using the GenericJMX plugin. The GenericJMX plugin reads Managed Beans (mBeans) from an MBeanServer using JMX. The monitor uses an embedded Java runtime.

The Java Management Extensions (JMX) is a generic framework to provide and query management information. The interface is used by the Java Virtual Machine (JVM) to provide information about the memory used and threads. These basic performance values can therefore be collected for every Java process without any support in the Java process itself.

Advanced Java processes can use the JMX interface to provide performance information themselves. The Apache Tomcat application server, for example, provides information on the number of requests processed, the number of bytes sent, processing time, and thread counts.

> _**Note:**_ C-based collectd plugins like this one are not available on Windows.

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
  smartagent/genericjmx:
    type: collectd/genericjmx
    ...  # Additional config
```

To complete the monitor activation, you must also include the `smartagent/genericjmx` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/genericjmx]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The host to connect to. JMX must be configured for remote access and accessible from the agent. |
| `port` | **yes** | `integer` | JMX connection port (not the RMI port) on the application. This corresponds to the `com.sun.management.jmxremote.port` Java property that should be set on the JVM when running the application. |
| `name` | no | `string` |  |
| `serviceName` | no | `string` | This is how the service type is identified in the Splunk Observability Cloud UI so that you can get built-in content. For custom JMX integrations, create a `serviceName` to allow the metrics to receive the special property `sf_hostHasService` set to this value. |
| `serviceURL` | no | `string` | The JMX connection string. This is rendered as a Go template and has access to the other values in this config. **Note:** Do not set this string directly; setting the host and port as specified above is preferred. The default value is `service:jmx:rmi:///jndi/rmi://{{.Host}}:{{.Port}}/jmxrmi`. |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with prefix. If a second `instancePrefix` is specified in a referenced MBean block, the prefix specified in the Connection block will appear at the beginning of the plugin instance, and the prefix specified in the MBean block will be appended to it. |
| `username` | no | `string` | Username to authenticate to the server |
| `password` | no | `string` | User password to authenticate to the server |
| `customDimensions` | no | `map of strings` | Takes in key-value pairs of custom dimensions at the connection level. |
| `mBeansToCollect` | no | `list of strings` | A list of the MBeans defined in `mBeanDefinitions` to actually collect. If not provided, then all defined MBeans will be collected. |
| `mBeansToOmit` | no | `list of strings` | A list of the MBeans to omit. This is useful when only a few MBeans need to be omitted from the default list. |
| `mBeanDefinitions` | no | `map of objects` (see the following table) | Specifies how to map JMX MBean values to metrics. Specific service monitors such as Cassandra, Kafka, or ActiveMQ are pre-loaded with a set of mappings, and any that you add in this option will be merged with those. See <a href="https://collectd.org/documentation/manpages/collectd-java.5.shtml#genericjmx_plugin" target="_blank">GenericJMX plugin</a> for more details. |

<br>


The **nested** `mBeanDefinitions` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `objectName` | no | `string` | Sets the pattern which is used to retrieve MBeans from the MBeanServer. If more than one MBean is returned, you should use the `instanceFrom` option to make the identifiers unique. |
| `instancePrefix` | no | `string` | Prefixes the generated plugin instance with prefix. |
| `instanceFrom` | no | `list of strings` | The object names used by JMX to identify MBeans include "properties", which are basically key-value pairs. If the given object name is not unique and multiple MBeans are returned, the values of those properties usually differ. You can use this option to build the plugin instance from the appropriate property values. This is optional and may be repeated to generate the plugin instance from multiple property values. |
| `values` | no | `list of objects` (see the following table) | The `value` blocks map one or more attributes of an MBean to a value list<!---in collectd-->. There must be at least one `value` block within each MBean block. |
| `dimensions` | no | `list of strings` |  |

<br>

The **nested** `values` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | no | `string` | Sets the data set being used<!---within collectd--> to handle the values of the MBean attribute. |
| `table` | no | `bool` | Set to `true` if the returned attribute is a composite type. If set to `true`, the keys within the composite type are appended to the type instance. The default value is `false`. |
| `instancePrefix` | no | `string` | Works like the option of the same name directly beneath the MBean block, but sets the type instance instead. |
| `instanceFrom` | no | `list of strings` | Works like the option of the same name directly beneath the MBean block, but sets the type instance instead. |
| `attribute` | no | `string` | Sets the name of the attribute from which to read the value. You can access the keys of composite types by using a dot to concatenate the key name to the attribute name. For example,  “attrib0.key42”. If `table` is set to `true`, path must point to a composite type, otherwise it must point to a numeric type. |
| `attributes` | no | `list of strings` | The plural form of the `attribute` config above. Used to derive multiple metrics from a single MBean. |

### Example Configuration
This example configuration gets the thread count from a standard JMX MBean available on all Java JMX-enabled applications:

```yaml
monitors:
 - type: collectd/genericjmx
   host: my-java-app
   port: 7099
   mBeanDefinitions:
     threading:
       objectName: java.lang:type=Threading
       values:
       - type: gauge
         table: false
         instancePrefix: jvm.threads.count
         attribute: ThreadCount
```

## Metrics

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/genericjmx/metadata.yaml"></div>

## Troubleshooting

The following Java properties show how to expose JMX ports to inbound connections. For more information, see Monitoring and Management Using JMX Technology in the Java documentation.

```
java \
  -Dcom.sun.management.jmxremote.port=5000 \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -Dcom.sun.management.jmxremote.rmi.port=5000 \
  ...
```
This works as long as the agent is allowed to access port 5000 on the Java app's host. Note that this does not enable authentication or encryption, but these can be added.

The following error messages assume the host config is set to 172.17.0.3 and the port set to 5000. Your host config and port settings might be different. The following sections show errors you might receive and their meanings:

### Connection Refused

```
java \
  -Dcom.sun.management.jmxremote.port=5000 \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -Dcom.sun.management.jmxremote.rmi.port=5000 \
  ...
```
This error indicates that the JMX connect port is not open on the specified host. Confirm, using netstat/ss or some other tool, that this port is indeed open on the configured host and is listening on an appropriate address. If the agent is running on a remote server, JMX might not be listening on localhost only.

### RMI Connection Issues

```
Creating MBean server connection failed: java.rmi.ConnectException: Connection refused to host: 172.17.0.3; nested exception is:
     java.net.ConnectException: Connection timed out (Connection timed out)
```
This indicates that the JMX connect port was reached successfully, but the RMI port that it was directed to is being blocked, probably by a firewall. Make sure the `com.sun.management.jmxremote.rmi.port` property in your Java app is set to the same port as the JMX connect port. There might be other variations of the error message that say Connection reset or Connection refused which indicate a similar cause.

## Get help

```{include} /_includes/troubleshooting.md
```
