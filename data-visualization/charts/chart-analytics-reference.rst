.. _analytics-ref:

************************************************************
Functions reference for Splunk Observability Cloud
************************************************************

.. meta::
   :description: You can run calculations on Splunk observability data and visualize their output in charts using SignalFlow analytics functions. The following page describes each analytics function of SignalFlow.

You can run calculations on observability data and visualize the output in :ref:`charts <data-visualization-charts>` using :ref:`SignalFlow <get-started-signalflow>` analytics functions. To use analytics functions in your charts select :strong:`Add Analytics` in the :strong:`Plot Editor` tab.

Use the following list to learn more about each SignalFlow analytics function, including sample calculations. To use analytics functions in SignalFlow programs, see the :new-page:`SignalFlow Functions and Methods <https://dev.splunk.com/observability/docs/signalflow/function_method_list>` topic in the Splunk Observability Cloud Developer Guide.

.. hlist::
   :columns: 3

   * :ref:`absolute-value`
   * :ref:`Bottom<top-bottom>`
   * :ref:`ceiling`
   * :ref:`count`
   * :ref:`delta`
   * :ref:`ewma`
   * :ref:`exclude`
   * :ref:`floor`
   * :ref:`integrate`
   * :ref:`logn`
   * :ref:`log10`
   * :ref:`Maximum<min-max>`
   * :ref:`mean`
   * :ref:`mean-plus-stddev`
   * :ref:`Minimum<min-max>`
   * :ref:`percentile`
   * :ref:`power`
   * :ref:`rate-of-change`
   * :ref:`scale`
   * :ref:`square-root`
   * :ref:`stddev`
   * :ref:`sum`
   * :ref:`timeshift`
   * :ref:`Top<top-bottom>`
   * :ref:`variance`


.. _absolute-value:

Absolute Value
========================

SignalFlow function: :new-page:`abs() <https://dev.splunk.com/observability/docs/signalflow/methods/abs_stream_method/>`

Returns the absolute value of a data point. The absolute value of a number is the number without the sign.

.. _ceiling:

Ceiling
=============================================================================

SignalFlow function: :new-page:`ceil() <https://dev.splunk.com/observability/docs/signalflow/methods/ceil_stream_method/>`

Rounds a data point up to the largest (closest to positive infinity) floating-point value that is less than or equal to the argument and is equal to a mathematical integer.

.. _count:

Count
=============================================================================

SignalFlow function: :new-page:`count() <https://dev.splunk.com/observability/docs/signalflow/methods/count_event_stream_method/>`

Counts the number of time series that have values, including extrapolated data points. :strong:`Count` is typically used to determine if data points are missing for whatever reason.

In the following example :strong:`Count` returns the amount of input time series which reported a data point within the time interval.

.. image:: /_images/data-visualization/charts/analytics-reference/fig1.png
   :alt: Sample results of the Count function. 

.. _delta:

Delta
=============================================================================

SignalFlow function: :new-page:`delta() <https://dev.splunk.com/observability/docs/signalflow/methods/delta_stream_method/>`

Calculates the difference between the current value and the previous value for each time interval. :strong:`Delta` operates independently on each time series in the plot.

In the following example, :strong:`Delta` returns the difference between two time series for each time interval.

.. image:: /_images/data-visualization/charts/analytics-reference/fig2.png	
   :alt: Sample results of the Delta function.

.. _ewma:

EWMA and Double EWMA
=============================================================================

SignalFlow functions: :new-page:`ewma() <https://dev.splunk.com/observability/docs/signalflow/methods/ewma_stream_method>` and :new-page:`double_ewma() <https://dev.splunk.com/observability/docs/signalflow/methods/double_ewma_stream_method>`

Calculates an exponentially weighted moving average (EWMA), where more recent data points are given higher weight. The weight of a data point decreases exponentially with time.

:strong:`EWMA` summarizes a window of data with an emphasis on points received recently. Thresholds for alerts can be set by forming a band around the EWMA using standard deviations or a percentage. Alternatively, alerting on the EWMA, much like alerting on the usual moving average, can be used in place of duration conditions.

:strong:`Double EWMA`, a selectable variant of :strong:`EWMA`, incorporates a weighted moving average of the metric's trend, and can be used to forecast. :strong:`Double EWMA` addresses smoothing problems that occur when raw data exhibits a trend.

EWMA and Double EWMA parameters
-----------------------------------------------------------------------------

Use the following parameters with :strong:`EWMA` and :strong:`Double EWMA`.

- :strong:`Data Smoothing` (number)

  Smoothing parameter, often called alpha, applied to the data points of the input time series. Must be between 0 and 1. Smaller values correspond to longer time windows and thus more smoothing (weights decay more slowly). :strong:`Data Smoothing` always uses the finest resolution available.

- :strong:`Trend Smoothing` (number, applies only to :strong:`Double EWMA`)

  Smoothing parameter, often called beta, applied to the trend of the input time series. Must be between 0 and 1. Smaller values correspond to longer time windows and thus more smoothing (weights decay more slowly). :strong:`Trend Smoothin` always uses the finest resolution available.

- :strong:`Forecast` (duration, applies only to :strong:`Double EWMA`)

  How far into the future to forecast (for example 1h, 4m, etc.). Calculated by adding an appropriate multiple of the trend term to the level term. The default value (0) smooths the series. 
  
  For example, if the forecast parameter is set to 10m, the output time series estimates the value of the input time series 10 minutes from now. This can be used to predict when a resource is likely to be exhausted, or as a way of getting alerts earlier. Forecasting also eliminates some false alarms in the scenario where the values are problematic but the trend is benign (decreasing back to healthy).

- :strong:`Damping` (number, applies only to :strong:`Double EWMA`)

  A number between 0 and 1. A value of 1 projects that the trend will continue indefinitely (no damping). Smaller values decay the trend towards zero as the projection gets further into the future. :strong:`Damping` is relevant when :strong:`Forecast` is not 0.

.. _exclude:

Exclude
=============================================================================

SignalFlow functions: :new-page:`above() <https://dev.splunk.com/observability/docs/signalflow/methods/above_stream_method/>`, :new-page:`below() <https://dev.splunk.com/observability/docs/signalflow/methods/below_stream_method/>`, :new-page:`between() <https://dev.splunk.com/observability/docs/signalflow/methods/between_stream_method/>`, :new-page:`not_between() <https://dev.splunk.com/observability/docs/signalflow/methods/not_between_stream_method/>`

Restricts the data to be analyzed by filtering out values above or below given thresholds. You can choose whether to include the threshold values themselves. If a time series value meets the criteria set in the function, you can choose to :strong:`Drop excluded points` or :strong:`Set excluded values to their corresponding limit`.

:strong:`Exclude` can be useful in situations where you want to apply a condition to another analytics function. For example, if you want to count the number of servers with a CPU utilization above 80%, then you can use ``CPUUtilization`` as the metric, apply an ``Exclude x < 80`` function, and then apply :ref:`Count <count>`.

.. _floor:

Floor
=============================================================================

SignalFlow function: :new-page:`floor() <https://dev.splunk.com/observability/docs/signalflow/methods/floor_stream_method>`

Rounds a data point down to the smallest (closest to negative infinity) floating-point value that is greater than or equal to the argument and is equal to a mathematical integer.

.. _integrate:

Integrate
=============================================================================

SignalFlow function: :new-page:`integrate() <https://dev.splunk.com/observability/docs/signalflow/methods/integrate_stream_method>`

Multiplies the values of each input time series by the resolution (in seconds) of the chart. :strong:`Integrate` is most useful for gauge metrics. 

In the following example, :strong:`Integrate` calculates the change in velocity over a window of time.

.. image:: /_images/data-visualization/charts/analytics-reference/fig3.png
   :alt: Sample results of the Integrate function.

|br|

For counters and cumulative counters, :strong:`Integrate` is less useful because a built-in :ref:`rollups` with equivalent functionality already exists. For counters, applying an :strong:`Integrate` function to the :strong:`Rate/sec` (rate per second) rollup is equivalent to using the :strong:`Sum` rollup, assuming no missing data points. The same applies to the :strong:`Delta` rollup for cumulative counters.

.. _logn:

LN or Log natural
=============================================================================

SignalFlow function: :new-page:`log() <https://dev.splunk.com/observability/docs/signalflow/methods/log_stream_method>`

:strong:`LN` calculates the natural logarithm (log\ :sub:`e`\ ) of each data point value. For each input time series, :strong:`LN` generates a corresponding output time series.

.. _log10:

Log10
=============================================================================

SignalFlow function: :new-page:`log10() <https://dev.splunk.com/observability/docs/signalflow/methods/log10_stream_method>`

Calculates the common logarithm (log\ :sub:`10`\ ) of each data point. For each input time series, :strong:`Log10` generates a corresponding output time series.

.. _mean:

Mean
=============================================================================

SignalFlow function: :new-page:`mean() <https://dev.splunk.com/observability/docs/signalflow/methods/mean_stream_method>`

Calculates the arithmetic average or mean of the available data points by dividing the sum of the values of the available data points by the number of available data points.

Types of Mean
-----------------------------------------------------------------------------

You can choose to either aggregate or transform the values of :strong:`Mean`.

- :strong:`Mean:Aggregation`

  Mean across all values. :strong:`Mean:Aggregation` outputs an averaged time series for each group of input time series. Missing data points are treated as ``null`` values.

  The following example shows the averaged time series of a group of three time series.

  .. image:: /_images/data-visualization/charts/analytics-reference/fig4.png
     :alt: Sample results of the Mean:Aggregation function.

  |br|

- :strong:`Mean:Transformation`

  Calculates a moving average over a configurable time window. For each input time series, :strong:`Mean:Transformation` outputs a corresponding time series expressing for each time period the mean of the values of the input time series over a configurable time window leading up to said period. The default time window is one hour.

  The following example shows a moving average calculated over a time window of 10 seconds.

  .. image:: /_images/data-visualization/charts/analytics-reference/fig5.png
      :alt: Sample results of the Mean:Transformation function over a time window of 10 seconds.

  |br|

  The :strong:`Mean` function also supports transformation over a calendar window (day, week, month, etc.) instead of a moving window. For more information, see :ref:`calendar-window`.

.. _mean-plus-stddev:

Mean + Standard Deviation
=============================================================================

SignalFlow function: :new-page:`mean_plus_stddev() <https://dev.splunk.com/observability/docs/signalflow/methods/mean_plus_stddev_stream_method>`

Applies the formula μ+n*σ, where μ is the mean, σ is the standard deviation, and n is a given number of standard deviations to add (or subtract, for negative numbers) from the mean. The default number of standard deviations is 1. The aggregation and transformation modes work in the same manner as for the independent mean and standard deviation functions.

.. _min-max:

Minimum / Maximum
=============================================================================

SignalFlow functions: :new-page:`min() <https://dev.splunk.com/observability/docs/signalflow/methods/min_stream_method/>`, :new-page:`max() <https://dev.splunk.com/observability/docs/signalflow/methods/max_stream_method/>`

Returns either the smallest (:strong:`Minimum`) or the largest (:strong:`Maximum`) value seen in data points collected either from multiple time series at a point in time (aggregation), or from individual time series over a time window (transformation).

- :strong:`Minimum:Aggregation` and :strong:`Maximum:Aggregation`

  Output one time series for each group of input time series expressing, for each time period, the minimum or maximum of the values present in the input in the time period.

  The following example shows the aggregated minimum and maximum for three time series.

  .. image:: /_images/data-visualization/charts/analytics-reference/fig6.png
     :alt: Sample results of the Minimum and Maximum Aggregation functions.
  
|br|

- :strong:`Minimum:Transformation` and :strong:`Maximum:Transformation`

  For each input time series, outputs a corresponding time series expressing for each time period the minimum or maximum of the values of the input time series over a configurable time window leading up to that period. The default time window is one hour.

  The following example shows the minimum and maximum over a time window of 10 seconds.

  .. image:: /_images/data-visualization/charts/analytics-reference/fig7.png
     :alt: Sample results of the Minimum and Maximum Transformation functions over a time window of 10 seconds.

|br|

  The Minimum and Maximum functions also support transformation over a calendar window (day, week, month, etc.) instead of a moving window. For more information, see :ref:`calendar-window`.

.. _percentile:

Percentile
=============================================================================

SignalFlow function: :new-page:`percentile() <https://dev.splunk.com/observability/docs/signalflow/methods/percentile_stream_method>`

Calculates the specified percentile of values in data points collected either from multiple time series at a point in time (aggregation), or from individual time series over a moving time window (transformation).

- :strong:`Percentile:Aggregation`

  Outputs one time series for each group of input time series expressing, for each time period, the configured percentile (between 1 and 100, inclusive) of the values present in the input in the time period. The default percentile value is 95.

- :strong:`Percentile:Transformation`

  For each input time series, outputs a corresponding time series expressing, for each time period, the configured percentile (between 1 and 100, inclusive) of the input time series over a configurable time window leading up to that period. The default percentile value is 95, and the default time window is one hour.

.. _power:

Power
=============================================================================

SignalFlow function: :new-page:`pow() <https://dev.splunk.com/observability/docs/signalflow/methods/pow_stream_method>` 

Raises the value of each data point to a specified power, or a specified number to the power of the data point value.

.. _rate-of-change:

Rate of Change
=============================================================================

SignalFlow function: :new-page:`rateofchange() <https://dev.splunk.com/observability/docs/signalflow/methods/rateofchange_stream_method>`

Calculates the difference between the current value and the previous value for each time interval, then divides the result by the length, in seconds, of that time interval.

Similar to :ref:`Delta<delta>`, except that it divides the difference by the time elapsed, in seconds, to normalize the change over the compute resolution.

The following example shows the rate of change over time for a time series.

.. image:: /_images/data-visualization/charts/analytics-reference/fig8.png
   :alt: Sample results of the Rate of change function.

.. _scale:

Scale
=============================================================================

SignalFlow function: :new-page:`scale() <https://dev.splunk.com/observability/docs/signalflow/methods/scale_stream_method>`

Multiplies each data point by a specified number. 

:strong:`Scale` is often used for converting values to percentages (using 100) or for converting between units of time (using 60). The default scale factor is 1. 

.. _square-root:

Square Root
=============================================================================

SignalFlow function: :new-page:`sqrt() <https://dev.splunk.com/observability/docs/signalflow/methods/sqrt_stream_method>`

Calculates the square root of the data point values.

.. _stddev:

Standard Deviation
=============================================================================

SignalFlow function: :new-page:`stddev() <https://dev.splunk.com/observability/docs/signalflow/methods/stddev_stream_method>`

The standard deviation (σ) is the square root of the variance. See :ref:`Variance<variance>` for how the variance is calculated for both aggregation and transformation modes.

.. _sum:

Sum
=============================================================================

SignalFlow function: :new-page:`sum() <https://dev.splunk.com/observability/docs/signalflow/methods/sum_stream_method>`

Adds up all the values in data points collected either from multiple time series at a point in time (aggregation), or from individual time series over a time window (transformation).

- :strong:`Sum:Aggregation`

  Outputs a single time series expressing, for each period, the sum of all the values of the input time series from that same period. 
  
  Otherwise, it outputs one time series for each unique combination of the values of the grouping properties, each of those time series expressing the sum of the values of the input time series which metadata match those groups. Input time series that do not have dimensions or properties matching those grouping properties are not included in the computation and in the output.

- :strong:`Sum:Transformation`

  Calculates the sum of the values of an input time series over a moving time window. As with other transformations, an output time series is generated for each input time series. The default time window is one hour.

  The following example shows both aggregation and transformation sums over a time window of 10 seconds.

  .. image:: /_images/data-visualization/charts/analytics-reference/fig9.png
     :alt: Sample results of the Sum Aggregation and Transformation functions over a time window of 10 seconds.

|br|

The :strong:`Sum` function also supports transformation over a calendar window (day, week, month, etc.) instead of a moving window. For more information, see :ref:`calendar-window`.

.. _timeshift:

Timeshift
=============================================================================

SignalFlow function: :new-page:`timeshift() <https://dev.splunk.com/observability/docs/signalflow/methods/timeshift_stream_method>`

Retrieves data from a previous point in time, offset by a specified time period (for example, one week), to enable comparison of a time series with its own past trends.

The presence of a :strong:`Timeshift` element in a plot affects the entirety of the plot it is on, regardless of its position, as it instructs SignalFlow to fetch data for all the time series of the plot with the specified time offset.

For example, a time shift of one day fetches data for time series from one day in the past, then stream the offset data in real time. This allows you to compare the current value reported in a time series with the value that was reported in the past with a constant relative offset.

The offset value can specified in weeks(w), days(d), hours(h), minutes(m), and seconds(s). The offset value is always assumed to be towards the past, and must be zero or positive. To specify an offset of two weeks and two hours, enter an offset value of 2w2h.

.. note:: The offset value must be greater than or equal to the minimum resolution of the data used in the current chart. For example, if you set a time shift of 30 seconds, but the resolution of your chart is five minutes, the function will be invalid.

.. _top-bottom:

Top and Bottom
=============================================================================

SignalFlow functions: :new-page:`top() <https://dev.splunk.com/observability/docs/signalflow/methods/top_stream_method>`, :new-page:`bottom() <https://dev.splunk.com/observability/docs/signalflow/methods/bottom_stream_method>`

Can be used to select a subset of the time series in the plot.

- :strong:`By count`

  When operating by count, the output is the top or bottom N time series with the highest or lowest values in each time period, where N is the given count value. The default count value is 5.

- :strong:`By percent`

  When operating by percent, the output is the time series for which the value in each time period is higher or lower than the Pth percentile, where P is the given percentage value between 1% and 100% (inclusive). This is equivalent to the :strong:`Top x%` or :strong:`Bottom x%` of time series, by value. The default count value is 5.

A line chart using :strong:`Top` or :strong:`Bottom` shows all series that were in the Top/Bottom N at any point in the specified time window. The value for a series is replaced with ``null`` at a timestamp if that series is not in the Top/Bottom N.

.. _variance:

Variance
=============================================================================

SignalFlow function: :new-page:`variance() <https://dev.splunk.com/observability/docs/signalflow/methods/variance_stream_method>`

The variance measures how far a set of values is spread out. :strong:`Variance` is calculated by dividing the sum of the squares of the difference of each value to their mean by the number of available data points.

- :strong:`Variance:Aggregation`

  Calculates the variance of values across a group of input time series at a given point in time.

- :strong:`Variance:Transformation`

  Calculates the variance of the values of an input time series over a moving time window. As with other transformations, an output time series is generated for each input time series. The default time window is one hour.