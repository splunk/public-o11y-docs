:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _drop-metrics-data:

*********************************************************************
Data dropping to reduce storage
*********************************************************************

.. meta::
    :description: Learn about data dropping and the impact of data dropping

When you create or update a metric ingestion ruleset, you can enable data dropping to discard metric time series (MTS) you don't want to ingest or store in Splunk Infrastructure Monitoring.

How data dropping works
=================================

Data dropping discards all MTS associated with the same metric or dimensions you select for a metric ruleset.

When you enable data dropping, all MTS matching your selected criteria based on metric name or dimensions are not ingested into Splunk Infrastructure Monitoring. Only the aggregated MTS yielded by the metric ruleset are retained.

Example
--------------

You select the metric ``cpu.utilization``, filter the metric by the top 100 hosts on the dimension ``host_id``, and aggregate the metric by the dimension ``host_region``. Your metric ruleset creates a new aggregated metric based on your filtering and aggregation rules.

The new aggregated metric contains only the ``host_region`` dimension. If you enable data dropping, only this new aggregated metric is ingested and the original ``cpu.utilization`` MTS for the top 100 hosts are discarded.


Impact of dropping data
=================================

Before you enable data dropping for your ruleset, consider the following impacts:

- You can't recover dropped data
- Detectors using the metric you drop will misfire alerts or stop alerting
- Charts using the metric you drop will stop reporting new data

Avoid empty charts and detectors when dropping data
======================================================

To prevent charts and detectors from showing no data, you can follow these steps when creating a new ruleset:

#. Disable data dropping when you configure your ruleset.
#. Download the list of charts and detectors associated with your selected metric.
#. Activate and save your new ruleset.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Enable data dropping for your ruleset once you have updated associated charts and detectors.