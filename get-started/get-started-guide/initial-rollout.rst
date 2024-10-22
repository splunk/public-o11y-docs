.. _get-started-guide-initial-rollout:

Get started guide phase 2: Initial rollout
*********************************************************

After completing the :ref:`get-started-guide-onboarding-readiness`, you are ready for phase 2, initial rollout. In the initial rollout phase you get your data into Splunk Observability Cloud and set up the Splunk Observability Cloud products that apply to your organization. Products include: Infrastructure Monitoring, Application Performance Monitoring (APM), Real User Monitoring (RUM), and Synthetics.

To get a high-level overview of the entire getting started journey for Splunk Observability Cloud, see :ref:`get-started-guide`.

.. note:: This guide is for Splunk Observability Cloud users with the admin role. 

.. image:: /_images/get-started/onboarding-guide-2point0-initial.svg
   :width: 100%
   :alt: 

To configure Splunk Observability Cloud solutions for initial rollout, complete the following task if the are relevant to your organization:  

#. :ref:`phase2-initial-environment`
#. :ref:`phase2-infra-mon`
#. :ref:`phase2-apm`
#. :ref:`phase2-rum`
#. :ref:`phase2-synthetics`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager as you get started. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _phase2-initial-environment:

Select an initial rollout environment to get data in
========================================================

To get started with Splunk Observability Cloud, select an environment with a technology stack that supports the use of automatic discovery or the prepackaged integrations with cloud providers including AWS, Azure, and GCP. See :ref:`discovery_mode` and :ref:`get-started-connect` for detailed setup steps.

If you do not have an environment that supports the use of automatic discovery or the cloud service provider integrations, the following sections include additional options for getting data in for specific use cases. You can also get an overview of getting data into Splunk Observability Cloud in the see :ref:`get-started-get-data-in` guide.

.. _phase2-infra-mon:

Set up Splunk Infrastructure Monitoring
=========================================

Use Splunk Infrastructure Monitoring to get insight into and run analytics on your infrastructure and resources for physical and virtual components across hybrid and multicloud environments. Infrastructure Monitoring offers support for a broad range of integrations for collecting full-fidelity data, from system metrics for infrastructure components to custom data from your applications.

To set up Splunk Infrastructure Monitoring, complete the following steps:

#. Use the integrations for AWS, Azure and GCP to collect infrastructure metrics for applications hosted on cloud service providers. See :ref:`get-started-connect`. 
#. Use the integrations for Kubernetes, Linux, and Windows to collect higher-resolution infrastructure metrics and logs. 
    * For the most rapid deployment, use automatic discovery and configuration. See :ref:`discovery_mode`.
    * If automatic discovery does not support your use case, install the collector for your data source. See :ref:`get-started-k8s`, :ref:`get-started-linux`, or :ref:`get-started-windows`.

.. _phase2-apm:

Set up Splunk Application Performance Monitoring (APM)
========================================================

Use Splunk Application Performance Monitoring (APM) to monitor and troubleshoot microservices-based applications. APM monitors applications by collecting distributed traces, which are a collection of spans or actions that complete a transaction. After you instrument your applications, Splunk APM collects and analyzes every trace and span and provides full-fidelity, infinite-cardinality exploration of trace data. Use Splunk APM trace data to break down and analyze application performance across any dimension.


To set up Splunk Application Performance Monitoring, complete the following steps:
	
#. If you used automatic discovery and configuration to instrument your infrastructure, you're already capturing APM data for supported technologies. See :ref:`discovery_mode`. 
   
   To send APM trace data for technologies not supported by automatic discovery, deploy the Splunk distribution of the OpenTelemetry Collector. Follow the guided setup steps for the collector for Kubernetes, Linux, and Windows. See :ref:`get-started-k8s`, :ref:`get-started-linux`, or :ref:`get-started-windows`.
#. To instrument your applications, you can export spans to a collector running on the host or in the Kubernetes cluster that you deployed in the previous step. The collector endpoint varies depending on the language you are instrumenting. Use the specific guided setups for each language. See :ref:`get-started-application`.

.. _phase2-rum:

Set up Splunk Real User Monitoring (RUM)
==========================================

Use Splunk Real User Monitoring (RUM) to get visibility into the experience of your end users across device types, web browsers, and geographies. RUM connects transactions from the web browser through back-end services, so your on-call engineers can spot slowness or errors, regardless of where a problem originates across a distributed system.

To set up Splunk Real User Monitoring, complete the following steps:

#. To turn on RUM data capture, you need to create an access token. You can use an access token for either browser RUM or mobile RUM. Mobile RUM is available for both Android and iOS devices. See :ref:`rum-setup` for steps to set up an access token. 
#. Use the guided setup to create the required code snippets to use to instrument your webpages. The JavaScript resources can be self hosted, CDN hosted, or deployed as an NPM package for single-page web applications. 
    * Go to the :new-page:`guided setup for browser instrumentation <https://login.signalfx.com/#/gdi/scripted/browser/step-1?category=use-case-user-experience&gdiState=%7B%22integrationId%22:%22browser%22%7D>`. 
    * See :ref:`browser-rum-install` for detailed manual installation instructions. 
#. Use the guided setup for iOS and Android mobile device monitoring. 
    * See :ref:`rum-mobile-android` for guided setup steps for Android.
    * See :ref:`rum-mobile-ios` for guided setup steps for iOS. 
#. To create a complete end-to-end view of every transaction from the end user interaction, through micro services, and ultimately database calls or other transaction termination points, link your RUM and APM data. You can link RUM and APM data as part of the instrumentation parameters. See :ref:`rum-apm-connection`.

.. _phase2-synthetics:

Set up Splunk Synthetic Monitoring
======================================

Use Splunk Synthetic Monitoring to monitor and alert across critical endpoints, APIs, and business transactions and proactively find to fix functionality or performance issues. Your engineering teams can embed automatic pass/fail tests of new code based on performance budgets and standards into CI/CD processes. You can use Splunk Synthetic Monitoring to improve W3C metrics and the Lighthouse Performance Score on which Google bases its search rankings. 

To get started with Splunk Synthetic Monitoring, create 1 of the 3 available tests: browser, uptime, or API. See :ref:`set-up-synthetics`.

.. _phase2-advanced-config:

Optional and advanced configurations
======================================================================

Consider these optional and advanced configurations to customize your setup as they apply to your organization. 

.. _phase3-network-exp:

Set up Network Explorer to monitor network environment
----------------------------------------------------------
Use the Splunk Distribution of OpenTelemetry Collector Helm chart to configure Network Explorer. Network Explorer inspects packets to capture network performance data with extended Berkeley Packet Filter (eBPF), technology which is run by Linux Kernel. eBPF allows programs to run in the operating system when the following kernel events occur:

- When TCP handshake is complete

- When TCP receives an acknowledgement for a packet

Network Explorer captures network data that is passed on to the reducer and then to the Splunk OTel Collector. 

For Splunk OTel Collector to work with Network Explorer, you must install it in gateway mode. After installation, the Network Explorer navigator displays on the :guilabel:`Infrastructure` tab in Splunk Infrastructure Monitoring.

For comprehensive documentation on Network Explorer, see :ref:`network-explorer`.

.. _phase2-profiling:

Turn on AlwaysOn Profiling to collect stack traces
-----------------------------------------------------------------

Use AlwaysOn Profiling for deeper analysis of the behavior of select applications. Code profiling collects snapshots of the CPU call stacks and memory usage. After you get profiling data into Splunk Observability Cloud, you can explore stack traces directly from APM and visualize the performance and memory allocation of each component using the flame graph. 

Use this profiling data to gain insights into your code behavior to troubleshoot performance issues. For example, you can identify bottlenecks and memory leaks for potential optimization.

.. _phase2-related-content:

Turn on Related Content
-----------------------------

Turn on Related Content as part of your data integration setup so you can navigate between APM, Log Observer Connect, and Infrastructure Monitoring in Splunk Observability Cloud with your selected filters and context automatically applied to each view. :ref:`get-started-relatedcontent`.

Education resources
=====================

* Get familiar with OpenTelemetry concepts including the configuration of the pipeline components: receivers, processors, exporters, and connectors. See :new-page:`https://opentelemetry.io/docs/concepts/`.
* To learn more about the data model for Splunk Observability Cloud, see :ref:`data-model`.

Next step
===============

Next, prepare to scale your rollout of Splunk Observability Cloud. See :ref:`get-started-guide-scaled-rollout`.
