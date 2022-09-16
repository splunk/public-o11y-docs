.. _dotnet-metrics-attributes:

***************************************************************
Metrics collected by the SignalFx Instrumentation for .NET
***************************************************************

.. meta:: 
   :description: The SignalFx Instrumentation for .NET collects the following runtime and trace metrics.

The SignalFx Instrumentation for .NET can collect runtime and trace metrics. To learn about the different metric types, see :ref:`metric-types`.

.. _enable-dotnet-metrics:

Enable metrics collection
====================================================

To enable the collection of .NET runtime and trace metrics, see :ref:`dotnet-metric-settings`.

.. note:: Runtime and trace metrics collection is an experimental feature subject to future changes.

.. _dotnet-runtime-metrics:

Runtime metrics
====================================================

The SignalFx Instrumentation for .NET can collect the following runtime metrics:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``runtime.dotnet.aspnetcore.connections.current``
     - Gauge
     - Number of active HTTP connections to the web server. Only available for .NET Core.
   * - ``runtime.dotnet.aspnetcore.connections.queue_length``
     - Gauge
     - Length of the HTTP connection queue. Only available for .NET Core.
   * - ``runtime.dotnet.aspnetcore.connections.total``
     - Gauge
     - Number of HTTP connections to the web server. Only available for .NET Core.
   * - ``runtime.dotnet.aspnetcore.requests.current``
     - Gauge
     - Number of HTTP requests that have started, but haven't stopped yet. Only available for .NET Core.
   * - ``runtime.dotnet.aspnetcore.requests.failed``
     - Gauge
     - Number of failed HTTP requests received by the server. Only available for .NET Core.
   * - ``runtime.dotnet.aspnetcore.requests.queue_length``
     - Gauge
     - Length of the HTTP request queue.
   * - ``runtime.dotnet.aspnetcore.requests.total``
     - Gauge
     - Number of HTTP requests received by the server. Only available for .NET Core.
   * - ``runtime.dotnet.cpu.percent``
     - Gauge
     - Percentage of total CPU used by the application.
   * - ``runtime.dotnet.cpu.system``
     - Gauge
     - Milliseconds of execution outside of the kernel.
   * - ``runtime.dotnet.cpu.user``
     - Gauge
     - Milliseconds of execution in the kernel.
   * - ``runtime.dotnet.exceptions.count``
     - Gauge
     - Number of exceptions.
   * - ``runtime.dotnet.gc.count.gen0``
     - Counter
     - Number of ``gen0`` garbage collections.
   * - ``runtime.dotnet.gc.count.gen1``
     - Counter
     - Number of ``gen1`` garbage collections.
   * - ``runtime.dotnet.gc.count.gen2``
     - Counter
     - Number of ``gen2`` garbage collections.
   * - ``runtime.dotnet.gc.memory_load``
     - Gauge
     - Percentage of the memory used by the process. The garbace collector changes its behavior when this value is higher than ``85``. Only available for .NET Core.
   * - ``runtime.dotnet.gc.pause_time``
     - Gauge
     - Amount of time the garbace collector paused the application threads. Only available for .NET Core.
   * - ``runtime.dotnet.gc.size.gen0``
     - Gauge
     - Size of the ``gen0`` heap.
   * - ``runtime.dotnet.gc.size.gen1``
     - Gauge
     - Size of the ``gen1`` heap.
   * - ``runtime.dotnet.gc.size.gen2``
     - Gauge
     - Size of the ``gen2`` heap.
   * - ``runtime.dotnet.gc.size.loh``
     - Gauge
     - Size of the large object heap.
   * - ``runtime.dotnet.mem.committed``
     - Gauge
     - Memory usage.
   * - ``runtime.dotnet.threads.contention_count``
     - Counter
     - Number of times a thread stopped to wait on a lock.
   * - ``runtime.dotnet.threads.contention_time``
     - Gauge
     - Accumulated time spent by threads waiting on a lock Only available for .NET Core.
   * - ``runtime.dotnet.threads.count``
     - Counter
     - Number of threads running in the process.
   * - ``runtime.dotnet.threads.workers_count``
     - Gauge
     - Number of threads that existed in the thread pool. Only available for .NET Core.

Additional permissions for IIS
-------------------------------------------------------------

The .NET Framework collects metrics using performance counters. To let service accounts and IIS application pool accounts access counter data, add them to the ``Performance Monitoring Users`` group.

IIS application pools use special accounts that don't appear in the list of users. To add IIS application pool accounts to the ``Performance Monitoring Users`` group, search for ``IIS APPPOOL\<name-of-the-pool>``. For example, the user for the ``DefaultAppPool`` pool is ``IIS APPPOOL\DefaultAppPool``.

The following example shows how to add an IIS application pool account to the ``Performance Monitoring Users`` group from a command prompt with Administrator permissions:

.. code-block:: shell
   
   net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add

.. _dotnet-trace-metrics:

Trace metrics
====================================================

The SignalFx Instrumentation for .NET can collect the following trace metrics:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``signalfx.tracer.queue.enqueued_traces``
     - Counter
     - Number of traces pushed into the queue.
   * - ``signalfx.tracer.queue.dequeued_traces``
     - Counter
     - Number of traces pulled from the queue for flushing.
   * - ``signalfx.tracer.queue.enqueued_spans``
     - Counter
     - Number of spans pushed into the queue.
   * - ``signalfx.tracer.queue.dequeued_spans``
     - Counter
     - Number of spans pulled from the queue for flushing.
   * - ``signalfx.tracer.queue.dropped_traces``
     - Counter
     - Number of traces dropped due to a full queue.
   * - ``signalfx.tracer.queue.dropped_spans``
     - Counter
     - Number of spans dropped due to a full queue.
   * - ``signalfx.tracer.heartbeat``
     - Gauge
     - Number of tracers.


