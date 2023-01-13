.. _get-started-apm:

************************************************************************
Introduction to Splunk APM
************************************************************************

.. meta::
  :description: Get started monitoring applications with Splunk Observability Cloud.

What is Splunk APM?
=========================================

Collect :ref:`traces and spans<apm-traces-spans>` to monitor your distributed applications with Splunk Application Performance Monitoring (APM). A trace is a collection of actions, or spans, that occur to complete a transaction. Splunk APM collects and analyzes every span and trace from each of the services that you have connected to Splunk Observability Cloud to give you full-fidelity access to all of your application data.

For an interactive walkthrough of Splunk APM, see :new-page:`APM Scenarios <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-walkthrough&version=current>`.

Get your data into Splunk APM
======================================

To start using APM, see :ref:`Set up Splunk APM <apm>`.

If you have already instrumented your applications but are not seeing your data coming into APM as you expect, see :ref:`Troubleshoot your instrumentation <instr-troubleshooting>`.

For information about Splunk APM use cases, see :ref:`apm-use-cases-intro`.

To see an example of using Splunk Observability Cloud components together, see :ref:`get-started-use-case`.

.. _wcidw-apm:

What can you do with Splunk APM?
=========================================

The following table provides an overview of what you can do with Splunk APM:

.. list-table::
  :header-rows: 1
  :widths: 50, 22, 28

  * - :strong:`Do this`
    - :strong:`With this tool`
    - :strong:`Link to documentation`

  * -  Start to gain insights from your data in minutes using default landing page and service dashboards.
    - Landing page
    - :ref:`Understand the landing page <apm-landing-page>`

  * - View all of your services and their dependency relationships in the service map.
    - Service map
    - :ref:`Explore the service map <apm-service-map>`

  * - Get a top-down view of your services that provides the request and error rate or latency by each of your indexed span tags in Tag Spotlight. For instance, you can see at a glance how your services are performing by ``endpoint``, ``environment``, or ``span.kind``. You can filter this view by environments, services, Business Workflows, or span tags for a finer-grained look.
    - Tag Spotlight
    - :ref:`apm-tag-spotlight`

  * - Index additional span tags to break down and analyze application performance along any dimension, so that you can customize views like Tag Spotlight to your particular needs.
    - Span tags
    - :ref:`apm-add-context-trace-span`

  * - Use built-in dashboards to assess service, endpoint, and Business Workflow system health at a glance.
    - Built-in dashboards
    - :ref:`built-in-dashboards`

  * - Search all traces from all of your systems, with no sampling, so you can be confident the specific trace you need to resolve an edge cases is retained.
    - Trace Analyzer
    - :ref:`apm-traces-spans`

  * - Use detectors to alert with custom alert, request, and duration (RED) metrics to monitor error rate and latency across all of your services.
    - Detectors and alerts
    - :ref:`Detectors and alerts<apm-alerts>`

  * - Correlate traces that make up end-to-end transactions in your system to monitor the workflows you care about most
    - Business Workflows
    - :ref:`apm-workflows`

  * - Jump between components of Splunk Observability Cloud by clicking related data
    - Related Content
    - :ref:`get-started-relatedcontent`

  * - Dynamically link Splunk APM properties to relevant resources
    - Global data links
    - :ref:`apm-data-links`
