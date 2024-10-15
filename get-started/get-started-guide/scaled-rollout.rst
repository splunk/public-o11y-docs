.. _get-started-guide-scaled-rollout:

Get started guide phase 3: Scaled rollout
*********************************************************

After completing the :ref:`get-started-guide-initial-rollout`, you are ready for phase 3, scaled rollout. In the final, scaled rollout phase you establish repeatable observability practices using automation, data management, detectors, and dashboards. The following sections cover the primary setup steps for scaled rollout phase.

To get a high-level overview of the entire getting started journey for Splunk Observability Cloud, see :ref:`get-started-guide`.

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

As metrics data usage and cardinality grows in Splunk Infrastructure Monitoring, your cost increases. Use metrics pipeline management (MPM) tools within Splunk Infrastructure Monitoring to streamline storage and processing to reduce overall monitoring cost. With MPM, you can make the following optimizations:

* Streamline storage and processing to create a multi-tier metric analytics platform.

* Analyze reports to identify where to optimize usage.

* Use rule-based metrics aggregation and filtering on dimensions to reduce metric time series (MTS) volume.

* Drop dimensions that are not needed. 

You can configure dimensions through the user interface, the API, and Terraform.

For comprehensive documentation on MPM, see :ref:`metrics-pipeline-intro`.

.. _phase3-names-data:

Review metric names and ingested data
=========================================================================================

To prepare for a successful scaled deployment, consider your naming conventions for tokens and custom metrics in Splunk Observability Cloud. A consistent, hierarchical naming convention for metrics makes it easier to find metrics, identify usage, and create charts and alerts across a range of hosts and nodes.

#. See :ref:`metric-dimension-names` for guidance on creating a naming convention for your organization.
#. After bringing in metrics data, review the name and the metrics volume each team is ingesting. Make sure the ingest data matches the naming convention for dimensions and properties. 

.. _phase3-dash-detect:

Build advanced dashboards and detectors
=========================================================================================

Dashboards and detectors are the foundation of a Splunk Observability Cloud user's experience. Dashboards are groupings of charts that visualize metrics. Use dashboards provide your team with actionable insight into your system at a glance. Use detectors to monitor your streaming data against a specific condition that you specify to keep users informed when certain criteria are met.

Build advanced dashboards
-----------------------------

#. Splunk Observability Cloud automatically adds built-in-dashboards for each integration you use after it ingests 50,000 data points. Review these built-in dashboards when they are available. See :ref:`view-dashboards` and :ref:`dashboards-list-imm`.
#. Learn how to create and customize dashboards. Make sure your teams can complete these tasks:
    #. Clone, share, and mirror dashboards. 
    #. Use dashboard filters and dashboard variables. 
    #. Add text notes and event feeds to your dashboards. 
    #. Use data links to dynamically link a dashboard to another dashboard or external system such as Splunk APM, Splunk Platform, or a custom URL.

   For comprehensive documentation on these tasks, see the following topics:

   * :ref:`built-in-dashboards`
   * :ref:`dashboard-create-customize`
   * :ref:`link-metadata-to-content`
   * :ref:`dashboards-best-practices`

Build advanced detectors
-----------------------------

Splunk Observability Cloud also automatically adds the AutoDetect detectors that correspond to the integrations you are using. You can copy the AutoDetect detectors and customize them. See :ref:`autodetect`. 

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

Your final step of the scaled rollout phase is to onboard all users and teams and configure who can view and modify various aspects of Splunk Observability Cloud.

#. See :ref:`user-management-intro` to get started managing users, teams, and roles.
#. If you haven't already done so, turn on enhanced security to identify team managers and control who can view and modify dashboards and detectors. See :ref:`enhanced-team-security`.
#. Assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications give your teams different escalation methods for their alerts. See :ref:`admin-team-notifications`.

.. _phase3-advanced-config:

Optional and advanced configurations
======================================================================

Consider these optional and advanced configurations to customize your setup as they apply to your organization. 

.. _phase3-otel-reqs:

Understand OpenTelemetry sizing requirements
==============================================

Before you start scaling up the use of the OpenTelemetry agents, consider the OpenTelemetry sizing guidelines. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services. Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout. For details about the sizing guidelines, see :ref:`otel-sizing`. 

Education resource
====================

Coordinate with your Splunk Sales Engineer to register for the Splunk Observability Cloud workshop. See :new-page:`Splunk Observability Cloud Workshops<https://splunk.github.io/observability-workshop/latest/en/index.html>`
