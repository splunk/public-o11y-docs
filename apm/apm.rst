.. _apm:

*****************
Set up Splunk APM
*****************

.. meta::
   :description: Get started monitoring applications with the Splunk Observability Cloud.

Monitor traces from your distributed applications with Splunk APM. A trace is a collection of actions, or spans, that occur to complete a transaction. You can use trace data to analyze application performance, alert on metrics for trace data, and correlate trace data with logs and other resources.

For an example that shows you how to identify the root cause of issues with APM, see :ref:`Example APM root cause investigation <apm-find-root-cause>`.

For an overview of important terms and concepts in Splunk APM, see :ref:`APM terms and concepts <apm-terms-concepts>`.

The following sections describe how to start exporting trace data to APM and analyzing application performance.


Step 1. Collect application data with an OpenTelemetry Collector
================================================================
As a first step to collecting data from your application, you should deploy the OTel Collector. This will allow you to export spans and traces from Kubernetes, Linux, and Windows hosts and containers to Observability Cloud.

To collect spans and traces from an infrastructure resource, select :strong:`Navigation menu > Data setup` and search for the host type or containerized environment you want to collect spans and traces from.

Use the ``environment`` span tag to filter services by environment and easily monitor multiple environments separately. 
 
See these pages for more information about sending host or container data to Observability Cloud:

- :ref:`Collect Kubernetes data <get-started-k8s>`
- :ref:`Collect Linux host data<get-started-linux>`
- :ref:`Collect Windows host data<get-started-windows>`


Step 2. Instrument your applications
====================================
Observability Cloud provides supported integrations that instrument services running supported programming languages. Each integration deploys a Splunk distribution of OpenTelemetry instrumentation based on the service’s language. If you did not deploy an OpenTelemetry Collector on the host or in the Kubernetes cluster the service is running in, do that first.

Next, you can export spans to an OpenTelemetry Collector running on the host or in the Kubernetes cluster that you deployed in the previous step. How you specify the OpenTelemetry Collector endpoint depends on the language you are instrumenting. For more information, see the page for the language you are instrumenting in the list below.

To collect spans and traces from a service, select :strong:`Navigation menu > Data setup` and search for an instrumentation library for the service you want to instrument.

See the following pages to learn how to instrument a service or application running in each of these languages: 

- :ref:`Java <get-started-java>`
- :ref:`.Net <get-started-dotnet>`
- :ref:`NodeJS <get-started-nodejs>` 
- :ref:`Python <get-started-python>`
- :ref:`Ruby <get-started-ruby>`
- :ref:`PHP <get-started-php>`

.. commenting out go and webapp because they will not be documented for GA.
.. - :ref:`go <get-started-go>`
.. - :ref:`webapp <get-started-webapp>`


Step 3. Verify that your data is coming in
=============================================================
Once you have instrumented your integrations, select :strong:`Observability > APM` and check that you can see your application data in the dashboard. 

If your data is not appearing in Splunk APM as you expect, see :ref:`Troubleshoot your instrumentation <instr-troubleshooting>`.


Step 4. Start monitoring and troubleshooting your applications
==============================================================
Break down service performance by indexing span tags. You can use span tags to generate custom request, error, and duration (RED) metrics for services. RED metrics for indexed span tags are known as Troubleshooting MetricSets. By indexing span tags to generate Troubleshooting MetricSets, you can analyze service performance by specific characteristics and attributes of each service. To set up span tags, see :ref:`Analyze service performance with span tags <apm-span-tags>`.

You can also correlate related traces to monitor and troubleshoot the collections of traces that make up end-to-end transactions in your system. To learn more about Business Workflows, see :ref:`Correlate traces to track workflows <apm-workflows>`. 
 