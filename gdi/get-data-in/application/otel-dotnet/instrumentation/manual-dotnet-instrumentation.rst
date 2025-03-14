.. _dotnet-otel-manual-instrumentation:

********************************************************************
Manually instrument .NET applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your .NET application to add custom attributes to spans or manually generate spans. Keep reading to learn how to manually instrument your .NET application for Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry .NET zero-code instrumentation provides a base you can build on by adding
your own manual instrumentation. By using both zero-code and manual instrumentation, you can better instrument the logic and functionality of your applications, clients, and frameworks.

.. _custom-traces-otel-dotnet:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Install the Splunk Distribution of OpenTelemetry .NET. See :ref:`install-dotnet-otel-instrumentation`.

2. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="9.0.0" />

3. Create an ``ActivitySource`` instance:

   .. code:: csharp

      private static readonly ActivitySource RegisteredActivity = new ActivitySource("Examples.ManualInstrumentations.Registered");

4. Create an ``Activity`` (Span). Optionally, set tags:

   .. code:: csharp

      using (var activity = RegisteredActivity.StartActivity("Custom Span Name"))
      {
         activity?.SetTag("foo", "bar1");
         // your logic for custom activity
      }

5. Register your ``ActivitySource`` by setting the ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES`` environmental variable. You can set the value to either ``Examples.ManualInstrumentations.Registered`` or to ``Examples.ManualInstrumentations.*``, which registers the entire prefix.

6. Invoke the action that generates an ``Activity``, note the trade ID of the ``Activity``, and locate the trace in Splunk APM. You should now see a span with the display name "Custom Span Name" in the trace tree.

See the :new-page:`OpenTelemetry official documentation <https://opentelemetry.io/docs/languages/net/instrumentation/#traces>` for additional information and examples.

.. _custom-metrics-otel-dotnet:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="9.0.0" />

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

See the :new-page:`OpenTelemetry official documentation <https://opentelemetry.io/docs/languages/net/instrumentation/#metrics` for additional information and examples.
