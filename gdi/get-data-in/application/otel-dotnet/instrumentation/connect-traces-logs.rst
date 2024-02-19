.. _correlate-traces-with-logs-dotnet-otel:

*********************************************************************
Connect .NET trace data with logs using OpenTelemetry instrumentation
*********************************************************************

.. meta::
   :description: Automatic correlation between logs and traces provided by the Splunk Distribution of OpenTelemetry .NET.

The Splunk Distribution of OpenTelemetry .NET automatically exports logs enriched with tracing context from any application that uses logging API from 
:new-page:`Microsoft.Extensions.Logging <https://www.nuget.org/packages/Microsoft.Extensions.Logging>` for logging.

Application logs are enriched with tracing metadata and then exported to a local instance of the OpenTelemetry Collector in ``OTLP`` format.

The following is an example of logs produced by a sample console application:

.. code-block:: text

   2024-02-15 15:23:17 2024-02-15T13:23:17.704Z    info    ResourceLog #0
   2024-02-15 15:23:17 Resource SchemaURL: 
   2024-02-15 15:23:17 Resource attributes:
   2024-02-15 15:23:17      -> splunk.distro.version: Str(1.4.0)
   2024-02-15 15:23:17      -> container.id: Str(c894cdb646a29616b5f713195cf810be898ca99c311cac8d9d25d8561dd6964b)
   2024-02-15 15:23:17      -> telemetry.distro.name: Str(splunk-otel-dotnet)
   2024-02-15 15:23:17      -> telemetry.distro.version: Str(1.4.0)
   2024-02-15 15:23:17      -> telemetry.sdk.name: Str(opentelemetry)
   2024-02-15 15:23:17      -> telemetry.sdk.language: Str(dotnet)
   2024-02-15 15:23:17      -> telemetry.sdk.version: Str(1.7.0)
   2024-02-15 15:23:17      -> service.name: Str(Example.LogTraceCorrelation.Console)
   2024-02-15 15:23:17      -> deployment.environment: Str(dev)
   2024-02-15 15:23:17      -> service.version: Str(1.0.0)
   2024-02-15 15:23:17 ScopeLogs #0
   2024-02-15 15:23:17 ScopeLogs SchemaURL: 
   2024-02-15 15:23:17 InstrumentationScope  
   2024-02-15 15:23:17 LogRecord #0
   2024-02-15 15:23:17 ObservedTimestamp: 2024-02-15 13:23:13.1358363 +0000 UTC
   2024-02-15 15:23:17 Timestamp: 2024-02-15 13:23:13.1358363 +0000 UTC
   2024-02-15 15:23:17 SeverityText: Information
   2024-02-15 15:23:17 SeverityNumber: Info(9)
   2024-02-15 15:23:17 Body: Str(Hello from {activity})
   2024-02-15 15:23:17 Attributes:
   2024-02-15 15:23:17      -> activity: Str(LogWrappingActivity)
   2024-02-15 15:23:17 Trace ID: 17512c0247942df04fb30e6090eacb2c
   2024-02-15 15:23:17 Span ID: dc281b062178e72f
   2024-02-15 15:23:17 Flags: 1

.. _dotnet-traces-logs-requirements-otel:

Check compatibility and requirements
====================================================

.. note:: Automatic log to trace correlation only works for .NET applications. For .NET Framework use manual correlation. See :ref:`manual-trace-logs-correlation-otel`.

``Microsoft.Extensions.Logging`` version ``8.0.0`` and higher are supported.

.. _dotnet-otel-enable-log-correlation:

Activate log correlation
============================

The instrumentation turns on automatic log to trace correlation by default.

If you need to turn off logs enrichment and export, set the value of ``OTEL_DOTNET_AUTO_LOGS_ENABLED`` environment variable to ``false``.

.. _dotnet-otel-include-trace-data:

Trace metadata in log statements
===================================================

Individual log records, if exported inside the scope of an active activity, contain the following trace context information:

* Trace identifier
* Span identifier
* Trace flags

Logs produced by an application always have the following set of OpenTelemetry :new-page:`resource attributes <https://github.com/open-telemetry/opentelemetry-specification/tree/4f23dce407b6fcaba34a049df7c3d41cdd58cb77/specification/resource/semantic_conventions>`:

* ``telemetry.sdk.name`` with constant value of ``opentelemetry``
* ``telemetry.sdk.language`` with constant value of ``dotnet``
* ``telemetry.sdk.version`` with current version of ``OpenTelemetry .NET SDK``
* ``telemetry.distro.name`` with constant value of ``splunk-otel-dotnet``
* ``telemetry.distro.version`` with current version of ``Splunk Distribution of OpenTelemetry .NET``
* ``splunk.distro.version`` with current version of ``Splunk Distribution of OpenTelemetry .NET`` (deprecated attribute)

Additionally, the instrumentation adds the following attributes:

* ``service.name``, as defined by the ``OTEL_SERVICE_NAME`` environment variable
* Any attribute configured using the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable
* Any attribute added by configured resource detectors, like ``container.id``

.. _manual-trace-logs-correlation-otel:

Manual log to trace correlation
===================================================

You can configure logging libraries to include tracing attributes in logs written to existing logs destination.

``NLog``
----------------------------------------------------

You can use :new-page:`NLog.DiagnosticSource <https://www.nuget.org/packages/NLog.DiagnosticSource>`. See the :new-page:`NLog official documentation <https://github.com/NLog/NLog.DiagnosticSource>` for more information.

``Serilog``
-----------------------------------------------

You can use one of the available enrichers, like :new-page:`Serilog.Enrichers.Span <https://www.nuget.org/packages/Serilog.Enrichers.Span>` or create your own :new-page:`enricher <https://github.com/serilog/serilog/wiki/Enrichment>`
to add trace context as properties to log events.
