(mongodb)=
# MongoDB

<meta name="description" content="Use this Splunk Observability Cloud integration for the MongoDB monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the MongoDB monitor type to capture the following metrics about MongoDB:

* Memory
* Network input/output bytes count
* Heap usage
* DB connections
* Operations count
* Active client connections
* Queued operations

The plugin also captures the following DB-specific metrics:

* DB size
* DB counters

This integration is only available on Kubernetes and Linux. 

This integration requires MongoDB 2.6 or higher.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Authentication

If you're monitoring a secured MongoDB deployment, create a MongoDB user with minimal read-only roles, as follows:

```
db.createUser( {
  user: "<username>",
  pwd: "<password>",
  roles: [ { role: "readAnyDatabase", db: "admin" }, { role: "clusterMonitor", db: "admin" } ]
});
```

```{note}
Only SCRAM-SHA-1 authentication is supported.
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/mongodb:
    type: collectd/mongodb
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/mongodb]
```

### Configuration settings

The following table shows the configuration options for the MongoDB monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | No | `string` | Path to the Python binary. If not set, a built-in runtime is used. This setting can include arguments to the binary. |
| `host` | Yes | `string` | Hostname or IP address of the MongoDB instance. |
| `port` | Yes | `integer` | Port of the MongoDB instance. The default value is `27017`. |
| `databases` | Yes | `list of strings` | Name of the databases you want to monitor. The first database in this list must be `admin`, as it's used to perform a `serverStatus()` call. |
| `username` | No | `string` | MongoDB user. |
| `password` | No | `string` | Password of the user defined in `username`. |
| `useTLS` | No | `bool` | If `true`, the monitor connects to MongoDB using TLS. The default value is `false`. |
| `caCerts` | No | `string` | Path to a CA cert used to verify the certificate that MongoDB presents. Not needed if not using TLS or if MongoDB certificate is signed by a globally trusted issuer already installed in the default location on your system. |
| `tlsClientCert` | No | `string` | Path to a client certificate. Not needed unless your MongoDB instance requires x509 client verification. |
| `tlsClientKey` | No | `string` | Path to a client certificate key. Not needed unless your MongoDB instance requires x509 client verification, or if your client certificate defined in `tlsClientCert` includes the key. |
| `tlsClientKeyPassPhrase` | No | `string` | Passphrase for the TLS client key defined in `tlsClientKey`. |
| `sendCollectionMetrics` | No | `bool` | Whether to send collection level metrics or not. The default value is `false`. |
| `sendCollectionTopMetrics` | No | `bool` | Whether to send collection level top timing metrics or not. The default value is `false`. |

```{note}
When using TLS authentication, SCRAM-SHA-256 is not supported. Use SCRAM-SHA-1 authentication.
```

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/mongodb/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
