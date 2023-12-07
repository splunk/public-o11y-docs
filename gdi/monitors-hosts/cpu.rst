.. _cpu:

CPU
===

.. meta::
   :description: Use this Splunk Observability Cloud integration for the CPU monitor. See benefits, install, configuration, and metrics

.. note:: If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect CPU utilization metrics, use the native OTel component :ref:`host-metrics-receiver`.

Configuration settings
----------------------

If you're still using this monitor with the Smart Agent (deprecated),
these are the configuration options:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``reportPerCPU``
      - no
      - ``bool``
      - If ``true``, stats are generated for the system as a whole as
         well as for each individual CPU/core in the system, and are
         distinguished by the ``cpu`` dimension. If ``false``, stats are
         only generated for the system as a whole, and don't include a
         ``cpu`` dimension. The default value is  ``false``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html

      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/cpu/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
