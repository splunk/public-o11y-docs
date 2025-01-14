.. _get-started-nodejs:

***************************************************************
Instrument Node.js applications for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: Instrument your Node.js application to export metrics and spans to Splunk Observability Cloud.

.. caution::

   The Splunk Distribution of OpenTelemetry Node.js version 2.x is deprecated and will reach End of Support on June 8, 2025. Until then, only critical security fixes and bug fixes will be provided.

   New customers should use the latest version of the :ref:`Splunk Distribution of OpenTelemetry Node.js <get-started-nodejs-3x>`. Existing customers should consider migrating to version 3.x. To learn how to migrate, see :ref:`nodejs-3x-breaking-changes`.

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

