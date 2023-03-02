.. _splunk-java-otel-dist:

***************************************************
About the Splunk Distribution of OpenTelemetry Java
***************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Java is a wrapper for the OpenTelemetry Instrumentation for Java, an open source Java agent that dynamically injects bytecode to capture telemetry from many Java libraries and frameworks.

The Splunk Distribution of OpenTelemetry Java is a wrapper for the OpenTelemetry Instrumentation for Java, an open source Java agent that dynamically injects bytecode to capture telemetry data.

With the agent you can automatically instrument any application written in a Java Virtual Machine (JVM) language, like Java and Groovy. See :ref:`java-otel-requirements`). 

Features of the Splunk Distribution of OpenTelemetry Java
=========================================================

In addition to the features of the OpenTelemetry Instrumentation for Java, like bundled exporters and propagators, the agent provides additional custom features:

- Sends trace and span data to Splunk Observability Cloud using the OTel Collector..
- Collection of application and JVM metrics, which you can export to the Splunk Collector or Splunk ingest. See :ref:`java-otel-metrics`.
- AlwaysOn Profiling, which captures the call stack state for all JVM threads and sends them to Splunk Observability Cloud. See :ref:`profiling-intro` and :ref:`profiling-configuration-java`.
- Instrumentation for HTTP server frameworks that returns server trace information in HTTP responses. See :ref:`server-trace-information-java`.
- Collection of data about application servers, stored as server span attributes. See :ref:`webengine-attributes-java-otel`.
- Automatic injection of trace metadata into application logs. See :ref:`correlate-traces-with-logs-java`.

The agent of the Splunk Distribution of OpenTelemetry Java is supported by Splunk and is updated frequently, bringing bug fixes and new features to you before they are integrated in the upstream OTel repositories.

.. caution:: Use the Splunk Distribution of OpenTelemetry Java instead of the upstream OpenTelemetry instrumentation and OpenTelemetry SDK. Splunk supports only upstream OTel components as part of the Splunk Distribution of OpenTelemetry Java.

Release types
=========================================================

The Splunk Distribution of OpenTelemetry Java has two release channels: stable releases and snapshots.

Stable releases
---------------------------------------------------------

The stable version of the Splunk Distribution of OpenTelemetry Java is released every 4 weeks, within 5 working days of the OTel Java instrumentation release. Fast releases ensure that all new features and fixes coming from upstream are incorporated into the Splunk platform distribution.

To browse the release notes, see the :new-page:`changelog <https://github.com/signalfx/splunk-otel-java/blob/main/CHANGELOG.md>` on GitHub.

Snapshot releases
---------------------------------------------------------

Snapshot releases contain the latest fixes and features developed for Splunk Observability Cloud, so that you can test them without having to wait for the stable release.

To access the latest snapshot releases, see the Splunk Observability Cloud :new-page:`snapshot repository <https://oss.sonatype.org/content/repositories/snapshots/com/splunk/splunk-otel-javaagent/>`.

.. note:: Snapshot releases are not supported by Splunk. Use them only for testing new fixes and features before the stable release. 

Defaults of the Splunk Distribution of OpenTelemetry Java
=========================================================

The Splunk Distribution of OpenTelemetry Java has the following default settings for context propagation, exporters, and trace settings:

- W3C tracecontext and W3C baggage context propagation is activated by default. See :ref:`trace-propagation-configuration-java`.
- The OTLP gRPC exporter is configured by default to send spans to the local :ref:`Splunk OpenTelemetry
  Collector <otel-intro>`.
- Unlimited defaults for trace configuration to support full-fidelity tracing. See :ref:`trace-configuration-java`.

Performance overhead of the Splunk OTel Java agent
======================================================

The Splunk OTel Java Agent has minimal impact on system performance when instrumenting Java Virtual Machine (JVM) applications. See :ref:`java-otel-performance` for more information.

Support for previous versions
=========================================================

Splunk is committed to supporting all customers who use this distribution. All major versions of Splunk OpenTelemetry distributions receive critical patches for one year after the next major release. Splunk stops feature development on a major release after it introduces the next major release.

For more information on versioning of the Splunk Distribution of OpenTelemetry Java, see :new-page:`the versioning guidelines <https://github.com/signalfx/splunk-otel-java/blob/main/VERSIONING.md>` on GitHub.

How to contribute
=========================================================

The Splunk Distribution of OpenTelemetry Java is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-java/blob/main/CONTRIBUTING.md>` on GitHub.
