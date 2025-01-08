.. _nodejs-3x-breaking-changes:

****************************
Node.js 3.0 breaking changes
****************************

.. meta::
  :description:

Update to Splunk OpenTelemetry JS version 3.0
==========================================================

To update your Splunk Distribution for OpenTelemetry JS agent to version 3.0, see :ref:`instrument-nodejs-application` and install the latest version of the Splunk OpenTelemetry JS agent.

Default port and protocol changes
=================================

In the Node.js 3.x instrumentation, the default protocol changed from gRPC to http/protobuf.

If a custom configuration overrides the default endpoint setting, you must make sure of the following:

#. Verify that the Node.js agent configuration is correct:

   #. Verify that you are using the correct port for the selected protocol:

      * gRPC: 4317
      * http/protobuf: 4318

   #. Verify that the custom endpoint configuration uses the correct port. For example: ``OTEL_EXPORTER_OTLP_ENDPOINT=http://<host>:4318``.

   #. Verify that the custom protocol configuration uses the correct protocol. For example: ``OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf``.

#. In the OTel Collector configuration file, verify that the associated OTLP receiver protocols match those used by the Node.js agent. Here is an example OTLP receiver configuration in the OTel Collector file:

   .. code-block:: yaml

      otlp:
        protocols:
          grpc:
            endpoint: "${SPLUNK_LISTEN_INTERFACE}:4317"
          http:
            endpoint: "${SPLUNK_LISTEN_INTERFACE}:4318"

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
