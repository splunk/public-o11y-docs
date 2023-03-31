
.. _metrics-usage-report:

************************************************************************
Understand your metrics usage with metrics usage report
************************************************************************


.. meta::
    :description: Learn about the metrics usage report and how to leverage it for metrics volume optimization.


To get a detailed breakdown of your metric time series (MTS) creation and usage, you can request a usage report for a specific time interval by contacting your tech support member or your account team. By default, the time interval is 30 days.

You can use the detailed metrics usage report to optimize your usage of custom metrics. 

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
   
   * - Category type
     - The category of the metric, in the format of a number. 


See the following table for more information on metric category types.

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Category type`
     - :strong:`Description`

   * - 0
     - | No information about the category type of the metric.
       | Note: Category type information for metrics is only available after 03/16/2023. Any metrics created before that date has category type ``0``. 
   
   * - 1
     - Host

   * - 2
     - Container

   * - 3
     - Custom

   * - 4
     - High resolution

   * - 6
     - Tracing metrics

   * - 7
     - Bundled

   * - 8
     - APM hosts

   * - 9
     - APM container   

   * - 11
     - APM bundled metrics  

   * - 12
     - APM Troubleshooting MetricSets

   * - 13
     - APM Monitoring MetricSets

   * - 14
     - Infrastructure Monitoring Function

   * - 15
     - APM Function

   * - 16
     - RUM Troubleshooting MetricSets

   * - 17
     - RUM Monitoring MetricSets

   * - 18
     - Network Explorer metrics

   * - 20
     - Synthetics metrics

    
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
     - | The token used to create the MTS and the number of MTS created for the metric using that token.

       * If you see a number, such as ``1336332416901451776``, instead of a token ID, the token was deleted before the report was generated.
       * If you see ``0`` instead of a token ID, the MTS were not created using a token.
       * If you see ``{}`` instead of a token ID and the MTS count, the metric is an internal metric. 

   * - Example MTS
     - Three examples of MTS for the metric containing the dimension key-value pairs of the metric.


Leverage metrics usage report to optimize your metrics volume
=======================================================================

Using the statistics in the metrics usage report, you can gain more visibility into and control over your metrics in the following ways:

* Understand the cardinality of your metrics and determine the top cardinality metrics.
* Find high cardinality metrics that aren’t frequently used in charts and dashboards. You can optimize your metrics volume by aggregating or dropping these metrics with metrics pipeline management.
* Identify dimensions that are the main drivers of high cardinality. You can drop these dimensions and ingest only the aggregated metrics with metrics pipeline management.
* Determine which teams are ingesting high cardinality metrics. You can work with those teams to optimize your metrics.

With in-depth insights into your metrics usage and creation, you can make the most use out of metrics pipeline management by aggregating or dropping metrics which are the main cost drivers.

To learn more about metrics pipeline management, see :ref:`metrics-pipeline-intro`.
