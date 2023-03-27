.. _data-model:

*****************************************************************
Data types in Splunk Observability Cloud
*****************************************************************

.. meta::
  :description: Learn about the data types available in Splunk Observability Cloud: metrics, events, traces, and logs.

The :ref:`Splunk Observability Cloud platform <get-started-o11y>` provides you with the tools to collect, manage, and visualize the following data types: metrics, events, logs, traces, and logs. You can use them to set up alerts and other system notification method, or detect anomalies BLA BLA.

Quick overview of Observability Cloud data types
========================================================

The platform works with the following data types:

* :strong:`Metrics`: A measurable number that varies over time. 

  - Metrics and their metadata are stored in data points, which are then collected in metric time series. See more at :ref:`metrics-landing`. 
  - Metadata includes dimensions, custom properties, and tags.
  - Metrics can be collected by Infrastructure, APM (as :ref:`MetricSets <metricset-concept>`), RUM, Browser, or Synthetics. 
  - Observability Cloud also produces its own :ref:`org metrics <org-metrics>` to help you understand how the platform is performing.

* :strong:`Events`: Context added to metric data. See more at :ref:`events-intro`.

* :strong:`Traces and spans`: Specific to APM. A collection of operations, known as spans, that represent a unique transaction an application handles. See more at :ref:`apm-traces-spans`.

* :strong:`Logs`: Automatic, time-stamped record of a relevant event or activity. Log ingestion depends on the feature. To learn how to query logs, see :ref:`logs-intro-logconnect`.

Data management tools 
========================================================

The platform provides a wide array of features and tools to help you manage, understand, and leverage your data:

* :ref:`metrics-finder-and-metadata-catalog`
* :ref:`get-started-relatedcontent`
* :ref:`data-visualization-charts` 
* :ref:`dashboards`
* :ref:`signalflow-analytics-intro`