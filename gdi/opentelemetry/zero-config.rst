.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _zero-config:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

.. toctree::
   :hidden:

   Kubernetes Operator <auto-instrumentation/auto-instrumentation-operator>
   Java <auto-instrumentation/auto-instrumentation-java>
   .NET <auto-instrumentation/auto-instrumentation-dotnet>

Splunk OpenTelemetry Zero Configuration Auto Instrumentation provides several packages that automatically instrument your back-end applications and services to capture and report distributed traces and metrics to the Splunk Distribution of OpenTelemetry Collector, and then on to Splunk APM.

The Zero Configuration packages provide the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your back-end services or applications before deployment.

The following packages are available:

- :ref:`auto-instrumentation-java`
- :ref:`auto-instrumentation-dotnet`

.. note:: You can also install the Collector with the Kubernetes Operator for Auto Instrumentation. See :ref:`Install the Collector with the Kubernetes Operator <auto-instrumentation-operator>` for more information.


