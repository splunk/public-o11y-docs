.. _kafka:

Kafka
============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Kafka monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the Kafka monitor type to monitor Kafka instances using collectd's GenericJMX plugin. 

.. note:: To monitor Kafka with the OpenTelemetry Collector using native OpenTelemetry components refer to the :ref:`kafkametrics-receiver`.

This integration has a set of built-in MBeans to pull metrics from the Kafka's JMX endpoint. For more information, see :new-page:`Kafka producer MBeans <https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/kafka/mbeans.go>` in GitHub.

This integration is only available on Kubernetes and Linux, and supports Kafka v0.8.2.x and higher.

For Kafka v1.x.x and higher monitor the following:

* ``kafka.server:type=ZooKeeperClientMetrics,name=ZooKeeperRequestLatencyMs`` to track how long brokers wait for requests to Zookeeper to be completed.
* Disk utilization and network metrics of the underlying host. 
* Since Zookeeper is an integral part of a Kafka cluster, you can monitor it using the :ref:`Zookeeper integration <zookeeper>`.

Benefits
--------



.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>




Installation
------------



.. raw:: html

   <div class="include-start" id="collector-installation-linux.rst"></div>

.. include:: /_includes/collector-installation-linux.rst

.. raw:: html

   <div class="include-stop" id="collector-installation-linux.rst"></div>




Configuration
-------------



.. raw:: html

   <div class="include-start" id="configuration.rst"></div>

.. include:: /_includes/configuration.rst

.. raw:: html

   <div class="include-stop" id="configuration.rst"></div>




Example
~~~~~~~~~~~~~~

To activate this integration, add the following to your Collector configuration:

.. code-block:: yaml

   receivers:
     smartagent/kafka:
       type: collectd/kafka
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/kafka]

See configuration examples for specific use cases that show how the
Splunk Distribution of the OpenTelemetry Collector can integrate and
complement existing environments.

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

See Settings in :ref:`genericjmx`.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/kafka/metadata.yaml"></div>  


Notes
~~~~~



.. raw:: html

   <div class="include-start" id="metric-defs.rst"></div>

.. include:: /_includes/metric-defs.rst

.. raw:: html

   <div class="include-stop" id="metric-defs.rst"></div>




Troubleshooting
---------------



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



