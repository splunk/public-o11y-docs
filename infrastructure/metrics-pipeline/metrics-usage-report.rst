
.. _metrics-usage-report:

************************************************************************
Understand your metrics usage with metrics usage analytics report
************************************************************************


To get a detailed breakdown of your metric time series (MTS) creation and usage, you can request a usage report for a specific time interval by contacting your tech support member or your account team. By default, the time interval is 30 days.

You can use the detailed metrics usage analytics report to optimize your usage of custom metrics. 

    * If you are on a usage-based pricing plan, all your metrics are considered custom metrics. By using the report to find and clean high cardinality metrics, you can better control your costs and query performance.
    * If you are on a host-based pricing plan with high utilization of custom metrics, you can use the report to lower your custom metrics usage.

Format of the report
==============================

For each metric in the report, you can see the following columns.

Metric identifiers 
--------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Metric name
     - The name of the metric

   * - Category
     - | The category of the metric. For example, ``custom``.
       | :strong:`Notes:` The category identifier is available only for metrics created after March 9, 2023. 


Usage statistics
--------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Detectors
     - Number of unique detectors running during the interval for the metric. Detectors created before the interval are also counted.

   * - Charts
     - Number of unique charts containing the metric that are viewed in dashboards during the interval. If the same chart is viewed multiple times, it is counted only once towards the total charts count.


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
     - Three examples of MTS for the metric containing the dimension key-value pairs of the metric.
