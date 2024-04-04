.. _phase3-im:


Expansion and optimization part 1: Splunk Infrastructure Monitoring
*******************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, do the following:
   
1. :ref:`expand-im1`

2. :ref:`expand-im2`

3. :ref:`expand-im3`

4. :ref:`expand-im4`

5. :ref:`expand-im5`

6. :ref:`expand-im6`

7. :ref:`expand-im7`

8. :ref:`expand-im8`

9. :ref:`expand-im9`

10. :ref:`expand-im11`

11. :ref:`expand-im12`


.. _expand-im1:

Build advanced dashboards and charts
================================================================================================================
It is important to familiarize teams with creating and customizing dashboards. Take advantage of the ability to mirror and modify dashboards. Learn to use dashboard filters and dashboard variables. Ensure teams know how to add text notes and event feeds to the dashboards. Familiarize teams with data links so that they can dynamically link a dashboard to another dashboard, an external system, Splunk APM, or to Splunk Cloud Platform. See :ref:`link-metadata-to-content` to learn more.

For comprehensive documentation on dashboards and charts, see the following:

- :ref:`dashboards`

- :ref:`data-visualization-charts`


.. _expand-im2:

Build advanced detectors
================================================================================================================
Maximize your use of Splunk Infrastructure Monitoring by familiarizing your teams with advanced detectors. Advanced detectors enhance the basic list of alert conditions to take into account the different types of functions, such as additional firing, alert clearing conditions, or comparing 2 main functions using population_comparison.

To learn more, see the following:

- :ref:`get-started-detectoralert`

- :ref:`scenarios-alerts-detectors`

- :ref:`autodetect`

- :ref:`create-detectors`

- :ref:`linking-detectors`

- :ref:`auto-clearing-alerts`


.. _expand-im3:

Automate the token rotation process
================================================================================================================
As tokens expire after a year, you need to rotate tokens gracefully by creating an automated process that uses an API call. For a given token, while the API runs to create a new token, the old token continues to work until the time you specified in the grace period. Wherever the old token is in use, update the old token value with the new token value within the grace period.

Fo example, you can use the API to rotate a token that a Kubernetes cluster uses to ingest metrics and trace data. The API generates a new token that you can store directly in the secret in the Kubernetes cluster as part of the automation so that the application retrieves the new token.

To learn more, see the following:

- :ref:`admin-tokens`

- :ref:`admin-api-access-tokens`

- :ref:`admin-tokens`

- :ref:`admin-org-tokens`


.. _expand-im4:

Identify and review mean time to resolution (MTTR)
================================================================================================================

A primary purpose of Splunk Observability Cloud is to reduce the mean time to resolution (MTTR), of an issue. A long MTTR can be the result of many factors.

One factor might be the correct people aren't involved when an issue begins. After identifying the root cause, you must have the appropriate people to actually fix the issue, as well as the appropriate people to approve the remediation.

Another factor causing a long MTTR can be a lack of insight into the effects on other systems. Without proper insight into how infrastructure and applications interconnect, it takes time to analyze the possible effects of a remediation procedure. 

A third cause of long MTTR can be that teams are using manual remediation procedures. Often teams don't have time to build automation and improve systems because they are too busy investigating and responding to incidents.

A fourth factor can be that teams don't have time to update runbooks. Without proper incident analysis and reporting, incident remediation runbooks often do not include critical information for resolving incidents.

With Splunk Infrastructure Monitoring, the following scenario is common:

1. A deployment happened.

2. The deployment caused an incident. 

3. The incident triggered an alert.

4. The alert triggered a rollback.

The total latency between the deployment and rollback was less than 4 minutes, at which point requests are back to normal. To learn more, see :ref:`practice-reliability-incident-response`.

.. _expand-im5:

Use metrics pipeline management tools to reduce cardinality of metric time series (MTS)
================================================================================================================
It is important to understand the following:

- As metrics data usage, or cardinality, grows in Splunk IM, the cost increases.

- Not all data is equal or important. 

You can reduce overall monitoring cost and optimize your return on investment by storing less critical metrics data at a much lower cost. To do this, use metrics pipeline management (MPM) functionality within Splunk Infrastructure Monitoring. MPM has a mechanism to streamline some of the storage and processing to evolve the metric analytics platform into a multitier platform. MPM also provides reports to identify where to optimize usage. MPM has rule-based metrics aggregation and filtering on dimensions to help reduce metric time series (MTS) volume. MPM also allows users to drop dimensions that are not needed. You can configure dimensions through the user interface, the API, and Terraform.

For comprehensive documentation on MPM, see :ref:`metrics-pipeline-arm`.

.. _expand-im6:

Set up Network Explorer to monitor network environment
================================================================================================================
Use the Splunk Distribution of OpenTelemetry Collector Helm chart to configure Network Explorer. Network Explorer inspects packets to capture network performance data with extended Berkeley Packet Filter (eBPF) technology which is run by Linux Kernel. eBPF allows programs to run in the operating system when the following kernel events occur:

- Run eBPF when TCP handshake is complete

- Run eBPF when TCP receives an acknowledgement for a packet

Network Explorer captures network data that is passed on to the reducer and then to the Splunk OTel Collector. For Splunk OTel Collector to work with Network Explorer, you must install it in gateway mode. Upon successful installation, the Network Explorer navigator displays on the :guilabel:`Infrastructure` tab in Splunk Infrastructure Monitoring.

For comprehensive documentation on Network Explorer, see :ref:`network-explorer`.


.. _expand-im7:

Analyze and troubleshoot usage, limits, and throttles
================================================================================================================
To view Splunk Observability Cloud Subscription Usage data within your org, you must be an admin. It is important to understand the 2 types of subscriptions usage: host based and metric time series (MTS) based. An admin of an organization must know how to read the various reports available such as monthly usage reports, hourly usage reports, dimension reports, and custom metric reports. 

An admin must also understand the system limits for Splunk Infrastructure Monitoring to avoid overall degradation when your organization exceeds the limits. To learn more, see the following:

- :ref:`sys-limits`

- :ref:`data-o11y`


.. _expand-im8:

Automate key workflows to further accelerate onboarding and standardize consistent practices 
================================================================================================================

In this expansion and optimization phase, you can start to automate the onboarding process workflow. For example, consider automating teams creation, token ingestion, HEC token for Log Observer Connect, and token rotation. Also consider prescriptive onboarding guides for instrumentation, such as Splunk OTel Zero configuration installation, or utilizing separate instrumentation agents, including predefining required environment variables. Use Splunk Observability Cloud REST APIs to automatically assign default dashboards and detectors to new teams through automation.

To learn more, see the following:

- :ref:`zero-config`

- :ref:`dashboards-best-practices`


.. _expand-im9:

Identify complex and customized use cases to further enhance value and return on investment
================================================================================================================
During the expansion and optimization phase, start identifying your teams' requirements and develop a plan to address the requirements. Some examples of things teams might need are the following: 

- Information on how to handle large volumes of infrastructure data

- Information on how to increase developer efficiency to solve problems during deployment

- Information on how to use Splunk Observability Cloud to monitor and control consumption rates of Kubernetes 

- Information on how to improve ROI (Return on Investment)

- Information on how to improve MTTR (Mean Time To Resolution) 

- Information on how to ensure and improve customer experience 

.. _expand-im11:

Onboard all production applications
================================================================================================================
During this phase, you can automate most processes can be automated and new services can be added into the Splunk Observability Cloud system. You can continue expanding the OTel agent configuration library for all production applications. Populate all the necessary metrics to build the desired charts, dashboards, and detectors. Continue to onboard all production applications.


.. _expand-im12:

Onboard all users and teams
================================================================================================================
During this phase, you can onboard all users and teams into Splunk Observability Cloud. Turn on the enhanced teams security to identify team managers and users. Use enhance security within the teams to control who can view and who can and modify each dashboard and detector within the teams.

To learn more, see the following:

- :ref:`user-managment-intro`

- :ref:`enhanced-team-security`


Next step
===============

:ref:`phase3-apm`