.. _get-started-guide-scaled-rollout:

Get started guide phase 3: Scaled rollout
*********************************************************

After completing the :ref:`get-started-guide-initial-rollout`, you are ready for phase 3, scaled rollout. In the final, scaled rollout phase you establish repeatable observability practices using automation, data management, detectors, and dashboards. The following sections cover the primary setup steps for scaled rollout phase.

.. note:: This guide is for Splunk Observability Cloud users with the admin role. 


.. image:: /_images/get-started/onboarding-guide-2point0-scaled.svg
   :width: 100%
   :alt: 

To configure your users, teams, and tokens complete the following tasks:

#. :ref:`phase3-pipeline`
#. :ref:`phase3-rotate-token`
#. :ref:`phase3-mpm`
#. :ref:`phase3-names-data`
#. :ref:`phase3-dash-detect`
#. :ref:`phase3-onboard-all`

.. _phase3-pipeline:

Add Splunk Observability Cloud to your CI/CD pipeline
=========================================================
Now, you are ready to add services into your pipeline. If your teams use tools such as Ansible, Chef, or Puppet, use the exporter and pipeline templates using OpenTelemetry agents. You can also use the upstream OpenTelemetry Collector Contrib project, send data using the REST APIs, and send metrics using client libraries.

* For details about adding receivers for a database, see :ref:`databases`.
* For information about using the upstream Collector, see :ref:`using-upstream-otel`.
* For details on the Splunk Observability Cloud REST APIs, see :ref:`rest-api-ingest`.
* For details on sending metrics using client libraries, see :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>`.

.. _phase3-rotate-token:

Automate the token rotation process
======================================

Because tokens expire after 1 year, you need to automate the rotation of tokens using an API call. For a given token, when the API creates a new token, the old token continues to work until the time you specified in the grace period. Wherever the old token is in use, use the API call to automatically rotate the token within the grace period.

For example, you can use the API to rotate the token that a Kubernetes cluster uses to ingest metrics and trace data. When you use the API to generate a new token you can store the new token directly in the secret in the Kubernetes cluster as part of the automation.

To learn more, see the following topics:

- :ref:`admin-org-tokens`
- :new-page:`Org tokens API endpoint documentation<https://dev.splunk.com/observability/reference/api/org_tokens/latest>`

.. _phase3-mpm:

Use metrics pipeline management tools to reduce cardinality of metric time series (MTS)
=========================================================================================

As metrics data usage and cardinality grows in Splunk Infrastructure Monitoring, the cost increases. Use metrics pipeline management (MPM) tools within Splunk Infrastructure Monitoring to streamline storage and processing to reduce overall monitoring cost. With MPM, you can make the following optimizations:

* Streamline storage and processing to evolve the metric analytics platform into a multi-tier platform.

* Analyze reports to identify where to optimize usage.

* Use rule-based metrics aggregation and filtering on dimensions to reduce metric time series (MTS) volume.

* Drop dimensions that are not needed. 

You can configure dimensions through the user interface, the API, and Terraform.

For comprehensive documentation on MPM, see :ref:`metrics-pipeline-intro`.

.. _phase3-names-data:

Review metric names and ingested data
=========================================================================================

To prepare for a successful scaled deployment, consider your naming conventions for tokens and custom metrics in Splunk Observability Cloud. A consistent, hierarchical naming convention for metrics makes it easier to find metrics and identify usage.

After your initial onboarding of metrics data, review the name and the metrics volume each team is ingesting. Make sure the ingest data matches the naming convention for dimensions and properties. 

Ensure the teams follow the naming convention setup for metrics so that you can easily create charts and alerts across a range of hosts and nodes.

* For details about dimensions, see :ref:`metadata-dimension`.
* For details about properties, see :ref:`custom-properties`.
* For details about naming conventions for metrics, see :ref:`metric-dimension-names`.


When deploying OpenTelemetry in a large organization, it's critical to define a standardized naming convention for tagging and a governance process to ensure the convention is adhered to. Standardized naming also makes it easier to find metrics and identify usage. See :ref:`metric-dimension-names` and :new-page:`Naming conventions for tagging with OpenTelemetry and Splunk<https://splunk.github.io/observability-workshop/latest/en/resources/otel_tagging/index.html>`.

   There are a few cases where incorrect naming affects in-product usage data:  

   * If your organization uses host-based Splunk Observability Cloud licensing, your OpenTelemetry naming convention must use the OpenTelemetry host semantic convention to track usage and telemetry correctly. See :new-page:`the OpenTelemetry semantic conventions for hosts<https://github.com/open-telemetry/semantic-conventions/blob/main/docs/resource/host.md>`.
   * You must use the Kubernetes attributes processor for Kubernetes pods to ensure standard naming and accurate usage counting for host-based organizations. See :ref:`kubernetes-attributes-processor`. 

   See :ref:`metric-dimension-names`.

.. _phase3-dash-detect:

Build advanced dashboards and detectors
=========================================================================================

Dashboards and detectors are the foundation of a Splunk Observability cloud user's experience. 

Dashboards are groupings of charts and visualizations of metrics. Dashboards provide useful and actionable insight into your system at a glance.

Detectors monitor your streaming data against a specific condition that you specify to keep users informed when certain criteria are met.

Build advanced dashboards
-----------------------------

Start by getting familiar with the built-in dashboards groups developed by Splunk. Then learn how to create and customize dashboards. 

Make sure your teams can complete these tasks:

* Clone, share, and mirror dashboards. 
* Use dashboard filters and dashboard variables. 
* Add text notes and event feeds to your dashboards. 
* Use data links to dynamically link a dashboard to another dashboard or external system such as Splunk APM, Splunk Platform, or a custom URL.
* Link metadata to related resources.

For comprehensive documentation on these tasks, see the following topics:


- :ref:`dashboards`
- :ref:`built-in-dashboards`
- :ref:`data-visualization-charts`
- :ref:`link-metadata-to-content`


Build advanced detectors
-----------------------------
It is important to familiarize the teams with advanced detectors, this will bring great advantage to utilize the Splunk IM product. These sets of advanced detectors are basically taking the basic list of Alert conditions and enhancing it to take into account the different types of functions, such as additional firing or clearing conditions for the alerts, or comparing two main functions using population_comparison, etc. Here is an example of SLX detectors utilizing the advanced SignalFlow library.

Advanced detectors enhance the basic list of alert conditions to take into account the different types of functions, such as additional firing, alert clearing conditions, or comparing 2 main functions using population_comparison.

To learn more, see the following topics:

* Introduction to alerts and detectors in Splunk Observability Cloud
* Scenarios for finding and resolving infrastructure problems using alerts and detectors
* Use and customize AutoDetect alerts and detectors
* Create detectors to trigger alerts
* Link detectors to charts
* Auto-clear alerts

.. _phase3-onboard-all:

Onboard all users and teams
================================================================================================================

Your final step of the scaled rollout phase is to onboard all users and teams into Splunk Observability Cloud. 

Use enhanced security to identify team managers and control who can view and who can modify each dashboard and detector. 

To learn more, see the following topics:

- :ref:`user-management-intro`

- :ref:`enhanced-team-security`
