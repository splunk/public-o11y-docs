.. _otlp-receiver:

*******************************************
OTLP receiver
*******************************************

.. meta::
      :description: The OTLP receiver accepts OTLP formatted data over gRPC or HTTP.

The OTLP receiver allows the Collector to receive data via gRPC or HTTP using the OTLP format. The supported pipelines are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Read more about the OTLP format at the OTel repo :new-page:`OpenTelemetry Protocol Specification <https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md>`.

.. note:: For information on the OTLP exporter, see :ref:`otlp-exporter`.

.. _get-started-otlp-receiver:

Get started
=================================================

.. note:: The OTLP receiver is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector. See :ref:`otel-configuration-ootb`.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. See :ref:`otel-install-platform`. 
2. Configure the OTLP receiver as described in the next section. 
3. Restart the Collector.

.. _otlp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the OTLP receiver add ``otlp`` to the ``receivers`` section of your collector configuration file and include it in your desired pipelines, as in the following example configuration:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        grpc:
        http:

You can specify the ``endpoint``, the ``host:port`` to which the receiver is going to receive data. 

* ``endpoint`` defaults to ``0.0.0.0:4317`` for gRCP 
* ``endpoint`` defaults to ``0.0.0.0:4318`` for HTTP 

Read about valid syntax at :new-page:`gRPC Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>`.

Advanced configuration
-------------------------------------------------

Use the following helper files to provide additional capabilities automatically:

* :new-page:`gRPC settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configgrpc/README.md>` including CORS
* :new-page:`HTTP settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/confighttp/README.md>`
* :new-page:`TLS and mTLS settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md>`
* :new-page:`Auth settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configauth/README.md>`

Write with HTTP/JSON
=================================================

The OTLP receiver can receive trace export calls via HTTP/JSON in addition to gRPC. The HTTP/JSON address is the same as gRPC as the protocol is recognized and processed accordingly. Note the serialization format needs to be protobuf JSON. The default port is ``4318``. 

The HTTP/JSON configuration also provides ``traces_url_path``, ``metrics_url_path``, and ``logs_url_path`` configuration to allow the URL paths that signal data needs to be sent to be modified per signal type. These default to ``/v1/traces``, ``/v1/metrics``, and ``/v1/logs`` respectively.

To write traces with HTTP/JSON, POST to ``[address]/[traces_url_path]`` for traces, to ``[address]/[metrics_url_path]`` for metrics, or to ``[address]/[logs_url_path]`` for logs. 

Work with the OTLP HTTP exporter
-------------------------------------------------

When using the ``otlphttpexporter`` peer to communicate with this component, use the ``traces_endpoint``, ``metrics_endpoint``, and ``logs_endpoint`` settings in the ``otlphttpexporter`` to set the proper URL to match the address and URL signal path on the ``otlpreceiver``. 

See more at :ref:`otlphttp-exporter`.

Cross-origin resource sharing (CORS)
-------------------------------------------------

The HTTP/JSON endpoint can also optionally configure CORS under ``cors:``:

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