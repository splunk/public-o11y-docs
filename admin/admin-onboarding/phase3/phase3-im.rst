.. _phase3-im:


Expansion and optimization part 1: Splunk Infrastructure Monitoring
*******************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, complete the following tasks:
   
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

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _expand-im1:

Build advanced dashboards and charts
================================================================================================================
As part of the expansion process, ensure you familiarize teams with creating and customizing dashboards. Make sure your teams can complete these tasks:

* Mirror and modify dashboards. 
* Use dashboard filters and dashboard variables. 
* Add text notes and event feeds to the dashboards.
* Use data links to dynamically link a dashboard to another dashboard, an external system, Splunk Application Performance Monitoring (APM), or Splunk Cloud Platform. 
* Link metadata to related resources.

For comprehensive documentation on these tasks, see the following topics:

- :ref:`dashboards`

- :ref:`data-visualization-charts`

- :ref:`link-metadata-to-content`

.. _expand-im2:

Build advanced detectors
================================================================================================================
Maximize your use of Splunk Infrastructure Monitoring by familiarizing your teams with advanced detectors. Advanced detectors enhance the basic list of alert conditions to take into account the different types of functions, such as additional firing, alert clearing conditions, or comparing 2 main functions using population_comparison.

To learn more, see the following topics:

- :ref:`get-started-detectoralert`

- :ref:`scenarios-alerts-detectors`

- :ref:`autodetect`

- :ref:`create-detectors`

- :ref:`linking-detectors`

- :ref:`auto-clearing-alerts`


.. _expand-im3:

Automate the token rotation process
================================================================================================================
Because tokens expire after 1 year, you can automate token rotation by using an API call. For a given token, when the API runs to create a new token, the old token continues to work until the time you specified in the grace period. Wherever the old token is in use, use the API call to automate token rotation within the grace period.

For example, you can use the API to rotate a token that a Kubernetes cluster uses to ingest metrics and trace data. The API generates a new token that you can store directly in the secret in the Kubernetes cluster as part of the automation so that the application retrieves the new token.

To learn more, see the following topics:

- :ref:`admin-tokens`

- :ref:`admin-api-access-tokens`

- :ref:`admin-tokens`

- :ref:`admin-org-tokens`


.. _expand-im4:

Identify and review mean time to resolution (MTTR)
================================================================================================================

When you use Splunk Observability Cloud, you can reduce the mean time to resolution (MTTR), of an issue. A long MTTR can be the result of many factors.

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Cause of long MTTR`
     - :strong:`Outcome`

   * - Appropriate people aren’t involved when an issue begins
     - More time is spent finding the right people to fix the issue and approve the remediation
   
   * - Lack of insight into the effects on other systems
     - More time is spent to analyze possible effects of a remediation procedure

   * - Teams use manual remediation procedures
     - Because teams are too busy investigating and responding to incidents, they don’t have time to build automation and improve systems

   * - Teams don’t have time to update runbooks
     - Without proper incident analysis and reporting, incident remediation runbooks often do not include critical information for resolving incidents


One factor might be the correct people aren't involved when an issue begins. After identifying the root cause, you must have the appropriate people to actually fix the issue, as well as the appropriate people to approve the remediation.

Another factor causing a long MTTR can be a lack of insight into the effects on other systems. Without proper insight into how infrastructure and applications interconnect, it takes time to analyze the possible effects of a remediation procedure. 

A third cause of long MTTR can be that teams are using manual remediation procedures. Often teams don't have time to build automation and improve systems because they are too busy investigating and responding to incidents.

A fourth factor can be that teams don't have time to update runbooks. Without proper incident analysis and reporting, incident remediation runbooks often do not include critical information for resolving incidents.

With Splunk Infrastructure Monitoring, the following scenario typically results in a total latency of less than 4 minutes between deployment and rollback:

1. A deployment happens.

2. The deployment causes an incident. 

3. The incident triggers an alert.

4. The alert triggers a rollback.

After this process completes, requests are back to normal. See :ref:`practice-reliability-incident-response`.

.. _expand-im5:

Use metrics pipeline management tools to reduce cardinality of metric time series (MTS)
================================================================================================================

As metrics data usage, or cardinality, grows in Splunk Infrastructure Monitoring, the cost increases.


You can reduce overall monitoring cost and optimize your return on investment by storing less critical metrics data at a much lower cost. To do this, use metrics pipeline management (MPM) tools within Splunk Infrastructure Monitoring. With MPM, you can make the following optimizations:

* Streamline storage and processing to evolve the metric analytics platform into a multitier platform.

* Analyze reports to identify where to optimize usage.

* Reduce metric time series (MTS) volume with rule-based metrics aggregation and filtering on dimensions.

* Drop dimensions that are not needed. 

You can configure dimensions through the user interface, the API, and Terraform.

For comprehensive documentation on MPM, see :ref:`metrics-pipeline-intro`.


.. _expand-im6:

Set up Network Explorer to monitor network environment
================================================================================================================
Use the Splunk Distribution of OpenTelemetry Collector Helm chart to configure Network Explorer. Network Explorer inspects packets to capture network performance data with extended Berkeley Packet Filter (eBPF), technology which is run by Linux Kernel. eBPF allows programs to run in the operating system when the following kernel events occur:

- When TCP handshake is complete

- When TCP receives an acknowledgement for a packet

Network Explorer captures network data that is passed on to the reducer and then to the Splunk OTel Collector. 

For Splunk OTel Collector to work with Network Explorer, you must install it in gateway mode. After installation, the Network Explorer navigator displays on the :guilabel:`Infrastructure` tab in Splunk Infrastructure Monitoring.

For comprehensive documentation on Network Explorer, see :ref:`network-explorer`.


.. _expand-im7:

Analyze and troubleshoot usage, limits, and throttles
================================================================================================================
To view Splunk Observability Cloud Subscription Usage data within your organization, you must have the admin role.

To analyze and troubleshoot usage, make sure you know how to complete the following tasks:

* Understand the difference between host-based and MTS-based subscription usage
* Read available reports, such as monthly usage reports, hourly usage reports, dimension reports, and custom metric reports

To learn more, see the following topics:

- :ref:`sys-limits`

- :ref:`data-o11y`


.. _expand-im8:

Automate key workflows to accelerate onboarding and standardize consistent practices 
================================================================================================================

In this expansion and optimization phase, you can start to automate the onboarding process workflow. For example, consider automating team creation, token ingestion, HEC tokens for Log Observer Connect, and token rotation. Also consider prescriptive onboarding guides for instrumentation, such as automatic discovery and configuration with the Splunk Distribution of OpenTelemetry Collector, or using separate instrumentation agents, including predefining required environment variables. 

Use Splunk Observability Cloud REST APIs to automatically assign default dashboards and detectors to new teams through automation.

To learn more, see the following topics:

- :ref:`discovery_mode`

- :ref:`dashboards-best-practices`


.. _expand-im9:

Identify complex and customized use cases to enhance value and return on investment
================================================================================================================
During the expansion and optimization phase, start identifying your teams' primary use cases and develop a plan to address their needs. Here are some examples of things teams might need to solve: 

- Handling large volumes of infrastructure data

- Increasing developer efficiency to solve problems during deployment

- Using Splunk Observability Cloud to monitor and control consumption rates of Kubernetes 

- Improving ROI (Return on Investment)

- Information on how to improve MTTR (Mean Time To Resolution) 

- Ensuring and improving customer experience 

.. _expand-im11:

Onboard all production applications
================================================================================================================
During this phase, you can automate most processes and add new services into Splunk Observability Cloud. You can continue expanding the OTel agent configuration library for all production applications. Populate all the necessary metrics to build the desired charts, dashboards, and detectors. Continue to onboard all production applications.


.. _expand-im12:

Onboard all users and teams
================================================================================================================
During this phase, you can onboard all users and teams into Splunk Observability Cloud. Turn on enhanced team security to identify team managers and users. Use enhanced security within teams to control who can view and who can modify each dashboard and detector.

To learn more, see the following topics:

- :ref:`user-managment-intro`

- :ref:`enhanced-team-security`


Next step
===============

Next, see :ref:`phase3-apm`.