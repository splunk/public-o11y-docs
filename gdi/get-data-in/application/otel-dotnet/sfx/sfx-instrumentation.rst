.. caution::

   The SignalFx Instrumentation for .NET is deprecated as of February 21, 2024 and will reach End of Support on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the date, this repository will be archived and no longer maintained.

   New customers instrumenting the .NET ecosystem should use the :ref:`Splunk Distribution of OpenTelemetry .NET <instrument-otel-dotnet-applications>`. Existing customers should consider migrating to Splunk Distribution of OpenTelemetry .NET which offers similar capabilities. To learn how to migrate, see :ref:`migrate-signalfx-dotnet-to-dotnet-otel`.

.. _sfx-library-deprecated:

************************************************************
SignalFx Instrumentation for .NET (Deprecated)
************************************************************

.. meta::
   :description: The SignalFx Instrumentation for .NET is deprecated. Migrate to the Splunk Distribution of OpenTelemetry .NET to use the latest features.

.. toctree::
   :hidden:

   Requirements <dotnet-requirements>
   Instrument your .NET application <instrumentation/instrument-dotnet-application>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Configure the .NET instrumentation <configuration/advanced-dotnet-configuration>
   Metrics and attributes <configuration/dotnet-metrics-attributes>
   Manual instrumentation <instrumentation/manual-dotnet-instrumentation>
   Troubleshoot the .NET instrumentation <troubleshooting/common-dotnet-troubleshooting>

The SignalFx Instrumentation for .NET provides automatic instrumentation for popular .NET libraries and frameworks to collect and send telemetry data to Splunk Observability Cloud.

.. raw:: html

  <embed>
    <h2>Features of the SignalFx Instrumentation for .NET<a name="features" class="headerlink" href="#features" title="Permalink to this headline">¶</a></h2>
  </embed>

The SignalFx Instrumentation for .NET provides the following features:

- Collection and reporting of all spans
- AlwaysOn Profiling for CPU and memory
- Database Query Performance (from version 1.4.0)
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
