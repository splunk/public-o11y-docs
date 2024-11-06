.. _discovery-windows:

************************************************************************
Automatic discovery and instrumentation for Windows
************************************************************************

.. meta:: 
    :description: Get started with automatic instrumentation for Windows environments. Deploy automatic instrumentation to automatically find applications running in your Windows environment and send data from them to Splunk Observability Cloud.

.. toctree::
    :hidden:

    Automatic instrumentation <windows/windows-backend>

Automatic discovery and configuration for Windows automatically finds services running in your Windows environment and captures telemetry data from them. The Splunk Distribution of the OpenTelemetry Collector receives this data and sends it to Splunk Observability Cloud.

Used alongside automatic instrumentation, you don't have to manually instrument or configure your applications before deploying them.

.. raw:: html

    <h2>Get started</h2>

Automatic instrumentation for Windows supports .NET language runtimes.

.. note::

   When deploying automatic instrumentation using automatic discovery, only .NET is supported. If you deploy automatic instrumentation independently of the Collector, Splunk Observability Cloud supports automatic instrumentation for eight back-end language runtimes. For more information, see :ref:`get-started-application`.

To use automatic instrumentation for back-end applications, see :ref:`windows-backend-auto-discovery`.