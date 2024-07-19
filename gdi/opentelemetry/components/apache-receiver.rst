.. _apache-receiver:

*******************************
Apache Web Server receiver
*******************************

.. meta::
      :description: The Apache Web Server receiver fetches stats from a Apache Web Server instance.

The Apache Web Server receiver fetches stats from a Apache Web Server instance using the ``server-status?auto endpoint``. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Kubelet stats receiver, add ``kubeletstats`` to the ``receivers`` section of your configuration file: 

.. code-block:: yaml

  receivers:
    apache:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [apache]

Settings
======================

The following table shows the configuration options for the Kubelet stats receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/apache.yaml"></div>

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/apachereceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
