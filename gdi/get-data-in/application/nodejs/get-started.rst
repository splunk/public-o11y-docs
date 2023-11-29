.. _get-started-nodejs:

***************************************************************
Instrument Node.js applications for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: Instrument your Node.js application to export metrics and spans to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <nodejs-otel-requirements>
   Instrument your Node.js application <instrumentation/instrument-nodejs-application>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Runtime and custom metrics <configuration/nodejs-otel-metrics>
   Manual instrumentation <instrumentation/manual-instrumentation>
   Configure the Node.js agent <configuration/advanced-nodejs-otel-configuration>
   Performance overhead <performance>
   Troubleshoot the Node.js agent <troubleshooting/common-nodejs-troubleshooting>
   About Splunk OTel JS <splunk-nodejs-otel-distribution>
   Migrate from the SFx Tracing Library <troubleshooting/migrate-signalfx-nodejs-agent-to-otel>

The Splunk Distribution of OpenTelemetry JS provides a Node.js SDK that automatically adds APM instrumentation to your Node.js application. The instrumentation captures traces, runtime metrics, and CPU and memory profiles and sends them to Splunk Observability Cloud.

To instrument your Node.js application, follow these steps:

#. Check compatibility and requirements. See :ref:`nodes-requirements`.
#. Instrument your Node.js application. See :ref:`instrument-nodejs-applications`.
#. Configure your instrumentation. See :ref:`configure-nodejs-instrumentation`.

For more information, see :ref:`splunk-nodejs-otel-dist`.

.. note:: The SignalFx Tracing Library for Node.js is deprecated and will reach End of Support on June 8th, 2023. To migrate to the Splunk Distribution of OpenTelemetry JS, see :ref:`migrate-signalfx-nodejs-agent-to-otel`.
