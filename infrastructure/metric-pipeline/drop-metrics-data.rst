:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _drop-metrics-data:

*********************************************************************
Drop unaggregated raw data to reduce storage
*********************************************************************

.. meta::
    :description: Learn about data dropping and the impact of data dropping

When you create or update rules for your metric, you can drop unaggregated raw data to discard metric time series (MTSs) you don't want to ingest or monitor in Splunk Observability Cloud.

How data dropping works
=================================

When you drop raw data, all unaggregated raw MTSs are not ingested into Splunk Observability Cloud. Only the aggregated MTSs yielded by the metric ruleset are retained.

Example
--------------

You select the metric ``cpu.utilization``, filter the metric by the top 100 hosts on the dimension ``host_id``, and aggregate the metric by the dimension ``host_region``. You have a new aggregated metric based on your aggregation rules.

The new aggregated metric contains only the ``host_region`` dimension. If you enable data dropping, only this new aggregated metric is ingested and the original ``cpu.utilization`` MTSs for the top 100 hosts are discarded.


Impact of dropping data
=================================

Before you enable data dropping for your metric, consider the following impacts:

- You can't recover dropped data
- Detectors using the metric you drop will misfire alerts or stop alerting
- Charts using the metric you drop will stop reporting new data

Avoid empty charts and detectors when dropping data
======================================================

To prevent charts and detectors from showing no data, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Download the list of charts and detectors associated with your metric.
#. Save your new rules.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have updated associated charts and detectors.
