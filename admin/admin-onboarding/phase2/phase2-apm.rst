.. _phase2-apm:

Pilot phase part 2: Initial pilot rollout for Splunk Application Performance Monitoring
*****************************************************************************************

As with the Splunk Infrastructure Monitoring pilot rollout, your initial pilot rollout for Application Performance Monitoring (APM) focuses on bringing initial pilot teams with a lot of microservices or connections to many services into the APM.

The rollout includes:

#. :ref:`customize-APM-exp`
#. :ref:`service-perf-dashboards`
#. :ref:`service-map-dependencies`
#. :ref:`inferred-services`
#. :ref:`error-spans`
#. :ref:`use-metricsets`
#. :ref:`tag-spotlight-values`
#. :ref:`apm-detectors`
#. :ref:`always-on-trouble`
#. :ref:`launch-apm`

.. _customize-APM-exp:

Customize Splunk APM for your organization
=============================================

Get familiar with the options to customize Splunk APM to accommodate your organization. The following are some example customizations to consider using:

* The most common customization is to index specific span tags that are important to your organization. As a Splunk APM administrator, you can index additional span tags to generate custom request, error, and duration (RED) metrics for tag values within a service. Indexed span tags are used throughout APM as filter values and values to use to break down views like the service map. 
* You might also want to turn on Database Query Performance to pinpoint whether a database is causing slowness in your applications. Database query performance finds trends in aggregate database queries without the need of database instrumentation. This helps service owners determine whether an increase in the latency or error rate of a service is related to a database. You can then use Database Query Performance to identify which database and query is contributing to the latency.  
* You can use Business Workflows to group traces based on their initiating operation or another tag or endpoint. Use Business Workflows you can monitor end-to-end KPIs and find root causes and bottlenecks. 

See :ref:`customize-apm` for an overview of customization options for APM.

Set up deployment environments
===================================

You likely want to set up various deployment environments. A deployment environment is a distinct deployment of your system or application that allows you to set up configurations that don't overlap with configurations in other deployments of the same application. Separate deployment environments are often used for different stages of the development process, such as development, staging, and production. For this pilot rollout, you might choose to start with only 1 deployment environment, for example a development or staging environment that facilitates testing. 

For details about setting up a deployment environment, see :ref:`apm-environments`.

.. _service-perf-dashboards:

Learn how to use dashboards to track service performance
=============================================================

Get familiar with the Splunk APM built-in dashboards you can use to troubleshoot issues related to services, endpoints, Business Workflows. For details about troubleshooting issues related to services, endpoints, and more, see :ref:`apm-custom-dashboards`.

.. _service-map-dependencies:

Understand dependencies among your services in the service map
======================================================================

In a distributed environment, there is considerable complexity in how services are stitched together. USe the Splunk APM service map to understand how different services in your distributed environment interact with each other. Get familiar with the detailed breakdowns within the service map to understanding accelerate troubleshooting of services and dependencies.

See :ref:`apm-service-map` for details about the service map.

.. _inferred-services:

Get familiar with how Splunk APM infers services
=====================================================

If you have remote services that you can't instrument or have yet to instrument, Splunk APM infers the presence of these remote services. See :ref:`apm-inferred-services` to learn more.

.. _error-spans:

Learn how to analyze error spans
==========================================

There are several ways to identify errors in a span by utilizing the following metadata tags. Get familiar with how error spans are identified. 

See :ref:`apm-errors` for more details.

.. _use-metricsets:

Learn how to use MetricSets
=======================================

There are the 2 types of MetricSets in Splunk APM:

* Monitoring MetricSets (MMS) are used for real-time monitoring and alerting. MMS are created by default for services, endpoints, and workflows. Each Monitoring MetricSet contains the following metrics: request rate, error rate and latency. MMS are stored for 13 months by default.
* Troubleshooting MetricSets (TMS) used for high-cardinality troubleshooting, filtering service map, breaking down SLIs, and historical comparison for span and workflows. Troubleshooting MetricSets are created by default for services, endpoints, workflows, edges, and operations. Each TMS contains the following metrics: request rate, error rate and latency. TMS data is stored for 8 days by default.

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

If you turn on AlwaysOn Profiling you can perform deeper analysis of the behavior of select applications. Code profiling collects snapshots of the CPU call stacks and collects snapshots of memory usage. 

See :ref:`profiling-intro` to learn more about troubleshooting with AlwaysOn Profiling.

.. _launch-apm:

Launch APM for production applications
=======================================================

For each of your teams, start sending traces to Splunk APM for production environments. Share this guide and :ref:`get-started-apm` with your teams so they learn what they can do with Splunk APM and customize the Splunk APM experience. 

Next step
===============

:ref:`phase3`

