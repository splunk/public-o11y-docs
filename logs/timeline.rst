.. _logs-timeline:

*****************************************************************
View overall system health using Timeline
*****************************************************************

.. meta::
  :description: Log Observer Timeline displays a histogram chart of logged events over time, grouped by values of the “message” field. See the spread of error severity levels.

The Log Observer Timeline displays a histogram of logged events over time, grouped by values of the message field ``severity``. Note that Log Observer Connect has no default aggregation. You can change Log Observer's default aggregation by changing the value in the :strong:`Group by` field. To learn more, see :new-page-ref:`logs-aggregations`.

These features help you use the Timeline to review the health of your systems:

*  Review the histogram to see the spread of error severity levels.

   * The histogram displays severity values in time intervals (histogram buckets).
     The logs processor service extracts these severity values from the
     incoming data. Each histogram interval shows a stacked column of severity values, and each value has a unique color. To identify each value in a column by color, use the Timeline legend.

*  Adjust the time picker in the top left.

   To adjust the duration of each histogram bucket, use the time picker.

   * The Live Tail option doesn't display a histogram. Use filtering or keyword highlighting to
     review incoming log records. To learn more, see :new-page-ref:`logs-live-tail`.
   * Other options display histograms over a previous time period. Log Observer calculates the time intervals for each
     histogram bucket. The duration of each interval appears in the control bar.
   * To display a histogram for a specific time period, use the :menuselection:`Custom Time` option.
   * By default, the time period for the histogram is :menuselection:`Last 5 minutes`, which displays buckets for
     the last 5 minutes of log data. In the preceding example, there are 10,306 log events, and the
     time interval for the histogram buckets is 10 seconds.

*  Highlight buckets in the Timeline to narrow the time period. Log Observer drills down into the portion you highlight,
   and the histogram shows results in the new time period. To highlight buckets, do the following:

   #. Click anywhere in the Timeline and drag to surround the time interval on which you want to zoom in.
      
   #. To accept your selection, click :guilabel:`Filter to selection`. Log Observer recalculates the time period and
      the histogram buckets and displays the result.



