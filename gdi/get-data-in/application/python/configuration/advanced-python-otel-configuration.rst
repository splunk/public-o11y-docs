.. _advanced-python-otel-configuration:

********************************************************************
Configure the Python agent for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Configure the agent of the Splunk Distribution of OpenTelemetry Python to suit most of your instrumentation needs, like correlating traces with logs, activating exporters, and more.

You can configure the Python agent from the Splunk Distribution of OpenTelemetry Python to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

The following sections describe all available settings for configuring the Python agent, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry Python.

.. _main-python-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry Python:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Not required unless you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`.
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - Activates the addition of server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-python`. The default value is ``true``.

.. _trace-configuration-python:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_TRACE_ENABLED``
     - Activates tracer creation and autoinstrumentation. The default value is ``true``.
   * - ``OTEL_SERVICE_NAME``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in the ``OTEL_RESOURCE_ATTRIBUTES`` variable.
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Comma-separated list of resource attributes added to every reported span. For example, ``key1=val1,key2=val2``. 
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per span. The default value is unlimited.
   * - ``OTEL_EVENT_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per event. The default value is unlimited.
   * - ``OTEL_LINK_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per link. The default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Maximum number of events per span. The default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Maximum number of links per span. The default value is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. The default value is ``1200``.

.. _trace-exporters-settings-python:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - Trace exporter to use. You can set multiple comma-separated values (for example, ``otlp,console``). The default value is ``otlp``. To select the Jaeger exporter, use ``jaeger-thrift-splunk``.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - The OTLP endpoint. The default value is ``http://localhost:4317``.
   * - ``OTEL_EXPORTER_JAEGER_ENDPOINT``
     - The Jaeger endpoint. The default value is ``http://localhost:9080/v1/trace``.

The Splunk Distribution of OpenTelemetry Python uses the OTLP gRPC span exporter by default. If you're still using the Smart Agent (now deprecated), or if you want to send traces directly to the Splunk Observability Cloud ingest endpoint, use the Jaeger exporter.

.. _trace-propagation-configuration-python:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators you want to use. The default value is ``tracecontext,baggage``. You can find the list of supported propagators in the OpenTelemetry documentation.

For backward compatibility with the SignalFx Python Tracing Library, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi
   
   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi

.. _server-trace-information-python:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, trace response headers are activated by default. The instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing 
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

.. note:: If you need to deactivate trace response headers, set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED`` to ``false``.

.. _code-configuration-python:

Configure the Python agent in your code
====================================================

If you can't set environment variables or can't use ``splunk-py-trace`` for setting configuration values at runtime, define the configuration settings in your code. 

The following example shows how all the configuration options you can pass to ``start_tracing()`` as arguments:

.. code-block:: python

   from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
   from splunk_otel.tracing import start_tracing

   start_tracing(
      service_name='my-python-service',
      span_exporter_factories=[OTLPSpanExporter],
      access_token='',
      max_attr_length=1200,
      trace_response_header_enabled=True,
      resource_attributes={
         'service.version': '3.1',
         'deployment.environment': 'production',
      })

