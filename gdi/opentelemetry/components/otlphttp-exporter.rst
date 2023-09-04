.. _otlphttp-exporter:

*************************
OTLP/HTTP exporter
*************************

.. meta::
      :description: The OTLP/HTTP exporter allows the OpenTelemetry Collector to send metrics and traces logs via HTTP using the OTLP format. Read on to learn how to configure the component.

The OTLP/HTTP exporter sends metrics and traces via HTTP using the OTLP format. 

This exporter is not included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector.

Get started
======================

The following settings are required:

* ``endpoint``. The target base URL to send data to, for example ``https://example.com:4318``. No default value. 

  * Each type of signal is added to this base URL. For example, for traces, ``https://example.com:4318/v1/traces``.

The following settings are optional:

* ``logs_endpoint``. The target URL to send log data to. 
  
  * For example, ``https://example.com:4318/v1/logs``.
  * If this setting is present, the endpoint setting is ignored for logs.

* ``metrics_endpoint``. The target URL to send metric data to. 
  
  * For example, ``https://example.com:4318/v1/metrics``.
  * If this setting is present, the endpoint setting is ignored for metrics.

* ``traces_endpoint``. The target URL to send trace data to. 
  
  * For example, ``https://example.com:4318/v1/traces``.
  * If this setting is present, the endpoint setting is ignored for traces.

* ``tls``. See :ref:`TLS Configuration Settings <otlphttp-exporter-settings>` in this document for the full set of available options. 

* ``timeout``. ``30s`` by default. HTTP request time limit. For details see :new-page:`https://golang.org/pkg/net/http/#Client`.

* ``read_buffer_size``. ``0`` by default. ReadBufferSize for HTTP client.

* ``write_buffer_size``. ``512 * 1024`` by default. WriteBufferSize for the HTTP client.

Sample configurations
--------------------------------

This is a sample configuration for the exporter:

.. code-block:: yaml

  exporters:
    otlphttp:
      endpoint: https://example.com:4318

Configure gzip compression
--------------------------------

By default, gzip compression is enabled. To disable it, use the following configuration:

.. code-block:: yaml

  exporters:
    otlphttp:
      ...
      compression: none

Detailed sample configuration
--------------------------------

This is a detailed configuration example:

.. code-block:: yaml

  endpoint: "https://1.2.3.4:1234"
  tls:
    ca_file: /var/lib/mycert.pem
    cert_file: certfile
    key_file: keyfile
    insecure: true
  timeout: 10s
  read_buffer_size: 123
  write_buffer_size: 345
  sending_queue:
    enabled: true
    num_consumers: 2
    queue_size: 10
  retry_on_failure:
    enabled: true
    initial_interval: 10s
    randomization_factor: 0.7
    multiplier: 1.3
    max_interval: 60s
    max_elapsed_time: 10m
  headers:
    "can you have a . here?": "F0000000-0000-0000-0000-000000000000"
    header1: 234
    another: "somevalue"
  compression: gzip

.. _otlphttp-exporter-settings:

Settings
======================

The following table shows the configuration options for the OTLP/HTTP exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlphttp.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
