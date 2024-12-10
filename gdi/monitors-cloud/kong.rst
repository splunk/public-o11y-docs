.. _kong:

Kong Gateway (deprecated)
====================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for Kong analytics. See benefits, install, configuration, and metrics

.. caution:: 
   
   The Kong monitor is deprecated and is no longer supported. Do not use it to send data to Splunk Observability Cloud. 

To monitor your Kong traffic metrics with the :ref:`Splunk Distribution of the OpenTelemetry Collector <otel-intro>` use the native OTel :ref:`Prometheus receiver <prometheus-receiver>`. The receiver uses the Kong metrics Prometheus endpoint, which emits metrics for configurable request and response lifecycle groups, including:

-  Counters for response counts
-  Counters for cumulative response and request sizes
-  Counters for cumulative request, upstream, and Kong latencies

You can partition request and response lifecycle groups by:

-  API or Service Name/ID
-  Route ID
-  Request HTTP Method
-  Response HTTP Status Code

In addition, the integration provides system-wide connection statistics, including:

-  A counter for total fielded requests
-  Gauges for active connections and their various states
-  A gauge for database connectivity

To learn more: 

* About the Kong metrics Prometheus endpoint, see the official :new-page:`Kong documentation <https://docs.konghq.com/hub/kong-inc/prometheus>` on Prometheus. 
* About using the Prometheus receiver to monitor applications, see the :ref:`prometheus-generic` doc.

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




Kong installation
~~~~~~~~~~~~~~~~~

Follow the official Kong instructions to expose the Prometheus metrics endpoint. To learn how, see the official :new-page:`Kong documentation <https://docs.konghq.com/hub/kong-inc/prometheus>` on Prometheus. Use Kong version 3.4 or higher.

Configuration
-------------

Configure the Prometheus receiver with Kong as shown:

.. code:: yaml

   prometheus/kong:
      config:
         scrape_configs:
            - job_name: 'kong'
            scrape_interval: 10s
            static_configs:
               - targets: ['0.0.0.0:8001']

Next, activate the ``metrics`` pipeline:

.. code:: yaml

   metrics:
      receivers: [hostmetrics, otlp, signalfx, prometheus/kong]

Metrics
-------

For the complete list of metrics provided by the integration, refer to :new-page:`Kong Docs <https://docs.konghq.com/hub/kong-inc/prometheus>` on Prometheus.

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



