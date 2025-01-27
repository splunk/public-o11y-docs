.. _disk:

Disk and partition (deprecated)
====================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the disks monitor. See benefits, install, configuration, and metrics

.. caution:: This integration is deprecated. If you're using the Splunk Distribution of the OpenTelemetry Collector and want to collect disk I/O metrics, use the native OTel component :ref:`host-metrics-receiver`.

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

Troubleshooting
---------------



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



