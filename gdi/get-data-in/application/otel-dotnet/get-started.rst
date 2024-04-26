.. _get-started-dotnet-otel:

***************************************************************************
Instrument .NET applications for Splunk Observability Cloud (OpenTelemetry)
***************************************************************************

.. meta::
   :description: Instrument your .NET application to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <dotnet-requirements>
   Instrument your .NET application <instrumentation/instrument-dotnet-application>
   Instrument Azure Web Apps <instrumentation/azure-webapps>
   Instrument Azure Web Jobs <instrumentation/azure-webjobs>
   Configure the .NET instrumentation <configuration/advanced-dotnet-configuration>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Metrics and attributes <configuration/dotnet-metrics-attributes>
   Manual instrumentation <instrumentation/manual-dotnet-instrumentation>
   Performance overhead <performance>
   Troubleshoot the .NET instrumentation <troubleshooting/common-dotnet-troubleshooting>
   SignalFx Instrumentation for .NET (Deprecated) TOGGLE <sfx/sfx-instrumentation>
   Migrate from SignalFx Instrumentation for .NET <troubleshooting/migrate-signalfx-dotnet-to-dotnet-otel>

The Splunk Distribution of OpenTelemetry .NET provides automatic instrumentation for popular .NET libraries and frameworks to collect and send telemetry to Splunk Observability Cloud.

.. raw:: html

    <div class="instrumentation" section="metadata" url="/en/feature/DOCS-1897/_static/instrumentation.yaml" data-renaming='{"keys": "Identifier", "description": "Info", "instrumented_components": "Components", "signals": "Signals"}'></div>

.. raw:: html

  <embed>
    <h2>Features of the Splunk Distribution of OpenTelemetry .NET<a name="features" class="headerlink" href="#features" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry .NET provides the following features:

- Collection and reporting of all spans and traces
- AlwaysOn Profiling for CPU and memory
- Ready for Splunk Observability Cloud (APM and RUM)
- W3C headers with baggage for context propagation by default
- OTLP over HTTP exporter to send spans to the Splunk OTel Collector
- OpenTelemetry and Splunk Observability Cloud semantic conventions

.. raw:: html

  <embed>
    <h2>Get started<a name="get-started" class="headerlink" href="#get-started" title="Permalink to this headline">¶</a></h2>
  </embed>

To instrument your .NET application, follow these steps:

#. Check compatibility and requirements. See :ref:`dotnet-otel-requirements`.
#. Instrument your .NET application. See :ref:`instrument-otel-dotnet-applications`.
#. Configure your instrumentation. See :ref:`advanced-dotnet-otel-configuration`.
