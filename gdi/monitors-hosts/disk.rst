.. _disk:

Disk and partition
==================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the disks monitor. See benefits, install, configuration, and metrics

.. note:: If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect disk I/O metrics, use the native OTel component :ref:`host-metrics-receiver`.

Configuration settings
----------------------

If you're still using this monitor with the Smart Agent (deprecated),
these are the configuration options:

The following table shows the configuration options for this monitor:

.. list-table::
   :header-rows: 1

   - 

      - Option
      - Definition
      - Default value
   - 

      - Disk
      - Include specific Disk(s)
      - “sda” “/^hd/”
   - 

      - IgnoreSelected
      - Ignore the designation of specific Disks
      - ``false``

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/disk/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
