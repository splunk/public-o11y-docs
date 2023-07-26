.. _get-started-dotnet-otel:

***************************************************************************
Instrument .NET applications for Splunk Observability Cloud (OpenTelemetry)
***************************************************************************

.. meta::
   :description: Instrument a .NET application to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <dotnet-requirements>
   Instrument a .NET application <instrumentation/instrument-dotnet-application>
   Configure the .NET instrumentation <configuration/advanced-dotnet-configuration>
   Metrics and attributes <configuration/dotnet-metrics-attributes>
   Manual instrumentation <instrumentation/manual-dotnet-instrumentation>
   Troubleshoot the .NET instrumentation <troubleshooting/common-dotnet-troubleshooting>
   Migrate from SignalFx Instrumentation for .NET <troubleshooting/migrate-signalfx-dotnet-to-dotnet-otel>   

The Splunk Distribution of OpenTelemetry .NET provides automatic instrumentation for popular .NET libraries and frameworks to collect and send telemetry to Splunk Observability Cloud.

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

.. raw:: html

  <embed>
    <h2>Features of the Splunk Distribution of OpenTelemetry .NET<a name="features" class="headerlink" href="#features" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry .NET provides the following features:

- Collection and reporting of all spans and traces
- Ready for Splunk Observability Cloud (APM and RUM)
- W3C headers with baggage for context propagation by default
- OTLP over HTTP exporter to send spans to the Splunk OTel Collector
- OpenTelemetry and Splunk Observability Cloud semantic conventions

.. note:: If you need AlwaysOn Profiling for .NET, use the SignalFx Instrumentation for .NET. See :ref:`get-started-dotnet`.

.. raw:: html

  <embed>
    <h2>Get started<a name="get-started" class="headerlink" href="#get-started" title="Permalink to this headline">¶</a></h2>
  </embed>

To instrument your .NET application, follow these steps:

#. Check compatibility and requirements. See :ref:`dotnet-otel-requirements`.
#. Instrument your .NET application. See :ref:`instrument-otel-dotnet-applications`.
#. Configure your instrumentation. See :ref:`advanced-dotnet-otel-configuration`.