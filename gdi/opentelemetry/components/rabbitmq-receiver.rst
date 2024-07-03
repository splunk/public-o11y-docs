.. _rabbitmq-receiver:

****************************************
RabbitMQ receiver
****************************************

.. meta::
      :description: The Redis receiver retrieves Redis ``INFO`` data from a specific Redis instance and builds metrics from it.

The RabbitMQ receiver fetches stats from a RabbitMQ node using the RabbitMQ Management Plugin. For more information on the plugin refer to RabbitMQ's documentation at :new-page:`Management Plugin <https://www.rabbitmq.com/docs/management>`. The supported pipeline is ``metrics``. See :ref:`otel-data-processing` for more information.

Prerequisites
======================



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

To activate the RabbitMQ receiver manually in the Collector configuration, add ``rabitmq`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    rabbitmq:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [rabbitmq]

Settings
======================

The following table shows the configuration options for the Redis receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/rabbitmq.yaml"></div>

.. _redis-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/rabbitmqreceiver.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
