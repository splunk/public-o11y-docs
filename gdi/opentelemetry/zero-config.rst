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

The following diagram demonstrates the process of manually instrumenting your applications compared to the process of using zero configuration auto instrumentation to instrument your applications:

.. mermaid::
   accTitle: Manual instrumentation process diagram
   accDescr: Step one. Install the Splunk Distribution of OpenTelemetry Collector for your integration. Step two. Follow guided setup instructions to configure your environment. Step three. Deploy the Collector. Step four. Run your application.

   flowchart TB
      subgraph "Manual instrumentation"
      A["Install the Splunk \n Distribution of
      OpenTelemetry Collector \n agent for your integration"]

      B["Follow guided setup instructions \n to configure your environment"]

      C["Deploy the Splunk Distribution of \n OpenTelemetry Collector"]

      D["Run your application"]

      A --> B --> C --> D
      end
   
.. mermaid::
   accTitle: Zero configuration auto instrumentation process diagram
   accDescr: Step one. Install the zero config package for your application. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

   flowchart TB
      subgraph "Zero configuration auto instrumentation"
      X["Install the zero-config package \n for your application"]
      Y["Ensure the Splunk Distribution of \nOpenTelemetry Collector
      is running"]
      Z["Run your application"]
      
      X --> Y --> Z
      end


The Zero Configuration packages provide the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your back-end services or applications before deployment.

The following packages are available:

- :ref:`auto-instrumentation-java`
- :ref:`auto-instrumentation-dotnet`

.. note:: You can also install the Collector with the Kubernetes Operator for Auto Instrumentation. See :ref:`Install the Collector with the Kubernetes Operator <auto-instrumentation-operator>` for more information.


