.. _view-dashboards:

************************************************
View dashboards in Splunk Observability Cloud
************************************************

.. meta::
      :description: View and rearrange dashboards and dashboard groups, understand data points on charts, and troubleshoot, download, or take actions on your charts in Splunk Observability Cloud. 

This document describes how to view dashboards and dashboard groups, as well as how to adjust your view once you are in a dashboard group or dashboard. It also covers how to create a list of your favorite dashboards for easy access.

.. _viewing-dashboards:

View dashboards and dashboard groups
=======================================

The Dashboards page displays built-in, custom, and user dashboard groups. For more information about these dashboard group types, see :ref:`dashboard-basics`.

To access the Dashboards page, in the navigation menu, click :strong:`Dashboards`.

At the top of the page you can see a list of your :ref:`favorite dashboards<db-favorite>`, your recently viewed dashboards, including any Unsaved dashboards, and the dashboards in your user dashboard group. If you have joined :ref:`teams<admin-manage-teams>` in your organization, a tab for each team also displays.

- To see all the dashboard groups of a particular type, scroll to the dashboard group type section and expand it. Alternatively, you can also click a dashboard group type link in the upper right of the screen. Select from :strong:`Built-in`, :strong:`Custom`, and :strong:`User`.

- To see the list of dashboards in a specific dashboard group, click the dashboard group name.

- To see the list of dashboards in every group, click :strong:`Expand all groups` to the right of the search field.


.. _view-full-screen:

View dashboards in fullscreen mode
=====================================

Observability Cloud offers a fullscreen mode for dashboards. Fullscreen mode is a space-optimized display for displaying your metric data on a TV or other device.

To display a dashboard in fullscreen mode, open the :strong:`Dashboard actions` menu and select :strong:`View Fullscreen`.

To exit fullscreen mode, press the Esc key.

While in fullscreen mode, Observability Cloud resizes available dashboard charts in an attempt to fill the screen based on the maximum number of rows in the dashboard. It also removes any extraneous whitespace and controls typically not needed when the dashboard is passively viewed.

The minimum size allowed for a chart is 160 pixels vertically. For common resolutions, this means the following when in fullscreen mode:


.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Resolution`
     - :strong:`Maximum rows`
   
   * - 3840 x 2160
     - 13
 
   * - 2560 x 1600
     - 9
      
   * - 2560 x 1440
     - 8
    
   * - 1920 x 1080
     - 6
    
   * - 1440 x 900
     - 5
   
   * - 1280 x 720
     - 4

.. _work-with-charts:

Work with charts on a dashboard
==================================

To resize a chart, click and drag its corners or its left, right, and bottom edges.

To move a chart, click and drag along its top edge.

If you don't have write permissions for the dashboard, or if the dashboard is a built-in dashboard, you must save a copy of the dashboard before you can resize or move its charts. To save a copy, open the :strong:`Dashboard actions` menu and click :strong:`Save as`. To learn more, see :ref:`about-permissions`.

..
  ref broken for now bc page that includes the label is also in the process of being migrated. resolve once both pages are merged to trangl-POR-7413-migrate-custom-content.

To create a detector based on the chart, click the :strong:`Get Alerts` icon. For more information, see :ref:`create-detector-from-chart`.

.. _dl-export:

..
  refs broken for now bc pages that include the labels are also in the process of being migrated. resolve once pages are merged to trangl-POR-7413-migrate-custom-content.

From the :strong:`Chart actions` menu, you can perform the following tasks:

* Select :strong:`Open` to open the individual chart.

* Select :strong:`Copy` if you want to paste your logs chart elsewhere for further examination. For more information, see :ref:`copy-charts`.

* Select :strong:`Share` to share a chart with team members or members of other teams who have permissions to view the chart. For more information, see :ref:`sharing-a-chart`.

* Select :strong:`Info` to see which user added and last updated the logs chart.

* Select :strong:`Download chart as image` to download your logs chart as a PNG file.

* Select :strong:`Export Chart as CSV` to export data from a chart to a CSV file.

* Select :strong:`Export Events as JSON` to export the contents of an event feed chart to a JSON file. For more information, see :ref:`dashboard-event-feed`.

* Select :strong:`Troubleshoot from this Time Window (APM)` to explore related data in Splunk APM. (This option only exists if APM contains data related to data in the logs chart.)

* Select :strong:`Troubleshoot from this Time Window (RUM)` to explore related data in Splunk RUM. (This option only exists if RUM contains data related to data in the logs chart.)

* Select :strong:`Delete` to remove your logs chart from the dashboard. Deleting it from the dashboard does not impact the query you used to create your logs chart in Log Observer.

Not all actions are available for all chart types.


View chart data point details
================================

To view information about a data point in a chart in a dashboard, hover over the data point.

If there are event markers in the chart, you can hover over a marker to see the event count in that time window, grouped by severity.

.. _show-data-table:

View the Data Table tab
--------------------------
..
  ref broken for now bc page that includes the label is also in the process of being migrated. resolve once both pages are merged to trangl-POR-7413-migrate-custom-content.

When you click a data point in a chart, information related to metrics displays on the :strong:`Data Table` tab. When you hover over different areas of the chart, values in the :strong:`Value` column update to reflect the values for the data point your mouse is hovering over. This enables you to compare those values against the pinned values. For more information, see :ref:`data-table`.

You can export the chart contents as a CSV file. To do this, open the :strong:`Options` menu on the :strong:`Data Table` tab and click :strong:`Export as CSV`. The most recent 100 data points are exported, along with the values of the dimensions associated with them.

..
  ref broken for now bc page that includes the label is also in the process of being migrated. resolve once both pages are merged to trangl-POR-7413-migrate-custom-content.

If you edited a :ref:`plot name <plot-name>` or specified :ref:`display units <plot-display-units>` in the Chart Builder, this information displays when you hover over the chart and on the :strong:`Data Table` tab. For example, instead of seeing ``250`` as a value, you might see ``250 ms`` (where you specified ``ms`` as a suffix) or ``$250/hour`` (where you specified ``$`` as a prefix and ``/hour`` as a suffix).

..
  ref broken for now bc page that includes the label is also in the process of being migrated. resolve once both pages are merged to trangl-POR-7413-migrate-custom-content.

As you hover over dimensions on the :strong:`Data Table` tab, an :strong:`Actions menu` (|more|) icon displays. Menu options let you add a filter to the chart's :strong:`Overrides` bar based on the value of the dimension. For more information, see :ref:`filter-from-data-table` and :ref:`navigate-with-data-links`.


View the Events tab
----------------------

Information about nearby events is shown on the :strong:`Events` tab. For more information, see :ref:`event-markers`.

..
  ref broken for now bc page that includes the label is also in the process of being migrated. resolve once both pages are merged to trangl-POR-7413-migrate-custom-content.

You can also add an event from the :strong:`Event` tab's :strong:`Actions` menu. For more information, see :ref:`chart-manual-events`.


.. _dashboard-rearrange:

Rearrange dashboards in a dashboard group
============================================

To rearrange dashboards in a dashboard group, you must have write permissions for the dashboard group. To learn more, see :ref:`about-permissions`.

When viewing a dashboard, you can click and drag a dashboard tab to change its position within the group.

When viewing a list of dashboards in a dashboard group on the Dashboards page, you can click and drag a dashboard link to change its position within the list.


.. _db-favorite:

Use the Favorites dashboard list
===================================

Add dashboards to your :strong:`Favorites` dashboard list to be able to quickly access the dashboards you use most often. Your :strong:`Favorites` dashboard list displays at the top of the Dashboards page.

To add a dashboard to your :strong:`Favorites`, hover over the dashboard name on the Dashboards page or the dashboard tab and click the grey star that displays. The star turns blue.

To remove a dashboard from your :strong:`Favorites`, hover over the dashboard name on the Dashboards page or the dashboard tab and click the blue star. The star turns grey.
