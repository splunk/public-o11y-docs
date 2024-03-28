.. _k8s-backend:

********************************************************************************
Automatic discovery and configuration for back-end applications in Kubernetes
********************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for back-end applications and language runtimes in a Kubernetes environment.

.. toctree::
    :hidden:
    
    Java <auto-instrumentation-java-k8s>
    .NET <auto-instrumentation-dotnet-k8s>
    Node.js <auto-instrumentation-nodejs-k8s>

When using automatic discovery and configuration, the Splunk Distribution of OpenTelemetry Collector automatically detects back-end applications running in your Kubernetes environment. 

By deploying the Collector with automatic discovery, you can instrument applications and send data to Splunk Observability Cloud without editing your application's code or configuring files.

Automatic discovery for Kubernetes can detect and configure the following applications and language runtimes:

* Java
* .NET
* Node.js

.. raw:: html

    <h2>How does it work?</h2>

Automatic discovery for Kubernetes operates as a Kubernetes DaemonSet that you install with Helm. Using Helm, you can specify which language runtimes you want automatic discovery to find. After installation, Helm deploys a set of Kubernetes pods in your cluster, which includes the Splunk Distribution of OpenTelemetry Collector, the Kubernetes operator, and other supporting resources. 

The Collector and Kubernetes operator listen for requests to your application and gather telemetry data upon detecting activity in your application. The Collector then sends this data to Splunk Application Performance Monitoring (APM).

.. _get-started-auto-discovery-backend-k8s:

.. raw:: html

    <h2>Prerequisites</h2>

You need the following components to use automatic discovery for back-end Kubernetes applications:

* Helm version 3 or higher.
* Administrator access to your Kubernetes cluster and familiarity with your Kubernetes configuration.

.. raw:: html
    
    <h2>Get started</h2>

To get started with automatic discovery in Kubernetes, see the guides for the application or language runtime that you want to gather data from:

* Java: :ref:`auto-instrumentation-java-k8s`
* .NET: :ref:`auto-instrumentation-dotnet-k8s`
* Node.js: :ref:`auto-instrumentation-nodejs-k8s`

For a guide showing advanced customization options for Kubernetes, see :ref:`k8s-advanced-auto-discovery-config`.