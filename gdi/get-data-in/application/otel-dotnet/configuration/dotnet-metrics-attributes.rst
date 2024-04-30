.. _dotnet-otel-metrics-attributes:

****************************************************************************
Metrics collected by the Splunk Distribution of OpenTelemetry .NET
****************************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry .NET collects the following runtime and trace metrics.

The Splunk Distribution of OpenTelemetry .NET can collect runtime and trace metrics. To learn about the different metric types, see :ref:`metric-types`.

.. _enable-dotnet-otel-metrics:

Configure metrics collection
====================================================

Metric collection is activated by default. To configure metric settings, see :ref:`dotnet-otel-instrumentation-settings`.

List of metrics
=====================================================

.. raw:: html

    <div class="instrumentation" section="metrics" url="/en/feature/DOCS-1897/_static/instrumentation.yaml" data-renaming='{"keys": "Identifier", "description": "Info", "instrumented_components": "Components", "signals": "Signals"}'></div>

.. _dotnet-runtime-otel-metrics:

.NET runtime metrics
====================================================

The Splunk Distribution of OpenTelemetry .NET can collect the following runtime metrics:

.. list-table::
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.runtime.dotnet.gc.collections.count``
     - Cumulative counter
     - Number of garbage collections since the process started.
   * - ``process.runtime.dotnet.gc.heap.size``
     - Gauge
     - Heap size, as observed during the last garbage collection. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.gc.heap.fragmentation.size``
     - Gauge
     - Heap fragmentation, as observed during the last garbage collection. Only available for .NET 7 or higher.
   * - ``process.runtime.dotnet.gc.objects.size``
     - Gauge
     - Count of bytes currently in use by live objects in the GC heap.
   * - ``process.runtime.dotnet.gc.allocations.size``
     - Cumulative counter
     - Count of bytes allocated on the managed GC heap since the process started. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.gc.committed_memory.size``
     - Gauge
     - Amount of committed virtual memory for the managed GC heap, as observed during the last garbage collection. Only available for .NET 6 and higher.
   * - ``process.runtime.dotnet.gc.duration``
     - Cumulative counter
     - The total amount of time paused in GC since the process start. Only available for .NET 7 and higher.
   * - ``process.runtime.dotnet.monitor.lock_contention.count``
     - Cumulative counter
     - Contentions count when trying to acquire a monitor lock since the process started.
   * - ``process.runtime.dotnet.thread_pool.threads.count``
     - Gauge
     - Number of thread pool threads, as observed during the last measurement. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.thread_pool.completed_items.count``
     - Cumulative counter
     - Number of work items processed by the thread pool since the process started. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.thread_pool.queue.length``
     - Gauge
     - Number of work items currently queued for processing by the thread pool. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.jit.il_compiled.size``
     - Cumulative counter
     - Bytes of intermediate language that have been compiled since the process started. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.jit.methods_compiled.count``
     - Cumulative counter
     - Number of times the JIT compiler compiled a method since the process started. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.jit.compilation_time``
     - Cumulative counter
     - Amount of time the compiler spent compiling methods since the process started. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.timer.count``
     - Gauge
     - Number of timer instances currently active. Only available for .NET 6 or higher.
   * - ``process.runtime.dotnet.assemblies.count``
     - Gauge
     - Number of .NET assemblies that are currently loaded.
   * - ``process.runtime.dotnet.exceptions.count``
     - Cumulative counter
     - Count of exceptions thrown in managed code since the observation started.

.. _dotnet-process-otel-metrics:

Process metrics
====================================================

The Splunk Distribution of OpenTelemetry .NET can collect the following process metrics:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.memory.usage``
     - Gauge
     - The amount of physical memory allocated for this process.	
   * - ``process.memory.virtual``
     - Gauge
     - The amount of committed virtual memory for this process.	
   * - ``process.cpu.time``
     - Cumulative counter
     - Total CPU seconds broken down by different states, such as user and system.	
   * - ``process.cpu.count``
     - Gauge
     - Total CPU seconds broken down by different states, such as user and system.
   * - ``process.threads``
     - Gauge
     - Process threads count.	

.. _dotnet-instrumentation-otel-metrics:

Instrumentation metrics
====================================================

The Splunk Distribution of OpenTelemetry .NET can collect the following instrumentation metrics:

ASP.NET
-------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``http.server.request.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Duration of HTTP server requests.

ASP.NET Core
-------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``http.server.request.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Duration of HTTP server requests.
   * - ``http.server.active_requests``
     - Gauge
     - Number of active HTTP server requests. Supported only on .NET8+.
   * - ``kestrel.active_connections``
     - Gauge
     - Number of connections that are currently active on the server. Supported only on .NET8+.
   * - ``kestrel.connection.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of connections on the server. Supported only on .NET8+.
   * - ``kestrel.rejected_connections``
     - Cumulative counters
     - Number of connections rejected by the server. Connections are rejected when the currently active count exceeds the value configured with MaxConcurrentConnections. Supported only on .NET8+.
   * - ``kestrel.queued_connections``
     - Gauge
     - Number of connections that are currently queued and are waiting to start. Supported only on .NET8+.
   * - ``kestrel.queued_requests``
     - Gauge
     - Number of HTTP requests on multiplexed connections (HTTP/2 and HTTP/3) that are currently queued and are waiting to start. Supported only on .NET8+.
   * - ``kestrel.upgraded_connections``
     - Gauge
     - Number of HTTP connections that are currently upgraded (WebSockets). The number only tracks HTTP/1.1 connections. Supported only on .NET8+.
   * - ``kestrel.tls_handshake.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of TLS handshakes on the server. Supported only on .NET8+.
   * - ``kestrel.active_tls_handshakes``
     - Gauge
     - Number of TLS handshakes that are currently in progress on the server. Supported only on .NET8+.
   * - ``signalr.server.connection.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of connections on the server. Supported only on .NET8+.
   * - ``signalr.server.active_connections``
     - Gauge
     - Number of connections that are currently active on the server. Supported only on .NET8+.
   * - ``aspnetcore.routing.match_attempts``
     - Cumulative counters
     - Number of requests that were attempted to be matched to an endpoint. Supported only on .NET8+.
   * - ``aspnetcore.diagnostics.exceptions``
     - Cumulative counters
     - Number of exceptions caught by exception handling middleware. Supported only on .NET8+.
   * - ``aspnetcore.rate_limiting.active_request_leases``
     - Gauge
     - Number of HTTP requests that are currently active on the server that hold a rate limiting lease. Supported only on .NET8+.
   * - ``aspnetcore.rate_limiting.request_lease.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of rate limiting leases held by HTTP requests on the server. Supported only on .NET8+.
   * - ``aspnetcore.rate_limiting.queued_requests``
     - Gauge
     - Number of HTTP requests that are currently queued, waiting to acquire a rate limiting lease. Supported only on .NET8+.
   * - ``aspnetcore.rate_limiting.request.time_in_queue_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of HTTP requests in a queue, waiting to acquire a rate limiting lease. Supported only on .NET8+.
   * - ``aspnetcore.rate_limiting.requests``
     - Cumulative counters
     - Number of requests that tried to acquire a rate limiting lease. Requests could be rejected by global or endpoint rate limiting policies. Or the request could be canceled while waiting for the lease. Supported only on .NET8+.

HTTP Client
-------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``http.client.request.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Duration of HTTP client requests.
   * - ``http.client.active_requests``
     - Gauge
     - Number of outbound HTTP requests that are currently active on the client. Supported only on .NET8+.
   * - ``http.client.open_connections``
     - Gauge
     - Number of outbound HTTP connections that are currently active or idle on the client. Supported only on .NET8+.
   * - ``http.client.connection.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The duration of successfully established outbound HTTP connections. Supported only on .NET8+.
   * - ``http.client.request.time_in_queue_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - The amount of time requests spent on a queue waiting for an available connection. Supported only on .NET8+.
   * - ``dns.lookup.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Measures the time taken to perform a DNS lookup. Supported only on .NET8+.

NServiceBus
-------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``nservicebus.messaging.successes``
     - Cumulative counter
     - Number of messages successfully processed by the endpoint.
   * - ``nservicebus.messaging.fetches``
     - Cumulative counter
     - Number of messages retrieved from the queue by the endpoint.
   * - ``nservicebus.messaging.failures``
     - Cumulative counter
     - Number of messages unsuccessfully processed by the endpoint.

Resource detectors
==============================

.. raw:: html

    <div class="instrumentation" section="resourcedetectors" url="/en/feature/DOCS-1897/_static/instrumentation.yaml" data-renaming='{"keys": "Identifier", "description": "Info", "instrumented_components": "Components", "signals": "Signals"}'></div>
