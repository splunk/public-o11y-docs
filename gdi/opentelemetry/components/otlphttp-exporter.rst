.. _otlphttp-exporter:

*************************
OTLP/HTTP exporter
*************************

.. meta::
      :description: The OTLP/HTTP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs via HTTP using the OTLP format. Read on to learn how to configure the component.

The OTLP/HTTP exporter sends metrics, traces, and logs through HTTP using the OTLP format (``application/x-protobuf`` content-type). The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

.. note:: For information on the OTLP exporter, see :ref:`otlp-exporter`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the exporter as described in the next section.
3. Restart the Collector.

The OTLP/HTTP exporter is not included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector. If you want to add it, the following settings are required:

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

To send traces and metrics to Splunk Observability Cloud using OTLP over HTTP, configure the ``metrics_endpoint`` and ``traces_endpoint`` settings to the REST API ingest endpoints. For example:

.. code-block:: yaml

   exporters:
     otlphttp:
        metrics_endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/datapoint/otlp"
        traces_endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace/otlp"
        compression: gzip
        headers:
          "X-SF-Token": "${SPLUNK_ACCESS_TOKEN}"

To complete the configuration, include the receiver in the required pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         exporters: [otlphttp]
       traces:
         exporters: [otlphttp]

Configuration examples
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


Configure gzip compression
--------------------------------

By default, gzip compression is turned on. To turn it off, use the following configuration:

.. code-block:: yaml


  exporters:
    otlphttp:
      ...
      compression: none

.. _otlphttp-exporter-settings:

Settings
======================

The following table shows the configuration options for the OTLP/HTTP exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlphttp.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
