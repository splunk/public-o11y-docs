.. caution::

   The SignalFx Tracing Library for PHP is deprecated as of February 21, 2024 and will reach End of Support on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the date, the library will be archived and no longer maintained.

   New and existing users should consider using :ref:`OpenTelemetry PHP instrumentation <get-started-php>` which offers similar capabilities.

.. _php-manual-instrumentation:

********************************************************************
Manually instrument PHP applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your PHP application to add custom attributes to spans or manually generate spans. Keep reading to learn how to manually instrument your PHP application for Splunk Observability Cloud. 

The SignalFx Tracing Library for PHP provides and registers an OpenTracing-compatible global tracer that you can use to instrument your applications manually for Splunk Observability Cloud. Custom or manual instrumentation can be helpful when you need to add custom attributes to spans, or need to generate spans manually.

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
