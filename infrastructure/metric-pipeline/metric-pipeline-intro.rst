:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _metric-pipeline-intro:

******************************************************
Introduction to metrics pipeline management
******************************************************

.. meta::
    :description: Introduction to metrics pipeline management in Splunk Infrastructure Monitoring

Metrics pipeline management is an evolution on Splunk Observability Cloud metrics platform that offers you greater storage flexibility and processing options with enhanced data filtering and aggregation. 

With metrics pipeline management, you have more control over how you ingest and store your metrics, so you can lower costs and improve monitoring performance without making any changes to your instrumentation.

How does metrics pipeline management work?
========================================================

The driving mechanism behind metrics pipeline management are aggregation and data dropping. For each metric you send to Observability Cloud, you can control the ingestion volume with a set of aggregation and data dropping rules.

* Aggregation lets you roll up your selected metric data into new metric time series (MTS) that take up less storage and increase computational performance. To learn more, see :ref:`aggregation`.
* Data dropping lets you discard any data you don't want to keep after aggregation rules are applied. To learn more, see :ref:`data-dropping`.


.. _aggregation:

Aggregation
----------------------

When you send data from your services to Observability Cloud, your data can have high cardinality due to high numbers of dimensions and possible values. Instead of adjusting how you are sending in your data, aggregation lets you summarize your data based on selected dimensions. 

By selecting specific dimensions to retain, you can aggregate your data points into a new MTS with fewer dimensions, creating a specific view of dimensions that are important. You can then obtain a more simplified and concentrated view of your data when you don't need to view metrics across all dimensions.

Example
++++++++

You send a metric called ``service.latency`` for a containerized workload to Splunk Infrastructure Monitoring.
Before you apply any aggregation rule, your data comes in at the container ID level, generating 100 MTS for 100 containers.

However, since you are more interested in the source region of your data, you create an aggregation rule that groups your data by the ``host_region`` dimension key. The aggregated metric drops all other dimension keys, such as ``container_id`` or ``host_id``, and retains only the ``host_region`` dimension key based on your configuration. There are only 20 different host region values for your data, so only 20 MTS are ingested.


.. _data-dropping:

Data dropping
--------------------

When you have a new aggregated metric, you might no longer have any use case for the original unaggregated data. Data dropping lets you discard any data you don't need to keep, so you can save storage space and reduce cardinality.


Example
++++++++


Use cases for metrics pipeline management
==================================================



Create your first metric ruleset
==========================================

To start using metrics pipeline management, see :ref:`use-metric-pipeline`.