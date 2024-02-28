.. _phase2-apm:

Pilot phase part 3: Initial pilot rollout for Splunk Application Performance Monitoring
*****************************************************************************************

As with the Splunk Infrastructure Monitoring section,  during this second part of the journey the focus is to bring into the system initial launching APM teams with a lot of microservices or connections to many services.

30 - 60 Days: Infrastructure Monitoring
==============================================

The rollout includes:

#. Customize Splunk APM experience (index additional span tags, setup deployment environment)
#. Understand how to track service performance dashboards
#. Utilize Database Query Performance
#. Correlate traces to track Business Workflows
#. Understand the performance of inferred services
#. Understand and analyze error spans
#. Understand dependencies among services in the service map
#. Understand how to use MetricSets
#. Utilizing Tag Spotlight to analyze services using specific tag values to identify latency/ error rate
#. Set up APM detectors
#. Understand how to troubleshoot using AlwaysOn Profiling
#. Onboard launching production APM based application

Customize Splunk APM experience
--------------------------------

Once the initial Splunk APM onboarding process has been completed, it is recommended that the teams familiarize themselves with customizing Splunk APM such as indexing additional span tags or enabling database query performance. It is very important to understand how to set up a deployment environment as this will allow data to not overlap with configurations in other deployment from similar applications.

* For details about indexing additional span tags, see :ref:`https://docs.splunk.com/Observability/apm/set-up-apm/customize-apm.html#index-additional-span-tags`.
* For details about enableing database query performance, see :ref:`https://docs.splunk.com/Observability/apm/set-up-apm/customize-apm.html#enable-database-query-performance`.
* For details about setting up a deployment environment, see :ref:`https://docs.splunk.com/Observability/apm/set-up-apm/environments.html#setting-the-deployment-environment-span-tag`.


Understand how to track service performance dashboards
------------------------------------------------------------

It is important to understand how to familiarize the Splunk APM built-in dashboards, this is important to help troubleshoot issues related to services, endpoints, business workflows and its underlying infrastructure in real time. Several key charts and dashboard within Splunk APM to pay attention to are the APM Service dashboard, Business Workflows and Service Map.

For details about troubleshooting issues related to services, endpoints, and more, see :ref:`https://docs.splunk.com/Observability/apm/apm-alert-visualize/apm-dashboards.html#track-service-performance-using-dashboards-in-splunk-apm`.

Utilize Database Query Performance
---------------------------------------------

To pinpoint the database that is causing slowness in your application and to see slow or frequently executed aggregate queries, with historical trends, it is recommended that teams are familiar with Splunk APM Database Query Performance functionality. For details, see :ref: `https://docs.splunk.com/Observability/apm/db-query-perf/db-query-performance.html#db-query-performance`. 

Database Query Performance finds trends in aggregate database queries without the need of database instrumentation. This helps the SRE or service owner to know whether an increase in the latency or error rate of a service is related to a database. If it is, it can help identify which database and which specific query is contributing to the most latency and resolve it by involving the database administrator or the owner of the service that's making the slow database call. 

Another use case example: a SRE or Service Owner wants to see if the new release impacted anything, with regard to DB interactions. They would like a dashboard to determine whether a new release to a service had an impact on database interactions by examining the average query response time, the number of query executions, and the change in these values over time.

Correlate traces to track Business Workflows
--------------------------------------------------

Utilizing Splunk APM Business Workflows allow an easy way of grouping relevant traces based on their initiating operation, or any other tag/endpoint on a downstream service. For details, see :ref:`https://docs.splunk.com/Observability/apm/workflows/workflows.html#correlate-traces-to-track-business-workflows`. 

This is important in order to monitor end-to-end KPIs and find root causes and bottlenecks. Configuration for Splunk APM Business Workflows are based on any service:operation or tag in the transaction path. Each trace can only belong to one Business Workflow, so the rules in the configuration modal have priority ordering. For example, if a trace can match multiple rules only the highest priority rule will apply. For more information about naming conventions for tagging with OTel, refer to :ref:`https://github.com/splunk/observability-workshop/blob/main/content/en/resources/otel_tagging.md`.

For the service:endpoint naming rule, if a trace contains multiple endpoints of the service, the earliest service:endpoint span is used for the workflow name.

For the service, tag naming rules: 
* If the service appears in multiple spans within a trace with various values of the selected tag, the earliest occurrence is used for the workflow name.
* The tag has to be indexed to show up as an option to configure the name from.

Important considerations, like the trace level metrics or Business Workflow Monitoring MetricSets are slightly slower than Service and Endpoint level ones which is the reason that you need to wait for the entire trace to complete before generating the metrics in order to ensure accuracy.

Understand the performance of inferred services
------------------------------------------------------

When a remote service may not have tracing enabled (the code has not yet been instrumented or it is not available or possible), Splunk APM can infer the presence of these remote services. For a span to be evaluated for possible inferred services, it must have a KIND of CLIENT or PRODUCER. If a span is a CLIENT, it will check for possible HTTP, DATABASE, or CACHE remote service calls. If a span is a PRODUCER, it will check for PUBSUB remote calls.

For each type of inferred service, there are specific tags that are evaluated to determine the name of the remote service.
For a remote HTTP call, one of the tags listed in the table are required. They will be considered in the order listed here, and the first tag that is found will be used to determine the name of the remote service
For a remote DATABASE call, the db.instance tag is required. An additional tag, named db.type, can be added to the span to indicate the type of database being queried.
For a remote PUBSUB queue, one of the tags listed in the table is required. An additional tag, named peer.service, can be added to the span to specify the logical service name of the message queue.

Understand and analyze error spans
There are several ways to identify error in a span by utilizing the following metadata tag: span.status, error, and http.status_code. It is recommended to understand the difference between errors and root cause errors. Error is when a span within a trace results in an error, but when the error consists of other spans in the trace, the originating error of the chain of error spans is the root cause error.

Understand dependencies among services in the service map
In a distributed environment, the complexity is in how services are stitched together. The Splunk APM service map enables users to understand how different services in their distributed environment interact with each other. 
You can identify the root cause error rate through the red dot on the service map for troubleshooting.
It is recommended to familiarize yourself with the detailed breakdowns within the service map, understanding this will help accelerate exploration and troubleshooting of services and dependencies.

Understand how to use MetricSets
It is important to understand the two main MetricSets in Splunk APM, Monitoring MetricSets (MMS) used for real-time monitoring and Troubleshooting MetricSets (TMS) used for high-cardinality troubleshooting. 

MMS is commonly used for monitoring and alerting, this is created out-of-the-box for combinations of service, endpoint and workflow. Each MMS contains the following metrics: Request-Rate, Error-Rate and Latency: Min, Max, P50, P90, P99. MMS data is stored for 13 months by default.

TMS is used for filtering service-graph and breaking down SLIs, historical comparison for spans/workflows. TMS is created out-of-the-box for combinations of service, endpoint, workflow, edges, and operation. Each TMS contains the following metrics: Request-Rate, Error-Rate, Root-Cause Error-Rate, Latency: Min, Max, P50, P90, P99. TMS data is stored for 8 days by default along with full-fidelity traces.

Utilizing Tag Spotlight to analyze services using specific tag values to identify latency/ error rate
Use Tag Spotlight to quickly discover granular trends contributing to latency or errors on a service. Hone in on the latency/ error rate peak by drilling into top tags or specific tags and values without losing context, and jump into a representative trace when you are ready to dive deeper. Tag Spotlight is powered by Troubleshooting MetricSets (TMS) for faster troubleshooting. This feature can be used to understand the impact of issues across different user categories, environments, etc.
