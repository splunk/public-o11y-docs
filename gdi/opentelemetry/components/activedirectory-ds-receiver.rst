.. _activedirectory-ds-receiver:

*****************************************
Active Directory Domain Services receiver
*****************************************

.. meta::
      :description: The Active Directory Domain Services receiver scrapes metrics relating to an Active Directory domain controller using the Windows Performance Counters.

.. note:: Out-of-the-box dashboards and navigators aren't supported for the Active Directory Domain Services receiver yet, but are planned for a future release.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your Windows host: :ref:`otel-install-windows`


2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Active Directory Domain Services receiver, add ``active_directory_ds`` to the ``receivers`` section of your configuration file:

.. code-block:: yaml

    receivers:
      active_directory_ds:
        collection_interval: 10s

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code-block:: yaml

    service:
      pipelines:
        metrics:
          receivers: [active_directory_ds]

Configuration options
-----------------------

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

The following table shows the configuration options for the Active Directory Domain Services receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/active_directory_ds.yaml"></div>

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/activedirectorydsreceiver.yaml"></div>



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
