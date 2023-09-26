.. _memory:

Memory usage
============

.. raw:: html

   <meta name="description" content="Use this Splunk Observability Cloud integration for the Memory monitor. See benefits, install, configuration, and metrics">

:literal:`{note} To collect memory utilization metrics only, use the native OTel component {ref}`host-metrics-receiver\`.`

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
Memory monitor type to send memory usage stats for the underlying host.

On Linux hosts, this monitor type relies on the ``/proc`` file system.
If the underlying host’s ``/proc`` file system is mounted somewhere
other than ``/proc``, set the path using the top-level configuration
``procPath``, as shown in the following example:

::

   procPath: /proc

This integration is only available on Kubernetes and Linux.

Benefits
--------

``{include} /_includes/benefits.md``

Installation
------------

``{include} /_includes/collector-installation-linux.md``

Configuration
-------------

``{include} /_includes/configuration.md``

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

::

   monitors:
     smartagent/collectd/memory: 
       type: collectd/memory
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

::

   service:
     pipelines:
       metrics:
         receivers: [smartagent/memory]

Metrics
-------

The following metrics are available for this integration:

.. container:: metrics-yaml

Notes
~~~~~

``{include} /_includes/metric-defs.md``

Troubleshooting
---------------

``{include} /_includes/troubleshooting.md``
