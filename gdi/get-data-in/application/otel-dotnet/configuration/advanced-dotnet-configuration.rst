.. _advanced-dotnet-otel-configuration:

********************************************************************
Configure the Splunk Distribution of OpenTelemetry .NET
********************************************************************

.. meta::
   :description: Configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs, such as correlating traces with logs and activating custom sampling.

You can configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started. More advanced settings are also available.

.. _configuration-methods-dotnet-otel:

Configuration methods
===========================================================

You can change the settings of the Splunk Distribution of OpenTelemetry .NET in the following ways:

- For .NET applications, set environment variables. On Windows, set them in the process scope unless you want to activate automatic instrumentation globally for all .NET applications.

- For .NET Framework applications running as Windows services, you can add settings in the ``appSettings`` block of the app.config file when supported or set environment variables using the Windows Registry.

- For ASP.NET applications, add settings in the ``appSettings`` block of the web.config file. For example:

   .. code-block:: xml

      <configuration>
         <appSettings>
            <add key="OTEL_SERVICE_NAME" value="my-service-name" />
         </appSettings>
      </configuration>

   Alternatively, you can set environment variables using any of the following methods:

   - Add the ``<environmentVariables>`` element in ``applicationHost.config`` for your application pools.
   - Set the environment variables for ``W3SVC`` and ``WAS``.

- For ASP.NET Core applications, add ``<environmentVariable>`` elements inside the ``<aspNetCore>`` block of your web.config file.

.. _main-dotnet-otel-agent-settings:

General settings
=========================================================================

The following settings are common to most instrumentation scenarios:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="general" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>

.. _dotnet-otel-exporter-settings:

Exporter settings
================================================

The following settings control trace exporters and their endpoints:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="exporter" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>


.. _profiling-configuration-otel-dotnet:

.NET OTel settings for AlwaysOn Profiling
===============================================

The following settings control the AlwaysOn Profiling feature for the .NET instrumentation:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``SPLUNK_PROFILER_ENABLED``
     - Activates AlwaysOn Profiling. The default value is ``false``.
   * - ``SPLUNK_PROFILER_MEMORY_ENABLED``
     - Activates memory profiling. The default value is ``false``.
   * - ``SPLUNK_PROFILER_LOGS_ENDPOINT``
     - The collector endpoint for profiler logs. The default value is ``http://localhost:4318/v1/logs``.
   * - ``SPLUNK_PROFILER_CALL_STACK_INTERVAL``
     - Frequency with which call stacks are sampled, in milliseconds. The default value is ``10000`` milliseconds.

.. note:: AlwaysOn Profiling for .NET is compatible with .NET 6.0 and higher. For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.

.. _dotnet-otel-trace-propagation-settings:

Trace propagation settings
================================================

The following settings control trace propagation:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="trace propagation" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>


.. _trace-sampling-settings-dotnet-otel:

Samplers configuration
===============================================================

The following settings control trace sampling:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="sampler" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>


.. _resource-detector-settings-dotnet-otel:

Resource detectors configuration
===============================================================

You can use resource detectors to retrieve additional attributes for your application's spans.

The following settings control resource detectors:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="resource detector" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>


.. _list-resource-detectors-dotnet:

The following resource detectors are available:

.. raw:: html

    <div class="instrumentation" section="resource_detectors" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"key": "Identifier", "description": "Description", "attributes": "Attributes", "id": "ID", "stability": "Stability", "support": "Support", "dependencies": "Dependencies", "name": "Name", "source_href": "Source", "package_href": "Package URL", "version": "Version", "stability": "Stability"}'></div>

.. _dotnet-otel-instrumentation-settings:

Instrumentation settings
================================================

The following settings control instrumentations and tracing behavior:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="instrumentation" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>

The following settings control which instrumentations are activated. See :ref:`disable-instrumentations-otel-dotnet` for more information.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all instrumentations. The default value is ``true``.  Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_TRACES_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all trace instrumentations. Overrides ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_TRACES_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED``
     - Activates or deactivates a specific trace instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_TRACES_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_TRACES_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files. See :ref:`supported-dotnet-otel-libraries` for a complete list of supported instrumentations and their names.
   * - ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all metric instrumentations. Overrides ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_METRICS_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED``
     - Activates or deactivates a specific metric instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files. See :ref:`supported-dotnet-otel-libraries` for a complete list of supported instrumentations and their names.
   * - ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all log instrumentations. Overrides ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_LOGS_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED``
     - Activates or deactivates a specific log instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files. See :ref:`supported-dotnet-otel-libraries` for a complete list of supported instrumentations and their names.

.. _server-trace-information-dotnet-otel:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, trace response headers are activated by default. The instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

.. note:: If you need to deactivate trace response headers, set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED`` to ``false``.

.. _dotnet-otel-debug-logging-settings:

Diagnostic logging settings
================================================

The following settings control the internal logging of the Splunk Distribution of OpenTelemetry .NET:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="diagnostic logging" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type"}'></div>


.. _dotnet-otel-default-service-name:

Changing the default service name
=============================================

By default, the Splunk Distribution of OpenTelemetry .NET retrieves the service name by trying the following steps until it succeeds:

#. The default service name is the name of the entry assembly. For example, the name of your .NET project file. For ASP.NET applications, the default service name is ``SiteName[/VirtualPath]``.

#. If the entry assembly is not available, the instrumentation tries to use the current process name. The process name can be ``dotnet`` if launched directly using an assembly. For example, ``dotnet InstrumentedApp.dll``.

If all the steps fail, the service name defaults to ``unknown_service``.

.. note:: To override the default service name, set the ``OTEL_SERVICE_NAME`` environment variable.

.. _manual-dotnet-envvars:

Environment variables for manual installation
====================================================

When deploying the instrumentation manually, you need to make sure to set the following environment variables:

.. tabs::

   .. tab:: Windows (.NET)

      .. list-table::
         :header-rows: 1
         :widths: 30 70
         :width: 100

         * - Environment variable
           - Value
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
         * - ``OTEL_DOTNET_AUTO_PLUGINS``
           - ``Splunk.OpenTelemetry.AutoInstrumentation.Plugin, Splunk.OpenTelemetry.AutoInstrumentation``

   .. tab:: Windows (.NET Framework)

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
         * - ``OTEL_DOTNET_AUTO_HOME``
           - ``$installationLocation``
         * - ``OTEL_DOTNET_AUTO_PLUGINS``
           - ``Splunk.OpenTelemetry.AutoInstrumentation.Plugin, Splunk.OpenTelemetry.AutoInstrumentation``

   .. tab:: Linux (.NET)

      .. list-table::
         :header-rows: 1
         :widths: 30 70
         :width: 100

         * - Environment variable
           - Value
         * - ``CORECLR_ENABLE_PROFILING``
           - ``1``
         * - ``CORECLR_PROFILER``
           - ``{918728DD-259F-4A6A-AC2B-B85E1B658318}``
         * - ``CORECLR_PROFILER_PATH``
           - ``$INSTALL_DIR/linux-x64/OpenTelemetry.AutoInstrumentation.Native.so`` (glibc) |br| ``$INSTALL_DIR/linux-musl-x64/OpenTelemetry.AutoInstrumentation.Native.so`` (musl)
         * - ``DOTNET_ADDITIONAL_DEPS``
           - ``$INSTALL_DIR\AdditionalDeps``
         * - ``DOTNET_SHARED_STORE``
           - ``$INSTALL_DIR\store``
         * - ``DOTNET_STARTUP_HOOKS``
           - ``$INSTALL_DIR\net\OpenTelemetry.AutoInstrumentation.StartupHook.dll``
         * - ``OTEL_DOTNET_AUTO_HOME``
           - ``$INSTALL_DIR``
         * - ``OTEL_DOTNET_AUTO_PLUGINS``
           - ``Splunk.OpenTelemetry.AutoInstrumentation.Plugin, Splunk.OpenTelemetry.AutoInstrumentation``

      .. note:: The default installation path on Linux is ``$HOME/.otel-dotnet-auto``.
