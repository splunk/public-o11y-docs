.. _migrate-signalfx-dotnet-to-dotnet-otel: 

**********************************************
Migrate from the SignalFx .NET Instrumentation
**********************************************

.. meta:: 
   :description: The agent of the Splunk Distribution of OpenTelemetry .NET is an alternative to the SignalFx Instrumentation for .NET. To migrate from the SignalFx instrumentation, follow these instructions.

The agent of the Splunk Distribution of OpenTelemetry .NET is an alternative to the SignalFx Instrumentation for .NET. To migrate from the SignalFx instrumentation, follow these instructions.

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

.. _requirements-splunk-dotnet-otel-migration:

Compatibility and requirements
==========================================================

For a complete list of requirements, see :ref:`dotnet-otel-requirements`.

.. _migrate-to-splunk-dotnet-otel-agent:

Migrate to the Splunk Distribution of OpenTelemetry .NET
========================================================

To migrate from the SignalFx Instrumentation for .NET to the Splunk Distribution of OpenTelemetry .NET, follow these steps:

#. Uninstall the SignalFx Instrumentation for .NET. See :ref:`uninstall-dotnet-sfx`.
#. Install and activate the Splunk Distribution of OpenTelemetry .NET. See :ref:`install-dotnet-otel-instrumentation`.
#. Specify the endpoint of the OpenTelemetry Collector you're exporting traces to. See :ref:`dotnet-otel-exporter-settings`.
#. Update your settings. See :ref:`changes-functionality-dotnet-otel`.

If you manually instrumented your code with OpenTracing, activate OpenTracing support by setting the ``OTEL_DOTNET_AUTO_OPENTRACING_ENABLED`` environment variable to ``true``.

.. _changes-functionality-dotnet-otel:

Changes in functionality
=======================================================

Each of the following sections describe the main changes in functionality as you migrate from the SignalFx Instrumentation for .NET to the Splunk Distribution of OpenTelemetry .NET.

Configuration setting changes
--------------------------------------------------------

The following table shows SignalFx Instrumentation for .NET environment variables and their OpenTelemetry equivalents:

.. list-table:: 
   :header-rows: 1
   :width: 100%

   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_SERVICE_NAME``
     - ``OTEL_SERVICE_NAME=<service_name>``
   * - ``SIGNALFX_ENV``
     - ``OTEL_RESOURCE_ATTRIBUTES=deployment.environment=<environment_name>``
   * - ``SIGNALFX_VERSION``
     - ``OTEL_RESOURCE_ATTRIBUTES=version=<version>``
   * - ``SIGNALFX_GLOBAL_TAGS``
     - ``OTEL_RESOURCE_ATTRIBUTES``
   * - ``SIGNALFX_TRACE_{<instrumentation>}_ENABLED``
     - ``OTEL_DOTNET_AUTO_TRACES_DISABLED_INSTRUMENTATIONS``
   * - ``SIGNALFX_RECORDED_VALUE_MAX_LENGTH``
     - ``OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT``
   * - ``SIGNALFX_DISABLED_INTEGRATIONS``
     - ``OTEL_DOTNET_AUTO_TRACES_DISABLED_INSTRUMENTATIONS``. For a list of supported instrumentations, see :ref:`supported-dotnet-otel-libraries`.
   * - ``SIGNALFX_AZURE_APP_SERVICES``
     - Not applicable
   * - ``SIGNALFX_DOTNET_TRACER_HOME``
     - ``OTEL_DOTNET_AUTO_HOME``. On Linux, set to ``$HOME/.splunk-otel-dotnet``.
   * - ``SIGNALFX_PROFILER_EXCLUDE_PROCESSES``
     - ``OTEL_DOTNET_AUTO_EXCLUDE_PROCESSES``
   * - ``SIGNALFX_PROFILER_PROCESSES``
     - Not applicable
   * - ``SIGNALFX_TRACE_CONFIG_FILE``
     - Not applicable
   * - ``SIGNALFX_TRACE_ENABLED``
     - Not applicable
   * - ``SIGNALFX_METRICS_{<metric>}_ENABLED``
     - ``OTEL_DOTNET_AUTO_METRICS_ENABLED_INSTRUMENTATIONS`` |br| ``OTEL_DOTNET_AUTO_METRICS_DISABLED_INSTRUMENTATIONS``
   * - ``SIGNALFX_ACCESS_TOKEN``
     - ``SPLUNK_ACCESS_TOKEN``
   * - ``SIGNALFX_REALM``
     - ``SPLUNK_REALM``
   * - ``SIGNALFX_ENDPOINT_URL``
     - ``OTEL_EXPORTER_OTLP_ENDPOINT``
   * - ``SIGNALFX_METRICS_ENDPOINT_URL``
     - ``OTEL_EXPORTER_OTLP_ENDPOINT``
   * - ``SIGNALFX_TRACE_PARTIAL_FLUSH_ENABLED``
     - Not applicable
   * - ``SIGNALFX_TRACE_PARTIAL_FLUSH_MIN_SPANS``
     - Not applicable
   * - ``SIGNALFX_TRACE_BUFFER_SIZE``
     - ``OTEL_BSP_MAX_QUEUE_SIZE``. The default value is ``2048``.
   * - ``SIGNALFX_PROPAGATORS``
     - ``OTEL_PROPAGATORS``. The default values are ``tracecontext, baggage``. Also available: ``b3multi, b3``.

For more information about Splunk Java OTel settings, see :ref:`advanced-dotnet-otel-configuration`. 

Library-specific instrumentation settings
--------------------------------------------------------

The following table shows library-specific environment variables for the SignalFx Instrumentation for .NET and their OpenTelemetry equivalents:

.. list-table:: 
   :header-rows: 1
   :width: 100

   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_HTTP_CLIENT_ERROR_STATUSES``
     - Not applicable
   * - ``SIGNALFX_HTTP_SERVER_ERROR_STATUSES``
     - Not applicable
   * - ``SIGNALFX_INSTRUMENTATION_ELASTICSEARCH_TAG_QUERIES``
     - Not applicable
   * - ``SIGNALFX_INSTRUMENTATION_MONGODB_TAG_COMMANDS``
     - Not configurable using environment variable
   * - ``SIGNALFX_INSTRUMENTATION_REDIS_TAG_COMMANDS``
     - Not configurable using environment variable.
   * - ``SIGNALFX_LOGS_INJECTION``
     - Logs are correlated if the ``Microsoft.Extensions.Logging`` is used.
   * - ``SIGNALFX_TRACE_DELAY_WCF_INSTRUMENTATION_ENABLED``
     - Not applicable
   * - ``SIGNALFX_TRACE_HEADER_TAGS``
     - Not applicable
   * - ``SIGNALFX_TRACE_HTTP_CLIENT_EXCLUDED_URL_SUBSTRINGS``
     - Not configurable using environment variable.
   * - ``SIGNALFX_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED``
     - Not applicable
   * - ``SIGNALFX_TRACE_RESPONSE_HEADER_ENABLED``
     - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
   * - ``SIGNALFX_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED``
     - Not applicable. The default behavior is equivalent to setting to previous setting to ``true``.