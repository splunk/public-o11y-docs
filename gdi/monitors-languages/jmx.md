(jmx)=

# JMX

<meta name="description" content="Use this Splunk Observability Cloud integration for the JMX monitor. See benefits, install, configuration, and metrics. Run an arbitrary Groovy script to convert JMX MBeans fetched from a remote Java application to SignalFx data points">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `jmx` monitor type to run an arbitrary Groovy script to convert JMX MBeans fetched from a remote Java application to SignalFx data points. This is a more flexible alternative to the [GenericJMX](https://docs.splunk.com/Observability/gdi/monitors-languages/genericjmx.html) monitor.

You can use the following utility helpers in the Groovy script within the `util` variable, which is set in the script's context:

- `util.queryJMX(String objectName)`: This helper queries the configured JMX application for the given `objectName`, which can include wildcards. In any case, the return value will be a `List` of zero or more `GroovyMBean` objects, which are a convenience wrapper that Groovy provides to make accessing attributes on the MBean simple. See http://groovy-lang.org/jmx.html for more information about the `GroovyMBean` object. You can use the Groovy `.first()` method on the returned list to access the first MBean is you are only expecting one.

- `util.makeGauge(String name, double val, Map<String, String> dimensions)`:
	A convenience function to create a SignalFx gauge data point. This creates a `DataPoint` instance that can be fed to `output.sendDatapoint[s]`. This does not send the data point, only creates it.

- `util.makeCumulative(String name, double val, Map<String, String> dimensions)`: A convenience function to create a SignalFx cumulative counter data point. This creates a `DataPoint` instance that can be fed to `output.sendDatapoint[s]`. This does not send the data point, it only creates it.

The `output` instance available in the script context is used to send data to Splunk Observability Cloud. It contains the following methods:

- `output.sendDatapoint(DataPoint dp)`: Emit the given data point to SignalFx. Use the `util.make[Gauge|Cumulative]` helpers to create the `DataPoint` instance.

- `output.sendDatapoints(List<DataPoint> dp)`: Emit the given data points to SignalFx. We recommend using the `util.make[Gauge|Cumulative]` helpers to create the `DataPoint` instance. It's slightly more efficient to send multiple data points at once, but this doesn't matter that much unless you're sending very high volumes of data.

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

```
receivers:
  smartagent/jmx:
    type: jmx
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/jmx]
```

### Configuration settings

The following table shows the configuration options for this integration:

| Option               | Required | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`               | no       | `string`  | Host will be filled in by auto-discovery if this monitor has a discovery rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `port`               | no       | `integer` | Port will be filled in by auto-discovery if this monitor has a discovery rule. (**default:** `0`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `serviceURL`         | no       | `string`  | The service URL for the JMX RMI/JMXMP endpoint. If empty it will be filled in with values from `host` and `port` using a standard JMX RMI template: `service:jmx:rmi:///jndi/rmi://<host>:<port>/jmxrmi`. If overridden, `host` and `port` will have no effect. For JMXMP endpoint the service URL must be specified. The JMXMP endpoint URL format is `service:jmx:jmxmp://<host>:<port>`.                                                                                                                                                                                                                                      |
| `groovyScript`       | **yes**  | `string`  | A literal Groovy script that generates data points from JMX MBeans. See the top-level `jmx` monitor doc for more information on how to write this script. You can put the Groovy script in a separate file and refer to it here with `${include:/<my_path>/jmx.groovy}`. For more information on using the `include` config, see <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/includeconfigsource">https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/includeconfigsource</a>. Or, you can put it straight in YAML by using the \| block indicator. |
| `username`           | no       | `string`  | Username for JMX authentication, if applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `password`           | no       | `string`  | Password for JMX authentication, if applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `keyStorePath`       | no       | `string`  | The key store path is required if client authentication is activated on the target JVM.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `keyStorePassword`   | no       | `string`  | The key store file password if required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `keyStoreType`       | no       | `string`  | The key store type. (**default:** `jks`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `trustStorePath`     | no       | `string`  | The trusted store path if the TLS profile is required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `trustStorePassword` | no       | `string`  | The trust store file password if required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `jmxRemoteProfiles`  | no       | `string`  | Supported JMX remote profiles are TLS in combination with SASL profiles: SASL/PLAIN, SASL/DIGEST-MD5 and SASL/CRAM-MD5. Thus valid `jmxRemoteProfiles` values are: `SASL/PLAIN`, `SASL/DIGEST-MD5`, `SASL/CRAM-MD5`, `TLS SASL/PLAIN`, `TLS SASL/DIGEST-MD5` and `TLS SASL/CRAM-MD5`.                                                                                                                                                                                                                                                                                                                                            |
| `realm`              | no       | `string`  | The realm is required by profile SASL/DIGEST-MD5.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

The following is an example Groovy script that replicates some of the data presented by the Cassandra `nodetool status` utility:

```groovy
// Query the JMX endpoint for a single MBean.
ss = util.queryJMX("org.apache.cassandra.db:type=StorageService").first()

// Copied and modified from https://github.com/apache/cassandra
def parseFileSize(String value) {
	if (!value.matches("\\d+(\\.\\d+)? (GiB|KiB|MiB|TiB|bytes)")) {
		throw new IllegalArgumentException(
			String.format("value %s is not a valid human-readable file size", value));
	}
	if (value.endsWith(" TiB")) {
		return Math.round(Double.valueOf(value.replace(" TiB", "")) * 1e12);
	}
	else if (value.endsWith(" GiB")) {
		return Math.round(Double.valueOf(value.replace(" GiB", "")) * 1e9);
	}
	else if (value.endsWith(" KiB")) {
		return Math.round(Double.valueOf(value.replace(" KiB", "")) * 1e3);
	}
	else if (value.endsWith(" MiB")) {
		return Math.round(Double.valueOf(value.replace(" MiB", "")) * 1e6);
	}
	else if (value.endsWith(" bytes")) {
		return Math.round(Double.valueOf(value.replace(" bytes", "")));
	}
	else {
		throw new IllegalStateException(String.format("FileUtils.parseFileSize() reached an illegal state parsing %s", value));
	}
}

localEndpoint = ss.HostIdToEndpoint.get(ss.LocalHostId)
dims = [host_id: ss.LocalHostId, cluster_name: ss.ClusterName]

output.sendDatapoints([
	// Equivalent of "Up/Down" in the `nodetool status` output.
	// 1 = Live; 0 = Dead; -1 = Unknown
	util.makeGauge(
		"cassandra.status",
		ss.LiveNodes.contains(localEndpoint) ? 1 : (ss.DeadNodes.contains(localEndpoint) ? 0 : -1),
		dims),

	util.makeGauge(
		"cassandra.state",
		ss.JoiningNodes.contains(localEndpoint) ? 3 : (ss.LeavingNodes.contains(localEndpoint) ? 2 : 1),
		dims),

	util.makeGauge(
		"cassandra.load",
		parseFileSize(ss.LoadString),
		dims),

	util.makeGauge(
		"cassandra.ownership",
		ss.Ownership.get(InetAddress.getByName(localEndpoint)),
		dims)
	])
```

Make sure that your script is carefully tested before using it to monitor a production JMX service. In general, scripts should only read attributes, but nothing enforces that.

## Metrics

There are no metrics available for this integration.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
