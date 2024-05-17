.. _correlate-traces-with-logs-java:

****************************************************************
Connect Java trace data with logs for Splunk Observability Cloud
****************************************************************

.. meta::
   :description: The agent from the Splunk Distribution of OpenTelemetry Java automatically annotates application logs with trace ID, span ID, and flags. The agent then sends the logs to Splunk Observability Cloud through the Collector.

The agent from the Splunk Distribution of OpenTelemetry Java automtically annotates application logs with trace ID, span ID, and flags. The agent then sends the logs to Splunk Observability Cloud through the OpenTelemetry Collector.

If needed, you can configure your Java logging library to produce logs that include additional attributes provided automatically by the Splunk OTel Java agent, like the version of your service or the deployment environment.

.. note::

   Logs export to Splunk Observability Cloud requires the Splunk Distribution of OpenTelemetry Collector 2.0 or higher.

.. _java-traces-logs-requirements:

Check compatibility and requirements
====================================================

The Splunk OTel Java agent supports the following logging libraries:

- Log4j 2 2.7 and higher
- Log4j 1 1.2 and higher
- Logback 1.0 and higher
- JBoss LogManager 1.1.0 and higher

The ``java.util.logging`` library is fully supported in all JDK versions that are compatible with the Splunk Distribution of OpenTelemetry Java. See :ref:`java-otel-requirements`.

.. _java-include-trace-data:

Trace metadata in log statements
===================================================

The Splunk OTel Java agent automatically add the following attributes for logging libraries by default:

- Trace information: ``trace_id`` and ``span_id``
- Trace flags

The Collector sends the annotated logs through the OTLP exporter.


Deactivate logs export
==================================

To turn off logs export to Splunk Observability Cloud, set the ``OTEL_LOGS_EXPORTER`` environment variable or the ``otel.logs.exporter`` system property to ``none``.


.. _inject-resource-attribs:

Inject resource attributes
==================================================

While the Java agent automatically generates and send logs through the Collector, you can still produce annotated logs using a compatible log library, so that logs can be collected manually or go through the Universal Forwarder. See :ref:`logs-intro-logconnect`.

For example, you can inject resource attributes in your log statements, such as ``service.name`` and ``deployment.environment``. This requires defining the attributes you want to inject and configuring your logger manually.

Define the resource attributes
---------------------------------------------------

Before injecting attributes, you must make them available through the Mapped Diagnostic Context (MDC) by setting the ``mdc.resource-attributes`` property at runtime. For example:

.. code-block:: shell

   -Dotel.instrumentation.common.mdc.resource-attributes=service.name,environment

Configure your logging library
--------------------------------------------------

The Splunk Distribution of OpenTelemetry Java exposes resource attributes as context properties, which you can use to configure logger libraries.

The following examples show how to include additional metadata in log statements produced by the logging library:

.. tabs::

   .. tab:: Log4j

      Edit your Log4j configuration, for example in the ``src/main/resources/log4j2.xml`` file. Depending on your environment, you might have to edit a different file or use a different configuration system.

      .. code-block:: xml
         :emphasize-lines: 8,9

         <?xml version="1.0" encoding="UTF-8"?>
         <Configuration status="WARN">
            <Appenders>
               <Console name="STDOUT" target="SYSTEM_OUT">
                  <JsonLayout compact="true" eventEol="true">
                     <KeyValuePair key="trace_id" value="${ctx:trace_id}"/>
                     <KeyValuePair key="span_id" value="${ctx:span_id}"/>
                     <KeyValuePair key="service.name" value="${ctx:service.name}"/>
                     <KeyValuePair key="environment" value="${ctx:environment}"/>
                     <KeyValuePair key="trace_sampled" value="${ctx:trace_flags}"/>
                  </JsonLayout>
               </Console>
            </Appenders>
            <!-- More configuration -->
         </Configuration>

      For Spring Boot applications, you can also edit the ``application.properties`` file to add the following logging pattern:

      .. code-block:: text

         logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg trace_id=%X{trace_id} span_id=%X{span_id} service=%X{service.name}, env=%X{environment} trace_flags=%X{trace_flags} %n

   .. tab:: Logback

      Edit your Logback configuration, for example in the ``src/main/resources/logback.xml`` file. Depending on your environment, you might have to edit a different file or use a different configuration system.

      .. code-block:: xml
         :emphasize-lines: 6

         <?xml version="1.0" encoding="UTF-8"?>
         <configuration>
            <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
               <encoder>
                  <pattern>%d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg trace_id=%X{trace_id} span_id=%X{span_id} service=%X{service.name}, env=%X{environment} trace_flags=%X{trace_flags} %n</pattern>
               </encoder>
            </appender>
            <root level="info">
               <appender-ref ref="STDOUT" />
            </root>
         </configuration>

      For Spring Boot applications, you can also edit the ``application.properties`` file to add the following logging pattern:

      .. code-block:: text

         logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg %logger{36} - %msg trace_id=%X{trace_id} span_id=%X{span_id} service=%X{service.name}, env=%X{environment} trace_flags=%X{trace_flags} %n %n

   .. tab:: JBoss LogManager

      Edit your JBoss LogManager configuration, for example in the ``logging.properties`` file.

      .. code-block:: text

         formatter.PATTERN=org.jboss.logmanager.formatters.PatternFormatter
         formatter.PATTERN.properties=pattern
         formatter.PATTERN.constructorProperties=pattern
         formatter.PATTERN.pattern=%logger{36} - %msg trace_id=%X{trace_id} span_id=%X{span_id} service=%X{service.name}, env=%X{environment} trace_flags=%X{trace_flags}: %m%n

If you're instrumenting a serverless service or application, use environment variables instead. The deployment environment requires that you set an arbitrary environment variable, for example ``OTEL_ENV_NAME``.

.. tabs::

   .. code-tab:: xml Log4j

      <PatternLayout>
         <pattern>
            service.name=${OTEL_SERVICE_NAME}, deployment.environment=${OTEL_ENV_NAME} %m%n
         </pattern>
      </PatternLayout>

   .. code-tab:: xml Logback

      <pattern>
         service: ${OTEL_SERVICE_NAME}, env: ${OTEL_ENV_NAME}: %m%n
      </pattern>

   .. code-tab:: text JBoss LogManager

      formatter.PATTERN.pattern=service=${OTEL_SERVICE_NAME}, env=${OTEL_ENV_NAME}

