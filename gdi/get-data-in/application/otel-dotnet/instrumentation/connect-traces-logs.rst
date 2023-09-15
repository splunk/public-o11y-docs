.. _correlate-traces-with-logs-dotnet-otel:

*********************************************************************
Connect .NET trace data with logs using OpenTelemetry instrumentation
*********************************************************************

.. meta::
   :description: Configure .NET logging libraries to include tracing attributes provided automatically by the SignalFx Instrumentation for .NET.

The Splunk Distribution of OpenTelemetry .NET automatically exports logs enriched with tracing context from any application that uses a logger library compatible with Microsoft.Extensions.Logging.

The instrumentation enrichs application logs with tracing metadata and then exports them to a local instances of the OpenTelemetry Collector in OTLP format.

The following is an example of logs produced by a sample console application:

.. code-block:: json

   "logRecords": [
      {
         "timeUnixNano": "1679392614538226700",
         "severityNumber": 9,
         "severityText": "Information",
         "body": {
               "stringValue": "Success! Today is: {Date:MMMM dd, yyyy}"
         },
         "flags": 1,
         "traceId": "21df288eada1ce4ace6c40f39a6d7ce1",
         "spanId": "a80119e5a05fed5a"
      }
   ]

.. _dotnet-traces-logs-requirements-otel:

Check compatibility and requirements
====================================================

The Splunk Distribution of OpenTelemetry .NET supports the all major logging libraries that use the Microsoft.Extensions.Logging library, like Log4Net, NLog, Serilog, and others.

.. note:: Automatic log to trace correlation only works for .NET applications. For .NET Framework use manual correlation. See :ref:`manual-trace-logs-correlation-otel`.

.. _dotnet-otel-enable-log-correlation:

Activate log correlation
============================

The instrumentation turns on automatic log to trace correlation by default.

If you need to turn off logs enrichment and export, set the ``OTEL_DOTNET_AUTO_LOGS_ENABLED``, ``OTEL_DOTNET_AUTO_LOGS_INSTRUMENTATION_ENABLED``, and ``OTEL_DOTNET_AUTO_LOGS_ILOGGER_INSTRUMENTATION_ENABLED`` environment variables to ``false``.

.. _dotnet-otel-include-trace-data:

Trace metadata in log statements
===================================================

The instrumentation adds the following attributes to logs:

* ``TraceId``
* ``SpanId``
* ``TraceState``

In addition, the instrumentation adds the following attributes if previously defined through settings:

* ``service.name``, as defined by the ``OTEL_SERVICE_NAME`` environment variable

.. _manual-trace-logs-correlation-otel:

Manual log to trace correlation
===================================================

You can configure logging libraries to include tracing attributes in logs written to existing logs destination.

NLog
----------------------------------------------------

Use the ``NLog.DiagnosticSource`` package to add trace context to your logs.

1. Add the package reference to ``NLog.DiagnosticSource``:

   .. code-block:: shell

      dotnet add package NLog.DiagnosticSource

2. Add the extension to your nlog.config file:

   .. code-block:: xml

      <extensions>
         <add assembly="NLog.DiagnosticSource"/>
      </extensions>

3. Edit the layout of your target to use activity related properties:

   .. code-block:: xml

      <target xsi:type="File" name="logfile" fileName="c:\temp\console-example.log"
                     layout="${longdate}|${level}|${message}|TraceId=${activity:property=TraceId}|SpanId=${activity:property=SpanId}|ParentId=${activity:property=ParentId}|${all-event-properties} ${exception:format=tostring}" />

   The following is an example of plain text log with tracing context added:

   .. code-block:: text
      
      2023-09-14 16:53:25.9139|Info|Logged inside activity|TraceId=23276df3a4a54414d196b88d71338806|SpanId=6e20050fc23d9a2a|TraceFlags=Recorded|

Serilog
-----------------------------------------------

You can use one of available log enrichers, such as ``Serilog.Enrichers.Span`` or create your own enricher to add trace context as properties to log events.

Use existing enricher
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to use the ``Serilog.Enrichers.Span`` package to enrich logs manually:

1. Add the package reference to ``Serilog.Enrichers.Span``:

   .. code-block:: shell

      dotnet add package Serilog.Enrichers.Span

2. Add the enricher and configure it:

   .. code-block:: csharp

      Log.Logger = new LoggerConfiguration()
                  .Enrich.WithSpan(new SpanOptions { IncludeTraceFlags = true }) // Add enricher
                  .WriteTo.File(
                     new JsonFormatter(renderMessage: true),
                     "log.txt",
                     rollingInterval: RollingInterval.Day,
                     rollOnFileSizeLimit: true)
                  .CreateLogger();

3. If events are recorded in JSON format, for example through ``JsonFormatter``,
no additional changes are required. The following is an example of a JSON enriched log:

   .. code-block:: json

      {"Timestamp":"2023-09-14T16:37:45.9098509+02:00","Level":"Information","MessageTemplate":"Logged inside activity","RenderedMessage":"Logged inside activity","Properties":{"TraceFlags":"Recorded","SpanId":"3649cecf468d3ac6","TraceId":"91ea1932714ca3d0f9a697453e9e83b2","ParentId":"0000000000000000"}}

4. If events are recorded in plain text format, edit the output template to include additional properties provided by enricher. For example:

   .. code-block:: csharp

      Log.Logger = new LoggerConfiguration()
                  .Enrich.WithSpan(new SpanOptions { IncludeTraceFlags = true }) // add enricher
                  .WriteTo.File(
                     "log.txt",
                     rollingInterval: RollingInterval.Day,
                     outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}|TraceId={TraceId}|SpanId={SpanId}|TraceFlags={TraceFlags}",
                     rollOnFileSizeLimit: true)
                  .CreateLogger();

   The following is an example of a plain text enriched log:

   .. code-block:: text

      [16:38:50 INF] Logged inside activity
      |TraceId=4f624fb18be91c18cd6e2a762896dfc6|SpanId=69366bf7fb7cf68b|TraceFlags=Recorded

Create an enricher
^^^^^^^^^^^^^^^^^^^^^^^^

As an alternative, you can create your own Serilog enricher to add trace context as properties to log events.

1. Create an enricher that adds trace context properties. For example:

   .. code-block:: csharp

      private class TestEnricher : ILogEventEnricher
      {
         public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
         {
            var activity = Activity.Current;
            logEvent.AddPropertyIfAbsent(new LogEventProperty("SpanId", new ScalarValue(activity?.SpanId)));
            logEvent.AddPropertyIfAbsent(new LogEventProperty("TraceId", new ScalarValue(activity?.TraceId)));
            logEvent.AddPropertyIfAbsent(new LogEventProperty("TraceFlags", new ScalarValue(activity?.ActivityTraceFlags)));
         }
      }

2. Add the enricher when configuring the logger:

   .. code-block:: csharp

      new LoggerConfiguration()
                  .Enrich.With<TestEnricher>() // add custom enricher
                  .WriteTo.File(
                     new JsonFormatter(renderMessage: true), // add JsonFormatter
                     "log.txt",
                     rollingInterval: RollingInterval.Day,
                     rollOnFileSizeLimit: true)
                  .CreateLogger();

3. If events are recorded in JSON format, for example by using ``JsonFormatter``,
no additional changes are required.

4. If events are recorded in plain text format, edit the output template to include
additional properties provided by enricher. For example:

   .. code-block:: csharp

      Log.Logger = new LoggerConfiguration()
                  .Enrich.With<TestEnricher>()
                  .WriteTo.File(
                     "log.txt",
                     rollingInterval: RollingInterval.Day,
                     outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}|TraceId={TraceId}|SpanId={SpanId}|TraceFlags={TraceFlags}",
                     rollOnFileSizeLimit: true)
                  .CreateLogger();

Sample applications
============================================

To download several sample applications that show how to configure log correlation, see :new-page:`/examples/demo <https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/tree/main/examples/demo>` on GitHub.