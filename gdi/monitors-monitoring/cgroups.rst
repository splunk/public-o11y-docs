.. _cgroups:

cgroups
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the cgroups monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
cgroups monitor type to report statistics about ``cgroups`` on Linux.
This receiver supports cgroups version 1, not the newer cgroups version
2 unified implementation.

This monitor is available on Linux.

For general information on cgroups, see the Linux control groups and
Linux Kernel documentation:

-  :new-page:`http://man7.org/linux/man-pages/man7/cgroups.7.html`

-  :new-page:`https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt`

For detailed information on ``cpu`` and ``memory`` cgroup metrics, see
the Red Hat guides:

-  :new-page:`https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-cpu`
   Note that the ``cpuacct`` cgroup is primarily an informational cgroup
   that gives detailed information on how long processes in a cgroup
   used the CPU.

-  :new-page:`https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory`

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

.. code:: yaml

   receivers:
     smartagent/cgroups: 
       type: cgroups
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/cgroups]

Filtering
~~~~~~~~~

You can limit the cgroups for which metrics are generated with the
``cgroups`` config option to the receiver.

For example, the following will only monitor Docker-generated cgroups:

.. code:: yaml

   receivers:
     smartagent/cgroups: 
       type: cgroups
       cgroups:
         "/docker/*"

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this receiver:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``cgroups``
      - no
      - ``list of strings``
      - The cgroup names to include or exclude, based on the full
         hierarchy path. This set can be overridden. If not provided,
         ``cgroups`` defaults to a list of all cgroups. For example, to
         monitor all Docker container cgroups, you could use a value of
         ``["/docker/*"]``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/cgroups/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
