.. _advanced-nodejs-otel-configuration:

***************************************************************************
Configure the Splunk Distribution of OTel JS for Splunk Observability Cloud
***************************************************************************

.. meta:: 
   :description: Configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs, like correlating traces with logs, enabling exporters, and more.

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

The following sections describe all available settings for configuring OpenTelemetry for Node.js, including options for enabling new features that are unique to the Splunk Distribution of OpenTelemetry JS.

.. _configuration-methods-nodejs:

Configuration methods
===========================================================

To configure the Splunk Distribution of OpenTelemetry JS, you can use a combination of environment variables and arguments passed to the ``startTracing()`` and ``startMetrics()`` functions:

- Environment variables

   For example: ``export OTEL_SERVICE_NAME='test-service'``

- Arguments passed to the ``startTracing()`` and ``startMetrics()`` functions

   For example: ``startTracing({ serviceName: 'my-node-service', });``

.. note:: Function arguments take precedence over the corresponding environment variables.

.. _main-nodejs-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry JS:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Argument to ``startTracing()``
     - Description
   * - ``SPLUNK_REALM``
     - ``realm``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector.
   * - ``SPLUNK_ACCESS_TOKEN``
     - ``accessToken``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Required if you need to send data to the Observability Cloud ingest endpoint. See :ref:`admin-tokens`.
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - ``serverTimingEnabled``
     - Enables the addition of server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-nodejs`. The default value is ``true``.

.. _trace-configuration-nodejs:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Argument to ``startTracing()``
     - Description
   * - ``OTEL_TRACE_ENABLED``
     -  Not applicable
     - Enables tracer creation and autoinstrumentation. Default value is ``true``.
   * - ``OTEL_SERVICE_NAME``
     - ``serviceName``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in the ``OTEL_RESOURCE_ATTRIBUTES`` variable.
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Not applicable
     - Comma-separated list of resource attributes added to every reported span. For example, ``key1=val1,key2=val2``. 
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Not applicable
     - Maximum number of attributes per span. Default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Not applicable
     - Maximum number of events per span. Default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Not applicable
     - Maximum number of links per span. Default value is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Not applicable
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. Default value is ``1200``. Empty values are treated as infinity.

.. _trace-exporters-settings-nodejs:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Argument to ``startTracing()``
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - ``tracesExporter``
     - Trace exporter to use. The default value is ``otlp``. To select the Jaeger exporter, use ``jaeger-thrift-splunk``.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - ``endpoint``
     - The OTLP endpoint. The default value is ``http://localhost:4317``.
   * - ``OTEL_EXPORTER_JAEGER_ENDPOINT``
     - ``endpoint``
     - The Jaeger endpoint. The default value is ``http://localhost:9080/v1/trace``.

To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-nodejs`.

.. _trace-propagation-configuration-nodejs:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Argument to ``startTracing()``
     - Description
   * - ``OTEL_PROPAGATORS``
     - ``propagators``
     - Comma-separated list of propagators you want to use. The default value is ``tracecontext,baggage``. You can find the list of supported propagators in the OpenTelemetry documentation.

For backward compatibility with the SignalFx Tracing Library for Node.js, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi
   
   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi

.. _profiling-configuration-nodejs:

Node.js settings for AlwaysOn Profiling
===============================================

The following settings control the AlwaysOn Profiling feature for the Node.js agent:

.. list-table:: 
   :header-rows: 1
   :width: 100%

   * - Environment variable
     - Argument to ``startProfiling()``
     - Description
   * - ``SPLUNK_PROFILER_ENABLED``
     - 
     - Enables AlwaysOn Profiling. The default value is ``false``.
   * - ``SPLUNK_PROFILER_LOGS_ENDPOINT``
     - ``endpoint``
     - The collector endpoint for profiler logs. The default value is ``localhost:4317``.
   * - ``SPLUNK_PROFILER_CALL_STACK_INTERVAL``
     - ``callstackInterval``
     - Frequency with which call stacks are sampled, in milliseconds. The default value is 1000 milliseconds.

To configure AlwaysOn Profiling programmatically, pass the arguments to the ``startProfiling`` function, as in the following example:

.. code-block:: javascript

   const { startProfiling } = require('@splunk/otel');

   startProfiling({
      serviceName: '<service-name>',
      endpoint: '<endpoint>'
   });

.. note:: For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.

.. _metrics-configuration-nodejs:

Metrics configuration
===============================================================

The following settings enable runtime metrics collection:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Argument to ``startTracing()``
     - Description
   * - ``SPLUNK_METRICS_ENABLED``
     - 
     - Enables runtime metrics collection. The default value is ``false``. For more information on Node metrics, see :ref:`nodejs-otel-metrics`.
   * - ``SPLUNK_METRICS_ENDPOINT``
     - ``endpoint``
     - The metrics endpoint. The default value is ``http://localhost:9943``.
   * - ``SPLUNK_METRICS_EXPORT_INTERVAL``
     - ``exportInterval``
     - The interval, in milliseconds, of metrics collection and exporting. The default value is ``5000``.

.. note:: To pass settings as arguments, use the ``startMetrics()`` function.

Configuring an existing metrics client to send custom metrics
---------------------------------------------------------------------

You can use an existing SignalFx client for sending custom metrics instead of creating and configuring a new one.

To configure an existing client, pass the following data to the ``startMetrics()`` function:

- ``signalfx``: A JavaScript object with optional ``client`` and ``dimensions`` fields. The ``dimensions`` object adds a predefined dimension for each data point. The format for ``dimensions`` is ``{key: value, ...}``.

The following is a list of dimensions added by default:

- ``service``: See ``serviceName`` in :ref:`trace-configuration-nodejs`.
- ``metric_source``: ``splunk-otel-js``
- ``node_version``: ``process.versions.node``, for example ``16.10.0``

.. _server-trace-information-nodejs:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, enable Splunk trace response headers by setting the following environment variable:

.. tabs::

   .. code-tab:: shell Linux
   
      export SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true
   
   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

When you set this environment variable, your application instrumentation adds the following response headers to HTTP responses.

.. code-block::

   Access-Control-Expose-Headers: Server-Timing
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.