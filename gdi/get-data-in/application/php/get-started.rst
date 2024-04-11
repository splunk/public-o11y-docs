.. _get-started-php:

***********************************************************
Instrument PHP applications for Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Instrument your PHP application to export metrics and spans to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <php-otel-requirements>
   Instrument your PHP application <instrument-php-application>
   Manual instrumentation <php-manual-instrumentation>
   SignalFx Tracing Library (Deprecated) <sfx/sfx-instrumentation>
   Migrate from the SignalFx PHP library <php-migration-guide>

You can send application traces and metrics from your PHP applications to Splunk Observability Cloud using the OpenTelemetry automatic instrumentation for PHP.

To instrument your PHP application, follow these steps:

#. Check compatibility and requirements. See :ref:`php-otel-requirements`.
#. Instrument your PHP application. See :ref:`instrument-php-otel-applications`.
#. Add custom instrumentation. See :ref:`manual-php-otel-instrumentation`.

.. note:: The SignalFx Tracing Library for PHP is deprecated. To migrate to the OpenTelemetry automatic instrumentation for PHP, see :ref:`php-migration-guide`.
