.. _phase2-im:


Pilot rollout phase part 2: Initial pilot rollout for Splunk Infrastructure Monitoring
***************************************************************************************

After completing :ref:`phase2-rollout-plan`, you are ready for pilot rollout phase part 2. During this part of the pilot, focus on onboarding your pilot teams to Splunk Infrastructure Monitoring. 

This part of the implementation prepares you to monitor critical solutions and brings business value based on custom metrics. To onboard Infrastructure Monitoring, complete the following tasks:

#. :ref:`onboard-imm-apps`
#. :ref:`otel-reqs`
#. :ref:`Advance configuration using OTel collector (for example, token as a secret, Kubernetes distribution) <adv-conf-otel>`
#. :ref:`custom-dash-charts-metrics`
#. :ref:`detect-alert-config`
#. :ref:`plan-dimensions`
#. :ref:`ci-cd`
#. :ref:`templates-detect`
#. :ref:`automation-api`
#. :ref:`automation-terraform`
#. :ref:`customer-framework`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _onboard-imm-apps:

Launch Infrastructure Monitoring applications
=======================================================================================

#. For each of the participating teams, identify which services you want to ingest data from.
#. Install the OpenTelemetry (OTel) agent. 
#. Configure the receivers and pipeline for these services. This creates the default dashboards and detectors for the services such as databases, message bus, and OS platform.

After you set up these dashboards and detectors, the pilot teams can observe their application data in the built-in dashboards and create their own custom dashboards.

* See :ref:`built-in-dashboards`.
* See :ref:`dashboard-create-customize`.

.. _otel-reqs:

Understand OTel sizing requirements
==========================================

Before you start scaling up the use of the OTel agents, consider the OTel sizing guidelines. For details about the sizing guidelines, see :ref:`otel-sizing`. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services. Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout.

.. _adv-conf-otel:

Complete advanced configurations for the collector 
=======================================================

As you get ready to roll out your first pilot teams, further secure the Splunk OpenTelemetry Collector. For details, see :ref:`otel-security`. You can store your token as a secret or use different methods to securely store tokens and credentials outside the configuration.yaml file for the OTel agent.

* For details on storing the token as a secrets, see :new-page:`Splunk OpenTelemetry Collector for Kubernetes<https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/advanced-configuration.md#provide-tokens-as-a-secret>` on GitHub
* For details on other methods, see :ref:`otel-other-configuration-sources`.


.. _custom-dash-charts-metrics:

Create custom dashboards using charts based on ingested metrics
====================================================================================

As the metrics data is sent to Splunk Observability Cloud, start creating custom dashboards by combining metrics from different tools and services. See the following resources: 

* See :ref:`dashboards-best-practices`.
* For Splunk Observability Cloud training, see :new-page:`Free training <https://www.splunk.com/en_us/training/free-courses/overview.html#observability>`. 
* Coordinate with your Splunk Sales Engineer to register for the Splunk Observability Cloud workshop. See :new-page:`Splunk Observability Cloud Workshops<https://splunk.github.io/observability-workshop/latest/en/index.html>`


.. _detect-alert-config:

Configure detectors and alerts for specific metric conditions
======================================================================

As with the custom dashboards, onboard the pilot team with the prepackaged autodetect detectors. Ensure that your teams understand how to develop their own sets of detectors according to each of their use cases, such as by adapting existing detectors or creating their own. See the following resources: 

* See :ref:`autodetect-intro`.
* For Splunk Observability Cloud training, see :new-page:`Free training <https://www.splunk.com/en_us/training/free-courses/overview.html#observability>`. 
* Coordinate with your Splunk Sales Engineer to register for the Splunk Observability Cloud workshop. See :new-page:`Splunk Observability Cloud Workshops<https://splunk.github.io/observability-workshop/latest/en/index.html>`


.. _plan-dimensions:

Review metric names and ingested data
=========================================================

After your initial onboarding of metrics data, review the name and the amount of metrics each team is ingesting. Make sure the ingest data matches the agreed naming convention for dimensions and properties. If needed, address the name and type of dimensions required to ingest into Splunk Infrastructure Monitoring.

Ensure the teams follow the naming convention setup for metrics, so that you can speed up the development of charts and alerts and create alerts that can detect across a whole range of hosts and nodes.

* For details about dimensions, see :ref:`metadata-dimension`.
* For details about properties, see :ref:`custom-properties`.
* For details about naming conventions for metrics, see :ref:`metric-dimension-names`.

.. _ci-cd:

Add Splunk Observability Cloud to your CI/CD pipeline 
=========================================================

You should have already deployed exporters and pipelines for OpenTelemetry agents. At this point you are ready to add services into your pipeline. For teams that are familiar with tools such as Ansible, Chef, or Puppet, use the exporter and pipeline templates using OpenTelemetry agents.

You can also use the upstream OpenTelemetry Collector Contrib project, send data using the REST APIs, and send metrics using client libraries.

* For details about adding receivers for a database, see :ref:`databases`.
* For information about using the upstream Collector, see :ref:`using-upstream-otel`.
* For details on the Splunk Observability Cloud REST APIs, see :ref:`rest-api-ingest`.
* For details on sending metrics using client libraries, see :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>`.


.. _templates-detect:

Create custom templates for detectors or alerts 
==============================================================

Create custom templates for detectors and alerts for teams to unify various detectors created by users in your teams. Templates prevent duplicating for detectors with similar alerting requirements. You can also deploy templates using Terraform. For more information about the signalfx_detector with Terraform, see :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/detector` on the Terraform Registry.



.. _automation-api:

Prepare for automation using the REST API 
==================================================================================================================

Familiarize yourself with the REST API functions available for Splunk Observability Cloud. For example, you can use the REST API to extract charts, dashboards, or detectors from Splunk Observability Cloud. Most commonly, you can use the REST API to send historical metric time series (MTS) data to Splunk Observability Cloud using the API to correct previously-ingested MTS data.

As a best practices, build templates necessary to onboard the reaming teams. 

* For details about Splunk Observability Cloud REST API, see :new-page:`Observability API Reference<https://dev.splunk.com/observability/reference>`.
* For details about using the Splunk Observability Cloud API to extract charts, see :new-page:`Charts API<https://dev.splunk.com/observability/reference/api/charts/latest#endpoint-get-charts-using-query>`.
* For details about using the Splunk Observability Cloud API to extract dashboards, see :new-page:`Dashboards API<https://dev.splunk.com/observability/reference/api/dashboards/latest#endpoint-retrieve-dashboards-using-query>`.
* For details about using the Splunk Observability Cloud API to extract detectors, see :new-page:`Detectors API<https://dev.splunk.com/observability/reference/api/detectors/latest#endpoint-retrieve-detectors-query>`.


.. _automation-terraform:

Automate using Terraform 
=========================================================

You can automate a large number of deployments using Terraform. The Terraform provider uses the Splunk Observability Cloud REST API.

Use Terraform to help set up integrations to cloud providers, dashboards, and alerts. You can also use Terraform to add customized charts and alerts to newly onboarded teams. 

To migrate from existing dashboard groups, dashboards and detectors to Terraform, you can use Python script. See :new-page:`Export dashboards script<https://github.com/splunk/observability-content-contrib/blob/main/integration-examples/terraform-jumpstart/export_script/README.md>` on GitHub.

* For details about the Terraform provider, see :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest` on the Terraform Registry.
* For information on using Terraform, see :ref:`terraform-config`.


.. _customer-framework:

Finalize framework and adoption protocol
===============================================================================

As you onboard more teams with Splunk Observability Cloud, maintain review sessions to incorporate what you learned from previous onboardings. Review the feedback from the initial onboarded teams and engage with Splunk Observability Cloud Sales Engineers or Professional Services. Start utilizing resources available to your organization including engaging with your Splunk Observability Cloud Sales Engineer or Professional Services resources. These resources can help you with best practices and faster rollout.

Next step
===============

Next, begin your initial pilot rollout for Splunk Application Performance Monitoring.  :ref:`phase2-apm`