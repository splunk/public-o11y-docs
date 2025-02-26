.. _aws-ts-polling:

******************************************************
Troubleshoot AWS Cloudwatch polling
******************************************************

.. meta::
  :description: Troubleshoot AWS Cloudwatch polling related issues.

See the following topics when experiencing AWS Cloudwatch polling related issues.

.. note:: See also :ref:`aws-troubleshooting`.

Calculate metric polling delay 
==========================================================================================================

Splunk Observability Cloud's CloudWatch data point sync consists of two phases:

1. ``list-metrics/`` time series sync

  * It syncs all time series active within the last 3 hours and stores time series info in Splunk Observability Cloud's internal storage. 

  * This sync runs every 15 minutes for each AWS integration. This interval is not configurable.

2. ``get-metric-data/`` data points sync

  * It syncs all data points for all time series saved in Splunk Observability Cloud's internal storage.

  * This sync runs every 1-to-10 minutes depending on the AWS integration settings. You can configure this interval.

  .. caution:: If Splunk Observability Cloud doesn't retrieve any data points from a specific time series for 5 hours, the TS is considered inactive and is removed from Splunk Observability Cloud's internal storage.

Example of delay calculation
----------------------------------------------------------------------

For an AWS integration with a 3-minute poll rate expect the following delays:

* For sparse or new metrics: 15 minutes (TS sync) + 3 minutes (data point sync) + 2-3 minutes (average CloudWatch delay) -> :strong:`Total delay = 20-21 minutes`. 

* For data points from known time series (no TS sync required): 3 minutes (data point sync) + 2-3 minutes (average CloudWatch delay) -> :strong:`Total delay = 5-6 minutes`. 

Penalty for sparse metrics
==========================================================================================================

To minimize the number of requests for certain sparse metrics and reduce CloudWatch API costs, Splunk Observability Cloud ignores a metric for 30 minutes if these two conditons are met:

* The ``get-metric-data`` response does not contain any data points for a given metric.

* Splunk Observability Cloud tried to retrieve data points for that specific metric using a lookback window of a maximum of 1 hour. 

  * The lookback window is computed as the highest value between the last known data point timestamp, or the request time minus 1 hour.

Example of sparse metrics lag
----------------------------------------------------------------------

Let's consider the last two data points mentioned above:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 40 20 40

  * - :strong:`Data point timestamp`
    - :strong:`Lag`
    - :strong:`Ingest timestamp`

  * - 04:39
    - 5 minutes
    - 04:44

  * - 05:42
    - 37 minutes
    - 06:19  

The following is happening:

* At 04:44 Splunk Observability Cloud retrieves the 04:39 data point.

* At 04:47, after a 3-minute poll rate, Splunk Observability Cloud does not get any new data points for this metric.

* At 05:46 Splunk Observability Cloud uses the maximum lookback window. Since there are still no new data points for this metric due to CloudWatch's internal delay, the metrics is going to be ignored for 30 minutes.

* By 06:16 the metric is still ignored.

* At 06:19 the penalty is lifted and Splunk Observability Cloud retrieves the 05:42 data point.

.. note:: By design sync start times might drift slightly and might not be aligned to 3-minute intervals.
