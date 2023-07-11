.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-java:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation for Java
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

.. toctree::
   :hidden:

   Linux <auto-instrumentation-java-linux>
   Kubernetes <auto-instrumentation-java-k8s>
   Kubernetes Operator <auto-instrumentation-java-operator>

Splunk OpenTelemetry (OTel) Zero Configuration Auto Instrumentation for Java automatically instruments supported Java libraries in running applications to capture distributed traces. The Splunk OpenTelemetry Collector receives the distributed traces and forwards them to Splunk Application Performance Monitoring (APM) in Splunk Observability Cloud. 

This feature provides the following benefits:

- You don't need to configure or manually instrument your applications before deployment if your Java applications use any of the supported libraries.
- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.

.. raw:: html

  <embed>
    <h2>Prerequisites</h2>
  </embed>

.. include:: /_includes/gdi/zero-conf-reqs.rst

.. raw:: html

  <embed>
    <h2>Key Concepts</h2>
  </embed>

Zero Config Auto Instrumentation is available on Kubernetes and Linux using the Splunk OTel Collector and OTel Java agent. When you activate Zero Config, the Splunk OTel Java agent automatically instruments all Java applications running in the target environment. 

On **Linux**, the target environment is the entire Linux host, so the Java agent instruments every Java application on the host. 

On **Kubernetes**, the target environment is the deployment or pod where you activated instrumentation. The Java agent instruments every Java application within the pod or deployment. 

In both cases you must restart the applications to start instrumentation.

.. note:: You can also use the Kubernetes Operator for Auto Instrumentation. See an example in :ref:`Scenario: Deploy the OpenTelemetry Operator and Java auto-instrumentation <auto-instrumentation-java-operator>`.

.. raw:: html

  <embed>
    <h2>Install Zero Configuration Auto Instrumentation</h2>
  </embed>

Follow the instructions from the following list:

- :ref:`Install Zero Configuration Auto Instrumentation on Linux <auto-instrumentation-java-linux>`
- :ref:`Install Zero Configuration Auto Instrumentation on Kubernetes <auto-instrumentation-java-k8s>`

.. raw:: html

  <embed>
    <h2>Learn more</h2>
  </embed>

- Instrumentation sends trace data to Splunk APM. Learn :ref:`what you can do with Splunk APM <wcidw-apm>`.
- Learn more about the :ref:`features of the Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`.
- :ref:`java-otel-performance`.
