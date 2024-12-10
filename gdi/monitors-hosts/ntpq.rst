.. _telegraf-ntpq:

NTPQ
====

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf NTPQ monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``net-io`` monitor type to retrieve metrics from NTPQ. This is an embedded form of the Telegraf NTPQ plugin and requires the ``ntpq`` executable available on the path of the agent.

This monitor is available on Kubernetes, Linux, and Windows.

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

To activate this integration, add the following to your Collector
configuration:

.. code:: yaml

   receivers:
     smartagent/ntpq:
       type: telegraf/ntpq
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/ntpq]

Notes:

-  Include monitors with event-sending functionality in a ``logs``
   pipeline that contains an exporter that makes the event submission
   requests.
-  Use a resource detection processor to make host identity and other
   useful information available as event dimensions.

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``dnsLookup``
      - No
      - ``bool``
      - If set to ``false``, set the ``-n ntpq`` flag. Deactivating DNS
         lookups can reduce metric gather time. The default value is
         ``true``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/ntpq/metadata.yaml"></div>


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



