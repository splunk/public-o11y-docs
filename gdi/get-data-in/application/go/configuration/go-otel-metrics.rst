.. _go-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel Go
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry Go collects the following metrics.

The Splunk Distribution of OpenTelemetry Go collects runtime and custom metrics. 

To learn about the different metric types, see :ref:`metric-types`.

.. note:: Runtime and trace metrics collection is an experimental feature subject to future changes.

.. _enable-golang-metrics:

Activate metrics collection
====================================================

To collect Go metrics, see :ref:`enable_automatic_metric_collection_golang`.

.. _golang-otel-runtime-metrics:

Runtime metrics
================================================

.. caution:: The OpenTelemetry Go runtime instrumentation is experimental. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

The following runtime metrics are automatically collected and exported:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``runtime.go.cgo.calls`` (Experimental)
     - Gauge
     - Number of cgo calls made by the current process.
   * - ``runtime.go.gc.count`` (Experimental)
     - Cumulative counter
     - Number of completed garbage collection cycles
   * - ``runtime.go.gc.pause_ns`` (Experimental)
     - Cumulative counter (histogram)
     - Amount of nanoseconds in GC stop-the-world pauses
   * - ``runtime.go.gc.pause_total_ns`` (Experimental)
     - Cumulative counter
     - Cumulative nanoseconds in GC stop-the-world pauses since the program started
   * - ``runtime.go.goroutines`` (Experimental)
     - Gauge
     - Number of goroutines that currently exist
   * - ``runtime.go.lookups`` (Experimental)
     - Cumulative counter
     - Number of pointer lookups performed by the runtime
   * - ``runtime.go.mem.heap_alloc`` (Experimental)
     - Gauge
     - Bytes of allocated heap objects
   * - ``runtime.go.mem.heap_idle`` (Experimental)
     - Gauge
     - Bytes in idle (unused) spans
   * - ``runtime.go.mem.heap_inuse`` (Experimental)
     - Gauge
     -  Bytes in in-use spans
   * - ``runtime.go.mem.heap_objects`` (Experimental)
     - Gauge
     - Number of allocated heap objects
   * - ``runtime.go.mem.heap_released`` (Experimental)
     - Gauge
     - Bytes of idle spans whose physical memory has been returned to the OS
   * - ``runtime.go.mem.heap_sys`` (Experimental)
     - Gauge
     - Bytes of heap memory obtained from the OS
   * - ``runtime.go.mem.live_objects`` (Experimental)
     - Gauge
     - Number of live objects is the number of cumulative Mallocs - Frees 
   * - ``runtime.uptime`` (Experimental)
     - Cumulative counter
     -  Milliseconds since application was initialized 
