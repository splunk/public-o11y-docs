.. _profiling-memory-metrics:

****************************************************************
Memory profiling metrics
****************************************************************

.. meta:: 
   :description: AlwaysOn Profiling provides memory metrics that you can use to build dashboards and set up alerts.

AlwaysOn Profiling provides memory metrics that you can use to build dashboards and set up alerts. The following image shows a sample dashboard of JVM memory metrics for a service:

..  image:: /_images/apm/profiling/memory-profiling-metrics.png
    :alt: Sample dashboard with memory profiling metric data.

For more information on dashboards, see :ref:`dashboard-create-customize`.

The list of available memory metrics depends on the programming language. See :ref:`get-data-in-profiling` for supported languages. 

Java Runtime Metrics dashboard
================================

You can access a configured dashboard for :ref:`JVM metrics <jvm-metrics>` to check memory usage. There are two ways to access the Java Runtime Metrics dashboard.

From the dashboards
---------------------

#. Go to Dashboards from the navigation menu in Splunk Observability Cloud.
#. On the dashboard landing page and select the :guilabel:`APM java services` built-in dashboard group. Anyone can access this group by default. 
#. Select the :guilabel:`Java runtime metrics` dashboard. 

From Splunk APM
-----------------
#. Go to :guilabel:`AlwaysOn Profiling` from within APM. 
#. Select a service.
#. Select :guilabel:`Java Runtime Metrics` to navigate to the runtime metrics dashboard.

NodeJS Runtime Metrics dashboard
================================

You can access a configured dashboard for :ref:`NodeJS runtime metrics <nodejs-otel-runtime-metrics>` to check memory usage. There are two ways to access the NodeJS Runtime Metrics dashboard.

From the dashboards
---------------------

#. Go to Dashboards from the navigation menu in Splunk Observability Cloud.
#. On the dashboard landing page and select the :guilabel:`APM NodeJS services` built-in dashboard group. Anyone can access this group by default. 
#. Select the :guilabel:`NodeJS runtime metrics` dashboard. 

From Splunk APM
-----------------
#. Go to :guilabel:`AlwaysOn Profiling` from within APM. 
#. Select a service.
#. Select :guilabel:`NodeJS Runtime Metrics` to navigate to the runtime metrics dashboard.

.NET Runtime Metrics dashboard
================================

You can access a configured dashboard for :ref:`.NET runtime metrics <dotnet-runtime-metrics>` to check memory usage. There are two ways to access the NodeJS Runtime Metrics dashboard.

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
