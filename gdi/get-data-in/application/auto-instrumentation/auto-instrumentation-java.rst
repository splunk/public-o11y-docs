.. include:: /_includes/gdi/zero-config-preview-header.rst


.. _auto-instrumentation-java:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation for Java
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Application Performance Monitoring (APM) without altering your code.

.. toctree::
   :hidden:

   Linux <auto-instrumentation-java-linux>
   Kubernetes <auto-instrumentation-java-k8s>

Splunk OpenTelemetry (OTel) Zero Configuration Auto Instrumentation for Java automatically instruments supported Java libraries in running applications to capture distributed traces. The Splunk OpenTelemetry Collector receives the distributed traces and forwards them to Splunk Application Performance Monitoring (APM) in Splunk Observability Cloud. 

This feature provides the following benefits:

- You don't need to configure or manually instrument your applications before deployment if your Java applications use any of the supported libraries.
- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.

.. _auto-instrumentation-java-prereqs:

Prerequisites
==============================

.. include:: /_includes/gdi/zero-conf-reqs.rst


Limitations of Zero Configuration Automatic Instrumentation
-------------------------------------------------------------

Zero Configuration Automatic Instrumentation does not support the following features:

- Collecting host metrics
- :ref:`Collecting application and JVM metrics<java-otel-metrics-attributes>`
- :ref:`AlwaysOn Profiling<profiling-intro>`

To use one or more of these features, you must :ref:`manually instrument your Java application<instrument-java-applications>`.

.. _zero-conf-intro:

Key Concepts
=========================================================


Zero Config Auto Instrumentation is available on Kubernetes and Linux, and uses the Splunk OTel Collector and OTel Java agent. 

When you enable Zero Config, the Splunk OTel Java agent automatically instruments all Java applications running in the target environment. 

On **Linux**, the target environment is the entire Linux host, so the Java agent instruments every Java application on the host. 

On **Kubernetes**, the target environment is the Deployment or Pod where you enabled instrumentation. The Java agent instruments every Java application within the pod or deployment.

In both cases you must restart the applications to start instrumentation.


.. _auto-instrumentation-java-install:

Install Zero Configuration Auto Instrumentation
=========================================================

Follow the appropriate instructions from the following list:

- :ref:`Install Zero Configuration Auto Instrumentation on Linux <auto-instrumentation-java-linux>`
- :ref:`Install Zero Configuration Auto Instrumentation on Kubernetes <auto-instrumentation-java-k8s>`


.. _auto-instrumentation-java-more:

Learn more
=======================

- Instrumentation sends trace data to Splunk APM. Learn :ref:`what you can do with Splunk APM <wcidw-apm>`.
- Learn more about the :ref:`features of the Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`.
- :ref:`java-otel-performance`.
