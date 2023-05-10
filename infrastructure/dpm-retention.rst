.. _dpm-retention:

**************************************************************************************
Resolution and data retention in Splunk Infrastructure Monitoring (DPM plans only) 
**************************************************************************************

.. note:: 

   This information applies to you only if your organization's subscription plan is based on the rate at which you are sending data points to Splunk Infrastructure Monitoring (DPM). If your organization's usage is based on the number of hosts or metrics that Splunk Infrastructure Monitoring is monitoring for you, see :ref:`get-started-retention`.

In Splunk Infrastructure Monitoring, the term "resolution" can refer to native data collection intervals (native) or intervals at which data points are displayed on a chart (chart resolution).

Native resolution
=============================================================================

When plotting a graph or evaluating an analytical expression, the Splunk Infrastructure Monitoring service first needs to determine the native resolution of the metrics on the chart. The native resolution - denoted by the time interval between successive data points sent to Splunk Infrastructure Monitoring - determines the precision and quality of the chart that you ultimately see.  

In the context of operations monitoring, high resolution or fine data can have an interval as small as one second (1s), while low resolution or coarse data can have intervals as high as five minutes (5m) or more.

The primary factor in selecting a native resolution is the incoming rate of the data itself. In other words, we measure reporting intervals for each time series and, all things being equal, will use that native resolution for graphs and analytics. If you are sending it in every second, we will try to act on it every second.

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

For example, metrics from AWS CloudWatch typically have a
one-minute or five-minute resolution, while metrics reported using the Splunk Distribution of OpenTelemetry Collector or SignalFx Smart Agent typically have a 10-second resolution. If a single chart has one plot that contains AWS CloudWatch metrics
(five-minute resolution) and another plot that contains OpenTelemetry Collector or Smart Agent metrics, the chart resolution is always five minutes or more.

Minimum chart resolution
-------------------------------------------------------------------

On the :strong:`Chart Options` tab, you can select a minimum resolution for a chart. The following
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

Resolution and data retention policies
=============================================================================

Data is retained at different resolutions depending on how long ago the data was received. Retention period is officially managed in days since the length of each month is different. Therefore, the number of months is only an approximation to the number of days in the actual retention period.  

The policies for data retention are:

- 1 second for 8 days (to allow week over week comparisons)

- 1 minute for 32 days (to allow month over month comparisons)

- 5 minutes for 96 days (to allow quarter over quarter comparisons)

- 1 hour for 384 days (approximately 13 months, to allow year over year comparisons)

.. note:: Custom events are retained in the platform for a year.
