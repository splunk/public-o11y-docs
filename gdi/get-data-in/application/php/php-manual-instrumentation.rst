.. _manual-php-otel-instrumentation:

********************************************************************
Manually instrument PHP applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your PHP application to add custom attributes to spans or manually generate metrics. Keep reading to learn how to manually instrument your PHP application for Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry .NET automatic instrumentation provides a base you can build on by adding
your own manual instrumentation. By using both automatic and manual instrumentation, you can better instrument the logic and functionality of your applications, clients, and frameworks.

.. _custom-traces-otel-php:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Install the Splunk Distribution of OpenTelemetry .NET. See :ref:`install-dotnet-otel-instrumentation`.

2. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="7.0.2" />

3. Create an ``ActivitySource`` instance:

   .. code:: csharp

      private static readonly ActivitySource RegisteredActivity = new ActivitySource("Examples.ManualInstrumentations.Registered");

4. Create an ``Activity``. Optionally, set tags:

   .. code:: csharp

      using (var activity = RegisteredActivity.StartActivity("Main"))
      {
         activity?.SetTag("foo", "bar1");
         // your logic for Main activity
      }

5. Register your ``ActivitySource`` by setting the ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES`` environmental variable. You can set the value to either ``Examples.ManualInstrumentations.Registered`` or to ``Examples.ManualInstrumentations.*``, which registers the entire prefix.

.. _custom-metrics-otel-php:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="7.0.2" />

2. Create a ``Meter`` instance:

   .. code:: csharp

      using var meter = new Meter("My.Application", "1.0");

3. Create an ``Instrument`` instance:

   .. code:: csharp

      var counter = meter.CreateCounter<long>("custom.counter", description: "Custom counter's description");

4. Update the ``Instrument`` value:

   .. code:: csharp

      counter.Add(1);

5. Register your ``Meter`` with OpenTelemetry.AutoInstrumentation by setting the ``OTEL_DOTNET_AUTO_METRICS_ADDITIONAL_SOURCES`` environment variable:

   .. code:: bash

      OTEL_DOTNET_AUTO_METRICS_ADDITIONAL_SOURCES=My.Application
