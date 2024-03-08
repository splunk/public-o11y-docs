.. _phase3-im:


Expansion and optimization part 1: Splunk Infrastructure Monitoring
*******************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, you must do the following:
   
1. :ref:`expand-im1`

2. :ref:`expand-im2`

3. :ref:`expand-im3`

4. :ref:`expand-im4`

5. :ref:`expand-im5`

6. :ref:`expand-im6`

7. :ref:`expand-im7`

8. :ref:`expand-im8`

9. :ref:`expand-im9`

10. :ref:`Get internal feedback from O11y product with key user teams/admins and submit Splunk Ideas for Feature Requests <expand-im10>`

11. :ref:`Onboard all production applications <expand-im11>`

12. :ref:`Onboard all teams/users <expand-im12>`


.. _expand-im1:

Build advanced dashboards and charts
================================================================================================================
It is important to familiarize the teams with creating and customizing dashboards. Take advantage of the ability to mirror dashboards and modify the dashboards including dashboard filters and dashboard variables. Utilize the text notes and event feeds that can be added into the dashboards. Also familiarize the teams with data links to be able to dynamically link a dashboard to another dashboard or external system such as Splunk APM or a custom URL to Splunk Cloud Platform.

.. _expand-im2:

Build advanced detectors
================================================================================================================
It is important to familiarize the teams with advanced detectors, this will bring great advantage to utilize the Splunk IM product. These sets of advanced detectors are basically taking the basic list of Alert conditions and enhancing it to take into account the different types of functions, such as additional firing or clearing conditions for the alerts, or comparing two main functions using population_comparison, etc. Here is an example of SLX detectors utilizing the advanced SignalFlow library.

.. _expand-im3:

Automate token rotation process
================================================================================================================
As the various tokens do expire after a year, it is important to understand how to rotate the token gracefully using an automated process via an API call. Once the API is run for a given token, this will create a new token while the old token will continue to work until the time specified in grace_period. Update the old token value with new token value (wherever it is used) within time specified in grace_period.

For example, a token used for ingesting Metrics and Trace data that is used by the Kubernetes cluster (this stored in a Kubernetes secret) can be rotated using the API, and the new token can be stored directly into the secret in the Kubernetes cluster as part of the automation so the application can automatically retrieve the new token.

.. _expand-im4:

Identify and review MTTR reduction
================================================================================================================
It is important to understand why reducing MTTR (total time from start of issue to resolution of issue) is critical when using Splunk Observability Cloud. Several use case for reason of slow MTTR:
The right people aren’t in the room (once the root cause is identified, you need to make sure you have the right people to actually fix the issue and/or the people to approve the remediation)
Lack of insight into effects on other systems (without proper insight into how infrastructure and applications interconnect it takes time to analyze the possible effects of a remediation procedure)
Manual remediation procedure (i.e. teams are too busy responding to and investigating incidents to build automation and improve systems)
Non updated runbooks (without proper incident analysis and reporting, incident remediation runbooks are not updated and improved)
The following example of scenario for auto-remediation using Splunk IM: a deployment happened, this caused an issue, which triggered an alert, which triggered a rollback, total time from deployment went to latency and requests are back to normal in under 4 min! 

.. _expand-im5:

Utilize Metrics Pipeline Management tools to reduce cardinality of MTS
================================================================================================================
Understand that as metrics data usage grows (cardinality) in Splunk IM, cost will also increase, at the same time also understand that not all data is equal or important. Metrics Pipeline Management (MPM) functionality within Splunk IM has a mechanism to streamline some of the storage and processing, it also evolves the metric analytics platform into a multi-tier platform. This functionality helps reduce overall monitoring cost and optimized ROI (Return of Investment) by storing less critical metrics data at a much lower cost. 
MPM also provides reports to identify where to optimize usage. MPM has rule-based metrics aggregation and filtering on dimensions to help reduce MTS volume, it also allows users to drop dimensions that are not needed. These can be configured through User Interface, API and Terraform.

.. _expand-im6:

Set up Network Explorer to monitor network environment
================================================================================================================
Splunk Distribution of OpenTelemetry Collector Helm chart allows you to configure Network Explorer. Network Explorer inspects packets to capture network performance data with eBPF (extended Berkeley Packet Filter) technology which is run by linux kernel. eBPF allows programs to run in the OS when certain kernel events occur:

- Run eBPF when TCP handshake is complete

- Run eBPF when TCP receives an acknowledgement for a packet

Network Explorer captures network data that is passed onto the reducer and then to the Splunk OTel Collector. Note that in order for Splunk OTel Collector to work with Network Explorer, it needs to be installed in gateway mode.
Upon successful installation, the Network Explorer navigator will be present in the “Infrastructure” tab in the Splunk IM User Interface, you can also check the metrics sf.org.numNPMMetrics will be non zero.

.. _expand-im7:

Analyze and troubleshoot usage, limits and throttles
================================================================================================================
To view Splunk Observability Cloud Subscription Usage data within your org, you must have an administrative privilege. It is important to understand the two types of subscriptions usage, host based and MTS based plans. It is recommended that an admin of an org familiarize themselves with how to read the various reports available such as monthly usage report, hourly usage report, dimension report, and custom metric report. 

It is also essential to understand the system limits for Splunk IM. This will help to ensure your Splunk IM experience is optimized without overall degradation when these limits are exceeded. Make sure you are aware of all the various limits. 
Note also on data retention in Splunk IM.

.. _expand-im8:

Automate key workflows to further accelerate onboarding and standardize consistent practices 
================================================================================================================
It is recommended to automate the onboarding process workflow during this phase. For example: teams creation, token ingestion, HEC token for Log Observer Connect, and token rotation.
Also consider prescriptive onboarding guides for instrumentation such as Splunk OTel Zero configuration installation, or utilizing separate instrumentation agents, including predefining required environment variables.
It is recommended to use Splunk Observability Cloud REST APIs to automatically assign default dashboards and detectors to new teams via automation.

.. _expand-im9:

Identify more complex/customized use cases to further enhance value and ROI
================================================================================================================
During this phase, it is recommended to start identifying more complex use cases relevant to each of the teams requirements. 
Some example use case scenarios: How to handle huge volumes of infrastructure data? How to increase developer efficiency to solve problems during deployment? How to utilize Splunk Observability Cloud to be able to monitor and control consumption rates of Kubernetes? How to improve ROI (Return of Investment)? How to improve MTTD/MTTR? How to ensure and improve customer experience 4 9’s of availability?

.. _expand-im10:

Get internal feedback from O11y product with key user teams/admins and submit Splunk Ideas for Feature Requests
================================================================================================================
It is recommended to stay closely informed of any product enhancement from Splunk Observability  Cloud by engaging with Splunk SE (Sales Engineers), Splunk CSM (Customer Success Manager) and discussing any issues or concerns related to the product. Utilize the Splunk Ideas to submit any feature requests or upvote on existing ideas if it is relevant to your feature requests.

This will help to drive and improve Splunk Observability Cloud product strategy.

.. _expand-im11:

Onboard all production applications
================================================================================================================
During this phase, most processes can be automated and new services can be added into the Splunk Observability Cloud system. You can continue expanding the OTel agent configuration library for all production applications. These should populate all the necessary metrics to build the desired charts/dashboards and detectors. Continue onboard all production applications.

.. _expand-im12:

Onboard all teams/users
================================================================================================================
During this phase, all users and teams can be onboarded into Splunk Observability Cloud. It is recommended to turn on the enhanced teams security to identify teams managers vs. users within the teams and who can access which dashboards and detectors and who can modify this information vs. view only users within the teams.

Next step
===============

:ref:`phase3-apm`