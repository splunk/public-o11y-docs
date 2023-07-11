(apache-couchdb)=

# Apache CouchDB

<meta name="description" content="Use this Splunk Observability Cloud integration for the Apache CouchDB monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Apache CouchDB monitor type to monitor metrics from CouchDB instances by calling the `_stats` endpoint for instances.

This integration is only available on Kubernetes and Linux. 

## Benefits

```{include} /_includes/benefits.md
```

## Installation

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
   - {ref}`Install on Kubernetes <otel-install-k8s>`
   - {ref}`Install on Linux <otel-install-linux>`
2. Download [collectd-couchdb](https://github.com/signalfx/collectd-couchdb) in GitHub.
3. Move the `couchdb_plugin.py` file to `/usr/share/collectd/collectd-couchdb`.
4. Modify the [sample configuration file](https://github.com/signalfx/integrations/blob/master/collectd-couchdb/10-couchdb.conf) for the plugin in `/etc/collectd/managed_config` according to the [Configuration](#configuration) section.
5. Install the Python requirements:

   ```
   $ sudo pip install -r requirements.txt
   ```
6. Restart the OpenTelemetry collector.

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/couchdb:
    type: couchdb
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/couchdb]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Definition | Example value |
| ---------------------|------------|---------------|
| ModulePath | Path on disk where collectd can find this module. | "/usr/share/collectd/collectd-couchdb/" |
| Host | Host name of the CouchDB member | "localhost" |
| Port | Port at which the member can be reached | "5984" |
| Node | Name of the CouchDB node in the cluster | "couchdb@test\_node" |
| EnhancedMetrics | Boolean; `true` to indicate if the uncommented enhanced metrics in couchdb_metrics.py are needed. | "false" |
| Username | Username required for authentication of CouchDB | "admin" |
| Password | Password required for authentication of CouchDB | "admin" |
| IncludeMetric | Metric emitted by `_stats` api to be activated. | "metric listed in docs" |
| ExcludeMetric | Metric emitted by `_stats` api to be deactivated. | "metric listed in docs" |
| Dimension | Space-separated key-value pair for a user-defined dimension | dimension\_name dimension\_value |
| Interval | Number of seconds between calls to CouchDB API. | 10 |
| ssl\_keyfile | Path to the keyfile | "path/to/file" |
| ssl\_certificate | Path to the certificate | "path/to/file" |
| ssl\_ca\_certs | Path to the ca file | "path/to/file" |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/collectd-couchdb/metrics.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
