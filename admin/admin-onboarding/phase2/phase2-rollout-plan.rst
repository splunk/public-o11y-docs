.. _phase2-rollout-plan:

Pilot rollout phase part 1: Plan your pilot rollout
****************************************************************

.. meta::
    :description: 

After completing :ref:`phase1`, you are ready for phase 2, pilot rollout. 

Use the following information to create a plan for your initial rollout of Splunk Observability Cloud.

- :ref:`pilots`
- :ref:`framework`
- :ref:`enable-integrations`
- :ref:`convention-deploy`
- :ref:`best-practices`
- :ref:`get-trained`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _initial-environment:

Identify a pilot environment
=====================================

To get started with Splunk Observability Cloud, choose an initial pilot environment that allows you take advantage of automatic discovery and configuration and cloud provider integrations. See :ref:`discovery_mode` and :ref:`get-started-connect`.

.. _pilots:

Identify pilot teams and projects
=====================================

Start planning the initial pilot rollout to your organization's pilot teams. Identify your pilot teams and projects with approximate timelines and capacity requirements.

There are 2 types of pilot teams to consider:

* A set of teams that are ready or have started a new project and are using common technologies.
* A set of teams who use a nonstandard technology.

To avoid duplicating efforts, create a single service even if a service is used by multiple teams.

.. _framework:

Set up an application framework
=======================================

Once you know which teams are participating in the pilot and have collected their requirements, complete the following:

#. :ref:`Identify initial metric, trace, and log integrations <enable_integrations>` and enable them in Splunk Observability Cloud.
#. :ref:`Identify a naming convention <convention-deploy>` for the deployment environments for Splunk Application Performance Monitoring (APM).
#. :ref:`Establish best practices for Splunk Observability Cloud <best-practices>`.

.. _enable-integrations:

Identify and activate initial metric, trace, and log integrations
------------------------------------------------------------------------

Identify application tools that are used as part of services that the pilot team supports, such as database, message bus, and so on. Verify that the development languages used are supported by OpenTelemetry. For details, see :new-page:`https://opentelemetry.io/docs/instrumentation/`.

Define a list of libraries required to support applications and those that are supported by OpenTelemetry to determine which applications require auto or manual instrumentation. For a list of languages supported by OpenTelemetry, see :new-page:`https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md`.

Next, build your development pipeline: 

* Use automatic discovery on your hosts or Kubernetes cluster. For details, see :ref:`discovery_mode`.
* Use the automatic instrumentation for containers or virtual machines. For details, see :ref:`apm-gdi`.
* Identify the environment variables according to specific use cases. Each development language has its own settings, for example:
    
    * For Java information, see :ref:`advanced-java-otel-configuration`.
    * For Node.js information, see :ref:`instrument-nodejs-applications`.
    * For .NET information, see :ref:`instrument-otel-dotnet-applications`.

.. _convention-deploy:

Identify a naming convention for the deployment environments
------------------------------------------------------------------

To avoid overlapping configurations across other deployments of the same application, use defined deployment environments. For details about defining deployment environments, see :ref:`apm-environments`.

You can also further filter Splunk Application Performance Monitoring (APM) data by defining teams, functions, and other tags, such as database names or front-end application names, to further use APM data filtering.

To define these tags, you can use the standard method to add attributes to a trace of span using the OpenTelemetry environment variables. For more information on how to add context to spans tags, see :ref:`apm-add-context-trace-span`.

.. _best-practices:

Establish best practices for Splunk Observability Cloud
-------------------------------------------------------------------------------

Based on your experience so far with configuration of the OpenTelemetry agents and auto instrumentation, you can now create guides for the teams that you want to onboard.

Include the following items in your guide: 

* Which environment variables and command line parameters to set. For more information, see :ref:`advanced-java-otel-configuration` and :ref:`otel-install-linux-manual`.
* How to activate :ref:`AlwaysOn Profiling <phase1-profiling>`.
* How to configure logs to add tracing information, depending on language. For a Java example, see :ref:`correlate-traces-with-logs-java`.
* Naming conventions for metrics and environments. For details on metric naming conventions, see :ref:`metric-dimension-names`. For naming environments, you can set the deployment environment as a span tag, to filter your APM by environments of interest. See :ref:`apm-environments` to learn more.

.. _get-trained:

Set up training plans for pilot users
===============================================

Splunk has training available to help you with your onboarding journey and best practices. For a list of free Splunk Observability Cloud courses, see :new-page:`Free training<https://www.splunk.com/en_us/training/free-courses/overview.html#observability>`.

If want to building a center of excellence for your organization, the following certification path is available for :new-page:`Splunk O11y Cloud Certified Metrics Users <https://www.splunk.com/en_us/training/course-catalog.html?filters=filterGroup2SplunkO11yCloudCertifiedMetricsUser>`.

Next step
===============

Next, begin your initial pilot rollout for Splunk Infrastructure Monitoring. See :ref:`phase2-im`