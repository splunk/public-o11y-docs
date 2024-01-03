.. _kong:

Kong Gateway
============

.. meta::
   :description: Use this Splunk Observability Cloud integration for Kong analytics. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Prometheus receiver <prometheus-receiver>`
to provide service traffic metrics using the `Kong metrics Prometheus endpoint <https://docs.konghq.com/hub/kong-inc/prometheus>`_,
which emits metrics for configurable request
and response lifecycle groups, including:

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

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Kong installation
~~~~~~~~~~~~~~~~~

Follow the `official Kong instructions <https://docs.konghq.com/hub/kong-inc/prometheus>`_ to expose the Prometheus metrics endpoint.

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

Please consult `the official Kong documentation <https://docs.konghq.com/hub/kong-inc/prometheus/>`_ for the list of available metrics.monitors/collectd/kong/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
