
.. _metrics-usage-report-arm:

************************************************************************
Understand your metrics usage with metrics usage report
************************************************************************

.. meta::
    :description: Learn about the metrics usage report and how to leverage it for metrics volume optimization.

To get a detailed breakdown of your metric time series (MTS) creation and usage, you can request a usage report for a
specific time interval by contacting your tech support member or your account team. By default, the time interval is 30 days.

You can use the detailed metrics usage report to optimize your usage of custom metrics. 

* If you are on a usage-based pricing plan, Observability Cloud classifies all your metrics as custom metrics. By using the report to
  find and clean high cardinality metrics, you can better control your costs and query performance.
* If you are on a host-based pricing plan with high utilization of custom metrics, you can use the report to lower
  your custom metrics usage.

.. _report-format-arm:

Format of the report
==============================

.. _report-columns-arm:

Report columns
--------------------------------------------------------------------------------

For each metric in the report, you see the following columns:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Metric name
     - The name of the metric
   
   * - Category type 
     - The category of the metric, in the format of a number. It only applies to host-based subscription plans. In data points per
       minute (DPM) subscription plans, the system counts all metrics ase considered custom metrics.

   * - 10
     - APM identity

   * - 11
     - APM bundled metrics

   * - 12
     - APM Troubleshooting MetricSets

   * - 13
     - APM Monitoring MetricSets

   * - 14
     - Infrastructure Monitoring function

   * - 15
     - APM function

   * - 16
     - RUM Troubleshooting MetricSets

   * - 17
     - RUM Monitoring MetricSets

   * - 18
     - Network Explorer metrics

   * - 19
     - Runtime metrics

   * - 20
     - Synthetics metrics

.. _usage-statistics-arm:

Usage statistics
--------------------------------------------------------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Detectors
     - Number of unique detectors that use the MTS during the interval. The count also includes detectors created before the interval.

   * - Charts
     - Number of unique charts viewed by users that display the MTS, for the displayed interval. Users viewing the same chart multiple times counts only once in the total charts count.

.. _mts-creation-statistics-arm:

MTS creation statistics
--------------------------------------------------------------------------------

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

       * If you see a number, such as ``1336332416901451776``, instead of a token ID, a user deleted the token before
         Observability Cloud generated the report.
       * If you see ``0`` instead of a token ID, the MTS were not created using a token.
       * If you see ``{}`` instead of a token ID and the MTS count, the metric is an internal metric. 

   * - Example MTS
     - Three examples of MTS for the metric containing the dimension key-value pairs of the metric.

.. _leverage-metrics-report-arm:

Leverage metrics usage report to optimize your metrics volume
=======================================================================

Use the statistics in the metrics usage report to understand and control your metrics in the following ways:

* Determine the highest-cardinality MTS.
* Find high-cardinality MTS that you don't often use in charts and dashboards. Drop these MTS using data routing.
* In the MTS that you use, identify the highest-cardinality dimensions. Use MTS aggregation to drop these dimensions, then use data routing to drop the raw incoming MTS. You now
  have aggregated MTS with lower-cardinality dimensions.
* Determine the teams that are ingesting high-cardinality metrics. Work with those teams to optimize dimensions.

With an in-depth insight into your MTS usage, you can use metrics pipeline management to aggregate or drop MTS that are the main reason for high storage costs and performance issues.

To learn more about metrics pipeline management, see :ref:`metrics-pipeline-intro-arm`.
