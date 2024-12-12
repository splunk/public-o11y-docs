.. _telegraf-win-services:

Windows Services 
================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf Win_services monitor. See benefits, install, configuration, and metrics

.. caution:: Smart Agent monitors are being deprecated. To collect Windows service data use the OpenTelemetry Collector and the :new-page:`Telegraf Windows Services Input plugin <https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_services>`. See how in :ref:`telegraf-generic`.

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
``telegraf/win_services`` monitor type to ingest metrics about Windows
services.

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

   <div class="include-start" id="collector-installation-windows.rst"></div>

.. include:: /_includes/collector-installation-windows.rst

.. raw:: html

   <div class="include-stop" id="collector-installation-windows.rst"></div>




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
     smartagent/win_services:
       type: telegraf/win_services # monitor all services

   service:
     pipelines:
       metrics:
         receivers: [smartagent/win_services]

To monitor a specific service, use the following configuration:

.. code:: yaml

   receivers:
     smartagent/win_services:
       type: telegraf/win_services 
       serviceNames:
            - exampleService1  # only monitor exampleService1

   service:
     pipelines:
       metrics:
         receivers: [smartagent/win_services]

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

      - ``serviceNames``
      - No
      - List of strings
      - Names of the services to monitor. If unspecified, all services
         will be monitored.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/winservices/metadata.yaml"></div>


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



