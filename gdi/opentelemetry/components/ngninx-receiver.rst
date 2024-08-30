.. _ngninx-receiver:

***********************
NGINX receiver
***********************

.. meta::
      :description: The NGINX receiver fetches stats from a NGINX instance using the ``ngx_http_stub_status_module`` module's status endpoint.

The NGINX receiver fetches stats from a NGINX instance using the ``ngx_http_stub_status_module`` module's ``status`` endpoint. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information. 

You need to configure NGINX to expose status information. To learn how, see the :new-page:`HTTP status module config guide <https://nginx.org/en/docs/http/ngx_http_stub_status_module.html>` in the NGINX documentation.

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
---------------------------

To activate the NGINX receiver, add ``nginx`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    nginx:
      endpoint: "http://localhost:80/status"
      collection_interval: 10s

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [nginx]

Configuration options
-------------------------------------------------

The following settings are available:

* ``endpoint``. :strong:`Required`. ``http://localhost:80/status`` by default. The URL of the NGINX status endpoint.

* ``collection_interval``. ``10s`` by default. This receiver runs on an interval. Each time it runs, it queries NGINX, creates metrics, and sends them to the next consumer. This option sets the duration between runs.

  * Must be a string readable by Golang's ``ParseDuration`` function, for example ``1h30m``. 
  
  * Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, ``h``.

* ``initial_delay``. ``1s`` by default. Defines how long this receiver waits before starting.

Settings
======================

The following table shows the configuration options for the NGINX receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/nginx.yaml"></div>

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/nginxreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
