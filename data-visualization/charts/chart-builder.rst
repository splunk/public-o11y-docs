.. _chart-builder:

*******************************************************************************
Plot metrics and events using Chart Builder in Splunk Observability Cloud
*******************************************************************************

.. meta::
  :description: This document describes how to use the Chart Builder to display metric data and events on charts. Charts are made up of signals (metrics and events) that can be displayed in various ways. Types of charts available include line, area, column, histogram, single value, heatmap, list, event feed, and text note.

Charts are highly customizable. This topic describes how to use Chart Builder's tools and options to customize your charts to display signals (metrics and events) in an intuitive and compelling way.

.. note:: Use the Chart Builder only if you are already familiar with Splunk Observability Cloud charts and are ready to dive into its more advanced features. For a simpler approach to creating charts, see :ref:`simple-charts-dashboards`.

If you are editing an existing chart, you might want to start by configuring plot lines already on the chart (see :ref:`plot-options` and :ref:`plot-config-panel`).


.. _specify-signal:

Specify a signal for a plot line
=============================================================================

A signal is the :term:`metric` you want to plot on the chart, to which you might add filters and/or apply analytics. Plot lines, or plots, are the building blocks of charts. A chart has one or more plots, and each plot is composed of the :term:`metric time series<Metric time series>` represented by the signal and its properties and dimensions, any filters, and any analytics applied.

.. note:: Instead of a metric, you can also enter a :ref:`time series expression<expression>` to create a composite or derived metric, specify an :ref:`event<chart-events>` to be displayed on the chart, or :ref:`link a detector to a chart<link-detector-to-chart>` to display its alert status on the chart.

To access Chart Builder, open the navigation :strong:`Menu` and select :strong:`Dashboards`. In the :strong:`Create` menu (+), select :strong:`Chart`.


Enter a metric name or tag
-------------------------------------------------------------------

If you know the name of the metric you want to view, you can simply type its name directly into the :strong:`Signal` field on the :strong:`Plot Editor` tab. Splunk Observability Cloud uses type-ahead search to show you any metrics that match what you are typing.

Splunk Observability Cloud lets you build a chart to plot a signal for which you have not yet started sending data. Type in the name of the metric you expect to plot and press Enter. When data starts arriving for that signal, it is displayed on the chart.


.. _wildcards:

Use wildcards
-------------------------------------------------------------------

You can use wildcards when entering a metric name into the :strong:`Signal` field.

If your metrics follow the naming conventions for Graphite metrics, see :ref:`graphite-options` for information on using Graphite wildcards and node aliasing.

.. _find-metric:

Use the Metrics Sidebar to find a metric
-------------------------------------------------------------------

You can also choose the signal by using the Metrics Sidebar to search for metric names, instead of typing one in directly. Click :strong:`Browse` next to the :strong:`Signal` field to display the Metrics Sidebar.

In the Metrics Sidebar, select the :strong:`Find Metrics` option to search for metrics. Using the Metrics Sidebar is the same as described in :ref:`use-metrics-sidebar`, except that each selected metric is added as a plot in the chart, instead of as one or more new charts.

For information about how to use the :strong:`Find Events` option, see :ref:`chart-events-as-occur`.


.. _expression:

Enter a time series expression instead of a signal
-------------------------------------------------------------------

Another valid entry in the :strong:`Signal` field is a time series expression: a mathematical expression that depends on one or more of the other plots in the chart. Expressions are useful for ratios, rates of change, or any other composite or derived metric you can think of that can be specified using a formula.

For example, suppose you want to display the percentage of cache hits for a system. If plot A displays a count of cache hits, and plot B displays a count of cache misses, you can use the following formula in plot C to display the percentage of cache hits::

   (A/(A+B)) * 100

Click :strong:`Enter Formula` to enter a formula in the :strong:`Signal` field.

.. note:: To see only the composite metric (in this case, C, the percentage value) on the chart, click the eye icon to the left of plots A and B to hide them from the display.


Determine the kind of entry a plot is displaying
-------------------------------------------------------------------

If there is any potential for confusion about whether a text entry is an expression, a metric, or an event, Splunk Observability Cloud displays different icons to help you disambiguate:

- A ruler icon represents a metric.

- A calculator icon represents a mathematical expression.

- A diamond icon represents a custom event.

- A warning triangle icon represents an alert (event triggered by a detector).

- A black bell icon represents a linked detector.


Work with multiple plots
-------------------------------------------------------------------

A chart can contain many plots. After adding multiple plots, you might want to reorder them to make the chart more readable, or to control how they are displayed in the chart. For more information, see :ref:`reorder-plot-lines`.

You might also want different plots to have different colors or other visualization settings. For more information on customizing a plot, see :ref:`plot-config-panel`.


.. _filter-signal:

Filter the signal
=============================================================================

Once you've selected a signal, you need to determine the scope of what you want to look at. Splunk Observability Cloud allows you to filter down the signal using metrics metadata.

For example, you might want to look at the latencies for a service, but only for the production environment. In Splunk Observability Cloud, the latency is your metric, and the service and environment names are both likely to be part of the metadata associated with the metric.

As filters are applied, the data shown in the chart updates in real-time, as a way of helping you confirm that you are making the desired selection. For more information on specifying filters, including specifying :code:`NOT` filters and using multiple filters, see :ref:`filter-dashboard-charts`. The instructions for filtering a signal are the same as those for specifying a filter override.

.. note:: If you choose to allow data matching the filter condition or missing the property, as discussed in :ref:`choosing-data-to-allow`, data missing the property is excluded if you apply an analytics function and then group by that property. To do this, click :strong:`Add Analytics`, select a function, and then select a :strong:`Group by` value.

.. _filter-overrides:

As you filter a signal, tokens representing the filter options are added to the :strong:`Plot Editor` tab. If the token is grey instead of the default blue, this indicates that the filter option is being overridden by a dashboard variable or filter that has propagated down to the chart. For example, this can happen when you set a :strong:`Filter` value in the :strong:`Overrides` section that conflicts with a filter you added to a plot line.

.. note:: If you add or edit any of the Override values, the values are applied to every chart in this chart's dashboard when you close the chart. For more information, see :ref:`view-charts-dashboards`.


.. _choosing-rollup:

View and change a plot's rollup type
=============================================================================

Every signal has a default :term:`rollup` associated with it, which will be displayed as :strong:`Auto`. If the rollup label says :strong:`Multiple`, it means that different rollup functions have been applied to different metric time series (MTS) on the same plot. This happens when the rollup setting is left as default, and the plot contains metric time series that have different metric types. MTS on the same plot can have different metric types if the plot contains a wildcard query that matches many different metrics. It can also happen if the plot contains one metric, but that metric is used to record different types of measurements.

Rollups are used to adjust the chart resolution as necessary to effectively display the chart data. For more information, see :ref:`data-resolution-rollups-charts`.


.. _plot-analytics:

Apply analytics to a plot
=============================================================================

You can apply :term:`analytics` to the time series on this plot. When you click :strong:`Add Analytics`, a list of available functions displays. Splunk Observability Cloud supports not only basic function, such as :ref:`Sum<sum>`, :ref:`Count<count>`, and :ref:`Mean<mean>`, but also more powerful functions like :ref:`Percentile<percentile>`, :ref:`Timeshift<timeshift>`, :ref:`Top/Bottom<top-bottom>`, and :ref:`Exclude<exclude>`. Hover over a function to see a brief description.

.. note:: Some analytics functions have the same name as certain rollup types, but they work in very different ways. For information on how rollups and analytics work together, see :ref:`rollups-analytics-interactions`.

If you know the name of the analytics function you want to apply, type it into the :strong:`Analytics` field. Splunk Observability Cloud provides type-ahead search to show you a list of terms that match. Alternatively, scroll and choose a function from the list. If you apply a function, it displays as a token.

You can apply one or multiple analytics to a signal. If you apply multiple analytics functions to a signal, they are applied in the order in which they display. You can change the order by dragging and dropping the tokens.


Aggregations and transformations
----------------------------------------------------------------------------------

Many analytics functions are able to perform computations on time series in two ways: aggregations and transformations. Aggregations operate across multiple time series on a plot to display a consolidated view of data, such as the sum of all database calls over a period of time. Transformations show data over a specified period, either a moving window or a calendar window, such as the number of database calls over the past 10 minutes or since the start of the day. For more information, see :ref:`aggregations-transformations`.


More powerful analytics
-------------------------------------------------------------------

Splunk Observability Cloud analytics can do much more than display simple metric values as described here. Analytics can take your chart from a display of raw metrics to a powerful tool that lets you compare historical data with current data, or show you trending data so you can proactively monitor system health. For more information, see :ref:`gain-insights-through-chart-analytics`.


.. _data-table:

View detailed metric data
=============================================================================

When you hover over a chart, the plot line for the time series you are focused on is highlighted, and information about the data point displays.

To see detailed information about data points in a chart, select the :strong:`Data Table` tab. If you haven't pinned a point on the chart, values for the most recent data in the chart display. Alternatively, you can click in the chart to pin a point in time and display the :strong:`Data Table` tab.

.. note:: If you edited a :ref:`plot name <plot-name>` or specified :ref:`display units<plot-display-units>` in the Chart Builder, this information displays when you hover over the chart and in the :strong:`Data Table`. For example, instead of seeing ``250`` as a value, you might see ``250 ms`` (where you specified :strong:`ms` as a suffix) or ``$250/millisecond`` (where you specified :strong:`$` as a prefix and :strong:`/millisecond` as a suffix).

When you move the cursor through different areas on a chart, the plot line under the cursor is highlighted, and the detail line for that plot line is highlighted. You might have to scroll through the :strong:`Data Table` tab to find the highlighted information. If you have pinned a value, that value displays in the first column of the table, and you can compare other values to it as you move the cursor.

Just as hovering over a plot line highlights a line in the table, hovering over a line in the table highlights the corresponding plot line on the chart.

As you hover over dimensions in the :strong:`Data Table` tab, an :strong:`Actions` menu icon (|more|) displays. Menu options let you add a filter to the chart's :strong:`Overrides` bar based on the value of the dimension. For more information on filtering an entire chart (as opposed to individual plot lines), see :ref:`filter-dashboard-charts`.

Use the :strong:`Chart Options` tab to specify which :ref:`columns to display<data-table-columns>` on the :strong:`Data Table` tab.


.. _export-data-table:

You can export data from the :strong:`Data Table` tab to a CSV file. To do this, click the :strong:`Export as CSV` icon at the top right of the tab.


.. _chart-events:

View events on a chart
=============================================================================

Displaying event markers on a chart can help you see correlations between events that occur (such as a detector triggering an alert) and metrics displayed on the chart. For example, you might discover that CPU % utilization spikes when the number of concurrent users approaches a specific value. You can use this information to tune your system to minimize excessive CPU load as the number of users increases.

For background information on events, see :ref:`events-intro`.


.. _chart-events-as-occur:

Display events as they occur
-------------------------------------------------------------------

The process for adding an event triggered by a :term:`detector`, or occurrences of a custom event, is essentially identical to :ref:`specifying a metric as a signal<specify-signal>`. The only real difference is that if you :ref:`use the Metrics Sidebar <use-metrics-sidebar>`, you must select the :strong:`Find Events` option to search for detector or custom event names.

.. note:: If you clear the :strong:`Find Metrics` option to search only for events, none of the other search options in the Metrics Sidebar are available. You must enter text manually to find matching detector or custom event names. Similarly, if you add a filter, you can search only for metrics, not for events.


.. _event-markers:

Event markers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Event markers are shown along the chart's X-axis. Select the :strong:`Events` tab to view instructions for displaying a list of events, or creating a new custom event.

Hover over an event marker to see the event count in that time window, grouped by severity.

- Custom events are shown as hollow diamonds.

- Alerts generated by detector events are triangles, color-coded to display the severity of the alert. Solid triangles indicate the event was triggered. Hollow triangles indicate the event cleared.

Click near an event marker to see a list of events for that time interval on the :strong:`Events` tab. The :strong:`Type` column indicates alert status as :strong:`Triggered` or :strong:`Cleared`, and displays the event type for custom events. Information about when the event occurred, how long it took for an alert to clear (or if it is ongoing), and information about the detector that triggered the event display.

.. note:: If an alert and a custom event occur during the same interval, only the alert marker is displayed. However, any custom events are listed in the events list.

To make it easier to spot correlations between events and metric values, you can display a vertical line along with the event marker. This line is color-coded just like the event marker at the bottom of the chart. To add vertical lines to the markers on the chart, select :ref:`Show events as lines<event-lines>` on the :strong:`Chart Options` tab.

.. note:: You can also :ref:`overlay event markers<dashboard-event-overlay>` onto charts that are displayed on a dashboard.


.. _chart-manual-events:

Manually add custom events
-------------------------------------------------------------------

To manually add a custom event to a chart, select the :strong:`Events` tab. If you want to add an event at a time that is visible on the chart, click the chart to pin that time.

-  If there are events displayed in the events list, click :strong:`Add new event` icon in the last column.

-  If there are no events listed, click the :strong:`add new event` link.

If you have pinned a time, that time displays in the :strong:`Create Event` dialog box. Otherwise, the current time displays.

In the :strong:`Create Event` dialog box, you can start typing to see a list of event types to choose from, or you can create a new event type.

Note the time and any other details you'd like to add. You can use Markdown as well as plain text in the description of the event.

Click :strong:`Create` to generate an event for the selected event type.

.. note:: If you have created a new event type, you created both the event type, which you can reuse in the future, and an instance of that event type.

On the :strong:`Plot Editor` tab, a new event plot line displays in your chart for this event type. If the new event time is visible on the chart, you'll see the new event in the chart, as well as all other events for the event type that occurred in the current chart time range.


.. _events-tab:

View and manage event information
-------------------------------------------------------------------

You can see more information about an event by clicking the event on the :strong:`Events` tab. If the notification for an event was :ref:`muted<mute-notifications>`, that will be indicated.

Click a custom event to edit it or mark it for deletion.

Note that editing and deleting only applies to custom events, not events generated when a detector triggers an alert.


.. _plot-options:

Set basic plot options
=============================================================================

You can set some basic options for the plot by using features available on the signal line and on the :ref:`Axes tab<axes-tab>`. For other options available, see :ref:`plot-config-panel`.


Visibility of plot lines
-------------------------------------------------------------------

Click the eye icon on the far left of the plot line to show or hide the plot line on the chart. This option is not available for text charts and event feeds. In all chart types except heatmap, multiple plot lines can be displayed.

.. note:: In the :ref:`single-value-chart-type`, if multiple plots are visible, the value on the chart reflects the first visible plot in the plot list.

To hide all plot lines except one, alt-click (or option-click) the eye icon for the plot line you want to display. This can be useful when a chart contains multiple plots and you need to focus on just one. To return to the previous view, alt-click the eye icon again for the visible plot line.

To show or hide all plot lines, click the eye icon above the plot lines and select :strong:`All` or :strong:`None`.


.. _plot-name:

Plot name
-------------------------------------------------------------------

By default, plots are assigned letters of the alphabet to distinguish them from one another. The plot name specifies the text displayed in list charts, detector signals, the :strong:`Data Table` tab, and so forth. By default, the name is the metric or event name plus any analytics applied. To change the plot name, click the name and enter the desired text.

You can also use plot names to ensure that plots representing similar metrics and dimensions are displayed in different colors. For more information, see :ref:`color-metric`.


.. _2nd-y-axis:

Left and right Y-axes
-------------------------------------------------------------------

By default, all plots in a chart use the Y-axis values displayed on the left side of a chart. If you have multiple plots, it might be useful to use a second Y-axis, with values displayed on the right side of the chart. Click the axis selector for the plot, then select :strong:`left` or :strong:`right`. For line charts, a plot that uses the left Y-axis displays with solid lines, and the right Y-axis displays with dotted lines.

.. note:: If you are using the :ref:`Stack chart<stacked-chart>` option for an area or column chart, all plots should use the same Y-axis.

Specifying two Y-axes can make chart data look very different. Splunk Observability Cloud adjusts axis values of both axes to enhance the display of the data.

The use of a single Y-axis lets you compare absolute values of the plots.

The use of two Y-axes lets you compare the patterns of the values. You can use custom :ref:`plot colors<plot-color>` to make the chart easier to read.

When you hover over a plot in a chart that has two Y-axes, the Y-axis that is not being used for that plot is dimmed, so it is easy to see which Y-axis values apply to the plot.


.. _axes-tab:

Use the Axes tab
=============================================================================

Additional options for Y-axes are available on the :strong:`Axes` tab. This tab is enabled when chart type is Line, Area, Column, or Histogram. If you have specified both :ref:`left and right Y-axes<2nd-y-axis>`, you'll see the same options for each axis.


Label
-------------------------------------------------------------------

Specify text that you want to display vertically along the left and right sides of a chart.


.. _axis-min-max:

Min/max values
-------------------------------------------------------------------

By default, Splunk Observability Cloud automatically selects minimum and maximum Y-axis values based on the plots visible in the chart window and whether or not the :ref:`Stacked chart<stacked-chart>` option is enabled in the :strong:`Chart Options` tab. You can specify values to override this behavior. Setting values here might override the :ref:`include-zero` setting in the :strong:`Chart Options` tab.


.. _axis-watermarks:

Low and high watermarks
-------------------------------------------------------------------

Watermarks are constant values and appear as straight lines at the specified Y-axis values. Watermark lines for the right y-axis are shown as dotted lines. If you specify watermark labels, they appear near the watermark lines. Watermark labels for the right y-axis are shown on the right side of the chart.


.. _axis-precision:

Precision
-------------------------------------------------------------------

You can choose the number of digits that are used for Y-axis values by specifying a number in the axis :strong:`Precision` field. The default value used by Splunk Observability Cloud is 3, but if the values plotted in your chart are very close together, such as 0.0004 and 0.0005, then 3 digits is not enough, and you should increase axis precision accordingly.


.. _plot-config-panel:

Set options in the plot configuration panel
=============================================================================

The plot configuration panel lets you set options in addition to those you can set on the signal line. To display the panel, click the :strong:`Configure plot` icon (gear) next to the :strong:`plot actions` menu (|more|) in the last column of the plot line.

The options that are available depend on the type of chart. No chart type supports all the available options.


.. _plot-display-units:

Display units
-------------------------------------------------------------------

A number displayed on a chart could be anything from a raw number (such as bits or seconds) to transactions per second to the total dollar value of sales made in the last month. Use the :strong:`Display Units` options to help viewers understand what the values on a chart represent and to control how values are displayed. You can :ref:`specify the unit<specify-unit>` associated with the metric (bit, byte, ms, etc.) or select :strong:`Custom` to enter a :ref:`plain text prefix and/or suffix<prefix-suffix>` (such as ``$`` and ``per hour``).

All display units are shown when you take any of the following actions:

-  View a :ref:`single-value<single-value-chart-type>` or :ref:`list chart<list-chart-type>`

-  Look at values in the :ref:`data table<data-table>` for a chart

-  Hover over a point on the chart


.. _specify-unit:

Specify the metric unit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Size and time metrics; such as kb, Gb, ms, and w; are available from the :strong:`Display Units` drop-down menu. In addition to displaying on the :strong:`Data Table` tab or when hovering over a chart, the unit you specify display on the y-axis associated with the metric and is automatically scaled as appropriate. For example, if you are measuring a value in seconds and the values range from 10 seconds to 2 minutes, the y-axis might show increments such as 20s, 40s, 1m, 1.5m, and 2m.

.. note:: For auto-scaling to work as expected, metrics in all plots that share the same y-axis should be of the same unit. For more information on using multiple y-axes, see :ref:`axes-tab`.


.. _prefix-suffix:

Add a prefix and/or suffix
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Unlike specifying the actual unit associated with the metric, the prefix and suffix are simply text fields that you add to clarify the chart display. They don't have any intrinsic relationship to the metric on the plot line and are not automatically scaled.

Using display units can also provide information that would not otherwise be apparent.

It can sometimes be useful to apply the :ref:`Scale<scale>` analytics function when setting a suffix. For example, if a value is measured in seconds, but you want to display the output in minutes, scale the value to 60 and change the suffix from :strong:`per second` to :strong:`per minute`. You can also use characters, such as :strong:`/s` or :strong:`/second`, instead of :strong:`per second`.


.. _plot-display-type:

Visualization type
-------------------------------------------------------------------

For :ref:`graphs<graph-chart-type>`, plots default to a visualization style selected for the chart as a whole, such as line, area, column, or histogram. For example, new plots created on a column chart appear initially as additional columns. However, you can change this setting so a plot uses a different chart display type than the chart default.

For example, if the chart is an area chart, you can choose to display one of its plots as a line.

If you specify a visualization type, a small icon on the plot line indicates the selected type.


.. _event-color:

Event color
-------------------------------------------------------------------

You can select the color to be used for :ref:`custom events<custom-event>` on a chart. Click a color swatch to apply it to the event. The swatch displays with a white checkmark. Click a marked color to deselect it and have Splunk Observability Cloud re-apply a default color to the event.

If you specify a color, a small icon on the plot line indicates the selected color.


.. _plot-color:

Plot color
-------------------------------------------------------------------

Splunk Observability Cloud chooses plot colors automatically to allow at-a-glance differentiation between metrics or time series with different dimension values. You can manually override this selection.

Click a color swatch to apply it to the current plot. The swatch displays with a white checkmark. Click a marked color to deselect it and have Splunk Observability Cloud re-apply a default color to the plot.

If you specify a color, a small icon on the plot line indicates the selected color.

You can also use plot names to ensure that plots representing similar metrics and dimensions are displayed in different colors. For more information, see :ref:`color-metric`.

Note that if you have set thresholds using the :ref:`color-value` chart option, any color you specify here is ignored.


.. _plot-rollup:

Rollups
-------------------------------------------------------------------

:term:`Rollups<rollup>` are a way to summarize data, and they enable Splunk Observability Cloud to render charts or perform computations for longer time ranges quickly, without compromising the accuracy of the results. Depending on whether the metric you've chosen is a :term:`gauge<gauge metric>`, :term:`counter<counter metric>`, or :term:`cumulative counter<Cumulative counter metric>`, Splunk Observability Cloud uses a different default rollup. In some cases, you might want to use a non-default rollup. For more information, see :ref:`rollups`.


.. _extrapolation-policy:

Extrapolation policy and Max extrapolations (missing data points)
-------------------------------------------------------------------

If a data point isn't sent to Splunk Observability Cloud within the expected time frame, by default it is considered to be NULL and is excluded from all data calculations. Depending on the metric type and rollup, you might want to specify a value other than NULL. You can also specify the number of consecutive extrapolated data points for which the selected extrapolation policy applies.

For more information, see :ref:`missing-datapoints`.


.. _plot-aliasing-options:

Aliasing
-------------------------------------------------------------------

If a plot uses :ref:`Graphite<graphite-wildcards>` style wildcards, options for node aliasing are displayed below the :strong:`Visualization` options.

Enter the aliases you want to use that correspond to the node place values. To make it easier, Splunk Observability Cloud provides examples of the dimension values that correspond to the nodes in question.

For more information, see :ref:`graphite-node-alias`.


.. _reorder-plot-lines:

Configure plot order in a chart
=============================================================================

Plot order determines how data appears on an area or column chart for which you are using the :ref:`Stack chart<stacked-chart>` option. The values displayed reflect the order of the plots in the chart. For example, if there are three plots in the chart (A, |nbsp|  B, and |nbsp| C), the values are stacked with A on top, then B, then C on the bottom.

If you want to change plot order, hover over a plot to display a "drag" icon on the right. Drag the plot to your desired location.

As you move plots, they get out of alphabetical order. To put the letters assigned to the plots back in alphabetical order, while keeping the order of the actual plots, select :strong:`Resequence Plots` in :strong:`Chart actions` menu (|more|). Any formulas in the chart are updated to reflect changes in plot letters.


.. _delayed-missing:

Handle delayed or missing data points
=============================================================================

Data points being sent to Splunk Observability Cloud can be delayed, or not arrive at all. You can set parameters for how Splunk Observability Cloud determines if a data point is delayed, and for how to extrapolate missing data points in a plot line.


.. _delayed-datapoints:

Delayed data points
-------------------------------------------------------------------

As a general rule, when using a streaming analytics system, the more "on time" data points are, the better. In other words, the delta between logical time (the time stamp that accompanies the data points, such as when the measurements are taken) and wall time (the time at which the data points arrive in Splunk Observability Cloud) needs to be as low as possible.

The impact of delayed data points on a streaming analytics system can be illustrated using the following example:

You have a chart that displays the average of the CPU utilization metrics from 10 servers, and 9 of the servers report every 10 seconds and are on time. One laggard, backed up for whatever reason, submits data with a gap between wall time and logical time that is 10 minutes long. Even though that machine sends one data point every 10 seconds, those data points all arrive after a 10 |hyph| minute delay.

Max delay
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :strong:`Max Delay` parameter specifies the maximum time that the Splunk Observability Cloud analytics engine waits for data to arrive for a specific chart. For example, if :strong:`Max Delay` is set to 5 minutes, the computation waits for no more than 5 minutes after time *t*, for data that timestamped with time *t*. The leading edge of the CPU utilization chart is no more than 5 minutes behind the current time, and the laggard isn't considered for the purpose of calculating the average in the streaming chart. When it does arrive, it will be stored properly, such that any re-calculation of the average takes it into account. As such, :strong:`Max Delay` lets you prioritize timeliness over correctness.

When :strong:`Max Delay` is set to the default, :strong:`Auto`, the timeliness of the reporting time series are sampled to determine an appropriate value. The value is chosen to accommodate most, if not all, data by adopting the maximum observed lag after discarding substantial laggards.

You can permanently override the default setting for a chart by choosing a :ref:`Max Delay value<max-delay>` in the :strong:`Chart Options` tab. You can temporarily override the default by setting a :ref:`max delay override<dashboard-max-delay>` on the dashboard that contains the chart. The upper limit is 15 |nbsp| minutes.


.. _missing-datapoints:

Missing data points
-------------------------------------------------------------------

Time series data can be sparse due to collection policies, failures, or network conditions. If your calculated lists don't contain the elements you expect, or if it looks like you have gaps in a chart, it is often because the data point was never received by Splunk Observability Cloud.

By default, Splunk Observability Cloud inserts a NULL value for any data point that is missing for a certain period. In certain situations, you might want to use a different policy for one or more plots in a chart. The policy you choose should complement the metric and rollup type. For example, a counter metric with a sum rollup is probably best served with an :strong:`Extrapolation Policy` value of :strong:`Zero`, whereas a :strong:`Last Value` extrapolation might be better for a gauge with a mean rollup.

.. list-table::
   :widths: 15 30
   :header-rows: 1

   * - :strong:`Extrapolation Policy`
     - :strong:`Behavior`
   * - Null (the default policy)
     - Inserts a NULL value for missing data points
   * - Zero
     - Inserts a zero (0) value for missing data points
   * - Last Value
     - Uses the last reported value until the next data point arrives


A :strong:`Last Value` extrapolation does not extrapolate any values prior to the first real value, nor does it extrapolate values for inactive time series, such as metrics that have not reported for a long period of time.

In addition, extrapolated values are not used for charts whose visualization is based on the most recent data point received (list chart, single-value chart, and heatmap charts). That is, only actual values are represented in these chart types, not extrapolated values. For list and single-value charts, if a data point is missing, the chart displays a NULL indicator until an actual value is received.

The :strong:`Max Extrapolations` value indicates the number of consecutive data points that the selected policy applies to. The default value of :strong:`infinity` means that the extrapolation policy applies indefinitely.

To specify the :strong:`Extrapolation Policy` and :strong:`Max Extrapolations` for a time series, use the :ref:`plot configuration panel<plot-config-panel>` for its plot.


.. _chart-signalflow:

Work with SignalFlow
=============================================================================

As discussed in :ref:`get-started-signalflow`, the heart of the Splunk Observability Cloud platform is a streaming, real-time analytics engine that executes computations written in a flexible language named SignalFlow. A stream is a request for data, like an expression that references another assigned stream.

A stream is represented as a plot line in the graphical plot-builder UI. You can view and edit the SignalFlow underlying a chart by clicking :strong:`View SignalFlow` while on the :strong:`Plot Editor` tab.

-	To show or hide a sidebar that displays the plot label, click the sidebar/caret icon at far right.

-	To show or hide plot configuration options when viewing the sidebar, click the plot label or the settings icon (gear).

-	To return to the graphical plot-builder view, click :strong:`View Builder`.

By default, when any chart is opened in the Chart Builder, Splunk Observability Cloud first attempts to render it in graphical plot-builder mode. The Chart Builder opens in SignalFlow mode only if the chart cannot be represented in the graphical plot-builder.

Converting a chart from SignalFlow to the graphical plot-builder might change the formatting of the SignalFlow. For example, extra spaces might be removed, or parentheses might be added.

When you edit the SignalFlow that powers a chart, or when you create a chart by writing SignalFlow, you must follow the guidelines below to ensure that the chart can be edited in the graphical plot-builder mode as well. If any element of the SignalFlow in a chart does not follow these guidelines, attempting to convert to graphical plot-builder mode by clicking :strong:`View Builder` results in an error.

.. 	contents:: Summary of guidelines
   	:local:
   	:backlinks: none


Convertible SignalFlow can consist of streams only, with each stream assigned to a capital letter from A to Z
-------------------------------------------------------------------------------------------------------------------------------------------

Assign each stream to its own capital letter, from A to Z. Multiple requests for data in a single assignment are not convertible to the plot-builder UI. Expression-type logic can include variables and numbers only.

.. list-table::
   :widths: 25 100

   *  -  Will convert
      -  .. code-block:: none

            A = data('cpu.utilization').(label='A')
            B = data('cpu.utilization').publish(label='B')
            C = (A/B+10).publish(label='C')

   *  -  Won't convert
      -  .. code-block:: none

            A = data('cpu.utilization').publish(label='A')
            B = (A/data('cpu.utilization')+10).publish(label='B')


Each stream can have up to one corresponding :code:`publish` statement
-------------------------------------------------------------------------------------------------------------------------------------------

A :code:`publish` statement is used to make data visible in a chart. A :code:`publish` statement also supports labels, which are used for styling and naming of plots in the UI. Splunk Observability Cloud recommends that each :code:`publish` statement include a label, and that the label match the stream variable assignment. If a :code:`publish` statement does not have a label, an arbitrary label is assigned when you convert to graphical plot-builder mode.

If :code:`publish` is present, it must be the last method in a stream statement. More than one :code:`publish` per stream is not allowed.

.. list-table::
   :widths: 25 100

   *  -  Will convert
      -  .. code-block:: none

            A = data('cpu.utilization').publish(label='A')
            B = (A).mean().publish(label='avg')

   *  -  Won't convert
      -  .. code-block:: none

            A = data('cpu.utilization').publish().mean().publish(label='avg')


You can't convert from SignalFlow to plot-builder mode if the chart includes features or functions that you can't access in plot-builder mode
------------------------------------------------------------------------------------------------------------------------------------------------------

Features that you can specify in SignalFlow, but that are not representable in plot-builder mode, include:

  - Comments.

  - Any SignalFlow functions that aren't accessible from the plot-builder.

  - Programming constructs like loops, imports, and variables.

  - Any variable assignments, other than streams assigned to capital letters. This means that variable constants might not be used as arguments to stream functions.

..	list-table::
	:widths: 25 100

	*  	-	Will convert
		- 	.. 	code-block:: none

				A = data('cpu.utilization', filter=filter('aws_availability_zone', 'us-east-1a')).publish(label='A')

	*  	-  	Won't convert

		-  .. 	code-block:: none

				myfancyfilter=filter('aws_availability_zone', 'us-east-1a')
				A = data('cpu.utilization', filter=myfancyfilter).publish(label='A')


If a filter block contains :code:`OR` conditions, all of the options must be defined inside the filter statement
------------------------------------------------------------------------------------------------------------------------------------------------------

This matches the way that the graphical plot-builder represents filters.

.. list-table::
   :widths: 25 100

   *  -  Will convert
      -  .. code-block:: none

            filter("aws_availability_zone", "us-east-1a", "us-west-1a")

         .. code-block:: none

            filter("aws_availability_zone", "us-east-1a", "us-west-1a") AND filter("aws_instance_type", "i3.2xlarge")


   *  -  Won't convert
      -  .. code-block:: none

            filter("aws_availability_zone", "us-east-1a") OR filter("aws_availability_zone", "us-west-1a")

         .. code-block:: none

            filter("aws_availability_zone", "us-east-1a") OR filter("aws_instance_type", "i3.2xlarge")


.. _graphite-options:

Graphite options for plots
=============================================================================


.. _graphite-wildcards:

Use Graphite-style wildcards
-------------------------------------------------------------------

Many Graphite users are accustomed to its :new-page:`wildcard conventions <http://graphite.readthedocs.org/en/latest/render_api.html#paths-and-wildcards>`, and use them actively to generate the custom charts that they want. Splunk Observability Cloud supports the use of those conventions in the signal (metric or event) field of the Splunk Observability Cloud Chart Builder, including asterisks, character lists and ranges, or value lists. However, there are some differences between the behavior of Graphite wildcards and regular wildcards.

For example, for a regular wildcard query, :code:`jvm.*` returns anything that starts with :code:`jvm.`, even if there are subsequent dots in the name. For example, for :code:`jvm.*`, :code:`jvm.foo`, :code:`jvm.foo.bar`, and :code:`jvm.foo.bar.foo` would all be returned.

For Graphite wildcards, :code:`jvm.*` returns only something that has no subsequent dots in the name. For example, for :code:`jvm.*`, :code:`jvm.foo` would be returned, but :code:`jvm.foo.bar` and :code:`jvm.foo.bar.foo` would not.

To use the Graphite wildcard, enter the appropriate Graphite syntax into the signal field, then select the Graphite wildcard option. If you are using the Metrics Sidebar, enter any search term with an asterisk between two dot (.) characters, then select :strong:`Graphite wildcard` from the search results list.

When the Graphite wildcard option is selected, the ability to filter plots by dimensions is removed. Graphite naming conventions encapsulate dimension values into dot-separated strings and are in effect selected through the use of wildcards.


.. _graphite-node-alias:

Node aliasing for Graphite-style metrics
-------------------------------------------------------------------

One of the most powerful features in Splunk Observability Cloud is its use of dimensions to filter metrics or perform group |hyph| by aggregations. For example, you can filter in or out time series that match :code:`datacenter:snc`, or calculate the average value of the metric :code:`cpu.total.user` across multiple hosts, grouped by role.

In Graphite, metric names typically contain multiple dot-separated dimension values, such as ``snc.role1.server3.cpu.total.user``. The dimension keys; such as datacenter, role, and host; are implicit. To use the dimensions in Graphite metric names as if they were native Splunk Observability Cloud dimensions, you can apply on-the-fly dimension aliasing to the chart you're constructing. This allows you to treat the nodes in a Graphite metric name as if they were dimensions in Splunk Observability Cloud, and you can also assign aliases to the implicit dimension keys to make it easier to use and easier to understand.

Before applying aliasing, you can use the node place values as dimension or property values. After aliasing, you can use the node aliases instead of the node place values in analytics functions. The aliases are also used in the :ref:`data table<data-table>`.

For information about how to apply aliases, see :ref:`plot-aliasing-options`.

.. _chart-whats-next:

What's next?
=============================================================================

After you've created a chart to monitor one or more signals, you might want to adjust various options regarding how the chart is configured. For more information, see :ref:`chart-options-tab`) and :ref:`share the chart with others<sharing-a-chart>`.

Once you've built and configured some useful charts, learn how to use additional analytics functions to expand a chart's contents from data into information. For more information, see :ref:`gain-insights-through-chart-analytics`.

You can also create detectors based on the chart to trigger alerts when certain thresholds are met. For more information, see :ref:`create-detector-from-chart`. Once created, you can :ref:`link a detector to a chart<link-detector-to-chart>` to display its alert status on the chart.

Note that sometimes the metrics data that you're sending does not reach the Splunk Observability Cloud service, or is delayed. Because Splunk Observability Cloud is streaming data visualizations and analytics in real time, you need to decide how you want Splunk Observability Cloud to interpret those gaps and delays. For more information, see :ref:`delayed-datapoints` and :ref:`missing-datapoints`.
