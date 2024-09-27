.. _net-io:

Network interface I/O
=====================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the net-io monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
``net-io`` monitor type to report I/O metrics about network interfaces.

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

.. code-block:: yaml

   receivers:
     smartagent/net-io:
       type: net-io
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
    pipelines:
      metrics:
        receivers: [net-io]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the ``net-io``
integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``interfaces``
      - no
      - ``list of strings``
      - The network interfaces to send metrics about. This is an
         :ref:`overridable set <filtering-smart-agent>`
         (**default:**
         ``[* !/^lo\d*$/ !/^docker.*/ !/^t(un|ap)\d*$/ !/^veth.*$/ !/^Loopback*/]``)

On Linux hosts, this monitor relies on the ``/proc`` filesystem. If the
underlying host's ``/proc`` file system is mounted somewhere other than
``/proc``, specify the path using the top-level configuration
``procPath``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/netio/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
