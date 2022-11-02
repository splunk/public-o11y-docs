.. _php-requirements:

*************************************************************
PHP instrumentation compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument PHP applications for Splunk Observability Cloud.

The SignalFx Tracing Library for PHP supports PHP version 5.4 or higher running on the Zend engine.

Supported web servers are:

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
   * - CakePHP (Experimental)
     - 2.x
   * - Curl
     - All supported PHP versions
   * - ElasticSearch (Experimental)
     - 1.x
   * - Eloquent (Experimental)
     - All supported Laravel versions
   * - Guzzle (Experimental)
     - 5.0 and higher
   * - Laravel
     - 4.2 or 5.0 and higher
   * - Lumen (Experimental)
     - 5.2 to 5.8
   * - Memcached (Experimental)
     - All supported PHP versions
   * - MongoDB (Experimental)
     - 1.4
   * - MySQLi (Experimental)
     - All supported PHP versions
   * - PDO
     - All supported PHP versions
   * - Predis (Experimental)
     - 1.1
   * - Slim (Experimental)
     - 3.x
   * - Symfony (Experimental)
     - 3.3, 3.4, 4.x, 5.x
   * - Zend (Experimental)
     - 1.12
