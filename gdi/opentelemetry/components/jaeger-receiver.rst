.. _jaeger-receiver:

*************************
Jaeger receiver
*************************

.. meta::
      :description: The Jaeger receiver gathers trace data in Jaeger format.

The Jaeger receiver gathers trace data in Jaeger format. The supported pipeline type is ``traces``. See :ref:`otel-data-processing` for more information.

Get started
======================

.. note:: This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector. See :ref:`otel-configuration-ootb` for details. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Jaeger receiver as described in the next section.
3. Restart the Collector.

Sample configurations
--------------------------------

To activate the Jaeger receiver, add ``jaeger`` to the ``receivers`` section of your configuration file, as in the following sample configurations. By default, the Jaeger receiver doesn't serve any protocol. You must name a protocol under the ``protocols`` object to start the receiver. 

See :ref:`jaeger-receiver-settings` for more details.

.. code-block:: yaml


  receivers:
    jaeger:
      protocols:
        grpc:
    jaeger/withendpoint:
      protocols:
        grpc:
          endpoint: 0.0.0.0:14260

Supported protocols
-----------------------------------------------

The Jaeger receiver supports the following protocols: 

* ``grpc``. ``0.0.0.0:14250`` is the default endpoint.
* ``thrift_binary``. ``0.0.0.0:6832`` is the default endpoint.
* ``thrift_compact``. ``0.0.0.0:6831`` is the default endpoint.
* ``thrift_http``. ``0.0.0.0:14268`` is the default endpoint.

Optionally, you can configure an ``endpoint``.

Advanced configuration
-----------------------------------------------

Use the UDP protocols, currently ``thrift_binary`` and ``thrift_compact``, to set additional server options:

* ``queue_size``:  Sets the maximum of not yet handled requests for the server. ``1000`` by default.
* ``max_packet_size``: Sets the maximum UDP packet size. ``65_000`` by default.
* ``workers``: Sets the number of workers consuming the server queue. ``10`` by default.
* ``socket_buffer_size``: Sets the buffer size of the connection socket, in bytes. ``0`` by default (no buffer). 

For example:

.. code-block:: yaml


  protocols:
    thrift_binary:
      endpoint: 0.0.0.0:6832
      queue_size: 5_000
      max_packet_size: 131_072
      workers: 50
      socket_buffer_size: 8_388_608

Additional settings 
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Jaeger receiver uses helper files for additional capabilities:

* gRPC settings, including CORS. See more in GitHub at :new-page:`gRPC Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configgrpc/README.md>`
* TLS and mTLS settings. Learn more in GitHub at :new-page:`TLS Configuration Settings <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/configtls/README.md>`.

Remote sampling
-----------------------------------------------

Since version 0.61.0, remote sampling is no longer supported. Instead, since version 0.59.0, use the ``jaegerremotesapmpling`` extension for remote sampling.

.. _jaeger-receiver-settings:

Settings
======================

The following table shows the configuration options for the Jaeger receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/jaeger.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
