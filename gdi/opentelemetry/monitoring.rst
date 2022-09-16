.. _otel-monitoring:

****************************************************************
Monitoring
****************************************************************

.. meta::
      :description: Describes how to ensure that the Splunk Distribution of OpenTelemetry Collector is healthy.

The default configuration automatically scrapes the Collector's own metrics and sends the data using the ``signalfx`` exporter. A built-in dashboard provides information about the health and status of Collector instances.

In addition, logs should be collected. For :ref:`Log Observer <get-started-logs>` customers, logs are automatically collected for the Collector and Journald processes.

The Collector also offers zPages. zPages provide in-process web pages that display collected data from the process that they are attached to. These pages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics. These pages are useful during development time or when the process to be inspected is known in production.
