.. caution::

   The SignalFx Tracing Library for PHP is deprecated as of February 21, 2024 and will reach End of Support (EOS) on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the EOS date, the library will be archived and no longer maintained.

   If you want to instrument new or existing PHP applications, use :ref:`OpenTelemetry PHP instrumentation <get-started-php>`, which offers similar functionalities.

.. _sfx-php-deprecated:

***********************************************************
SignalFx Tracing Library for PHP (deprecated)
***********************************************************

.. meta::
   :description: The SignalFx Instrumentation for .NET is deprecated. Migrate to the Splunk Distribution of OpenTelemetry .NET to use the latest features.

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
