.. _advanced-java-otel-configuration:

********************************************************************
Configure the Java agent for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Configure the agent of the Splunk Distribution of OpenTelemetry Java to suit most of your instrumentation needs, like correlating traces with logs, activating custom sampling, and more.

You can configure the Java agent from the Splunk Distribution of OpenTelemetry Java to suit most of your instrumentation needs. In most cases, modifying the basic configuration is enough to get started. More advanced settings are also available.

The following sections describe all available settings for configuring the Java Virtual Machine (JVM) agent, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry Java.

.. _configuration-methods-java:

Configuration methods
===========================================================

You can change the agent settings in two ways:

- Set an environment variable. For example:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_SERVICE_NAME=my-java-app

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_SERVICE_NAME=my-java-app

- Add a system property as runtime parameter. For example:

   .. code-block:: shell
         :emphasize-lines: 2

         java -javaagent:./splunk-otel-javaagent.jar \
         -Dotel.service.name=<my-java-app> \
         -jar <myapp>.jar

Environment variables are the preferred way of configuring OpenTelemetry agents. System properties, if specified, override existing environment variables.

.. _main-java-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry Java:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``SPLUNK_REALM``
     - The name of your organization's realm, for example, ``us0``. When you set the realm, telemetry is sent directly to the ingest endpoint of Splunk Observability Cloud, bypassing the Splunk Distribution of OpenTelemetry Collector. |br| |br| System property: ``splunk.realm``
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Unset by default. Not required unless you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`admin-tokens`. |br| |br| System property: ``splunk.access.token``
   * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
     - Activates the addition of server trace information to HTTP response headers. For more information, see :ref:`server-trace-information-java`. The default value is ``true``. |br| |br| System property: ``splunk.trace-response-header.enabled``
   * - ``SPLUNK_METRICS_FORCE_FULL_COMMANDLINE``
     - Adds the full command line as a resource attribute for all metrics. If false, commands longer than 255 characters are truncated. |br| |br| System property: ``splunk.metrics.force_full_commandline``

.. _trace-configuration-java:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``OTEL_SERVICE_NAME``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in the ``OTEL_RESOURCE_ATTRIBUTES`` variable. |br| |br| System property: ``otel.service.name``
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Comma-separated list of resource attributes added to every reported span. For example, ``key1=val1,key2=val2``. |br| |br| System property: ``otel.resource.attributes``
   * - ``OTEL_INSTRUMENTATION_COMMON_`` |br| ``PEER_SERVICE_MAPPING``
     - Used to add a ``peer.service`` attribute by specifying a comma-separated list of mapping from hostnames or IP addresses. For example, if set to ``1.2.3.4=cats-srv,dogs-srv.com=dogs-api``, requests to ``1.2.3.4`` have a ``peer.service`` attribute of ``cats-service`` and requests to ``dogs-srv.com`` have one of ``dogs-api``. |br| |br| System property: ``otel.instrumentation.common`` |br| ``.peer-service-mapping``
   * - ``OTEL_INSTRUMENTATION_METHODS_INCLUDE``
     -  Adds ``@WithSpan`` annotation functionality for the target method string. Format is ``my.package.MyClass1[m1,m2];my.package.MyClass2[m3]``. |br| |br| System property: ``otel.instrumentation.methods.include``
   * - ``OTEL_INSTRUMENTATION_OPENTELEMETRY`` |br| ``_ANNOTATIONS_EXCLUDE_METHODS``
     - Suppresses ``@WithSpan`` instrumentation for specific methods. Format is ``my.package.MyClass1[m1,m2];my.package.MyClass2[m3]``. |br| |br| System property: ``otel.instrumentation.opentelemetry`` |br| ``-annotations.exclude-methods``
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per span. The default value is unlimited. |br| |br| System property: ``otel.span.attribute.count.limit``
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Maximum number of events per span. The default value is unlimited. |br| |br| System property: ``otel.span.event.count.limit``
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Maximum number of links per span. The default value is ``1000``. |br| |br| System property: ``otel.span.link.count.limit``

.. _trace-exporters-settings-java:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - Trace exporter to use. You can set multiple comma-separated values. |br| |br| System property: ``otel.traces.exporter``
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - OTLP gRPC endpoint. The default value is ``http://localhost:4317``. |br| |br| System property: ``otel.exporter.otlp.endpoint``

The Splunk Distribution of OpenTelemetry Java uses the OTLP gRPC span exporter by default. To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-java`.

.. _trace-sampling-settings-java:

Samplers configuration
===============================================================

The following settings control trace sampling:

.. list-table:: 
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_SAMPLER``
     - Sampler to use. The default value is ``always_on``. |br| |br| In addition to the samplers provided by the OpenTelemetry Java SDK, you can use the following samplers:

         - ``internal_root_off``: Drops all traces with root spans where ``spanKind`` is ``INTERNAL``, ``CLIENT`` or ``PRODUCER``. Keeps root spans where ``spanKind`` is ``SERVER`` or ``CONSUMER``.
         - ``rules``: Drops all traces that originate from specific endpoints, as defined by the value of the ``OTEL_TRACES_SAMPLER_ARG`` setting. Only applies to spans where ``spanKind`` is ``SERVER``.

        System property: ``otel.traces.sampler``

   * - ``OTEL_TRACES_SAMPLER_ARG``
     - Semicolon-separated list of rules for the ``rules`` sampler. For example: |br| |br| ``OTEL_TRACES_SAMPLER_ARG=drop=/healthcheck;fallback=always_on`` |br| |br| The following rules are supported:

        - ``drop=<value>``: The sampler drops a span if its ``http.target`` attribute has a substring equal to the value you've provided. For example: ``drop=/status``.
        - ``fallback=<sampler>``: Sampler to use if no ``drop`` rule matched a given span. Supported samplers are ``always_on`` and ``parentbased_always_on``. If you define multiple fallback samplers, the Java agent uses the last one.

       If you don't set arguments when using the ``rules`` sampler, the instrumentation defaults to the ``parentbased_always_on`` sampler. |br| |br| System property: ``otel.traces.sampler.arg``

Example of trace sampling
-------------------------------------------------------

The following example shows how to use the ``rules`` traces sampler to exclude the ``/healthcheck`` endpoint from monitoring:

.. code-block:: bash

   export OTEL_TRACES_SAMPLER=rules
   export OTEL_TRACES_SAMPLER_ARG=drop=/healthcheck;fallback=parentbased_always_on

All requests to downstream services that happen as a consequence of calling an excluded endpoint are also excluded.

.. _trace-propagation-configuration-java:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators you want to use. The default value is ``tracecontext,baggage``. You can find the list of supported propagators in the OpenTelemetry documentation. |br| |br| System property: ``otel.propagators``

For backward compatibility with older versions of the Splunk Distribution of OpenTelemetry Java or the SignalFx Java Agent, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi
   
   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi

.. _profiling-configuration-java:

Java settings for AlwaysOn Profiling
===============================================

The following settings control the AlwaysOn Profiling feature for the Java agent:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``SPLUNK_PROFILER_ENABLED``
     - Activates AlwaysOn Profiling. The default value is ``false``. |br| |br| System property: ``splunk.profiler.enabled``
   * - ``SPLUNK_PROFILER_LOGS_ENDPOINT``
     - The collector endpoint for profiler logs. By default, it takes the value of ``otel.exporter.otlp.endpoint``. |br| |br| System property: ``splunk.profiler.logs-endpoint``
   * - ``SPLUNK_PROFILER_DIRECTORY``
     -  The location of the JDK Flight Recorder files. The default value is the local directory (``.``). |br| |br| System property: ``splunk.profiler.directory``
   * - ``SPLUNK_PROFILER_RECORDING_DURATION``
     - The duration of the recording unit. You can define duration in the form ``<number><unit>``, where the unit can be ``ms``, ``s``, ``m``, ``h``, or ``d``. The default interval is ``20s``. If you enter a number but not a unit, the default unit is assumed to be ``ms``. |br| |br| System property: ``splunk.profiler.recording.duration``
   * - ``SPLUNK_PROFILER_KEEP_FILES``
     -  Whether to preserve JDK Flight Recorder (JFR) files or not. The default value is ``false``, which means that JFR files are deleted after processing. |br| |br| System property: ``splunk.profiler.keep-files``
   * - ``SPLUNK_PROFILER_CALL_STACK_INTERVAL``
     - Frequency with which call stacks are sampled, in milliseconds. The default value is 10000 milliseconds. |br| |br| System property: ``splunk.profiler.call.stack.interval``
   * - ``SPLUNK_PROFILER_MEMORY_ENABLED``
     - Activates memory profiling with all the options. Activating memory profiling overrides the value of ``splunk.metrics.enabled``. The default value is ``false``. Requires ``splunk.profiler.enabled`` to be set to ``true``. To activate or deactivate specific memory profiling options, set their values explicitly. |br| |br| System property: ``splunk.profiler.memory.enabled``
   * - ``SPLUNK_PROFILER_MEMORY_EVENT_RATE``
     - Rate limit for memory profiling data, expressed as stack traces per unit of time. You can define duration in the form ``<number>/<unit>``, where the unit can be ``s`` or ``m``. The default value is ``150/s``, or 150 stack traces per second. Consider increasing this value when collecting memory profiling data from complex, multithreaded workloads, like application servers. |br| |br| System property: ``splunk.profiler.memory.event.rate``
   * - ``SPLUNK_PROFILER_TLAB_ENABLED``
     - Whether to activate TLAB memory events. The default value is the value assigned to the ``splunk.profiler.memory.enabled`` property. |br| |br| System property: ``splunk.profiler.tlab.enabled``
   * - ``SPLUNK_PROFILER_INCLUDE_INTERNAL_STACKS``
     - Whether to include stack traces of the agent internal threads and stack traces with JDK internal frames. The default value is ``false``. |br| |br| System property: ``splunk.profiler.include.internal.stacks``
   * - ``SPLUNK_PROFILER_TRACING_STACKS_ONLY``
     - Whether to include only stack traces that are linked to a span context. The default value is ``false``. When set to ``true``, call stacks not linked to span contexts are dropped, which is useful to reduce data ingest volume. |br| |br| System property: ``splunk.profiler.tracing.stacks.only``

For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.

.. _metrics-configuration-java:

Metrics collection settings
===============================================

The following settings control metrics collection for the Java agent:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60
   
   * - Environment variable
     - Description
   * - ``SPLUNK_METRICS_ENABLED``
     - Activates exporting metrics. If you activate memory profiling using the ``splunk.profiler.memory.enabled`` property, the value of ``splunk.metrics.enabled`` is ignored. See :ref:`java-otel-metrics-attributes` for more information. Default is ``false``. |br| |br| System property: ``splunk.metrics.enabled``
   * - ``SPLUNK_METRICS_ENDPOINT``
     - The OTel collector metrics endpoint. Default is ``http://localhost:9943``. |br| |br| System property: ``splunk.metrics.endpoint``
   * - ``SPLUNK_METRICS_EXPORT_INTERVAL``
     - Interval between pushing metrics. You can define duration in the form ``<number><unit>``, where the unit can be ``ms``, ``s``, ``m``, ``h``, or ``d``. The default interval is ``30s``. If you enter a number but not a unit, the default unit is assumed to be ``ms``. |br| |br| System property: ``splunk.metrics.export.interval``

.. note:: Metric support is experimental.

.. _server-trace-information-java:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, trace response headers are activated by default. The instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing 
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

The following server frameworks and libraries add ``Server-Timing`` information:

- Servlet API versions 2.2 to 4.X.
- Netty versions 3.8 to 4.0.

.. note:: If you need to deactivate trace response headers, set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED`` to ``false``.

.. _other-java-settings:

Other settings
================================================

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60
   
   * - Environment variable
     - Description
   * - ``OTEL_JAVAAGENT_ENABLED``
     - Globally activates the Java agent automatic instrumentation. The default value is ``true``. Useful for deactivating auto instrumentation in testing scenarios or pipelines. |br| |br| System property: ``otel.javaagent.enabled`` 
