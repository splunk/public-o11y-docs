.. _create-charts:

*******************************************
Create charts in Splunk Observability Cloud
*******************************************

.. meta::
    :description: Plan and create charts in Splunk Observability Cloud

Splunk Observability Cloud provides a number of built-in dashboards for services you integrate with Splunk Observability Cloud. These dashboards have charts that track key metrics for integrated services. In many cases, you don't have to create any additional charts or dashboards. However, if you do need a chart that isn't included in a built-in dashboard, the following sections show you how to create a chart.

Before you create a chart, you need to have an idea of which metrics you want to track. Metrics appear on the chart as signals, which the documentation also refers to as plot lines or plots. If you are unfamiliar with the metrics available, see :ref:`view-dashboards` to see the metrics that your organization receives for your dashboards.

Also consider customizing the defaults for your charts. You can filter metrics to limit the data to specific hosts, or specify a different time range for the chart. You can return to customize chart features at any time.

.. _ways-to-create-charts:

Create a chart
==============

Once you have an initial plan for the metrics you want to display on your chart, there are various ways to create a chart, depending on your starting point.

.. note::
    You can't add charts to a built-in dashboard. For more information, see :ref:`built-in-dashboards`.

See the following table for different chart creation methods:

.. list-table::
  :header-rows: 1
  :widths: 30 70

  * - :strong:`Method`
    - :strong:`Description`
  * - Create a chart using the Metric Finder
    - Use this method to browse metrics and decide the metric you are interested in before creating a chart. To learn more, see :ref:`create-chart-metric-finder`.
  * - Create a chart using the metrics sidebar
    - Use this method to create a simple chart or add a new chart to an existing dashboard. To learn more, see :ref:`create-chart-metric-sidebar`.
  * - Copy a chart
    - Use this method to add a copy or move a chart to another dashboard. To learn more, see :ref:`copy-charts`.
  * - Create a chart using the Chart Builder
    - Use this method to create a more complex chart with customizations during the creation process. To learn more, see :ref:`create-chart-with-chart-builder`.
  * - Create a chart using the API
    - Use this method to programmatically create a chart instead of creating one through the user interface. To learn more, see :ref:`create-chart-via-api`.


.. _create-chart-metrics-finder:

Create a chart using the Metric Finder
------------------------------------------------

If you're not sure which metric you want to track, use the Metric Finder to browse different options before creating a new chart.

#. From the navigation menu, select :strong:`Metric Finder`. 
#. Search for metrics by entering key words into the search bar, or selecting an integration name.
#. Once you find the metric you're interested in, select the metric name to open the Chart Builder, pre-populated with your metric.

To learn more about using the Metric Finder, see :ref:`metric-finder`.

.. _create-chart-metric-sidebar:

Create a chart using the metrics sidebar
------------------------------------------------

To start creating a simple chart, use the metrics sidebar to find and select the metrics and events you want to display in your chart:

#. Open the metrics sidebar.

   * For an existing dashboard: Navigate to the existing dashboard and open it. Select the sidebar icon in the top right to open the metrics sidebar.
   * For a new dashboard: From the :strong:`Create` menu in the top, select :strong:`Dashboard`. Select :strong:`Browse metrics sidebar` to open the metrics sidebar.

#. On the :strong:`Metrics` tab, select :strong:`Find metrics` or :strong:`Find events`, depending what you want to plot in your chart.
#. Enter keywords into the search field. If a search keyword also matches metric metadata, such as a dimension name or property value, the metadata displays under the metric name. To add the metadata to your query as a filter, select the matching metadata or the :strong:`Filter` (+) icon. To exclude the metadata from your search results, select the :strong:`Exclude` (-) icon.
    .. note:: Hover over a metric or event name to display information about it.

Create charts with metrics
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Create a chart with a single metric:

    #. Select the check box next to the metric name.
    #. Select :strong:`Add chart`.

* Create a chart containing one plot for each metric:

    #. Select the check box next to each item you want to add. 
    #. Select :strong:`Add chart`.

* Create multiple charts, one for each metric:

    #. Select the check box next to each item you want to add.
    #. Select :strong:`Separate charts`.
    #. Select :strong:`Add charts`.

.. note:: Select :strong:`Add with filters` to add matching metadata from each metric result as filters to your chart.

Create charts with events
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Create a chart with a single event:

    #. Select the check box next to the event name.
    #. Select :strong:`Add chart`.

* Create a chart containing one plot for each event:

    #. Select the check box next to each item you want to add. 
    #. Select :strong:`Add single chart`.

* Create multiple charts, one for each event:

    #. Select the check box next to each item you want to add.
    #. Select :strong:`Multiple charts`.

.. _copy-charts:

Copy a chart
---------------

You can copy charts from one or multiple dashboards to a clipboard. You might want to use this technique for the following use cases:

* Pull some existing charts together in a new dashboard for troubleshooting.
* Copy charts from one dashboard to another.
* Move a chart from one dashboard to another; after copying a chart, delete the original chart.

.. _copy-chart-to-clipboard:

Follow these steps to copy a chart to a clipboard:

#. Open the dashboard containing the chart you want to copy.
#. In the dashboard view, open the :guilabel:`Chart actions` menu of the chart you want to copy.
#. Select :guilabel:`Copy`.
#. When you copy a chart, a counter on the :guilabel:`Create` icon on the navigation bar indicates how many charts you have copied to the clipboard.
#. To copy another chart to the clipboard, select :guilabel:`Chart actions > Add to clipboard` from a different chart, or select the :guilabel:`Add to clipboard` icon on another chart while in the dashboard view. The counter increments as you add additional charts.

Once you copy charts to the clipboard, several options from the :strong:`Create` menu let you paste the charts to another dashboard. Pasting charts clears the clipboard.

.. list-table::
  :header-rows: 1
  :widths: 30 70

  * - :strong:`Option`
    - :strong:`Description`
  * - Paste charts
    - Select this option to paste the charts into a dashboard you are viewing. You must have write permissions for the dashboard. See :ref:`about-permissions` for more detail.
  * - Dashboard with <n> copied charts
    - Select this option to create a new dashboard consisting of all the copied charts.
  * - Dashboard (unsaved)
    - If you see this option, you have already added charts to a new dashboard but haven't saved it. Select this option to open the unsaved dashboard. Select :strong:`Past charts` to add the copied charts to this dashboard.
  * - Clear clipboard
    - Select this option to clear the clipboard content without pasting charts to a dashboard.

.. _create-chart-with-chart-builder:

Create a new chart using the Chart Builder
------------------------------------------

#. In the :strong:`Create` menu on the top navigation bar, select :strong:`Chart`. Alternatively, select :guilabel:`New chart` on custom dashboards.
#. Search for metrics or events you want to plot on your chart. For more information, see :ref:`chart-builder`.
    
    .. note:: You can add functions to your chart with the :strong:`F(x)` column. See :ref:`plot-analytics` and :ref:`analytics-ref` for more details.

#. Customize your chart. See :ref:`chart-options-tab`.

.. _create-chart-via-api:

Create a chart using Splunk Observability Cloud API
---------------------------------------------------

If you prefer to work programmatically, see :new-page:`Display data using charts <https://dev.splunk.com/observability/docs/chartsdashboards/charts_overview/>` to create a chart with API.

.. _choose-chart-type:

Select a chart type
=======================

Available chart types are shown as icons in the chart's title bar. You can also select a chart type in the Chart Options tab. Hover over an icon to see which chart type it represents, then select an icon to display the chart in that format. The selected chart type is highlighted and indicated by a small pointer.


To learn more about different chart types, see :ref:`chart-types`.

.. note::

    In some cases, you might want to create multiple charts for the same data displayed in different ways. One way to do that is to copy a chart then change the chart type after you paste it from the clipboard. Another way is to change the chart type and then use :guilabel:`Save as` to save it as a new chart, preferably with a new name. See :ref:`copy-charts` for more information.

The chart type you select is applied as a default to all the plots on the chart, but you can use different visualizations for individual plots. To learn more, see :ref:`plot-config-panel`.

.. _save-chart:

Save a chart
============

#. When you finish creating or editing a chart, select :guilabel:`Save`, :guilabel:`Save as`, or :guilabel:`Save and close` from the :guilabel:`Chart actions` menu of the chart. The options vary depending on how you created or opened the chart.

    If you don't have write permissions for the dashboard you are viewing or if you are in a built-in dashboard, you have to use :guilabel:`Save as` to save the chart to another dashboard.

#. Select :guilabel:`Close`.

.. note::

    Closing a chart doesn't prompt you to save changes. You must save your changes before closing, or unsaved changes will be lost.

Edit a chart
============

To edit a chart, open it from any dashboard or the :strong:`Dashboard` panel of a navigator.

 .. note:: If you don't have write permissions for the dashboard containing the chart or if you are in a built-in dashboard, you have to use :guilabel:`Save as` to save the edited chart to another dashboard.


