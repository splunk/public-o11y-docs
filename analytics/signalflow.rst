.. _get-started-signalflow:

*****************************************************************
Analyze incoming data using SignalFlow
*****************************************************************

Using SignalFlow in the Splunk Observability Cloud UI, you can improve your charts and detectors analytics.

.. _run-signalflow-programs-ui:

Run SignalFlow programs from the UI
=======================================

You can add SignalFlow programs from the Splunk Observability Cloud user interface to stream processed data to detectors and charts. 

- To edit SignalFlow programs when editing detectors, see :ref:`create-detectors`.
- To use SignalFlow functions when editing charts, see :ref:`analytics-ref`.

.. note:: You can also add SignalFlow programs using the SignalFlow API. See :new-page:`Using the SignalFlow API <https://dev.splunk.com/observability/docs/signalflow/#Using-the-SignalFlow-API>`.

.. _stream-objects-signalflow:

Process stream objects
=======================================

SignalFlow programs handle stream objects, which produce timestamped value organized along dimensions. Raw metric time series data is streamed to analytics jobs, and the queries and computations specified through SignalFlow produce new streams. For example, statistics computed across a population or over time. 

Streams are local to a particular analytics query or computation, and several distinct jobs may query for the same underlying metric time series data. Detectors evaluate conditions involving one or more streams, typically comparisons between streams over a period of time. For example, the condition for a detector could be "disk utilization is greater than 80% for 90% of 10 minutes," or, "average database latency is above 5 seconds and the number of database calls is at least 20% of the one day average."

For more information about stream objects, see :new-page:`Streams as variables <https://dev.splunk.com/observability/docs/signalflow/#Streams-as-variables>`.

Create custom analytics
-------------------------------------------

If you want to create custom charts and detector analytics, see :new-page:`Analyze Data Using SignalFlow <https://dev.splunk.com/observability/docs/signalflow/>` in the Splunk Observability Cloud Developer Guide.

You can also run SignalFlow programs directly. For more information, see the :new-page:`SignalFlow API <https://dev.splunk.com/observability/docs/signalflow#SignalFlow-API/>` topic in the Splunk Observability Cloud Developer Guide.

.. _aggregations-transformations:

Aggregate and transform data
=============================================================================

Most built-in :ref:`analytical functions <analytics-ref>` can perform computations on time series in charts and detectors in two ways: aggregations and transformations.

-  Aggregations operate across all of the data points at a single instance in time, for example the mean CPU utilization across a group of five servers at time t, t+1, t+2, and so on. The output of an aggregation is a single :term:`metric time series <Metric time series>` (MTS), where each data point represents the aggregation of all the data points over a specific period of time. For more information, see :new-page:`Aggregations <https://dev.splunk.com/observability/docs/signalflow/#Aggregations>`.

   An additional option, Group By, is available for aggregations. If a group-by field is specified, MTS sharing values for properties named in the group-by criterion are aggregated together. For example, you can compute the average CPU load grouped by AWS instance type; add the Mean function as an aggregation, and set AWS instance type as the group-by criterion. The output will show one MTS per AWS instance type.

-  Transformations operate in parallel on each MTS over a window of time and yield one output time series for each input time series. For example, the average CPU utilization for five servers over a rolling window of one day will display five MTS; each output value will be the moving average for that MTS over the previous 24 hours. For more information, see :new-page:`Transformations <https://dev.splunk.com/observability/docs/signalflow/#Transformations>`.

   See the following sections to learn more about the 3 types of transformations available, moving window, calendar window, and dashboard window. For examples of how to use transformation analytics in charts, see :ref:`gain-insights-through-chart-analytics`.

Moving window transformations
--------------------------------------------

In the following example of a moving window transformation chart, each line represents the Mean CPU utilization across four servers. The grey line represents the mean value for each data point over the preceding minute. The magenta line represents the mean value for each data point over the preceding hour rolling window.

.. image:: /_images/get-started/aggr-transform-moving.png
    :width: 99%
    :alt: This image shows a rolling window transformation chart. Two CPU utilization functions appear in the chart.

For more information about rolling window transformations, see :new-page:`Rolling window transformations <https://dev.splunk.com/observability/docs/signalflow/#Rolling-window-transformations>`.

.. _calendar-window:

Calendar window transformations
------------------------------------------

In the following example, the ``Sum``, ``Mean``, ``Maximum``, and ``Minimum`` functions let you set a calendar window for a transformation. In the chart, the magenta line shows the sum of all transactions over a moving window of one week. The green line shows the sum of the transactions over a calendar week, including partial values calculated throughout the week. Values increase over a week, then reset at the beginning of the following week.

.. image:: /_images/get-started/moving-and-cal.png
    :width: 99%
    :alt: This image shows a calendar window transformation chart.

For more information about calendar window transformations, see :new-page:`Calendar window transformations <https://dev.splunk.com/observability/docs/signalflow/#Calendar-window-transformations>`.


Resolution considerations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When you add a function with a calendar window to a plot, and the current time window is narrower than the cycle length that you specified on the function, the chart resizes to a default time of at least one cycle. At the same time, any dashboard override for time range is removed. A message is shown to inform you of this optimization; if you don't accept the optimization, you may need to modify the time range manually to see the data you expect.

For a chart to show a value at the end of every calendar cycle, the cycle length must be a multiple of the resolution. For more information, see :ref:`resolution <get-started-retention>`. 

For some combinations of time range and chart display resolution, it may not be possible to use a resolution that guarantees a chart shows values perfectly aligned with cycle boundaries. For example, if a resolution of one day results in more data points than can be shown on a chart, you may have to use a resolution of two days. This means that plotted values can't line up with the end of a month that has 29 or 31 days, because neither value is a multiple of the two-day resolution. Such a situation is indicated by the resolution pill on a chart turning orange and showing a message in a tooltip. You can solve this issue by changing the display resolution or viewing a narrower time range.

.. note:: When using calendar time windows with transformations, the chart cannot have a resolution finer than one hour.

Cycle length and start
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cycle length options include hour, day, week, month, and quarter.

For most cycle length options, you can specify a starting point. For example, for a cycle length of a quarter, you can specify that the first quarter starts in February instead of the default of January. The one exception is an hourly cycle length. Hourly cycles always start at the top of the hour (minute zero).

.. _time-zone:

.. _cal-window-time-zone:

Calendar time zone
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For calendar windows, you must specify a calendar time zone. The calendar time zone is a per-chart (or per-detector) setting that is independent of the visualization timezone that is set in your user profile. The time zone you set for a calendar window determines the exact beginning and end of your chosen calendar window cycles.

For example, January in America/Los Angeles starts at a different time relative to January in Asia/Tokyo. If Splunk Observability Cloud receives a data point with a timestamp near midnight UTC time on December 31, the calendar time zone determines whether that data point counts towards the calculation for December or the calculation for January.

All calendar window functions in a chart share the same calendar time zone. The first time you add a calendar window function on any plot in a chart, the visualization timezone from your profile is suggested as the value to use for the calendar timezone.

.. _cal-window-partial-values:

Hide partial values
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :guilabel:`Hide partial values` setting lets you optimize the output of a calendar window function, based on whether you are interested only in the final values calculated at the ends of cycles, as well as partial values calculated during a cycle. For example, if you have a cycle length of one day, hiding partial values means that you will only see one value for each day; you won't see how values change during the course of the day.

.. note:: Deselecting this option has no effect when the cycle length is one hour, because a chart using calendar windows cannot have a resolution finer than one hour.

In the following example, hiding partial values (magenta bars) provides a better overview of how values compare on a day-to-day basis. Not hiding partial values (green lines) shows how the mean changes over the course of each day.

.. image:: /_images/get-started/cal-window-show-hide-2.png
    :width: 99%
    :alt: This image shows a chart with hidden partial values.

The value at the start of each cycle represents the final value for the previous cycle. The magenta column at 12:00 AM February 15 represents the mean of the values seen over February 14. The column at 12:00 AM February 16 represents the mean of the values for February 15, and so on.

.. note:: Single value charts can be useful for visualizing calculations such as the maximum latency reported in the current day so far. To properly display these numbers, deselect :guilabel:`Hide partial values`.

.. _cal-window-timeshift:

Timeshift for calendar windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The timeshift function shifts the data points for each MTS in the input stream, offsetting them by a specified time period. A typical use case for using timeshift is to compare the average value seen for a metric over a period of time with the average seen over the previous period. For more information on the SignalFlow function, see :new-page:`timeshift() <https://dev.splunk.com/observability/docs/signalflow/methods/timeshift_stream_method>`.

Timeshift is available only when partial values are hidden. If you enable timeshift when using calendar windows, the value from the end of a previous cycle will be shown at the end of every calendar cycle. For example, if your cycle length is Month and you timeshift by one cycle, the data point at April 30 will represent the value from March 31, the data point at May 31 will represent the value from April 30, and so on.

.. note:: The timeshift feature in charts is aware of cycles having variable lengths, such as how March has more days than February, and shifts correctly to the end of a previous interval. By contrast, the standalone timeshift analytics function performs a fixed width shift, such as 30 days. For more information, see :ref:`use-timeshift-function-to-understand-trends`.

.. _dashboard-window:

Dashboard window transformations
------------------------------------------

In the following example, both charts in the same dashboard show the total number of hosts for load balancers in different regions. Based on data in the past hour, there are 2124 hosts in the Tokyo region and 1772 hosts in the Paris region.

.. image:: /_images/get-started/dashboard-window-transformation.png
    :width: 99%
    :alt: This image shows a dashboard window transformation in chart.

The difference between the two charts is that the :strong:`listChartDemo` chart isn't configured with dashboard window transformation, while the :strong:`listChartDashboardWindow` chart is.

When you adjust the :guilabel:`Time` picker for the dashboard, only the chart on the :strong:`listChartDashboardWindow` chart will update its values according to the selected time range. For example, if you select a time range of ``-12h``, the chart will display data from the past 12 hours.

For more information about dashboard window transformations, see :new-page:`Dashboard window transformations <https://dev.splunk.com/observability/docs/signalflow/#Dashboard-window-transformations>`.

.. note::
    
    You can't apply dashboard window transformations to detectors. When you create a new detector from a chart that uses dashboard window transformation, the transformation window is updated to the closest match to the current time window of the dashboard. 
     
    For example, the current time window of a dashboard is ``09/01/2023 09:25:00 am to 09/02/2023 07:30:00 am``. When you create a new detector from a chart in this dashboard, the transformation window becomes ``Past day (-1d)``.


.. _other-functions:

Other functions
=============================================================================

In addition to functions that provide aggregations and transformations, SignalFlow provides functions such as ``Count``, which counts the number of MTS that have values; ``Top`` and ``Bottom``, which show the highest or lowest N number of values; and ``Exclude``, which provides the ability to filter time series by value, rather than by source.

As with other analytical functions, these functions can be used in concert with others to produce more sophisticated computations. For example, ``Exclude`` can be used with ``Sum`` to achieve a result akin to the ``sumif()`` function found in popular spreadsheet applications.

For a detailed explanation of each function, see :ref:`analytics-ref`.

.. _expressions:

Expressions
=============================================================================

SignalFlow lets you create expressions that refer to preceding computations as variables. For example, you can calculate a ratio of HTTP response codes received that are 2xx to those that are 4xx or 5xx.

