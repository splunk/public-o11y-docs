(couchdb)=

# CouchDB

<meta name="description" content="Documentation for the couchdb monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `couchdb` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). It monitors metrics from CouchDB instances by calling the `_stats` endpoint for instances. Follow these instructions to install the CouchDB plugin for collectd.

To see the plugin source, view the [integrations project](https://github.com/signalfx/integrations/tree/master/collectd-couchdb) on GitHub.

## Requirements

| Software  | Version        |
|-----------|----------------|
| collectd  |  4.9 or later  |
| python    | 2.6 or later   |
| CouchDB   | 2.0.0 or later |
| Python plugin for collectd | (included with [SignalFx collectd agent](https://github.com/signalfx/integrations/tree/master/collectd)) |

## Installation

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Download [collectd-couchdb](https://github.com/signalfx/collectd-couchdb).
3. Move the `couchdb_plugin.py` file to `/usr/share/collectd/collectd-couchdb`.
4. Modify the [sample configuration file](https://github.com/signalfx/integrations/blob/master/collectd-couchdb/10-couchdb.conf) for the plugin in `/etc/collectd/managed_config` according to the [Configuration](#configuration) section.
5. Install the Python requirements:

   ```
   $ sudo pip install -r requirements.txt
   ```
6. Restart the OpenTelemetry collector.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `couchdb` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: couchdb
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/couchdb:
    type: couchdb
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Configuration option | Definition | Example value |
| ---------------------|------------|---------------|
| ModulePath | Path on disk where collectd can find this module. | "/usr/share/collectd/collectd-couchdb/" |
| Host | Host name of the CouchDB member | "localhost" |
| Port | Port at which the member can be reached | "5984" |
| Node | Name of the CouchDB node in the cluster | "couchdb@test\_node" |
| EnhancedMetrics | Boolean; `true` to indicate if the uncommented enhanced metrics in couchdb_metrics.py are needed. | "false" |
| Username | Username required for authentication of CouchDB | "admin" |
| Password | Password required for authentication of CouchDB | "admin" |
| IncludeMetric | Metric emitted by `_stats` api to be enabled. | "metric listed in docs" |
| ExcludeMetric | Metric emitted by `_stats` api to be disabled. | "metric listed in docs" |
| Dimension | Space-separated key-value pair for a user-defined dimension | dimension\_name dimension\_value |
| Interval | Number of seconds between calls to CouchDB API. | 10 |
| ssl\_keyfile | Path to the keyfile | "path/to/file" |
| ssl\_certificate | Path to the certificate | "path/to/file" |
| ssl\_ca\_certs | Path to the ca file | "path/to/file" |

## Metrics 


These are the metrics available for this integration: 

<div class="metrics-table" type="collectd-couchdb" include="markdown"></div>
