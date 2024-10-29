.. _nodejs-3x-breaking-changes:

****************************
Node.js 3.0 breaking changes
****************************

.. meta::
  :description:

Default port and protocol changes
=================================

In the Node.js 3.x instrumentation, the default protocol changed from gRPC to http/protobuf.

If a custom configuration overrides the default endpoint setting, you must make sure of the following:

#. Verify that the Node.js agent configuration is correct:

   #. Verify that you are using the correct port for the selected protocol:

      * gRPC: 4317
      * http/protobuf: 4318

   #. Verify that the custom endpoint configuration uses the correct port. For example: ``otel.exporter.otlp.endpoint=http://<host>:4318``.

   #. Verify that the custom protocol configuration uses the correct protocol. For example: ``otel.exporter.otlp.protocol=http/protobuf``.

#. In the OTel Collector configuration file, verify that the associated OTLP receiver protocols match those used by the Java agent. Here is an example OTLP receiver configuration in the OTel Collector file:

   .. code-block:: yaml

      otlp:
        protocols:
          grpc:
            endpoint: "${SPLUNK_LISTEN_INTERFACE}:4317"
          http:
            endpoint: "${SPLUNK_LISTEN_INTERFACE}:4318"

.. _nodejs-3x-metric-names:

New metric names for version 3.x
======================================

.. _metrics-not-reported-nodejs:

Metrics no longer reported
---------------------------------------

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
