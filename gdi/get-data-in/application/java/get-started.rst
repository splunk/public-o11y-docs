.. _get-started-java:

************************************************************
Instrument Java applications for Splunk Observability Cloud
************************************************************

.. meta::
   :description: Instrument Java applications automatically to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Requirements <java-otel-requirements>
   Instrument a Java application <instrumentation/instrument-java-application>
   Instructions for app servers <instrumentation/java-servers-instructions>
   Metrics and attributes <configuration/java-otel-metrics-attributes>
   Connect trace data with logs <instrumentation/connect-traces-logs>
   Configure the Java agent <configuration/advanced-java-otel-configuration>
   Manual instrumentation <instrumentation/java-manual-instrumentation>
   Performance overhead <performance>
   Troubleshoot the Java agent <troubleshooting/common-java-troubleshooting>
   About Splunk OTel Java <splunk-java-otel-distribution>
   Migrate from SignalFx Java agent <troubleshooting/migrate-signalfx-java-agent-to-otel>

The Splunk Distribution of OpenTelemetry Java provides a Java Virtual Machine (JVM) agent that automatically adds APM instrumentation to your Java application or service. The instrumentation captures distributed traces and sends them to Splunk Observability Cloud. For more information, see :ref:`splunk-java-otel-dist`.

To instrument your Java application, follow these steps:

#. Check compatibility and requirements. See :ref:`java-otel-requirements`.
#. Instrument your Java application. See :ref:`instrument-java-applications`.
#. Configure your instrumentation. See :ref:`configure-java-instrumentation`.

You can also automatically instrument your Java applications along with the Splunk Distribution of OpenTelemetry Collector installation. Automatic instrumentation removes the need to install and configure the Java agent separately. See :ref:`auto-instrumentation-java` for the installation instructions.

.. note:: The SignalFx Java Agent is deprecated and will reach End of Support on December 17th, 2022. To migrate to the Splunk Distribution of OpenTelemetry Java, see :ref:`migrate-signalfx-java-agent-to-otel`.

