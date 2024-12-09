.. _apache-receiver:

*******************************
Apache Web Server receiver
*******************************

.. meta::
      :description: The Apache Web Server receiver fetches stats from a Apache Web Server instance.

The Apache Web Server receiver fetches stats from an Apache Web Server instance using the ``server-status?auto endpoint``. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

.. note:: Out-of-the-box dashboards and navigators aren't supported for the Apache Web Server receiver yet, but are planned for a future release.

Prerequisites
======================

This receiver supports Apache Web Server version 2.4 or higher.

In order to receive server statistics, you must configure the server's ``httpd.conf`` file to enable status support. Learn more at Apache's official documentation :new-page:`Module mod_status <https://httpd.apache.org/docs/2.4/mod/mod_status.html>`.

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

To activate the Apache Web Server receiver, add ``apache`` to the ``receivers`` section of your configuration file: 

.. code-block:: yaml

  receivers:
    apache:
      endpoint: "http://localhost:8080/server-status?auto"
      collection_interval: 10s

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [apache]

Configuration options
-----------------------

The following settings are required:

* ``endpoint``. ``"http://localhost:8080/server-status?auto"`` by default. The URL of the httpd status endpoint.

The following settings are optional:



.. raw:: html

   <div class="include-start" id="gdi/collector-settings-collectioninterval.rst"></div>

.. include:: /_includes/gdi/collector-settings-collectioninterval.rst

.. raw:: html

   <div class="include-stop" id="gdi/collector-settings-collectioninterval.rst"></div>






.. raw:: html

   <div class="include-start" id="gdi/collector-settings-initialdelay.rst"></div>

.. include:: /_includes/gdi/collector-settings-initialdelay.rst

.. raw:: html

   <div class="include-stop" id="gdi/collector-settings-initialdelay.rst"></div>




Settings
======================

The following table shows the configuration options for the Apache Web Server receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/apache.yaml"></div>

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/apachereceiver.yaml"></div>



.. raw:: html

   <div class="include-start" id="activate-deactivate-native-metrics.rst"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

.. raw:: html

   <div class="include-stop" id="activate-deactivate-native-metrics.rst"></div>




Troubleshooting
======================



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



