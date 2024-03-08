.. _phase2-apm:

Pilot part 2: Initial pilot rollout for Splunk Application Performance Monitoring
*****************************************************************************************

As with the Splunk Infrastructure Monitoring section, during this second part of the journey the focus is to bring into the system initial launching APM teams with a lot of microservices or connections to many services.


The rollout includes:

#. :ref:`Customize Splunk APM experience (index additional span tags, setup deployment environment) <customize-APM-exp>`
#. :ref:`service-perf-dashboards`
#. :ref:`dbquery-perf`
#. :ref:`bus-workflows`
#. :ref:`inferred-services`
#. :ref:`error-spans`
#. :ref:`service-map-dependencies`
#. :ref:`use-metricsets`
#. :ref:`tag-spotlight-values`
#. :ref:`apm-detectors`
#. :ref:`always-on-trouble`
#. :ref:`launch-apm`


.. _customize-APM-exp:

Customize Splunk APM experience
=========================================

Once the initial Splunk APM onboarding process has been completed, it is recommended that the teams familiarize themselves with customizing Splunk APM such as indexing additional span tags or enabling database query performance. It is very important to understand how to set up a deployment environment as this will allow data to not overlap with configurations in other deployment from similar applications.

* For details about indexing additional span tags, see :ref:`customize-apm`.
* For details about enableing database query performance, see :ref:`customize-apm`.
* For details about setting up a deployment environment, see :ref:`apm-environments`.


.. _service-perf-dashboards:

Understand how to track service performance dashboards
=============================================================

It is important to understand how to familiarize the Splunk APM built-in dashboards, this is important to help troubleshoot issues related to services, endpoints, business workflows and its underlying infrastructure in real time. Several key charts and dashboard within Splunk APM to pay attention to are the APM service dashboard, business workflows and Service map.

For details about troubleshooting issues related to services, endpoints, and more, see :ref:`apm-custom-dashboards`.

.. _dbquery-perf:

Utilize Database Query Performance
==================================================

To pinpoint the database that is causing slowness in your application and to see slow or frequently executed aggregate queries, with historical trends, teams should become familiar with Splunk APM Database Query Performance functionality. For details, see :ref:`db-query-performance`. 

Database query performance finds trends in aggregate database queries without the need of database instrumentation. This helps the SRE or service owner to know whether an increase in the latency or error rate of a service is related to a database. If it is, it can help identify which database and which specific query is contributing to the most latency and resolve it by involving the database administrator or the owner of the service that's making the slow database call. 

Another use case example: an SRE or Service Owner wants to see if the new release impacted anything, with regard to DB interactions. They would like a dashboard to determine whether a new release to a service had an impact on database interactions by examining the average query response time, the number of query executions, and the change in these values over time.

.. _bus-workflows:

Correlate traces to track Business workflows
======================================================

Utilizing Splunk APM Business workflows allow an easy way of grouping relevant traces based on their initiating operation, or any other tag or endpoint on a downstream service. For details, see :ref:`apm-workflows`. 

This is important in order to monitor end-to-end KPIs and find root causes and bottlenecks. Configuration for Splunk APM Business workflows are based on any service:operation or tag in the transaction path. Each trace can only belong to one Business workflow, so the rules in the configuration modal have priority ordering. For example, if a trace can match multiple rules only the highest priority rule will apply. For more information about naming conventions for tagging with OTel, refer to https://github.com/splunk/observability-workshop/blob/main/content/en/resources/otel_tagging.md.

For the service:endpoint naming rule, if a trace contains multiple endpoints of the service, the earliest service:endpoint span is used for the workflow name.

For the service, tag naming rules: 
* If the service appears in multiple spans within a trace with various values of the selected tag, the earliest occurrence is used for the workflow name.
* The tag has to be indexed to show up as an option to configure the name from.

Important considerations, like the trace level metrics or Business workflow Monitoring MetricSets are slightly slower than service and endpoint level ones which is the reason that you need to wait for the entire trace to complete before generating the metrics in order to ensure accuracy.

.. _inferred-services:

Understand the performance of inferred services
=====================================================

When a remote service may not have tracing enabled, for exampl e the code has not yet been instrumented or it is not available or possible,
 Splunk APM can infer the presence of these remote services. For a span to be evaluated for possible inferred services, it must have a KIND of CLIENT or PRODUCER. If a span is a CLIENT, it will check for possible HTTP, DATABASE, or CACHE remote service calls. If a span is a PRODUCER, it will check for PUBSUB remote calls.

For each type of inferred service, there are specific tags that are evaluated to determine the name of the remote service.
For a remote HTTP call, one of the tags listed in the table are required. They will be considered in the order listed here, and the first tag that is found will be used to determine the name of the remote service.

- For a remote DATABASE call, the db.instance tag is required. An additional tag, named db.type, can be added to the span to indicate the type of database being queried.
- For a remote PUBSUB queue, one of the tags listed in the table is required. An additional tag, named peer.service, can be added to the span to specify the logical service name of the message queue.

.. _error-spans:

Understand and analyze error spans
==========================================

There are several ways to identify error in a span by utilizing the following metadata tag: span.status, error, and http.status_code. You should understand the difference between errors and root cause errors. Error is when a span within a trace results in an error, but when the error consists of other spans in the trace, the originating error of the chain of error spans is the root cause error.

.. _service-map-dependencies:

Understand dependencies among services in the service map
================================================================

In a distributed environment, the complexity is in how services are stitched together. The Splunk APM service map enables users to understand how different services in their distributed environment interact with each other. 

You can identify the root cause error rate through the red dot on the service map for troubleshooting. It is recommended to familiarize yourself with the detailed breakdowns within the service map, understanding this will help accelerate exploration and troubleshooting of services and dependencies.

.. _use-metricsets:

Understand how to use MetricSets
=======================================

It is important to understand the two main MetricSets in Splunk APM, Monitoring MetricSets (MMS) used for real-time monitoring and Troubleshooting MetricSets (TMS) used for high-cardinality troubleshooting. 

Monitoring MetricSets is commonly used for monitoring and alerting, this is created out-of-the-box for combinations of service, endpoint and workflow. Each Monitoring MetricSets contains the following metrics: Request-Rate, Error-Rate and Latency: Min, Max, P50, P90, P99. MMS data is stored for 13 months by default.

Troubleshooting MetricSets is used for filtering service-graph and breaking down SLIs, historical comparison for spans/workflows. Troubleshooting MetricSets is created out-of-the-box for combinations of service, endpoint, workflow, edges, and operation. Each TMS contains the following metrics: Request-Rate, Error-Rate, Root-Cause Error-Rate, Latency: Min, Max, P50, P90, P99. TMS data is stored for 8 days by default along with full-fidelity traces.


.. _tag-spotlight-values:

Utilizing Tag Spotlight to analyze services using specific tag values to identify latency or error rate
===========================================================================================================

Use Tag Spotlight to quickly discover granular trends contributing to latency or errors on a service. Hone in on the latency/ error rate peak by drilling into top tags or specific tags and values without losing context, and jump into a representative trace when you are ready to dive deeper. Tag Spotlight is powered by Troubleshooting MetricSets (TMS) for faster troubleshooting. This feature can be used to understand the impact of issues across different user categories, environments, etc.

.. _apm-detectors:

Setup APM detectors
===========================

Splunk APM already has an out-of-the-box SLI dashboard that automatically captures RED (Request, Error, Duration) metrics for each service in your application. These can be useful to create dynamic alerts on those based on sudden change or historical anomalies. These are powered by Monitoring MetricSets (MMS). 

.. _always-on-trouble:

Understand how to troubleshoot using AlwaysOn Profiling
==============================================================

If AlwaysOn Profiling is enabled, here are some guides on how to troubleshoot this feature. Please note the supported OTel Collector version as it needs 0.44 and higher in order to enable AlwaysOn Profiling. 

.. _launch-apm:

Onboard launching production APM based application
=======================================================

For each of the teams, send traces to Splunk APM for production environment, make sure the teams learn what they can do with Splunk APM and customize the Splunk APM experience. The scenarios in :ref:`phase3` can help you with an interactive walkthrough of Splunk APM.

Next step
===============

:ref:`phase3`

