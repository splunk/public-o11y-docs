.. _collectd-uptime:

Collectd uptime
===============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Collectd Uptime monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``collectd/uptime`` monitor type to send a single metric of the total
number of seconds the host has been up, using the collectd uptime
plugin.

This integration is only available on Kubernetes and Linux.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/collectd/uptime:
       type: collectd/uptime
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/collectd/uptime]

Metrics
-------

The following metrics are available for this integration.

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/uptime/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
