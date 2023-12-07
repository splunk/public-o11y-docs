.. _python-otel-metrics:

*************************************************************************************
Metrics and attributes collected by the Splunk Distribution of OpenTelemetry Python
*************************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Python collects the following runtime and custom metrics.

The Splunk Distribution of OpenTelemetry Python collects runtime and custom metrics. To automatically collect metrics from your Python applications, you must have ``splunk-otel-python`` version 1.14.0 or higher. For more information, see :ref:`splunk-python-otel-dist`.

To learn about the different metric types, see :ref:`metric-types`.

For examples of custom metrics instrumentation and instrument types, see :ref:`custom-metrics-python`.

.. caution:: This feature is experimental, and exported metric data and configuration properties might change. To learn more, see :new-page:`https://github.com/signalfx/splunk-otel-python/blob/main/docs/advanced-config.md`.

.. _python-app-metrics:

Application metrics
================================

The agent of the Splunk Distribution of OpenTelemetry Python collects the following application metrics.

.. _python-default-metrics:

Default metrics dimensions
-----------------------------------

The following dimensions are automatically added to all metrics exported by the agent:

.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Dimension
    - Description
  * - ``deployment.environment``
    - Value of the ``deployment.environment`` resource attribute, if present.
  * - ``service.name``
    - Name of the service.
  * - ``telemetry.sdk.name``
    - Name of the SDK, set to ``opentelemetry``.
  * - ``telemetry.sdk.language``
    - Language of the SDK, set to ``python``.
  * - ``telemetry.sdk.version``
    - Version of the OpenTelemetry SDK. 

.. _python-supported-libraries:

Supported libraries
-------------------------------------

The Python agent collects metrics through the following supported libraries: 

.. list-table::
  :header-rows: 1
  :widths: 45 20 35
  :width: 100%

  * - Library/Framework
    - Instrumentation
    - Supported versions
  * - Django
    - ``opentelemetry-instrumentation-django``
    - Django version 1.10 or higher
  * - Pyramid
    - ``opentelemetry-instrumentation-pyramid``
    - Pyramid version 1.7 or higher

.. _python-otel-runtime-metrics:

Runtime metrics
------------------------------------

The Python agent automatically collects and exports the following application runtime metrics:

.. list-table::
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.runtime.cpython.memory``
     - Counter
     - Memory used by the Python runtime.
   * - ``process.runtime.cpython.cpu_time``
     - Cumulative counter
     - CPU time used by the Python runtime.
   * - ``process.runtime.cpython.gc_count``
     - Cumulative counter
     - Garbage collections executed by the Python runtime.

.. _python-system-metrics:

System metrics
================================

The Python agent automatically collects and exports the following system metrics:

.. list-table::
  :header-rows: 1
  :widths: 45 20 35

  * - Metric 
    - Type
    - Description
  * - ``system.cpu.time``
    - Counter
    - Total seconds each logical CPU spent on each mode.
  * - ``system.cpu.utilization``
    - Gauge
    - Difference in ``system.cpu.time`` since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]).
  * - ``system.memory.usage``
    - Counter
    - Bytes of memory in use.
  * - ``system.memory.utilization``
    - Gauge
    - Percentage of memory bytes in use.
  * - ``system.swap.usage``
    - Counter 
    - Bytes of swap space in use.
  * - ``system.swap.utilization``
    - Gauge
    - Percentage of swap space bytes in use.
  * - ``system.disk.io``
    - Counter
    - Disk bytes transferred.
  * - ``system.disk.operations``
    - Counter
    - Disk operations count.
  * - ``system.disk.time``
    - Counter
    - Time disk spent activated.
  * - ``system.network.dropped.packets``
    - Counter
    - The number of packets dropped.
  * - ``system.network.packets``
    - Counter
    - The number of packets transferred.
  * - ``system.network.errors``
    - Counter
    - The number of errors encountered.
  * - ``system.network.io``
    - Counter
    - The number of bytes transmitted and received.
  * - ``system.network.connections``
    - Counter
    - The number of connections.
  * - ``system.thread_count``
    - Counter
    - The number of threads.
