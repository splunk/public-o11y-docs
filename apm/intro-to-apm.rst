.. _get-started-apm:

Introduction to Splunk APM
************************************************************************

.. meta::
  :description: Get started monitoring applications with Splunk APM in Splunk Observability Cloud.

Collect :ref:`traces and spans<apm-traces-spans>` to monitor your distributed applications with Splunk Application Performance Monitoring (APM). A trace is a collection of actions, or spans, that occur to complete a transaction. Splunk APM collects and analyzes every span and trace from each of the services that you have connected to Splunk Observability Cloud to give you full-fidelity access to all of your application data.

For an interactive walkthrough of Splunk APM, see :new-page:`APM Scenarios <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-walkthrough&version=current>`.

Get your data into Splunk APM
======================================

To start using APM, see :ref:`Set up Splunk APM <apm>`.

If you have already instrumented your applications but are not seeing your data coming into APM as you expect, see :ref:`Troubleshoot your instrumentation <instr-troubleshooting>`.

For information about Splunk APM scenarios, see :ref:`apm-scenarios-intro`.

To see an example of using Splunk Observability Cloud components together, see :ref:`get-started-scenario`.

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

  * - View all of your services and their dependency relationships in the service map.
    - Service map
    - :ref:`Explore the service map <apm-service-map>`

  * - Monitor endpoints in your services using Endpoint Performance. Using the filter, sort, and compare functionality within Endpoint Performance, you can quickly isolate endpoints with increased requests, errors, or duration that impact your services’ performance.
    - Endpoint performance
    - :ref:`apm-scenario-endpoint-performance`

  * - Monitor the impact of your database queries on service availability to identify long-running, unoptimized, or heavy queries and mitigate issues they might be causing.
    - Database Query Performance
    - * :ref:`redis-scenario`
      * :ref:`db-perf-scenario`

  * - Get visibility into code-level performance using AlwaysOn Profiling, a feature of Splunk APM. AlwaysOn Profiling takes CPU and memory snapshots from runtime environments to contextualize spans and traces produced by instrumented applications.
    - AlwaysOn Profiling
    - :ref:`profiling-scenario-landingpage`

  * - Use autodetect to alert on sudden changes in your request, error and duration (RED) metrics to stay on top of your services' performance. Use custom detectors to alert with custom error and duration metrics.
    - Detectors and alerts
    - :ref:`Detectors and alerts<apm-alerts>`

  * - Index span tags to break down and analyze application performance along any dimension, so that you can customize views like Tag Spotlight to your particular needs.
    - Span tags
    - :ref:`apm-add-context-trace-span`

  * - View the request and error rate or latency of your services by each of your indexed span tags in Tag Spotlight. For instance, you can see at a glance how your services are performing by ``endpoint``, ``environment``, or ``span.kind`` in Tag Spotlight. Filter this view by environments, services, Business Workflows, or span tags for a finer-grained look.
    - Tag Spotlight
    - :ref:`apm-tag-spotlight`

  * - Search and filter full-fidelity trace data to troubleshoot issues. Run ad-hoc aggregations on trace data to identify problems across any tag or attribute. View patterns in your traces to understand how latency or errors impact specific customer groups.
    - Trace Analyzer
    - :ref:`trace-analyzer`

  * - Correlate traces that make up end-to-end transactions in your system to monitor the workflows you care about most.
    - Business Workflows
    - :ref:`apm-workflows`

  * - Use built-in dashboards to assess service, endpoint, and system health at a glance.
    - Built-in dashboards
    - :ref:`built-in-dashboards`
