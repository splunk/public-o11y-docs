.. _python-manual-instrumentation:

**********************************************************************
Manually instrument Python applications for Splunk Observability Cloud
**********************************************************************

.. meta::
   :description: Manually instrument your Python application when you need to add custom attributes to spans or want to manually generate spans. Keep reading to learn how to manually instrument your Python application for Splunk Observability Cloud.

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Python covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans.

.. _start-tracing-via-code-python:

Start tracing via code
===============================

If you're unable to use the ``splunk-py-trace`` command to launch the application, you can instead import and configure ``start_tracing`` by adding the following to your application code: 
   
   .. code:: python

      from splunk_otel.tracing import start_tracing

      start_tracing()

      # Also accepts optional settings. For example:
      #
      # start_tracing(
      #   service_name='<my-python-service>',
      #   span_exporter_factories=[OTLPSpanExporter]
      #   access_token='<access_token>',
      #   max_attr_length=12000,
      #   trace_response_header_enabled=True,
      #   resource_attributes={
      #    'service.version': '<your_version>',
      #    'deployment.environment': '<your_environment>',
      #  })

.. note:: this code should not be added to the application when the ``splunk-py-trace`` command is being used to launch the application. 

.. _custom-traces-python:

Create custom traces
===============================

If you're adding manual instrumentation on top of auto-instrumentation, you can capture additional spans as follows: 

1. Import the OpenTelemetry SDK:

   .. code:: python

      from opentelemetry import trace

2. Create a tracer for your spans:

   .. code:: python

      tracer = trace.get_tracer("tracer.name")

3. Create a span as current span:

   .. code:: python

      def reticulate_splines():
         with tracer.start_as_current_span("span-name") as span:
            print("Reticulating splines...")
            # When the 'with' block goes out of scope, the 'span' is closed

Alternatively, if you're not using auto-instrumentation, use the following steps instead: 

1. Import the OpenTelemetry SDK:

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


For more examples, see the :new-page:`OpenTelemetry official documentation <https://opentelemetry.io/docs/instrumentation/python/manual/>`.

.. _custom-metrics-python:

Create custom metrics
===============================

The Splunk Distribution of OpenTelemetry Python supports the following instrumentations:

- Counter (synchronous)
- Counter (asynchronous)
- Gauge (asynchronous)
- UpDownCounter (synchronous)
- UpDownCounter (asynchronous)

To create custom metrics, follow the steps depending on the type of metric instrumentation.

.. tabs::

   .. tab:: Synchronous instruments

      Synchronous instruments, like counters, are invoked inline with business logic. An example of synchronous instrument is a counter for the number of bytes sent to a server. They support context propagation.

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

      4. Perform the measurements:

         .. code:: python

            peanut_counter = meter.create_counter(
               "peanut.counter", unit="1", description="Counts the number of consumed peanuts"
            )

            def do_stuff(work_item):
               peanut_counter.add(1, {"work.type": work_item.work_type})
               print("Collecting peanuts...")

   .. tab:: Asynchronous instruments

      Asynchronous instruments, like asynchronous gauges, provide callback functions that the OTel SDK runs in the background. An example of asynchronous instrument is a humidity sensor that is polled every minute for new data. They don't support context propagation.

      1. Import the OpenTelemetry API:

         .. code:: python

            from typing import Iterable
            from opentelemetry.metrics import CallbackOptions, Observation

      2. Write a callback to request data:

         .. code:: python

            def get_temp_data(options: CallbackOptions) -> Iterable[Temperature]:
               r = requests.get(
                  "http://weather/data/city", timeout=options.timeout_millis / 10**3
               )
                for metadata in r.json():
                   yield Temperature(
                         metadata["temperature"], {"city.name": metadata["temperature"]}
                   )

      3. Create an instrument to take asynchronous measurements:

         .. code:: python

            meter.create_observable_gauge(
               "city.temperature",
               callbacks=[get_temp_data],
               description="Mean temperature of the city",
            )

For more examples, see the :new-page:`OpenTelemetry official documentation <https://opentelemetry.io/docs/instrumentation/python/manual/>`.


Frameworks that require manual instrumentation
==================================================

Some Python frameworks only support manual instrumentation. For specific instructions, see:

- :ref:`uwsgi-instrumentation`

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic Python instrumentation and is fully supported by Splunk.
