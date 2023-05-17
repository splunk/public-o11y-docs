
.. _data-dropping-impact:

*********************************************************************
Data dropping impacts
*********************************************************************

.. meta::
    :description: Learn about the impact of data dropping in metrics pipeline management.


|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|


When you create or update rules for your metric, you can drop unaggregated raw data to discard metric time series (MTS) you don't want to ingest or monitor in Splunk Observability Cloud. You can also drop a metric without adding an aggregation rule. To learn more, see :ref:`data-dropping`.

.. note:: You must be an admin to drop data.

Impacts of dropping data
=================================

Before you decide to drop unaggregated raw data for your metric, consider the following impacts:

- You can drop new incoming data, but you can't drop existing data.
- You can't recover dropped data.
- Detectors using the metric you drop stop working. Alerts don't fire correctly or stop firing entirely.
- Charts using the metric you drop no longer display new data.
- If you drop data for metrics associated with built-in charts and AutoDetect detectors, these charts and detectors no longer display any data, or they don't function correctly. Avoid dropping data for metrics used in built-in charts and AutoDetect detectors. For a list of AutoDetect detectors, see :ref:`autodetect-list`.

Avoid empty charts and detectors when dropping data
======================================================

To prevent charts and detectors from showing no data, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Download the list of charts and detectors associated with your metric.
#. Save your new rules.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have updated associated charts and detectors.
