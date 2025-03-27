.. _apm-service-view:
    
Use the service view for a complete view of your service health 
*****************************************************************************

.. meta::
   :description: Learn how to use service views in Splunk APM for a complete view of your service health.

As a service owners you can use the service view in Splunk APM to get a complete view of your service health in a single pane of glass. The service view includes a service-level indicator (SLI) for availability, dependencies, request, error, and duration (RED) metrics, runtime metrics, infrastructure metrics, Tag Spotlight, endpoints, and logs for a selected service. You can also quickly navigate to code profiling and memory profiling for your service from the service view. 

The service view is available for instrumented services, pub/sub queues, databases, and inferred services. See :ref:`service-type-support` for details on the information available for various service types.

Access the service view for your service
===========================================

You can access the service view for a specific service in several places.

You can search for the service using the search in the top toolbar.

..  image:: /_images/apm/spans-traces/service-view-global-search-traces.gif
    :width: 95%
    :alt: Animation showing a user searching for the checkoutservice and selecting the service result. 

You can also access the service view for a specific service within the service map. Start by selecting :guilabel:`Service Map` on the APM landing page. Select a service in the service map, then select :guilabel:`Service view` in the panel.

..  image:: /_images/apm/spans-traces/service-view-service-map.png
    :width: 95%
    :alt: Screenshot of the service view button within the service map when a service is selected. 

Finally, you can also access the service view for a specific service by selecting the service from the APM landing page.

Use the service view to monitor the health of your service
=====================================================================

When you open the service view an environment is selected based on your recently viewed environments. Adjust the environment and time range filters if necessary. Use the following sections to monitor the health of your service.

Service metrics
------------------

Use the following metrics in the :guilabel:`Service metrics` section to monitor the health of your service. Collapse sub-sections that are not relevant to you to customize your service view.

..  image:: /_images/apm/spans-traces/service-view-service-metrics-traces.gif
    :width: 95%
    :alt: This animation shows the service metrics for a service in the service view. The user select a chart to view example traces.

* Success rate SLI - The success service-level indicator (SLI) shows the percentage of time requests for your service were successful in the last 30 days. The chart shows successful and unsuccessful requests. If you configured a success rate service-level objective (SLO), an additional chart displays success rate over the compliance window you specified in your objective. See :ref:`create-slo`.
* Service map - The service map shows the immediate upstream and downstream dependencies for the service you are viewing. The service map in service view is limited to 20 services, sorted by the most number of requests. Hover over the chart and select :guilabel:`View full service map` to go to the service map.
* Service requests - The service requests chart shows streaming request data for the service. If you have detectors for the service requests configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service latency - The service latency chart shows p50, p90, and p99 latency data for the service. If you have detectors for the service latency configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service error - The service error chart shows streaming error data for the service. If you have detectors for the service error rate configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Dependency latency by type - The dependency latency by type chart shows the latency for each of the downstream systems. Select the chart to see details about each system category. Systems are categorized as follows:
   *  Services - instrumented services
   *  Databases
   *  Inferred services - un-instrumented third-party services
   *  Pub/sub queues - Publisher/subscriber queues

Error breakdown
-----------------

Use the following section to troubleshoot service errors and view relevant traces for specific error types. Select a point on the graph to view example traces for a particular data point, or select any value to hide the time series for that value.

..  image:: /_images/apm/spans-traces/service-view-errors.png
    :width: 95%
    :alt: Screenshot of charts on the service view page that display service errors. 

* Errors by exception type - Displays errors with the span attribute ``exception.type``. Select a data point on the chart to view related traces and alert details for that time period. 
* Errors by status code - Displays errors based on the HTTP or gRPC error status code. Select a data point on the chart to view related traces and alert details for that selected time period and error. For more information about error status codes, see :new-page:`Semantic Conventions for HTTP Spans <https://opentelemetry.io/docs/specs/semconv/http/http-spans/>`.

Runtime metrics
-----------------

Instrument your back-end applications to send spans to Splunk APM to view runtime metrics. See :ref:`get-started-application`.

The available runtime metrics vary based on language. See :ref:`metric-reference` for more information.

Infrastructure metrics
-----------------------

If you are using the Splunk Distribution of the OpenTelemetry Collector and the SignalFx Exporter, infrastructure metrics for the environment and service you are viewing display. See :ref:`otel-intro` and :ref:`signalfx-exporter`.

The following infrastructure metrics are available:

* Host CPU usage
* Host memory usage
* Host disk usage
* Host network usage
* Pod CPU usage
* Pod memory usage
* Pod disk usage
* Pod network utilization

View Tag Spotlight view for your service
=====================================================

Select :guilabel:`Tag Spotlight` to view Tag Spotlight view filtered for your service. See :ref:`apm-tag-spotlight` to learn more about Tag Spotlight.

View errors for your service
====================================================

Select the :guilabel:`Errors` tab to visualize errors for your service. Select a specific error type to view available traces for that error, and troubleshoot by viewing details such as the ``exception.message`` or ``exception.stacktrace``. 

Administrators can pause these metrics by going to the :guilabel:`Sources of Errors MetricSets` section on the :guilabel:`APM MetricSets` page and selecting :guilabel:`Pause Indexing`. These metrics are turned on by default.

View endpoints for your service
=================================

Select the :guilabel:`Endpoints` tab to view endpoints for the service. Use the search field to search for specific endpoints. Use the sort drop-down list to change how endpoints are sorted. Select an endpoint to view endpoint details or go to Tag Spotlight, traces, code profiling, or the dashboard for the endpoint.

View logs for your service
===============================

Select :guilabel:`Logs` to view logs for the environment and service you are viewing. By default, logs are displayed for all indices that correspond to first listed Log Observer Connect connection. Logs are filtered by the service you are viewing using the ``service.name`` value. If your logs do not have a ``service.name`` value, you can create an alias in Splunk Web. See :new-page:`Create field aliases in Splunk Web <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2305/Knowledge/Addaliasestofields>`.

To select a different connection or refine which indices logs are pulled from, select :guilabel:`Configure service view`. 

1. In the :guilabel:`Log Observer Connect Index` drop-down list, select the Log Observer Connect connection, then select the corresponding indices you want to pull logs from. 
2. Select :guilabel:`Apply`
3. Select :guilabel:`Save changes`.

The connection and indices you select are saved for all users in your organization for each unique service and environment combination.

View traces for your service
===============================

Select :guilabel:`Traces` to view traces for the environment and service you are viewing. The :guilabel:`Traces` tab includes charts for :guilabel:`Service requests and errors` and :guilabel:`Service latency`. Select within the charts to see example traces. 

Under the charts are lists of :guilabel:`Traces with errors` and :guilabel:`Long traces`. Select the trace ID link to open the trace in trace waterfall view. Select :guilabel:`View more in Trace Analyzer` to search additional traces. See :ref:`trace-analyzer` for more information about using Trace Analyzer to search traces.

View top commands or queries for your databases
===================================================

If you select a Redis or SQL database from the service dropdown menu, you can select :guilabel:`Database Query Performance` to view top commands or queries for your database. See :ref:`db-query-performance` to learn more. 

Go to the code profiling view for your service
=====================================================

Select :guilabel:`Code profiling` to go to the code profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling.

Go to the memory profiling view for your service
=======================================================

Select :guilabel:`Memory profiling` to go to the memory profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling. 

Configure the service view
=====================================================================

Select :guilabel:`Configure service view` to modify the Log Observer Connect connection and indices for the logs you want to display for your service.

1. In the :guilabel:`Log Observer Connect Index` drop-down list, select the Log Observer Connect connection, then select the corresponding indices you want to pull logs from. 
2. Select :guilabel:`Apply`
3. Select :guilabel:`Save changes`.

The connection and indices you select are saved for all users in your organization for each unique service and environment combination.

.. _service-type-support:

Service view support for various service types
===============================================

The information available in your service view varies based on the type of service you select. The following table shows which sections are available for each service type.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 20, 20, 20, 20, 20

   * - :strong:`Service view section`
     - :strong:`Instrumented services`
     - :strong:`Databases`
     - :strong:`Pub/sub queues`
     - :strong:`Inferred services`

   * - Overview
     - Yes, includes service metrics, runtime metrics, and infrastructure metrics
     - Yes, includes only service metrics
     - Yes, includes only service metrics
     - Yes, includes only service metrics

   * - Tag Spotlight
     - Yes
     - Yes
     - Yes
     - Yes

   * - Endpoints
     - Yes
     - No
     - No
     - Yes

   * - Logs
     - Yes
     - Yes
     - Yes
     - Yes

   * - Traces
     - Yes
     - Yes
     - Yes
     - Yes

   * - Database Query Performance
     - No
     - Yes, only displays for Redis and SQL databases.
     - No
     - No

   * - Code profiling
     - Yes
     - No
     - No
     - No

   * - Memory profiling
     - Yes
     - No
     - No
     - No


.. _metric-reference:

Metric reference
===================

The following metrics are used in the service view. 

Service metrics
----------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 50, 50

   * - :strong:`Chart`
     - :strong:`Metrics`

   * - Service requests
     - ``service.request`` with a ``count`` function

   * - Service latency
     - * ``service.request`` with a ``median`` function
       * ``service.request`` with a ``percentile`` function and a percentile value ``90``
       * ``service.request`` with a ``percentile`` function and a percentile value ``99``

   * - Service errors
     - ``service.requests`` with a ``count`` function and a ``sf_error:True`` filter

   * - SLI/SLO 
     - ``service.request`` with a ``count`` function

.NET runtime metrics 
-----------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 50, 50

   * - :strong:`Chart`
     - :strong:`Metrics`

   * - Heap usage
     - ``process.runtime.dotnet.gc.committed_memory.size``

   * - GC collections
     - ``process.runtime.dotnet.gc.collections.count``

   * - Application activity
     - ``process.runtime.dotnet.gc.allocations.size``

   * - GC heap size
     - ``process.runtime.dotnet.gc.heap.size``

   * - GC pause time
     - ``process.runtime.dotnet.gc.pause.time``

   * - Monitor lock contention
     - ``process.runtime.dotnet.monitor.lock_contention.count``

   * - Threadpool thread
     - ``process.runtime.dotnet.monitor.lock_contention.count``

   * - Exceptions
     - ``process.runtime.dotnet.exceptions.count``

Java runtime metrics
---------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 50, 50

   * - :strong:`Charts`
     - :strong:`Metrics`

   * - Memory usage
     - * ``runtime.jvm.gc.live.data.size``
       * ``runtime.jvm.memory.max``
       * ``runtime.jvm.memory.used``

   * - Allocation rate
     - ``process.runtime.jvm.memory.allocated``

   * - Class loading
     - * ``runtime.jvm.classes.loaded``
       * ``runtime.jvm.classes.unloaded``

   * - GC activity
     - * ``runtime.jvm.gc.pause.totalTime``
       * ``runtime.jvm.gc.pause.count``

   * - GC overhead
     - ``runtime.jvm.gc.overhead``

   * - Thread count
     - * ``runtime.jvm.threads.live``
       * ``runtime.jvm.threads.peak``

   * - Thread pools
     - * ``executor.threads.active``
       * ``executor.threads.idle``
       * ``executor.threads.max``

Node.js runtime metrics 
-------------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 50, 50

   * - :strong:`Charts`
     - :strong:`Metrics`

   * - Heap usage
     - * ``process.runtime.nodejs.memory.heap.total``
       * ``process.runtime.nodejs.memory.heap.used``

   * - Resident set size
     - ``process.runtime.nodejs.memory.rss``

   * - GC activity
     - * ``process.runtime.nodejs.memory.gc.size``
       * ``process.runtime.nodejs.memory.gc.pause``
       * ``process.runtime.nodejs.memory.gc.count``

   * - Event loop lag
     - * ``Process.runtime.nodejs.event_loop.lag.max``
       * ``process.runtime.nodejs.event_loop.lag.min``

Infrastructure metrics
-------------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 50, 50

   * - :strong:`Chart`
     - :strong:`Metrics`

   * - Host CPU usage
     - ``cpu.utilization``

   * - Host memory usage
     - ``memory.utilization``

   * - Host disk usage
     - ``disk.summary_utilization``

   * - Host network usage
     - ``network.total``

   * - Pod CPU usage
     - * ``container_cpu_utilization``
       * ``cpu.num_processors``
       * ``machine_cpu_cores``
       * ``k8s.container.ready``

   * - Pod memory usage
     - * ``k8s.container.ready``
       * ``container_memory_usage_bytes``
       * ``container_spec_memory_limit_bytes``

   * - Pod disk usage
     - * ``k8s.container.ready``
       * ``container_fs_usage_bytes``

   * - Pod network utilization
     - * ``k8s.container.ready``
       * ``pod_network_receive_bytes_total``
       * ``pod_network_transmit_bytes_total``