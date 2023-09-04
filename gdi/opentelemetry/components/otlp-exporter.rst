.. _otlp-exporter:

*************************
OTLP exporter
*************************

.. meta::
      :description: The OTLP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs through gRCP using the OTLP format. Read on to learn how to configure the component.

The OTLP exporter sends metrics, traces, and logs through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the OTLP receiver in all data pipelines to send metrics, traces, and logs. It's configured with the ``tls: insecure`` setting set to ``true``.

The following settings are required:

* ``endpoint``. Port to which the exporter is going to send OTLP data, using the gRPC protocol. 
  
  * gRPC supports DNS as the default name-system. To learn more about the valid name syntax, see :new-page:`gRCP Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>` in GitHub. 
  * If you're using a scheme of ``https``, then client transport security is enabled and overrides the ``insecure`` setting.

* ``tls``. See :ref:`TLS Configuration Settings <otlp-exporter-settings>` in this document for the full set of available options. 

  * Mutual TLS (mTLS) is also supported. See more at :new-page:`TLS/mTLS configuration <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md#tls--mtls-configuration>` in GitHub.

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

.. _otlp-exporter-settings:

Settings
======================

The following table shows the configuration options for the OTLP exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlp.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
