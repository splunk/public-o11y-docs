.. _explicit-bucket-histograms:

***********************************************************
Histogram support in Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry feeds charts, alerts, and other features.

Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry feeds charts, alerts, and other features.

Currently, only explicit bucket histograms are supported.

 
Explicit bucket histograms
===========================================================

Examples (performance data analysis, etc.)

Advantages over other metric types

Get histogram data into Splunk Observability Cloud
===========================================================

The Splunk Distribution of OpenTelemetry Collector fully supports explicit bucket histogram metrics starting from version 0.86.

To get histogram data into Splunk Observability Cloud, see :ref:`enable-histograms-export`.

Migrate your dashboards, functions, charts, and detectors
===========================================================

Migration instructions

Send histogram data using the API
===========================================================

How to send histograms directly using the API (link to API reference)
