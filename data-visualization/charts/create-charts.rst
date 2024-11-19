.. _create-charts:

*******************************************
Create charts in Splunk Observability Cloud
*******************************************

.. meta::
    :description: Plan and create charts in Splunk Observability Cloud

Splunk Observability Cloud provides a number of built-in dashboards for services you integrate with Splunk Observability Cloud. These dashboards have charts that track key metrics for integrated services. In many cases, you don't have to create any additional charts or dashboards. However, if you do need a chart that isn't included in a built-in dashboard, the following sections show you how to create a chart.

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

.. note::

    In some cases, you might want to create multiple charts for the same data displayed in different ways. One way to do that is to copy a chart then change the chart type after you paste it from the clipboard. Another way is to change the chart type and then use :guilabel:`Save as` to save it as a new chart, preferably with a new name. See :ref:`copy-charts` for more information.

The chart type you select is applied as a default to all the plots on the chart, but you can use different visualizations for individual plots. To learn more, see :ref:`plot-config-panel`.

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
