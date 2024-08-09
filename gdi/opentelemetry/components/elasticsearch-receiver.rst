.. _elasticsearch-receiver:

*************************
Elasticsearch receiver
*************************

.. meta::
      :description: The Elasticsearch receiver queries the Elasticsearch node stats, cluster health and index stats endpoints in order to scrape metrics from a running Elasticsearch cluster.

The Elasticsearch receiver queries Elasticsearch's endpoints node stats, cluster health and index stats to scrape metrics from a running Elasticsearch cluster. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

To learn more about the queried endpoints see:

* :new-page:`Nodes stats API <https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html>`
* :new-page:`Cluster health API <https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html>`
* :new-page:`Index stats API <https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html>`

Prerequisites
======================

This receiver supports Elasticsearch versions 7.9 or higher.

If Elasticsearch security features are enabled, you must have either the monitor or manage cluster privilege. See Elasticsearch's :new-page:`Role-based access control <https://www.elastic.co/guide/en/elasticsearch/reference/current/authorization.html>` and :new-page:`Security privileges <https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html>` for more information on authorization and security privileges.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Elasticsearch receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the receiver, add ``elasticsearch`` to the ``receivers`` section of your configuration file:

.. code:: yaml

  receivers:
      elasticsearch

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - elasticsearch

Advanced configuration
-----------------------------------------------

The following settings are optional:

* ``metrics``. See default behavior at :new-page:`Default metrics settings <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/elasticsearchreceiver/internal/metadata/generated_metrics.go>`. Allows you to enable and disable with metrics to collect.

* ``nodes``. ``["_all"]`` by default. Allows you to specify node filters that define which nodes are scraped for node-level and cluster-level metrics. 

  * See Elasticsearch's :new-page:`Cluster APIs Node specification <https://www.elastic.co/guide/en/elasticsearch/reference/7.9/cluster.html#cluster-nodes>` for allowed filters. 
  
  * If empty, then the receiver doesn't scrap any node-level metrics, and only metrics related to the cluster's health are scraped at the cluster level.

* ``skip_cluster_metrics``. ``false`` by default. If ``true``, cluster-level metrics are not scraped.

* ``indices``. ``["_all"]`` by default. Allows you to specify index filters that define which indices are scraped for index-level metrics. 

  * See Elasticsearch's :new-page:`Cluster APIs Path parameters <https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html#index-stats-api-path-params>` for allowed filters.   
  
  * If empty, then the receiver doesn't scrap any index-level metrics.

* ``endpoint``. ``http://localhost:9200`` by default. The base URL of the Elasticsearch API for the cluster to monitor.

* ``username``. No default. Specifies the username used to authenticate with Elasticsearch using basic auth. 

* ``password``. No default. Specifies the password used to authenticate with Elasticsearch using basic auth. 

* ``collection_interval``. ``10s`` by default. This receiver collects metrics on an interval determined by this setting. This value must be a string readable by Golang's :new-page:`time.ParseDuration <https://pkg.go.dev/time#ParseDuration>`. 
  
  * On larger clusters, you might need to increase this interval, as querying Elasticsearch for metrics takes longer on clusters with more nodes.

* ``initial_delay``. ``1s`` by default. Defines how long this receiver waits before starting.

Configuration example
-----------------------------------------------

See the following configuration example:

.. code:: yaml

  receivers:
    elasticsearch:
      metrics:
        elasticsearch.node.fs.disk.available:
          enabled: false
      nodes: ["_local"]
      skip_cluster_metrics: true
      indices: [".geoip_databases"]
      endpoint: http://localhost:9200
      username: otel
      password: password
      collection_interval: 10s

.. _elasticsearch-receiver-settings:

Settings
======================

The following table shows the configuration options for the Elasticsearch receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/elasticsearch.yaml"></div>

Metrics
=======================

The following metrics, resource attributes, and attributes, are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/elasticsearchreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Metrics with versions
-----------------------------------------------

The following metric are available with versions:

* ``elasticsearch.indexing_pressure.memory.limit``. Available in versions 7.10 or higher.
* ``elasticsearch.node.shards.data_set.size``. Available in versions 7.13 or higher. 
* ``elasticsearch.cluster.state_update.count``. Available in versions 7.16.0 or higher.
* ``elasticsearch.cluster.state_update.time``. Available in versions 7.16.0 or higher.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
