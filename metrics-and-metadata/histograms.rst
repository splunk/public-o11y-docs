.. _histograms:

***********************************************************
Histogram metric support in Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry feeds charts, alerts, and other features.

Splunk Observability Cloud natively supports histograms. You can use the histogram metric data you send from instrumented applications and services to Splunk Observability Cloud to create charts, detectors, and more.

Understanding histograms
=======================================================

A histogram represents the distribution of observations. Histograms require numerical, continuous values. Examples of continuous values include time, size, or temperature. The following chart is a visual representation of a histogram for response times, in milliseconds:

.. image:: /_images/understand/histogram.png
      :width: 60%
      :alt: A sample histogram for response times with five intervals.

Histograms store data in buckets, which are adjacent intervals with numeric boundaries. The buckets or bars in the previous histogram span 100 milliseconds. The size of each bar is determined by the number of observations inside of interval: the higher the bar, the more data points fall within the interval.

For each histogram you can calculate the total number of observations, the minimum and maximum value, the sum of all values, the average value, and discrete percentile values. Splunk Observability Cloud provides a SignalFuse function for histograms which you can use to customize histograms or perform calculations on the data.

Histograms are useful to compare different datasets at a glance, and to identify trends in your data that might be otherwise hard to detect. For example, thanks to histograms you can answer questions like "What was the 90th percentile of response time for the database yesterday?"


.. _when-use-histograms:

When to use histogram metrics
===========================================================

Histograms can summarize data in ways that would be difficult to reproduce with other metrics. Thanks to the buckets, the distribution of your continuous data over time is easier to explore, as you don't have to analyze the entire dataset to see where all the data points are. At the same time, histogram helps reduce usage of your subscription through multi-rollup, which allows to aggregate multiple metrics time series (MTS) into a single MTS.

.. Rewrite before publication, see thread in tmp channel on no-bucket histograms


Service level objectives (SLO)
-----------------------------------------------------------

Histograms are particularly suited for representing performance and availability service level objectives (SLO). An example of availability SLO is checking whether percentile ``n`` of all requests are processed in less than a certain duration. An example of availability SLO is checking that a percentile ``n`` of screens in your app load successfully.

Unlike metrics covering a single percentile or quantile, histograms contain the percentiles or quantiles you need to track in a single metric. This facilitates exploring data in depth after initial detections. For example, if you get an alert for percentile 99 for response time of a service, using histograms you can explore other percentiles.


Histogram instead of calculated metrics
-----------------------------------------------------------

Histograms contain data that you can use to calculate percentiles and other statistics in Splunk Observability Cloud instead of calculating them using your infrastructure. Sending histograms also results in less MTS sent, which has a positive impact on your subscription usage.

For example, if you're sending the ``service.response_time.upper_90`` and ``service.response_time.upper_95`` metrics to track the response time of a key service in your infrastructure at percentiles 90 and 95, you can send histogram data for the entire distribution of response times, eliminating the need of sending two separate metric time series (MTS).

For more information, see :new-page:`Why Histograms <https://opentelemetry.io/blog/2023/why-histograms/>` in the OpenTelemetry documentation.


.. _explicit-bucket-histograms:

Explicit bucket histograms
===========================================================

Explicit bucket histograms are histograms with predefined bucket boundaries. The advantage of defining bucket boundaries yourself is that you can use limits that make sense in your situation.

For example, the following Java code creates an OpenTelemetry histogram with explicit bucket boundaries:

.. code-block:: java
   :emphasize-lines: 4

   void exampleWithCustomBuckets(Meter meter) {
      DoubleHistogramBuilder originalBuilder = meter.histogramBuilder("people.ages");
      ExtendedLongHistogramBuilder builder = (ExtendedLongHistogramBuilder) originalBuilder.ofLongs();
      List<Long> bucketBoundaries = Arrays.asList(0L, 5L, 12L, 18L, 24L, 40L, 50L, 80L, 115L);
      LongHistogram histogram =
         builder
               .setAdvice(advice -> advice.setExplicitBucketBoundaries(bucketBoundaries))
               .setDescription("A distribution of people's ages")
               .setUnit("years")
               .build();
      addDataToHistogram(histogram);
   }

Currently, Splunk Observability Cloud only supports explicit bucket histograms.

.. _histograms-gdi:

Get histogram data into Splunk Observability Cloud
===========================================================

You can collect histogram data using a variety of receivers, including the :ref:`Prometheus receiver <prometheus-receiver>`, and send them to Splunk Observability Cloud using the OpenTelemetry Collector.

The Splunk Distribution of OpenTelemetry Collector fully supports explicit bucket histogram metrics. You can send histogram metric using the OTLP exporter or, starting from version 0.94, through the SignalFx exporter.

For instructions on how to get histogram data into Splunk Observability Cloud, see :ref:`enable-histograms-export`.

Send histogram data using the API
-----------------------------------------------------------

If you need to bypass the OpenTelemetry Collector, send histogram data directly to Splunk Observability Cloud using the ``/v2/datapoint/otlp`` endpoint of the ingest API. The endpoint accepts data in OTLP format, serialized as Protobuf.

To learn how to send histogram metric data using the API, see :new-page:`/datapoint/otlp <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>` in the developer documentation.

.. _migrate-histograms:

Migrate your dashboards, functions, charts, and detectors
===========================================================

To migrate your existing dashboards, functions, charts, and detectors to histograms, follow these steps:

1. Make sure that you're sending histogram data using the Splunk Distribution of OpenTelemetry Collector version 0.94 or higher. Lower versions can't send histogram data in OTLP format using the SignalFx exporter.

2. Start sending histogram metrics through the OTLP exporter or the SignalFx exporter. See :ref:`enable-histograms-export` for more information on how to activate this feature in the Collector.

3. Edit your charts to use the new ``histogram()`` function. See :new-page:`histogram() <https://dev.splunk.com/observability/docs/signalflow/functions/histogram>` in the SignalFlow reference documentation.


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst