.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-nodejs:

*************************************************************************
Splunk OpenTelemetry Zero Config Auto Instrumentation for Node.js
*************************************************************************

.. meta::
    :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

.. toctree::
    :hidden:

    Linux <auto-instrumentation-nodejs-linux>
    Kubernetes <auto-instrumentation-nodejs-k8s>
    

Splunk OpenTelemetry (OTel) Zero Configuration Auto Instrumentation for Node.js automatically instruments supported Node.js libraries in running applications to capture distributed traces. 
The Splunk OpenTelemetry Collector receives the distributed traces and forwards them to Splunk Application Performance Monitoring (APM) in Splunk Observability Cloud. 

This feature provides the following benefits:

- You don't need to configure or manually instrument your applications before deployment if your Node.js applications use any of the supported libraries.
- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.

.. raw:: html

    <embed>
        <h2>Prerequisites</h2>
    </embed>

- Automatic instrumentation is only available for applications using supported Node.js libraries. See :ref:`nodes-requirements`. If your application isn't supported, manually instrument your service to generate trace data. See :ref:`nodejs-manual-instrumentation` .

- :ref:`nodejs-otel-requirements`.

- Your Splunk Observability Cloud realm and access token.

   - To get an access token, see :ref:`admin-api-access-tokens`.

   - To find the realm name of your account, open the navigation menu in Splunk Observability Cloud. Select :menuselection:`Settings`, and then select your username. The realm name appears in the :guilabel:`Organizations` section.

.. raw:: html

    <embed>
        <h2>Key Concepts</h2>
    </embed>

Zero Config Auto Instrumentation is available on Kubernetes and Linux using Splunk OpenTelemetry Node.js.
When you activate Zero Config, Splunk OpenTelemetry Node.js automatically instruments all Node.js applications 
running in the target environment. 

On Linux, the target environment is the entire Linux host, so the Node.js agent instruments every Node.js application on the host.

On Kubernetes, the target environment is the deployment or pod where you activated instrumentation. The Node.js agent instruments every Node.js application within the pod or deployment.

In both cases you must restart the applications to start instrumentation.

.. raw:: html

    <embed>
        <h2>Install Zero Config Auto Instrumentation</h2>
    </embed>

Follow instructions from the following list:

- :ref:`Install Zero Configuration Auto Instrumentation on Kubernetes <auto-instrumentation-nodejs-k8s>`
- :ref:`Install Zero Configuration Auto Instrumentation on Linux <auto-instrumentation-nodejs-linux>`
