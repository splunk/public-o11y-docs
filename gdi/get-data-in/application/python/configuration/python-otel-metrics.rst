.. _python-otel-metrics:

**************************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel Python
**************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Python collects the following runtime and custom metrics.

The Splunk Distribution of OpenTelemetry Python collects runtime and custom metrics. To learn about the different metric types, see :ref:`metric-types`.

For examples of custom metrics instrumentation and instrument types, see :ref:`custom-metrics-python`.

.. _python-otel-runtime-metrics:

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
   * - ``process.runtime.memory``
     - Counter
     - Memory used by the Python runtime.
   * - ``process.runtime.cpu.time``
     - Cumulative counter
     - CPU time used by the Python runtime.
   * - ``process.runtime.gc_count``
     - Cumulative counter
     - Garbage collections executed by the Python runtime.

