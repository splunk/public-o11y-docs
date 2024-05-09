.. _phase2-apm:

Pilot phase part 3: Initial pilot rollout for Splunk Application Performance Monitoring
*****************************************************************************************

After completing :ref:`phase2-im`, you are ready for pilot rollout phase part 3. As with the Splunk Infrastructure Monitoring pilot rollout, your initial pilot rollout for Application Performance Monitoring (APM) focuses on bringing initial pilot teams with many microservices or connections to services into APM.

To onboard APM, complete these tasks: 

#. :ref:`customize-APM-exp`
#. :ref:`deployment-environments`
#. :ref:`service-perf-dashboards`
#. :ref:`service-map-dependencies`
#. :ref:`inferred-services`
#. :ref:`error-spans`
#. :ref:`use-metricsets`
#. :ref:`tag-spotlight-values`
#. :ref:`apm-detectors`
#. :ref:`always-on-trouble`
#. :ref:`launch-apm`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _customize-APM-exp:

Customize Splunk APM for your organization
=============================================

Get familiar with the options to customize Splunk APM to accommodate your organization. For example, here are some common customizations:

* The most common customization is to index specific span tags that are important to your organization. As a Splunk APM administrator, you can index additional span tags to generate custom request, error, and duration (RED) metrics for tag values within a service. Indexed span tags are used throughout APM as filter values and values to use to break down views like the service map. 
* You can turn on Database Query Performance to pinpoint whether a database is slowing your applications. Database Query Performance finds trends in aggregate database queries without needing database instrumentation. This helps service owners determine whether an increase in the latency or error rate of a service is related to a database. You can then use Database Query Performance to identify which database and query is contributing to the latency.  
* You can use Business Workflows to group traces based on their initiating operation or another tag or endpoint. With Business Workflows, you can monitor end-to-end key performance indicators (KPIs) and find root causes and bottlenecks. 

See :ref:`customize-apm` for an overview of customization options for APM.

.. _deployment-environments:

Set up deployment environments
===================================

You likely want to set up various deployment environments. A deployment environment is a distinct deployment of your system or application that allows you to set up configurations that don’t overlap with configurations in other deployments of the same application. You can use separate deployment environments for different stages of the development process, such as development, staging, and production. For this pilot rollout, you might choose to start with only 1 deployment environment, for example a development or staging environment that facilitates testing. 

For details about setting up a deployment environment, see :ref:`apm-environments`.

.. _service-perf-dashboards:

Use dashboards to track service performance
=============================================================

Get familiar with the Splunk APM built-in dashboards so you can use them to troubleshoot issues related to services, endpoints, and business workflows. For details about troubleshooting issues related to services, endpoints, and more, see :ref:`apm-dashboards`.

.. _service-map-dependencies:

Understand dependencies among your services in the service map
======================================================================

In a distributed environment, there is considerable complexity in how services are stitched together. Use the Splunk APM service map to understand how different services in your distributed environment interact with each other. Get familiar with the detailed breakdowns within the service map to understand how to accelerate troubleshooting services and dependencies.

See :ref:`apm-service-map` for details about the service map.

.. _inferred-services:

Get familiar with how Splunk APM infers services
=====================================================

If you have remote services that you can't instrument or have yet to instrument, Splunk APM infers the presence of these remote services. See :ref:`apm-inferred-services` to learn more.

.. _error-spans:

Learn how to analyze error spans
==========================================

Get familiar with how to identify errors in a span through metadata tags.  See :ref:`apm-errors` for more details.

.. _use-metricsets:

Learn how to use MetricSets
=======================================

You can use 2 types of MetricSets in Splunk APM:

* Monitoring MetricSets (MMS) are used for real-time monitoring and alerting. MMS are created by default for services, endpoints, and workflows. Each Monitoring MetricSet contains the following metrics: request rate, error rate and latency. MMS are stored for 13 months by default.
* Troubleshooting MetricSets (TMS) used for high-cardinality troubleshooting, filtering the service map, breaking down service level indicators (SLIs), and historical comparison for span and workflows. Troubleshooting MetricSets are created by default for services, endpoints, workflows, edges, and operations. Each TMS contains the following metrics: request rate, error rate and latency. TMS data is stored for 8 days by default.

See :ref:`apm-metricsets`.

.. _tag-spotlight-values:

Learn how to use Tag Spotlight to analyze services
===========================================================================================================

Use Tag Spotlight to quickly discover granular trends across different user categories, environments, and so on that might be contributing to latency or errors on a service. Hone in on the latency and error rate peaks by drilling into top tags or specific tags and values. From Tag Spotlight, you can jump into a representative trace when you are ready to dive deeper.

See :ref:`apm-tag-spotlight` to learn more.

.. _apm-detectors:

Set up APM detectors
===========================

Splunk APM automatically captures request, error, and duration (RED) metrics for each service in your application. Use these metrics to create dynamic alerts based on sudden change or historical anomalies. 

See :ref:`apm-alerts`.

.. _always-on-trouble:

Learn how to troubleshoot using AlwaysOn Profiling
==============================================================

If you enable AlwaysOn Profiling, you can perform deeper analysis of the behavior of select applications. Code profiling collects snapshots of the CPU call stacks and of memory usage. 

See :ref:`profiling-intro` to learn more about troubleshooting with AlwaysOn Profiling.

Next step
===============

Next, begin expanding and optimizing Splunk Observability Cloud in your organiziation. See :ref:`phase3`.