.. _collector-common-config-tls:

*********************************************************************************
Configure TLS
*********************************************************************************

Crypto TLS exposes a variety of settings you can adjust within individual receivers or exporters of the Collector. 

.. note:: Mutual TLS (mTLS) is also supported.

Configure TLS / mTLS 
=============================================================================================

By default, TLS is enabled: 

#. See the required and optional settings available
#. To complete the TLS/mTLS configuration, proceed to :ref:`collector-common-config-tls-client` or :ref:`collector-common-config-tls-server` 

Required settings
---------------------------------

The following settings are required:

* ``insecure``. ``false`` by default. Whether to enable client transport security for the exporter's HTTPs or gRPC connection. 

  * For gRCP, see :new-page:`Golang's grpc.WithInsecure() <https://pkg.go.dev/google.golang.org/grpc#WithInsecure>`.

* ``cert_file``. Use only if ``insecure`` is set to ``false``. Path to the TLS cert to use for TLS required connections. 

* ``cert_pem``. Alternative to ``cert_file``. Provide the certificate contents as a string instead of a filepath.

* ``key_file``. Use only if ``insecure`` is set to ``false``. Path to the TLS key to use for TLS required connections. 

* ``key_pem``: Alternative to ``key_file``. Provide the key contents as a string instead of a filepath.

Additional settings
---------------------------------

Certificate authority
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To define a certificate authority use:

* ``ca_file``.  Use only if ``insecure`` is set to ``false``. Path to the CA cert. 

  * For a client this verifies the server certificate. 
  
  * For a server this verifies client certificates. 
  
  * If empty it uses the system root CA. 

* ``ca_pem``. Alternative to ``ca_file``. Provide the CA cert contents as a string instead of a filepath.

To combine defining a certificate authority with the system certificate authorities use:

* ``include_system_ca_certs_pool``. ``false`` by default. Whether to load the system certificate authorities pool alongside the certificate authority.

Additionally you can configure TLS to be enabled but skip verifying the server's certificate chain. This cannot be combined with ``insecure`` since ``insecure`` won't use TLS at all.

* ``insecure_skip_verify``. ``false`` by default. Whether to skip verifying the certificate or not.

TLS version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. caution:: Avoid using TLS 1.0 and 1.1. Both are deprecated due to known vulnerabilities.

You can set minimum and maximum TLS versions:

* ``min_version``. "1.2" by default. Minimum acceptable TLS version.

  * Options: "1.0", "1.1", "1.2", "1.3"

* ``max_version``. "" by default. Maximum acceptable TLS version. 

  * Options: "1.0", "1.1", "1.2", "1.3"

Cipher suites
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can set explicit cipher suites using ``cipher_suites``. 

* ``[]`` by default. If left blank, a safe default list is used. 
* See the :new-page:`Cipher suites source files <https://go.dev/src/crypto/tls/cipher_suites.go>` for a list of supported cipher suites.

For example:

.. code-block:: yaml

  cipher_suites:
    - TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
    - TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
    - TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256

Reload certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Optionally you can reload certificates with ``reload_interval``, which specifies the duration after which the certificate will be reloaded. 

* If not set, certificates are never reloaded. 
* Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

.. _collector-common-config-tls-client:

Configure TLS clients 
=============================================================================================

To configure TLS clients in :ref:`exporters <otel-components-exporters>` use the settings in the previous section.

Optionally, you can also configure ``server_name_override``. 

* If set to a non-empty string, it will override the virtual host name of the authority in requests. 
* This is typically used for testing.

For example:

.. code-block:: yaml

  exporters:
    otlp:
      endpoint: myserver.local:55690
      tls:
        insecure: false
        ca_file: server.crt
        cert_file: client.crt
        key_file: client.key
        min_version: "1.1"
        max_version: "1.2"
    otlp/insecure:
      endpoint: myserver.local:55690
      tls:
        insecure: true
    otlp/secure_no_verify:
      endpoint: myserver.local:55690
      tls:
        insecure: false
        insecure_skip_verify: true

.. _collector-common-config-tls-server:

Configure TLS servers 
=============================================================================================

To configure TLS servers in :ref:`collector receivers <otel-components-receivers>` use the settings in the previous section.

Optionally, you can also configure:

* ``client_ca_file``. Path to the TLS cert to use by the server to verify a client certificate. This sets the ClientCAs and ClientAuth to ``RequireAndVerifyClientCert`` in the TLS configuration. Refer to :new-page:`https://godoc.org/crypto/tls#Config` for more information.

* ``client_ca_file_reload``. ``false`` by default. Reloads the ClientCAs file when it is modified.

.. note:: These are required for mTLS.

For example:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: mysite.local:55690
          tls:
            cert_file: server.crt
            key_file: server.key
    otlp/mtls:
      protocols:
        grpc:
          endpoint: mysite.local:55690
          tls:
            client_ca_file: client.pem
            cert_file: server.crt
            key_file: server.key
    otlp/notls:
      protocols:
        grpc:
          endpoint: mysite.local:55690

Learn more
=============================================================================================

For more details on the available settings refer to :new-page:`TLS Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls>` in OTel's GitHub repo.
