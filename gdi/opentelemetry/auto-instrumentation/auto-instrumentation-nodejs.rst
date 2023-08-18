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

.. include:: /_includes/gdi/zero-conf-reqs.rst

.. raw:: html

    <embed>
        <h2>Key Concepts</h2>
    </embed>

Zero Config Auto Instrumentation is available on Kubernetes and Linux using Splunk OpenTelemetry JS.
When you activate Zero Config, Splunk OpenTelemetry JS automatically instruments all Node.js applications 
running in the target environment. 

On Linux, the target environment is the entire Linux host, so the JS agent instruments every Node.js application on the host.

On Kubernetes, the target environment is the deployment or pod where you activated instrumentation. The JS agent instruments every Node.js application within the pod or deployment.

In both cases you must restart the applications to start instrumentation.

.. raw:: html

    <embed>
        <h2>Install Zero Config Auto Instrumentation</h2>
    </embed>

Follow instructions from the following list:

- :ref:`Install Zero Configuration Auto Instrumentation on Linux <auto-instrumentation-nodejs-linux>`
- :ref:`Install Zero Configuration Auto Instrumentation on Kubernetes <auto-instrumentation-nodejs-k8s>`

.. raw:: html

    <embed>
        <h2>Learn more</h2>
    </embed>
