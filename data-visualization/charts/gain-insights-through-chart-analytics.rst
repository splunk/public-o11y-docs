.. _gain-insights-through-chart-analytics:

************************************************
Gain insights through chart analytics
************************************************

.. meta::
    :description: Gain insights through chart analytics

Splunk Infrastructure Monitoring analytics can change a chart that is displaying raw metric data into a powerful tool that gives you a deeper understanding of patterns and trends, so you can more effectively monitor infrastructure, application or service health. In this section, we provide instructions for how to do the following.

- :ref:`Compare your aggregate utilization levels by service <compare-aggregates-by-service-or-other-metadata>` through a group‑by

- :ref:`retain-peaks-and-valleys-in-longer-time-ranges`

- :ref:`correlate-multiple-metrics` by viewing them on the same chart

- :ref:`Compare current values <view-weekly-daily-hourly-comparisons>` with hourly, daily, weekly or other historical patterns

- :ref:`use-timeshift-function-to-understand-trends` towards failure

- :ref:`See percentages or ratios <use-percentages-or-ratios>` via time series expressions

- :ref:`use-percentiles`

- :ref:`show-top-or-bottom-lists` to find simple outliers or rankings

- :ref:`see-changes-in-distribution` through the use of histograms

- :ref:`Smooth out <smooth-out-peaks-and-valleys>` your data to see general patterns rather than focus on temporary peaks or valleys

This section assumes you are familiar with the following topics.

- :ref:`infrastructure-monitoring-analytics`
- :ref:`plot-analytics` 
- :ref:`data-resolution-rollups-charts`

.. _compare-aggregates-by-service-or-other-metadata:

Compare aggregates by service or other metadata
==========================================================

When you are looking at infrastructure metrics for a good-sized fleet of hosts, virtual machines or containers, it is often more instructive to look at them at an aggregate level and compare the aggregates than to look at individual instances. Many of the analytics functions allow you to group the output by metadata, which serves this purpose perfectly.

1. Select the metric you want to compare at an aggregate level (e.g. across services) and enter its name in the Signal field for plot A. In this example, we are plotting ``demo.trans.latency``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/comp-aggregates-01.png
    :width: 99%
    :alt: This screenshot shows how to select the metric you want to compare at an aggregate level and use "demo.trans.latency" as an example.

|br|

2. In the Analytics field, select the function you want to apply, such as ``mean:aggregation``. The chart now displays a single plot line displaying the mean value of the aggregation across all time series in each time interval.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/comp-aggregates-02.png
    :width: 99%
    :alt: This screenshot shows how to select the function you want to apply and use "mean:aggregation" as an example.

|br|

3. Click on the selected function for the plot. Click the group‑by dropdown. Select the metadata you want to group by, such as service (if you are sending in a dimension named “service”), :strong:`aws_availability_zone` (if you are using AWS) or other metadata. In this example, we chose ``demo_datacenter``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/comp-aggregates-03.png
    :width: 99%
    :alt: This screenshot shows how to select the metadata you want to group by and use "demo_datacenter" as an example.

|br|

4. Now you can see the metric aggregated across all resources (hosts/vm/container) in each sub-group. As the data table shows, each plot line represents one of the two ``demo_datacenters``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/comp-aggregates-04.png
    :width: 99%
    :alt: This screenshot shows an example of the analytics aggregated and grouped by the metadata you selected.

.. _retain-peaks-and-valleys-in-longer-time-ranges:

Retain peaks and valleys in longer time ranges
=========================================================

By default, Splunk Infrastructure Monitoring selects a :new-page-ref:`rollup <rollups>` that is appropriate for the time range and :new-page-ref:`chart resolution <chart-resolution>` you have selected. For example, let’s assume you are sending a metric every 10 seconds to Infrastructure Monitoring, and that its metric type is gauge. If you are looking at a month’s worth of that metric in a chart, there are too many data points to display (6 data points per minute x 60 minutes per hour x 24 hours per day x 30 days per month = 259,200 data points).

In this situation, Infrastructure Monitoring applies the default visualization rollup of Average for a gauge metric. This rollup has the effect of averaging out the data, and makes peaks or valleys that are visible at the higher resolution less apparent.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/retain-peaks-and-valleys-01.png
    :width: 99%
    :alt: This screenshot shows an example of the default visualization rollup of Average, the gauge metric

|br|

To retain the peaks or valleys, you can change the rollup to :strong:`max` or :strong:`min`, whichever is more relevant to your metric. The Y-axis value range may change from what it was in the original visualization. In this illustration, we clone plot A and change the rollup to :strong:`max` in plot B (and change the color in plot B to make the differences easier to see). To clone a plot line, open the plot’s Actions menu (|more|) at the far right of the plot line, then select :strong:`Clone`. For information on changing plot color, see :ref:`plot-config-panel`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/retain-peaks-and-valleys-02.png
    :width: 99%
    :alt: This screenshot shows an example of changing the default visualization rollup of Average, the gauge metric, to rollup to max

|br|

To make peaks and valleys even more noticeable, :new-page-ref:`increase the chart display resolution <dashboard-resolution>`. Here, we change it from the default to Very High. The differences are more visible.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/retain-peaks-and-valleys-03.png
    :width: 99%
    :alt: This screenshot shows an example of changing the chart display resolution to very high

|br|

Choosing a shorter time frame increases visibility as well. Here, we change the time range from the past 20 days to the past week.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/retain-peaks-and-valleys-04.png
    :width: 99%
    :alt: This screenshot shows an example of changing the time range from the past 20 days to the past week

|br|

For more information about the interactions between rollups, chart resolution, and analytics, see :new-page-ref:`data-resolution-rollups-charts`.

.. _correlate-multiple-metrics:

Correlate multiple metrics
=========================================================

It is often useful to visualize multiple metrics on the same chart so as to more easily correlate their behavior. For example, you may want to look at the number of transactions happening per second alongside the latency of the transactions. Splunk Infrastructure Monitoring lets you display as many metrics as you want on a single chart, and gives you two Y-axes in case the ranges of the metrics’ values are significantly different.

1. Select the metric you want to compare and enter its name in the Signal field for plot A. In this example, we are using ``demo.trans.latency``.

2. Select the second metric and use it in plot B. We’ve selected ``demo.trans.count``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/correlate-metrics-01.png
    :width: 99%
    :alt: This screenshot shows an example of using demo.trans.latency and demo.trans.count for comparing correlations

|br|

1. In plot B, click :guilabel:`Y-Axis` and select :strong:`right`. To learn more, see :ref:`2nd-y-axis`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/correlate-metrics-02.png
    :width: 99%
    :alt: This screenshot shows how to change the Y-Axis label to right

|br|

1. Using the visualization type option for each plot line, select different types for A and B, such as Line for A and Column for B. To learn more, see :ref:`plot-display-type`. In this example, we also used plot configuration options to change the color of plot line B to enhance visibility. To learn more, see :ref:`plot-color`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/correlate-metrics-03.png
    :width: 99%
    :alt: This screenshot shows how to change the plot type of B, demo.trans.count, to column to enhance visibility

.. _view-weekly-daily-hourly-comparisons:

View weekly, daily or hourly comparisons
=================================================

If time of day or week matters for understanding whether your apps or infrastructure are performing within normal bounds, or if your business sees cyclical or periodic demand, e.g. weekdays and weekends are very different, then you can create charts that highlight the change from one week, one day, one hour etc. to the next. (Note that Splunk Infrastructure Monitoring allows you to do comparisons using whatever timeframe you want, not just these intervals.)

1. Use the first plot (plot A) to show the metric you care about, then clone A to create plot B. (To clone a plot line, open the plot’s Actions menu (|more|) at the far right of the plot line, then select :strong:`Clone`.) In this example, we are using ``memory.usage.total`` as our signal.

2. Add a :new-page-ref:`Timeshift <timeshift>` function to plot B, entering a time range over which the change matters, For example, use ``5m`` for 5 minutes, ``2d`` for 2 days, and ``1w`` for 1 week.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/compare-time-frame-01.png
    :width: 99%
    :alt: This screenshot shows how to select timeshift as an function

|br|

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/compare-time-frame-02.png
    :width: 99%
    :alt: This screenshot shows how the one week time range over the change matters, which is memory.usage.total in the example

|br|

3. In plot C, click on :strong:`Enter Formula` to enter ``A-B`` to see the difference between now and a week ago.

4. Use the plot configuration panel to specify an area visualization for plot C. To learn more, see :ref:`plot-config-panel`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/compare-time-frame-03.png
    :width: 99%
    :alt: This screenshot shows how to change the visualization for plot C to compare the differences between A and B

.. _use-timeshift-function-to-understand-trends:

Use the Timeshift function to understand trends
=======================================================

In infrastructure and application monitoring, the trend of a metric (the rate at which it is changing) is frequently of greater interest than the absolute value of the metric itself. For example, it might not be meaningful to know that your CPU is 70% utilized, but you might care to know that the utilization has doubled consistently for the past 10 minutes, as that might indicate that the system is trending towards failure.

1. Use the first plot (plot A) to show the metric you care about (we used the mean for ``cpu.utilization``), then clone A to create plot B. (To clone a plot line, open the plot’s Actions menu (|more|) at the far right of the plot line, then select :strong:`Clone`).

2. Add a :new-page-ref:`Timeshift <timeshift>` function to plot B, entering a time range over which the change matters, e.g. ``5m`` for 5 minutes.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/timeshift-to-understand-trends-01.png
    :width: 99%
    :alt: This screenshot shows how to select timeshift as an function and use cpu.utilizations as an example

|br|

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/timeshift-to-understand-trends-02.png
    :width: 99%
    :alt: This screenshot shows how the 5 minutes time range over the change matters, which is cpu.utilizations in the example

|br|

3. In plot C, enter the formula ``(A/B-1)`` and add a ``scale:100`` function to express the rate of change as a percentage.

4. Alt-click or option-click on the eye icon next to plot C to display only that plot, which shows you the percentage change over your disk utilization from 5 minutes prior.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/timeshift-to-understand-trends-03.png
    :width: 99%
    :alt: This screenshot shows how to only display plot C, which is (A/B-1)

|br|

5. Edit the plot name for plot C, so useful information shows up when you hover over the chart or view the data table.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/timeshift-to-understand-trends-04.png
    :width: 99%
    :alt: This screenshot shows how to change the name of the plot for adding useful information when hover over the chart

.. _use-percentages-or-ratios:

Use percentages or ratios
===================================

In many cases, you may want to see percentages or ratios rather than the raw metric. For example, the ratio of return codes that signify failure to those that signify success, or the percentage of cache hits out of total cache accesses (hits + misses). 

1. Use the first plot (plot A) to show one of the metrics you care about, e.g. ``zipper.missCount``.

2. Use the second plot (plot B) to show the other metric you want, e.g. ``zipper.hitCount``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/percentage-ratio-01.png
    :width: 99%
    :alt: This screenshot shows plot A as zipper.missCount and plot B as zipper.hitCount

|br|

3. In plot C, enter formula ``A/(A+B)`` and add a ``scale:100`` function to express the ratio as a percentage.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/percentage-ratio-02.png
    :width: 99%
    :alt: This screenshot shows how to add a formulate and scale to show percentage

|br|

4. Alt-click or option-click on the eye icon next to plot C to hide the other plots. You are left with a chart that shows the percentage of missed hits over time.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/percentage-ratio-03.png
    :width: 99%
    :alt: This screenshot shows how to only display plot C, which is A/(A+B)

|br|

5. Edit the plot name for plot C, so useful information shows up when you hover over the chart (before and after shown below) or view the data table.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/percentage-ratio-04.png
    :width: 99%
    :alt: This screenshot shows how to change the name of the plot for adding useful information when hover over the chart

.. _use-percentiles:

Use percentiles to see population overviews
===================================================

When you want to get a quick overview of a population, a distributed percentile chart is a good option. To construct such a chart, use non-stacked area charts. Select :guilabel:`Show on-chart legend` in the :strong:`Chart Options` tab (see :ref:`on-chart-legend`), then show the plots like the following.

- p10. In the first plot (plot A), enter the metric and filters you want, then use the :new-page-ref:`Percentile` function and enter ``10`` as the value.

- median. Clone plot A and use ``50`` as the value.

- p90. Clone plot B and use ``90`` as the value.

This illustration shows what such a chart might look like:

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/percentiles.png
    :width: 99%
    :alt: This screenshot shows the percentiles of three plots, which are demo.trans.latency in the example

|br|

To see specific values, hover over different points on the chart or display the data table.

.. _show-top-or-bottom-lists:

Show Top or Bottom N lists
===========================================

:new-page-ref:`Top or bottom N charts <top-bottom>` are great for showing simple outliers, rankings or worst performers.

1. Enter a metric for plot A. We chose ``cpu.utilization``.

2. Select :new-page-ref:`List <list-charts>` as your chart type.

3. Apply the analytics function Top or Bottom, then choose either the number of values you want to see in the list or the percentage range you want to see. In this example, we chose ``Top 5`` and specified :strong:`Count`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/show-top-01.png
    :width: 99%
    :alt: This screenshot shows top 5 of cpu.utilization in a list chart

|br|

4. To reduce redundant metadata on the chart, select ``custom`` under the :strong:`Display Fields` option in the :strong:`Chart Options` tab to hide the plot name.

5. :strong:`Sort` Top N charts by ``Descending`` value, or Bottom N by ``Ascending`` value.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/show-top-02.png
    :width: 99%
    :alt: This screenshot shows a descending view of top 5 of cpu.utilization in a list chart

6. To make the chart even easier to read, use the :strong:`Display Fields` option to hide more fields. You can also hide :strong:`Entries with missing data` under the :strong:`Visualization Options`.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/show-top-03.png
    :width: 99%
    :alt: This screenshot shows the view of top 5 of cpu.utilization in a list chart that hides entries with missing data and fields except host.name, host.type and kubernetes_cluster
.. _see-changes-in-distribution:

See changes in distribution
=========================================

A histogram is a good way to look at the distribution of a population at a single point in time. Splunk Infrastructure Monitoring provides histograms so you can look at the change in that distribution over time. This is useful for surfacing unexpected changes, e.g. in the latencies of requests served by a cluster.

1. Select a metric that is being sent from a relatively large number of sources. In this case, we chose ``demo.trans.latency``.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/distribution-01.png
    :width: 99%
    :alt: This screenshot shows demo.trans.latency in a line chart view

|br|

2. Choose the histogram graph type.

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/distribution-02.png
    :width: 99%
    :alt: This screenshot shows demo.trans.latency in a histogram view

|br|

.. _smooth-out-peaks-and-valleys:

Smooth out peaks and valleys
=====================================

Do you want to smooth out peaks and valleys in your data, to see general patterns from one period to the next? If you can’t tell at a glance if a value is generally steady, rising, or falling, you want to see data normalized in a moving average format, from one time period to the next. To do this, use the Transformation option instead of Aggregation. The Transformation option is available with the following analytics functions: :new-page-ref:`mean`, :new-page-ref:`min-max`, :new-page-ref:`percentile`, :new-page-ref:`sum`, and :new-page-ref:`variance`. For Mean, Minimum, Maximum, and Sum, you can specify either a moving window (the past number of minutes, hours, etc.) or a calendar time window (over the past day, week, month, etc.)

1. Determine an appropriate interval for applying a moving average.

2. Use the ``Mean`` analytics function, select the ``Mean:Transformation`` option, then select the appropriate time window option.

3. Enter your interval, e.g. 5m.

In the following illustration, values and moving averages are displayed for cpu.utilization as follows:

- Plot A: Actual values

- Plot B: 30-minute moving average

- Plot C: 1-hour moving average

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/smooth-out-peaks-and-valleys-01.png
    :width: 99%
    :alt: This screenshot shows an example of moving averages are displayed for cpu.utilization by all, 30-minute, and 1-hour

|br|

You can also hide plot lines to make the chart easier to read:

..  image:: /_images/data-visualization/charts/gain-insights-through-chart-analytics/smooth-out-peaks-and-valleys-02.png
    :width: 99%
    :alt: This screenshot shows an example of moving averages are displayed for cpu.utilization by all and 1-hour with 5-minute and 30-minute being hidden

.. _gain-insights-next-steps:

Next steps
==================

For details about all available analytics functions, see the :new-page-ref:`analytics-ref`.

Once you have developed charts to help you proactively monitor your system, the natural next step is to want to view and receive alerts when values reach certain criteria. For information on how to do this, see :new-page-ref:`get-started-detectoralert`.