.. _phase2-pilot-rollout:

Pilot rollout phase part 2: Initial pilot rollout
****************************************************************

.. meta::
    :description: 

After completing :ref:`phase2-rollout-plan`, you are ready for pilot rollout phase part 2. During this part of the pilot, you focus on rolling out Splunk Observability Cloud for the pilot teams and projects you identified in your plan. Set up includes the necessary deployments for getting data into Splunk Observability Cloud so you can begin using Infrastructure Monitoring, Application Performance Monitoring, Real User Monitoring, and Synthetics. 

For an initial rollout of Splunk Observability Cloud, complete the following tasks:

#. :ref:`set-up-im`
#. :ref:`set-up-apm`
#. :ref:`set-up-rum`
#. :ref:`create-syn-test`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _set-up-im:

Set up Infrastructure Monitoring
======================================================

Splunk Infrastructure Monitoring is the metrics solution in Splunk Observability Cloud that monitors and observes system metrics for physical and virtual components across enterprise hybrid and multi cloud environments. It supports a broad range of integrations for collecting full-fidelity data, from system metrics for infrastructure components to custom data from your applications. When Splunk Infrastructure Monitoring detects an issue, it triggers the incident management lifecycle. In addition to detecting an issue, you can also use Splunk Infrastructure Monitoring to investigate issues.

Connect to your cloud service provider
-------------------------------------------

Use the multiple integration and connection methods for AWS, Azure and GCP, to collect infrastructure metrics for applications hosted on cloud service providers. You don't have to connect to cloud services to monitor hosts or Kubernetes clusters that run in cloud services, but connecting to your cloud account is the only way to collect cloud metadata. To set up a cloud integration, navigate to :guilabel:`Data Management` then :guilabel:`Available Integrations` and select the cloud integration of choice, and walk through the guided setup. See :ref:`get-started-connect`.

(Optional) Deploy the Splunk OpenTelemetry Collector to export metrics from hosts and containers
--------------------------------------------------------------------------------------------------

Splunk Observability Cloud also supports optional integrations for Kubernetes, Linux, and Windows. See :ref:`get-started-compute`. To integrate these data sources, deploy the Splunk OpenTelemetry Collector to export metrics from hosts and containers into Splunk Observability Cloud. Deploy the Splunk OpenTelemetry Collector to get higher-resolution data than from the cloud integrations alone. See :ref:`otel-intro`.

For the most rapid deployment, use automatic discovery and configuration. See :ref:`discovery_mode`.

.. _set-up-apm:

Set up Application Performance Monitoring
=============================================================

Splunk Application Performance Monitoring (APM) is a monitoring and troubleshooting solution for microservice-based applications. APM monitors applications by collecting distributed traces. Traces are a collection of spans or actions that occur to complete a transaction. Instrumenting desired apps to collect and your application's spans and traces and break down and analyze application performance along any dimension in Splunk APM.  

If you use automatic discovery and configuration to instrument your infrastructure, you're already capturing APM data for supported technologies. See :ref:`discovery_mode`. For other technologies, follow the following data management steps.

Use the Splunk OpenTelemetry Collector to export spans and traces from Kubernetes, Linux, and Windows hosts and containers to Splunk Observability Cloud. To collect spans and traces from an infrastructure resource, select :guilabel:`Data Management` then :guilabel:`Available Integrations` and select the host type or containerized environment you want to collect from.
	
To begin instrumenting applications, you can export spans to an Splunk OpenTelemetry Collector running on the host or in a Kubernetes cluster that. How you specify the OTEL collector endpoint depends on the language you are instrumenting. To begin, select :guilabel:`Data Management` then :guilabel:`Avialable Integrations` then :guilabel:`Monitor Applications` and select the language you want to instrument. See :ref:`get-started-application` to learn more about how to instrument back-end services like Java, .NET, Node.js, Go, Python, Ruby, PHP, C++ and more.

.. _set-up-rum:

Set up Real User Monitoring
=============================================================

Splunk Real User Monitoring (RUM) offers visibility of the experience of their end users across device types, web browsers, and geographies, to identify and eliminate slowness (latency) across transactions and the entire architecture. Since RUM connects transactions from the web browser through back-end services, it helps on-call engineers spot slowness or errors, regardless of where a problem originates across a distributed system.

To activate RUM data capture, you first need to create an access token. You can use the access token can for either browser RUM or mobile RUM, which is available for both Android and iOS devices. See :ref:`rum-access-token`.

Splunk Observability Cloud provides a guided setup process to create the code snippets used to instrument your webpages. The guided setup process is available for browser, iOS, and Android monitoring. 

1. To start the guided setup, go to :guilabel:`Data Management` then :guilabel:`Available Integrations`. 
2. Select :guilabel:`By use case` in the dropdown menu and select :guilabel:`Monitor user experience`. 
3. Select the type of instrumentation you want to set up: :guilabel:`Browser Instrumentation`, :guilabel:`Android Instrumentation`, :guilabel:`iOS Instrumentation`, or :guilabel:`React Native Instrumentation (Beta)`.
4. Follow the guided setup.

See :ref:`rum-gdi` for manual instructions.

Use RUM and APM in conjunction to create a complete end-to-end view of every transaction from the end-user interaction, through micro services, and ultimately to database calls or other transaction termination points. You can link APM and RUM data as part of the instrumentation parameters. 

.. _create-syn-test:

Create a Synthetics test
=============================================================

Splunk Synthetic Monitoring offers 24/7 monitoring and alerting across critical endpoints, APIs, and business transactions to proactively find and fix issues of poor functionality or performance before engineering teams push new code. Teams can embed web performance into CI/CD processes with automatic pass/fail tests of new code based on performance budgets and standards. Splunk Synthetic Monitoring is often used to improve W3C metrics and the Lighthouse Performance Score on which Google bases its search rankings. 

Synthetic tests are the primary mechanism of webpage and application monitoring in Splunk Synthetic Monitoring. You can set up these tests to run at your preferred frequency from the devices and locations of your choosing. These let you proactively alert the relevant teams when a site or user flow they manage becomes unavailable, as well as report on the performance of a site or user flow over time. You do not need to deploy anything to get started with Synthetics. See :ref:`setup-first-test` to get started.

Next step
===============

Next, begin expanding and optimizing Splunk Observability Cloud in your organization. See :ref:`phase3`.




