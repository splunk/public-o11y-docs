.. _otlp-exporter:

*************************
OTLP exporter
*************************

.. meta::
      :description: The OTLP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs through gRPC using the OTLP format. Read on to learn how to configure the component.

The OTLP exporter sends metrics, traces, and logs through gRPC using the OTLP format. See :ref:`otel-data-processing` for more information. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. By default, this exporter requires TLS and provides queued retry capabilities.

.. note:: For information on the OTLP/HTTP exporter, see :ref:`otlphttp-exporter`.

Get started
======================

The OTLP exporter is included in the Splunk Distribution of OpenTelemetry Collector default configuration in host monitoring (agent) mode for all data pipelines: ``metrics``, ``traces``, and ``logs``. Learn more in :ref:`otel-configuration-ootb` and :ref:`otel-deployment-mode`.

The following settings are required:

* ``endpoint``. Address to which the exporter is going to send OTLP data, using the gRPC protocol. 
  
  * No default value. 
  * gRPC supports DNS as the default name-system. To learn more about the valid name syntax, see :new-page:`gRCP Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>` in GitHub. 
  * If you're using a scheme of ``https``, then client transport security is enabled and overrides the ``insecure`` setting.

* ``tls``. See :ref:`TLS Configuration Settings <otlp-exporter-settings>` in this document for the full set of available options. 

  * By default, ``tls: insecure`` is set to ``true``. 
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

Configure gzip compression
--------------------------------

By default, gzip compression is enabled. To turn it off, use the following configuration:

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
