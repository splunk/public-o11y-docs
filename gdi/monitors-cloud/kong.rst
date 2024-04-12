.. _kong:

Kong Gateway
============

.. meta::
   :description: Use this Splunk Observability Cloud integration for Kong analytics. See benefits, install, configuration, and metrics

.. caution:: 
   
   The Kong monitor is now deprecated and will reach of End of Support on October 31st, 2024. During this period only critical security and bug fixes are provided. When End of Support is reached, the monitor will be removed and no longer be supported, and you won't be able to use it to send data to Splunk Observability Cloud. 

To monitor your Kong traffic metrics with the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` use the :ref:`Prometheus receiver <prometheus-receiver>`. The receiver uses the Kong metrics Prometheus endpoint, which emits metrics for configurable request and response lifecycle groups, including:

-  Counters for response counts
-  Counters for cumulative response and request sizes
-  Counters for cumulative request, upstream, and Kong latencies

You can partition request and response lifecycle groups by:

-  API or Service Name/ID
-  Route ID
-  Request HTTP Method
-  Response HTTP Status Code

In addition, the integration provides system-wide connection statistics,
including:

-  A counter for total fielded requests
-  Gauges for active connections and their various states
-  A gauge for database connectivity

To learn more about the Kong metrics Prometheus endpoint, see :new-page:`Kong Docs on Prometheus <https://docs.konghq.com/hub/kong-inc/prometheus>`. 

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Kong installation
~~~~~~~~~~~~~~~~~

Follow the official Kong instructions to expose the Prometheus metrics endpoint. To learn how, see :new-page:`Kong Docs on Prometheus <https://docs.konghq.com/hub/kong-inc/prometheus>`.

Configuration
-------------

Configure the Prometheus receiver with Kong:

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

For the complete list of metrics provided by the integration, refer to :new-page:`Kong Docs on Prometheus <https://docs.konghq.com/hub/kong-inc/prometheus>`.

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
