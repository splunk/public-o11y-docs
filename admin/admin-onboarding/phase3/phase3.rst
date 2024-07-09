.. _phase3:

Admin onboarding guide phase 3: Expansion and optimization
*******************************************************************************

.. toctree::
   :hidden:
   :maxdepth: 3

   Part 1: Expand and optimize Splunk Infrastructure Monitoring <phase3-im>
   Part 2: Expand and optimize Splunk Application Performance Monitoring <phase3-apm>

After completing :ref:`phase1` and :ref:`phase2`, you are ready for phase 3, scaled rollout
In phase 3, you solidify the best practices and frameworks from the pilot rollout phase and apply them to a wider pool of infrastructure, applications, and teams. 

For this phase, complete the following topics:

1. :ref:`Expansion and optimization part 1: Splunk Infrastructure Monitoring <phase3-im>`.

2. :ref:`Expansion and optimization part 2: Splunk Application Performance Monitoring <phase3-apm>`.


Add Splunk Observability Cloud to your CI/CD pipeline 
=========================================================

You have already deployed exporters and pipelines for OpenTelemetry agents. You are ready to add services into your pipeline. For teams that are familiar with tools such as Ansible, Chef, or Puppet, use the exporter and pipeline templates using OpenTelemetry agents.

You can also use the upstream OpenTelemetry Collector Contrib project, send data using the REST APIs, and send metrics using client libraries.

* For details about adding receivers for a database, see :ref:`databases`.
* For information about using the upstream Collector, see :ref:`using-upstream-otel`.
* For details on the Splunk Observability Cloud REST APIs, see :ref:`rest-api-ingest`.
* For details on sending metrics using client libraries, see :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>`.

.. _automate-tokens:

Automate the token rotation process
=======================================

Use tokens to secure data ingest and API calls to Splunk Observability Cloud. Tokens are valid for 1 year and can be extended for another 60 days. Your organization has a default token that is automatically generated when the organization is created. 

With the admin role, you can deactivate tokens that are no longer needed. Create a plan to regularly deactivate and rotate tokens.

You can also set limits for data ingestion for your tokens. Use limits to control how many metrics are ingested per token. Limits protect against unexpected data ingestion overage by ensuring teams can't over consume.

See :ref:`admin-tokens` for more information about tokens.

As the various tokens do expire after a year, it is important to understand how to rotate the token gracefully using an automated process via an API call. Once the API is run for a given token, this will create a new token while the old token will continue to work until the time specified in grace_period. Update the old token value with new token value (wherever it is used) within time specified in grace_period.

For example, a token used for ingesting Metrics and Trace data that is used by the Kubernetes cluster (this stored in a Kubernetes secret) can be rotated using the API, and the new token can be stored directly into the secret in the Kubernetes cluster as part of the automation so the application can automatically retrieve the new token.

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



