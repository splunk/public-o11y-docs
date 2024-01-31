
.. _chart-types:

*****************************************
Chart types in Splunk Observability Cloud
*****************************************

.. meta::
    :description: Learn about chart types in Splunk Observability Cloud
    
To learn more about how to work with each chart type, see :ref:`choose-chart-type`. This topic provides details about different chart types in Splunk Observability Cloud:
  
- :ref:`line-charts`: Display data in a plot with data points connected by a series of straight lines.
- :ref:`area-charts`: Display in a plot similar to a line chart, except that the area below the line is filled.
- :ref:`column-charts`: Also known as bar charts. Each data point is displayed as a vertical bar going from the x-axis origin to the measured value of the data point. The bars aren't connected.
- :ref:`histogram-charts`: Display as horizontal rectangles on a two-dimensional plot. The starting and ending x-position of a rectangle represents the time duration over which data points for that rectangle were collected. The y-position of a rectangle represents the number of data points collected in that time duration.
- :ref:`list-charts`: Display multiple data points at each point in time. They show recent trends in the data, including up to 100 data points.
- :ref:`single-value-charts`: Show a single value for a data point as it changes over time. In most cases, you use this type of chart to display important metrics as a single number.
- :ref:`heatmap-charts`: Present a series of squares each representing a single data point of the selected metric. The color of each square represents the value range of the metric allowing quick identification of values that are higher or lower than desired.
- :ref:`event-feed-charts`: This chart type doesn't display metric data. Instead, it displays a list of events that meet the criteria you specify.
- :ref:`text-charts`: Text charts let you create a "chart" containing descriptive information. You can then add this chart to a dashboard to provide an introduction or instructions for other charts in the dashboard.
- :ref:`table-charts`: Display metrics and dimensions in table format.

.. _graph-charts:

Graph charts
============

Graph charts appear as one or more plots of data over time. Each metric time series (MTS) in the chart
appears as a single plot, and each plot has its own color.
For example, a series of line plots for AWS MTS might be colored by their AWS availability zone
dimension, with red indicating ``us-east-1``, green indicating ``us-east-2``, and purple
indicating ``eu-west-1``.

Graph chart visualizations
--------------------------

Graph charts can have one of four forms:

- :ref:`line-charts`
- :ref:`area-charts`
- :ref:`column-charts`
- :ref:`histogram-charts`

.. _line-charts:

Line charts
===========

The line chart plot type appears as a series of straight lines that
connect the data points in the MTS.

.. _area-charts:

Area charts
===========

The area chart plot type appears as line chart with the area between the line
and the x-axis filled in with the color of the line.

.. _column-charts:

Column charts
=============

The column chart plot type appears as shaded vertical bars starting at the
x-axis and ending at the data point value. By default, each plot point is shown as an independent
bar.

You can also stack column charts. The bars representing each value appear as vertical
stacks at the corresponding time value along the x-axis.

.. _histogram-charts:

Histogram charts
================

Histograms appear as colored rectangular bins indicating how many plot points
are at that value. For example, a green bar might indicate a higher
density of plot points with the relevant value than a red bar. Alternatively, darker
shades of a single color might indicate a higher density of plot points
for a value than a lighter shade of that same color.

The values of a histogram plot display in a random order by default. You
can organize them into two grouping levels to clarify the data. For example, you can group
data by AWS region or availability zone to make it easier to track performance
within each region or availability zone.


.. _single-value-charts:

Single value charts
===================

Single value charts appear as a single value for a data point as it changes
over time. In most cases, you use this type of chart to display
important metrics as a single number. For example, use single value
charts in a summary dashboard shown on a wall TV. The dashboard can
display the number of active hosts, active processes, or number of
requests served in the past 24 hours.

You can highlight the value using specific colors based on thresholds.
For example, when the number of requests served over the past 24 hours
meets the daily goal, you can set the color of the value to change from
red to green.

If the input stream for a single value chart contains more than one MTS,
the chart displays the first MTS it detects in the stream and ignores
the others.

Single value chart prefix and suffix
------------------------------------

To help describe the chart value, add prefix and suffix strings:

- The ``valuePrefix`` property specifies a prefix string.
- The ``valueSuffix`` property specifies a suffix string.

Single value chart secondary visualization
------------------------------------------

Secondary visualizations help you see trends in a single value chart:

- :strong:`Sparkline`: Shows recent trends of the value
- :strong:`Radial`: Shows a dial that marks where the current value is among
  the expected range of values
- :strong:`Linear`: Shows a bar that marks where the current value is among the expected range of values

By default, a single value chart doesn't show any additional visualizations.

.. _list-charts:

List charts
===========

List charts are similar to single value charts, but they appear as
multiple data points for each point in time.

A list chart can display up to 100 items at a time.

Sorting list charts
-------------------

The API lets you sort values in list charts by specifying the
``options.sortBy`` property in the request to create or update a chart.
You can sort on one of the dimensions in the MTS for the chart, a data point, the metric
name, or the ``publish()`` method ``label`` argument of the SignalFlow
statement that generates the data. To choose one of these options, you
specify one of the keyword values shown in the following table:

.. list-table::
   :header-rows: 1
   :widths: 10 40 50

   * - :strong:`Keyword`
     - :strong:`Alias in the user interface`
     - :strong:`Description`

   * - ``<dimension-name>``
     - ``<dimension-name>``
     - One of the dimensions of the displayed MTS. To see the available dimensions, follow the instructions following this table.

   * - ``sf_metric``
     - Plot name
     - The ``label`` argument of the SignalFlow ``publish()`` that provides the displayed data. This is also the plot name of the corresponding signal in the user interface.

   * - ``sf_originatingMetric``
     - Metric
     - Name of the metric for the displayed MTS.

   * - ``value``
     - Value
     - Value of the data point when Observability Cloud receives it.

In addition, you can sort by any dimension of an MTS displayed in the chart.

To see a list of entities on which you can sort:

#. In the user interface, open the chart.
#. Select the **Chart options** tab.
#. Open the **Sort** drop-down list.

In the list, **Value** is the alias for ``value``, **Plot name** is the
alias for ``sf_metric``, and **Metric** is the alias for
``sf_originatingMetric``. All other list items are dimension names.

:strong:`Examples`

To sort a list chart by value, specify the following in the request body:

.. code-block::

    {
        options: {
            "sortBy": "value",
        ...
        }
    }


To sort by plot name, specify the following:

.. code-block::

    {
        options: {
            "sortBy": "sf_metric",
            ...
        }
    }

To sort by the dimension ``demo_datacenter``, specify the following:

.. code-block::

    {
        options: {
            "sortBy": "demo_datacenter",
            ...
        }
    }


.. note::
    Observability Cloud doesn't guarantee the sort order of identical values in the input stream.

List chart prefix and suffix
----------------------------

To help describe the list chart values, add prefix and suffix strings:

- The ``valuePrefix`` property specifies a prefix string.
- The ``valueSuffix`` property specifies a suffix string.

List chart secondary visualization
----------------------------------

Secondary visualizations help you see trends in a list chart:

- :strong:`Sparkline`: Shows recent trends for each value
- :strong:`Radial`: Shows a dial that marks where the current values are among
  the expected range of values
- :strong:`Linear`: Shows a bar that marks where the current values are among the expected range of values


.. _heatmap-charts:

Heatmap charts
==============

Heatmap charts appear as a series of squares, each representing a single
data point of the selected MTS. The color of each square represents
the value range of the data point. This helps you identify values
that are higher or lower than you expect.

Heatmap chart grouping
----------------------

To highlight the information for a specific aspect of your data,
group the data points. You can use up to two dimensions for the grouping.
For example, you can group CPU utilization by AWS availability zone as the
primary grouping dimension, and number of host CPU cores as the secondary grouping dimension.

To help describe the values in the heatmap, add prefix and suffix strings:

- The ``valuePrefix`` property specifies a prefix string.
- The ``valueSuffix`` property specifies a suffix string.


.. _event-feed-charts:

Event feed charts
=================

Event feed charts let you add a list of events to a dashboard. An event feed chart can display one or more event types depending how you specify the criteria.

.. _text-charts:

Text charts
===========

Text charts let you add textual information to a dashboard. The text
appears in the same type of panel that Observability Cloud uses to display data.

Observability Cloud lets you use GitHub-style Markdown in your text.

.. note:: Inserting images using Markdown is not supported in text charts.


.. _table-charts:

Table charts
=================

A table chart displays metrics and dimensions in table format. Each metric name and dimension key displays as a column. Each output metric time series displays as a row. If there are multiple values for a cell, each time series displays in a separate row.

For more information, see :ref:`table-chart-type`.
