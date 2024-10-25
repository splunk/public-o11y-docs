.. _discovery-linux:

************************************************************************
Automatic discovery and instrumentation for Linux
************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and instrumentation for Linux environments. Deploy automatic discovery and instrumentation to automatically find services and applications running in your Linux environment and send data from them to Splunk Observability Cloud.

.. toctree::
    :hidden:

    Automatic instrumentation <linux/linux-backend>
    Automatic discovery <linux/linux-third-party>
    Advanced customization <linux/linux-advanced-config>

Automatic discovery and configuration for Linux automatically finds services running in your Linux environment and captures telemetry data from them. The Splunk Distribution of OpenTelemetry Collector receives this data and sends it to Splunk Observability Cloud.

Used alongside automatic instrumentation, you don't have to manually instrument or configure your applications before deploying them. 

.. raw:: html

    <h2>Get started</h2>

Automatic instrumentation for Linux supports back-end applications written in Java, Node.js, and .NET and automatic discovery supports third-party services such as databases, web servers, and message queues.

To use automatic instrumentation for back-end applications, see :ref:`linux-backend-auto-discovery`. 

To use automatic discovery and configuration with third-party applications, see :ref:`linux-third-party`.