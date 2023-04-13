.. _postgresql-receiver:

***********************
PostgreSQL receiver
***********************

.. meta::
      :description: The PostgreSQL receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from PostgreSQL through its statistics collector.

The PostgreSQL receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from PostgreSQL through its statistics collector. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

.. note:: Use the PostgreSQL receiver in place of the SignalFx Smart Agent ``postgresql`` monitor type.

Requirements
======================

This receiver supports PostgreSQL version 9.6 and higher.

To let the receiver collect data, grant the monitoring user ``SELECT`` permissions for ``pg_stat_database``.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the PostgreSQL receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the PostgreSQL receiver, add ``mongodbatlas`` to the ``receivers`` section of your
configuration file, as shown in the following example:

.. code:: yaml

   receivers:
     postgresql:
       endpoint: localhost:5432
       transport: tcp
       username: otel
       password: ${POSTGRESQL_PASSWORD}
       databases:
         - otel
       collection_interval: 10s
       tls:
         insecure: false
         insecure_skip_verify: false
         ca_file: /home/otel/authorities.crt
         cert_file: /home/otel/mypostgrescert.crt
         key_file: /home/otel/mypostgreskey.key

The ``username`` and ``password`` fields are mandatory. By default, the receiver searches for a PostgreSQL server at ``localhost:5432``. You can customize the address by editing the value of the ``endpoint`` field.

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [postgresql]

Settings
======================

The following table shows the configuration options for the PostgreSQL:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/postgresql.yaml"></div>

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/postgresqlreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
