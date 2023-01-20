.. _dotnet-otel-manual-instrumentation:

********************************************************************
Manually instrument .NET applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your .NET application to add custom attributes to spans or manually generate spans. Keep reading to learn how to manually instrument your .NET application for Observability Cloud. 

The Splunk Distribution of OpenTelemetry .NET automatic instrumentation provides a base you can build on by adding
your own manual instrumentation. By using both automatic and manual instrumentation, you can better instrument the logic and functionality of your applications, clients, and frameworks.

To instrument your .NET application manually, follow these steps:

1. Install the Splunk Distribution of OpenTelemetry .NET. See :ref:`install-dotnet-otel-instrumentation`.

2. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="7.0.0" />

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

4. Register your ``ActivitySource`` by setting the ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES`` environmental variable. You can set the value to either ``Examples.ManualInstrumentations.Registered`` or to ``Examples.ManualInstrumentations.*``, which registers the entire prefix.

.. note:: An ``Activity`` created for ``NonRegistered.ManualInstrumentations`` ``ActivitySource`` is not
   handled by the automatic instrumentation.

.. _manual-dotnet-envvars:

Environment variables for manual instrumentation
====================================================

When instrumenting applications manually, you might have to set the following environment variables:

.. list-table::
   :header-rows: 1
   :widths: 30 70
   :width: 100

   * - Environment variable
     - Value
   * - ``COR_ENABLE_PROFILING``
     - ``1``
   * - ``COR_PROFILER``
     - ``{918728DD-259F-4A6A-AC2B-B85E1B658318}``
   * - ``COR_PROFILER_PATH_64``
     - ``$installationLocation\win-x64\OpenTelemetry.AutoInstrumentation.Native.dll``
   * - ``COR_PROFILER_PATH_32``
     - ``$installationLocation\win-x86\OpenTelemetry.AutoInstrumentation.Native.dll``
   * - ``CORECLR_ENABLE_PROFILING``
     - ``1``
   * - ``CORECLR_PROFILER``
     - ``{918728DD-259F-4A6A-AC2B-B85E1B658318}``
   * - ``CORECLR_PROFILER_PATH_64``
     - ``$installationLocation\win-x64\OpenTelemetry.AutoInstrumentation.Native.dll``
   * - ``CORECLR_PROFILER_PATH_32``
     - ``$installationLocation\win-x86\OpenTelemetry.AutoInstrumentation.Native.dll``
   * - ``DOTNET_ADDITIONAL_DEPS``
     - ``$installationLocation\AdditionalDeps``
   * - ``DOTNET_SHARED_STORE``
     - ``$installationLocation\store``
   * - ``DOTNET_STARTUP_HOOKS``
     - ``$installationLocation\net\OpenTelemetry.AutoInstrumentation.StartupHook.dll``
   * - ``OTEL_DOTNET_AUTO_HOME``
     - ``$installationLocation``
   * - ``OTEL_DOTNET_AUTO_INTEGRATIONS_FILE``
     - ``$installationLocation\integrations.json``
