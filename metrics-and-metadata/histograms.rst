.. _histograms:

***********************************************************
Histogram support in Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry feeds charts, alerts, and other features.

Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry powers charts, alerts, and other features.

Histograms help summarize data in a distribution so that 

.. _explicit-bucket-histograms:

Explicit bucket histograms
===========================================================

Explicit bucket histograms group data in buckets over time. For example, 


ATLASSIAN METRICS

Histogram metric data points convey a population of recorded measurements in a compressed format. A histogram bundles a set of events into divided populations with an overall event count and aggregate sum for all events.

Examples (performance data analysis, etc.)

What other data types do we want users to use less–so that they use histograms more?
Anytime you have a metric name that has a specific statistic in it
service.latency.p99 service.latency.p90
(List of Atlassian metrics)

Histograms are 


.. _histograms-gdi:

Get histogram data into Splunk Observability Cloud
===========================================================

The Splunk Distribution of OpenTelemetry Collector fully supports explicit bucket histogram metrics starting from version 0.86 through the ``send_otlp_histogram`` setting of the SignalFx exporter.

For instructions on how to get histogram data into Splunk Observability Cloud, see :ref:`enable-histograms-export`.

Send histogram data using the API
-----------------------------------------------------------

If you need to bypass the OpenTelemetry Collector, send histogram data directly to Splunk Observability Cloud using the ``/v2/datapoint/otlp`` endpoint of the ingest API. The endpoint accepts data in OTLP format, serialized as Protobuf.

To learn how to send histogram metric data using the API, see :new-page:`/datapoint/otlp <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>` in the developer documentation.

.. _migrate-histograms:

Migrate your dashboards, functions, charts, and detectors
===========================================================

To migrate your existing dashboards, functions, charts, and detectors to histograms, follow these steps:

1. Make sure that you're sending histogram data using the Splunk Distribution of OpenTelemetry Collector version 0.86 or higher. Lower versions can't send histogram data in OTLP format.

2. Start sending histogram metrics instead of split data points. See :ref:`explicit-bucket-histograms` for more information and examples.

3. Edit your charts to use the new ``histogram()`` function. See :new-page:`histogram() <https://dev.splunk.com/observability/docs/signalflow/functions/histogram>` in the SignalFlow reference documentation.


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst