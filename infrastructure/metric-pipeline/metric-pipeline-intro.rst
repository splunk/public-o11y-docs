:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _metric-pipeline-intro:

******************************************************
Introduction to metric pipeline management
******************************************************

.. meta::
    :description: Introduction to metric pipeline management in Splunk Observability Cloud

Metric pipeline management is an evolution on Splunk Observability Cloud metrics platform that offers you solution to centrally manage metric cardinality within the UI.

With metric pipeline management, you have more control over how you ingest and store your metrics, so you can lower costs and improve monitoring performance without updating your Splunk Distribution of OpenTelemetry Collector configurations.

What is metric cardinality?
=============================

Metric cardinality is the number of unique metric time series produced by a combination of metric name and its associated dimensions. Therefore, a metric has high cardinality when it has a high number of dimension keys, and a high number of possible unique values for those dimension keys.

How does metric pipeline management work?
========================================================

The driving mechanism behind metric pipeline management are aggregation and data dropping. For each metric you send to Observability Cloud, you can control the ingestion volume with a set of aggregation and data dropping rules.

* Aggregation rules let you roll up your selected metric data into new metric time series (MTSs) that take up less storage and increase computational performance. To learn more, see :ref:`aggregation`.
* Data dropping rules let you discard any metrics you don't want to retain for monitoring. To learn more, see :ref:`data-dropping`.

By aggregating combinations of dimensions that provide useful insights while dropping a large amount of the unaggregated raw data, you can significantly reduce your organization’s data footprint.

.. _aggregation:

Aggregation rules
----------------------

Data you send from your services to Observability Cloud can have high cardinality. Instead of adjusting how you are sending in your data at the collection point, aggregation lets you summarize your data based on dimensions you consider important.

By selecting specific dimensions to keep, you can aggregate your data points into a new metric with fewer dimensions, creating a specific view of dimensions that are important. You can then obtain a more simplified and concentrated view of your data when you don’t need to view metrics across all dimensions.

When you choose specific dimensions, metric pipeline management generates a new metric that is rolled up based on your selected dimensions. By default, aggregation rules roll up the data points into the new metric using ``sum``, ``min``, ``max``, and ``count`` functions. The new aggregated metric can be queried in the same way as any other metrics in Observability Cloud. 

How is this different from post-ingestion aggregation at query time?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When you configure charts or detectors, you can aggregate your data using analytic functions such as ``sum``, and then group your data by specific dimensions, such as ``sum by region``. This is post-ingest aggregation at query time. You need to store all your data in Observability Cloud if you want to do this, which is cost-prohibitive.

With metric pipeline management, you can aggregate your data as you are ingesting your data into Observability Cloud, and choose to retain only aggregated metrics. 


Example
++++++++


You send a metric called ``service.latency`` for a containerized workload to Splunk Infrastructure Monitoring.

Your workload has 10 endpoints, 5 services, and 10,000 containers.

Your data comes in at the container ID level, generating 10 (endpoints) * 5 (services) * 10,000 (containers) = 500,000 MTSs.

However, since you are more interested in the source region of your data rather than the source container, you create an aggregation rule that groups your data by the ``host_region`` dimension.

The aggregated metric drops all other dimension keys, such as ``container_id`` or ``host_id``, and retains only the ``host_region`` dimension key based on your configuration.

There are only 20 different host region values for ``host_region``, so only 10 (endpoints) * 5 (services) * 20 (regions) = 1,000 MTSs are ingested.

.. _data-dropping:

Data dropping rules
--------------------

When you have a new aggregated metric, you might no longer have any use case for the original unaggregated data. Data dropping rules let you discard any data you don't want to monitor, so you can save storage space and reduce cardinality.

.. caution::
    - You can only drop new incoming data. Existing data can't be dropped.
    - You can't recover dropped data. Before you drop data, see :ref:`data-dropping-impact`.
    
Prerequisite
+++++++++++++++++

You must be an admin to drop data.


Example
++++++++

As an admin, you realize the high cardinality ``system.capacity`` metric is ingested into Observability Cloud, but your team is not using the metric to monitor your system.

You can decide to drop ``system.capacity`` by creating a rule for the metric.


Use cases for metric pipeline management
==================================================



Create your first metric rules
==========================================

To start using metric pipeline management, see :ref:`use-metric-pipeline`.