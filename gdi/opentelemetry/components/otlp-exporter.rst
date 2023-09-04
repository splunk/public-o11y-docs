.. _otlp-exporter:

*************************
OTLP exporter
*************************

.. meta::
      :description: The OTLP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs through gRCP using the OTLP format. Read on to learn how to configure the component.

The OTLP exporter sends metrics, traces, and logs through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the OTLP receiver in all data pipelines to send metrics, traces, and logs. It's configured with the ``tls > insecure`` setting set to ``true``.

The following settings are required:

* ``endpoint``. host:port to which the exporter is going to send OTLP trace data, using the gRPC protocol. The valid syntax is described here. If a scheme of https is used then client transport security is enabled and overrides the insecure setting.
* ``tls``. See TLS Configuration Settings for the full set of available options.

Sample configurations
--------------------------------

This is a sample configuration for the exporter:

.. code-block:: yaml

  exporters:
    otlp:
      endpoint: otelcol2:4317
      tls:
        cert_file: file.cert
        key_file: file.key
    otlp/2:
      endpoint: otelcol2:4317
      tls:
        insecure: true

By default, gzip compression is enabled. See compression comparison for details benchmark information. To disable, configure as follows:

.. code-block:: yaml

  exporters:
    otlp:
      ...
      compression: none

Settings
======================

The following table shows the configuration options for the OTLP exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlp.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
