.. _go-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel Go
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry Go collects the following metrics.

The Splunk Distribution of OpenTelemetry Go collects runtime and custom metrics. To learn about the different metric types, see :ref:`metric-types`. 

For custom metrics instrumentation and instrument types, see :ref:`custom-metrics-go`.

.. _golang-otel-runtime-metrics:

Runtime metrics
================================================

The following runtime metrics are automatically collected and exported:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.runtime.go.cgo.calls`` (Experimental)
     - Gauge
     - Number of cgo calls made by the current process.
   * - ``process.runtime.go.gc.count`` (Experimental)
     - Cumulative counter
     - Number of completed garbage collection cycles
   * - ``process.runtime.go.gc.pause_ns`` (Experimental)
     - Cumulative counter (histogram)
     - Amount of nanoseconds in GC stop-the-world pauses
   * - ``process.runtime.go.gc.pause_total_ns`` (Experimental)
     - Cumulative counter
     - Cumulative nanoseconds in GC stop-the-world pauses since the program started
   * - ``process.runtime.go.goroutines`` (Experimental)
     - Gauge
     - Number of goroutines that currently exist
   * - ``process.runtime.go.lookups`` (Experimental)
     - Cumulative counter
     - Number of pointer lookups performed by the runtime
   * - ``process.runtime.go.mem.heap_alloc`` (Experimental)
     - Gauge
     - Bytes of allocated heap objects
   * - ``process.runtime.go.mem.heap_idle`` (Experimental)
     - Gauge
     - Bytes in idle (unused) spans
   * - ``process.runtime.go.mem.heap_inuse`` (Experimental)
     - Gauge
     -  Bytes in in-use spans
   * - ``process.runtime.go.mem.heap_objects`` (Experimental)
     - Gauge
     - Number of allocated heap objects
   * - ``process.runtime.go.mem.heap_released`` (Experimental)
     - Gauge
     - Bytes of idle spans whose physical memory has been returned to the OS
   * - ``process.runtime.go.mem.heap_sys`` (Experimental)
     - Gauge
     - Bytes of heap memory obtained from the OS
   * - ``process.runtime.go.mem.live_objects`` (Experimental)
     - Gauge
     - Number of live objects is the number of cumulative Mallocs - Frees 
   * - ``process.runtime.uptime`` (Experimental)
     - Cumulative counter
     -  Milliseconds since application was initialized 

.. _golang-otel-pool-metrics:

Connection pool metrics
================================================

The Splunk Distribution of OpenTelemetry Go instruments several connection pool implementations:

- ``splunksql``
- ``splunkmysql``
- ``splunkpgx``
- ``splunkgorm``
- ``splunksqlx``
- ``splunkpq``

Each of the connection pools reports a subset of the following metrics:

.. list-table:: 
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``db.client.connections.usage`` (Experimental)
    - Gauge
    - Number of connections that are currently in the state described by the ``state`` attribute.
  * - ``db.client.connections.max`` (Experimental)
    - Gauge
    - Maximum number of open connections allowed.
  * - ``db.client.connections.wait_time`` (Experimental)
    - Timer
    - Time it took to obtain an open connection from the pool.

The following attributes are available:

.. list-table:: 
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Tag
    - Value
  * - ``pool.name`` (Experimental)
    - Name of the connection pool. Applies to all connection pool metrics.
  * - ``state`` (Experimental)
    - State of the connection. Can be ``idle`` or ``used``. Only applies to the ``db.client.connections.usage`` metric.
