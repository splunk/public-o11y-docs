.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-nodejs:

*************************************************************************
Splunk OpenTelemetry Zero Config Auto Instrumentation for Node.js
*************************************************************************

.. meta::
    Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

.. toctree::
    :hidden:

    Linux
    Kubernetes
    Windows

Splunk OpenTelemetry (OTel) Zero Configuration Auto Instrumentation for Node.js automatically instruments supported Node.js libraries in running applications to capture distributed traces. 
The Splunk OpenTelemetry Collector receives the distributed traces and forwards them to Splunk Application Performance Monitoring (APM) in Splunk Observability Cloud. 

This feature provides the following benefits:

- You don't need to configure or manually instrument your applications before deployment if your Node.js applications use any of the supported libraries.
- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.