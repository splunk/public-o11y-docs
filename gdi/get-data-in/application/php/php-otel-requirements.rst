.. _php-otel-requirements:

****************************************************************
OpenTelemetry PHP instrumentation compatibility and requirements
****************************************************************

.. meta::
    :description: This is what you need to instrument PHP applications for Splunk Observability Cloud.

.. include:: /_includes/requirements/php.rst

.. _php-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

.. _supported-php-otel-libraries:

Supported libraries and frameworks
=================================================

The OpenTelemetry instrumentation supports the following libraries:

.. list-table::
   :widths: 60 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Version
   * - CodeIgniter
     - 4.0 and higher
   * - ExtAmqp
     - All supported PHP versions
   * - Guzzle
     - 7.0 and higher
   * - HttpAsyncClient
     - 2.x
   * - IO
     - All supported PHP versions
   * - Laravel
     - 6.0 and higher
   * - MongoDB
     - 1.15.x
   * - OpenAIPHP
     - All supported PHP versions
   * - PDO
     - All supported PHP versions
   * - PSR-3 (Logging Interface)
     - 1.0 and higher
   * - PSR-14 (Event Dispatcher)
     - 1.0 and higher
   * - PSR-15 (HTTP Server Request Handlers)
     - 1.0 and higher
   * - PSR-18 (HTTP Client)
     - 1.0 and higher
   * - Slim
     - 4.x
   * - Symfony
     - 5.4 and higher
   * - Wordpress
     - All supported PHP versions
   * - Yii
     - 2.0.13

