.. _discovery-linux:

************************************************************************
Automatic discovery and configuration for Linux
************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for Linux environments. Deploy automatic discovery to automatically find applications running in your Linux environment and send data from them to Splunk Observability Cloud.

.. toctree::
    :hidden:

    Language runtimes <linux/linux-backend>
    Third-party applications <linux/linux-third-party>
    Advanced customization <linux/linux-advanced-config>

Automatic discovery and configuration for Linux automatically finds applications running in your Linux environment and captures telemetry data from them. The Splunk Distribution of OpenTelemetry Collector receives this data and sends it to Splunk Observability Cloud.

Using automatic discovery, you don't have to manually instrument or configure your applications before deploying them. 

.. raw:: html

    <h2>Get started</h2>

Automatic discovery for Linux supports both back-end applications (such as Java and Node.js) as well as third-party applications (such as databases, web servers, and message queues).

To use automatic discovery for back-end applications, see :ref:`linux-backend-auto-discovery`. 

To use automatic discovery with third-party applications, see :ref:`linux-third-party`.