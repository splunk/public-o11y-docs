
(elasticsearch)=

# Elasticsearch
<meta name="Description" content="Documentation on elasticsearch monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `elasticsearch` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).


This monitor collects stats from Elasticsearch. It collects node, cluster,
and index level stats. 
<!--- This monitor is compatible with the current `collectd`
plugin found on the GitHub repository for [collectd/elasticsearch](https://github.com/signalfx/collectd-elasticsearch) in
terms of metric naming. -->

By default, it collects cluster level and index level stats only from the current master
in an Elasticsearch cluster. It is possible to override this with the
`clusterHealthStatsMasterOnly` and `indexStatsMasterOnly` config options respectively.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing an `elasticsearch` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your
agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: elasticsearch
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/elasticsearch:
    type: elasticsearch
    ... # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `string` |  |
| `username` | no | `string` | Username used to access Elasticsearch stats API |
| `password` | no | `string` | Password used to access Elasticsearch stats API |
| `useHTTPS` | no | `bool` | Whether to use https or not (**default:** `false`) |
| `cluster` | no | `string` | Cluster name to which the node belongs. This is an optional config that will override the cluster name fetched from a node and will be used to populate the plugin_instance dimension |
| `enableIndexStats` | no | `bool` | Enable Index stats. If set to true, by default the a subset of index stats will be collected (see docs for list of default index metrics collected). (**default:** `true`) |
| `indexes` | no | `list of strings` | Indexes to collect stats from (by default stats from all indexes are collected) |
| `indexStatsIntervalSeconds` | no | `integer` | Interval to report IndexStats on (**default:** `60`) |
| `indexSummaryOnly` | no | `bool` | Collect only aggregated index stats across all indexes (**default:** `false`) |
| `indexStatsMasterOnly` | no | `bool` | Collect index stats only from Master node (**default:** `true`) |
| `enableClusterHealth` | no | `bool` | EnableClusterHealth enables reporting on the cluster health (**default:** `true`) |
| `clusterHealthStatsMasterOnly` | no | `bool` | Whether or not non master nodes should report cluster health (**default:** `true`) |
| `enableEnhancedHTTPStats` | no | `bool` | Enable enhanced HTTP stats (**default:** `false`) |
| `enableEnhancedJVMStats` | no | `bool` | Enable enhanced JVM stats (**default:** `false`) |
| `enableEnhancedProcessStats` | no | `bool` | Enable enhanced Process stats (**default:** `false`) |
| `enableEnhancedThreadPoolStats` | no | `bool` | Enable enhanced ThreadPool stats (**default:** `false`) |
| `enableEnhancedTransportStats` | no | `bool` | Enable enhanced Transport stats (**default:** `false`) |
| `enableEnhancedNodeIndicesStats` | no | `list of strings` | Enable enhanced node level index stats groups. A list of index stats groups for which to collect enhanced stats |
| `threadPools` | no | `list of strings` | ThreadPools to report threadpool node stats on (**default:** `[search index]`) |
| `enableEnhancedClusterHealthStats` | no | `bool` | Enable Cluster level stats. These stats report only from master Elasticserach nodes (**default:** `false`) |
| `enableEnhancedIndexStatsForIndexGroups` | no | `list of strings` | Enable enhanced index level index stats groups. A list of index stats groups for which to collect enhanced stats |
| `enableIndexStatsPrimaries` | no | `bool` | To enable index stats from only primary shards. By default the index stats collected are aggregated across all shards (**default:** `false`) |
| `metadataRefreshIntervalSeconds` | no | `integer` | How often to refresh metadata about the node and cluster (**default:** `30`) |

## Example configurations

This is an example of a simple configuration that collects only default (non-custom) metrics:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
```
### Enhanced (custom) metrics 

The `elasticsearch` monitor collects a subset of node stats of JVM, process, HTTP,
transport, indices, and thread pool stats. It is possible to enable
enhanced stats for each stat group separately.  Note that these metrics
get categorized under the _custom_ group if you are on host-based
pricing. This is an example of a configuration that collects enhanced (custom) metrics:

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

The `enableEnhancedNodeIndicesStats` option takes a list of index stats groups
for which enhanced stats will be collected. A comprehensive list of all
such available groups can be found on the [Nodes stats API](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html) documentation.

Note that the `enableEnhancedIndexStatsForIndexGroups` is similar to
`enableEnhancedNodeIndicesStats`, but for index level stats.

### Thread pools

By default, thread pool statistics from the "search" and "index" thread pools are collected. To collect
stats from other thread pools, specify the `threadPools` configuration option:

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

Here is a list of valid thread pools by Elasticsearch version:

| thread pool name | ES 1.x | ES 2.0 | ES 2.1+ |
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

By default, the configuration parameter `indexes` is empty, which means
collect stats on all indexes. To collect statistics from a subset of
indexes, set the configuration parameter `indexes` to a list of the index
names you want to collect stats for.

The call to collect index statistics can be CPU-intensive. For this reason, use 
the `indexStatsIntervalSeconds` configuration
parameter to decrease the reporting interval for nodes that report index
statistics.

#### Primaries versus total
By default, the monitor collects a subset of index stats of total aggregation
type. The total for an index stat aggregates across all shards,
whereas primaries only reflect the stats from primary shards. It is possible to enable index 
stats of only primaries
aggregation type. This is an example
configuration to enable index stats from primary shards:

```yaml
monitors:
- type: elasticsearch
  host: localhost
  port: 9200
  enableIndexStatsPrimaries: true
```

## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="elasticsearch" include="markdown"></div>


