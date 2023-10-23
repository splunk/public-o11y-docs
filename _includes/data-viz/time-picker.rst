
Specify a relative time range
=============================================================================

You can specify a relative time range by selecting a provided time range from the menu, or by typing your preferred relative time range. To learn more, see the following sections.


Select a time range from the menu
-------------------------------------------------------------------

To change the relative time range of a dashboard or chart, click the Time Range selector and choose your desired time range from the menu that appears.

Type in a relative time range
-------------------------------------------------------------------

If you don't see your desired relative time range on the menu, you can type it into the Time Range selector field. Valid time units in SignalFx for time ranges are m (minute), h (hour), d (day), and w (week). For example, -4h (past 4 hours), or -2d13h30m (past 2 days, 13 hours and 30 mins).

To view data from a relative time window up to now, type the time unit preceded by a :strong:`-` (minus sign) into the Time Range selector. For example, if you want to see a metric from the last five minutes, click the Time Range selector and type :strong:`-5m`.

You can also view data from a relative time window up to some time before now using "start time to end time." For example, if you want to see a metric from between 1 and 3 minutes ago, click the Time Range selector and type :strong:`-3m to -1m`. The earlier time point must come first. In this example, typing :strong:`-1m to -3m` doesn't work.

The Time Range selector shows your most recently used custom time range under the heading "Recent".

.. _absolute-time-range:

Specify an absolute time range
=============================================================================

You can also view data from an absolute time window with a defined start and end time. Click on the Time Range selector and choose :guilabel:`Custom` from the menu. A custom Time Range selector appears. Choose the starting and ending date and time of your desired time range, then click :guilabel:`Apply` to show data for that time range only.
