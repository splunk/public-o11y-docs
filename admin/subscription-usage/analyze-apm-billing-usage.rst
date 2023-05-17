.. _analyze-apm-billing-usage:

*********************************************************************
Analyze Splunk APM subscription usage data for your subscription plan
*********************************************************************

.. meta::
   :description: How APM calculates subscription usage information and download usage reports to monitor your organization.

.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

Use the APM subscription usage page to view charts that track your organization's APM usage against its entitlements. You have to be an administrator to view the Subscription Usage page for your organization.

You can also use the Subscription Usage page to get detailed reports for each usage period. For more information, see :ref:`view-apm-billing-reports`. 

To view your organization's APM subscription usage, go to :guilabel:`Settings > Subscription Usage` and select the :guilabel:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.

How APM calculates usage
========================

APM uses Splunk Observability Cloud metrics to calculate usage for traces analyzed per minute (TAPM) and host subscription plans. Entitlements for host subscription plans are based on the number of hosts and containers sending data to APM. Entitlements for TAPM subscription plans are based on the number of traces you send to APM per minute.

As a result, the metrics for calculating usage depend on the subscription plan type. See the following sections for more information about how APM calculates usage for each subscription plan type. To confirm the plan for your organization, view the :guilabel:`Subscription` panel on the Subscription Usage page.

To see all of the organization metrics for APM, see :ref:`Usage metrics for Splunk Observability Cloud <org-metrics>`.

To see the usage charts and metrics for your subscription plan, go to :guilabel:`Settings > Subscription Usage` and select the :strong:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`. The following sections detail the metrics for TAPM and host subscription plans respectively.

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

.. note:: See :ref:`host-diagnostics-report-apm` for more information on how to measure subscription usage by host.

How APM calculates usage 
==========================

APM provides a value for each usage metric the system collects for each subscription usage period. The billed value is the higher of these metric values:

- The average per-minute usage throughout the usage period.

- 50% of the peak usage for the usage period.

Every chart on the APM Billing and Usage page plots these metrics so you can monitor the billed value for each metric.

The detailed usage report for each usage period provides the billed value for each usage metric. The following example illustrates how the billed value is based on the higher value of the usage metrics for a usage period:

.. code-block:: none

   # The billed TAPM value for this month is: 47064

   # The average TAPM value for this month is: 31516

   # The halfpeak TAPM value for this month is: 47064

For more information about APM usage reports, see :ref:`view-apm-billing-reports`.

.. _host-diagnostics-report-apm:

Subscription usage report for hosts and containers
=========================================================

For host subscription plans, you can request and download reports that show which hosts and containers are sending APM data over a specific minute. This can help you identify which hosts and containers are contributing to your subscription usage.

To download a subscription usage report, do the following:

- Go to :menuselection:`Settings > Subscription Usage` and select the :strong:`APM` tab.
- Expand the :guilabel:`Hosts` chart or the :guilabel:`Containers` chart.
- Select an hour of time in the chart.
- Select a specific minute within the hour.
- Select :guilabel:`Download Data` to download the CSV file.

For each selected minute, the report shows the attributes or tags associated with the hosts and containers that sent data to Splunk APM. You might see different tags, like ``AWSUniqueId``, ``container_id``,  ``gcp_id``, and so on depending on the source of the host or container observed and the version of your instrumentation agent.

.. note:: You can generate and download reports within the retention period for traces. See :ref:`apm-data-retention` for more information.