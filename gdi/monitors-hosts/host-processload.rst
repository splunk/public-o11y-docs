.. _load:

Host process load (deprecated)
=================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the load monitor. See benefits, install, configuration, and metrics

.. note:: This integration is deprecated. If you're using the Splunk Distribution of the OpenTelemetry Collector and want to collect CPU load metrics, use the native OTel component :ref:`host-metrics-receiver`.

Configuration options
---------------------

The following table shows the configuration options for this monitor
type:

.. list-table::
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``perCPU``
      - no
      - ``bool``
      - The default value is ``false``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/load/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
