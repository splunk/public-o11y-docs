.. _php-manual-instrumentation:

********************************************************************
Manually instrument PHP applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your PHP application to add custom attributes to spans or manually generate spans. Keep reading to learn how to manually instrument your PHP application for Observability Cloud. 

The SignalFx Tracing Library for PHP provides and registers an OpenTracing-compatible global tracer that you can use to instrument your applications manually for Splunk Observability Cloud. Custom or manual instrumentation can be helpful when you need to add custom attributes to spans, or need to generate spans manually.

.. note:: The SignalFx Tracing Library for PHP supports OpenTracing version 0.12.1 and higher.

The following example shows how to create a custom span and attach a tag to it:

.. code-block:: php

   use SignalFx\GlobalTracer; // Suggested namespace over OpenTracing for GlobalTracer

   function myApplicationLogic($indicator) {
      $tracer = GlobalTracer::get(); //  Will provide the tracer instance used by provided instrumentations
      $span = $tracer->startActiveSpan('myApplicationLogic')->getSpan();
      $span->setTag('indicator', $indicator);

      try {
         $widget = myAdditionalApplicationLogic($indicator);
         $span->setTag('widget', $widget);
         return $widget;
      } catch (Exception $e) {
         $span->setTag('error', true);
         throw $e;
      } finally {
         $span->finish();
      }
   }

The Signalfx-Tracing library for PHP wraps the ``spl_autoload_register`` function to allow the automatic tracing of supported functions. When autoloader classes aren't used, you need a manual invocation to create a tracer and invoke autoinstrumentation as the first action for your application:

.. code-block:: php

   // Note: this must occur before any other library is imported and used!
   use SignalFx\Tracing;

   $tracer = Tracing::autoInstrument();
   // or if you only prefer a tracer instance without enabling auto-instrumentation:
   $tracer = Tracing::createTracer();