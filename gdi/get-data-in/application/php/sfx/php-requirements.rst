.. caution::

   The SignalFx Tracing Library for PHP is deprecated as of February 21, 2024 and will reach End of Support (EOS) on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the EOS date, the library will be archived and no longer maintained.

   If you want to instrument new or existing PHP applications, use :ref:`OpenTelemetry PHP instrumentation <get-started-php>`, which offers similar functionalities.

.. _php-requirements:

***************************************************************
PHP instrumentation compatibility and requirements (deprecated)
***************************************************************

.. meta::
    :description: This is what you need to instrument PHP applications for Splunk Observability Cloud.

The SignalFx Tracing Library for PHP supports PHP version 7.0 or higher running on the Zend engine.

PHP instrumentation is supported for these web servers:

- Apache
- php-fpm
- php-cli

.. note:: The library is not compatible with Windows environments.

.. _supported-php-libraries:

Supported libraries and frameworks
=================================================

The SignalFx Tracing Library for PHP instruments the following libraries and frameworks:

.. list-table::
   :widths: 60 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Version
   * - CakePHP
     - 2.x
   * - CodeIgniter
     - 2.2 and higher
   * - Curl
     - All supported PHP versions
   * - Drupal
     - 7.x, 8.x, and 9.x
   * - Elasticsearch
     - 1.x
   * - Eloquent
     - All supported Laravel versions
   * - Guzzle
     - 5.0 and higher
   * - Laravel
     - 4.2 or 5.0 and higher
   * - Lumen
     - 5.2 to 5.8
   * - Memcached
     - All supported PHP versions
   * - MongoDB
     - 1.4
   * - MySQLi
     - All supported PHP versions
   * - Nette
     - 2.4, 3.x
   * - PDO
     - All supported PHP versions
   * - Predis
     - 1.1
   * - Slim
     - 3.x
   * - Symfony
     - 3.3, 3.4, 4.x, 5.x
   * - Wordpress
     - 4.8 or 5.5 and higher
   * - Yii
     - 2.0 
   * - Zend
     - 1.12
