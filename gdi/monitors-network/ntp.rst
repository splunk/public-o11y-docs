.. _ntp:

NTP server
==========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the NTP server monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
``ntp`` monitor type to retrieve clock offset from an NTP server. The
minimum interval is 30 minutes.

This receiver is available on Kubernetes, Linux, and Windows.

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
     smartagent/ntp:
       type: ntp
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/ntp]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the ntp
receiver:

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
      - Yes
      - ``string``
      - The host or IP address of the NTP server. For example,
         ``pool.ntp.org``.
   - 

      - ``port``
      - No
      - ``integer``
      - The port of the NTP server. Default is ``123``.
   - 

      - ``version``
      - No
      - ``integer``
      - NTP protocol version. Default is ``4``.
   - 

      - ``timeout``
      - No
      - ``int64``
      - Timeout in seconds for the request. Default is ``5s``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/ntp/metadata.yaml"></div>

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



