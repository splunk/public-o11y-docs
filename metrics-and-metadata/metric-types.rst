.. _metric-types:

*****************************************************************
Identify metric types
*****************************************************************

.. meta::
   :description: Splunk Observability Cloud uses the type of a metric to determine how to roll up individual data points for the resolution you specify. Observability Cloud has three metric types: gauges, cumulative counters, and counters. Gauge metrics measure data has a specific, changing value at each point in time. Counters provide a count of occurrences in a time interval; the counter resets to 0 after it's reported. Cumulative counters provide a running count of occurrences, and they don't reset until the system restarts or their value overflows.

In Splunk Observability Cloud, there are three types of metrics: gauge metrics, counter metrics, and cumulative counter metrics. The type of the metric determines how Splunk Observability Cloud summarizes individual incoming data points to
match a specified data resolution.

Splunk Observability Cloud summarizes incoming data points by applying the default rollup function for the metrics.
For example, Observability Cloud applies the SignalFlow ``average()`` function to data points for gauge metrics.
When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data for the metric
every second, each point in the line represents the average of 10 data points. To learn more about rollups and data resolution, see the :new-page:`Resolution and Data Retention <https://quickdraw.splunk.com/redirect/?product=Observability&location=productdocs.concepts.metricsmetadata.metrictypes&version=current>` topic.


Types of metrics in Splunk Observability Cloud:

* :ref:`Gauge metrics <gauges>` represent data that has a specific value at each point in time. Gauge metrics can increase or decrease.
* :ref:`Counter metrics <counters>` represent a count of occurrences in a time interval. Counter metrics can only increase during the time interval.
* :ref:`Cumulative counter metrics <cumulative-counters>` represent a running count of occurrences.


.. _gauges:

Gauges
============================================================================

Fan speed, CPU utilization, memory usage, and time spent processing a request are
examples of :term:`gauge metric` data.

Observability Cloud applies the SignalFlow ``average()`` function to data points for gauge metrics.
When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data for the metric
every second, each point on the line represents the average of 10 data points.


.. _counters:

Counters
=============================================================================

Number of requests handled, emails sent, and errors encountered are examples of
:term:`counter metric` data. The machine or app that generates the counter increments its value
every time something happens and resets the value at the end of each reporting interval.

Observability Cloud applies the SignalFlow ``sum()`` function to data points for counter metrics.
When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data
for the metric every second, each point on the line represents the sum of 10 data points.

.. _cumulative-counters:

Cumulative counters
=============================================================================

Number of successful jobs, number of logged-in users, and number of warnings are examples of
:term:`cumulative counter metric` data. Cumulative counter metrics differ from counter metrics in
the following ways:

* Cumulative counters only reset to 0 when the monitored machine or application restarts or when the counter
  value reaches the maximum value representable (2 :superscript:`32` or 2 :superscript:`64` ).
* In most cases, you're interested in how much the metric value changed between measurements.

Observability Cloud applies the SignalFlow ``delta()`` function to data points for cumulative counter metrics.
When you specify a ten second resolution for a line graph plot, and Observability Cloud is receiving data
for the metric every second, each point on the line represents the change between the first data point received and
the 10th data point received. As a result, you don't have to create custom SignalFlow to apply the ``delta()`` function,
and the plot line represents variations.