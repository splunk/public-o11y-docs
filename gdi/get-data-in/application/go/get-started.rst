.. _get-started-go:

**************************************************************
Instrument Go applications for Splunk Observability Cloud
**************************************************************


.. meta::
   :description: Instrument Go applications to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <go-otel-requirements>
   Instrument a Go application <instrumentation/instrument-go-application>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Configure the Go instrumentation <configuration/advanced-go-otel-configuration>
   Metrics and attributes <configuration/go-otel-metrics>
   Manual instrumentation <instrumentation/go-manual-instrumentation>
   Troubleshoot Go instrumentation <troubleshooting/common-go-troubleshooting>
   About Splunk OTel Go <splunk-go-otel-distribution>
   Migrate from SignalFx Go <troubleshooting/migrate-signalfx-go-to-otel>

The Splunk Distribution of OpenTelemetry Go provides multiple Go packages that instrument your Go application. The instrumentation captures distributed traces and metrics and sends them to Splunk Observability Cloud.

To instrument your Go application, follow these steps:

#. Check compatibility and requirements. See :ref:`go-otel-requirements`.
#. Instrument your Go application. See :ref:`instrument-go-applications`.
#. Configure your instrumentation. See :ref:`advanced-go-otel-configuration`.

For more information, see :ref:`splunk-go-otel-dist`.

.. note:: The SignalFx Tracing Library for Go is deprecated and will reach End of Support on June 8th, 2023. To migrate to the Splunk Distribution of OpenTelemetry Go, see :ref:`migrate-signalfx-go-to-otel`.
