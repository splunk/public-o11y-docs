:orphan:

.. include:: /_includes/metrics-pipeline/metrics-pipeline-preview-header.rst

.. _data-dropping-impact:

*********************************************************************
Data dropping impacts
*********************************************************************

.. meta::
    :description: Learn about the impact of data dropping

When you create or update rules for your metric, you can drop unaggregated raw data to discard metric time series (MTSs) you don't want to ingest or monitor in Splunk Observability Cloud. To learn more, see :ref:`data-dropping`.

.. note:: You must be an admin to drop data.

Impacts of dropping data
=================================

Before you decide to drop unaggregated raw data for your metric, consider the following impacts:

- You can only drop new incoming data. Existing data can't be dropped.
- You can't recover dropped data.
- Detectors using the metric you drop will misfire alerts or stop alerting.
- Charts using the metric you drop will stop reporting new data.
- If you drop data for metrics associated with built-in charts and AutoDetect detectors, these charts and detectors will be empty and not function correctly. Avoid dropping data for metrics use in built-in charts and AutoDetect detectors.

Avoid empty charts and detectors when dropping data
======================================================

To prevent charts and detectors from showing no data, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Download the list of charts and detectors associated with your metric.
#. Save your new rules.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have updated associated charts and detectors.
