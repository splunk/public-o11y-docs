.. _advanced-dotnet-otel-configuration:

********************************************************************
Configure the Splunk Distribution of OpenTelemetry .NET
********************************************************************

.. meta:: 
   :description: Configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs, such as correlating traces with logs and activating custom sampling.

You can configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started. More advanced settings are also available. 

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

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

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - Activated by default. Adds server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-dotnet-otel`. The default value is ``true``.
   * - ``OTEL_DOTNET_AUTO_EXCLUDE_PROCESSES``
     - Names of the executable files that the profiler cannot instrument. Supports multiple semicolon-separated values, for example: ``ReservedProcess.exe;powershell.exe``. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_TRACES_ENABLED``
     - Traces are collected by default. To deactivate trace collection, set the environment variable to ``false``. Data from custom or manual instrumentation is not affected.
   * - ``OTEL_DOTNET_AUTO_METRICS_ENABLED``
     - Metrics are collected by default. To deactivate metric collection, set the environment variable to ``false``. Data from custom or manual instrumentation is not affected.
   * - ``OTEL_DOTNET_AUTO_LOGS_ENABLED``
     - Logs are collected by default. To deactivate log collection, set the environment variable to ``false``. Data from custom or manual instrumentation is not affected.
   * - ``OTEL_DOTNET_AUTO_OPENTRACING_ENABLED``
     - Activates the OpenTracing tracer. The default value is ``false``. See :ref:`migrate-signalfx-dotnet-to-dotnet-otel` for more information.
   * - ``OTEL_DOTNET_AUTO_NETFX_REDIRECT_ENABLED``
     - Activates immediate redirection of the assemblies used by the automatic instrumentation on the .NET Framework. The default values is ``true``. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_FLUSH_ON_UNHANDLEDEXCEPTION``
     - Controls whether the telemetry data is flushed when an ``AppDomain.UnhandledException`` event is raised. Set to ``true`` when experiencing missing telemetry at the same time of unhandled exceptions.	
   * - ``OTEL_DOTNET_AUTO_RULE_ENGINE_ENABLED``
     - Activates RuleEngine. The default values is ``true``. RuleEngine increases the stability of the instrumentation by validating assemblies for unsupported scenarios.
   * - ``OTEL_DOTNET_AUTO_FAIL_FAST_ENABLED``
     - Activate to let the process fail when automatic instrumentation can't be executed. This setting is for debugging purposes, don't use it in production environments. The default value is ``false``. Can't be set using the web.config or app.config files.

.. _dotnet-otel-exporter-settings:

Exporter settings
================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - The URL to where traces and metrics are sent. The default value is ``http://localhost:4318``. Setting a value overrides the ``SPLUNK_REALM`` environment variable.
   * - ``SPLUNK_REALM``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector.
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Required if you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`.

.. _dotnet-otel-trace-propagation-settings:

Trace propagation settings
================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators for the tracer. The default value is ``tracecontext,baggage``. Supported values are ``b3multi``, ``b3``, ``tracecontext``, and ``baggage``.

.. _trace-sampling-settings-dotnet-otel:

Samplers configuration
===============================================================

The following settings control trace sampling:

.. list-table:: 
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_SAMPLER``
     - Sampler to use. The default value is ``parentbased_always_on``. Supported values are ``always_on``, ``always_off``, ``traceidratio``, ``parentbased_always_on``, ``parentbased_always_off``, and ``parentbased_traceidratio``.
   * - ``OTEL_TRACES_SAMPLER_ARG``
     - Semicolon-separated list of rules for the ``rules`` sampler. The default value is ``1.0``.

.. _resource-detector-settings-dotnet-otel:

Resource detectors configuration
===============================================================

You can use resource detectors to retrieve additional attributes for your application's spans.

The following settings control resource detectors:

.. list-table:: 
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - Environment variable
     - Description
   * - ``OTEL_DOTNET_AUTO_RESOURCE_DETECTOR_ENABLED``
     - Activates or deactivates all resource detectors. The default values is ``true``.
   * - ``OTEL_DOTNET_AUTO_{DECTECTOR}_RESOURCE_DETECTOR_ENABLED``
     - Activates or deactivates a specific resource detector, where ``{DETECTOR}`` is the uppercase identifier of the resource detector you want to activate. Overrides ``OTEL_DOTNET_AUTO_RESOURCE_DETECTOR_ENABLED``.

.. _list-resource-detectors-dotnet:

The following resource detectors are available:

.. list-table:: 
   :header-rows: 1
   :widths: 30 30 40
   :width: 100%

   * - Detector ID
     - Description
     - Attributes
   * - ``CONTAINER``
     - Container detector. For example, Docker or Podman containers.
     - ``container.id``

.. _dotnet-otel-instrumentation-settings:

Instrumentation settings
================================================

The following settings control instrumentations and tracing behavior:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_SERVICE_NAME``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in the ``OTEL_RESOURCE_ATTRIBUTES`` variable.
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Comma-separated list of resource attributes added to every reported span. For example, ``key1=val1,key2=val2``. 
   * - ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES``
     - Comma-separated list of additional ``System.Diagnostics.ActivitySource`` names to be added to the tracer at startup. Use it to capture spans from manual instrumentation.
   * - ``OTEL_DOTNET_AUTO_METRICS_ADDITIONAL_SOURCES``
     - Comma-separated list of additional ``System.Diagnostics.Metrics.Meter`` names to be added to the meter at the startup. Use it to capture custom metrics.
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per span. Default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Maximum number of events per span. Default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Maximum number of links per span. Default value is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. Default value is ``1200``. Empty values are treated as infinity.
   * - ``OTEL_DOTNET_AUTO_GRAPHQL_SET_DOCUMENT``
     - Whether the GraphQL instrumentation can pass raw queries as a ``graphql.document`` attribute. As queries might contain sensitive information, the default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_LEGACY_SOURCES``
     - Comma-separated list of additional legacy source names to be added to the tracer at the startup. Use it to capture ``System.Diagnostics.Activity`` objects created without using the ``System.Diagnostics.ActivitySource`` API.	

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
     - Activates or deactivates a specific trace instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_TRACES_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_TRACES_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all metric instrumentations. Overrides ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_METRICS_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED``
     - Activates or deactivates a specific metric instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_METRICS_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED``
     - Activates or deactivates all log instrumentations. Overrides ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_LOGS_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED``
     - Activates or deactivates a specific log instrumentation, where ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation. Overrides ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED``. Inherits the value of the ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED`` environment variable. Can't be set using the web.config or app.config files.

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

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_LOG_LEVEL``
     - Sets the logging level for instrumentation log messages. Possible values are ``none``, ``error``, ``warn``, ``info``, and ``debug``. The default value is ``info``. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_LOG_DIRECTORY``
     - Directory of the .NET tracer logs. The default value is ``/var/log/opentelemetry/dotnet`` for Linux, and ``%ProgramData%\OpenTelemetry .NET AutoInstrumentation\logs`` for Windows. Can't be set using the web.config or app.config files.
   * - ``OTEL_DOTNET_AUTO_TRACES_CONSOLE_EXPORTER_ENABLED``
     - Whether the traces console exporter is activated. The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_METRICS_CONSOLE_EXPORTER_ENABLED``
     - Whether the metrics console exporter is activated. The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_LOGS_CONSOLE_EXPORTER_ENABLED``
     - Whether the logs console exporter is activated. The default value is ``false``.The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_LOGS_INCLUDE_FORMATTED_MESSAGE``
     - Whether the log state have to be formatted. The default value is ``false``.

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
