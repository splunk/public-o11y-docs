.. _collector-common-config-grcp:

*********************************************************************************
Configure gRCP 
*********************************************************************************

gRPC exposes a variety of settings you can adjust within individual receivers or exporters of the Collector. 

.. note:: 
   
   To configure transport, see :ref:`collector-common-config-net`.

Configure gRCP clients 
=============================================================================================

To configure gRCP clients in :ref:`exporters <otel-components-exporters>` use these settings:

* ``auth``. See :ref:`collector-common-config-auth`

* ``balancer_name`` 

  * Defaults: ``pick_first`` before version 0.103.0, ``round_robin`` for v0.103.0 or higher 

  * Learn more at gRCP's :new-page:`Load Balancing README https://github.com/grpc/grpc-go/blob/master/examples/features/load_balancing/README.md`. 

* ``compression`` 

  * Compression type valid values are ``gzip``, ``snappy``, ``zstd``, and ``none``

* ``endpoint``

  * For valid syntax see :new-page:`gRPC Name Resolution <https://github.com/grpc/grpc/blob/master/doc/naming.md>`.

* ``headers``

* ``keepalive`` 

* ``read_buffer_size``

* ``tls``. See :ref:`collector-common-config-tls`.

* ``write_buffer_size``

For example:

.. code-block:: yaml

   exporters:
      otlp:
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

Configure gRCP servers 
=============================================================================================

To configure gRCP servers in :ref:`collector receivers <otel-components-receivers>` use these settings:

* ``auth``. See :ref:`collector-common-config-auth`

* ``keepalive``

* ``max_concurrent_streams``

* ``max_recv_msg_size_mib``

* ``read_buffer_size``

* ``tls``. See :ref:`collector-common-config-tls`

* ``write_buffer_size``

Learn more
=============================================================================================

For more details on the available settings refer to: 

* :new-page:`gRPC Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configgrpc>` in OTel's GitHub repo
* :new-page:`Golang's gRCP documentation <https://pkg.go.dev/google.golang.org/grpc>`
