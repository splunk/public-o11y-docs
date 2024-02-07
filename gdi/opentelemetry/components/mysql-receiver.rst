.. _mysql-receiver:

****************************
MySQL receiver
****************************

.. meta::
      :description: The MySQL receiver allows the Splunk Distribution of OpenTelemetry Collector to query and retrieve metrics about MySQL's global status and InnoDB tables.

The MySQL receiver queries and retrieves metrics about MySQL's global status and InnoDB tables. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Prerequisites and requirements
====================================

This receiver supports MySQL version 8.0.

.. _mysql-receiver-reqs-metrics:

Requirements to collect metrics
-------------------------------------------

The following applies:

* To collect most metrics, you need to be able to execute ``SHOW GLOBAL STATUS``.
* Some metrics don't appear if their corresponding feature is inactive.
* To collect optional metrics you must specify them your configuration. 

For the full list of available metrics, see :ref:`mysql-receiver-metrics`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the MySQL receiver as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------

To activate the eceiver, add ``mysql`` to the ``receivers`` section of your configuration file:

.. code:: yaml

  receivers:
    mysql:
      endpoint: localhost:3306
      username: otel
      password: ${env:MYSQL_PASSWORD}
      database: otel
      collection_interval: 10s
      initial_delay: 1s
      statement_events:
        digest_text_limit: 120
        time_limit: 24h
        limit: 250

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - mysql

The following settings are optional:

* ``endpoint``. ``localhost:3306`` by default.

* ``tls``. Defines the TLS configuration to use. If ``tls`` is not set, the default is to disable TLS connections.

  * ``insecure``. ``false`` by default. Set to ``true`` to disable TLS connections.

  * ``insecure_skip_verify``. ``false`` by default. Set to ``true`` to enable TLS but not verify the certificate.

  * ``server_name_override``. Use this to set the ServerName in the TLSConfig.

* ``username``. ``root`` by default.

* ``password``. The password to the username.

* ``allow_native_passwords``. ``true`` by default.

* ``database``. The database name. If unspecified, metrics are collected for all databases.

* ``collection_interval``. ``10s`` by default. This receiver collects metrics on this interval. 

  * This value must be a string readable by Golang's ParseDuration function. Learn more at Golang's official documentation at :new-page:`ParseDuration <https://pkg.go.dev/time#ParseDuration>`. 
  
  * Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, or ``h``.

* ``initial_delay``. ``1s`` by default. Defines how long this receiver waits before starting.

* ``transport``. ``tcp`` by default. Defines the network to use to connect to the server.

* ``statement_events``. Additional configuration for the queries that build ``mysql.statement_events.count`` and ``mysql.statement_events.wait.time`` metrics:

  * ``digest_text_limit``. ``120`` by default. Maximum length of ``digest_text``. Longer text is truncated.

  * ``time_limit``. ``24h`` by default.  Maximum time from since the statements have been observed last time.

  * ``limit``. ``250`` by default.  Limit of records, which is maximum number of generated metrics.

.. _mysql-receiver-settings:

Settings
======================

The following table shows the configuration options for the MySQL receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/mysql.yaml"></div>

.. _mysql-receiver-metrics:

Metrics
=======================

The following metrics, resource attributes, and attributes, are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/mysqlreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst