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

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="general" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "System property"}'></div>

Example of trace sampling
-------------------------------------------------------

The following example shows how to use the ``rules`` traces sampler to exclude the ``/healthcheck`` endpoint from monitoring:

.. code-block:: bash

   export OTEL_TRACES_SAMPLER=rules
   export OTEL_TRACES_SAMPLER_ARG=drop=/healthcheck;fallback=parentbased_always_on

All requests to downstream services that happen as a consequence of calling an excluded endpoint are also excluded.

Considerations on trace propagation
----------------------------------------------------------

For backward compatibility with older versions of the Splunk Distribution of OpenTelemetry Java or the SignalFx Java Agent, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi

   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi


Instrumentation configuration
=======================================================

The following settings control the instrumentation, including tracing and :

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="instrumentation" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "System property"}'></div>

.. _trace-exporters-settings-java:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="exporter" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "System property"}'></div>

The Splunk Distribution of OpenTelemetry Java uses the OTLP gRPC span exporter by default. To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-java`.

.. _profiling-configuration-java:

Java settings for AlwaysOn Profiling
===============================================

The following settings control the AlwaysOn Profiling feature for the Java agent:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="profiler" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "System property"}'></div>

For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.


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
     - Globally activates the Java agent automatic instrumentation. The default value is ``true``. Useful for deactivating automatic discovery in testing scenarios or pipelines. |br| |br| System property: ``otel.javaagent.enabled``.
