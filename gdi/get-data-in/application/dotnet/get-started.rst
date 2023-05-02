.. _get-started-dotnet:

************************************************************
Instrument .NET applications for Splunk Observability Cloud
************************************************************


.. meta::
   :description: Instrument a .NET application to export metrics and spans to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <dotnet-requirements>
   Instrument a .NET application <instrumentation/instrument-dotnet-application>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Configure the .NET instrumentation <configuration/advanced-dotnet-configuration>
   Metrics and attributes <configuration/dotnet-metrics-attributes>
   Manual instrumentation <instrumentation/manual-dotnet-instrumentation>
   Troubleshoot the .NET instrumentation <troubleshooting/common-dotnet-troubleshooting>

The SignalFx Instrumentation for .NET provides automatic instrumentation for popular .NET libraries and frameworks to collect and send telemetry data to Splunk Observability Cloud. 

.. note:: To use the experimental OpenTelemetry instrumentation for .NET, see :ref:`get-started-dotnet-otel`.

.. raw:: html

  <embed>
    <h2>Features of the SignalFx Instrumentation for .NET<a name="features" class="headerlink" href="#features" title="Permalink to this headline">¶</a></h2>
  </embed>

The SignalFx Instrumentation for .NET provides the following features:

- Collection and reporting of all spans
- AlwaysOn Profiling for CPU and memory
- B3 and W3C headers for context propagation
- Zipkin trace exporter to send spans as JSON
- Support for existing custom instrumentation through OpenTracing
- Semantic conventions inspired by the OpenTelemetry standards

.. raw:: html

  <embed>
    <h2>Get started<a name="get-started" class="headerlink" href="#get-started" title="Permalink to this headline">¶</a></h2>
  </embed>

To instrument your .NET application, follow these steps:

#. Check compatibility and requirements. See :ref:`dotnet-requirements`.
#. Instrument your .NET application. See :ref:`instrument-dotnet-applications`.
#. Configure your instrumentation. See :ref:`advanced-dotnet-configuration`.

You can also automatically instrument your .NET applications along with the Splunk Distribution of OpenTelemetry Collector installation. Automatic instrumentation removes the need to install and configure the .NET library separately. See :ref:`auto-instrumentation-dotnet` for the installation instructions.