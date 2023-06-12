.. _customize-apm: 

****************************************
Customize your Splunk APM experience
****************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn about advanced configurations to help you get the most out of Splunk APM. 

Now that you’ve explored what you can do with Splunk APM, you can consider more advanced configurations to tailor Splunk APM to your business needs.

Prerequisites
==============
Before you set up advanced configurations in Splunk APM, do the following:

1. :ref:`apm-gdi`
2. :ref:`apm-orientation`

Customize Splunk APM
========================
Once you have started sending traces to Splunk APM and have familiarized yourself with what it can help you accomplish, consider these ways to customize your APM experience. 

Index additional span tags
---------------------------
As a Splunk APM administrator, you can index additional span tags to generate custom request, error, and duration (RED) metrics for tag values within a service. Indexed span tags become filter options within Tag Spotlight, enable breakdowns in the service map, and generate RED metrics. RED metrics for indexed span tags are known as :ref:`Troubleshooting MetricSets<troubleshooting-metricsets>`. To learn more about adding and indexing span tags, see :ref:`apm-span-tags`.

Filter APM by deployment environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
While you are adding span tags in your instrumentation, consider including the ``deployment.environment`` tag. This allows you to filter your Splunk APM experience by deployment environment, such as by development, staging, and production. See :ref:`apm-environments` to learn more. 

Track service performance with dashboards
------------------------------------------------------
Go to :guilabel:`Main menu > Dashboards > APM Services` and select a service dashboard to view charts and visualized metrics about a specific service in Splunk APM. You can edit and save new versions of built-in dashboards to make the information most important to your team easily accessible. See :ref:`apm-dashboards` to learn more.

Enable Database Query Performance
------------------------------------------------------
Splunk APM identifies databases as inferred services in your system to help you see where database-related issues might be causing errors or latency in your services. With Database Query Performance, APM provides additional analytics for supported SQL databases. Database Query Performance is available by default, so all you need to do is enable the feature to begin indexing database-related span tags. See :ref:`db-query-performance` to get started.  

Set up detectors to receive alerts when issues arise
-------------------------------------------------------
You can use detectors to dynamically monitor error rate and latency in the services you are tracing with Splunk APM. See :ref:`apm-alerts` to learn more. 

Set up Business Workflows
---------------------------
Administrators can also set up Business Workflows to correlate, monitor, and troubleshoot related traces that make up end-to-end transactions in your system. This lets you filter Service Level Indicators (SLIs) and visualizations by the transaction types you care about most. To learn more about Business Workflows, see :ref:`apm-workflows`.

Continue learning about Splunk APM
============================================
The following resources provide additional information about Splunk APM:

* For an overview of important terms and concepts in Splunk APM, see :ref:`APM terms and concepts <apm-key-concepts>`.
* For a series of Splunk APM scenarios, see :ref:`apm-scenarios-intro`.
* For a set of interactive walkthroughs of Splunk APM, see :new-page:`APM Scenarios <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-walkthrough&version=current>`. 

.. For an example that shows you how to identify the root cause of issues with APM, see :ref:`Example APM root cause investigation <apm-find-root-cause>`.