.. _common-java-troubleshooting:

****************************************************************
Troubleshoot Java instrumentation for Splunk Observability Cloud
****************************************************************

.. meta::
   :description: If your instrumented Java application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a Java application using the Splunk Distribution of OpenTelemetry Java and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-java-troubleshooting:

Steps for troubleshooting Java OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Java agent issues:

#. :ref:`enable-java-debug-logging`
#. :ref:`verify-runtime-status`

.. _enable-java-debug-logging:

Activate debug logging
-------------------------------------------------------

Debug logging is a special execution mode that outputs more information about the Java agent of the Splunk Distribution of OpenTelemetry Java. This can help you troubleshoot Java instrumentation issues.

To activate debug logging for the Java agent, select one of the following options:

- Pass the following argument when running your application: ``-Dotel.javaagent.debug=true``.

- Set the ``OTEL_JAVAAGENT_DEBUG`` environment variable to ``true`` before running your application.

When you run the agent with debug logging activated, debug information is sent to the console as ``stderr``. Debug log entries look like the following example:

.. code-block:: bash

   ...
   [otel.javaagent 2023-05-09 15:22:40:172 +0200] [main] DEBUG io.opentelemetry.javaagent.tooling.VersionLogger - Running on Java 17.0.2. JVM OpenJDK 64-Bit Server VM - Eclipse Adoptium - 17.0.2+8
   [otel.javaagent 2023-05-09 15:22:40:264 +0200] [main] DEBUG io.opentelemetry.sdk.internal.JavaVersionSpecific - Using the APIs optimized for: Java 9+
   ...

While not all debug entries are relevant to the issue affecting your Java instrumentation, the root cause is likely to appear in your debug log.

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _verify-runtime-status:

Check the status of the runtime
----------------------------------------------

Run the ``jps -lvm`` command to verify that the Java runtime has started. The output is a list of all the Java Virtual Machines (JVM) currently running. Make sure the JVM you instrumented appears among them.

In the following example, the first entry shows a JVM running the agent with ``-javaagent``:

.. code-block:: bash

   37602 target/spring-petclinic-2.4.5.jar -javaagent:./splunk-otel-javaagent.jar -Dotel.resource.attributes=service.name=pet-store-demo,deployment.environment=prod,service.version=1.2.0 -Dotel.javaagent.debug=true
   38262 jdk.jcmd/sun.tools.jps.Jps -lvm -Dapplication.home=/usr/lib/jvm/java-16-openjdk-amd64 -Xms8m -Djdk.module.main=jdk.jcmd

If the instrumented JVM doesn't appear in the list, check the JVM or application logs to find the cause of the problem. Also check that the additional startup parameters are correctly passed to the runtime. See :ref:`instrument-java-applications` to learn more about startup parameters.

.. _java-instrumentation-issues:

Library instrumentation issues
==============================================================

If you find an issue with a specific instrumentation of a library, or suspect there might be an issue affecting that instrumentation, deactivating it can help you troubleshoot the Java agent.

To deactivate a specific library instrumentation, add the following argument:

``-Dotel.instrumentation.<name>.enabled=false``

Replace ``<name>`` with the corresponding instrumentation from the OpenTelemetry Java instrumentation on GitHub at https://opentelemetry.io/docs/instrumentation/java/automatic/agent-config/#suppressing-specific-auto-instrumentation.

.. _java-class-instrumentation-issues:

Class instrumentation issues
-------------------------------------------------

You can prevent specific classes from being instrumented. Excluded classes don't send spans, which is useful for muting specific classes or packages.

To deactivate instrumentation for a class, set the ``otel.javaagent.exclude-classes`` system property or the ``OTEL_JAVAAGENT_EXCLUDE_CLASSES`` environment variable to the name of the class or classes.

You can enter multiple classes. For example, ``my.package.MyClass,my.package2.*``.

.. caution:: Deactivating instrumentation for specific classes can have unintended side effects. Use this feature with caution.

.. _java-trace-exporter-issues:

Trace exporter issues
=====================================================

By default, the Splunk Distribution of OpenTelemetry Java uses the OTLP exporter. Any issue affecting the export of traces produces an error in the debug logs.

OTLP can't export spans
-----------------------------------------------------

The following error in the logs means that the agent can't send trace data to the OpenTelemetry Collector:

.. code-block:: bash

   [BatchSpanProcessor_WorkerThread-1] ERROR io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter - Failed to export spans. Server is UNAVAILABLE. Make sure your collector is running and reachable from this network. Full error message:UNAVAILABLE: io exception

To troubleshoot the lack of connectivity between the OTLP exporter and the OTel Collector, try the following steps:

#. Make sure that ``otel.exporter.otlp.endpoint`` points to the correct OpenTelemetry Collector instance host.
#. Check that your OTel Collector instance is configured and running. See :ref:`otel-splunk-collector-tshoot`.
#. Check that the OTLP gRPC receiver is activated in the OTel Collector and plugged into the traces pipeline.
#. Check that the OTel Collector points to the following address: ``http://<host>:4317``. Verify that your URL is correct.

401 error when sending spans
--------------------------------------------------------

If you send traces directly to Splunk Observability Cloud and receive a 401 error code, the authentication token specified in ``SPLUNK_ACCESS_TOKEN`` is invalid. The following are possible reasons:

- The value is null.
- The value is not a well-formed token.
- The token is not an access token that has ``authScope`` set to ingest.

Make sure that you're using a valid Splunk access token when sending data directly to your Splunk platform instance. See :ref:`admin-api-access-tokens`.

.. _java-metrics-exporter-issues:

Metrics exporter issues
===============================================================

If you see the following warning in your logs, it means that the Java agent can't send metrics to your OTel Collector, Smart Agent (now deprecated), or to the Splunk platform endpoints:

.. code-block:: bash

   [signalfx-metrics-publisher] WARN com.splunk.javaagent.shaded.io.micrometer.signalfx.SignalFxMeterRegistry - failed to send metrics: Unable to send data points

To troubleshoot connectivity issues affecting application metrics, try the following steps:

1. Make sure that ``splunk.metrics.endpoint`` points to the correct host.
2. Check that the OpenTelemetry Collector or Smart Agent instance is configured and running.
3. Check that the OpenTelemetry Collector or Smart Agent are using the correct ports for the SignalFx receiver. The Collector uses ``http://<host>:9943``, and the Smart Agent uses ``http://<host>:9080/v2/datapoint``.
4. Make sure that you're using a valid Splunk access token when sending data directly to your Splunk platform instance. See :ref:`admin-api-access-tokens`.

.. note:: Metric collection for Java using OpenTelemetry instrumentation is still experimental.

.. _java-profiler-issues:

Troubleshoot AlwaysOn Profiling for Java
===============================================================

Follow these steps to troubleshoot issues with AlwaysOn Profiling:

Check that AlwaysOn Profiling is activated
----------------------------------------------------------------

The Java agent logs the string ``JFR profiler is active`` at startup using an ``INFO`` message. To check whether AlwaysOn Profiling is activated, search your logs for strings similar to the following:

.. code-block:: bash 

   [otel.javaagent 2021-09-28 18:17:04:246 +0000] [main] INFO com.splunk.opentelemetry.profiler.JfrActivator - JFR profiler is active.

If the string does not appear, make sure that you've activated the profiler by setting the ``splunk.profiler.enabled`` system property or the ``SPLUNK_PROFILER_ENABLED`` environment variable. See :ref:`profiling-configuration-java`.

Check the AlwaysOn Profiling configuration
----------------------------------------------------------------

If AlwaysOn Profiling is not working as intended, check the configuration settings. The Java agent logs AlwaysOn Profiling settings using INFO messages at startup. Search for the string ``com.splunk.opentelemetry.profiler.ConfigurationLogger`` to see entries like the following:

.. code-block:: shell 
      
   [otel.javaagent 2021-09-28 18:17:04:237 +0000] [main] INFO <snip> - -----------------------
   [otel.javaagent 2021-09-28 18:17:04:237 +0000] [main] INFO <snip> - Profiler configuration:
   [otel.javaagent 2021-09-28 18:17:04:238 +0000] [main] INFO <snip> -                 splunk.profiler.enabled : true
   [otel.javaagent 2021-09-28 18:17:04:239 +0000] [main] INFO <snip> -               splunk.profiler.directory : .
   [otel.javaagent 2021-09-28 18:17:04:244 +0000] [main] INFO <snip> -      splunk.profiler.recording.duration : 20s
   [otel.javaagent 2021-09-28 18:17:04:244 +0000] [main] INFO <snip> -              splunk.profiler.keep-files : false
   [otel.javaagent 2021-09-28 18:17:04:245 +0000] [main] INFO <snip> -           splunk.profiler.logs-endpoint : null
   [otel.javaagent 2021-09-28 18:17:04:245 +0000] [main] INFO <snip> -             otel.exporter.otlp.endpoint : http://collector:4317
   [otel.javaagent 2021-09-28 18:17:04:245 +0000] [main] INFO <snip> -            splunk.profiler.tlab.enabled : false
   [otel.javaagent 2021-09-28 18:17:04:246 +0000] [main] INFO <snip> -   splunk.profiler.period.jdk.threaddump : null
   [otel.javaagent 2021-09-28 18:17:04:246 +0000] [main] INFO <snip> - -----------------------

JFR is not available error
-----------------------------------------------

If your Java Virtual Machine does not support Java Flight Recording (JFR), the profiler logs a warning at startup with the message ``Java Flight Recorder (JFR) is not available in this JVM. Profiling is disabled.``. 

To use the profiler, upgrade your JVM version to 8u262 and higher. See :ref:`java-otel-requirements`.

.. _access-denied-java-error:

Access denied error
--------------------------------------------------

If your Java runtime has Java Security Manager (JSM) activated, the following error might appear:

.. code-block:: bash

   java.security.AccessControlException: access denied ("java.util.PropertyPermission" "otel.javaagent.debug" "read")

To fix this, deactivate JSM or add the following block to the JSM policy file:

.. code-block:: java 

   grant codeBase "file:<path to splunk-otel-java.jar>" {
      permission java.security.AllPermission;
   };

AlwaysOn Profiling data and logs don't appear in Splunk Observability Cloud
----------------------------------------------------------------------------

Collector configuration issues might prevent AlwaysOn Profiling data and logs from appearing in Splunk Observability Cloud.

To solve this issue, do the following:

- Find the value of ``splunk.profiler.logs-endpoint`` and ``otel.exporter.otlp.endpoint`` in the startup log messages. Check that a collector is running using that endpoint and that the application host or container can resolve any host names and connect to the OTLP port.
- Make sure that you're running the Splunk Distribution of OpenTelemetry Collector and that the version is 0.34 and higher. Other collector distributions might not be able to route the log data that contains profiling data.
- A custom configuration might override settings that let the collector handle profiling data. Make sure to configure an ``otlp`` receiver and a ``splunk_hec`` exporter with correct token and endpoint fields. The ``profiling`` pipeline must use the OTLP receiver and Splunk HEC exporter you've configured. See :ref:`splunk-hec-exporter` for more information.

The following snippet contains a sample ``profiling`` pipeline:

.. code-block:: yaml

   receivers:
     otlp:
       protocols:
         grpc:

   exporters:
     # Profiling
     splunk_hec/profiling:
       token: "${SPLUNK_ACCESS_TOKEN}"
       endpoint: "${SPLUNK_INGEST_URL}/v1/log"
       log_data_enabled: false

   processors:
     batch:
     memory_limiter:
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}

   service:
     pipelines:
       logs/profiling:
         receivers: [otlp]
         processors: [memory_limiter, batch]
         exporters: [splunk_hec, splunk_hec/profiling]

.. _disable-java-agent-logs:

Deactivate all Java agent logs
============================================================

By default, the Splunk Java agent outputs logs to the console. In certain situations you might want to silence the output of the agent so as not to clutter the system logs. 

To run the Java agent in silent mode, add the following argument:

.. code-block:: bash
   
   -Dotel.javaagent.logging=none

.. include:: /_includes/troubleshooting-steps.rst
