.. _telegraf-win-services:

Windows Services
================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf Win_services monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``telegraf/win_services`` monitor type to ingest metrics about Windows
services.

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

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
