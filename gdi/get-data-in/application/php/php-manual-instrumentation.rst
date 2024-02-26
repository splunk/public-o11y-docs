.. _manual-php-otel-instrumentation:

********************************************************************
Manually instrument PHP applications for Splunk Observability Cloud
********************************************************************

.. meta::
   :description: Manually instrument your PHP application to add custom attributes to spans or manually generate metrics. Keep reading to learn how to manually instrument your PHP application for Splunk Observability Cloud.

The OpenTelemetry instrumentation for PHP provides a base you can build on by adding your own manual instrumentation. By using both automatic and manual instrumentation, you can better instrument the logic and functionality of your applications, clients, and frameworks.

.. _custom-traces-otel-php:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Create a ``TracerProvider`` if you aren't using an instrumentation library:

   .. code-block:: php

      $tracerProvider = Globals::tracerProvider();

2. Create a tracer:

   .. code-block:: php

      // Acquire the tracer only where needed

      $tracer = $tracerProvider->getTracer(
         'instrumentation-scope-name', // Name (Required)
         'instrumentation-scope-version', // Version
         'http://example.com/my-schema', // Schema URL
         ['foo' => 'bar'] // Resource attributes
      );

3. Create spans:

   .. code:: php

      <?php
      public function roll($rolls) {
         $span = $this->tracer->spanBuilder("rollTheDice")->startSpan();
         $result = [];
         for ($i = 0; $i < $rolls; $i++) {
            $result[] = $this->rollOnce();
         }
         $span->end();
         return $result;
      }

4. Optionally, set attributes:

   .. code:: php

      $span->setAttribute(TraceAttributes::CODE_FUNCTION, 'rollOnce');
      $span->setAttribute(TraceAttributes::CODE_FILEPATH, __FILE__);


.. _custom-metrics-otel-php:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Add the following dependencies:

   .. code:: php

      use OpenTelemetry\SDK\Metrics\MetricExporter\ConsoleMetricExporterFactory;
      use OpenTelemetry\SDK\Metrics\MeterProvider;
      use OpenTelemetry\SDK\Metrics\MetricReader\ExportingReader;

      require 'vendor/autoload.php';

2. Create a ``MeterProvider``:

   .. code:: php

      $reader = Globals::meterProvider();

      $meterProvider = MeterProvider::builder()
         ->addReader($reader)
         ->build();

3. Create an instrument. For example, a gauge:

   .. code:: php

      $queue = [
         'job1',
         'job2',
         'job3',
      ];
      $reader = $meterProvider
         ->getMeter('demo_meter')
         ->createObservableGauge('queued', 'jobs', 'The number of jobs enqueued')
         ->observe(static function (ObserverInterface $observer) use (&$queue): void {
            $observer->observe(count($queue));
         });
      $reader->collect();
      array_pop($queue);
      $reader->collect();
