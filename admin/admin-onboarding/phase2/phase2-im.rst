.. _phase2-im:


Pilot phase part 2: Initial pilot rollout for Splunk Infrastructure Monitoring
********************************************************************************



During this part of the journey, focus on onboarding a number of teams. These teams will represent use cases that can be used to show the power and benefit of the solution to the rest of your organization. 

These tasks can be separated according to product components. There will be one set for each of:
* Splunk Infrastructure Monitoring (this topic), and 
* :ref:`Splunk Application Performance Monitoring <phase2-apm>`


Onboarding Infrastructure Monitoring
==============================================

This part of the journey prepares you to monitor critical solutions and brings business value based on custom metrics. This phase includes the following steps:

#. :ref:`onboard-imm-apps`
#. :ref:`expand-team`
#. :ref:`otel-reqts`
#. :ref:`Advance configuration using OTel collector (for example, token as a secret, Kubernetes distribution) <adv-conf-otel>`
#. :ref:`custom-dash-charts-metrics`
#. :ref:`detect-alert-config`
#. :ref:`plan-dimensions`
#. :ref:`ci-cd`
#. :ref:`templates-detect`
#. :ref:`automation-api`
#. :ref:`automation-terraform`
#. :ref:`customer-framework`

.. _onboard-imm-apps:

Onboard launching production Infrastructure Monitoring based applications
=======================================================================================

For each of the participating teams, identify which services are required as part of the application and proceed with installing the OpenTelemetry agent. Remember to also configure the receivers and pipeline for these services. This will create the default dashboards and detectors for the services such as databases, Messagebus, and OS platform.

Once these dashboards and detectors are set up, the teams can use these out of the box to observe their application data or create their own custom dashboards.

.. _expand-team:

Expand the team and prepare for internal roll-out to the first user groups
=================================================================================================================

Depending how you are managing users in your organization in Splunk Observability Cloud or using Single Sign-On (SSO), it is necessary to assign the right roles to the new users. For details on managing users, see :ref:`admin-manage-users`.

If you are using teams, you may want to enable enhanced security so you can assign team managers. For details on enhanced security, see Manage users :ref:`enhanced-team-security` and :ref:`admin-manage-team-membership`. If you are utilizing child orgs functionality, it is recommended that you assign local admins by delegating the admin functionality of the child org fully to the teams assigned to that child org.

Ensure users are aware of the first-time login procedure:

When a user logs in to Splunk Observability Cloud using SSO for the first time, the user will receive an email with a link. The user must click the link for authentication purposes. This email validation will only take place for first-time users.

Splunk Observability Cloud supports Just-In-Time user creation, which means that if a user does not exist in Splunk Observability Cloud, then the user's account will be created upon first login attempt.

.. _otel-reqts:

Understand OTEL sizing requirements
==========================================

At this point it is recommended that you start scaling up the use of the OTel agents and understand the OTel sizing guidelines. For details about the sizing guidelines, see :ref:`otel-sizing`. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services.  Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout.

.. _adv-conf-otel:

Advance configurations using OTel collector 
====================================================

As you are getting ready to roll out the first teams, it is recommended that you start looking at further securing the OpenTelemetry Collector for Kubernetes. For details, see :ref:`otel-security`. You can store your token as a secret or use different methods to securely store tokens, user and password information outside the configuration.yaml for the OTel agent.

* For details on storing the token as a secrets, see :new-page:`https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/advanced-configuration.md#provide-tokens-as-a-secret`.
* For details on other methods, see :new-page:`https://docs.splunk.com/Observability/gdi/opentelemetry/other-configuration-sources.html#otel-other-configuration-sources`.


.. _custom-dash-charts-metrics:

Help create custom dashboard configuration using charts based on ingested metrics
====================================================================================

As the metrics data is being sent to Splunk Observability Cloud, it is recommended to start creating Custom dashboards, combining the metrics from different tools and services. Additional resources to help with this can be found here: 

* For details on free training, see :new-page:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`
* For details about the dashboard best practice guide, see :ref:`dashboards-best-practices`. 
* Coordinate with your Splunk SE to either register for the regular Splunk Observability Cloud workshop https://splunk.github.io/observability-workshop/latest/en/index.html.

.. IS THIS AN INTERNAL ONLY COURSE? 

.. _detect-alert-config:

Detector and alert configuration for specific metric conditions
======================================================================

As with the custom dashboards, the newly onboarded teams have the benefits of the out-of-the-box auto detectors. It is important to ensure the teams understand how to develop their own sets of detectors according to each of their use cases. They will want to adapt existing or create their own detectors. Additional resources to help with this can be found here: free training, best practice guide & liaise with your Splunk SE to either register for the regular Splunk Observability Cloud workshop.

* For details on free training, see :new-page:`https://www.splunk.com/en_us/training/free-courses/overview.html#observability`
* For details about the dashboard best practice guide, see :ref:`dashboards-best-practices`. 
* Coordinate with your Splunk SE to either register for the regular Splunk Observability Cloud workshop https://splunk.github.io/observability-workshop/latest/en/index.html.


.. _plan-dimensions:

Planning considerations for dimensions and properties
=========================================================

After initial onboarding of metrics data, It is strongly recommended to review the name and the amount of metrics each teams are ingesting. Make sure the ingest data match the agreed naming convention for dimensions and properties.
Often, guidance is needed to address the name and type of dimensions required to ingest into Splunk IM.

It is important to ensure the teams follow the naming convention setup for metrics. This will help faster development of charts and alerts and also to create alerts that can detect across a whole range of hosts and nodes.

* For details about dimensions, see :ref:`metadata-dimension`.
* For details about properties, see :ref:`custom-properties`.
* For details about naming conventions for metrics, see https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.wm48ywczbj4.



.. _ci-cd:

Add Splunk Observability Cloud to your CI/CD pipeline 
=========================================================

During this phase, there should already be some deployment of exporters and pipelines for OTel agents. For teams that are familiar with tools such as ansible, chef, puppet or equivalent, utilizing these exporter and pipeline templates using OTel will be recommended.

Adding different services into the pipeline will be recommended at this point, for example adding a database into the pipeline. Note also the ability to utilize OpenTelemetry Collector Contrib (upstream), or send data using the REST APIs, and also send metrics using client libraries.

* For details about adding receives for a database, see :ref:`databases`.
* For information about using the upstream OTEL Collector, see :ref:`using-upstream-otel`.
* For details on Rest APIs, see :ref:`rest-api-ingest`.
* For details on sending metrics using client libraries, see :new-page:`SignalFlow information messages <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/?_gl=1*1n3gjs1*_ga*NDUwMTM2Mzg1LjE2ODU0NjEwMDE.*_ga_GS7YF8S63Y*MTY5MDI0NzIzNy4yOS4xLjE2OTAyNTEzNTQuMC4wLjA.*_ga_5EPM2P39FV*MTY5MDI0NDQzMy4zMi4xLjE2OTAyNTEzNTQuMC4wLjA.&_ga=2.157251965.771853185.1690144202-450136385.1685461001#SignalFlow-client-libraries>`.


.. _templates-detect:

Custom template for detectors or alerts implementation
=========================================================

Creating custom templates is recommended for teams to unify various detectors created by users within the teams. This will prevent duplication for detectors with similar alerting requirements. Another common way to easily deploy detectors templates is to utilize Terraform. For more information about Terraform, see https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/detector.



.. _automation-api:

Setup guidance for automation using the REST API implementation
==================================================================================================================

It is recommended to familiarize with the REST API functions available for Splunk Observability Cloud..
The REST API can be used to extract charts, dashboards, or detectors from the Splunk Observability Cloud backend. Most common use of the REST API is to send historical MTS to Splunk Observability Cloud using the backfill API to correct previously ingested MTS data.

It is recommended to build templates necessary to onboard the remaining teams.

* For details about REST APIs, see https://dev.splunk.com/observability/reference.
* For details about using APIs to extract charts, see https://dev.splunk.com/observability/reference/api/charts/latest#endpoint-get-charts-using-query.
* For details about using APIs to extract dashboards, see https://dev.splunk.com/observability/reference/api/dashboards/latest#endpoint-retrieve-dashboards-using-query.
* For details about using APIs to extract detectors, see https://dev.splunk.com/observability/reference/api/detectors/latest#endpoint-retrieve-detectors-query.


.. _automation-terraform:

Automation using the Terraform implementation
=========================================================

Splunk Observability Cloud has a Terraform provider that allows you to automate a large number of deployments using Terraform. The Terraform provider utilizes the Splunk Observability Cloud REST API for several use cases.

This will help with setting up integrations to Cloud providers, dashboards, and alerts. Terraform also provides an easier way to add customized charts and alerts to newly onboarding teams. 

To migrate from existing dashboard groups, dashboards and detectors to terraform, there is a python script that can help with this migration effort.

* For details about the Terraform provider, see https://registry.terraform.io/providers/splunk-terraform/signalfx/latest.
* For information on using Terraform, see https://docs.splunk.com/Observability/gdi/get-data-in/connect/aws/aws-terraformconfig.html.
* For details about using the REST APIs for use cases, see https://docs.google.com/document/d/1hpzkmO5c8cz35x3ofa-MC0JGmsazaPQov-7k_f5Mml8/edit?pli=1#heading=h.vfpef5ojgu3e.


.. _customer-framework:

Finalizing customer framework and adoption protocol for faster rollout
===============================================================================

It is important to have regular updates and review sessions to incorporate lessons learned as more teams start to onboard with Splunk Observability Cloud. It is essential to review the feedback from the initial onboarding teams. Start utilizing resources available to your org by engaging with your Splunk Observability Cloud SE or Professional Services resources. These resources will be able to help with best practices and help with faster rollout.