.. _telegraf-ntpq:

NTPQ
====

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf NTPQ monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``net-io`` monitor type to retrieve metrics from NTPQ. This is an
embedded form of the Telegraf NTPQ plugin and requires the ``ntpq``
executable available on the path of the agent.

This monitor is available on Kubernetes, Linux, and Windows.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

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

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
