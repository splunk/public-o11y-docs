.. _java-manual-instrumentation:

********************************************************************
Manually instrument Java applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your Java application when you need to add custom attributes to spans or want to manually generate spans and metrics. Keep reading to learn how to manually instrument your Java application for Splunk Observability Cloud.

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Java covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans and metrics.

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic JVM instrumentation and is fully supported by Splunk.

.. _java-otel-custom-traces:

Send custom Java application traces
========================================================

To create custom spans and traces, follow these steps:

1. Install the Splunk Distribution of OpenTelemetry Java. See :ref:`instrument-java-applications`.

2. Acquire a tracer using the ``getTracer`` method:

   .. code-block:: java

      import io.opentelemetry.api.trace.Tracer;

      Tracer tracer = openTelemetry.getTracer("instrumentation-scope-name", "instrumentation-scope-version");

3. Create a span. The following example shows how to create and end a span in a sample application:

   .. code-block:: java

      import io.opentelemetry.api.trace.Span;
      import io.opentelemetry.context.Scope;

      // ...
      @GetMapping("/rolldice")
      public List<Integer> index(@RequestParam("player") Optional<String> player,
            @RequestParam("rolls") Optional<Integer> rolls) {
         Span span = tracer.spanBuilder("rollTheDice").startSpan();

         // Make the span the current span
         try (Scope scope = span.makeCurrent()) {

            //.. Application logic

         } catch(Throwable t) {
            span.recordException(t);
            throw t;
         } finally {
            span.end();
         }
      }

For more examples, see the manual instrumentation docs in the OpenTelemetry Java Instrumentation repository at :new-page:`https://opentelemetry.io/docs/java/manual_instrumentation <https://opentelemetry.io/docs/java/manual_instrumentation>`.


.. _java-otel-custom-metrics:

Send custom Java application metrics
========================================================

To create custom metrics, follow these steps:

1. Install the Splunk Distribution of OpenTelemetry Java. See :ref:`instrument-java-applications`.

2. Create a meter:

   .. code-block:: java

      OpenTelemetry openTelemetry = GlobalOpenTelemetry.get();
      Meter sampleMeter = openTelemetry.getMeter("io.opentelemetry.example.metrics");

3. Build a specific metric type. The following example shows how to create a gauge metric:

   .. code-block:: java

      sampleMeter
         .gaugeBuilder("jvm.memory.total")
         .setDescription("Reports JVM memory usage.")
         .setUnit("byte")
         .buildWithCallback(
            result -> result.record(Runtime.getRuntime().totalMemory(), Attributes.empty()));

For more examples, see the manual instrumentation docs in the OpenTelemetry Java Instrumentation repository at :new-page:`https://opentelemetry.io/docs/java/manual_instrumentation <https://opentelemetry.io/docs/java/manual_instrumentation>`.




