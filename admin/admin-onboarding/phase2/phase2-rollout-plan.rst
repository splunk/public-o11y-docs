.. _phase2-rollout-plan:

Pilot phase part 1: Plan your pilot rollout
****************************************************************

Use the following information to guide your implementation of IM or APM. 

- :ref:`naming_conventions`
- :ref:`pilots`
- :ref:`framework`
- :ref:`enable_integrations`
- :ref:`convention-deploy`
- :ref:`best-libraries`
- :ref:`splunk-se`
- :ref:`get-trained`

.. _naming_conventions:

Define your OpenTelemetry naming conventions
=========================================================

When deploying OpenTelemetry in a large organization, it's critical to define a standardized naming convention for tagging and a governance process to ensure the convention is adhered to. Standardized naming also makes it easier to find metrics and identify usage. See :ref:`metric-dimension-names` and :new-page:`Naming conventions for tagging with OpenTelemetry and Splunk<https://splunk.github.io/observability-workshop/latest/en/resources/otel_tagging/index.html>`.

There are a few cases where incorrect naming affects in-product usage data:  

* If your organization uses host-based Splunk Observability Cloud licensing, your OpenTelemetry naming convention must use the OpenTelemetry host semantic convention to track usage and telemetry correctly. See :new-page:`the OpenTelemetry semantic conventions for hosts<https://github.com/open-telemetry/semantic-conventions/blob/main/docs/resource/host.md>`.
* You must use the Kubernetes attributes processor for Kubernetes pods to ensure standard naming and accurate usage counting for host-based organizations. See :ref:`kubernetes-attributes-processor`. 

.. _pilots:

Identify pilot teams and projects
=====================================

After you integrate initial applications, start planning the initial roll-out to your organization's pilot teams. Identify your pilot teams and projects with approximate timelines and capacity requirements.

There are 2 types of pilot teams to consider:

* A set of teams that are ready or have started a new project and are using common technologies used by most teams.
* A set of teams that have been using a non-standard technology.

To avoid duplicating efforts, create a single service even if they are utilized by multiple teams.

.. _framework:

Set up an application framework
=======================================

Once you know which teams are participating in the pilot and have collected their requirements, complete the following:

#. :ref:`Identify initial metric, trace, and log integrations <enable_integrations>` and enable them in the Splunk Observability Cloud
#. :ref:`Identify a naming convention <convention-deploy>` for the deployment environments for Splunk Application Performance Monitoring (APM).
#. :ref:`Establish a consistent set of best practices <best-libraries>` for using Splunk auto-instrumentation libraries.

.. _enable_integrations:

Identify and enable initial metric, trace, and log integrations
------------------------------------------------------------------------

Identify application tools that are used as part of services that the pilot team supports, such as database, message bus, and so on. Verify that the development languages used are supported by OpenTelemetry. For details, see :new-page:`https://opentelemetry.io/docs/instrumentation/`.

Define a list of libraries required to support applications and those that are supported by OpenTelemetry to determine which applications require auto or manual instrumentation. For a list of languages supported by OpenTelemetry, see :new-page:`https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md`.

Next, build your development pipeline: 

* Use the OTel Zero Configuration auto-instrumentation on the hosts or Kubernetes. For details, see :ref:`zero-config`.
* Use the OTel automatic instrumentation for the containers or virtual machines. For details, see :ref:`apm-gdi`.
* Identify the proper environment variables according to specific use cases. Each development language has its own settings, for example:
    
    * For Java information, see :ref:`advanced-java-otel-configuration`.
    * For Node.js information, see :ref:`instrument-nodejs-applications`.
    * For .NET information, see :ref:`instrument-otel-dotnet-applications`.


.. _convention-deploy:

Identify a naming convention for the deployment environments
------------------------------------------------------------------

To avoid overlapping configurations across other deployments of the same application, use defined deployment environments. For details about defining deployment environments, see :ref:`apm-environments`.

You can also define teams, functions, and other tags to further utilize APM data filtering, for example, database name or frontend application name.

You can use the standard method to add attributes to a trace of span using the OpenTelemetry environment variables. For more information on how to add context to spans tags, see :ref:`apm-add-context-trace-span`.

.. _best-libraries:

Establish best practices for Splunk instrumentation libraries
-------------------------------------------------------------------------------

At this point you have some experience with configuration of the OpenTelemetry agent and autoinstrumentation libraries so, create guides for teams that you want to onboard.

Items should include the following:

.. : First URL is broken

* Which environment variables and command line parameters to set for the auto-instrumentation agents. For more information, see :ref:`advanced-java-otel-configuration` and :ref:`otel-install-linux-manual`.
* How to enable :ref:`AlwaysOn Profiling <phase1-profiling>`.
* How to configure logs to add tracing information, depending on language. For a  Java example, see :ref:`correlate-traces-with-logs-java`.
* Naming conventions for metrics and environments. For details on metric naming conventions, see :ref:`metric-dimension-names`. For naming environments, you can set the deployment environment as a span tag, which allows you to filter your APM by environments of interest. See :ref:`apm-environments` to learn more.





.. _splunk-se:

Use Splunk experts for support
============================================================

Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training,  and workshop advice.



.. _get-trained:

Setup training plan for internal users
===============================================

Splunk has training available to help you with your onboarding journey and best practices. For a list of free and paid courses, see :new-page:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`.

If building a center of excellence is required by your organization, the following certification path is available for :new-page:`Splunk O11y Cloud Certified Metrics Users <https://www.splunk.com/en_us/training/course-catalog.html?filters=filterGroup2SplunkO11yCloudCertifiedMetricsUser>`.

Next step
===============

:ref:`phase2-im`