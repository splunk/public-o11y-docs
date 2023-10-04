.. _explicit-bucket-histograms:

***********************************************************
Histogram support in Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry feeds charts, alerts, and other features.

Splunk Observability Cloud natively supports histograms. All histogram metric data you send to Splunk Observability Cloud through OpenTelemetry powers charts, alerts, and other features.

Histograms help summarize data in a distribution so that 

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


Get histogram data into Splunk Observability Cloud
===========================================================

The Splunk Distribution of OpenTelemetry Collector fully supports explicit bucket histogram metrics starting from version 0.86.

To get histogram data into Splunk Observability Cloud, see :ref:`enable-histograms-export`.


Migrate your dashboards, functions, charts, and detectors
===========================================================

Migrating your existing dashboards, functions, charts, and detectors 

Stop sending split data points and send histograms
Collector migration steps / upgrade the Collector and the config
Edit the charts and use the new histogram function
Migration script? TBD
Update of APM metrics – for OOTB dashboards, etc. 


Send histogram data using the API
===========================================================

How to send histograms directly using the API (link to API reference)
