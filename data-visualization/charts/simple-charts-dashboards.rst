.. _simple-charts-dashboards:

***********************************************************************
Create simple charts using Splunk Observability Cloud
***********************************************************************

.. meta::
   :description: Splunk Observability Cloud makes it easy for you to quickly add simple charts to a new or existing dashboard. For example, you might want to put together a new draft dashboard with simple charts to share with others. If you're troubleshooting a problem, you can add charts for various metrics to a dashboard, share it with others, then close it without even saving it.

This topic describes how to create simple charts to add to a new or existing dashboard.

For example, you can create a new draft dashboard and add one or more simple charts to it. You can then :ref:`share the chart <sharing-a-chart>` on the draft dashboard with others. If you want to continue using the charts on the draft dashboard, you can save the dashboard. Or, if you no longer need the charts, you can just clear the draft dashboard without saving.

You can also add simple charts to existing dashboards that you have write permissions for.

For information about developing more complex charts, see :ref:`create-charts`.


.. _finding-metrics-and-events:
.. _use-metrics-sidebar:

Find metrics and events to add to a simple chart
=============================================================================

To start creating a simple chart, use the Metrics Sidebar to find and select the metrics and events you want to display in your chart.

-  To add a new chart to an existing dashboard, open the dashboard. Click the sidebar icon in the top right to open the Metrics Sidebar, if it isn't already open.

-  To add a new chart to a new dashboard, open the navigation :strong:`Menu` and select :strong:`Dashboard`. Open the :strong:`Create` menu (+) in the top right and select :strong:`Dashboard`. Click :strong:`Browse Metrics Sidebar` in the new chart placeholder section to open the Metrics Sidebar.

To search for a metric to display in a chart, select the :strong:`Find Metrics` option, enter one or more keywords in the search field, and click the search icon or press Enter. To search for an event to display in a chart, select the :strong:`Find Events` option instead.

If a search keyword also matches metric metadata, such as a dimension name or property value, the metadata displays under the metric name. Click the matching metadata, or the :strong:`Filter` (+) icon, to add it to your search as a filter. To exclude the metadata from your search results, click the :strong:`Exclude` (-) icon.

Hover over a metric or event name to display information about it. For example, when you hover over a metric name, you can see the metric name, its description, the time it was created, its type, and the number of time series that it reports (filtered by any filters that have been applied to your search query).

For general guidance on how to browse and search for metrics, see :ref:`metric-finder`.


.. _creating-charts:

Create a simple chart
=============================================================================

After you've found one or more metrics or events that you want to add to your chart, you have the following options.


Add metrics to a simple chart
-------------------------------------

On the :strong:`Metrics` tab in the Metrics Sidebar, select the :strong:`Find Metrics` option.

-  To add a chart for a single metric, click the metric name.

-  To add a single chart containing one plot for each metric:

    - Select the checkbox next to each item; you can also click :strong:`Select All`.
    - Click :strong:`Add Chart`.

-  To add multiple charts to the dashboard, one for each metric:

    - Select the checkbox next to each item; you can also click :strong:`Select all`.
    - Select the :strong:`Separate charts` option.
    - Click :strong:`Add charts`.

-  To add active filters and matching metadata from each metric result to a chart as a filter:

    - Select the checkbox next to each item; you can also click :strong:`Select all`.
    - Select the :strong:`Add with filters` option.
    - Click :strong:`Add Chart`.


Add events to a simple chart
-------------------------------------

On the :strong:`Metrics` tab in the Metrics Sidebar, select the :strong:`Find Events` option.

-  To add a chart for a single event, click the event name.

-  To add a single chart containing one plot for each event:

    - Select the checkbox next to each item; you can also click :strong:`Select All`.
    - Click :strong:`Add Single Chart`.

-  To add multiple charts to the dashboard, one for each event:

    - Select the checkbox next to each item; you can also click :strong:`Select all`.
    - Click :strong:`Multiple Charts`.

.. note:: New charts are always added to the bottom of a dashboard. Depending on the number of charts on your dashboard, you might need to scroll to see a chart you've just added. Hover over the top edge of a chart in a dashboard to display a control that enables you to move the chart. You can also resize a chart by clicking and dragging the corners or the side and bottom edges.


.. _new-dashboard-next-steps:

Save, share, or clear charts
=============================================================================

After adding charts to a new dashboard, you have several options:

-  Share the charts.

   If other people are interested in seeing your charts, such as for troubleshooting an issue, you can share the charts, or the entire dashboard, without having to save the dashboard.

   To share a chart, open the :strong:`Chart actions` menu by clicking the |more| icon in the top right of a chart and select :strong:`Share`.

   For more details about sharing charts, see :ref:`sharing-a-chart`.

   To share the dashboard, open the :strong:`Dashboard actions` menu by clicking the |more| icon in the top right of the dashboard and select :strong:`Share`.

-  Save the dashboard.

   If you created a set of charts you want to refer to in the future, save the dashboard.

   To save the dashboard, open the :strong:`Dashboard actions` menu by clicking the |more| icon in the top right of the dashboard and select :strong:`Save As...`. Enter a dashboard name and the dashboard group you want to save the dashboard to. You can save the dashboard to an existing custom or user dashboard group, or you can create a new dashboard group. If you create a new dashboard group, the group is added as a Custom Dashboard group. For information about dashboard group types, see :ref:`dashboard-basics`.

-  Clear the charts.

   When you are done working with an unsaved dashboard and don't need the charts anymore, click :strong:`Clear` to remove all charts and return the dashboard to an empty state.

-  Exit the dashboard without saving it.

   If needed, you can navigate away from your charts and dashboard without saving them. The charts and dashboard are kept as an unsaved dashboard.

   To navigate back to your unsaved dashboard, access the Dashboards page, open the :strong:`Create` (+) menu, and click :strong:`Dashboard (unsaved)`. The unsaved dashboard is also accessible from your list of :strong:`Recent` dashboards at the top of the Dashboards page.


Next steps
=============================================================================

- To find your metrics quickly and easily, consider using the full-featured :ref:`Metric Finder<metric-finder>`.

- To learn how to modify and configure charts, including applying additional analytics functions to make them more informative, see :ref:`chart-builder` and :ref:`gain-insights-through-chart-analytics`.

- To learn how to create an event feed chart, see :ref:`dashboard-event-feed`.
