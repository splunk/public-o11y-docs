.. _otlp-exporter:

*************************
OTLP exporter
*************************

.. meta::
      :description: The OTLP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs through gRPC using the OTLP format. Read on to learn how to configure the component.

The OTLP exporter sends metrics, traces, and logs through gRPC using the OTLP format. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information. By default, this exporter requires TLS and provides queued retry capabilities. 

To send OTLP data through HTTP, use the OTLP/HTTP exporter. Learn how at :ref:`otlphttp-exporter`. 

If you need to bypass the Collector and send data in the OTLP format directly to Splunk Observability Cloud:

* To send metrics, use the OTLP endpoint. Find out more in the dev portal at :new-page:`Sending data points <https://dev.splunk.com/observability/docs/datamodel/ingest>`. Note that this option only accepts protobuf payloads.   
  
* To send traces, use the gRCP endpoint. For more information, see :ref:`grpc-data-ingest`.

Read more about the OTLP format at the OTel repo :new-page:`OpenTelemetry Protocol Specification <https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md>`.

.. note:: For information on the OTLP receiver, see :ref:`otlp-receiver`.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector when deploying in data forwarding (gateway) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-kubernetes-config`, :ref:`linux-config-ootb`, or :ref:`windows-config-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the exporter as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the component, add ``otlp`` to the ``exporters`` section of your configuration file:

.. code-block:: yaml

  exporters:
    otlp:

The OTLP exporter is included in the Splunk Distribution of OpenTelemetry Collector default configuration in all data pipelines: ``metrics``, ``traces``, and ``logs``. 

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        processors: [otlp]
      logs:
        processors: [otlp]
      traces:
        processors: [otlp]

The following settings are required:

* ``endpoint``. Address to which the exporter is going to send OTLP data, using the gRPC protocol. 
  
  * No default value. 
  * gRPC supports DNS as the default name-system. To learn more about the valid name syntax, see :new-page:`gRCP Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>` in GitHub. 
  * If you're using a scheme of ``https``, then client transport security is enabled and overrides the ``insecure`` setting.

* ``tls``. See :ref:`TLS Configuration Settings <otlp-exporter-settings>` in this document for the full set of available options. 

  * By default, ``tls: insecure`` is set to ``true``. 
  * Mutual TLS (mTLS) is also supported. See more at :new-page:`TLS/mTLS configuration <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md#tls--mtls-configuration>` in GitHub.

Configuration examples
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
