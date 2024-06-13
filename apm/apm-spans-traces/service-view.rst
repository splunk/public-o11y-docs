.. _apm-service-view:
    
Use the service view for a complete view of your service health 
*****************************************************************************

.. meta::
   :description: Learn how to use service views in Splunk APM for a complete view of your service health.

As a service owners you can use the service view in Splunk APM to get a complete view of your service health in a single pane of glass. The service view includes a service-level indicator (SLI) for availability, dependencies, request, error, and duration (RED) metrics, runtime metrics, infrastructure metrics, Tag Spotlight, endpoints, and logs for a selected service. You can also quickly navigate to code profiling and memory profiling for your service from the service view. 

.. note:: The service view is available for instrumented services that send spans with a ``service.name`` value.

Access the service view for your service
===========================================

You can access the service view for a specific service in several places.

You can search for the service using the search in the top toolbar.

..  image:: /_images/apm/spans-traces/service-view-global-search+traces.gif
    :width: 95%
    :alt: Animation showing a user searching for the checkoutservice and selecting the service result. 

You can also access the service view for a specific service within the service map. Start by selecting :guilabel:`Service Map` on the APM landing page. Select a service in the service map, then select :guilabel:`Service view` in the panel.

..  image:: /_images/apm/spans-traces/service-view-service-map.png
    :width: 95%
    :alt: Screenshot of the service view button within the service map when a service is selected. 

Finally, you can also access the service view for a specific service by selecting the service from the APM landing page.

Use the service overview to monitor the health of your service
=====================================================================

When you open the service view an environment is selected based on your recently viewed environments. Adjust the environment and time range filters if necessary. Use the following sections to monitor the health of your service.

Service metrics
------------------

Use the following metrics in the :guilabel:`Service metrics` section to monitor the health of your service. Collapse sub-sections that are not relevant to you to customize your service view.

..  image:: /_images/apm/spans-traces/service-view-service-metrics+traces.gif
    :width: 95%
    :alt: This animation shows the service metrics for a service in the service view. The user select a chart to view example traces.

* Availability SLI - The availability service-level indicator (SLI) shows the percentage of time your service was available in the last 30 days. The chart shows successful and unsuccessful requests. If you configured an availability service-level objective (SLO), an additional chart displays availability over the compliance window you specified in your objective. See :ref:`create-slo`.
* Service map - The service map shows the immediate upstream and downstream dependencies for the service you are viewing. The service map in service view is limited to 20 services, sorted by the most number of requests. Hover over the chart and select :guilabel:`View full service map` to go to the service map.
* Service requests - The service requests chart shows streaming request data for the service. If you have detectors for the service requests configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service latency - The service latency chart shows p50, p90, and p99 latency data for the service. If you have detectors for the service latency configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service error - The service error chart shows streaming error data for the service. If you have detectors for the service error rate configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Dependency latency by type - The dependency latency by type chart shows the latency for each of the downstream systems. Select the chart to see details about each system category. Systems are categorized as follows:
   *  Services - instrumented services
   *  Databases - not yet supported
   *  Inferred services - uninstrumented, inferred services
   *  Pub/sub queues - not yet supported

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
     - ``service.request.count``

   * - Service latency
     - * ``service.request.duration.ns.median``
       * ``service.request.duration.ns.p90``
       * ``service.request.duration.ns.p99``

   * - Service errors
     - ``service.requests.count`` with a ``sf_error:True`` filter

   * - SLI/SLO 
     - ``service.request.count``

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
     - * ``Process.runtime.nodejs.memory.heap.total``
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









