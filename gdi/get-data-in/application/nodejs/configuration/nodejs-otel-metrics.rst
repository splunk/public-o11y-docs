.. _nodejs-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel JS
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry JS collects the following metrics.

The Splunk Distribution of OpenTelemetry JS collects runtime and custom metrics. To activate runtime metrics collection, see :ref:`metrics-configuration-nodejs`. 

To learn about the different metric types, see :ref:`metric-types`.

.. _enable-nodejs-metrics:

Activate metrics collection
====================================================

To collect Node.js metrics, see :ref:`metrics-configuration-nodejs`.

.. _nodejs-otel-runtime-metrics:

Runtime metrics
================================================

To activate runtime metrics, see :ref:`metrics-configuration-nodejs`. The following example shows how to activate runtime metrics by passing the ``runtimeMetricsEnabled`` argument to the ``start`` method:

.. code-block:: javascript

   const { start } = require('@splunk/otel');

   start({
      serviceName: 'my-service',
      metrics: {
        runtimeMetricsEnabled: true,
      }
   });

The following runtime metrics are automatically collected and exported:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.runtime.nodejs.memory.heap.total``
     - Gauge
     - Heap total, in bytes. Extracted from ``process.memoryUsage().heapTotal``.
   * - ``process.runtime.nodejs.memory.heap.used``
     - Gauge
     - Heap used, in bytes. Extracted from ``process.memoryUsage().heapUsed``.
   * - ``process.runtime.nodejs.memory.rss``
     - Gauge
     - Resident set size, in bytes. Extracted from ``process.memoryUsage().rss``.
   * - ``process.runtime.nodejs.memory.gc.size``
     - Cumulative counter
     - Total collected by the garbage collector, in bytes.
   * - ``process.runtime.nodejs.memory.gc.pause``
     - Cumulative counter
     - Time spent by the garbage collector, in nanoseconds.
   * - ``process.runtime.nodejs.memory.gc.count``
     - Cumulative counter
     - Number of garbage collector executions.
   * - ``process.runtime.nodejs.event_loop.lag.max``
     - Gauge
     - Maximum event loop lag within the collection interval, in nanoseconds.
   * - ``process.runtime.nodejs.event_loop.lag.min``
     - Gauge
     - Minimum event loop lag within the collection interval, in nanoseconds.

.. _nodejs-otel-metrics-migration:

Migrate from SignalFx metrics for NodeJS
===========================================

To migrate your custom metric instrumentation from the SignalFx client library, follow these steps:

#. Replace the ``getSignalFxClient`` dependency with ``opentelemetry/api-metrics``, and initialize metrics collection using ``start()``. For example:

   .. code-block:: javascript

      // SignalFx
      const { start } = require('@splunk/otel');
      const { getSignalFxClient } = start({ serviceName: 'my-service' });

   Becomes the following:

   .. code-block:: javascript

      // OpenTelemetry
      const { start } = require('@splunk/otel');
      const { metrics } = require('@opentelemetry/api-metrics');

      start({
         serviceName: 'my-service',
         metrics: true, // activate metrics with default configuration
      });

#. Replace calls to ``getSignalFxClient()`` with metrics instances. For example:

   .. code-block:: javascript

      // SignalFx
      getSignalFxClient().send({
         gauges: [{ metric: 'cpu', value: 42, timestamp: 1442960607000}],
         cumulative_counters: [{ metric: 'clicks', value: 99, timestamp: 1442960607000}],
      })

   Becomes the following:

   .. code-block:: javascript

      // OpenTelemetry
      const meter = metrics.getMeter('my-meter');
      meter.createObservableGauge('cpu', result => {
         result.observe(42);
      });
      const counter = meter.createCounter('clicks');
      counter.add(99);

Previous metric names
================================================

With the release of version 2.0 of the Splunk Distribution of OpenTelemetry JS, metric names changed to conform with OpenTelemetry conventions. The following table shows the equivalence between the current and previous metric names.

.. list-table:: 
   :header-rows: 1
   :widths: 50 50
   :width: 100%

   * - Current metric name
     - Previous metric name
   * - ``process.runtime.nodejs.memory.heap.total``
     - ``nodejs.memory.heap.total``
   * - ``process.runtime.nodejs.memory.heap.used``
     - ``nodejs.memory.heap.used``
   * - ``process.runtime.nodejs.memory.rss``
     - ``nodejs.memory.rss``
   * - ``process.runtime.nodejs.memory.gc.size``
     - ``nodejs.memory.gc.size``
   * - ``process.runtime.nodejs.memory.gc.pause``
     - ``nodejs.memory.gc.pause``
   * - ``process.runtime.nodejs.memory.gc.count``
     - ``nodejs.memory.gc.count``
   * - ``process.runtime.nodejs.event_loop.lag.max``
     - ``nodejs.event_loop.lag.max``
   * - ``process.runtime.nodejs.event_loop.lag.min``
     - ``nodejs.event_loop.lag.min``

.. _nodejs-otel-debug-metrics:

Debug metrics
=====================================

To activate debug metrics, see :ref:`metrics-configuration-nodejs`. Debug metrics are used for internal debugging purposes and to provide data to Splunk customer support.

The following example shows how to activate runtime metrics by passing the ``debugMetricsEnabled`` argument to the ``start`` method:

.. code-block:: javascript

   const { start } = require('@splunk/otel');

   start({
      serviceName: 'my-service',
      metrics: {
        debugMetricsEnabled: true,
      }
   });

The following runtime metrics are automatically collected and exported:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``splunk.profiler.cpu.start.duration``
     - Histogram
     - Time to start a new V8 profiling run.
   * - ``splunk.profiler.cpu.stop.duration``
     - Histogram
     - Time to stop a new V8 profiling run.
   * - ``splunk.profiler.cpu.process.duration``
     - Histogram
     - Time spent matching span activations with stack traces and building the final output.
   * - ``splunk.profiler.heap.collect.duration``
     - Histogram
     - Time to provide an alloxation profile through the V8 profiler.
   * - ``splunk.profiler.heap.process.duration``
     - Histogram
     -  Time to traverse the call graph and build stack traces from the allocation samples.