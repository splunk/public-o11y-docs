(mongodb)=
# MongoDB
<meta name="description" content="Documentation on the mongodb monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `mongodb` monitor via the Smart Agent Receiver.

This monitor captures the following metrics about MongoDB generally:

* memory
* network input/output bytes count
* heap usage
* db connections
* operations count
* active client connections
* queued operations

The plugin also captures the following DB-specific metrics:

* db size
* db counters

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

If you're monitoring a secured MongoDB deployment, it is a good practice to create a MongoDB user with minimal read-only roles, as follows:

```
db.createUser( {
  user: "<username>",
  pwd: "<password>",
  roles: [ { role: "readAnyDatabase", db: "admin" }, { role: "clusterMonitor", db: "admin" } ]
});
```

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `mongodb` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent config:

```
monitors:  # All monitor config goes under this key
 - type: mongodb
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/mongodb:
    type: mongodb
    ...  # Additional config
```

The following table shows the configuration options for the `mongodb` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` | Host name/IP address of the Mongo instance |
| `port` | **yes** | `integer` | Port of the Mongo instance (default: 27017) |
| `databases` | **yes** | `list of strings` | Name(s) of database(s) that you would like metrics from. Note: the first database in this list must be "admin", as it is used to perform a `serverStatus()` command. |
| `username` | no | `string` | The MongoDB user to connect as |
| `password` | no | `string` | The password of the above user |
| `useTLS` | no | `bool` | If true, will connect to Mongo using TLS (**default:** `false`) |
| `caCerts` | no | `string` | Path to a CA cert that will be used to verify the certificate that Mongo presents (not needed if not using TLS or if Mongo's cert is signed by a globally trusted issuer already installed in the default location on your OS) |
| `tlsClientCert` | no | `string` | Path to a client certificate (not needed unless your Mongo instance requires x509 client verification) |
| `tlsClientKey` | no | `string` | Path to a client certificate key (not needed unless your Mongo instance requires x509 client verification, or if your client cert above has the key included) |
| `tlsClientKeyPassPhrase` | no | `string` | Passphrase for the TLSClientKey above |
| `sendCollectionMetrics` | no | `bool` | Whether to send collection level metrics or not (**default:** `false`) |
| `sendCollectionTopMetrics` | no | `bool` | Whether to send collection level top (timing) metrics or not (**default:** `false`) |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="mongodb" include="markdown"></div>
