.. _advanced-go-otel-configuration:

********************************************************************
Configure the Go instrumentation for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Configure the Splunk Distribution of OpenTelemetry Go to suit most of your instrumentation needs, like correlating traces with logs, activating exporters, and more.

You can configure the Splunk Distribution of OpenTelemetry Go to suit your instrumentation needs.

The following sections describe all available settings for configuring the Go instrumentation, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry Go.

.. _configuration-methods-go:

Configuration methods
====================================================

You can change the instrumentation settings in two ways:

- Set an environment variable. For example:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

      .. code-tab:: go Go

         // Before running distro.Run()
         os.Setenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://localhost:4317")


To configure the instrumentation, use environment variables. Specify options in the code to override existing environment variables.

.. _main-go-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry Go:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Not required unless you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`.
   * - ``SPLUNK_REALM``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector.
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - Lets you add server trace information to HTTP response headers using the ``net/http`` instrumentation package. For more information, see :ref:`server-trace-information-go`. The default value is ``true``.
   * - ``OTEL_LOG_LEVEL``
     - Sets the logging level for instrumentation log messages. Possible values are ``error``, ``warn``, ``info``, and ``debug``. The default value is ``info``. The log level might not apply if you use ``WithLogger`` to change the logger.

.. _trace-configuration-go:

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
   * - ``OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Maximum length of strings for span attribute values. Values larger than the limit are truncated. The default value is ``12000``.

.. _trace-exporters-settings-go:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - The traces exporter to use. The default value is ``otlp``. Acceptable values are ``otlp`` and ``none``. Setting ``none`` deactivates trace exports.
   * - ``OTEL_METRICS_EXPORTER``
     - The metrics exporter to use. The default value is ``otlp``. Accepted values are ``otlp`` and ``none``. Setting ``none`` deactivates metric exports.
   * - ``OTEL_METRIC_EXPORT_INTERVAL``
     - Interval, in milliseconds, between the start of two export attempts. The default value is ``60000``.
   * - ``OTEL_METRIC_EXPORT_TIMEOUT``
     - Maximum allowed time to export data, in milliseconds. The default value is ``30000``.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - The OTLP endpoint. The default value is ``http://localhost:4317``.
   * - ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT``
     - The OTLP endpoint for traces. The default value is ``http://localhost:4317``.
   * - ``OTEL_EXPORTER_OTLP_METRICS_ENDPOINT``
     - The OTLP endpoint. The default value is ``http://localhost:4317``.

To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-go`.

Configure a TLS connection
------------------------------------------------------

By default, the exporters don't use a TLS connection. To configure a TLS connection, set the ``WithTLSConfig`` option in the code. See :ref:`configuration-methods-go`.

.. _go-batchprocessor:

Batch processor settings
---------------------------------------------------------

The following settings control the ``BatchSpanProcessor`` configuration:

.. list-table:: 
   :header-rows: 1
   :width: 100%

   * - Environment variable
     - Description
   * - ``OTEL_BSP_SCHEDULE_DELAY``
     - Delay between two consecutive exports, in milliseconds. The default value is ``5000``.
   * - ``OTEL_BSP_EXPORT_TIMEOUT``
     - Maximum allowed time to export data, in milliseconds. The default value is ``30000``.
   * - ``OTEL_BSP_MAX_QUEUE_SIZE``
     - Maximum queue size. The default value is ``2048``.
   * - ``OTEL_BSP_MAX_EXPORT_BATCH_SIZE``
     - Maximum batch size. The default value is ``512``.

.. _trace-propagation-configuration-go:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators you want to use. The default value is ``tracecontext,baggage``. Values can be joined with a comma (``,``) to produce a composite ``TextMapPropagator``.

The instrumentation supports the following propagators:

   - ``tracecontext``: W3C tracecontext
   - ``baggage``: W3C baggage
   - ``b3``: B3 single-header format
   - ``b3multi``: B3 multiheader format
   - ``xray``: AWS X-Ray
   - ``ottrace``: OpenTracing 
   - ``none``: None
      
You can also change the trace propagator using ``otel.SetTextMapPropagator``. For example:

.. code-block:: go

   distro.Run()
   // Change propagator after distro.Run() has been invoked
   otel.SetTextMapPropagator(propagation.TraceContext{})

.. _server-trace-information-go:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, add the HTTP instrumentation packages to your code. For example:

.. code-block:: go
   :emphasize-lines: 5,6

   package main

   import (
      "net/http"
      "github.com/signalfx/splunk-otel-go/distro"
      "github.com/signalfx/splunk-otel-go/instrumentation/net/http/splunkhttp"
      "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
   )

   func main() {
      distro.Run()
      var handler http.Handler = http.HandlerFunc(
         func(w http.ResponseWriter, r *http.Request) {
            w.Write([]byte("Hello"))
         }
      )
      handler = splunkhttp.NewHandler(handler)
      handler = otelhttp.NewHandler(handler, "my-service")
      http.ListenAndServe(":9090", handler)
   }

Your application instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.
