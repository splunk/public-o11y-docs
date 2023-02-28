
.. _metrics-usage-report:

************************************************************************
Understand your metrics usage with metrics usage analytics report
************************************************************************


To get a detailed breakdown of your metric time series (MTS) creation and usage, you can request a usage report by contacting your tech support member or your account team.

You can use the detailed metrics usage analytics report to optimize your usage of custom metrics. 

    * If you are an MTS-based customer, all your metrics are considered custom metrics. By using the report to find and clean high cardinality metrics, you can better control your costs and query performance.
    * If you are a host-based customer with high utilization of custom metrics, you can use the report to lower your custom metrics usage.

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
       | :strong:`Notes:` The category identifier is only available for metrics created after <date>. 


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
     - Number of unique views of charts during the interval for the metric. For example, if a metric appears in 3 different charts and you view each chart 2 times, the number of unique views is 6.


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

