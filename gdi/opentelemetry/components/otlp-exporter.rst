.. _otlp-exporter:

*************************
OTLP exporter
*************************

.. meta::
      :description: The OTLP exporter allows the OpenTelemetry Collector to send metrics and traces through gRCP using the OTLP format. Read on to learn how to configure the component.

The OTLP exporter sends metrics and traces through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 

Get started
======================



Sample configurations
----------------------



.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]
       logs:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]





Settings
======================

The following table shows the configuration options for the SignalFx exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/signalfx.yaml"></div>



Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
