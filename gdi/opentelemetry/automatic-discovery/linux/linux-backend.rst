.. _linux-backend-auto-discovery:

*****************************************************************************
Automatic discovery and configuration for back-end applications in Linux
*****************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for back-end applications in Linux environments.

.. toctree::
    :hidden:

    Java <auto-instrumentation-java-linux>
    Node.js <auto-instrumentation-nodejs-linux>
    Advanced configuration <linux-advanced-config>

When using automatic discovery and configuration, the Splunk Distribution of OpenTelemetry Collector automatically detects back-end applications running in your Linux environment. 

By deploying the Collector with automatic discovery, you can instrument applications and send data to Splunk Observability Cloud without editing your application's code or configuring files.

Automatic discovery for Linux can detect and configure the following applications and language runtimes:

* Java
* Node.js

.. raw:: html

    <h2>How does it work?</h2>

Automatic discovery for Linux operates as a mode of the Splunk Distribution of OpenTelemetry Collector. You install and activate automatic discovery for the Collector by using the Linux installer script or package manager. During installation, you can specify the types of language runtimes you want the Collector to detect. 

After installation, the Collector runs in your Linux environment and listens for requests to your applications. When the Collector detects activity, it gathers telemetry data from your application runtime and sends this data to Splunk Application Performance Monitoring (APM).

.. raw:: html

    <h2>Requirements</h2>

You need the following components to use automatic discovery for back-end Linux applications:

* ``systemd``
* ``curl``
* ``sudo``

.. raw:: html

    <h2>Get started</h2>

To get started with automatic discovery in Linux, see the guides for the application or language runtime that you want to gather data from:

* Java: :ref:`auto-instrumentation-java-linux`
* .NET: :ref:`auto-instrumentation-dotnet-linux`
* Node.js: :ref:`auto-instrumentation-nodejs-linux`

For a guide showing advanced customization options for Linux, see :ref:`linux-advanced-auto-discovery-config`.

    