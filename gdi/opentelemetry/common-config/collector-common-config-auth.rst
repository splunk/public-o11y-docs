.. _collector-common-config-auth:

*********************************************************************************
Configure authentication 
*********************************************************************************

You can configure two types of authentication for the Collector:

* Server type authentication takes place in incoming HTTP/gRPC requests and is typically used by :ref:`receivers <otel-components-receivers>`. Server type authenticators include:

  * :ref:`Basic Auth extension <basic-auth-extension>`
  * Bearer Token extension
  * OIDC extension

* Client type authentication takes place in outgoing HTTP/gRPC requests and is typically used by :ref:`exporters <otel-components-exporters>`. Client type authenticators include:  

  * ASAP Client Authentication extension
  * :ref:`Basic Auth extension <basic-auth-extension>`
  * Bearer Token extension
  * :ref:`oauth2client-extension`
  * Sigv4 extension

.. note:: For more details see :new-page:`Auth Configuration Settings https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configauth` in OTel's GitHub repo.

Example
=============================================================================================

See the following example covering different auth options: 

.. code-block:: yaml

   extensions:
      oidc:
         # see the blog post on securing the otelcol for information
         # on how to setup an OIDC server and how to generate the TLS certs
         # required for this example
         # https://medium.com/opentelemetry/securing-your-opentelemetry-collector-1a4f9fa5bd6f
         issuer_url: http://localhost:8080/auth/realms/opentelemetry
         audience: account

   oauth2client:
      client_id: someclientid
      client_secret: someclientsecret
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
      otlp/with_auth:
         protocols:
            grpc:
               endpoint: localhost:4318
               tls:
                  cert_file: /tmp/certs/cert.pem
                  key_file: /tmp/certs/cert-key.pem
               auth:
                  ## oidc is the extension name to use as the authenticator for this receiver
                  authenticator: oidc

      otlphttp/withauth:
         endpoint: http://localhost:9000
         auth:
            authenticator: oauth2client



