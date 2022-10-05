:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst

.. _data-dropping-impact:

*********************************************************************
Data dropping impact
*********************************************************************

.. meta::
    :description: Learn about the impact of data dropping

When you create or update rules for your metric, you can drop unaggregated raw data to discard metric time series (MTSs) you don't want to ingest or monitor in Splunk Observability Cloud. To learn more, see :ref:`data-dropping`.

.. note:: You need to be an admin to drop data.

Impact of dropping data
=================================

Before you decide to drop unaggregated raw data for your metric, consider the following impacts:

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
