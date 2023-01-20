.. _advanced-dotnet-otel-configuration:

********************************************************************
Configure the Splunk Distribution of OpenTelementry .NET
********************************************************************

.. meta:: 
   :description: Configure the Splunk Distribution of OpenTelementry .NET to suit your instrumentation needs, such as correlating traces with logs and enabling custom sampling.

You can configure the Splunk Distribution of OpenTelementry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started. More advanced settings are also available. 

.. _configuration-methods-dotnet-otel:

Configuration methods
===========================================================

You can change the settings of the Splunk Distribution of OpenTelementry .NET in the following ways:

#. Set environment variables. On Windows, set them in the process scope unless you want to enable autoinstrumentation globally for all .NET applications.

#. Edit the ``web.config`` or ``app.config`` file. For example:

   .. code-block:: xml

      <configuration>
         <appSettings>
            <add key="OTEL_SERVICE_NAME" value="my-service-name" />
         </appSettings>
      </configuration>

When instrumenting applications manually, set environment variables using the following methods:

.. tabs:: 

   .. tab:: ASP.NET

      Add the ``<environmentVariables>`` element in ``applicationHost.config`` for your application pools.

   .. tab:: ASP.NET Core

      Use the ``<environmentVariable>`` elements inside the ``<aspNetCore>`` block of your ``Web.config`` file.

   .. tab:: IIS service

      Set the environment variables for ``W3SVC`` and ``WAS`` Windows services as described in :ref:`dotnet-windows-services`.

For a list of environment variables, see :ref:`manual-dotnet-envvars`.

.. note:: For IIS versions older than 10.0, consider creating a separate user, set its environment variables, and use it as the application pool user.

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
     - Enables the addition of server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-dotnet-otel`. The default value is ``true``.
   * - ``OTEL_DOTNET_AUTO_EXCLUDE_PROCESSES``
     - Names of the executable files that the profiler cannot instrument. Supports multiple semicolon-separated values, for example: ``ReservedProcess.exe;powershell.exe``.
   * - ``OTEL_DOTNET_AUTO_HOME``
     - Location of the installed instrumentation. You must set it manually to ``/opt/signalfx`` when instrumenting applications on Linux or background services in Azure App Service.

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
     - The URL to where traces and metrics are sent. The default value is ``http://localhost:4317``. Setting a value overrides the ``SPLUNK_REALM`` environment variable.
   * - ``SPLUNK_REALM``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector.
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Required if you need to send data to the Observability Cloud ingest endpoint. See :ref:`admin-tokens`.

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
     - Comma-separated list of propagators for the tracer. The default value is ``tracecontext,baggage``. Other available propagators are ``b3multi`` and ``b3``.

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
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Not applicable
     - Maximum number of attributes per span. Default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Not applicable
     - Maximum number of events per span. Default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Not applicable
     - Maximum number of links per span. Default value is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Not applicable
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. Default value is ``1200``. Empty values are treated as infinity.

.. _server-trace-information-dotnet-otel:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, enable Splunk trace response headers by setting the following environment variable:

.. tabs::

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

   .. code-tab:: shell Linux
   
      export SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

When you set this environment variable, your application instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing 
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

.. _dotnet-otel-debug-logging-settings:

Diagnostic logging settings
================================================

The following settings control the internal logging of the Splunk Distribution of OpenTelementry .NET:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Setting
     - Description
   * - ``OTEL_DOTNET_AUTO_DEBUG	``
     - Enables file logging. The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_LOG_DIRECTORY``
     - Directory of the .NET tracer logs. The default value is ``/var/log/opentelemetry/dotnet`` for Linux and macOS, and ``%ProgramData%\OpenTelemetry .NET AutoInstrumentation\logs`` for Windows.
   * - ``OTEL_DOTNET_AUTO_TRACES_CONSOLE_EXPORTER_ENABLED``
     - Whether the traces console exporter is enabled. The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_METRICS_CONSOLE_EXPORTER_ENABLED``
     - Whether the metrics console exporter is enabled. The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_LOGS_CONSOLE_EXPORTER_ENABLED``
     - Whether the logd console exporter is enabled. The default value is ``false``.The default value is ``false``.
   * - ``OTEL_DOTNET_AUTO_LOGS_INCLUDE_FORMATTED_MESSAGE``
     - Whether the log state should be formatted. The default value is ``false``.

.. _dotnet-otel-default-service-name:

Changing the default service name
=============================================

By default, the Splunk Distribution of OpenTelementry .NET retrieves the service name by trying the following steps until it succeeds:

#. For ASP.NET applications, the default service name is ``SiteName[/VirtualPath]``.

#. For other applications, the default service name is the name of the entry assembly. For example, the name of your .NET project file.

#. If the entry assembly is not available, the instrumentation tries to use the current process name. The process name can be ``dotnet`` if launched directly using an assembly. For example, ``dotnet InstrumentedApp.dll``.

If all the steps fail, the service name defaults to ``UnknownService``. 

To override the default service name, set the ``OTEL_SERVICE_NAME`` environment variable.
