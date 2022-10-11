:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _metric-pipeline-intro:

******************************************************
Introduction to metric pipeline management
******************************************************

.. meta::
    :description: Introduction to metric pipeline management in Splunk Observability Cloud

Metric pipeline management is an evolution of Splunk Observability Cloud metrics platform that offers you solutions to centrally manage metric cardinality within the UI.

With metric pipeline management, you have more control over how you ingest and store your metrics, so you can lower costs and improve monitoring performance without updating your Splunk Distribution of OpenTelemetry Collector configurations.

What is metric cardinality?
=============================

Metric cardinality is the number of unique metric time series produced by a combination of metric name and its associated dimensions. Therefore, a metric has high cardinality when it has a high number of dimension keys, and a high number of possible unique values for those dimension keys.

How does metric pipeline management work?
========================================================

The driving mechanism behind metric pipeline management are aggregation and data dropping. For each metric you send to Observability Cloud, you can control the metric volume with a set of aggregation and data dropping rules.

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

Your workload has 10 endpoints, 20 regions, 5 services, and 10,000 containers.

Your data is coming in at the container ID level, generating 10 (endpoints) * 5 (services) * 20 (regions) * 10,000 (containers) = 1,000,000 MTSs.

You can reduce your metric cardinality by aggregating one or multiple dimensions.

Aggregate using one dimension
**********************************

You are only interested in the source region of your data, so you create an aggregation rule that groups your data by the ``region`` dimension.

The aggregated metric drops all other dimensions and retains only the ``region`` dimension based on your rule. There are only 20 different values for ``region``, so only 20 MTSs are ingested.

Aggregate using multiple dimensions
****************************************

You want to continue monitoring endpoints, regions, and services for your data, but don't need to monitor container IDs. You create aggregation rules that group your data by the dimensions you want to keep.

The aggregated metric drops the ``container_id`` dimension and retains ``endpoint``, ``region``, and ``service`` based on your rules. Your new metric volume is: 10 (endpoints) * 20 (regions) * 5 (services) = 1,000 MTSs.

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

Once you have new aggregated metrics created by aggregation rules, you can drop the raw unaggregated data for ``service.latency``. 

Use case for metric pipeline management
==================================================

See the following use case for metric pipeline management:

* :ref:`aggregate-drop-use-case`

Create your first metric rules
==========================================

To start using metric pipeline management, see :ref:`use-metric-pipeline`.