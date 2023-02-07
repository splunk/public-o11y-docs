.. _get-data-in-profiling:

***************************************************
Get AlwaysOn Profiling data into Splunk APM
***************************************************

.. meta:: 
   :description: Follow these instructions to get profiling data into Splunk APM using AlwaysOn Profiling.

.. _profiling-requirements:

Prerequisites
=============================================================

To get data into Splunk AlwaysOn Profiling, you need the following:

- Splunk APM enabled for your Observability Cloud organization.
- The Splunk Distribution of OpenTelemetry Collector version 0.44.0 or higher. See :ref:`otel-intro`.

If the version of your Splunk OTel Collector is lower than 0.44.0, see :ref:`profiling-pipeline-setup`.

.. note:: AlwaysOn Profiling is enabled for all host-based subscriptions. For TAPM-based subscriptions, check with your Splunk support representative.

.. _profiling-setup:

Get profiling data in
==========================================================

Follow these instructions to get profiling data into Splunk APM using AlwaysOn Profiling:

1. :ref:`profiling-setup-step-instrument`.
2. :ref:`profiling-setup-enable-profiler`.
3. :ref:`profiling-check-data-coming-in`.

.. _profiling-setup-step-instrument:

Instrument your application or service
---------------------------------------------------------------

AlwaysOn Profiling requires APM tracing data to correlate stack traces to your application requests. To instrument your application for Splunk APM, follow the steps for the appropriate programming language: 

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`Language`
     - :strong:`Available instrumentation`
     - :strong:`Documentation`
   * - Java
     - Splunk Distribution of OpenTelemetry Java version 1.14.2 or higher
     - :ref:`instrument-java-applications`, :ref:`profiling-configuration-java`
   * - Node.js
     - Splunk Distribution of OpenTelemetry JS version 2.0 or higher
     - :ref:`instrument-nodejs-applications`
   * - .NET
     - SignalFx Instrumentation for .NET version 1.0.0 or higher
     - :ref:`instrument-dotnet-applications`

.. note:: See :ref:`apm-data-retention` for information on Profiling data retention.

.. _profiling-setup-enable-profiler:

Enable AlwaysOn Profiling
---------------------------------------------------------------

After you've instrumented your service for Observability Cloud and checked that APM data is getting into Splunk APM, enable AlwaysOn Profiling.

To enable AlwaysOn Profiling, follow the steps for the appropriate programming language: 

.. tabs::

   .. group-tab:: Java

      - To use CPU profiling, enable the ``splunk.profiler.enabled`` system property, or set the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.
      - Enable Memory profiling by setting the ``splunk.profiler.memory.enabled`` system property or the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true``. To enable memory profiling, the ``splunk.profiler.enabled`` property must be set to ``true``.
      - Make sure that the ``splunk.profiler.logs-endpoint`` system property or the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable points to ``http://localhost:4317``.
      - Port 9943 is the default port for the SignalFx receiver in the collector distribution. If you change this port in your Collector config, you need to pass the custom port to the JVM.
      
      The following example shows how to enable the profiler using the system property:

      .. code-block:: bash
         :emphasize-lines: 2,3,4,5

         java -javaagent:./splunk-otel-javaagent.jar \
         -Dsplunk.profiler.enabled=true \
         -Dsplunk.profiler.memory.enabled=true \
         -Dotel.exporter.otlp.endpoint=http(s)://collector:4317 \
         -Dsplunk.metrics.endpoint=http(s)://collector:9943
         -jar <your_application>.jar

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-java`.

      .. note:: Port 9943 is the default port for the SignalFx receiver in the collector distribution. If you change this port in your collector config, you need to pass the custom port to the JVM.

   .. group-tab:: Node.js

      .. caution:: Memory profiling for Node.js is an experimental feature subject to future changes. 

      AlwaysOn Profiling requires Node 16 and higher.

      - Enable the profiler by setting the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.
      - Enable Memory profiling by setting the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true``.
      - Make sure that the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable points to ``http://localhost:4317``  or to the Splunk Distribution of OpenTelemetry Collector.

      The following example shows how to enable the profiler from your application's code:

      .. code-block:: javascript

         start({
            serviceName: '<service-name>',
            endpoint: 'collectorhost:port',
            profiling: {                       // Enables CPU profiling
               memoryProfilingEnabled: true,   // Enables Memory profiling
            }
         });

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-nodejs`.

   .. group-tab:: .NET

      .. caution:: Memory profiling for .NET is an experimental feature subject to future changes.

      AlwaysOn Profiling requires NET Core 3.1 or .NET 5.0 and higher. Memory profiling requires .NET 5.0 and higher.

      - Enable the profiler by setting the ``SIGNALFX_PROFILER_ENABLED`` environment variable to ``true`` for your .NET process.
      - Enable Memory profiling by setting the ``SIGNALFX_PROFILER_MEMORY_ENABLED`` environment variable to ``true``.
      - Make sure that the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable points to ``http://localhost:4317``.
      - Check that the ``SIGNALFX_PROFILER_LOGS_ENDPOINT`` environment variable points to ``http://localhost:4318/v1/logs`` or to the Splunk Distribution of OpenTelemetry Collector.

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-dotnet`.

.. _profiling-check-data-coming-in:

Check that Observability Cloud is receiving profiling data
---------------------------------------------------------------

After you set up and enable AlwaysOn Profiling, check that profiling data is coming in:

1. Log in to Splunk Observability Cloud. 
2. In the left navigation menu, select :menuselection:`APM`.
3. In Splunk APM, select :guilabel:`AlwaysOn Profiling`.
4. Select a service, and switch from the CPU view to the Memory view. 
5. If your service runs in multiple instances, select the instance that you're interested in by selecting the host, container and process ID.
6. If you've enabled Memory profiling, explore memory metrics. See :ref:`profiling-memory-metrics`.
