.. _otlphttp-exporter:

*************************
OTLP/HTTP exporter
*************************

.. meta::
      :description: The OTLP/HTTP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs through gRCP using the OTLP format. Read on to learn how to configure the component.

The OTLP/HTTP exporter sends metrics, traces, and logs through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 

Get started
======================



.. _otlphttp-exporter-settings:

Settings
======================

The following table shows the configuration options for the OTLP/HTTP exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlphttp.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
