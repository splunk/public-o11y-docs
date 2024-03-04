.. _phase2-rollout-plan:

Pilot phase part 1: Plan your rollout
****************************************************************

.. _naming_conventions:

Guidance on OTEL naming conventions
========================================

In order to start creating charts and detectors in Splunk Observability Cloud, it is recommended that you define a proper standard for the naming convention of the metrics name. This will make it easier to find metrics and identify its usage by utilizing the name of the metric.

If your organization uses host-based O11y licensing, your OTEL naming convention must include the right OTEL host naming convention to roll up usage and telemetry correctly. Accurate usage counting for host-based orgs requires the right data naming convention for pods.  If your do not follow this naming convention, in-product usage data and usage telemetry might be unreliable.  This must be set up correctly for accurate usage measurement.

.. caution:: Don't remove the Kubernetes attributes process from your configuration. Default attributes such as k8s.pod.name are required by Splunk Observability Cloud.

.. _pilots:

Identify pilot teams and projects
=====================================

Identify pilot teams and projects with approximate timelines and capacity requirements.

Once initial applications are integrated into the Splunk Observability Cloud, the next step is to start planning the initial roll out to your organization's pilot teams.

There are two types of pilot teams to be consider:
* A set of teams that are ready or have started a new project and have been using common technologies used by the majority of the teams.
* A set of teams that have been using a non-standard technology.

It will be beneficial if services created by each team can be utilized by the other teams, to avoid duplicating efforts. If there are questions regarding stand alone applications or services, please reach out to the technical contact at Splunk.

.. _framework:

Set up an application framework
=======================================

#. Identify initial metric, trace and log integrations and enabling them in the Splunk Observability Cloud
#. Identify a naming convention for the deployment environments for Splunk Application Performance Monitoring
#. Establish a consistent set of best practices on the use of Splunk (auto) instrumentation libraries in your developer best practices.

.. _enable_integrations:

Identify and enable initial metric, trace, and log integrations
===================================================================

Identify application tools that are used as part of services that the pilot team supports, such as database, message bus, and so on. Verify that the development languages used are supported by the OTel community. For details, see :new-page:`https://opentelemetry.io/docs/instrumentation/`.

Clearly define a list of libraries required to support applications and those that are supported by OpenTelemetry to determine which applications require auto or manual instrumentation. For a list of languages supported by OpenTelemetry, see :new-page:`https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md`.

Here are some recommendations to build your development pipeline: 
* Utilize the OTel zero configuration client(s) on the hosts or Kubernetes. For details, see :ref:`zero-config`.
* Utilize the OTel auto instrumentation to the containers or virtual machines. For details, see :ref:`apm-gdi`.
* Identify the proper environment variables according to specific use cases. 
* Each development language has its own settings, for example Java, Node.js, and .NET.
    
    * For Java information, see :ref:`advanced-java-otel-configuration`.
    * For Node.js information, see :ref:`instrument-nodejs-applications`.
    * For .NET information, see :ref:`instrument-otel-dotnet-applications`.


.. _convention-deploy:

Identify a naming convention for the deployment environments
=================================================================

It is recommended you use defined deployment environments to avoid overlapping configuration between other deployment of the same applications. For example, development, staging, production. For details about defining deployment environments, see :ref:`apm-environments`.
Another recommendation to further utilize the filtering of Splunk Application Monitoring data is to define teams, functions, and other tags such as database name or frontend application name. 

This can be accomplished by utilizing the standard method of adding attributes to a trace or span using the OpenTelemetry environment variables: OTEL_RESOURCE_ATTRIBUTES. For details on adding attributes, see :new-page::`https://github.com/splunk/observability-workshop/blob/main/content/en/resources/otel_tagging.md#best-practices-for-creating-custom-attributes`. For more information on how to add context to spans tags, see :ref:`apm-add-context-trace-span`.


.. _best-libraries:

Establish best practices for the use of Splunk instrumentation libraries
===================================================================================================

At this point you have enough information and experience with configuring both the OpenTelemetry Agent and (auto instrumentation libraries). You should be able to define guides for the teams that you want to onboard.

Items should at least include the following:

* Which environment variables and command line parameters to set for the auto-instrumentation agents. For more information, see https://docs.splunk.com/Observability/apm/set-.
* Guide on how to enable https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.8rdrmmc6xzqh if required. 
* Instructions how to configure logs to add tracing information. This is language dependent. For a  Java example, see https://docs.splunk.com/Observability/gdi/get-data-in/application/java/instrumentation/connect-traces-logs.html.
* A guide that to the naming conventions for metrics, and environments. For details on metric naming conventions, see https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.wm48ywczbj4. For details on environment naming conventions, see https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.nly13uf61hgz.






Utilize Splunk expert to help with support
============================================================

It is recommended to work closely with your Splunk Sales Engineer (SE) or Splunk Customer Success Manager (CSM) throughout your onboarding process. They can help fine tune your Splunk Observability Cloud journey and best practices as well as providing advice on training and workshops.





Setup training plan for internal users
===============================================

Splunk has a set of training available to help you with your onboarding journey and best practices. It is strongly recommended to utilize the provided free online training courses. For a list of free and paid courses, see :new-page:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`.

If building a center of excellence is required by your organization, the following certification path is available for :new-page:`Splunk O11y Cloud Certified Metrics Users <https://www.splunk.com/en_us/training/course-catalog.html?filters=filterGroup2SplunkO11yCloudCertifiedMetricsUser>`.