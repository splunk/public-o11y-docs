.. _instrument-php-otel-applications:

*******************************************************************************
Instrument your PHP application for Splunk Observability Cloud (OpenTelemetry)
*******************************************************************************

.. meta::
   :description: The OpenTelemetry PHP extensions automatically instruments PHP applications using a PHP extension and available instrumentation libraries. Follow these steps to get started.

The OpenTelemetry PHP extension automatically instruments PHP applications using a PHP extension and available instrumentation libraries. You can send telemetry to the Splunk Distribution of OpenTelemetry Collector or directly to the Splunk Observability Cloud ingest endpoint.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the PHP OpenTelemetry guided setup. To access the PHP OpenTelemetry guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`PHP OpenTelemetry guided setup <https://login.signalfx.com/#/gdi/scripted/php-dotnet-tracing/>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
   #. In the integration filter menu, select :guilabel:`By Product`.
   #. Select the :guilabel:`APM` product.
   #. Select the :guilabel:`.PHP (OpenTelemetry)` tile to open the PHP OpenTelemetry guided setup.

.. _install-php-otel-instrumentation:

Install the Splunk Distribution of OpenTelemetry PHP manually
==================================================================

Follow these steps to install and automatically instrument your PHP application:

1. Check that you meet the requirements. See :ref:`php-otel-requirements`.

2. Install the OpenTelemetry PHP extension using PECL:

   .. code-block:: bash

      sudo apt-get install gcc make autoconf
      pecl install opentelemetry

3. Add the extension to your php.ini file:

   .. code-block:: ini

      [opentelemetry]
      extension=opentelemetry.so

4. Install the required instrumentations you need using Composer:

   .. code-block:: bash

      php composer.phar install open-telemetry/exporter-otlp:^1.0.3
      php composer.phar install php-http/guzzle7-adapter:^1.0

   You can also install additional instrumentations. See :ref:`supported-php-otel-libraries`.

5. Configure the basic settings in your php.ini file or using environment variables:

   .. code-block:: bash

      OTEL_PHP_AUTOLOAD_ENABLED=true \
      OTEL_SERVICE_NAME="<your-service-name>" \
      OTEL_RESOURCE_ATTRIBUTES="deployment.environment=<your_env>" \

6. Run your application.

   See the :new-page:`OpenTelemetry PHP examples <https://github.com/signalfx/tracing-examples/tree/main/opentelemetry-tracing/opentelemetry-php>` in GitHub for sample instrumentation scenarios.


.. _export-directly-to-olly-cloud-php-otel:

Send data directly to Splunk Observability Cloud
====================================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To bypass the Collector and send data directly to Splunk Observability Cloud, set the following environment variables:

.. code-block:: shell

   OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-sf-token=<access_token>
   OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<realm>.signalfx.com/trace/otlp

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps:

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username.

The realm name appears in the :guilabel:`Organizations` section.
