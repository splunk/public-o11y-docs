.. _analyze-apm-billing-usage:

*********************************************************************
Analyze Splunk APM subscription usage data for your subscription plan
*********************************************************************

.. meta::
   :description: How APM calculates subscription usage information and download usage reports to monitor your organization.

.. note:: Use this topic to understand general aspects of subscription usage and consumption for Splunk APM. For more detailed billing-related queries, contact your Splunk Account Team.

Use the APM subscription usage page to view charts that track your organization's APM usage against its limits.

You can also go to the subscription usage page to get detailed reports for each usage period. For more information, see :ref:`view-apm-billing-reports`. 

Prerequisite
==============

To view the APM subscription usage page, you must have the admin or usage role.

View your APM subscription usage
====================================

To view your organization's APM subscription usage, go to :guilabel:`Settings` then :guilabel:`Subscription Usage` and select the :guilabel:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings` then :guilabel:`Billing and Usage`.

How APM calculates usage
========================

APM uses Splunk Observability Cloud metrics to calculate usage for traces-analyzed-per-minute (TAPM) and host subscription plans. Limits for host subscription plans are based on the number of hosts and containers sending data to APM. Limits for TAPM subscription plans are based on the number of traces you send to APM per minute.

APM provides a value for each usage metric the system collects for each subscription usage period. The billed value is the average per-minute usage throughout the usage period. Use the charts on the APM Subscription Usage page that plot these metrics so you can monitor the billed value for each metric.

See the following sections for more information about how APM calculates usage for each subscription plan type. To confirm the plan for your organization, view the :guilabel:`Subscription` panel on the Subscription Usage page.

The following sections detail the metrics for TAPM and host subscription plans respectively.

.. _tapm_subscription_plans:

Metrics for TAPM subscription plans
-----------------------------------

The following metrics power the charts in your APM Subscription Usage page with a TAPM subscription plan:

.. list-table::
   :header-rows: 1 
   :widths: 25, 25, 50

   * - :strong:`Metric`
     - :strong:`Chart`
     - :strong:`Description`

   * - ``sf.org.apm.numTracesReceived``
     - TAPM
     - The number of traces Splunk APM receives and processes.

   * - ``sf.org.apm.numSpanBytesReceived``
     - Trace Volume
     - The number of bytes Splunk APM accepts from ingested span data after decompression, filtering and throttling.

   * - ``sf.org.apm.numTroubleshootingMetricSets``
     - Troubleshooting MetricSets
     - The cardinality of Troubleshooting MetricSets for each 1-minute window.

.. _host_subscription_plans:

Metrics for host subscription plans
-----------------------------------

The following metrics power the charts in your APM Subscription Usage page with a host subscription plan:

.. list-table::
   :header-rows: 1
   :widths: 25, 25, 50

   * - :strong:`Metric`
     - :strong:`Chart`
     - :strong:`Description`

   * - ``sf.org.apm.numHosts``
     - Hosts
     - The number of hosts that are actively sending data to Splunk APM.

   * - ``sf.org.apm.numContainers``
     - Containers
     - The number of containers actively sending data to Splunk APM.

   * - ``sf.org.apm.numSpanBytesReceived``
     - Trace Volume
     - The number of bytes Splunk APM accepts from ingested span data after decompression following filtering and throttling.

   * - ``sf.org.apm.numTroubleshootingMetricSets``
     - Troubleshooting MetricSets
     - The cardinality of Troubleshooting MetricSets for each 1-minute window.


   * - ``sf.org.apm.numMonitoringMetricSets``
     - Monitoring MetricSets
     - The cardinality of Monitoring MetricSets for each 10-minute window.

To see all of the organization metrics for APM, see :ref:`Usage metrics for Splunk Observability Cloud <org-metrics>`.

The detailed usage report for each usage period provides the billed value for each usage metric. For more information about APM usage reports, see :ref:`view-apm-billing-reports`.

.. _host-diagnostics-report-apm:

Subscription usage report for hosts and containers
=========================================================

For host subscription plans, you can request and download reports that show which hosts and containers are sending APM data over a specific minute. Use this report to identify which hosts and containers are contributing to your subscription usage. You can generate and download reports within the retention period for traces. See :ref:`apm-data-retention` for more information.

To download a subscription usage report, do the following:

#. Go to :menuselection:`Settings` then :menuselection:`Subscription Usage` and select the :guilabel:`APM` tab.
#. Expand the :guilabel:`Hosts` chart or the :guilabel:`Containers` chart.
#. Select an hour of time in the chart.
#. Select a specific minute within the hour.
#. Select :guilabel:`Download Data` to download the CSV file.

For each selected minute, the report shows the attributes or tags associated with the hosts and containers that sent data to Splunk APM. You might see different tags, like ``AWSUniqueId``, ``container_id``,  ``gcp_id``, and so on depending on the source of the host or container observed and the version of your instrumentation agent.

.. caution:: For Kubernetes deployments, the Kubernetes attributes processor extracts default attributes, such as ``k8s.pod.name``. These attributes are required for accurate subscription usage. Don't remove the Kubernetes attributes processor from your configuration. See :ref:`kubernetes-attributes-processor` for more information.