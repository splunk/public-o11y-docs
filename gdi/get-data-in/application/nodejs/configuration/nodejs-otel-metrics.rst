.. _nodejs-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel JS
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry JS collects the following metrics.

The Splunk Distribution of OpenTelemetry JS collects runtime and custom metrics. To enable runtime metrics collection, see :ref:`metrics-configuration-nodejs`. 

To learn about the different metric types, see :ref:`metric-types`.

.. _enable-nodejs-metrics:

Enable metrics collection
====================================================

To collect Node.js runtime metrics, see :ref:`metrics-configuration-nodejs`.

.. note:: Application metrics collection is an experimental feature subject to future changes.

.. _nodejs-otel-runtime-metrics:

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
   * - ``nodejs.memory.heap.total``
     - Gauge
     - Heap total, in bytes. Extracted from ``process.memoryUsage().heapTotal``.
   * - ``nodejs.memory.heap.used``
     - Gauge
     - Heap used, in bytes. Extracted from ``process.memoryUsage().heapUsed``.
   * - ``nodejs.memory.rss``
     - Gauge
     - Resident set size, in bytes. Extracted from ``process.memoryUsage().rss``.
   * - ``nodejs.memory.gc.size``
     - Cumulative counter
     - Total collected by the garbage collector, in bytes.
   * - ``nodejs.memory.gc.pause``
     - Cumulative counter
     - Time spent by the garbage collector, in nanoseconds.
   * - ``nodejs.memory.gc.count``
     - Cumulative counter
     - Number of garbage collector executions.
   * - ``nodejs.event_loop.lag.max``
     - Gauge
     - Maximum event loop lag within the collection interval, in nanoseconds.
   * - ``nodejs.event_loop.lag.min``
     - Gauge
     - Minimum event loop lag within the collection interval, in nanoseconds.

.. _nodejs-otel-custom-metrics:

Custom metrics
=====================================

The following snippet shows how you can send custom metrics through the internal SignalFx client:

.. code-block:: javascript

   const { startMetrics } = require('@splunk/otel');
   const { getSignalFxClient } = startMetrics();
   getSignalFxClient().send({
   gauges: [{ metric: 'my.app.foo', value: 42, timestamp: 1442960607000}]
   })
