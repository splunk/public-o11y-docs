.. _apm-supported-span-formats:

*****************************************
Compatible span formats for Splunk APM
*****************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn about the variety of span formats in Splunk APM.

Splunk APM supports a variety of span formats, depending on which agent, collector, or endpoint receives and exports trace data. For more information about instrumenting applications for Splunk APM, see :ref:`instrument-applications`.

For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`. 

.. _apm-formats-otelcol:

Span formats compatible with the OpenTelemetry Collector
================================================================

The Splunk Distribution of the OpenTelemetry Collector can collect spans in the following format:

- Jaeger: gRPC and Thrift
- Zipkin v1, v2 JSON
- Splunk APM Protocol (SAPM)
- OpenTelemetry Protocol (OTLP)

The following examples show how to configure receivers in the Collector's configuration file. You can use multiple receivers according to your needs.

.. tabs::

   .. code-tab:: yaml Jaeger Thrift

      # To receive spans in Jaeger Thrift format

      receivers:
         jaeger:
            protocols:
               grpc:
                  endpoint: 0.0.0.0:14250
               thrift_binary:
                  endpoint: 0.0.0.0:6832
               thrift_compact:
                  endpoint: 0.0.0.0:6831
               thrift_http:
                  endpoint: 0.0.0.0:14268

   .. code-tab:: yaml Zipkin

      # To receive spans in Zipkin format

      receivers:
         zipkin:
            endpoint: 0.0.0.0:9411

   .. code-tab:: yaml SAPM

      # To receive spans in SAPM format

      receivers:
         sapm:
            endpoint: 0.0.0.0:7276

   .. code-tab:: yaml OTLP

      # To receive spans in OTLP format

      receivers:
         otlp:
            protocols:
               grpc:
                  endpoint: 0.0.0.0:4317
               http:
                  endpoint: 0.0.0.0:4318            

See :ref:`otel-configuration` for more information on Collector configuration.

.. _apm-formats-trace-ingest:

Span formats compatible with the ingest endpoint
=========================================================

If you can't use or need to bypass the Splunk OpenTelemetry Collector, you can send your span data directly to the ingest API endpoints of Observability Cloud.

The ingest endpoint for Splunk Observability Cloud at ``https://ingest.<realm>.signalfx.com/v2/trace`` can receive spans directly in the following formats:

* OTLP at ``/v2/trace/otlp`` with ``Content-Type:application/x-protobuf``
* Jaeger Thrift with ``Content-Type:application/x-thrift``
* Zipkin v1, v2 with ``Content-Type:application/json``
* SAPM with ``Content-Type:application/x-protobuf``

In addition, the following endpoints are available:

* OTLP at ``/v2/trace/otlp`` with ``Content-Type:application/x-protobuf``
* Jaeger Thrift at ``/v2/trace/jaegerthrift`` with ``Content-Type:application/x-thrift``
* Zipkin v1, v2 at ``/v2/trace/signalfxv1`` with ``Content-Type:application/json``
* SAPM at ``/v2/trace/sapm`` with ``Content-Type:application/x-protobuf``

For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`. 

.. note:: You can also send trace data in OTLP format directly to Observability Cloud using the gRPC endpoint, either directly or from an OpenTelemetry Collector. See :ref:`grpc-data-ingest`.

.. _apm-formats-smart-agent:

Span formats compatible with the Smart Agent (deprecated)
============================================================

The Smart Agent can receive the following span formats with the ``signalfx-forwarder`` monitor:

- Jaeger: gRPC and Thrift
- Zipkin v1, v2 JSON

The Smart Agent can export the following span formats using the ``writer`` exporter:

- Zipkin v1, v2 JSON
- SAPM

To configure the Smart Agent for Splunk APM, see :ref:`smart-agent`.
