.. _rabbitmq-receiver:

****************************************
RabbitMQ receiver
****************************************

.. meta::
      :description: The Redis receiver retrieves Redis ``INFO`` data from a specific Redis instance and builds metrics from it.

The RabbitMQ receiver fetches stats from a RabbitMQ node using the RabbitMQ Management Plugin. For more information on the plugin refer to RabbitMQ's documentation at :new-page:`Management Plugin <https://www.rabbitmq.com/docs/management>`. The supported pipeline is ``metrics``. See :ref:`otel-data-processing` for more information.

.. note:: Out-of-the-box dashboards and navigators aren't supported for the RabbitMQ receiver yet, but are planned for a future release.

Prerequisites
======================

The following applies:

* This receiver supports RabbitMQ versions 3.8 and 3.9.

* To enable the RabbitMQ Management Plugin, follow the official instructions as described in :new-page:`RabbitMQ Getting Started <https://www.rabbitmq.com/docs/management#getting-started>`.

* You need at least monitoring level permissions to monitor. Read more at :new-page:`RabbitMQ permissions <https://www.rabbitmq.com/docs/management#permissions>`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver creator receiver as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------------------------------------------------------

To activate the RabbitMQ receiver, add ``rabbitmq`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    rabbitmq:
      endpoint: http://localhost:15672
      username: otelu
      password: ${env:RABBITMQ_PASSWORD}
      collection_interval: 10s

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [rabbitmq]

Configuration settings
----------------------------------------------------------------------

The following settings are required:

* ``username``
* ``password``

The following settings are optional:

* ``endpoint``. ``http://localhost:15672`` by default. The URL of the node to be monitored.
* ``collection_interval``. ``10s`` by default.  This receiver collects metrics on an interval. Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, ``h``.
* ``tls``. TLS control. By default insecure settings are rejected and certificate verification is on. Learn more about the default settings at :new-page:`TLS Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md>` in GitHub.

Settings
======================

The following table shows the configuration options for the Redis receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/rabbitmq.yaml"></div>

.. _rabbitmq-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/rabbitmqreceiver.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
