.. _haproxy-receiver:

***********************
HAProxy receiver
***********************

.. meta::
      :description: The HAProxy receiver generates metrics by polling periodically the HAProxy process through a dedicated socket or HTTP URL

The HAProxy receiver generates metrics by polling periodically the HAProxy process through a dedicated socket or HTTP URL. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information. 

.. note:: Out-of-the-box dashboards and navigators aren't supported for the HAProxy receiver yet, but are planned for a future release.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configurations
---------------------------

To activate the HAProxy receiver, add ``haproxy`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    haproxy:
      endpoint: file:///var/run/haproxy.ipc
      collection_interval: 1m
      metrics:    

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [haproxy]

Configuration options
--------------------------------------------

You can configure the following settings:

* ``endpoint``. :strong:`Required`. Path to the endpoint exposed by HAProxy for communications. It can be a local file socket or a HTTP URL.

* ``collection_interval``. Optional, ``1m`` by default. The scraping collection interval.

* ``initial_delay``. Optional, ``1s`` by default. Defines how long this receiver waits before starting.

Settings
======================

The following table shows the configuration options for the HAProxy receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/haproxy.yaml"></div>

.. _haproxy-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/haproxyreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
