.. _get-started-ruby-distro:

***************************************************************
Instrument Ruby applications for Splunk Observability Cloud
***************************************************************

.. caution:: The Splunk Distribution for OpenTelemetry Ruby has been deprecated since March 15, 2024, and it will reach end of support on March 15, 2025. To migrate from the Splunk Ruby agent to the OpenTelemetry instrumentation for Ruby, see :ref:`migrate-from-splunk-ruby`.

.. meta::
   :description: Instrument Ruby applications automatically to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <ruby-otel-requirements>
   Instrument your Ruby application <instrumentation/instrument-ruby-application>
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

.. note:: The SignalFx Ruby tracing library has reached end of support. To migrate to the Splunk Distribution of OpenTelemetry Ruby, see :ref:`migrate-signalfx-ruby-agent-to-otel-distro`.
