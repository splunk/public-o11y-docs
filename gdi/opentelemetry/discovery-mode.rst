.. _discovery_mode:

***************************************************************************
Discovery mode of the Splunk Distribution of OpenTelemetry Collector
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to automatically detect metric sources and collect metrics automatically.

.. note:: Discovery mode is available in the Splunk Distribution of OpenTelemetry Collector version 0.72.0 and higher.

How to activate discovery mode
====================================

 - the --discovery argument
 - Instantiates a discovery receiver in preflight
 - - Discovery mode spins observers for your bundle.d config (default)
- Gets metrics
- Way more efficient than  using receiver creator

HAPPY PATH: Better guidance for observers > Dry-run first > Modify your service.discovery.yaml config

Manual configuration (config.d)
====================================

Path will /etc/otel/collector/config.d > discovery.yaml configs!
    Just the fields they want to override with full path
Or use --set command
    - Dry-run option writes config it would have used >> ONLY USE CASE AND THEN PASTE TO CONFIG.D
