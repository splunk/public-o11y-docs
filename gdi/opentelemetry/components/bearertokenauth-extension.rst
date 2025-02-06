.. _bearertokenauth-extension:

********************************************
Authenticator - Bearer extension
********************************************

.. meta::
      :description: Implements both ``configauth.ServerAuthenticator`` and ``configauth.ClientAuthenticator``. It can be used in both http and gRPC exporters inside the ``auth`` settings to embed a static token for every RPC call made. 

The ``bearertokenauth`` extension implements both ``configauth.ServerAuthenticator`` and ``configauth.ClientAuthenticator``. It can be used in both http and gRPC exporters inside the ``auth`` settings to embed a static token for every RPC call made.

The following is required:

* You need to set the authenticator type to ``bearertokenauth``.

* You need to enable transport layer security on the exporter.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``bearertokenauth`` extension as described in the next section.
3. Restart the Collector.

Configuration options
--------------------------------------------

The following configuration options are available:

* ``filename``. Name of file that contains the authorization token sent in every client call.

* ``token``. Static authorization token sent on every gRPC client call as metadata. The value of the token is prepended by ``${scheme}`` before being sent as a value of the authorization key in the request header (for HTTP) and metadata (for gRPC).

.. note:: Either ``filename`` or ``token`` are required. If both are specified, then the ``token`` field value is ignored. 

Optionally, you can also configure:

* ``scheme``. ``Bearer`` by default. Specifies the auth scheme name. 

Sample configuration
--------------------------------------------

To activate the component add ``bearertokenauth`` to the ``extensions`` section of your configuration file and include the extension in any pipeline of the ``service`` section. For example:

.. code:: yaml

  extensions:
    bearertokenauth:
      token: "somerandomtoken"
      filename: "file-containing.token"
    bearertokenauth/withscheme:
      scheme: "Bearer"
      token: "randomtoken"

  receivers:
    hostmetrics:
      scrapers:
        memory:
    otlp:
      protocols:
        grpc:

  exporters:
    otlp/withauth:
      endpoint: 0.0.0.0:5000
      ca_file: /tmp/certs/ca.pem
      auth:
        authenticator: bearertokenauth

    otlphttp/withauth:
      endpoint: http://localhost:9000
      auth:
        authenticator: bearertokenauth/withscheme

  service:
    extensions: [bearertokenauth, bearertokenauth/withscheme]
    pipelines:
      metrics:
        receivers: [hostmetrics]
        processors: []
        exporters: [otlp/withauth, otlphttp/withauth]

.. _bearertokenauth-extension-settings:

Settings
======================

The following table shows the configuration options for the extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/bearertokenauth.yaml"></div>


Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>


