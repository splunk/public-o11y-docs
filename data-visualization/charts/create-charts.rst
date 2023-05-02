.. _create-charts:

*******************************************
Create charts in Splunk Observability Cloud
*******************************************

.. meta::
    :description: Plan and create charts in Splunk Observability Cloud

Splunk Observability Cloud provides a number of built-in dashboards for services you integrate with Observability Cloud. These dashboards have charts that track key metrics for integrated services. In many cases, you don't have to create any additional charts or dashboards. However, if you do need a chart that isn't included in a built-in dashboard, the following sections show you how to create a chart.

Before you create a chart, you need to have an idea of which metrics you want to track. Metrics appear on the chart as signals, which the documentation also refers to as plot lines or plots. If you are unfamiliar with the metrics available, see :ref:`view-dashboards` to see the metrics that your organization receives for your dashboards.

Also consider customizing the defaults for your charts. You can filter metrics to limit the data to specific hosts, or specify a different time range for the chart. You can return to customize chart features at any time.

.. note::

    Instead of displaying metrics on a chart, you can also:

    - Create a chart that contains a text note. See :ref:`text-note`. Use this feature to add documentation and guidance to a dashboard, because the text 
      chart appears as one of the charts in the dashboard.
    - Create a chart that contains events (an event feed). See :ref:`dashboard-event-feed`
    - Overlay events on a chart that already displays metrics. See :ref:`chart-events`.
    - Link a detector to a chart and display its alert status on the chart. See :ref:`linking-detectors`.


.. _ways-to-create-charts:

Create a chart
==============

Once you have an initial plan for the metrics you want to display on your chart, there are various ways to create a chart, depending on your starting point.

.. note::
    You can't add charts to a built-in dashboard. For more information, see :ref:`built-in-dashboards`.

- To create one or more simple charts on a new or existing dashboard, see :ref:`simple-charts-dashboards`. This technique is also a good choice if you want to see what metrics are available, because you can see them in the |ms|.

- To copy charts you see on a dashboard to a new or existing dashboard, see :ref:`copy-charts`.

- To copy charts you are viewing in the Chart Builder, use the :guilabel:`Save As` option (see :ref:`save-chart`), change the name as desired, and choose the dashboard where you want to place the copied chart. If you have edited the chart, those changes will be reflected in the copied chart.

- To create a chart based on a metric you have found in the Metadata Catalog, see :ref:`create-chart-from-catalog`.

- To build a chart from scratch, see :ref:`create-chart-with-chart-builder`.

- To programmatically create a chart instead of creating one through the user interface, see :ref:`create-chart-via-api`.


.. _copy-charts:

Copy charts
-----------

You can copy charts from one or multiple dashboards to a clipboard. This technique is useful if you are troubleshooting an issue and want to pull some existing charts together to view on a new dashboard (see :ref:`create-dashboard`), or if you want to copy charts from one dashboard to another.

You can also use this method to "move" a chart from one dashboard to another; after copying a chart, delete the original chart.

.. _copy-chart-to-clipboard:

Follow these steps to copy charts to a clipboard:

#. To start, open the dashboard containing the chart you want to copy. Staying in the dashboard view, select :guilabel:`Copy` from the :guilabel:`Chart actions` drop-down menu of the chart you want to copy. You have to be in dashboard view to see the Copy option.
#. When you copy a chart, a counter on the :guilabel:`Create` icon on the navigation bar indicates how many charts you have copied to the clipboard.
#. To copy another chart to the clipboard, select :guilabel:`Chart actions > Add to Clipboard` from a different chart, or select the :guilabel:`Add to clipboard` icon on another chart while in the dashboard view. The counter increments as you add additional charts.

Different options on the Create menu let you paste the charts onto a dashboard. Pasting charts clears the clipboard.

- To paste the charts into a dashboard you are viewing, select :guilabel:`Paste Charts` from the :guilabel:`Create` menu. You must have write permissions for the dashboard. See :ref:`about-permissions` for more detail.

- If you see :guilabel:`Dashboard with <n> copied charts` on the Create menu, select that option to create a new, unsaved dashboard and paste the charts into it.

- If you see :guilabel:`Dashboard (unsaved)` on the Create menu, you have already added charts to a new dashboard and haven't saved the dashboard yet. Select this option to open the unsaved dashboard, then select :guilabel:`Paste Charts`.

To clear the clipboard contents without pasting the charts to a dashboard, select :guilabel:`Clear Clipboard` from the Create menu.

.. _create-chart-with-chart-builder:

Create a new chart using the Chart Builder
------------------------------------------

#. Select :guilabel:`Chart` from the :guilabel:`Create` menu. Alternatively, you can select :guilabel:`New Chart` on custom dashboards.
#. Search for metrics or events you want to plot on your chart. For more information, see :ref:`chart-builder`.
    
    .. note:: You can add functions to your chart with the :strong:`F(x)` column. See :ref:`plot-analytics` and :ref:`analytics-ref` for more details.
#. Customize your chart. See :ref:`chart-options-tab`.

See also :ref:`choose-chart-type`.

.. _create-chart-from-finder:

Create a chart from the Metric Finder
-------------------------------------
Use the Metric Finder to find the metric you want to track. From the results page, select the metric name to open the Chart Builder, pre-populated with your metric.

See also :ref:`choose-chart-type`.

.. _create-chart-from-catalog:

Create a chart from the Metadata Catalog
----------------------------------------

You can also create a chart from the Metadata Catalog. Select a metric from the list in the sidebar, then select :guilabel:`View in Chart` in the preview pane to open the Chart Builder, pre-populated with your metric.

See also :ref:`choose-chart-type`.

.. _create-chart-via-api:

Create a chart using Splunk Observability Cloud API
---------------------------------------------------

If you prefer to work programmatically, see :new-page:`Display Data Using Charts <https://dev.splunk.com/observability/docs/chartsdashboards/charts_overview/>` to create a chart with API.

.. _choose-chart-type:

Select a chart type
===================

Available chart types are shown as icons in the chart's title bar. You can also select a chart type in the Chart Options tab. Hover over an icon to see which chart type it represents, then select an icon to display the chart in that format. The selected chart type is highlighted and indicated by a small pointer.

To learn more about different chart types, see :ref:`chart-types`.

See the following sections for more information on when to use each type of chart:

- :ref:`graph-chart-type`.

- :ref:`list-chart-type`.

- :ref:`single-value-chart-type`.

- :ref:`heatmap-chart-type`.

- :ref:`event-feed-chart-type`.

- :ref:`text-chart-type`.

- :ref:`table-chart-type`.

.. note::

    In some cases, you might want to create multiple charts for the same data displayed in different ways. One way to do that is to copy a chart then change the chart type after you paste it from the clipboard. Another way is to change the chart type and then use :guilabel:`Save as` to save it as a new chart, preferably with a new name. See :ref:`copy-charts` for more information.

.. _graph-chart-type:

Use graph charts
----------------

Use graph charts when you want to display data points over a period of time. To learn more about graph charts, see :ref:`graph-charts`.

The first four icons in the chart's title bar represent the four visualization options for graph charts:

- Line: To learn more about line visualization, see :ref:`line-charts`.

  .. image:: /_images/data-visualization/charts/line-chart.png
     :alt: This screenshot shows a line chart illustrating the CPU percentages used for a set of AWS EC2 instances.

- Area: To learn more about area visualization, see :ref:`area-charts`.

  .. image:: /_images/data-visualization/charts/area-chart.png
     :alt: This screenshot shows an area chart illustrating the CPU percentages used for a set of AWS EC2 instances.

- Column: To learn more about column visualization, see :ref:`column-charts`.

  .. image:: /_images/data-visualization/charts/column-chart.png
     :alt: This screenshot shows a column chart illustrating CPU percentages used for a set of AWS EC2 instances.

- Histogram: To learn more about histogram visualization, see :ref:`histogram-charts`.

  .. image:: /_images/data-visualization/charts/histogram-chart.png
     :alt: This screenshot shows a histogram chart illustrating CPU percentages used for a set of AWS EC2 instances.

The chart type you choose here is applied as a default to all the plots on the chart, but you can choose a different visualization type for individual plots. See :ref:`plot-config-panel`.

To customize a chart, see :ref:`chart-options-tab`.

.. _single-value-chart-type:

Use single value charts
-----------------------

Choose this chart type when you want to see a single number in a large font that represents the current value of a single data point on a plot line. If the time period is in the past, the number represents the value of the metric near the end of the time period.

  .. image:: /_images/data-visualization/charts/single-value-chart.png
     :alt: This screenshot shows a single value chart illustrating the number of hosts with the Splunk Distribution of OpenTelemetry Collector installed.

.. caution::

   To display an accurate value, the plot must use an aggregate analytics function that generates a single value for each data point on the chart, such as Mean, Sum, Max, and so on. If the plot line always reflects only a single time series, no analytics function is needed. However, this is uncommon.

   If the plot line on the chart shows multiple values, that is one line per metric time series (MTS) when viewed as a line chart, the single number displayed on the chart might represent any of the values for a given point in time.


.. note::

    If multiple plots are marked as visible, the value represents the first visible plot in the list. For example, if plots |nbsp| A and |nbsp| B are visible, the value represents plot |nbsp| A. If you hide plot |nbsp| A, the value represents plot |nbsp| B.

To learn more about single value charts, see :ref:`single-value-charts`.

To customize a chart, see :ref:`chart-options-tab`. An especially useful option for this chart type is :ref:`color-value`, which lets you use different colors to represent different value ranges.

.. _heatmap-chart-type:

Use heatmap charts
------------------

Use heatmap charts when you want to see the specified plot in a format similar to the navigator view in Infrastructure Monitoring, with squares representing each source for the selected metric, and the color of each square representing the value range of the metric.

  .. image:: /_images/data-visualization/charts/heatmap-chart.png
     :alt: This screenshot shows a heatmap chart illustrating the CPU capacity used by each node in a Kubernetes cluster.

To learn more about heatmap charts, see :ref:`heatmap-charts`.

To customize a chart, see :ref:`chart-options-tab`.


.. _list-chart-type:

Use list charts
---------------

Use this chart type to display current data values in a list format. By default, the name of each value in the chart reflects the name of the plot and any associated analytics. To avoid having the raw metric name displayed on the chart, give the plot a meaningful name.

  .. image:: /_images/data-visualization/charts/list-chart.png
     :alt: This screenshot shows a list chart illustrating the number of active hosts per AWS EC2 instance type.

To learn more about list charts, see :ref:`list-charts`.

To customize the information shown in the list, see :ref:`chart-options-tab`.


.. _event-feed-chart-type:

Use event feed charts
---------------------

Use this chart type when you want to see a list of events on your dashboard.

  .. image:: /_images/data-visualization/charts/event-feed-chart.png
     :alt: This screenshot shows an event feed chart illustrating a series of cleared, critical, and custom events.

To learn more about event feed charts, see :ref:`event-feed-charts`.

To customize the information shown in the feed, see :ref:`dashboard-event-feed`.


.. _text-chart-type:

Use text charts
---------------

Use text charts when you want to place a text note on the dashboard instead of displaying metrics.

  .. image:: /_images/data-visualization/charts/text-chart.png
     :alt: This screenshot shows a text chart illustrating how you can this chart type to provide relevant instructional text on a dashboard.

To learn more about text charts, see :ref:`text-charts`.

See also :ref:`text-note`.


.. _table-chart-type:

Use table charts
------------------------------

A table chart displays metrics and dimensions in table format. Each metric name and dimension key displays as a column. Each output metric time series displays as a row. If there are multiple values for a cell, each time series displays in a separate row.

.. image:: /_images/data-visualization/charts/table-chart.png
   :alt: This screenshot shows a table chart grouped by the demo_host dimension, sorted by the demo_customer dimension, and linked to a detector with no alerts as illustrated by a green border around the table chart.

You can group metric time series rows by a dimension. To do this, select the :strong:`Group by` menu and select the dimension you want to group the rows by. The selected dimension’s column becomes the first column and each row of the table displays to represent one value of the dimension.

For example, group the table by the :code:`host` dimension to display the health and status of each host in your environment.

If you choose to group by a dimension column that you've hidden, the column displays to accomplish the requested grouping.

After using the :strong:`Group by` option to group the table, there might still be more than one row per dimension value. This can happen if there are multiple values for a column per grouping dimension value. To resolve this, you can apply aggregation analytics to plots.

For more information about aggregation, see :ref:`aggregations-transformations`.

If there are missing data values for a table cell, the cell displays no value.

Here are some additional ways in which you can customize a table chart to best visualize your data:

- Reorder a dimension column

  Select and drag the column header to move the column to its new position. You can't reorder metric columns.

- Show or hide a column

   - In graphical Plot Editor view, select the gear icon near the upper right of the table. In the :strong:`SHOW/HIDE COLUMNS` section, select the column name to switch between showing and hiding the column.

   - In SignalFlow Plot Editor view:

      - To hide a metric column, comment it out by adding a :code:`#` to the start of the metric's line of SignalFlow code. Alternatively, you can remove the metric.

      - To show or hide a dimension column, select the gear icon near the upper right of the table. In the :strong:`SHOW/HIDE COLUMNS` section, select the dimension column name to switch between showing and hiding the column.

- Sort table values

  Select a column header to switch between sorting by ascending and descending order. An arrow icon displays in the column header to indicate the sort order.

- Link a detector to the table chart

  Select the :strong:`Alerts` icon (bell) near the upper right of the Chart Builder. Select :strong:`Link detector` to link the table chart to an existing detector. Select :strong:`New Detector From Chart` to create a new detector to link the table chart to.

  For more information about creating a new detector from a chart, see :ref:`create-detector-from-chart`.

  A chart that is linked to a detector displays with a border color that corresponds to the alert status of the linked detector. For example, if there are no alerts issued by the detector, the chart displays with a green border. The chart displays alerts in the chart header, but doesn't display alert status per row.

For more information about customizing charts, see :ref:`chart-options-tab`.


Edit a chart
============

To edit a chart, open it from any dashboard or the Dashboard panel of a navigator. Editing a chart is essentially identical to building a chart. See :ref:`chart-builder`.

If you don't have write permissions for the dashboard containing the chart, or you are in a built-in dashboard, you have to use :guilabel:`Save as` to save the edited chart.

.. _save-chart:

Save a chart
============

When you finish creating or editing a chart, select :guilabel:`Save`, :guilabel:`Save as`, or :guilabel:`Save and close` from the :guilabel:`Chart actions` drop-down menu of the chart. The button text varies depending on how you created or opened the chart. If the button is not labeled with the option you want, you can select other options from the :guilabel:`Chart actions` menu.

If you don't have write permissions for the dashboard you are viewing, or you are in a built-in dashboard, you can't see an option to save the chart. Instead, you have to use :guilabel:`Save as` to save the chart.

If you don't want to save your changes, select :guilabel:`Close`.

.. note::

    If you select :guilabel:`Close`, you will not be prompted to save the chart, even if you have made some changes. Any unsaved changes will be lost.
