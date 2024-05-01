.. _phase2-im:


Pilot phase part 2: Initial pilot rollout for Splunk Infrastructure Monitoring
********************************************************************************



During this part of the pilot, focus on onboarding a number of teams. These teams will represent use cases that can be used to show the power and benefit of the solution to the rest of your organization. 

These tasks can be separated according to product components. In this phase, you onboard Infrastructure Monitoring. See, :ref:`Splunk Application Performance Monitoring <phase2-apm>` for steps to onboard Application Performance Monitoring. 



This part of the implementation prepares you to monitor critical solutions and brings business value based on custom metrics. This phase includes the following steps:

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

Launch Infrastructure Monitoring based applications
=======================================================================================

For each of the participating teams, identify which services you want to ingest data from and proceed with installing the OpenTelemetry agent. Configure the receivers and pipeline for these services. This creates the default dashboards and detectors for the services such as databases, Messagebus, and OS platform.

After you set up these dashboards and detectors, the pilot teams can use these :ref:`Built-in dashboards <built-in-dashboards>` to observe their application data or :ref:`create their own custom dashboards <dashboard-create-customize>`.

.. _expand-team:

Expand the team and prepare for roll-out
======================================================================================

As you prepare to expand usage across your teams, make sure that you have a strategy for user role assignment. For details on managing users, see :ref:`admin-manage-users`.

If you are using teams, enable enhanced security so you can assign team managers. For details on enhanced security, see :ref:`enhanced-team-security` and :ref:`admin-manage-team-membership`. If you are utilizing child organization functionality, assign local admins by delegating the admin functionality of the child organization fully to the teams assigned to that child organization. Contact your Splunk account rep for information about child organizations.

Ensure users are aware of the first-time login procedure:

When a user logs in to Splunk Observability Cloud using SSO for the first time, the user will receive an email with a link. The user must select the link for authentication purposes. This email validationon only takes place for first-time users.

Splunk Observability Cloud supports Just-In-Time user creation, which means that if a user does not exist in Splunk Observability Cloud, then the user's account will be created upon first login attempt.

.. _otel-reqts:

Consider OTel sizing requirements
==========================================

Before you start scaling up the use of the OTel agents, consider the OTel sizing guidelines. For details about the sizing guidelines, see :ref:`otel-sizing`. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services.  Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout.

.. _adv-conf-otel:

Complete advanced configurations for the Collector 
====================================================

As you  get ready to roll out your first teams, further securing the OpenTelemetry collector. For details, see :ref:`otel-security`. You can store your token as a secret or use different methods to securely store tokens, user and password information outside the configuration.yaml for the OTel agent.

* For details on storing the token as a secrets, see :new-page:`https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/advanced-configuration.md#provide-tokens-as-a-secret`.
* For details on other methods, see :ref:`otel-other-configuration-sources`.


.. _custom-dash-charts-metrics:

Create custom dashboards using charts based on ingested metrics
====================================================================================

As the metrics data is being sent to Splunk Observability Cloud, start creating Custom dashboards by combining metrics from different tools and services. See the following resources: 

* See :ref:`dashboards-best-practices`.
* For details on free training, see :new-page:`Free training <https://www.splunk.com/en_us/training/free-courses/overview.html#observability>`. 
* Coordinate with your Splunk Sales Engineer to register for the Splunk Observability Cloud workshop. 



.. _detect-alert-config:

Detector and alert configuration for specific metric conditions
======================================================================

As with the custom dashboards, onboarded the pilot team with the prepackaged :ref:`autodetect <autodetect-intro>` detectors. Ensure that your teams understand how to develop their own sets of detectors according to each of their use cases, such as by adapting existing detectors or creating their own detectors. See the following resources: 

* For details on free training, see :new-page:`Free training <https://www.splunk.com/en_us/training/free-courses/overview.html#observability>`.
* For details about the dashboard best practice guide, see :ref:`dashboards-best-practices`. 



.. _plan-dimensions:

Planning considerations for dimensions and properties
=========================================================

After your initial onboarding of metrics data, review the name and the amount of metrics each team is ingesting. Make sure the ingest data matches the agreed naming convention for dimensions and properties.
If needed, address the name and type of dimensions required to ingest into Splunk Infrastructure Monitoring.

It is important to ensure the teams follow the naming convention setup for metrics, so that you can speed up the development of charts and alerts and create alerts that can detect across a whole range of hosts and nodes.

* For details about dimensions, see :ref:`metadata-dimension`.
* For details about properties, see :ref:`custom-properties`.
* For details about naming conventions for metrics, see :ref:`metric-dimension-names`.



.. _ci-cd:

Add Splunk Observability Cloud to your CI/CD pipeline 
=========================================================

You should have already deployed exporters and pipelines for OTel agents. For teams that are familiar with tools such as Ansible, Chef, Puppet or equivalent, use the exporter and pipeline templates using OpenTelemetry agents.

At this point you are ready to add services into your pipeline. For example, you might add a database into the pipeline. You can also use the upstream OTel Collector project or send data using the Splunk Observability Cloud REST API. You can also send metrics using client libraries. 

* For details about adding receivers for a database, see :ref:`databases`.
* For information about using the upstream OTEL Collector, see :ref:`using-upstream-otel`.
* For details on the Splunk Observability Cloud REST API, see :ref:`rest-api-ingest`.
* For details on sending metrics using client libraries, see :new-page:`SignalFlow client messages <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/?_gl=1*1n3gjs1*_ga*NDUwMTM2Mzg1LjE2ODU0NjEwMDE.*_ga_GS7YF8S63Y*MTY5MDI0NzIzNy4yOS4xLjE2OTAyNTEzNTQuMC4wLjA.*_ga_5EPM2P39FV*MTY5MDI0NDQzMy4zMi4xLjE2OTAyNTEzNTQuMC4wLjA.&_ga=2.157251965.771853185.1690144202-450136385.1685461001#SignalFlow-client-libraries>`.


.. _templates-detect:

Custom template for detectors or alerts implementation
=========================================================

Create a custom template for detectors and alerts for teams to unify various detectors created by users within your teams. This prevents duplication for detectors with similar alerting requirements. You can also use Terraform. For more information about the signalfx_detector with Terraform, see https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/detector.



.. _automation-api:

Set up guidance for automation using the REST API implementation
==================================================================================================================


You can use the Splunk Observability Cloud REST API to extract charts, dashboards, or detectors from the Splunk Observability Cloud backend. Most commonly, you can use the REST API to send historical metric time series (MTS) data to Splunk Observability Cloud using the  API to correct previously-ingested MTS data.

You might want to build templates for REST API use for your teams to use.

* For details about Splunk Observability Cloud REST API, see :new-page:`https://dev.splunk.com/observability/reference`..
* For details about using the Splunk Observability Cloud API to extract charts, see :new-page:`https://dev.splunk.com/observability/reference/api/charts/latest#endpoint-get-charts-using-query`.
* For details about using the Splunk Observability Cloud API to extract dashboards, see :new-page:`https://dev.splunk.com/observability/reference/api/dashboards/latest#endpoint-retrieve-dashboards-using-query`.
* For details about using the Splunk Observability Cloud API to extract detectors, see :new-page:`https://dev.splunk.com/observability/reference/api/detectors/latest#endpoint-retrieve-detectors-query`.


.. _automation-terraform:

Automate using the Terraform implementation
=========================================================

Splunk Observability Cloud has a Terraform provider that allows you to automate a large number of deployments. The Terraform provider utilizes the Splunk Observability Cloud REST API for several use cases.

Use Terraform to set up integrations to Cloud providers, dashboards, and alerts. Terraform also provides an easier way to add customized charts and alerts to newly onboarded teams. 

.. To migrate from existing dashboard groups, dashboards and detectors to Terraform, there is a python script that can help with this migration effort.

* For details about the Terraform provider, see :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest`.
* For information on using Terraform, see :ref:`terraform-config`.



.. _customer-framework:

Finalize framework and adoption protocol for faster rollout
===============================================================================

As you onboard more teams with Splunk Observability Cloud, maintain review sessions to incorporate lessons learned from previous onboardings. Review the feedback from the initial onboarded teams. Start utilizing resources available to your organization including engaging with your Splunk Observability Cloud Sales Engineer or Professional Services resources. Use these resources to help you with best practices and help with faster rollout.

Next step
===============

:ref:`phase2-apm`