.. _otlp-receiver:

*******************************************
OTLP receiver
*******************************************

.. meta::
      :description: The OTLP receiver retrieves data through gRPC or HTTP using OTLP format.

The OTLP receiver obtains data via gRPC or HTTP using the OTLP format. The supported pipeline is ``logs``. See :ref:`otel-data-processing` for more information.

Read more about the OTLP format at the OTel repo :new-page:`OpenTelemetry Protocol Specification <https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md>`.

.. _get-started-otlp-receiver:

Get started
=================================================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. See :ref:`otel-install-platform`. 
2. Configure the OTLP receiver as described in the next section. 
3. Restart the Collector.

.. _otlp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the TCP receiver add ``otlp`` to the ``receivers`` section of your ``agent_config.yaml`` file, as in the following example configuration:

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

Several helper files are leveraged to provide additional capabilities automatically:

gRPC settings including CORS
HTTP settings
TLS and mTLS settings
Auth settings

Writing with HTTP/JSON
=================================================

The OTLP receiver can receive trace export calls via HTTP/JSON in addition to gRPC. The HTTP/JSON address is the same as gRPC as the protocol is recognized and processed accordingly. Note the serialization format needs to be protobuf JSON.

The HTTP/JSON configuration also provides traces_url_path, metrics_url_path, and logs_url_path configuration to allow the URL paths that signal data needs to be sent to be modified per signal type. These default to /v1/traces, /v1/metrics, and /v1/logs respectively.

To write traces with HTTP/JSON, POST to [address]/[traces_url_path] for traces, to [address]/[metrics_url_path] for metrics, to [address]/[logs_url_path] for logs. The default port is 4318. When using the otlphttpexporter peer to communicate with this component, use the traces_endpoint, metrics_endpoint, and logs_endpoint settings in the otlphttpexporter to set the proper URL to match the address and URL signal path on the otlpreceiver.

CORS (Cross-origin resource sharing)
-------------------------------------------------

The HTTP/JSON endpoint can also optionally configure CORS under cors:. Specify what origins (or wildcard patterns) to allow requests from as allowed_origins. To allow additional request headers outside of the default safelist, set allowed_headers. Browsers can be instructed to cache responses to preflight requests by setting max_age.

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
opentelemetry-collector/receiver/otlpreceiver/README.md at main · open-telemetry/opentelemetry-collector

.. _otlp-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the TCP receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/otlp.yaml"></div>


.. _troubleshoot-otlp-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst