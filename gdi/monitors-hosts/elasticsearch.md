(elasticsearch)=

# Elasticsearch stats

<meta name="Description" content="Use this Splunk Observability Cloud integration for the ElasticSearch monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Elasticsearch monitor type to collect node, cluster, and index level stats from Elasticsearch. 

By default, this integration only collects cluster-level and index-level stats from the current master in an Elasticsearch cluster. You can override this using the `clusterHealthStatsMasterOnly` and `indexStatsMasterOnly` configuration options respectively.

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
  smartagent/elasticsearch:
    type: elasticsearch
    ... # Additional config
```

For instance, to collects only default (non-custom) metrics:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/elasticsearch]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `string` |  |
| `username` | no | `string` | Username used to access Elasticsearch stats API |
| `password` | no | `string` | Password used to access Elasticsearch stats API |
| `useHTTPS` | no | `bool` | Whether to use https or not (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is `true` and this option is also `true`, the exporter TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `cluster` | no | `string` | Cluster name to which the node belongs. This is an optional config that will override the cluster name fetched from a node and will be used to populate the plugin_instance dimension |
| `enableIndexStats` | no | `bool` | Activate Index stats. If set to `true`, by default the a subset of index stats will be collected (see docs for list of default index metrics collected). (**default:** `true`) |
| `indexes` | no | `list of strings` | Indexes to collect stats from (by default stats from all indexes are collected) |
| `indexStatsIntervalSeconds` | no | `integer` | Interval to report IndexStats on (**default:** `60`) |
| `indexSummaryOnly` | no | `bool` | Collect only aggregated index stats across all indexes (**default:** `false`) |
| `indexStatsMasterOnly` | no | `bool` | Collect index stats only from Master node (**default:** `true`) |
| `enableClusterHealth` | no | `bool` | Activates reporting on the cluster health (**default:** `true`) |
| `clusterHealthStatsMasterOnly` | no | `bool` | Whether or not non master nodes should report cluster health (**default:** `true`) |
| `enableEnhancedHTTPStats` | no | `bool` | Activate enhanced HTTP stats (**default:** `false`) |
| `enableEnhancedJVMStats` | no | `bool` | Activate enhanced JVM stats (**default:** `false`) |
| `enableEnhancedProcessStats` | no | `bool` | Activate enhanced Process stats (**default:** `false`) |
| `enableEnhancedThreadPoolStats` | no | `bool` | Activate enhanced ThreadPool stats (**default:** `false`) |
| `enableEnhancedTransportStats` | no | `bool` | Activate enhanced Transport stats (**default:** `false`) |
| `enableEnhancedNodeIndicesStats` | no | `list of strings` | Activate enhanced node level index stats groups. A list of index stats groups for which to collect enhanced stats |
| `threadPools` | no | `list of strings` | ThreadPools to report threadpool node stats on (**default:** `[search index]`) |
| `enableEnhancedClusterHealthStats` | no | `bool` | Activate Cluster level stats. These stats report only from master Elasticserach nodes. (**default:** `false`) |
| `enableEnhancedIndexStatsForIndexGroups` | no | `list of strings` | Activate enhanced index level index stats groups. A list of index stats groups for which to collect enhanced stats |
| `enableIndexStatsPrimaries` | no | `bool` | To activate index stats from only primary shards. By default, the index stats collected are aggregated across all shards. (**default:** `false`) |
| `metadataRefreshIntervalSeconds` | no | `integer` | How often to refresh metadata about the node and cluster (**default:** `30`) |

## Advanced configuration examples

### Enhanced (custom) metrics

The `elasticsearch` integration collects a subset of node stats of JVM, process, HTTP, transport, indices, and thread pool stats. It is possible to activate enhanced stats for each stat group separately.  Note that these metrics get categorized under the _custom_ group if you are on host-based pricing. This is an example of a configuration that collects enhanced (custom) metrics:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
  enableEnhancedHTTPStats: true
  enableEnhancedJVMStats: true
  enableEnhancedProcessStats: true
  enableEnhancedThreadPoolStats: true
  enableEnhancedTransportStats: true
  enableEnhancedNodeIndicesStats:
   - indexing
   - warmer
   - get

```

The `enableEnhancedNodeIndicesStats` option takes a list of index stats groups for which enhanced stats will be collected. See [Nodes stats API](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html) for a comprehensive list of all available groups.

Note that the `enableEnhancedIndexStatsForIndexGroups` configuration option is similar to the `enableEnhancedNodeIndicesStats` configuration option, but for index level stats.

### Thread pools

By default, thread pool statistics from the "search" and "index" thread pools are collected. To collect stats from other thread pools, specify the `threadPools` configuration option, as shown in the following example:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
  threadPools:
  - bulk
  - warmer
  - listener
```

The following is a list of valid thread pools by Elasticsearch version:

| Thread pool name | ES 1.x | ES 2.0 | ES 2.1+ |
|------------------|--------|--------|--------|
| merge            | &#x2713;      |        |        |
| optimize         |&#x2713;     |        |        |
| bulk             |&#x2713;     |&#x2713;     |&#x2713;     |
| flush            |&#x2713;     |&#x2713;     |&#x2713;     |
| generic          |&#x2713;     |&#x2713;     |&#x2713;     |
| get              |&#x2713;     |&#x2713;     |&#x2713;     |
| snapshot         |&#x2713;     |&#x2713;     |&#x2713;     |
| warmer           |&#x2713;     |&#x2713;     |&#x2713;     |
| refresh          |&#x2713;     |&#x2713;     |&#x2713;     |
| fetch\_shard\_started|      |&#x2713;     |&#x2713;     |
| fetch\_shard\_store|        |&#x2713;     |&#x2713;     |
| listener         |        |&#x2713;     |&#x2713;     |
| management       |        |&#x2713;     |&#x2713;     |
| percolate        |        |&#x2713;     |&#x2713;     |
| suggest          |        |&#x2713;     |&#x2713;     |
| force\_merge      |        |        |&#x2713;     |


### Collecting index statistics

By default, the configuration parameter `indexes` is empty, which means that stats are collected on all indexes. To collect statistics from a subset of indexes, set the configuration parameter `indexes` to a list of the index names you want to collect stats for.

The call to collect index statistics can be CPU-intensive. For this reason, use the `indexStatsIntervalSeconds` configuration
parameter to decrease the reporting interval for nodes that report index statistics.

#### Primaries versus total

By default, the integration collects a subset of index stats of total aggregation type. The total for an index stat aggregates across all shards, whereas primaries only reflect the stats from primary shards. It is possible to activate index
stats of only primaries aggregation type. The following is an example configuration that shows how to index stats from primary shards:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
  enableIndexStatsPrimaries: true
```

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/elasticsearch/stats/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
