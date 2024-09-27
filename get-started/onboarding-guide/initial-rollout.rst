.. _onboarding-guide-initial-rollout:

Onboarding guide phase 2: Initial rollout
*********************************************************

In the initial rollout phase you get your data into Splunk Observability Cloud and set up the Splunk Observability Cloud solutions that apply to your organization. Solutions include: Infrastructure Monitoring, Application Performance Monitoring (APM), Real User Monitoring (RUM), and Synthetics.

.. image:: /_images/get-started/onboarding-guide-2point0-initial.svg
   :width: 100%
   :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.

To configure your users, teams, and tokens complete the following tasks:

#. :ref:`phase2-initial-environment`
#. :ref:`phase2-infra-mon`
#. :ref:`phase2-apm`
#. :ref:`phase2-rum`
#. :ref:`phase2-synthetics`

.. _phase2-initial-environment:

Choose an initial rollout environment 
========================================

To get started with Splunk Observability Cloud, choose an environment with a technology stack that allows you to use automatic discovery or the prepackaged integrations with cloud providers including AWS, Azure, and GCP. See :ref:`discovery_mode` and :ref:`get-started-connect`. 

If you do not have an environment that allows you to use automatic discovery or the cloud service provider integrations see…

.. _phase2_infra-mon:

Set up Splunk Infrastructure Monitoring
=========================================

Use Splunk Infrastructure Monitoring to gain insight into and run analytics on your infrastructure and resources for physical and virtual components across hybrid and multicloud environments. Infrastructure Monitoring offers support for a broad range of integrations for collecting full-fidelity data, from system metrics for infrastructure components to custom data from your applications.

#. Use the integrations for AWS, Azure and GCP to collect infrastructure metrics for applications hosted on cloud service providers. See :ref:`get-started-connect`. 
#. Use the integrations for Kubernetes, Linux and Windows to collect higher-resolution infrastructure metrics and logs. 
    #. For the most rapid deployment, use automatic discovery and configuration. See :ref:`discovery_mode`.
    #. To install the collector for Kubernetes, see :ref:`get-started-k8s`.
    #. To install the collector for Linux, see :ref:`get-started-linux`.
    #. To install the collector for Windows, see :ref:`get-started-windows`.

.. _phase2_apm:

Set up Splunk Application Performance Monitoring (APM)
========================================================

Use Splunk Application Performance Monitoring (APM) to monitor and troubleshoot microservices-based applications. APM monitors applications by collecting distributed traces, which are a collection of spans or actions that occur to complete a transaction. After you instrument your applications, Splunk APM collects and analyzes every trace and span and provides full-fidelity, infinite-cardinality exploration of trace data. Use Splunk APM trace data to break down and analyze application performance across any dimension.
	
If you used automatic discovery and configuration to instrument your infrastructure, you’re already capturing APM data for supported technologies.  
For other technologies, to begin sending APM trace data, you need to deploy the Splunk OpenTelemetry Collector. The collector exports spans and traces from Kubernetes, Linux and Windows hosts and containers to Splunk Observability Cloud. See Get started with the Splunk Distribution of the OpenTelemetry Collector.

.. _phase2_rum:

Set up Splunk Real User Monitoring (RUM)
==========================================

Splunk Observability Cloud helps optimize web, mobile, and application performance with best in class digital experience monitoring solutions - Splunk Synthetic Monitoring and Splunk Real User Monitoring.

Use Splunk Real User Monitoring (RUM) to gain visibility into the experience of your end-users across device types, web browsers, and geographies. RUM can help you identify slowness (latency) across transactions to eliminate and prevent slowness that impacts end users. Splunk Real User Monitoring connects transactions from the web browser through backend services, so your on-call engineers can spot slowness or errors, regardless of where a problem originates across a distributed system.
 
To enable RUM data capture, you need to create an access token. The access token can be used for either browser RUM or mobile RUM, which is available for both Android and iOS devices. See Set up Splunk RUM for mobile and browser applications.
Use the guided setup to create the required code snippets to use to instrument your webpages.  See Install the Browser RUM agent for Splunk RUM. 
Use the guided setup for iOS and Android mobile device monitoring. 
APM and RUM data can be linked together as part of the instrumentation parameters. You can then use RUM and APM in conjunction to create a complete end to end view of every transaction from the end user interaction, through micro services, and ultimately to database calls or other transaction termination points.  

.. _phase2_synthetics:

Set up Splunk Synthetic Monitoring
======================================

Use Splunk Synthetic Monitoring to monitor and alert across critical endpoints, APIs, and business transactions and proactively find and fix functionality or performance issues. Your engineering teams can embed automatic pass/fail tests of new code based on performance budgets and standards into CI/CD processes. You can use Splunk Synthetic Monitoring to improve W3C metrics and the Lighthouse Performance Score on which Google bases its search rankings. 

To get started with Splunk Synthetic Monitoring, create 1 of the 3 available tests: browser, uptime, or API. See Set up Splunk Synthetic Monitoring.
