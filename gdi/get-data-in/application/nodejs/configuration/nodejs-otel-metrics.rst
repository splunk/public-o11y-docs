.. _nodejs-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel JS
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry JS collects the following metrics.

The Splunk Distribution of OpenTelemetry JS collects runtime and custom metrics. To enable runtime metrics collection, see :ref:`metrics-configuration-nodejs`. 

To learn about the different metric types, see :ref:`metric-types`.

.. note:: Runtime and trace metrics collection is an experimental feature subject to future changes.

.. _enable-nodejs-metrics:

Enable metrics collection
====================================================

To collect Node.js metrics, see :ref:`metrics-configuration-nodejs`.

.. _nodejs-otel-runtime-metrics:

Runtime metrics
================================================

To enable runtime metrics, see :ref:`metrics-configuration-nodejs`. The following example shows how to enable runtime metrics by passing the ``runtimeMetricsEnabled`` argument to the ``start`` method:

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

.. _nodejs-otel-custom-metrics:

Custom metrics
=====================================

To send custom application metrics to Observability Cloud, add ``@opentelemetry/api-metrics`` to your dependencies:

.. code-block:: javascript

   const { start } = require('@splunk/otel');
   const { Resource } = require('@opentelemetry/resources');
   const { metrics } = require('@opentelemetry/api-metrics');

   // All fields are optional.
   start({
     // Takes preference over OTEL_SERVICE_NAME environment variable
     serviceName: 'my-service',
     metrics: {
       // The suggested resource is filled in via OTEL_RESOURCE_ATTRIBUTES
       resourceFactory: (suggestedResource: Resource) => {
         return suggestedResource.merge(new Resource({
           'my.property': 'xyz',
           'build': 42,
         }));
       },
       exportIntervalMillis: 1000, // default: 5000
       // The default exporter used is OTLP over gRPC
       endpoint: 'http://collector:4317',
     },
   });

   const meter = metrics.getMeter('my-meter');
   const counter = meter.createCounter('clicks');
   counter.add(3);

Set up custom metric readers and exporters
----------------------------------------------------

You can provide custom exporters and readers using the ``metricReaderFactory`` setting.

.. caution:: Usage of ``metricReaderFactory`` invalidates the ``exportInterval`` and ``endpoint`` settings.

The following example shows how to provide a custom exporter:

.. code-block:: javascript

   const { start } = require('@splunk/otel');
   const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
   const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
   const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics-base');

   start({
     serviceName: 'my-service',
     metrics: {
       metricReaderFactory: () => {
         return [
           new PrometheusExporter(),
           new PeriodicExportingMetricReader({
             exportIntervalMillis: 1000,
             exporter: new OTLPMetricExporter({ url: 'http://localhost:4318' })
           })
         ]
       },
     },
   });

Select the type of aggregation temporality
--------------------------------------------

Aggregation temporality describes how data is reported over time.

You can define two different aggregation temporalities:

- ``AggregationTemporality.CUMULATIVE``: Cumulative metrics, such as counters and histograms, are continuously summed together from a given starting point, which in this case is set with the call to ``start``. This is the default temporality.
- ``AggregationTemporality.DELTA``: Metrics are summed together relative to the last metric collection step, which is set by the export interval.

To configure aggregation temporality in your custom metrics, use ``AggregationTemporality`` as in the example:

.. code-block:: javascript

   const { start } = require('@splunk/otel');
   const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-grpc');
   const { AggregationTemporality, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics-base');

   start({
     serviceName: 'my-service',
     metrics: {
       metricReaderFactory: () => {
         return [
           new PeriodicExportingMetricReader({
             exporter: new OTLPMetricExporter({
               temporalityPreference: AggregationTemporality.DELTA
             })
           })
         ]
       },
     },
   });

For more information on aggregation temporality, see :new-page:`https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/data-model.md#sums <https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/data-model.md#sums>` on GitHub.

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
         metrics: true, // enable metrics with default configuration
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
