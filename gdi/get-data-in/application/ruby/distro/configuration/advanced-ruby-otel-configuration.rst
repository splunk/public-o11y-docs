.. _advanced-ruby-otel-configuration:

********************************************************************
Configure the Ruby agent for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Configure the agent of the Splunk Distribution of OpenTelemetry Ruby to suit most of your instrumentation needs, like correlating traces with logs, activating exporters, and more.

You can configure the Ruby agent from the Splunk Distribution of OpenTelemetry Ruby to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

The following sections describe all available settings for configuring the Ruby agent, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry Ruby.

.. _main-ruby-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry Ruby:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Not required unless you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`.
   * - ``SPLUNK_REALM``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk OpenTelemetry Collector.
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - Lets you add server trace information to HTTP response headers using the ``net/http`` instrumentation package. For more information, see :ref:`server-trace-information-go`. The default value is ``true``.

To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-ruby`.

.. _trace-configuration-ruby:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
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
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. The default value is ``12000``.

.. _trace-exporters-settings-ruby:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - Trace exporter to use. You can set multiple comma-separated values (for example, ``otlp,console``). The default value is ``otlp``. For debugging purposes, use the ``console`` exporter, which writes spans to the console.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - The OTLP endpoint. The default value is ``http://localhost:4318``.

The Splunk Distribution of OpenTelemetry Ruby uses the OTLP gRPC span exporter by default.

.. _trace-propagation-configuration-ruby:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators you want to use. The default value is ``tracecontext,baggage``. You can find the list of supported propagators in the OpenTelemetry documentation.

For backward compatibility with the SignalFx Ruby Tracing Library, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi
   
   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi

.. _server-trace-information-ruby:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, activate the Rack instrumentation in the configuration:

.. code-block:: ruby

   Splunk::Otel.configure do |c|
      c.use "OpenTelemetry::Instrumentation::Rack"
   end
   
   # Add the middleware in Rack::Builder
   Rack::Builder.app do
      use OpenTelemetry::Instrumentation::Rack::Middlewares::TracerMiddleware
      use Splunk::Otel::Rack::RumMiddleware
      run ->(_env) { [200, { "content-type" => "text/plain" }, ["OK"]] }
   end

When using ActionPack, the middleware is added automatically if the instrumentation ActionPack is activated:

.. code-block:: ruby

   # Rails use ActionPack
   Splunk::Otel.configure do |c|
      c.use "OpenTelemetry::Instrumentation::ActionPack"
      c.use "Splunk::Otel::Instrumentation::ActionPack"
   end

After you've activated the Rack instrumentation, set the following environment variable: 

.. tabs::

   .. code-tab:: shell Linux
   
      export SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true
   
   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

When you set this environment variable, the instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.