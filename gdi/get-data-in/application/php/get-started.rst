.. caution::

   The SignalFx Instrumentation for .NET is deprecated as of February 21, 2024 and will reach End of Support on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the date, the library will be archived and no longer maintained.

   New and existing users should consider using OpenTelemetry PHP instrumentation  which offers similar capabilities. To learn how to use OpenTelmetry PHP instrumentation refer to OpenTelemetry official documentation. 

.. _get-started-php:

***********************************************************
Instrument PHP applications for Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Instrument your PHP application to export metrics and spans to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <php-requirements>
   Instrument your PHP application <instrumentation/instrument-php-application>
   Configure the PHP instrumentation <configuration/advanced-php-configuration>
   Manual instrumentation <instrumentation/php-manual-instrumentation>

The SignalFx Tracing Library for PHP provides automatic instrumentations for many popular PHP libraries and frameworks. The library is a native extension that supports PHP versions 7.0 or higher running on the Zend Engine.

To instrument your PHP application, follow these steps:

#. Check compatibility and requirements. See :ref:`php-requirements`.
#. Instrument your PHP application. See :ref:`instrument-php-applications`.
#. Configure your instrumentation. See :ref:`advanced-php-configuration`.
