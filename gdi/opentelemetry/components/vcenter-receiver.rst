.. _vcenter-receiver:

***********************
vCenter receiver
***********************

.. meta::
      :description: The vCenter receiver supports ESXi and vCenter.

The vCenter receiver fetches metrics from a vCenter or ESXi host running VMware vSphere APIs.

Prerequisites
======================

This receiver supports ESXi and vCenter versions 7.0 and 8.

To retrieve data you need to assign a read-only user to vSphere with permissions to the vCenter server, cluster and all subsequent resources being monitored.

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

To activate the vCenter receiver in the Collector, add ``vecenter`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    vcenter:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [vcenter]


Configuration example
----------------------------------------------------------------------

See the following config example:

.. code:: yaml

  vcenter:
    endpoint: http://vcsa.host.localnet
    username: otelu
    password: ${env:VCENTER_PASSWORD}
    collection_interval: 5m
    metrics:
      vcenter.host.cpu.utilization:
        enabled: false

Configuration settings
-------------------------------------------------

The following setting are required:



Settings
======================

The following table shows the configuration options for the vCenter receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/vcenter.yaml"></div>

.. _redis-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/vcenterreceiver.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
