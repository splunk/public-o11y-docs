.. caution::

   The SignalFx Tracing Library for PHP is deprecated as of February 21, 2024 and will reach End of Support on February 21 2025. Until then, only critical security fixes and bug fixes will be provided. After the date, the library will be archived and no longer maintained.

   New and existing users should consider using OpenTelemetry PHP instrumentation  which offers similar capabilities. To learn how to use OpenTelmetry PHP instrumentation refer to OpenTelemetry official documentation.

.. _php-requirements:

*************************************************************
PHP instrumentation compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument PHP applications for Splunk Observability Cloud.

.. include:: /_includes/requirements/php.rst

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
   * - ElasticSearch
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
     - 4.8, 5.5 and higher
   * - Yii
     - 2.0 
   * - Zend
     - 1.12
