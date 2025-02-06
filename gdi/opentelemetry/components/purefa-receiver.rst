.. _purefa-receiver:

********************************************************
Pure Storage FlashArray receiver
********************************************************

.. meta::
      :description: Receives metrics from the Pure Storage FlashArray.

The Pure Storage FlashArray (Purefa) receiver fetches metrics from the Pure Storage FlashArray.

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
----------------------------------------------------------------------

To activate the Purefa receiver in the Collector, add ``purefa`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    purefa:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [purefa]

Configuration example
----------------------------------------------------------------------

See the following config example:

.. code:: yaml



Configuration settings
-------------------------------------------------



Settings
======================

The following table shows the configuration options for the Purefa receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/purefa.yaml"></div>

.. _purefa-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/purefareceiver.yaml"></div>

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>





