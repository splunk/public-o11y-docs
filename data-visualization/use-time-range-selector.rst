.. _time-range-selector:

*****************************************************************
Override default time range with the Time Range Selector
*****************************************************************

.. meta::
   :description: The Time Range selector is located at the top right of dashboards and charts, and in the Chart Options tab. By default, Splunk Infrastructure Monitoring chooses the best time range based on the characteristics of the chart's data. However, you can use the Time Range selector to override the default for all charts in a dashboard. 

The Time Range selector is located at the top right of dashboards and charts. It is also available to specify a chart's :ref:`default time range<default-time>` in the Chart Options tab. By default, Splunk Infrastructure Monitoring chooses the best time range for a chart based on the characteristics of the data that it shows. However, you can use the Time Range selector to :ref:`override the default<dashboard-time-range>` for all charts in a dashboard. The Time Range selector supports both relative and absolute time ranges.


.. include:: /includes/data-viz/timepicker

.. _panning:

Pan through time ranges
=============================================================================

When you look at a chart on a dashboard or in the Chart Builder, you can hover over the lower left corner to display panning controls. Initially, you can only see the control for panning back in time. Once you pan back in time, you can see controls for panning back and forward.

Clicking one of these controls changes the time range to an absolute time range, changing by 2/3 of an increment each time you click the control; for example, if you pan backwards, the last third of the panned chart overlaps the first third of the original chart.

In the following illustration, the current time is approximately 4:55 |nbsp| PM (16:55) and the chart is displaying data for the last 1 |nbsp| hour, starting at 15:55. Panning back once displays a time range starting at approximately 15:15, 40 minutes prior to 15:55.

.. image:: /_images/images-ui/panning.png
      :width: 99%
      :alt: This image shows an example of what panning through time ranges looks like.

