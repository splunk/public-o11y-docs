.. _collector-common-config-http:

*********************************************************************************
Configure HTTP
*********************************************************************************

HTTP exposes a variety of settings you can adjust within individual receivers or exporters of the Collector. 

Configure HTTP clients 
=============================================================================================

To configure HTTP clients in :ref:`exporters <otel-components-exporters>` use these settings:

.. note:: Client configuration supports TLS. For more information, see :ref:`collector-common-config-tls`.

* ``endpoint``. Address and port for this connection

* ``tls``. See :ref:`collector-common-config-tls`

* ``headers``. Name-value pairs added to the HTTP request headers

  * Certain headers such as Content-Length and Connection are automatically written when needed. 

  * The ``Host`` header is automatically derived from the endpoint value. However, this automatic assignment can be overridden by explicitly setting the ``Host`` field in the ``headers`` field.

  * If the ``Host`` header is provided then it overrides ``Host`` field in ``Request``. For more information see :new-page:`Go's Request <https://pkg.go.dev/net/http#Request>`.

* ``read_buffer_size``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``timeout``

  * For more information see :new-page:`Go's Client <https://pkg.go.dev/net/http#Client>`.

* ``write_buffer_size``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``compression``. Compression type to use

  * Compression type valid values are ``deflate``, ``gzip``, ``snappy``, ``zlib``, ``zstd``, and ``none``.

  * If compression is set to ``none``,  all data is treated as uncompressed, and any other inputs cause an error.

* ``max_idle_conns``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``max_idle_conns_per_host``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``max_conns_per_host``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.
  
* ``idle_conn_timeout``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``auth``. See :ref:`collector-common-config-auth`

* ``disable_keep_alives``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``http2_read_idle_timeout``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``http2_ping_timeout``

  * For more information see :new-page:`Go's Transport <https://pkg.go.dev/net/http#Transport>`.

* ``cookies``

  * [``enabled``]. If enabled, the client stores cookies from server responses and reuse them in subsequent requests.

  * For more information see :new-page:`Go's CookieJar type <https://pkg.go.dev/net/http#CookieJar>` documentation.
  
For example:

.. code-block:: yaml

  exporter:
    otlphttp:
      endpoint: otelcol2:55690
      auth:
        authenticator: some-authenticator-extension
      tls:
        ca_file: ca.pem
        cert_file: cert.pem
        key_file: key.pem
      headers:
        test1: "value1"
        "test 2": "value 2"
      compression: zstd
      cookies:
        enabled: true

Configure HTTP servers 
=============================================================================================

To configure HTTP servers in :ref:`collector receivers <otel-components-receivers>` use these settings:

* ``cors``. Configure CORS to allow the receiver to accept traces from web browsers, even if the receiver is hosted at a different origin 

  * If left blank or set to ``null``, CORS is not enabled.

  * See the list of :new-page:`CORS parameters <https://github.com/rs/cors#parameters>`. 

    * ``allowed_origins``. List of origins allowed to send requests to the receiver. An origin may contain a wildcard ``*`` to replace 0 or more characters. To allow any origin, set ``["*"]``. If no origins are listed, CORS will not be enabled.

    * ``allowed_headers``. Allow CORS requests to include headers outside the :new-page:`default safelist <https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header>`. By default, safelist headers and X-Requested-With are allowed. To allow any request header, set to ``["*"]``.

    * ``max_age``. Sets the value of the ``Access-Control-Max-Age`` header, allowing clients to cache the response to CORS preflight requests. If not set, browsers use a default of 5 seconds. See more at :new-page:`Access-Control-Max-Age <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age>`.

* ``endpoint``

  * For valid syntax see :new-page:`gRPC Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>`.

* ``max_request_body_size``. ``20971520`` (20MiB) by default. Configures the maximum allowed body size in bytes for a single request

* ``compression_algorithms`` 

* ``tls``. See :ref:`collector-common-config-tls`

* ``auth``. See :ref:`collector-common-config-auth`

  * ``request_params``. List of query parameter names to add to the auth context, along with the HTTP headers.

.. note:: You can enable the :ref:`attributes-processor` to append any http header using a custom key. You also need to enable ``"include_metadata"``.

For example:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        http:
          include_metadata: true
          auth:
            request_params:
            - token
            authenticator: some-authenticator-extension
          cors:
            allowed_origins:
              - https://foo.bar.com
              - https://*.test.com
            allowed_headers:
              - Example-Header
            max_age: 7200
          endpoint: 0.0.0.0:55690
          compression_algorithms: ["", "gzip"]

  processors:
    attributes:
      actions:
        - key: http.client_ip
          from_context: X-Forwarded-For
          action: upsert

Learn more
=============================================================================================

For more details on the available settings refer to :new-page:`HTTP Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/confighttp>` in OTel's GitHub repo.
