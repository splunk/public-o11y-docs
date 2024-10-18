.. _infrastructure-monitoring-analytics:

************************************************
Splunk Infrastructure Monitoring analytics
************************************************

.. meta::
    :description: Splunk infrastructure monitoring analytics overview, rollup policies, signalflow instructions, and analytics aggregations and transformations

Conceptually, a SignalFlow program consists of a several computational blocks, each of which accepts some input, performs some computation (for example, sum, mean, max, and so on) and generates some output. The blocks are connected in a directed graph so that the output of one unit flows as input to other units, resulting in a cascading series of computations that calculates the desired results.

In practice, individual SignalFlow programs are the computational backbone for charts in Infrastructure Monitoring, and are visualized in the Infrastructure Monitoring application as an interlinked set of analytics pipelines.

The initial input into a SignalFlow program is typically a set of one or more time series.

.. _rollup-policies:

Rollup policies
====================

Each set of time series in a plot line has a common metric type, whether a gauge, counter or cumulative counter. The metric type determines the default visualization :new-page-ref:`rollups <rollups>` that is applied to the time series data. The defaults in each case are chosen to ensure that values displayed are accurate and stable across different chart resolutions.

Take as an example a gauge that is reporting every 30 seconds. In a chart with a time range of 5 minutes, each reported value can be shown on the chart, as there is typically enough screen real estate to show the data at its native resolution, i.e. 10 data points sent in during a 5‑minute period. If the time range is changed to 1 week, however, Infrastructure Monitoring automatically switches to a coarser chart resolution to match.

In this case, Infrastructure Monitoring uses the :strong:`Average` rollup to calculate the average value of the gauge, over each time interval at the coarser chart resolution. With one week's worth of data, each visible data point is the average of the values sent during the chosen interval. Infrastructure Monitoring then plots those average values, instead of, say, a sampled value. In general, this provides a more accurate representation of the data, but it also has the side effect of averaging out peaks and valleys, which may not be desirable, depending on the actual metric.

.. note::

    If you prefer to see sampled values, you can select the :strong:`Latest` rollup, or if you prefer to see the peaks and valleys, you can select the :strong:`Max` or :strong:`Min` rollups, respectively.

For a counter or cumulative counter, the chosen rollup affects not only the accuracy, but more generally how the chart behaves as you change the time range. For example, you have a counter, sent as a high-resolution metric, that tells you how many responses a server handled per 1‑second interval. If you use a rollup of :strong:`Rate/sec` rather than the default :strong:`Sum` rollup, then in a chart with a time range small enough to show the time series at its native resolution, values are reported as follows:

- For a counter, each reported :strong:`Rate/sec` value is shown normalized by the interval, for example, number of responses during each 1‑second interval, divided by 1 (for data coming in every second), number of responses during each 5‑second interval, divided by 5 (for data coming in every 5 seconds) etc.

- For a cumulative counter, the default rollup is :strong:`Delta`, so each reported :strong:`Rate/sec` value is the delta from the last data point normalized by the interval, divided by 1 (for data coming in every second), divided by 5 (for data coming in every 5 seconds), etc.

If you then change the time range, such that each data point to plot represents, say, a 4‑minute interval, then values are reported as follows:

- For a counter, each data point is the sum of all the responses during that 4‑minute interval, divided by 240 (the number of seconds in that interval).

- For a cumulative counter, each data point is the sum of delta rollups over the interval (delta rollups are the differences between successive data points), divided by 240 (the number of seconds in the interval).

In all likelihood, this has an impact similar to the :strong:`Average` rollup for a gauge: it provides an accurate representation of the data, and one whose visualization is aligned with how you typically use line or area charts.

In contrast, if you choose a different rollup, such as :strong:`Sum`, then the behavior of the chart changes with different chart resolutions. In a chart with a time range small enough to show the time series at its native resolution, each reported value is same as in the rate per second case, as the sum rollup occurs over a 1‑second interval. In a chart with a four-minute interval, however, the values shown are the sum of all values during the 240 seconds. This is likely to generate a value that is significantly higher than the normalized rate per second rollup, and depending on the nature of your metric, it may be what you are looking for.

To learn more about the interaction of rollups, resolutions, and analytics, see :new-page-ref:`data-resolution-rollups-charts`.

.. _how-signalflow-handles-metadata:

How SignalFlow handles metadata
======================================

SignalFlow computations often involve both data and corresponding metadata - dimensions, properties, or tags. For example, when a mean is computed across CPU utilization metrics received from server instances spread out across multiple regions or availability zones, you can group them by the regions or availability zones, so that you can discern whether one is running hotter than the next at the aggregate level.

To ensure that calculations throughout a SignalFlow program are able to make use of this metadata, time series data is ingested into a SignalFlow computation with its corresponding metadata. Subsequent computations on data include corresponding computations on metadata so that the result includes both data and metadata components, enabling further downstream processing and re-aggregations, as necessary.

Computations that output a single summary result from a collection of time series, such as a sum or mean, use only the metadata that shares the same name and values across the collection. In contrast, computations that select values from a collection, such as maximum, minimum and so on, use the corresponding metadata of the selected values as is.

To learn more about SignalFlow computations, see :new-page-ref:`get-started-signalflow`.

.. _aggregations-and-transformations:

Aggregations and transformations
========================================

An analytic computation is a mathematical function that is applied to a collection of data points. For example, a mean is computed over a collection of data points by dividing the sum of the collection by the number of data points in the collection. In the context of time series calculations, an analytic computation is applied either as an aggregation or a transformation. For more information, see :new-page-ref:`aggregations-transformations`.
