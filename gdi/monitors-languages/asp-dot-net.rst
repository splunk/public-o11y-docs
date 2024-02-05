.. _asp-dot-net:

ASP.NET (deprecated)
====================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the ASP.NET app monitor. See benefits, install, configuration, and metrics

.. note:: This integration is deprecated and will be removed in February 2025. To forward data to Splunk Observability Cloud, use the Splunk Distribution of OpenTelemetry .NET. For a full list of collected metrics, refer to :ref:`dotnet-otel-metrics-attributes`. 

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
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

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-windows.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

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

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
