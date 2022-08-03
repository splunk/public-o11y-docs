.. _get-started-java:

********************************
Instrument a Java application
********************************

.. meta::
   :description: Instrument a Java application to export metrics and spans to Splunk Observability Cloud.


The Splunk Distribution of OpenTelemetry Java Instrumentation provides a Java Virtual Machine (JVM) agent that automatically instruments your Java application to capture and report distributed traces to Splunk APM. The agent works with Java runtimes version 8 and higher and supports all JVM-based languages.

The Splunk distribution comes with the following defaults:

- B3 context propagation

- Jaeger-Thrift exporter configured to send spans to a locally running SignalFx Smart Agent

- Unlimited default limits for configuration options to support full-fidelity traces


Start the integration
========================

To start a Java integration, follow these steps:

1. In the Observability Cloud main menu, select :strong:`Data Setup`.

2. In the :strong:`CATEGORIES` menu, select :strong:`APM Instrumentation`.

3. Click :strong:`Java Tracing`.

4. Click :strong:`Add Connection`. The integration wizard appears.

5. Follow the steps in the wizard.

6. At the end of the wizard, the Review Inventory page shows a live view of your data flowing into the application. Click :strong:`Explore Service Spans` to interact with your data.


Lambda wrappers
==================

You can also instrument AWS Lambda functions with Java using SignalFx Lambda wrappers or instrumentation libraries. See :new-page:`SignalFx Java Lambda Wrapper <https://github.com/signalfx/lambda-java>` for more information.
