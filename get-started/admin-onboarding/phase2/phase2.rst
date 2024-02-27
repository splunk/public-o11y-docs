.. _phase2:


Admin onboarding guide phase 2: Pilot phase
****************************************************************


Establish a consistent hierarchical naming convention for metrics. When deploying OpenTelemetry in a large organization, it's important to define a standardized naming convention for tagging, and a governance process to ensure the convention is adhered to. 

Follow these general steps as you roll out Splunk Observability Cloud. Each step is described in more detail in the following sections.

#. :ref:`Establish OTEL naming conventions <naming_conventions>`.
#. :ref:`Identify pilot teams and projects <pilots>`.
#. :ref:`Set up an application framework <framework>`.
#. :ref:`Set up training for your internal users <enable_integration>`.


.. naming_conventions:: 

Guidance on OTEL naming conventions
========================================

In order to start creating charts and detectors in Splunk Observability Cloud, it is recommended that you define a proper standard for the naming convention of the metrics name. For the best practices in setting up a consistent hierarchical naming convention for metrics, see :ref:`XXXXX`  This will make it easier to find metrics and identify its usage by utilizing the name of the metric.

If your organization uses host-based O11y licensing, your OTEL naming convention must include the right OTEL host naming convention to roll up usage and telemetry correctly. Accurate usage counting for host-based orgs requires the right data naming convention for pods.  If your do not follow this naming convention, in-product usage data and usage telemetry might be unreliable.  This must be set up correctly for accurate usage measurement.

.. caution:: Don't remove the Kubernetes attributes process from your configuration. Default attributes such as k8s.pod.name are required by Splunk Observability Cloud.


.. pilots::

Identify pilot teams and projects
=====================================

Identify pilot teams and projects with approximate timelines and capacity requirements.

Once initial applications are integrated into the Splunk Observability Cloud, the next step is to start planning the initial roll out to your organization's pilot teams.

There are two types of pilot teams to be consider:
* A set of teams that are ready or have started a new project and have been using common technologies used by the majority of the teams.
* A set of teams that have been using a non-standard technology.

It will be beneficial if services created by each team can be utilized by the other teams, to avoid duplicating efforts. If there are questions regarding stand alone applications or services, please reach out to the technical contact at Splunk.

.. framework:: 

Set up an application framework
=======================================


#. Identify initial metric, trace and log integrations and enabling them in the Splunk Observability Cloud
#. Identify a naming convention for the deployment environments for Splunk Application Performance Monitoring
#. Establish a consistent set of best practices on the use of Splunks (auto) instrumentation libraries in your developer best practices.

.. enable_integrations::

Identify and enable initial metric, trace and log integrations
------------------------------------------------------------------

Identify application tools that are used as part of services that the pilot team supports, such as database, message bus, and so on. Verify that the development languages used are supported by the OTel community. For details, see :ref:`https://opentelemetry.io/docs/instrumentation/`.

Clearly define a list of libraries required to support applications and those that are supported by OpenTelemetry to determine which applications require auto or manual instrumentation. For a list of languages supported by OpenTelemetry, see :ref:`https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md`

Here are some recommendations to build your development pipeline: 
* Utilize the OTel zero configuration client(s) on the hosts or Kubernetes. For details, see :ref:`https://docs.splunk.com/Observability/gdi/opentelemetry/zero-config.html`.
* Utilize the OTel auto instrumentation to the containers or virtual machines. For details, see :ref:`https://docs.splunk.com/Observability/apm/set-up-apm/apm-gdi.html#instrument-your-applications-and-services-to-get-spans-into-splunk-apm`.
* Identify the proper environment variables according to specific use cases. 
* Each development language has its own settings, for example Java, Node.js, and .NET.
    * For Java information, see :ref:`https://docs.splunk.com/Observability/gdi/get-data-in/application/java/configuration/advanced-java-otel-configuration.html#configure-the-java-agent-for-splunk-observability-cloud`.
    * For Node.js information, see :ref:`https://docs.splunk.com/Observability/gdi/get-data-in/application/nodejs/instrumentation/instrument-nodejs-application.html#install-the-splunk-distribution-of-opentelemetry-js-manually`.
    * For .NET information, see :ref:`https://docs.splunk.com/Observability/gdi/get-data-in/application/dotnet/instrumentation/instrument-dotnet-application.html#instrument-a-net-application-for-splunk-observability-cloud`.


Identify a naming convention for the deployment environments
-----------------------------------------------------------------

It is recommended you use defining deployment environments to avoid overlapping configuration between other deployment of the same applications. For example, development, staging, production. For details about defining deployment environments, see :ref:`https://docs.splunk.com/Observability/apm/set-up-apm/environments.html#setting-the-deployment-environment-span-tag`.
Another recommendation to further utilize the filtering of Splunk Application Monitoring data is to define teams, functions, and other tags such as database name or frontend application name. 

This can be accomplished by utilizing the standard method of adding attributes to a trace or span using the OpenTelemetry environment variables: OTEL_RESOURCE_ATTRIBUTES. For details on adding attributes, see :ref:`https://github.com/splunk/observability-workshop/blob/main/content/en/resources/otel_tagging.md#best-practices-for-creating-custom-attributes`. For more information on how to add context to spans tags, see :ref:`https://docs.splunk.com/observability/apm/span-tags/add-context-trace-span.html#follow-span-tag-naming-conventions`.



Establish a consistent set of best practices on the use of Splunk instrumentation libraries
------------------------------------------------------------------------------------------------

At this point you have enough information and experience with configuring both the OpenTelemetry Agent and (auto instrumentation libraries). You should be able to define guides for the teams that you want to onboard.

Items should at least include the following:

* Which environment variables and command line parameters to set for the auto-instrumentation agents. For more information, see :ref:`https://docs.splunk.com/Observability/apm/set-`.
* Guide on how to enable :ref:`AlwaysOn Profiling <https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.8rdrmmc6xzqh>` if required. 
* Instructions how to configure logs to add tracing information. This is language dependent. For a  Java example, see :ref:`https://docs.splunk.com/Observability/gdi/get-data-in/application/java/instrumentation/connect-traces-logs.html`.
* A guide that to the naming conventions for metrics, and environments. For details on metric naming conventions, see :ref:`https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.wm48ywczbj4`. For details on environment naming conventions, see :ref:`https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.nly13uf61hgz`.






Utilize Splunk expert to help with support
============================================================

It is recommended to work closely with your Splunk Sales Engineer (SE) or Splunk Customer Success Manager (CSM) throughout your onboarding process. They can help fine tune your Splunk Observability Cloud journey and best practices as well as providing advice on training and workshops.





Setup training plan for internal users
===============================================

Splunk has a set of training available to help you with your onboarding journey and best practices. It is strongly recommended to utilize the provided free online training courses. For a list of free and paid courses, see :ref:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`.

If building a center of excellence is required by your organization, the following certification path is available for :ref:`Splunk O11y Cloud Certified Metrics User <https://www.splunk.com/en_us/training/course-catalog.html?filters=filterGroup2SplunkO11yCloudCertifiedMetricsUser>.



*************************************************************
Initial pilot rollout for Splunk Infrastructure Monitoring
*****************************************************************


During the next part of the journey, focus on onboarding a number of teams. These teams will represent use cases that can be used to show the power and benefit of the solution to the rest of your organization. 

These tasks can be separated according to product components. There will be one set for each of:
* Splunk Infrastructure Monitoring and 
* Splunk Application Performance Monitoring.


30 - 60 Days: Infrastructure Monitoring
==============================================

This part of the journey prepares you to monitor critical solutions and brings business value based on custom metrics. This phase includes the following steps:

#. Onboard launching production IM based application
#. Expand the teams beyond the initial set of admins, prepare for internal roll-out from the base team to the first user groups
#. Understand OTel sizing requirements
#. Advance configuration using OTel collector (for example, token as a secret, Kubernetes distribution)
#. Create custom dashboard configuration using charts based on ingested metrics
#. Configure detectors and alerts for specific metric conditions
#. Planning considerations, dimensions and properties
#. Add O11y in CI/CD pipeline (provide default dashboards)
#. Implement custom templates
#. Standardize automation using the REST API implementation
#. Enable automation using the Terraform implementation
#. Finalize customer framework and adoption protocol for faster rollout


Onboard launching production Infrastructure Monitoring based applications
----------------------------------------------------------------------------------

For each of the participating teams, identify which services are required as part of the application and proceed with installing the OpenTelemetry agent. Remember to also configure the receivers and pipeline for these services. This will create the default dashboards and detectors for the services such as databases, Messagebus, and OS platform.

Once these dashboards and detectors are set up, the teams can use these out of the box to observe their application data or create their own custom dashboards.

Expand the team beyond the initial set of admins, prepare for internal roll-out to the first user groups
----------------------------------------------------------------------------------------------------------

Depending how you are managing users in your organization in Splunk Observability Cloud or using Single Sign-On (SSO), it is necessary to assign the right roles to the new users. For details on managing users, see :ref:`https://docs.splunk.com/Observability/admin/users/manage-users.html`.
If you are using teams, you may want to enable enhanced security so you can assign team managers. For details on enhanced security, see :ref:`Manage users <https://docs.splunk.com/Observability/admin/teams/manage-membership.html#turn-on-enhanced-team-security>` and :ref:`team managers <https://docs.splunk.com/Observability/admin/teams/manage-membership.html#team-roles-and-permissions>`. If you are utilizing child orgs functionality, it is recommended that you assign local admins by delegating the admin functionality of the child org fully to the teams assigned to that child org.

Ensure users are aware of the first-time login procedure:
When a user logs in to Splunk Observability Cloud using SSO for the first time, the user will receive an email with a link. The user must click the link for authentication purposes. This email validation will only take place for first-time users.

Splunk Observability Cloud supports Just-In-Time user creation, which means that if a user does not exist in Splunk Observability Cloud, then the user's account will be created upon first login attempt.


Understand OTEL sizing requirements
------------------------------------------

At this point it is recommended that you start scaling up the use of the OTel agents and understand the OTel sizing guidelines. For details about the sizing guidelines, see :ref:`https://github.com/signalfx/splunk-otel-collector/blob/main/docs/sizing.md`. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services.  Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout.

Advance configurations using OTel collector 
--------------------------------------------------------

As you are getting ready to roll out the first teams, it is recommended that you start looking at further securing the OpenTelemetry Collector for Kubernetes. For details, see :ref:`https://docs.splunk.com/Observability/gdi/opentelemetry/security.html`. You can store your token as a secret or use different methods to securely store tokens, user and password information outside the configuration.yaml for the OTel agent.

* For details on storing the token as a secrets, see :ref:`https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/advanced-configuration.md#provide-tokens-as-a-secret`.
* For details on other methods, see :ref:`https://docs.splunk.com/Observability/gdi/opentelemetry/other-configuration-sources.html#otel-other-configuration-sources`.



Help create Custom dashboard configuration using charts based on ingested metrics
----------------------------------------------------------------------------------------

As the metrics data is being sent to Splunk Observability Cloud, it is recommended to start creating Custom dashboards, combining the metrics from different tools and services. Additional resources to help with this can be found here: 

* For details on free training, see :ref:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`
* For details about the dashboard best practice guide, see :ref:`https://docs.splunk.com/Observability/data-visualization/dashboards/dashboards-best-practices.html`. 
*  Coordinate with your Splunk SE to either register for the regular Splunk Observability Cloud workshop `https://splunk.github.io/observability-workshop/latest/en/index.html.



Detector and alert configuration for specific metric conditions
--------------------------------------------------------------------

As with the custom dashboards, the newly onboarded teams have the benefits of the out-of-the-box auto detectors. It is important to ensure the teams understand how to develop their own sets of detectors according to each of their use cases. They will want to adapt existing or create their own detectors. Additional resources to help with this can be found here: free training, best practice guide & liaise with your Splunk SE to either register for the regular Splunk Observability Cloud workshop.

* For details on free training, see :ref:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`
* For details about the dashboard best practice guide, see :ref:`https://docs.splunk.com/Observability/data-visualization/dashboards/dashboards-best-practices.html`. 
*  Coordinate with your Splunk SE to either register for the regular Splunk Observability Cloud workshop `https://splunk.github.io/observability-workshop/latest/en/index.html.


Planning considerations for dimensions and properties
-------------------------------------------------------------

After initial onboarding of metrics data, It is strongly recommended to review the name and the amount of metrics each teams are ingesting. Make sure the ingest data match the agreed naming convention for dimensions and properties.
Often, guidance is needed to address the name and type of dimensions required to ingest into Splunk IM.

It is important to ensure the teams follow the naming convention setup for metrics. This will help faster development of charts and alerts and also to create alerts that can detect across a whole range of hosts and nodes.

* For details about dimensions, see :ref:`https://docs.splunk.com/Observability/metrics-and-metadata/metrics-dimensions-mts.html#dimensions`.
* For details about properties, see :ref:`https://docs.splunk.com/Observability/metrics-and-metadata/metrics-dimensions-mts.html#custom-properties`.
* For details about naming conventions for metrics, see :ref:`https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.wm48ywczbj4`.

Add Splunk Observability Cloud to your CI/CD pipeline 
-----------------------------------------------------------------------------------------------------------

During this phase, there should already be some deployment of exporters and pipelines for OTel agents. For teams that are familiar with tools such as ansible, chef, puppet or equivalent, utilizing these exporter and pipeline templates using OTel will be recommended.

Adding different services into the pipeline will be recommended at this point, for example adding a database into the pipeline. Note also the ability to utilize OpenTelemetry Collector Contrib (upstream), or send data using the REST APIs, and also send metrics using client libraries.

* For details about adding receives for a database, see :ref:`https://docs.splunk.com/observability/gdi/databases.html#configure-application-receivers-for-databases`.
* For information about using the upstream OTEL Collector, see :ref:`https://docs.splunk.com/observability/gdi/other-ingestion-methods/upstream-collector.html#send-telemetry-using-the-opentelemetry-collector-contrib-project`.
* For details on Rest APIs, see :ref:`https://docs.splunk.com/observability/gdi/other-ingestion-methods/rest-APIs-for-datapoints.html#rest-api-ingest`.
* For details on sendind metrics using client libraries, see :ref:`https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/?_gl=1*1n3gjs1*_ga*NDUwMTM2Mzg1LjE2ODU0NjEwMDE.*_ga_GS7YF8S63Y*MTY5MDI0NzIzNy4yOS4xLjE2OTAyNTEzNTQuMC4wLjA.*_ga_5EPM2P39FV*MTY5MDI0NDQzMy4zMi4xLjE2OTAyNTEzNTQuMC4wLjA.&_ga=2.157251965.771853185.1690144202-450136385.1685461001#SignalFlow-client-libraries`,

Custom template for detectors or alerts implementation
---------------------------------------------------------------

Creating custom templates is recommended for teams to unify various detectors created by users within the teams. This will prevent duplication for detectors with similar alerting requirements. Another common way to easily deploy detectors templates is to utilize Terraform. For more information about Terraform, see :ref:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/detector`.

Setup guidance for automation using the REST API implementation
--------------------------------------------------------------------------

It is recommended to familiarize with the REST API functions available for Splunk Observability Cloud..
The REST API can be used to extract charts, dashboards, or detectors from the Splunk Observability Cloud backend. Most common use of the REST API is to send historical MTS to Splunk Observability Cloud using the backfill API to correct previously ingested MTS data.

It is recommended to build templates necessary to onboard the remaining teams.

* For details about REST APIs, see :ref:`https://dev.splunk.com/observability/reference`.
* For details about using APIs to extract charts, see :ref:`https://dev.splunk.com/observability/reference/api/charts/latest#endpoint-get-charts-using-query`.
* For details about using APIs to extract dashboards, see :ref:`https://dev.splunk.com/observability/reference/api/dashboards/latest#endpoint-retrieve-dashboards-using-query`.
* For details about using APIs to extract detectors, see :ref:`https://dev.splunk.com/observability/reference/api/detectors/latest#endpoint-retrieve-detectors-query`.



Automation using the Terraform implementation
---------------------------------------------------------

Splunk Observability Cloud has a Terraform provider that allows you to automate a large number of deployments using Terraform. The Terraform provider utilizes the Splunk Observability Cloud REST API for several use cases.

This will help with setting up integrations to Cloud providers, dashboards, and alerts. Terraform also provides an easier way to add customized charts and alerts to newly onboarding teams. 

.. To migrate from existing dashboard groups, dashboards and detectors to terraform, there is a python script that can help with this migration effort.

* For details about the Terraform provider, see :ref:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest`.
* For information on using Terraform, see :ref:`https://docs.splunk.com/Observability/gdi/get-data-in/connect/aws/aws-terraformconfig.html`.
* For details about using the REST APIs for use cases, see :ref:`https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.vfpef5ojgu3e`.
* 

Finalizing customer framework and adoption protocol for faster rollout
----------------------------------------------------------------------------

It is important to have regular updates and review sessions to incorporate lessons learned as more teams start to onboard with Splunk Observability Cloud. It is essential to review the feedback from the initial onboarding teams. Start utilizing resources available to your org by engaging with your Splunk Observability Cloud SE or Professional Services resources. These resources will be able to help with best practices and help with faster rollout.



**************************************************************************
Initial pilot rollout for Splunk Application Performance Monitoring
**************************************************************************


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

