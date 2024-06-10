.. _profiling-memory-metrics:

****************************************************************
Memory profiling metrics
****************************************************************

.. meta:: 
   :description: AlwaysOn Profiling provides memory metrics that you can use to build dashboards and set up alerts.

AlwaysOn Profiling provides memory metrics that you can use to build dashboards and set up alerts. The following image shows a sample dashboard of JVM memory metrics for a service:

..  image:: /_images/apm/profiling/memory-profiling-metrics_1.png
    :alt: Sample dashboard with memory profiling metric data.

For more information on dashboards, see :ref:`dashboard-create-customize`.

The list of available memory metrics depends on the programming language. See :ref:`get-data-in-profiling` for supported languages.

Java Runtime Metrics dashboard
================================

Use the configured dashboard for :ref:`JVM metrics <jvm-metrics>` to check memory usage. To access the the Java runtime metrics dashboard, follow these steps: 

#. Go to Dashboards from the navigation menu in Splunk Observability Cloud.
#. On the dashboard landing page under the built-in dashboard group, select either :guilabel:`APM java services` or :guilabel:`APM Java services (OTel 2.x)` depending on whether you are using version 1.0 or 2.0 of the Splunk Distribution of OpenTelemetry Java. Anyone can access this group by default.
#. Select either the :guilabel:`Java runtime metrics` dashboard or the :guilabel:`Java runtime metrics (Otel 2.x)` dashboard.

Node.js Runtime Metrics dashboard
===================================

You can access a configured dashboard for :ref:`Node.js runtime metrics <nodejs-otel-runtime-metrics>` to check memory usage. There are two ways to access the Node.js Runtime Metrics dashboard.

From the dashboards
---------------------

#. Go to Dashboards from the navigation menu in Splunk Observability Cloud.
#. On the dashboard landing page and select the :guilabel:`APM NodeJS services` built-in dashboard group. Anyone can access this group by default.
#. Select the :guilabel:`NodeJS runtime metrics` dashboard.

From Splunk APM
-----------------
#. Go to :guilabel:`AlwaysOn Profiling` from within APM.
#. Select a service.
#. Select :guilabel:`Node.js Runtime Metrics` to navigate to the runtime metrics dashboard.

.NET Runtime Metrics dashboard
================================

You can access a configured dashboard for :ref:`.NET runtime metrics <dotnet-runtime-otel-metrics>` to check memory usage. There are two ways to access the .NET Runtime Metrics dashboard.

From the dashboards
---------------------

#. Go to Dashboards from the navigation menu in Splunk Observability Cloud.
#. On the dashboard landing page and select the :guilabel:`APM .NET services` built-in dashboard group. Anyone can access this group by default.
#. Select the :guilabel:`.NET runtime metrics` dashboard.

From Splunk APM
-----------------
#. Go to :guilabel:`AlwaysOn Profiling` from within APM.
#. Select a service.
#. Select :guilabel:`.NET Runtime Metrics` to navigate to the runtime metrics dashboard.
