.. _logstash:

Logstash
========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Logstash monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``logstash`` monitor type to monitor the health and performance of Logstash deployments through Logstash Monitoring APIs.

Installation
------------



.. raw:: html

   <div class="include-start" id="collector-installation.rst"></div>

.. include:: /_includes/collector-installation.rst

.. raw:: html

   <div class="include-stop" id="collector-installation.rst"></div>




Configuration
-------------



.. raw:: html

   <div class="include-start" id="configuration.rst"></div>

.. include:: /_includes/configuration.rst

.. raw:: html

   <div class="include-stop" id="configuration.rst"></div>




Example
~~~~~~~

To activate this monitor in the Splunk Distribution of OpenTelemetry
Collector, add the following to your agent configuration:

.. code-block:: yaml

    receivers:
      smartagent/logstash:
        type: logstash
          ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/logstash]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor
type:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``host``
      - no
      - ``string``
      - The host name of the Logstash monitoring API. The default value
         is ``127.0.0.1``.
   - 

      - ``port``
      - no
      - ``integer``
      - The port number of Logstash monitoring API. The default value is
         ``9600``.
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If true, the agent connects to the host using HTTPS instead of
         HTTP. The default value is ``false``.
   - 

      - ``timeoutSeconds``
      - no
      - ``integer``
      - The maximum amount of time to wait for API requests, in seconds.
         The default value is ``5``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html

   <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/logstash/logstash/metadata.yaml"></div>

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



