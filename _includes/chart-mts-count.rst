:orphan:


.. _chart-mts-count:

*****************************************************************
Maximum number of metric time series processed in a signal
*****************************************************************

To maximize responsiveness when processing incoming metric data, Splunk Observability Cloud limits the number of :term:`metric time series` (MTS) processed in a signal
(single plot line) on a chart or detector. If the total number of time series for the metric specified in your signal exceeds this limit, Observability Cloud displays
an orange border around the MTS number. This border notifies you that the processed data reflects only a subset of the time series in the data.

To ensure that your charts and detectors are processing all the time series in the data, apply as many filters as necessary to make the MTS number less than the maximum.
You'll know you've succeeded when the orange outline around the MTS number and the message at the top of the chart or detector no longer appear.

For example, suppose you want to display the sum of available disk capacity per availability zone. You might use ``df.complex.free`` as your signal,
then apply the Sum analytics function, grouped by availability zone. If you have a large number of disks, the number of MTS returned by this signal might
exceed the limit. To reduce the number of MTS, use filters and multiple plots instead of the group-by option in the Sum analytics function.

To use filters and multiple plots instead of the group-by option, follow these steps:

#. Apply a filter for the plot that selects a single availability zone, then use the Sum analytic function without the group-by option.
#. At the end of the plot row, select :guilabel:`Configure plot` to open :guilabel:`Visualization Options`, then select a color from :guilabel:`Plot Color`.
#. Clone the plot. To do this, open the :guilabel:`plot actions` menu at the end of the plot row in the :guilabel:`Plot Editor`,
   then select :menuselection:`Clone`.
#. In the cloned plot, change the availability zone filter to select another availability zone, and change the :guilabel:`Plot Color` to give the cloned
   plot a color that's different from the original plot.
#. Continue to clone plots, change the availability zone filter, and change the plot color until you have one plot for each availability zone.

The result is one chart with a separate plot line for each availability zone. Each plot line has a distinct color.

For more information on filtering, see :ref:`filter-signal`.
