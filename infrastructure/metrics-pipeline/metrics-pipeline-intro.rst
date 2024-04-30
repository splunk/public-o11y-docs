
.. _metrics-pipeline-intro:

******************************************************
Introduction to metrics pipeline management
******************************************************

.. meta::
    :description: Introduction to metrics pipeline management in Splunk Observability Cloud.

|hr|

:strong:`Available in Enterprise Edition`. For more information, see :ref:`sd-subscriptions`.

|hr|

Metrics pipeline management (MPM) is an evolution of the Splunk Observability Cloud metrics platform that offers you solutions to centrally manage metric cardinality.

With MPM, you have more control over how you ingest and store your metrics, so you can lower costs and improve monitoring performance without updating the configuration of your instance of the Splunk Distribution of the OpenTelemetry Collector. To remove data pre-ingest using the Collector, see :ref:`configure-remove`.

What is metric cardinality, and how does it impact your observability?
=======================================================================================

Metric cardinality is the number of unique metric time series (MTS) produced by a combination of metric name and its associated dimensions. A metric has high cardinality when it has a high number of dimension keys, and a high
number of possible unique values for those dimension keys.

For example, say you send in data for the metric ``http.server.duration``. If ``http.server.duration`` has only 1 dimension ``endpoint`` with 3 unique values: ``A``, ``B``, and ``C``, then ``http.server.duration`` generates 3 MTS.

If you add another dimension ``region`` with 3 unique values: ``us-east``, ``us-west``, and ``eu``, then ``http.server.duration`` generates 9 MTS: 3 endpoints * 3 regions.

Even though ``http.server.duration`` only has 2 dimensions, metric cardinality is already 9 since each dimension has multiple possible values.

High cardinality in your system 
----------------------------------------------------------------

High-cardinality metrics allow you to perform detailed analysis and troubleshooting, but they can lead to challenges in data management and system performance​​, as well as incur higher storage costs. With MPM, you can manage and reduce your metrics' data volume and mitigate any issues caused by high cardinality.

Use metric pipeline management to control your data volume
=============================================================================================

For each metric you send to Splunk Observability Cloud, MPM can help you configure how to ingest, keep, and manage the metric's data volume and cardinality.

For example,  you can decide to route your low-value metrics to archived metrics, a low-cost data tier, or even entirely drop them. Meanwhile, your high-value metrics continue to be routed to the real-time tier for alerting and monitoring. To learn more, see :ref:`mpm-rule-routing`.

You can also convert a high-cardinality metric into a low-cardinality metric by aggregating away the dimensions that are not needed. To learn more, see :ref:`mpm-rule-routing-exception`.

Control data ingestion and storage: Keep, archive or drop your data
------------------------------------------------------------------------------------------------

You can control your data ingestion and storage with MPM's routing capabilities:

* Ingest and keep metrics in real time. Metrics stored in the real-time tier are available in charts and detectors.
* Send your data to archived metrics. Archived metrics are not available in charts and detectors. You can change routing to real-time or filter a subset of data to real -time to make those metrics available in charts and detectors again. You can also restore archived data from up to 8 days in case you need it.
* Drop your metrics. If you select this option, metrics will be dropped and won't be available for monitoring. You can still keep aggregated MTS derived from those metrics.

To learn more, see :ref:`mpm-rule-routing`.

Archived metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can scale your metric data by sending and storing low-value, infrequently accessed metrics in a cheaper archival tier. Metrics stored in archived metrics are kept, but you cannot use them in charts or detectors directly. 

.. note:: Archived Metrics cost one-tenth of real-time metrics.

If you need to use a metric that you've sent to archived metrics you can route it back to real-time metrics and access it in charts or detectors. You can also backfill historical data from up to 8 days and restore it to the real-time tier if you need to. 

To override the archiving setting for specific sets of MTS and send them to the real-time tier, you can create a routing exception rule. When you create a routing exception rule, you can choose to ignore or restore historical data. MPM then routes the MTS selected in the rule to real time monitoring.  See :ref:`mpm-rule-routing-exception` for more information.

.. _mpm-intro-rule-dropping:
.. _data-dropping:

Data dropping rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Data dropping rules let you discard any data you don't want to monitor, so you can reduce metrics volume and save cost. For example, if you create a new aggregated metric, you might no longer need the original unaggregated data. 

Note that:

* You can override this setting by creating routing exception rules. See :ref:`mpm-rule-routing-exception`.
* You can drop new incoming data, but you can't drop data that Splunk Observability Cloud has already ingested.
* You can't recover dropped data.

.. note:: Aggregation and routing exceptions are independent from routing. You can create aggregation rules in any routing scenario: real time, archived, or dropped. However, you can only create routing exception rules when routing is set to Archived Metrics.

Before you drop any data, see :ref:`data-dropping-impact`.

Control your data volume: Aggregate your metrics
-----------------------------------------------------------------------

The data you send from your services to Splunk Observability Cloud can have high cardinality. Instead of adjusting how you are sending in your data before you send it, aggregation rules allow you to summarize your data based on the dimensions you consider important by rolling up your selected metric data into new metrics that take up less storage and increase computational performance.

With aggregation rules, you can use filters to select a subset of MTS in the metric, then keep or drop dimensions in those MTS with an aggregation rule. MPM keeps selected dimensions for the MTS only in the newly created aggregated metric.

.. caution:: You can only create aggregation rules using your metrics' dimensions. Aggregation using custom properties or tags is not supported. For more information on each type of metadata, refer to :ref:`metrics-dimensions-mts`.

By aggregating combinations of dimensions that provide useful insights while dropping a large amount of the unaggregated raw data, you can significantly reduce your organization's data footprint.

To learn more, see :ref:`mpm-rule-agreggation`.

.. note:: Aggregation and routing exceptions are independent from routing. You can create aggregation rules in any routing scenario: real-time, archived, or dropped. However, you can only create routing exception rules when routing is set to archived metrics.

Metrics pipeline management limitations
===============================================================================

MPM is not available for the following types of metrics: 

* Metrics ingested through the ``https://ingest.signalfx.com/v1/collectd`` endpoint
* Splunk Observability Cloud's :ref:`org metrics <org-metrics>`
* APM's :ref:`MetricSets <apm-metricsets>`

Aggregation rules limitations
--------------------------------------------------------------------------------

You can only create aggregation rules using your metrics' dimensions. Aggregation using custom properties or tags is not supported. For more information on each type of metadata, refer to :ref:`metrics-dimensions-mts`.

Histogram metrics limitations
--------------------------------------------------------------------------------

You cannot archive or aggregate histogram metrics. By default, they are routed to the real-time tier, and you can drop them with rules as well.


Learn more
===============================================================================

See the following docs to learn more about MPM:

* :ref:`metrics-usage-report`
* :ref:`aggregate-drop-use-case`
* :ref:`org-metrics-metrics-pipeline`

To learn more about metrics and cardinality, see:

* About metric cardinality, see the blog post :new-page:`What is Cardinality? Cardinality Metrics for Monitoring and Observability <https://www.splunk.com/en_us/blog/learn/cardinality-metrics-monitoring-observability.html>`.
* About metric time series, see :ref:`metric-time-series`. 
* About the Splunk Observability Cloud data model, see :ref:`data-model`.



