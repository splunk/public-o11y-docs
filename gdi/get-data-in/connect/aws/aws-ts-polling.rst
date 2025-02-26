.. _aws-ts-polling:

******************************************************
Troubleshoot AWS Cloudwatch polling
******************************************************

.. meta::
  :description: Troubleshoot AWS Cloudwatch polling related issues.

See the following topics when experiencing AWS Cloudwatch polling related issues.

.. note:: See also :ref:`aws-troubleshooting`.

Troubleshoot metric delay 
==========================================================================================================










Splunk Observability Cloud's CloudWatch data points sync consists of two phases:
list-metrics/ time series (TS) sync
Sync all time series active within the last 3h and store TS info in our internal storage. 
This sync runs every 15m for each AWS integration (this 15m interval is not configurable by a customer).
get-metric-data/ data points sync
Sync data points for all time series we have in our internal storage. 
Runs every 1-10m depending on the AWS integration settings (customer configurable).

When we do not get any data points within the last 5h for a given TS we assume such TS is no longer active and we remove it from our internal storage.
For example for AWS integration with 3m poll rate we can expect the following delays:
So in case of sparse (or new) metrics::
15m (TS sync) + 3m (data points sync) + 2-3m (typical CloudWatch delay) == 20-21m (total)
In case of data points for already known time series:
3m (data points sync) + 2-3m (typical CloudWatch delay) == 5-6m (total)




Penalty for sparse metrics
==========================================================================================================

Splunk Observability Cloud has one more mechanism that may impact sparse metrics lag.
When the following two conditions are met…
get-metric-data response does not contain any data points for a given metric
and we tried to retrieve data points for such a metric using max lookback window (1h)
…the metric is ignored for 30 minutes.
This is to minimize a number of requests for such a metric and to reduce the CloudWatch API cost incurred to a customer.
Let’s consider the last two data points mentioned above:
data point            ingest 
timestamp    lag      timestamp 

    04:39     5m      04:44
    05:42    37m      06:19   
At 04:44 Splunk Observability Cloud retrieves the 04:39 data point
At 04:47 (3m poll rate) Splunk Observability Cloud does not get any new data points for this metric
At 04:50 still no new data points
…
At 05:46 the max lookback window is used
lookback window is computed as max(last known data point timestamp, request time - 1h)
as there are still no new data points for this metric (due to CW internal delay) it is going to be ignored for 30m
At 06:16 the metric is still ignored
At 06:19 the penalty is lifted and we retrieve the 05:42 data point

.. note:: By design sync start times may drift slightly and that’s why some start times may not be aligned to 3m intervals.
