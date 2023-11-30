

.. _zero-config:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

.. toctree::
   :hidden:

   Java <auto-instrumentation/auto-instrumentation-java>
   .NET <auto-instrumentation/auto-instrumentation-dotnet>
   Node.js <auto-instrumentation/auto-instrumentation-nodejs>

Splunk OpenTelemetry Zero Configuration Auto Instrumentation automatically instruments your back-end applications and services to capture and report distributed traces and metrics to the Splunk Distribution of OpenTelemetry Collector, and then on to Splunk APM.

The following diagram demonstrates the process of manually instrumenting your applications:

.. mermaid::
   
   flowchart TB

      accTitle: Manual instrumentation process diagram
      accDescr: Step one. Install the Splunk Distribution of OpenTelemetry Collector for your integration. Step two. Follow guided setup instructions to configure your environment. Step three. Deploy the Collector. Step four. Run your application.

      subgraph "Manual instrumentation"
      A["Connect to your cloud environment"]

      B["Deploy the Splunk Distribution of \n OpenTelemetry Collector in your environment"]

      C["Deploy language-specific components \n to each service"]

      D["Run your application"]

      A --> B --> C --> D
      end
   
The following diagram demonstrates the process of using zero config auto instrumentation to instrument your applications: 

.. mermaid::
   
   flowchart TB

      accTitle: Zero configuration auto instrumentation process diagram
      accDescr: Step one. Install the zero config package for your application. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

      subgraph "Zero configuration auto instrumentation"

      X["Connect to your cloud environment"]

      Y["Deploy the Splunk Distribution \n of OpenTelemetry Collector in your environment"]

      Z["Run your application"]
      
      X --> Y --> Z
      end


The Zero Configuration packages provide the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your back-end services or applications before deployment.

Zero Configuration Auto Instrumentation is available for Java, .NET, and Node.js applications.

.. list-table::
   :header-rows: 1
   :width: 60%
   :widths: 15 15 15 15

   * - Application/language
     - Supported for Linux
     - Supported for Windows
     - Supported for Kubernetes
   * - Java
     - Yes
     - No
     - Yes
   * - .NET
     - Yes
     - Yes
     - Yes
   * - Node.js
     - In preview
     - No
     - In preview

To get started with automatic instrumentation for your applications, see the following pages:

- :ref:`auto-instrumentation-java`
- :ref:`auto-instrumentation-dotnet`
- :ref:`auto-instrumentation-nodejs`

