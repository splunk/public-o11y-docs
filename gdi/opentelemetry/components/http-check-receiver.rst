.. _http-check-receiver:

*************************
HTTP check receiver
*************************

.. meta::
      :description: Use the HTTP check receiver to perform synthethic checks against HTTP endpoints. 

The HTTP check receiver generates metrics scraped from host systems when the Collector is deployed as an agent. The supported pipeline type is ``metrics``.





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

To activate the receiver, add ``httpcheck`` to the ``receivers`` section of your configuration file:

.. code-block:: yaml

  receivers:
    httpcheck:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [httpcheck]

See :ref:`http-check-receiver-settings` for more details.

Configuration example
--------------------------------



Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/httpcheckreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

.. _http-check-receiver-settings:

Settings
======================

The following table shows the configuration options for the HTTP check receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/httpcheck.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
