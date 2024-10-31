.. _get-started-guide-scaled-rollout:

Get started guide phase 3: Scaled rollout
*********************************************************

After completing the :ref:`get-started-guide-initial-rollout`, you are ready for phase 3, scaled rollout. In the final scaled rollout phase, you establish repeatable observability practices using automation, data management, detectors, and dashboards. The following sections cover the primary setup steps for the scaled rollout phase.

To get a high-level overview of the entire getting started journey for Splunk Observability Cloud, see :ref:`get-started-guide`.

.. note:: This guide is for Splunk Observability Cloud users with the admin role. 


.. image:: /_images/get-started/onboarding-guide-2point0-scaled.svg
   :width: 100%
   :alt: 

To configure your users, teams, and tokens, complete the following tasks:

#. :ref:`phase3-pipeline`
#. :ref:`phase3-rotate-token`
#. :ref:`phase3-mpm`
#. :ref:`phase3-names-data`
#. :ref:`phase3-dash-detect`
#. :ref:`phase3-onboard-all`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager as you get started. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _phase3-pipeline:

Add Splunk Observability Cloud to your deployment pipeline
============================================================

After completing the initial rollout phase, you have deployed a Collector instance with limited configuration. For the scaled rollout, you can expand your Collector pipelines with more components and services.

* See :ref:`otel-configuration` for an overview of the available options to install, configure, and use the Splunk Distribution of the Open Telemetry Collector.
* See :ref:`otel-data-processing` to learn how data is processed in Collector pipelines.
* See the :ref:`otel-components` documentation to see the available components you can add to the Collector configuration. 

You can also use other ingestion methods, like the following:

* To send data using the Splunk Observability Cloud REST APIs, see :ref:`rest-api-ingest`.
* To send metrics using client libraries, see :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>`.
* For information about using the upstream Collector, see :ref:`using-upstream-otel`.

.. _phase3-rotate-token:

Automate the token rotation process
======================================

Because tokens expire after 1 year, you need to automate the rotation of tokens using an API call. For a given token, when the API creates a new token, the old token continues to work until the time you specified in the grace period. Wherever the old token is in use, use the API call to automatically rotate the token within the grace period.

For example, you can use the API to rotate the token that a Kubernetes cluster uses to ingest metrics and trace data. When you use the API to generate a new token, you can store the new token directly in the secret in the Kubernetes cluster as part of the automation.

To learn more, see the following topics:

- :ref:`admin-org-tokens`
- :new-page:`Org tokens API endpoint documentation<https://dev.splunk.com/observability/reference/api/org_tokens/latest>`

.. _phase3-mpm:

Use metrics pipeline management tools to reduce cardinality of metric time series (MTS)
=========================================================================================

As metrics data usage and cardinality grows in Splunk Infrastructure Monitoring, your cost increases. Use metrics pipeline management (MPM) tools within Splunk Infrastructure Monitoring to streamline storage and processing to reduce overall monitoring cost. With MPM, you can make the following optimizations:

* Streamline storage and processing to create a multitier metric analytics platform.

* Analyze reports to identify where to optimize usage.

* Use rule-based metrics aggregation and filtering on dimensions to reduce MTS volume.

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

Build custom dashboards and detectors
=========================================================================================

Dashboards are groupings of charts that visualize metrics. Use dashboards to provide your team with actionable insight into your system at a glance. Use detectors to monitor your streaming data against a specific condition that you specify to keep users informed when certain criteria are met.

Build custom dashboards
-----------------------------

#. Splunk Observability Cloud automatically adds built-in-dashboards for each integration you use after it ingests 50,000 data points. Review these built-in dashboards when they are available. See :ref:`view-dashboards` and :ref:`dashboards-list-imm`.
#. Learn how to create and customize dashboards. Make sure your teams can complete these tasks:
    #. Clone, share, and mirror dashboards. 
    #. Use dashboard filters and dashboard variables. 
    #. Add text notes and event feeds to your dashboards. 
    #. Use data links to dynamically link a dashboard to another dashboard or external system such as Splunk APM, the Splunk platform, or a custom URL.

   For comprehensive documentation on these tasks, see :ref:`dashboards`.

Build custom detectors
-----------------------------

#. Splunk Observability Cloud also automatically adds the AutoDetect detectors that correspond to the integrations you are using. You can copy the AutoDetect detectors and customize them. See :ref:`autodetect`. 
#. Create custom detectors to trigger alerts that address your use cases. See :ref:`get-started-detectoralert`.
#. You can create advanced detectors to enhance the basic list of alert conditions to take into account the different types of functions, such as additional firing, alert clearing conditions, or comparing 2 functions using the population_comparison function. 
    * See the :new-page:`library of SignalFlow for detectors <https://github.com/signalfx/signalflow-library/tree/master/library/signalfx/detectors>` on GitHub.
    * To get started with SignalFlow, see :new-page:`Analyze data using SignalFlow <https://dev.splunk.com/observability/docs/signalflow>` in the developer guide.

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

.. _phase3-data-links:

Use global data links to link properties to relevant resources
---------------------------------------------------------------

Create global data links to link Splunk Observability Cloud dashboards to other dashboards, external systems, custom URLs, or Splunk Cloud Platform logs. To learn more, see :ref:`link-metadata-to-content`. 

.. _phase3-usage-limits:

Analyze and troubleshoot usage, limits, and throttles
---------------------------------------------------------------

To analyze and troubleshoot usage, make sure you know how to complete the following tasks:

* Understand the difference between host-based and MTS-based subscriptions in Infrastructure Monitoring.
* Understand the difference between host-based and trace-analyzed-per-minute (TAPM) subscriptions in APM.
* Understand per-product system limits.
* Read available reports, such as monthly and hourly usage reports, dimension reports, and custom metric reports.

To learn more, see the following topics:

* :ref:`per-product-limits`
* :ref:`subscription-overview`

Education resources
====================

* Before you start scaling up the use of the OpenTelemetry agents, consider the OpenTelemetry sizing guidelines. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services. For details about the sizing guidelines, see :ref:`otel-sizing`. 
* Coordinate with your Splunk Sales Engineer to register for the Splunk Observability Cloud workshop. See :new-page:`Splunk Observability Cloud Workshops<https://splunk.github.io/observability-workshop/latest/en/index.html>`.
* To begin creating a training curriculum for your Splunk Observability Cloud end users see the :new-page:`Curated training for end users<https://drive.google.com/file/d/1LHZL1jaP8irQvfI3HG71XcgGavgEn5cD/view>`.
