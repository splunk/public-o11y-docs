.. _discovery-kubernetes:

************************************************************************
Automatic discovery and configuration for Kubernetes
************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for Kubernetes environments. Deploy automatic discovery to automatically find applications running in your environment and send data from them to Splunk Observability Cloud.

.. toctree::
    :hidden:

    Language runtimes <k8s/k8s-backend>
    Third-party applications <k8s/k8s-third-party>
    Advanced customization <k8s/k8s-advanced-config>

Automatic discovery and configuration for Kubernetes automatically finds applications running in your Kubernetes environments and captures telemetry data from them. The Splunk Distribution of OpenTelemetry Collector receives this data and sends it to Splunk Observability Cloud.

Using automatic discovery, you don't have to manually instrument or configure your applications before deploying them. 

.. raw:: html

    <h2>Get started</h2>

Automatic discovery for Kubernetes supports both back-end applications (such as Java and Node.js) as well as third-party applications (such as databases, web servers, and message queues).

To use automatic discovery for back-end applications, see :ref:`k8s-backend-auto-discovery`. 

To use automatic discovery with third-party applications, see :ref:`k8s-third-party`.