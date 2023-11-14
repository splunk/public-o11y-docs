.. _time-range-selector:

*****************************************************************
Select the time range with the Time Range Selector
*****************************************************************

.. meta::
   :description: The Time Range selector is located at the top right of dashboards and charts, and in the Chart Options tab. By default, Splunk Infrastructure Monitoring chooses the best time range based on the characteristics of the chart's data. However, you can use the Time Range selector to override the default for all charts in a dashboard. 

The time range selector is used through Splunk Observability Cloud. It can specify a chart's :ref:`default time range<default-time>` in the Chart Options tab. By default, Splunk Observability Cloud chooses the best time range for a chart or data view based on the characteristics of the data that it shows. However, you can use the time range selector to :ref:`override the default<dashboard-time-range>` for all charts in a dashboard. The time range selector supports both relative and absolute time ranges.


Specify a relative time range
=============================================================================

You can specify a relative time range by selecting a provided time range from the menu, or by typing your preferred relative time range. To learn more, see the following sections.


Select a time range from the menu
-------------------------------------------------------------------

To change the relative time range of a dashboard or chart, click the Time Range selector and choose your desired time range from the menu that appears.

Type in a relative time range
-------------------------------------------------------------------

If you don't see your desired relative time range on the menu, you can type it into the Time Range selector field. Valid time units for time ranges are:

- m (minute)
- h (hour)
- d (day)
- w (week) 
 
For example, -4h (past 4 hours), or -2d13h30m (past 2 days, 13 hours and 30 mins).

To view data from a relative time window up to now, type the time unit preceded by a :strong:`-` (minus sign) into the Time Range selector. For example, if you want to see a metric from the last five minutes, click the Time Range selector and type :strong:`-5m`.

You can also view data from a relative time window up to some time before now using "start time to end time." For example, if you want to see a metric from between 1 and 3 minutes ago, click the Time Range selector and type :strong:`-3m to -1m`. 

.. note:: The earlier time point must come first. In this example, typing :strong:`-1m to -3m` doesn't work.

The Time Range selector shows your most recently used custom time range under the heading "Recent".

.. _absolute-time-range:

Specify an absolute time range
=============================================================================

You can also view data from an absolute time window with a defined start and end time. Select the Time Range selector and choose :guilabel:`Custom` from the menu. A custom Time Range selector appears. Choose the starting and ending date and time of your desired time range, then click :guilabel:`Apply` to show data for that time range only.

Time zone abbreviations are based on the user's browser locale for both the time stamp and time range selections. If you are sharing time stamps with team members across locales, take care to avoid confusion over time zone abbreviations, which may have ambiguous meanings depending on the language. For example, CST is UTC -6:00 in US English, while it is UTC +9:30 in Australian English. Using ISO with UTC offsets is the preferred method. Preferred absolute time formats include:

- 18 Sep 10:18 to 19 Sep 10:18
- If the same date: 10:18 to 10:20
- If you copied an ISO range, 2023-10-15T04:19:00.000-07:00 to 2023-10-16T16:19:00.000-07:00

Select a custom time range
================================

You can also view data from a relative or absolute time window with a defined start and end time. Select the Time Range selector and choose :guilabel:`Custom` from the menu. A custom Time Range selector appears. Choose the starting and ending date and time of your desired time range, then click :guilabel:`Apply` to show data for that time range only.

.. _panning:

Pan through time ranges
=============================================================================

When you look at a chart on a dashboard or in the Chart Builder, you can hover over the lower left corner to display panning controls. Initially, you can only see the control for panning back in time. Once you pan back in time, you can see controls for panning back and forward.

Clicking one of these controls changes the time range to an absolute time range, changing by 2/3 of an increment each time you click the control; for example, if you pan backwards, the last third of the panned chart overlaps the first third of the original chart.

In the following illustration, the current time is approximately 4:55 |nbsp| PM (16:55) and the chart is displaying data for the last 1 |nbsp| hour, starting at 15:55. Panning back once displays a time range starting at approximately 15:15, 40 minutes prior to 15:55.

.. image:: /_images/images-ui/panning.png
      :width: 99%
      :alt: This image shows an example of what panning through time ranges looks like.

