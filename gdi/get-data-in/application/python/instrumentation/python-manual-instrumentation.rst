.. _python-manual-instrumentation:

**********************************************************************
Manually instrument Python applications for Splunk Observability Cloud
**********************************************************************

.. meta:: 
   :description: Manually instrument your Python application when you need to add custom attributes to spans or want to manually generate spans. Keep reading to learn how to manually instrument your Python application for Splunk Observability Cloud. 

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Python covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans.

.. _custom-traces-python:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: python

      from opentelemetry import trace
      from opentelemetry.sdk.trace import TracerProvider
      from opentelemetry.sdk.trace.export import (
         BatchSpanProcessor,
         ConsoleSpanExporter,
      )

2. Create a tracer for your spans:

   .. code:: python

      provider = TracerProvider()
      processor = BatchSpanProcessor(ConsoleSpanExporter())
      provider.add_span_processor(processor)

      trace.set_tracer_provider(provider)
      tracer = trace.get_tracer("tracer.name")

3. Create a span as current span:

   .. code:: python

      def reticulate_splines():
         with tracer.start_as_current_span("span-name") as span:
            print("Reticulating splines...")
            # When the 'with' block goes out of scope, the 'span' is closed

For more examples, see the Manual instrumentation docs at https://opentelemetry.io/docs/instrumentation/python/manual/.


.. _custom-metrics-python:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: python

      from opentelemetry import metrics
      from opentelemetry.sdk.metrics import MeterProvider
      from opentelemetry.sdk.metrics.export import (
         ConsoleMetricExporter,
         PeriodicExportingMetricReader,
      )

2. Create a meter provider:

   .. code:: python

      meter := otel.Meter("ExampleService")

3. Create an instrument to take measurements:

   .. code:: python

      metric_reader = PeriodicExportingMetricReader(ConsoleMetricExporter())
      provider = MeterProvider(metric_readers=[metric_reader])

      metrics.set_meter_provider(provider)
      meter = metrics.get_meter("my.meter.name")

4. Perform the measurements. The following example shows how to create a synchronous instrument:

   .. code:: python

      peanut_counter = meter.create_counter(
         "peanut.counter", unit="1", description="Counts the number of consumed peanuts"
      )

      def do_stuff(work_item):
         peanut_counter.add(1, {"work.type": work_item.work_type})
         print("Collecting peanuts...")



For more examples, see the Manual instrumentation docs at https://opentelemetry.io/docs/instrumentation/python/manual/.


Frameworks that require manual instrumentation
==================================================

Some Python frameworks only support manual instrumentation. For specific instructions, see:

- :ref:`uwsgi-instrumentation`

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic Python instrumentation and is fully supported by Splunk.