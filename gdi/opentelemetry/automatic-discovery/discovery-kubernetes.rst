.. _discovery-kubernetes:

************************************************************************
Automatic discovery and instrumentation for Kubernetes
************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and instrumentation for Kubernetes environments. Deploy automatic discovery and instrumentation to automatically find services and applications running in your environment and send data from them to Splunk Observability Cloud.

.. toctree::
    :hidden:

    Automatic instrumentation <k8s/k8s-backend>
    Automatic discovery <k8s/k8s-third-party>
    Advanced customization <k8s/k8s-advanced-config>
    k8s/k8s-java-traces-tutorial/about-k8s-java-traces-tutorial

Automatic discovery and configuration for Kubernetes automatically finds services running in your Kubernetes environments and captures telemetry data from them. The Splunk Distribution of the OpenTelemetry Collector receives this data and sends it to Splunk Observability Cloud.

Used alongside automatic instrumentation, you don't have to manually instrument or configure your applications before deploying them.

.. raw:: html

    <h2>Get started</h2>

Automatic instrumentation for Kubernetes supports back-end applications written in Java, Node.js, and .NET and automatic discovery supports third-party services such as databases and web servers.

To use automatic instrumentation for back-end applications, see :ref:`k8s-backend-auto-discovery`. 

To use automatic discovery and configuration with third-party services, see :ref:`k8s-third-party`.

For a walkthrough of how to use automatic instrumentation to instrument an application in a Kubernetees environment, see :ref:`k8s-advanced-auto-discovery-config`.