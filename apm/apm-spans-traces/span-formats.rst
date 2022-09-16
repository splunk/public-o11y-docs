.. _apm-supported-span-formats:

*****************************************
Compatible span formats for Splunk APM
*****************************************

.. meta::
   :description: Splunk APM supports a variety of span formats, depending on which agent, collector, or endpoint receives and exports trace data.

Splunk APM supports a variety of span formats, depending on which agent, collector, or endpoint receives and exports trace data. For more information about instrumenting applications for Splunk APM, see :ref:`instrument-applications`.

.. _apm-formats-otelcol:

Span formats compatible with the OpenTelemetry Collector
========================================================

The Splunk Distribution of the OpenTelemetry Collector can collect spans in the following format:

- Jaeger: gRPC and Thrift
- Zipkin v1, v2 JSON
- SAPM

To export data to Splunk Observability Cloud, use the following span formats:

- Jaeger: gRPC and Thrift
- Zipkin v1, v2 JSON
- SAPM

For more information on the Splunk Distribution of the OpenTelemetry Collector, see :ref:`otel-using`.

.. _apm-formats-trace-ingest:

Span formats compatible with the ingest endpoint
================================================

The ingest endpoint for Splunk Observability Cloud at ``https://ingest.REALM.signalfx.com/v2/trace`` can receive spans in the following formats:

* Jaeger Thrift with ``Content-Type:application/x-thrift``
* Zipkin v1, v2 with ``Content-Type:application/json``
* SAPM with ``Content-Type:application/x-protobuf``

In addition, the following endpoints are available:

* Jaeger Thrift at ``/v2/trace/jaegerthrift`` with ``Content-Type:application/x-thrift``
* OTLP at ``/v2/trace/otlp`` with ``Content-Type:application/x-protobuf``
* SAPM at ``/v2/trace/sapm`` with ``Content-Type:application/x-protobuf``
* Zipkin v1, v2 at ``/v2/trace/signalfxv1`` with ``Content-Type:application/json``

.. _apm-formats-smart-agent:

Span formats compatible with the Smart Agent
============================================

The Smart Agent can receive the following span formats with the ``signalfx-forwarder`` monitor:

- Jaeger: gRPC and Thrift
- Zipkin v1, v2 JSON

The Smart Agent can export the following span formats using the ``writer`` exporter:

- Zipkin v1, v2 JSON
- SAPM

To configure the Smart Agent for Splunk APM, see :ref:`smart-agent`.