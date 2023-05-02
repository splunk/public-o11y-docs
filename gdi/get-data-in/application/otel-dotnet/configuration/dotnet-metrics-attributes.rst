.. _dotnet-otel-metrics-attributes:

****************************************************************************
Metrics collected by the Splunk Distribution of OpenTelemetry .NET
****************************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry .NET collects the following runtime and trace metrics.

The Splunk Distribution of OpenTelemetry .NET can collect runtime and trace metrics. To learn about the different metric types, see :ref:`metric-types`.

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

.. _enable-dotnet-otel-metrics:

Configure metrics collection
====================================================

Metric collection is activated by default. To configure metric settings, see :ref:`dotnet-otel-instrumentation-settings`.

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

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``http.client.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Duration of outbound HTTP requests, in the form of count, sum, and histogram buckets. This metric originates multiple metric time series, which might result in increased data ingestion costs.
   * - ``http.server.duration_{bucket|count|sum}``
     - Cumulative counters (histogram)
     - Duration of the inbound HTTP request, in the form of count, sum, and histogram buckets. This metric originates multiple metric time series, which might result in increased data ingestion costs.
   * - ``nservicebus.messaging.successes``
     - Cumulative counter
     - Number of messages successfully processed by the endpoint.
   * - ``nservicebus.messaging.fetches``
     - Cumulative counter
     - Number of messages retrieved from the queue by the endpoint.
   * - ``nservicebus.messaging.failures``
     - Cumulative counter
     - Number of messages unsuccessfully processed by the endpoint.