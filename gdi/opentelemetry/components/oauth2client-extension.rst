.. _oauth2client-extension:

*************************************
OAuth2 Client Auth extension
*************************************

.. meta::
      :description: This extension provides an OAuth2 Client Credentials flow authenticator for HTTP and gRPC based exporters. 

The ``oauth2client`` extension provides OAuth2 client credentials flow authentication for HTTP and gRPC based exporters. The extension automatically fetches and refreshes the token after it expires. 

For further details about the OAuth2 Client Credentials flow (2-legged workflow), refer to :new-page:`Client Credentials Grant <https://datatracker.ietf.org/doc/html/rfc6749#section-4.4>` in the OAuth 2.0 authorization framework specification.

For information about the available exporters, see :ref:`otel-components-exporters`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the extension as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the component, add ``oauth2client`` to the ``extensions`` section of your configuration file:

.. code-block:: yaml

  extensions:
    oauth2client:

To complete the configuration, include the extension in the ``service`` section of your configuration file:

.. code:: yaml

  service:
    extensions: [oauth2client]

.. Note:: Set the authenticator type to ``oauth2client`` in the exporter using the OAuth2 Client Auth extension. See :ref:`oauth2client-extension-example`.

Configuration settings
--------------------------------

The following settings are required to configure the extension:

* ``token_url``. The resource server's token endpoint URLs.

* ``client_id``. The client identifier issued to the client.

* ``client_id_file``. The file path to retrieve the client identifier issued to the client. The extension reads this file and updates the client ID when you need to issue a new token. 

  * This parameter allows you to dynamically change the client credentials by modifying the file contents when, for example, you need to rotate the token.
  
  * This setting takes precedence over ``client_id``.

* ``client_secret``. The secret string associated with the identifier.

* ``client_secret_file``. The file path to retrieve the secret string associated with the identifier. The extension reads this file and updates the client secret when you need to issue a new token. 

  * This paramater allows you to dynamically change the client credentials by modifying the file contents when, for example, you need to rotate the token.

  * This setting takes precedence over ``client_secret``.

* ``endpoint_params``. Additional parameters sent to the token endpoint.

* ``scopes``. Optional. Requested permissions associated to the client.

* ``timeout``. Optional. Specifies the timeout on the underlying client for the authorization server to fetch the tokens, both initially and while refreshing. 

  * If void, there is no timeout on the client.

For more information on the client side TLS settings, see :new-page:`TLS configuration settings <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls>` in GitHub. 

.. _oauth2client-extension-example:

Configuration example
--------------------------------

This is a configuration example for the extension:

.. code:: yaml

  extensions:
    oauth2client:
      client_id: someclientid
      client_secret: someclientsecret
      endpoint_params:
        audience: someaudience
      token_url: https://example.com/oauth2/default/v1/token
      scopes: ["api.metrics"]
      # tls settings for the token client
      tls:
        insecure: true
        ca_file: /var/lib/mycert.pem
        cert_file: certfile
        key_file: keyfile
      # timeout for the token client
      timeout: 2s
    
  receivers:
    hostmetrics:
      scrapers:
        memory:
    otlp:
      protocols:
        grpc:

  exporters:
    otlphttp/withauth:
      endpoint: http://localhost:9000
      auth:
        authenticator: oauth2client
      
    otlp/withauth:
      endpoint: 0.0.0.0:5000
      tls:
        ca_file: /tmp/certs/ca.pem
      auth:
        authenticator: oauth2client

  service:
    extensions: [oauth2client]
    pipelines:
      metrics:
        receivers: [hostmetrics]
        processors: []
        exporters: [otlphttp/withauth, otlp/withauth]

Settings
======================

The following table shows the configuration options for the ``oauth2client`` extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/oauth2client.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
