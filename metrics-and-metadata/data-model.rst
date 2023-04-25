.. _data-model:

*****************************************************************
Data types in Splunk Observability Cloud
*****************************************************************

.. meta::
  :description: Learn about the data types available in Splunk Observability Cloud: metrics, events, traces, and logs.

The :ref:`Splunk Observability Cloud platform <get-started-o11y>` provides you with the tools to collect, manage, and visualize the following data types: metrics, events, logs, and traces. 

With Observability Cloud's features, you'll be able to build charts and dashboards, and set up alerts and other system notification methods. This will help you better understand the performance of your systems and services, detect anomalies, or plan deployments and enhancements.

Quick overview of Observability Cloud data types
========================================================

Observability Cloud works with the following data types:

* :strong:`Metrics`: A metric is a measurement about a data source (host, application) that varies over time. For more information, read :ref:`metrics-landing`. 

  - Metrics and their metadata are stored in data points, which are then collected in metric time series. 
  - Metadata includes dimensions, custom properties, tags, and attributes.
  - Metrics can be collected by Infrastructure, APM (as :ref:`MetricSets <metricset-concept>`), RUM, Browser, or Synthetics. 
  - Observability Cloud also produces its own :ref:`org metrics <org-metrics>` to help you understand how it's performing.

* :strong:`Events`: Context added to metric data. See more at :ref:`events-intro`.

* :strong:`Traces and spans`: A collection of operations, known as spans, that represent a unique transaction an application handles. See more at :ref:`apm-traces-spans`.

* :strong:`Logs`: Automatic, time-stamped record of a relevant event or activity. Log ingestion is configured for each feature. To learn how to query logs, see :ref:`logs-intro-logconnect`.

Next steps: Tools and analytics
========================================================

Observability Cloud provides a wide array of features and tools to help you manage, understand, and leverage your data. For more details, refer to :ref:`data-tools-landing`.

For advanced analytics, use SignalFlow to analyze incoming data and write custom chart and detector analytics. See more at :ref:`signalflow-analytics-intro`.

