.. _advanced-nodejs-otel-configuration:

***************************************************************************
Configure the Splunk Distribution of OTel JS for Splunk Observability Cloud
***************************************************************************

.. meta::
   :description: Configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs, like correlating traces with logs, activating exporters, and more.

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

The following sections describe all available settings for configuring OpenTelemetry for Node.js, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry JS.

.. _configuration-methods-nodejs:

Configuration methods
===========================================================

To configure the Splunk Distribution of OpenTelemetry JS, you can use a combination of environment variables and arguments passed to the ``start()`` function:

- Environment variables

   For example: ``export OTEL_SERVICE_NAME='test-service'``

- Arguments passed to the ``start()`` function

   For example: ``start({ serviceName: 'my-node-service', });``

Configuration for each of the supported data type, such as metrics or tracing, is set using additional properties on the configuration object:

.. code-block:: javascript

   start({
      // general options like `serviceName` and `endpoint`
      metrics: {
         // configuration passed to metrics signal
      },
      profiling: {
         // configuration passed to profiling signal
      },
      tracing: {
         // configuration passed to tracing signal
      },
   });

You can also activate the collection of a specific data type by passing a boolean value instead of an object. For example:

.. code-block:: javascript

   start({
      // general options like `serviceName` and `endpoint`
      metrics: true, // turn metrics on with default options
      profiling: true, // turn profiling on with default options
   });

.. note:: Function arguments take precedence over the corresponding environment variables.

.. _main-nodejs-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry JS:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``SPLUNK_REALM``
     - ``realm``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector.
   * - ``SPLUNK_ACCESS_TOKEN``
     - ``accessToken``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Required if you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`.
   * - ``OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED``
     - ``d``
     - Whether to load all the embedded instrumentations. The default value is ``true``. You can use  
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - ``tracing.serverTimingEnabled``
     - Activates the addition of server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-nodejs`. The default value is ``true``.
   * - ``OTEL_LOG_LEVEL``
     - ``logLevel``
     - Log level for the OpenTelemetry diagnostic console logger. To activate debug logging, set the ``debug`` value. Available values are ``error``, ``info``, ``debug``, and ``verbose``. The default value is ``none``.

.. _instrumentation-configuration-nodejs:

Instrumentations configuration
=======================================================

The following settings control which instrumentations are activated:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED``
     -
     - Whether to activate all the embedded instrumentations. The default value is ``true``. When you set this setting to ``false``, use ``OTEL_INSTRUMENTATION_<NAME>_ENABLED=true`` to selectively turn on instrumentations.
   * - ``OTEL_INSTRUMENTATION_<NAME>_ENABLED``
     -
     - When set to ``true``, this setting activates a specific instrumentation, as defined by replacing ``<NAME>`` with the name of the instrumentation. The name isn't case sensitive. For a complete list of available instrumentations, see :ref:`Requirements <nodes-requirements>`.

For example, to turn off all default instrumentations and only turn on the ``bunyan`` instrumentation, set the following environment variables:

.. code-block:: shell

   export OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED=true
   export OTEL_INSTRUMENTATION_BUNYAN_ENABLED=true

The previous settings only apply to instrumentations loaded by the Splunk Distribution of OpenTelemetry JS by default. When using the programmatic API to supply a list of user-specified instrumentations, they have no effect.


.. _trace-configuration-nodejs:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``OTEL_TRACE_ENABLED``
     -  Not applicable
     - Activates tracer creation and autoinstrumentation. Default value is ``true``.
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
   * - ``SPLUNK_REDIS_INCLUDE_COMMAND_ARGS``
     - Not applicable
     - Whether to include the full Redis query in ``db.statement`` span attributes when using the Redis instrumentation. Default value is ``false``.

.. _trace-exporters-settings-nodejs:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - ``tracing.spanExporterFactory``
     - Comma-separated list of trace exporters to use. The default value is ``otlp``. To output to the console, set the variable to ``console``.
   * - ``OTEL_METRICS_EXPORTER``
     - ``metrics.metricReaderFactory``
     - Comma-separated list of metrics exporter to use. The default value is ``otlp``. To output to the console, set the variable to ``console``.
   * - ``OTEL_EXPORTER_OTLP_METRICS_PROTOCOL``
     - ``metrics.metricReaderFactory``
     - Procotol for exporting metrics. Accepted values are ``grpc`` and ``http/protobuf``. The default value is ``grpc``.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - ``endpoint``
     - The OTLP endpoint. The default value is ``http://localhost:4317``.

.. _jaeger-exporter-nodejs:

Jaeger exporter
-------------------

To use the Jaeger exporter, add the ``@opentelemetry/exporter-jaeger`` package as in the following example:

.. code-block:: js

   const { start } = require('@splunk/otel');
   const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
   start({
      serviceName: 'my-node-service',
      tracing: {
         spanExporterFactory: (options) => {
         return new JaegerExporter({
            serviceName: options.serviceName,
            // Additional config
         })
         }
      },
   });

.. note:: To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-nodejs`.

.. _trace-propagation-configuration-nodejs:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``OTEL_PROPAGATORS``
     - ``tracing.propagators``
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
     - Argument to ``start()``
     - Description
   * - ``SPLUNK_PROFILER_ENABLED``
     - ``profilingEnabled``
     - Activates AlwaysOn Profiling. The default value is ``false``.
   * - ``SPLUNK_PROFILER_MEMORY_ENABLED``
     - ``profiling.memoryProfilingEnabled``
     - Activates memory profiling for AlwaysOn Profiling. The default value is ``false``.
   * - ``SPLUNK_PROFILER_LOGS_ENDPOINT``
     - ``profiling.endpoint``
     - The collector endpoint for profiler logs. The default value is ``localhost:4317``.
   * - ``SPLUNK_PROFILER_CALL_STACK_INTERVAL``
     - ``profiling.callstackInterval``
     - Frequency with which call stacks are sampled, in milliseconds. The default value is 1000 milliseconds.

To configure AlwaysOn Profiling programmatically, pass the arguments to the ``start`` function, as in the following example:

.. code-block:: javascript

   start({
      serviceName: '<service-name>',
      profiling: true,
      tracing: {
         // configuration passed to tracing signal
      },
   });

.. note:: For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.

.. _metrics-configuration-nodejs:

Metrics configuration
===============================================================

The following settings activate runtime metrics collection:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to ``start()``
     - Description
   * - ``SPLUNK_METRICS_ENABLED``
     - Activated by calling ``start``.
     - Activates metrics collection. The default value is ``false``. For more information on Node metrics, see :ref:`nodejs-otel-metrics`.
   * - ``SPLUNK_METRICS_ENDPOINT``
     - ``metrics.endpoint``
     - The metrics endpoint. Takes precedence over ``OTEL_EXPORTER_OTLP_METRICS_ENDPOINT``. When ``SPLUNK_REALM`` is used, the default value is ``https://ingest.<realm>.signalfx.com/v2/datapoint/otlp``.
   * - ``OTEL_EXPORTER_OTLP_METRICS_ENDPOINT``
     - ``metrics.endpoint``
     - The metrics endpoint. Takes precedence over the value set in ``OTEL_EXPORTER_OTLP_ENDPOINT``. The default value is ``http://localhost:4317``. When ``SPLUNK_REALM`` is used, the default value is ``https://ingest.<realm>.signalfx.com/v2/datapoint/otlp``.
   * - ``OTEL_METRIC_EXPORT_INTERVAL``
     - ``metrics.exportIntervalMillis``
     - The interval, in milliseconds, of metrics collection and exporting. The default value is ``30000``.
   * - ``SPLUNK_RUNTIME_METRICS_ENABLED``
     - ``metrics.runtimeMetricsEnabled``
     - Activates the collection and export of runtime metrics. The default value is ``true``. Runtime metrics are only sent if the ``SPLUNK_METRICS_ENABLED`` environment variable is set to ``true`` or if memory profiling is activated. For more information, see :ref:`nodejs-otel-runtime-metrics`.
   * - ``SPLUNK_RUNTIME_METRICS_COLLECTION_INTERVAL``
     - ``metrics.runtimeMetricsCollectionIntervalMillis``
     - The interval, in milliseconds, during which garbage collection and event loop statistics are collected. After collection, the values become available to the metric exporter. The default value is ``5000``.
   * - ``SPLUNK_DEBUG_METRICS_ENABLED``
     - ``metrics.debugMetricsEnabled``
     - Activates the collection and export of internal debug metrics for troubleshooting. The default value is ``false``. Debug metrics are only sent if the ``SPLUNK_METRICS_ENABLED`` environment variable is set to ``true``. For more information, see :ref:`nodejs-otel-debug-metrics`.
   * - None
     - ``metrics.resourceFactory``
     - Callback that lets you filter the default resource or provide a custom one. The function takes one argument of type ``Resource``, which contains the service name, environment, host, and process attributes by default.

.. note:: To pass settings as arguments, use the ``start()`` function.

Configuring an existing metrics client to send custom metrics
---------------------------------------------------------------------

You can use an existing SignalFx client for sending custom metrics instead of creating and configuring a new one.

To configure an existing client, pass the following data to the ``start()`` function:

- ``signalfx``: A JavaScript object with optional ``client`` and ``dimensions`` fields. The ``dimensions`` object adds a predefined dimension for each data point. The format for ``dimensions`` is ``{key: value, ...}``.

The following is a list of dimensions added by default:

- ``service``: See ``serviceName`` in :ref:`trace-configuration-nodejs`.
- ``metric_source``: ``splunk-otel-js``
- ``node_version``: ``process.versions.node``, for example ``16.10.0``

.. _server-trace-information-nodejs:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, activate Splunk trace response headers by setting the following environment variable:

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
