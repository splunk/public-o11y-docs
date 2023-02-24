
.. _metrics-usage-report:

************************************************************************
Understand your metrics usage with metrics usage analytics report
************************************************************************


To get a detailed breakdown of your metric time series (MTS) creation and usage, you can request a short-term usage report by contacting your tech support member or your account team.

You can use the detailed metrics usage analytics report to optimize your usage of custom metrics. 

    * If you are an MTS-based customer, all your metrics are considered custom metrics, so you might find the report highly valuable.
    * If you are a host-based customers with high utilization of custom metrics, you can use the report to lower your custom metrics usage.

Statistics in the report
==============================

For each metric in the report, you can see the following usage and MTS creation statistics.


Usage statistics
--------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Detectors
     - Number of unique detectors running during the interval for the metric.

   * - Charts
     - Number of unique charts viewed in dashboards during the interval for the metric.


MTS creation statistics
--------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - MTS count
     - The number of MTS created for the metric during the interval.

   * - Common dimensions
     - A list of common dimension name combinations for the MTS created along with a number of MTS created with that combination.

   * - Dimension cardinality
     - The approximate cardinality of each dimension for the MTS created for the metric. Error rate is less than 2% when the cardinality is high.

   * - MTS per token
     - The tokens used to create the MTS, and the number of MTS created for the metric using that token. Only the token ID is shown if the token has been deleted.

   * - Example MTS
     - Three examples of MTS for the metric containing the dimensions of the MTS. The example MTS for each metric are picked from the interval in descending order of creation time.


Notes on the metrics usage analytics report
================================================

* By default, the report covers an interval of 30 days. You can also request to generate a report with a shorter interval.
* You can request two reports per calendar month.
* The report covers the top 1,000 metrics based on MTS count, since the most significant difference in metrics usage comes from aggregating or dropping metrics with the highest number of MTS.

