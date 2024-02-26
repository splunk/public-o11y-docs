.. _php-migration-guide: 

*************************************************
Migrate from the SignalFx Tracing Library for PHP
*************************************************

.. meta::
   :description: The OpenTelemetry instrumentation for PHP is the alternative to the deprecated SignalFx Tracing Library for PHP. To migrate from the SignalFx instrumentation, follow these instructions.

The OpenTelemetry instrumentation for PHP is the alternative to the deprecated SignalFx Tracing Library for PHP. To migrate from the SignalFx instrumentation, follow these instructions.

.. _requirements-splunk-php-otel-migration:

Compatibility and requirements
==========================================================

For a complete list of requirements, see :ref:`php-otel-requirements`.

.. _migrate-to-php-otel:

Migrate to the OpenTelemetry instrumentation for PHP
========================================================

To migrate from the SignalFx Tracing Library for PHP to the OpenTelemetry instrumentation for PHP, follow these steps:

#. Uninstall the SignalFx Tracing Library for PHP. See :ref:`uninstall-php-sfx`.
#. Install and activate the OpenTelemetry instrumentation for PHP. See :ref:`install-php-otel-instrumentation`.
#. Update your settings. See :ref:`changes-functionality-php-otel`.
#. Restart the server and application.

.. _uninstall-php-sfx:

Uninstall the SignalFx Tracing Library for PHP
---------------------------------------------------

To uninstall the SignalFx Tracing Library for PHP, run the following command:

.. code-block:: shell

   php signalfx-setup.php --uninstall

Make sure that your .ini file doesn't contain references to ``signalfx-tracing.so`` and that the extension file has been removed. Optionally, you can delete the /opt/signalfx/signalfx-library directory.

.. _changes-functionality-php-otel:

Configuration setting changes
===================================================

The following table shows SignalFx Tracing Library for PHP environment variables and their OpenTelemetry equivalents:

.. list-table::
   :header-rows: 1
   :width: 100%

   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_SERVICE_NAME``
     - ``OTEL_SERVICE_NAME=<service_name>``
   * - ``SIGNALFX_ENV``
     - ``OTEL_RESOURCE_ATTRIBUTES=deployment.environment=<environment_name>``
   * - ``SIGNALFX_VERSION``
     - ``OTEL_RESOURCE_ATTRIBUTES=version=<version>``
   * - ``SIGNALFX_GLOBAL_TAGS``
     - ``OTEL_RESOURCE_ATTRIBUTES``
   * - ``SIGNALFX_ACCESS_TOKEN``
     - Handled by the Splunk Collector
   * - ``SIGNALFX_REALM``
     - Handled by the Splunk Collector
   * - ``SIGNALFX_ENDPOINT_URL``
     - ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT``
   * - ``SIGNALFX_METRICS_ENDPOINT_URL``
     - ``OTEL_EXPORTER_OTLP_ENDPOINT``
