.. _get-started-ruby:

**************************************************************
Instrument Ruby applications for Splunk Observability Cloud
**************************************************************


.. meta::
   :description: Instrument Ruby applications automatically to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <ruby-otel-requirements>
   Instrument a Ruby application <instrumentation/instrument-ruby-application>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Configure the Ruby instrumentation <configuration/advanced-ruby-otel-configuration>
   Manual instrumentation <instrumentation/ruby-manual-instrumentation>
   Troubleshoot Ruby instrumentation <troubleshooting/common-ruby-troubleshooting>
   About Splunk OTel Ruby <splunk-ruby-otel-distribution>
   Migrate from SignalFx Ruby agent <troubleshooting/migrate-signalfx-ruby-agent-to-otel>

The Splunk Distribution of OpenTelemetry Ruby provides a Ruby agent that automatically adds APM instrumentation to your Ruby application. The instrumentation captures distributed traces and sends them to Splunk Observability Cloud.

To instrument your Ruby application, follow these steps:

#. Check compatibility and requirements. See :ref:`ruby-otel-requirements`.
#. Instrument your Ruby application. See :ref:`instrument-ruby-applications`.
#. Configure your instrumentation. See :ref:`configure-ruby-instrumentation`.

For more information, see :ref:`splunk-ruby-otel-dist`.

.. note:: The SignalFx Ruby tracing library is deprecated and will reach End of Support on September 30th, 2023. To migrate to the Splunk Distribution of OpenTelemetry Ruby, see :ref:`migrate-signalfx-ruby-agent-to-otel`.
