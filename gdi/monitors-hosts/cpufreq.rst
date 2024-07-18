.. _cpufreq:

CPUFreq
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Collectd cpufreq monitor. See benefits, install, configuration, and metrics

The :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
CPUFreq monitor type to monitor the clock speed of each CPU on a host.
This is useful for systems that vary the clock speed to save energy.

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

### Example

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/collectd/cpufreq:
       type: collectd/cpufreq
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/collectd/cpufreq]

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/cpufreq/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
