.. _metric-types:

*****************************************************************
Metric types
*****************************************************************

.. meta::
  :description: Learn about three metric types in Splunk Observability Cloud: gauges, cumulative counters, and counters.

In Splunk Observability Cloud, there are three types of metrics. For example, ``cpu.utilization`` is a gauge metric, ``api.calls`` is a cumulative counter metric, and ``dropped.packets`` is a counter metric.

.. image:: /_images/images-metrics/metrics-diagram.png
  :width: 60%
  :alt: This diagram shows examples of metrics.

The type of the metric determines which default :strong:`rollup` function Observability Cloud applies to summarize individual incoming data points to match a specified data resolution. A rollup is a statistical function that takes all the data points in a metric time series (MTS) over a time period and outputs a single data point. Observability Cloud applies rollups after it retrieves the data points from storage but before it applies analytics functions. To learn more about rollups and data resolution, see :ref:`Rollups <rollups>` in Data resolution and rollups in charts.

These are the types of metrics and their default rollouts in Splunk Observability Cloud:

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 30, 50, 20

  * - :strong:`Metric`
    - :strong:`Description`
    - :strong:`Rollup`
  * - :ref:`Gauge metrics <gauges>`
    - Represent data that has a specific value at each point in time. Gauge metrics can increase or decrease.
    - Average
  * - :ref:`Counter metrics <counters>`
    - Represent a count of occurrences in a time interval. Counter metrics can only increase during the time interval.
    - Sum
  * - :ref:`Cumulative counter metrics <cumulative-counters>` 
    - Represent a running count of occurrences, and measure the change in the value of the metric from the previous data point.
    - Delta 

For example, Observability Cloud applies the SignalFlow ``average()`` function to data points for gauge metrics. When you specify a 10-second resolution for a line graph plot, and Observability Cloud is receiving data for the metric every second, each point in the line represents the average of 10 data points. 

.. _gauges:

Gauges
============================================================================

Fan speed, CPU utilization, memory usage, and time spent processing a request are examples of :term:`gauge metric` data.

Observability Cloud applies the SignalFlow ``average()`` function to data points for gauge metrics.
When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data for the metric every second, each point on the line represents the average of 10 data points.

.. _counters:

Counters
=============================================================================

Number of requests handled, emails sent, and errors encountered are examples of :term:`counter metric` data. The machine or app that generates the counter increments its value every time something happens and resets the value at the end of each reporting interval.

Observability Cloud applies the SignalFlow ``sum()`` function to data points for counter metrics. When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data for the metric every second, each point on the line represents the sum of 10 data points.

.. _cumulative-counters:

Cumulative counters
=============================================================================

Number of successful jobs, number of logged-in users, and number of warnings are examples of :term:`cumulative counter metric` data. Cumulative counter metrics differ from counter metrics in the following ways:

* Cumulative counters only reset to 0 when the monitored machine or application restarts or when the counter   value reaches the maximum value representable (2 :superscript:`32` or 2 :superscript:`64` ).
* In most cases, you're interested in how much the metric value changed between measurements.

Observability Cloud applies the SignalFlow ``delta()`` function to data points for cumulative counter metrics. When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data for the metric every second, each point on the line represents the change between the first data point received and
the 10th data point received. As a result, you don't have to create custom SignalFlow to apply the ``delta()`` function, and the plot line represents variations.