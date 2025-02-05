.. _asp-dot-net:

ASP.NET (deprecated)
====================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the ASP.NET app monitor. See benefits, install, configuration, and metrics

.. caution:: 
   
   This integration is deprecated and reached End of Support in February 2025. It was removed from the Splunk Distribution of the OpenTelemetry Collector starting from version v0.118.0.

   To forward data from a .NET application to Splunk Observability Cloud use the :ref:`Splunk Distribution of OpenTelemetry .NET <get-started-dotnet-otel>` instead. 

   To monitor Windows Performance Counters with native OpenTelemetry refer to :ref:`windowsperfcounters-receiver`.

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
``aspdotnet`` monitor type to retrieve metrics for requests, errors,
sessions, and worker processes from ASP.NET applications.

This integration reports the instantaneous values of Windows Performance
Counters, which are the source of the retrieved metrics. Most of the
performance counters in this monitor are gauges that represent rates per
second and percentages. Between collection intervals, spikes might occur
in the Performance Counters. To mitigate the effect of these spikes,
decrease the reporting interval on the monitor so that it collects more
frequently.

This integration is only available on Windows.

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

.. code-block:: yaml

   receivers:
     smartagent/aspdotnet:
       type: aspdotnet
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/aspdotnet]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 9 5 3 55
   :header-rows: 1

   - 

      - **Option**
      - **Required**
      - **Type**
      - **Description**
   - 

      - ``counterRefreshInterval``
      - no
      - ``int64``
      - This integer is the number of seconds that wildcards in counter
         paths should be expanded and how often to refresh counters from
         configuration. The default is ``60s``.
   - 

      - ``printValid``
      - no
      - ``bool``
      - Use this flag to print out the configurations that match
         available performance counters. Use the flag for debugging. The
         default is ``false``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/aspdotnet/metadata.yaml"></div>


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



