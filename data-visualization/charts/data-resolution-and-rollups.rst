.. _data-resolution-rollups-charts:

********************************************************************************
Data resolution and rollups in charts
********************************************************************************

.. meta::
   :description: In charts, resolution is the interval at which data points appear on a chart, and a rollup is a statistical function that takes all the data points received in a time period and plots a single data point.

Splunk Observability Cloud has two types of resolution:

* Chart resolution: Interval at which data points appear on a chart
* Data collection intervals: Interval at which a server or application sends data points to Observability Cloud. This interval is the native resolution of the data. To learn more about native resolution, see :ref:`get-started-retention`.

.. _chart-resolution:

Chart data resolution
============================================================================

When it renders charts, Observability Cloud defaults to a display resolution based on the time range of the chart.
In general, shorter time ranges have a fine resolution, and the chart resolution is more likely to be the same as the native resolution.
Conversely, longer time ranges have a coarse resolution, and the chart resolution is more likely to differ from the native resolution.
For longer time range charts, Observability Cloud ensures that the displayed points accurately reflect the actual data points
by using :ref:`rollups<rollups>`.

The chart resolution of a chart appears next to the title of the chart in the Chart Builder or on the dashboard that contains
the chart. To increase or decrease the chart resolution of a chart, use the chart resolution selector at the top of the chart or dashboard.
To learn more, see :ref:`dashboard-resolution`.

Plots with different resolutions
-------------------------------------------------------------------

A chart can contain multiple plots, each of which represents a different metric time series (MTS).
Each MTS can have its own resolution. Observability Cloud chooses one resolution per chart,
and for multiple plots the chart uses the coarsest resolution. Using this resolution lines up data points to facilitate plots and computations.

For example, metrics from AWS CloudWatch typically have a one-minute or five-minute resolution, while metrics reported using the Splunk Distribution of OpenTelemetry Collector (or the SignalFx Smart Agent, now deprecated) typically have a 10-second resolution. If a single chart has one plot that contains AWS Cloudwatch metrics (five-minute resolution) and another plot that contains Collector or Smart Agent metrics, the chart resolution is always five minutes or more.

Minimum chart resolution
-------------------------------------------------------------------

On the Chart Options tab, you can select a minimum resolution for a chart. The following
list shows you the options and, in parentheses, the appearance of the option in the UI:

* Auto
* One second (1s)
* Five seconds (5s)
* Ten seconds (10s)
* Thirty seconds (30s)
* One minute (1m)
* One hour (1h).

The value you select specifies the minimum interval that Observability Cloud uses to roll up data point values
that appear in the chart.

* To learn more about chart rollups, see :ref:`rollups`.
* To learn more about minimum intervals, see :ref:`min-resolution`.

Chart resolution and data retention
----------------------------------------------------------------------------------

The resolution of a metric time series in a chart is affected by amount of time that the time series has existed.
This time, or age, controls the data retention policy for the time series. To learn more, see :ref:`get-started-retention`.

.. _rollups:

Rollups
============================================================================

A :term:`rollup` is a statistical function that takes all the data points for an MTS over a time period and outputs
a single data point. Observability Cloud applies rollups after it retrieves the data
points from storage but before it applies analytics functions.

In a chart, the rolled up data points for an MTS appear with a chart resolution that's coarser that the native
resolution of the MTS. The coarse resolution helps Observability Cloud create a reasonable display of the data.

For example, suppose you create a chart with a one week time range. In the chart you plot an MTS that has
a native resolution of 30 seconds. If Observability Cloud doesn't apply a rollup to the MTS, the plot contains
20,160 data points; two per minute, 120 per hour, 2,880 per day, 20,160 per week. This number is ten times the number of
pixels available for a typical thirty-inch monitor.

To reduce the plot to a displayable size, Observability Cloud applies a rollup to the MTS. Each data point that appears in the chart
is now a summary of actual data points in the MTS.

Observability Cloud doesn't always apply a rollup. If you create a chart with a time range of fifteen minutes
for the same MTS, the plot only contains thirty data points. Observability Cloud automatically determines that
it doesn't need to roll up the MTS, and the resolution of the chart is the same as the native resolution of the
data points in the MTS.

For a plot in a chart, Observability Cloud rolls up data when it determines that the time window for the chart
requires it to display too many data points to fit on the screen.

Observability Cloud also rolls up data for long-term storage. To learn more, see :ref:`retention`.

.. _rollup-types:

Rollup types
--------------------------------------------------------------------------------

Observability Cloud has different rollup types:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Type`
     - :strong:`Effect`

   * -
       * Average
       * Latest
       * Min
       * Max
       * Sum

     - Summarize data points into a single data point. The summary data point
       has a chart resolution that is coarser than the native resolution for original data points.

       For example, if the incoming data points have a native resolution of ten seconds, and the
       chart has a one day resolution, Observability Cloud rolls up the data to a one day resolution.

       If the chart resolution is the same as the native resolution of the incoming data,
       these rollups don’t have any effect.

   * - Count per second (rate)
     - Converts data points that represent a count of events or occurrences in
       the last time period to a count per second.
       This rollup helps you compare counter metrics for different time periods.
       For example, if you have two metric time series, where one contains counts over
       the last ten seconds and another contains counts over the last five seconds, using the rate
       rollup helps you compare the two MTS.

   * - Delta
     - Calculates change in values for a cumulative counter. Delta returns a data point that's
       the difference between the incoming data in the current interval and the data in the
       previous interval.

       The Delta rollup helps you see trends in cumulative counter metrics.
       A line plot of a cumulative count MTS always has a non-negative slope. A line plot of
       the delta rollup for the MTS shows negative slopes where the cumulative count is growing more slowly.

   * - Lag and Count
     -
       * These rollup types show metadata for an MTS.
       * Lag measures the average delay in data point transmission, in milliseconds.
       * Count measures the total number of data points received.

When you're building a chart, you can accept the default rollup type or
choose a different rollup type to control the chart appearance when it displays
coarser-resolution data over a longer time window.

To change the rollup being used in a chart, see :ref:`plot-config-panel`.

Observability Cloud has the following rollup functions:

* :strong:`Sum`: (default for :ref:`counter <metric-types>` metrics): Returns the sum of all data points in the MTS reporting interval
* :strong:`Average` (default for :ref:`gauge<gauges>` metrics): Returns the average value of all data points in the MTS reporting interval
* :strong:`Min`: Returns the minimum data point value seen in the MTS reporting interval
* :strong:`Count`: Returns the number of data points in the MTS reporting interval
* :strong:`Max`: Returns the maximum value seen in the MTS reporting interval
* :strong:`Latest`: Returns the value of the last data point received in the MTS reporting interval
* :strong:`Lag`: Returns the average time in milliseconds each data point's timestamp and the time that Observability Cloud receives it.
* :strong:`Rate`:

  * :strong:`Rate/sec`: For :ref:`counter <counters>` metrics, rate is the data point value normalized to one second.
    For example, if the MTS reporting interval is one millisecond, the rate is data point value multiplied by 1000.
  * :strong:`Delta`: For :ref:`cumulative counter <cumulative-counters>` metrics, the rate is the difference between
    the data point for the current time interval and the data point for the previous time interval. The Delta rollup
    is always non-negative; if the value of a cumulative counter data point is smaller than the previous value, the
    delta is the new value, not the negative difference.

.. _interpret-chart-rollups:

Interpret the effect of rollups on chart plots
============================================================================

When you interpret the data in a chart, consider following elements:

*  The chart's resolution. See :ref:`chart-resolution`
*  The rollup setting
*  Whether Observability Cloud has applied the rollup to the data
*  Whether you've applied any other analytics functions to the data

.. _chart-rollup-interpretation:

Example: rollups without analytics
--------------------------------------------------------------------------------

The following table provides examples of interpreting data in a chart.
The Interpretation column describes the original meaning of the metric, its rollup setting, and its chart resolution.


.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   *  -  :strong:`Metric`
      -  :strong:`Rollup`
      -  :strong:`Chart Resolution`
      -  :strong:`Interpretation`


   *  -  ``cpu.utilization``
      -  Average
      -  10s
      -  The average CPU utilization observed during a ten second interval for each MTS

   *  -  ``if_octets.rx``
      -  Rate/sec
      -  1h
      -  The average rate of bits transmitted per second during a one hour interval

   *  -  ``if_errors.tx``
      -  Delta
      -  2m
      -  The number of transmission errors during a two minute interval

.. _chart-rollup-analytics-interpretation:

Example: rollups with analytics
----------------------------------------------------------------------------------

Rollups and SignalFlow analytics functions are similar, but they have different purposes and affect charts differently.
When you apply analytics functions to a chart, you change the meaning of the data in the chart.
Rollup functions are always applied to the data first and affect the data before
Observability Cloud applies the analytics functions.

.. note:: The "Average" rollup type and the "Mean" analytics function both calculate an average; they simply have different names.

When you interpret a chart that has both rollups and analytics functions:

#. Consider the inherent meaning of the data points
#. Consider the effect of the rollup and resolution in effect
#. Consider the effect of the analytics functions; analytics aggregation functions apply across every MTS in the chart,
   while rollups are applied to each MTS. For example:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 10 60

   *  -  :strong:`Metric`
      -  :strong:`Rollup`
      -  :strong:`Analytics function (aggregation)`
      -  :strong:`Chart Resolution`
      -  :strong:`Interpretation`


   *  -  ``cpu.utilization``
      -  Average
      -  none
      -  1m
      -  The average CPU utilization observed per minute for each host.
         If there are fifty hosts, the chart contains fifty MTS and displays fifty separate plots.
         Each data point in each plot represents the average of the ``cpu.utilization``
         values for the MTS for the previous one minute.

   *  -  ``cpu.utilization``
      -  Average
      -  Mean
      -  1m
      -  The average CPU utilization observed per minute across all hosts.
         The Average rollup and the Mean analytics function combine as an average of averages.
         The chart contains one plot, and each data point represents the average of all the MTS
         observed for the previous one minute.

   *  -  ``cpu.utilization``
      -  Average
      -  Max
      -  1m
      -  The maximum CPU utilization observed per minute across all hosts.
         The average rollup and the maximum analytics function combine as a maximum of averages.
         The chart contains one plot, and each data point represents the maximum of all the
         averages of the MTS observed for the previous one minute. Compare this plot
         interpretation with the one for max rollup and max analytics aggregation,
         as shown in the following row.

   *  -  ``cpu.utilization``
      -  Max
      -  Max
      -  1m
      -  The maximum CPU utilization values observed per minute across all hosts.
         The maximum rollup and the maximum analytics function combine as a maximum of maximums.
         The chart contains one plot, and each data point represents the maximum of all the
         maximums of the MTS observed for the previous one minute.

To learn more about the difference between aggregation and transformation functions,
see :ref:`aggregations-transformations`.

.. _chart-rollup-resolution-interpretation:

Example: rollups and resolutions
=============================================================================

The following table contains some examples of the plots that appear when you use
combinations of rollups and resolutions, and Observability Cloud applies the rollup.

.. list-table::
   :header-rows: 1
   :widths: 10 10 10 10 50

   *  -  :strong:`Metric`
      -  :strong:`Type`
      -  :strong:`Rollup`
      -  :strong:`Resolution`
      -  :strong:`Interpretation`

   *  -  ``cpu.utilization``
      -  Gauge
      -  Average
      -  10s
      -  The average percent CPU used over ten seconds

   *  -  ``if_octets.tx``
      -  Cumulative counter
      -  Delta
      -  1m
      -  The average rate of transmitted bits per second over one minute

   *  -  ``if_errors.tx``
      -  Cumulative counter
      -  Delta
      -  2m
      -  The total number of transmission errors that occurred over two minutes

   *  -  ``logins.successful``
      -  Count
      -  Average
      -  1h
      -  The average number of successful logins measured over one hour

   *  -  ``logins.successful``
      -  Count
      -  Sum
      -  1h
      -  The total number of successful logins measured over one hour


.. _rollups-analytics-interactions:

Interactions between rollups and analytics functions
=============================================================================

Rollups and analytics functions provide similar results, because they are both ways to perform statistical analysis
on data. They affect charts differently, and Observability Cloud uses them for different tasks. Also, some
rollups have the same name as an analytical function, such as Sum or Max.

The following table describes the difference between rollups and analytical functions:

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   *  -
      -  :strong:`Rollups`
      -  :strong:`Analytics functions`

   *  -  Usage
      -  Rollups combine data points from the same MTS into a single data point that Observability Cloud displays or stores.
      -  Analytics functions perform statistical, transformation, combination, selection, or aggregation
         computations on data points. The resulting number of data points depends on the function.

   *  -  Number
      -  Observability Cloud has fewer than ten types of rollup.
      -  Observability Cloud has more than twenty analytics functions.

   *  -  Requirement
      -  You can only decide which rollup to use in a chart. Observability Cloud applies the rollup when necessary.
      -  You can decide whether or not to use analytics functions on your data.

   *  -  Order of operations
      -  If Observability Cloud has to apply a rollup, it's always applied to your chart before any analytics
         functions you specify.
      -  You decide the order in which Observability Cloud applies analytics functions to a chart.

   *  -  Timing
      -  Observability Cloud automatically applies rollups, depending on the chart resolution required.
      -  Observability Cloud always applies analytics functions, regardless of the resolution of the chart.

   *  -  Visible effects
      -  In most cases, the effects of a rollup aren't visible until you change the time range of the chart.
         A longer time range can cause Observability Cloud to apply a rollup. A shorter time range can
         cause Observability Cloud to remove a rollup if Observability Cloud can display the data data
         at its native resolution.
      -  When you apply an analytics function, you immediately see the effect in the chart.


.. _rollup-res-analytics:


How rollups, resolution, and analytics functions affect chart data
=============================================================================

The following table shows you the results of some combinations of rollups, 
resolutions, and analytics aggregation functions. 
Use these examples to help you build charts that contain the information you need.

.. note:: Both the "Average" rollup type and the "Mean" analytics function perform the same type of computation, although they have different names.

.. list-table::
   :header-rows: 1
   :widths: 10 10 10 10  10 50

   *  -  :strong:`Metric`
      -  :strong:`Type`
      -  :strong:`Rollup`
      -  :strong:`Aggregated analytics function`
      -  :strong:`Resolution`
      -  :strong:`Data point meaning`

   *  -  ``cpu.utilization``
      -  Gauge
      -  Average
      -  Mean
      -  1h
      -  Average CPU utilization per hour


   *  -  ``cpu.utilization``
      -  Gauge
      -  Average
      -  Max
      -  1h
      -  Highest average CPU utilization per hour

   *  -  ``cpu.utilization``
      -  Gauge
      -  Max
      -  Max
      -  1h
      -  The maximum CPU utilization observed per hour


   *  -  ``requests``
      -  Counter
      -  Rate/sec
      -  Mean
      -  1h
      -  Mean request rate per second over one hour

   *  -  ``requests``
      -  Counter
      -  Rate/sec
      -  Max
      -  1h
      -  Highest average request rate per second over one hour

   *  -  ``requests``
      -  Counter
      -  Sum
      -  Sum
      -  1h
      -  Total number of requests per hour

   *  -  ``requests``
      -  Counter
      -  Sum
      -  Max
      -  1h
      -  The highest total number of requests per hour
