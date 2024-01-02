.. _otlp-receiver:

*******************************************
OTLP receiver
*******************************************

.. meta::
      :description: The OTLP receiver accepts OTLP formatted data over gRPC or HTTP.

The OTLP receiver allows the Collector to receive data over gRPC or HTTP using the OTLP format. The supported pipelines are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Read more about the OTLP format at the OTel repo :new-page:`OpenTelemetry Protocol Specification <https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md>`.

.. note:: For information on the OTLP exporter, see :ref:`otlp-exporter`.

.. _get-started-otlp-receiver:

Get started
=================================================

.. note:: This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector. See :ref:`otel-configuration-ootb` for details, such as the default ports for HTTP and gRCP requests. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. See :ref:`otel-install-platform`. 
2. Configure the OTLP receiver as described in the next section. 
3. Restart the Collector.

.. _otlp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the OTLP receiver add ``otlp`` to the ``receivers`` section of your collector configuration file, as in the following example configuration:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: "${HOST_LISTEN_INTERFACE}:1234"
        http:
          endpoint: "${HOST_LISTEN_INTERFACE}:5678"        

You can specify the ``endpoint``, or the ``host:port`` to which the receiver is going to receive data. 

* ``endpoint`` defaults to ``0.0.0.0:4317`` for gRCP 
* ``endpoint`` defaults to ``0.0.0.0:4318`` for HTTP 

Read about valid syntax at :new-page:`gRPC Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>`.

Next, add the receiver to the service pipelines section of your configuration file for the data types you want to receive, for example: 

.. code-block:: yaml

  service:
    pipelines:
      traces:
        receivers: [otlp]
      metrics:
        receivers: [otlp]

Advanced configuration
-------------------------------------------------

Use the following helper files to provide additional capabilities automatically:

* :new-page:`gRPC settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configgrpc/README.md>` including CORS
* :new-page:`HTTP settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/confighttp/README.md>`
* :new-page:`TLS and mTLS settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md>`
* :new-page:`Auth settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configauth/README.md>`

Protobuf payloads
=================================================

OTLP is implemented over gRPC and HTTP using a Protocol Buffers schema for the payloads. 

Protocol Buffers is an agnostic mechanism that serializes structured data. You can define how you want your data to be structured once, then you can use special generated source code to write and read your structured data using a variety of languages.

Learn more at :new-page:`Protocol Buffers documentation <https://protobuf.dev/overview/>`.

Work with OTLP/gRPC 
-------------------------------------------------

If you use gRPC, after establishing the underlying gRPC transport, the OTLP receiver will start to continoulsy receive requests with telemetry data, and needs to respond to each request. For more information, refer to the official OpenTelemetry documentation at :new-page:`OTLP/gRCP Specification <https://opentelemetry.io/docs/specs/otlp/#otlpgrcp>`. This includes details on requests, responses, and OTLP/gRPC throttling.

Work with OTLP/HTTP 
-------------------------------------------------

If you use HTTP, the Protobuf payloads can be encoded either in binary or JSON format. OTLP/HTTP uses HTTP ``POST`` requests to send telemetry data to the receiver. For more information, refer to the official OpenTelemetry documentation at :new-page:`OTLP/HTTP Specification <https://opentelemetry.io/docs/specs/otlp/#otlphttp>`. This includes details on encoding, requests, responses, and throttling.

The OTLP/HTTP configuration also provides ``traces_url_path``, ``metrics_url_path``, and ``logs_url_path`` configuration to allow the URL paths that signal data needs to be sent to be modified per signal type. These default to ``/v1/traces``, ``/v1/metrics``, and ``/v1/logs`` respectively.

To write traces with HTTP, POST to ``[address]/[traces_url_path]`` for traces, to ``[address]/[metrics_url_path]`` for metrics, or to ``[address]/[logs_url_path]`` for logs. 

Work with the OTLP/HTTP exporter
-------------------------------------------------

When using the ``otlphttpexporter`` peer to communicate with this component, use the ``traces_endpoint``, ``metrics_endpoint``, and ``logs_endpoint`` settings in the ``otlphttpexporter`` to set the proper URL to match the address and URL signal path on the ``otlpreceiver``. 

See more at :ref:`otlphttp-exporter`.

Use Cross-origin resource sharing (CORS)
-------------------------------------------------

The HTTP endpoint can also optionally configure CORS under ``cors:``:

* Use ``allowed_origins`` to specify what origins (or wildcard patterns) to allow requests from. 
* Set ``allowed_headers`` to allow additional request headers outside of the default safelist. 
* Set ``max_age`` to instruct browsers to cache responses to preflight requests.

Learn more at :new-page:`https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS`.

See the following sample config:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        http:
          endpoint: "localhost:4318"
          cors:
            allowed_origins:
              - http://test.com
              # Origins can have wildcards with *, use * by itself to match any origin.
              - https://*.example.com
            allowed_headers:
              - Example-Header
            max_age: 7200

.. _otlp-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the OTLP receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/otlp.yaml"></div>


.. _troubleshoot-otlp-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst