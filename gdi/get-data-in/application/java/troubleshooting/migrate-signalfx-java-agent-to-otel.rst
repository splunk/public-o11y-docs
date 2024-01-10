.. _migrate-signalfx-java-agent-to-otel: 

*************************************
Migrate from the SignalFx Java Agent
*************************************

.. meta:: 
   :description: The agent of the Splunk Distribution of OpenTelemetry Java replaces the deprecated SignalFx Java Agent. To migrate to the Splunk Java OTel agent, follow these instructions.

The SignalFx Java Agent is deprecated and has reached End of Support. Replace it with the agent from the Splunk Distribution of OpenTelemetry Java.

The agent of the Splunk Distribution of OpenTelemetry Java is based on the OpenTelemetry Instrumentation for Java, an open-source project that uses the OpenTelemetry API and has a smaller memory footprint than the SignalFx Java Agent. 

.. _requirements-splunk-java-otel-migration:

Compatibility and requirements
==========================================================

The Splunk Distribution of OpenTelemetry Java requires Java runtimes version 8 and higher. See :ref:`java-otel-requirements`.

.. _migrate-to-splunk-java-otel-agent:

Migrate to the Splunk Distribution of OpenTelemetry Java
========================================================

To migrate from the SignalFx Java Agent to the Splunk Distribution of OpenTelemetry Java, follow these steps:

#. Install and activate the Java agent. See :ref:`install-enable-jvm-agent`.
#. Specify the endpoint of the OpenTelemetry Collector you're exporting traces to. See :ref:`trace-exporters-settings-java`.
#. In your application startup script, replace ``-javaagent:./signalfx-tracing.jar`` with ``-javaagent:/path/to/splunk-otel-javaagent.jar``.

If you manually instrumented your code with OpenTracing, expose the OpenTelemetry tracer using the OpenTracing Shim. If you use another API for manual instrumentation, ensure it's in your application's ``classpath`` as well.

.. note:: Semantic conventions for span names and attributes change when you migrate. For more information, see :ref:`migrate-sa-to-otel-collector`.

.. _changes-functionality-java-otel:

Changes in functionality
=======================================================

Each of the following sections describe the main changes in functionality as you migrate from the SignalFx Java Agent to the Splunk Distribution of OpenTelemetry Java.

Configuration setting changes
--------------------------------------------------------

The following table shows SignalFx Java Agent system properties and their OpenTelemetry equivalents:

.. list-table:: 
   :header-rows: 1

   * - SignalFx system property
     - OpenTelemetry system property
   * - ``signalfx.service.name``
     - ``otel.service.name=<service_name>``
   * - ``signalfx.env``
     - ``otel.resource.attributes=deployment.environment=<environment_name>``
   * - ``signalfx.endpoint.url``
     - ``otel.exporter.otlp.endpoint``
   * - ``signalfx.tracing.enabled``
     - ``otel.javaagent.enabled``
   * - ``signalfx.integration.<name>.enabled=false``
     - ``otel.instrumentation.<id>.enabled=false``. For more information, see :ref:`java-instrumentation-issues`.
   * - ``signalfx.span.tags``
     - ``otel.resource.attributes=<comma-separated key=value pairs>``
   * - ``signalfx.trace.annotated.method.blacklist``
     - ``otel.trace.annotated.methods.exclude``
   * - ``signalfx.trace.methods``
     - ``otel.trace.methods``
   * - ``signalfx.server.timing.context``
     - ``splunk.trace-response-header.enabled``

The following table shows SignalFx Java Agent environment variables and their OpenTelemetry equivalents:

.. list-table:: 
   :header-rows: 1

   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_SERVICE_NAME``
     - ``OTEL_SERVICE_NAME=<service_name>``
   * - ``SIGNALFX_ENV``
     - ``OTEL_RESOURCE_ATTRIBUTES=deployment.environment=<environment_name>``
   * - ``SIGNALFX_ENDPOINT_URL``
     - ``OTEL_EXPORTER_OTLP_ENDPOINT``
   * - ``SIGNALFX_TRACING_ENABLED``
     - ``OTEL_JAVAAGENT_ENABLED``
   * - ``SIGNALFX_INTEGRATION_<name>_ENABLED=false``
     - ``OTEL_INSTRUMENTATION_<id>_ENABLED=false``. For more information, see :ref:`java-instrumentation-issues`.
   * - ``SIGNALFX_SPAN_TAGS``
     - ``OTEL_RESOURCE_ATTRIBUTES``
   * - ``SIGNALFX_TRACE_ANNOTATED_METHOD_BLACKLIST``
     - ``OTEL_TRACE_ANNOTATED_METHODS_EXCLUDE``
   * - ``SIGNALFX_TRACE_METHODS``
     - ``OTEL_TRACE_METHODS``
   * - ``SIGNALFX_SERVER_TIMING_CONTEXT``
     - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``

The following SignalFx Java Agent system properties and environment variables don't have a corresponding setting in the Splunk Distribution for OpenTelemetry Java:

Deprecated system properties
------------------------------

- ``signalfx.agent.host``
- ``signalfx.db.statement.max.length``
- ``signalfx.recorded.value.max.length``
- ``signalfx.max.spans.per.trace``
- ``signalfx.max.continuation.depth``

Deprecated environment variables
---------------------------------

- ``SIGNALFX_AGENT_HOST``
- ``SIGNALFX_DB_STATEMENT_MAX_LENGTH``
- ``SIGNALFX_RECORDED_VALUE_MAX_LENGTH``
- ``SIGNALFX_MAX_SPANS_PER_TRACE``
- ``SIGNALFX_MAX_SPANS_PER_TRACE``

For more information about Splunk Java OTel settings, see :ref:`advanced-java-otel-configuration`. 

Log injection changes
=============================================================

For a list of compatible logging frameworks for injecting trace data in logs, see :ref:`correlate-traces-with-logs-java`.

Trace annotation changes
=============================================================

The ``@Trace`` annotation that the SignalFx Java Agent uses is compatible with the Splunk Distribution of OpenTelemetry Java. If you're using the ``@Trace`` annotation for custom instrumentation, you don't have to make any changes.

If you want to configure new custom instrumentation and don't want to use the OpenTelemetry ``getTracer`` and API directly, use the OpenTelemetry ``@WithSpan`` annotation instead of the ``@Trace`` annotation. For more information, see
Configure a WithSpan annotation in the OpenTelemetry documentation.

.. note:: The ``@TraceSetting`` annotation to allow an exception isn't supported.
