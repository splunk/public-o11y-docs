:orphan:


.. _chart-mts-count:

*****************************************************************
Maximum Number of Metric Time Series Processed in a Signal
*****************************************************************

To maximize responsiveness when processing incoming metric data, Splunk Observability Cloud limits the number of :term:`metric time series` (MTS) processed in a signal
(single plot line) on a chart or detector. If the total number of time series for the metric specified in your signal exceeds this limit, Observability Cloud displays
an orange border around the MTS number. This border notifies you that the processed data reflects only a subset of the time series in the data.

To ensure that your charts and detectors are processing all the time series in the data , apply as many filters as necessary to bring the MTS number below the maximum.
You’ll know you’ve succeeded when the orange outline around the MTS number disappears and the message at the top of the chart or detector no longer appears.

For example, suppose you want to display the sum of available disk capacity per availability zone. You might choose ``df.complex.free`` as your signal,
then apply the Sum analytics function, grouped by availability zone. If you have a very large number of disks, the number of MTS returned by this signal might
exceed the limit. To reduce the number of MTS, use filters and multiple plots instead of the group |hyph| by option in the Sum analytics function.

To do this, apply a filter for the plot that selects a single availability zone, and apply the Sum analytic without a group |hyph| by option. Next, clone this plot
and change the filter to reflect a different availability zone. (To clone a plot line, open the plot's Actions menu at the far right of the plot line, then select
:menuselection:`Clone`). Create one plot line for each availability zone. The result is one chart with a separate plot line for each availability zone.

For more information on filtering, see :ref:`filter-signal`.
