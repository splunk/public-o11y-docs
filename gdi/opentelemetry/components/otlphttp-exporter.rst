.. _otlphttp-exporter:

*************************
OTLP/HTTP exporter
*************************

.. meta::
      :description: The OTLP/HTTP exporter allows the OpenTelemetry Collector to send metrics, traces, and logs via HTTP using the OTLP format. Read on to learn how to configure the component.

.. note:: Use the OTLP/HTTP exporter as the default method to send traces to Splunk Observability Cloud.

The OTLP/HTTP exporter sends metrics, traces, and logs through HTTP using the OTLP format. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

You can also use the OTLP exporter for advanced options to send data using gRPC protocol. See more at :ref:`otlp-exporter`.

Read more about the OTLP format at the OTel repo :new-page:`OpenTelemetry Protocol Specification <https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md>`.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector to send traces to Splunk Observability Cloud when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-kubernetes-config`, :ref:`linux-config-ootb`, or :ref:`windows-config-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the exporter as described in the next section.
3. Restart the Collector.

Configuration options
--------------------------------

The following settings are required:

* ``traces_endpoint``. The target URL to send trace data to. ``https://ingest.<realm>.signalfx.com/v2/trace/otlp`` for Splunk Observability Cloud.

The following settings are optional and can be added to the configuration for more advanced use cases:

* ``logs_endpoint``. The target URL to send log data to. For example, ``https://example.com:4318/v1/logs``.

* ``metrics_endpoint``. The target URL to send metric data to. For example, ``"https://ingest.us0.signalfx.com/v2/trace/otlp"`` to send metrics to Splunk Observability Cloud.

* ``tls``. See :ref:`TLS Configuration Settings <otlphttp-exporter-settings>` in this document for the full set of available options. Only applicable for sending data to a custom endpoint.

* ``timeout``. ``30s`` by default. HTTP request time limit. For details see :new-page:`https://golang.org/pkg/net/http/#Client`.

* ``read_buffer_size``. ``0`` by default. ReadBufferSize for HTTP client.

* ``write_buffer_size``. ``512 * 1024`` by default. WriteBufferSize for the HTTP client.

Sample configuration
--------------------------------

To send traces and metrics to Splunk Observability Cloud using OTLP over HTTP, configure the ``metrics_endpoint`` and ``traces_endpoint`` settings to the REST API ingest endpoints. For example:

.. code-block:: yaml

  exporters:
    otlphttp:
      # The target URL to send trace data to. By default it's set to ``https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace/otlp``.
      traces_endpoint: https://ingest.<realm>.signalfx.com/v2/trace/otlp
      # Set of HTTP headers added to every request.
      headers:
        # X-SF-Token is the authentication token provided by Splunk Observability Cloud.
        X-SF-Token: <access_token>

To complete the configuration, include the exporter in the required pipeline of the ``service`` section of your
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
  traces_endpoint: https://ingest.us0.signalfx.com/v2/trace/otlp
  metrics_endpoint: https://ingest.us0.signalfx.com/v2/datapoint/otlp
  headers:
    X-SF-Token: <access_token>
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
  compression: gzip

Configure gzip compression
--------------------------------

By default, gzip compression is turned on. To turn it off use the following configuration:

.. code-block:: yaml

  exporters:
    otlphttp:
      ...
      compression: none


Associate passthroughs to an access token
------------------------------------------

The setting ``access_token_passthrough`` from the :ref:`splunk-apm-exporter` in no longer available.

To associate datapoints with an organization access token, make sure of the following:

* ``include_metadata`` is set to ``true`` in your ``otlp`` configuration
* ``X-SF-Token`` is configured in the :ref:`batch-processor`

For example:

.. code-block:: yaml

  extensions:
    headers_setter:
      headers:
        - action: insert
          key: X-SF-TOKEN
          from_context: X-SF-TOKEN

  receivers:
    otlp:
      protocols:
        http:
          include_metadata: true

  processors:
    batch:
      metadata_keys:
      - X-SF-Token

  exporters:
    otlphttp:
      metrics_endpoint: https://ingest.lab0.signalfx.com/v2/datapoint/otlp
      traces_endpoint: https://ingest.lab0.signalfx.com/v2/trace/otlp
      headers:
          "X-SF-Token": "mytoken"
      auth:
        authenticator: headers_setter

.. _otlphttp-exporter-settings:

Settings
======================

The following table shows the configuration options for the OTLP/HTTP exporter:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/otlphttp.yaml"></div>


Troubleshooting
======================

.. raw:: html

  <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

  <div class="include-stop" id="troubleshooting-components.rst"></div>



