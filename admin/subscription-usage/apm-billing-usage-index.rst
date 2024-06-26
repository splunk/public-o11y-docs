.. _apm-billing-usage-index:

Monitor Splunk APM billing and subscription usage
*************************************************

.. meta::
   :description: View APM billing subscription usage information and download usage reports to monitor your organization.

.. note:: Use this topic to understand general aspects of subscription usage for Splunk APM. For more detailed billing-related queries, contact your Splunk Account Team.

The following table includes the Splunk APM billing and subscription usage information that is available for you to use to monitor your organization usage against its subscription plan and limits. 

.. list-table::
   :header-rows: 1
   :widths: 65, 35

   * - :strong:`Subscription usage information`
     - :strong:`Location`

   * - Type of plan
     - See :ref:`APM subscription usage page<view-apm-subscription-usage>`.

   * - The average usage and the percent of limit for the following aspects of Splunk APM. 
        * Hosts (for host subscription plans) 
        * Containers (for host subscription plans) 
        * Troubleshooting MetricSets
        * Trace volume
        * Monitoring MetricSets 
     - See :ref:`APM subscription usage page<view-apm-subscription-usage>`.

   * - The subscription limits for your subscription plan. 
     - See :ref:`APM subscription usage page<view-apm-subscription-usage>`.

   * - Usage metrics for host subscription plans. See :ref:`host-usage-metrics` for a complete list.
     - See :ref:`Detailed usage reports<download-apm-usage-reports>`.

   * - Usage metrics for trace-analyzed-per-minute (TAPM) subscription plans. See :ref:`tapm-usage-metrics` for a complete list.
     - See :ref:`Detailed usage reports<download-apm-usage-reports>`.

   * - Host and container diagnostics
     - See :ref:`Host and container dignostic report<host-diagnostics-report-apm>`

   * - Throttling and limits metrics
     - See :ref:`APM throttling dashboard<apm-throttling-entitlement>`
  
   * - Historical subscription usage metrics data
     - See :ref:`APM entitlements dashboard<apm-throttling-entitlement>`


Prerequisite
==============

To view the APM subscription usage page, you must have the admin or usage role.

.. _view-apm-subscription-usage:

View APM subscription usage
==================================

Go to :guilabel:`Settings` then :guilabel:`Subscription Usage` and select the :strong:`APM` tab. Depending on your organization subscription, you might need to go to :guilabel:`Settings` then :guilabel:`Billing and Usage`. Select the :guilabel:`APM` tab.

The subscription usage page displays the following information about your organization's usage:

* The type of plan
* The average usage and the percent of limit for the following aspects of Splunk APM. The average is also the monthly billed value. Select the panel to see per-minute data. 
    * Hosts (for host subscription plans) 
    * Containers (for host subscription plans) 
    * Troubleshooting MetricSets
    * Trace volume
    * Monitoring MetricSets 
* The subscription limits for your subscription plan. Select a panel to access subscription limit information.

.. note::

   The APM subscription usage page displays a panel for Monitoring MetricSets (MMS), but the metric that powers the chart is not currently available on the subscription usage page. Select :guilabel:`View Detailed Usage Reports` to view your current histogram MMS data. For more information about detailed usage reports, see :ref:`download-apm-usage-reports`.

For any questions about subscription usage, contact tech support or your sales representative.

  .. image:: /_images/admin/apm-subscription-usage-page.png
    :width: 95%
    :alt: APM subscription usage page.

.. _download-apm-usage-reports:

Download detailed usage reports
===================================

Download detailed usage reports for recent usage periods to better understand your usage. APM usage reports are available as tab-delimited text files. They include metrics and subscription usage for the entire usage period. Follow these steps to view and download a usage report:

1. Go to :guilabel:`Settings` then :guilabel:`Subscription Usage` and select the :strong:`APM` tab. Depending on your organization subscription, you might need to go to :guilabel:`Settings` then :guilabel:`Billing and Usage`.

2. Select :guilabel:`View Detailed Usage Reports`.

3. Select the usage report for the usage period you want to analyze. The usage report opens in a new tab.

4. To download the report, select the usage report and save it as a .txt file.

.. _host-usage-metrics:

Usage report metrics for host subscription plans
---------------------------------------------------

Usage reports for host subscription plans include the following information about your organization usage:

* The number of billed hosts. Host data is available per minute.
* The number of billed containers. Container data is available per minute.
* The billed trace volume. Trace volume data is available per minute.
* The number of billed Troubleshooting MetricSets (TMS). TMS data is available per minute. 
* The number of billed Monitoring MetricSets (MMS). MMS data is only available for histogram MMS and is only available in the usage report. MMS data is available at 10-minute intervals.
* The average number of hosts. Averages are available in usage reports for complete months only.
* The average number of containers. Averages are available in usage reports for complete months only.
* The average number of Troubleshooting MetricSets. Averages are available in usage reports for complete months only.
* The average number of Monitoring MetricSets. Averages are available in usage reports for complete months only.
* The average trace volume in bytes. Averages are available in usage reports for complete months only.

.. note:: To generate and download subscription usage reports for your hosts and containers, see :ref:`host-diagnostics-report-apm`.

.. _tapm-usage-metrics:

Usage report metrics for trace-analyzed-per-minute (TAPM) subscription plans
------------------------------------------------------------------------------

Usage reports for TAPM subscription plans include the following information about your organization usage:

* The number of billed TAPM. TAPM data is available per minute.
* The billed trace volume. Trace volume data is available per minute.
* The number of billed Troubleshooting MetricSets (TMS). TMS data is available per minute. 
* The number of billed Monitoring MetricSets (MMS). MMS data is only available for histogram MMS and is only available in the usage report. MMS data is available at 10-minute intervals.
* The average number of TAPM. Averages are available in usage reports for complete months only.
* The average number of Troubleshooting MetricSets. Averages are available in usage reports for complete months only.
* The average number of Monitoring MetricSets. Averages are available in usage reports for complete months only.
* The average trace volume in bytes. Averages are available in usage reports for complete months only.

.. _host-diagnostics-report-apm:

Download a host and container diagnostic report
==============================================================

For host subscription plans, you can download reports that show which hosts and containers are sending APM data over a specific minute. Use this report to identify which hosts and containers are contributing to your subscription usage. You can generate and download reports within the retention period for traces. See :ref:`apm-data-retention` for more information.

To download a subscription usage report, do the following:

#. Go to :menuselection:`Settings` then :menuselection:`Subscription Usage` and select the :guilabel:`APM` tab.
#. Expand the :guilabel:`Hosts` chart or the :guilabel:`Containers` chart.
#. Select an hour of time in the chart with in the retention period for traces.
#. Select a specific minute within the hour.
#. If you've selected a minute that falls within the trace retention period the :guilabel:`Download Data` becomes active and displays the minute you selected. Select the download button to download  the .csv file.

  .. image:: /_images/admin/host-usage-diagnostics.gif
    :width: 95%
    :alt: Animated image that shows Selecting a minute within the hosts chart to download a diagnostic report.

For each selected minute, the report shows the attributes or tags associated with the hosts and containers that sent data to Splunk APM. You might see different tags, like ``AWSUniqueId``, ``container_id``,  ``gcp_id``, and so on, depending on the source of the host or container observed and the version of your instrumentation agent.

.. caution:: For Kubernetes deployments, the Kubernetes attributes processor extracts default attributes, such as ``k8s.pod.name``. These attributes are required for accurate subscription usage. Don't remove the Kubernetes attributes processor from your configuration. See :ref:`kubernetes-attributes-processor` for more information.

.. _apm-throttling-entitlement:

Use the APM throttling and entitlement dashboards to better understand your usage
===================================================================================

Select :guilabel:`Dashboards` and search for "APM entitlements and "APM throttling" to access the :guilabel:`APM entitlements` and :guilabel:`APM throttling` dashboards to further examine your usage. The APM entitlements dashboard provides historical data for metrics used on the :guilabel:`Subscription Usage` page. The APM throttling dashboard includes metrics that track throttling and limits in your organization. Several metrics in the APM throttling dashboard have detectors set up to send alerts when metrics for your organization are being throttled.

How APM calculates usage
========================

APM uses Splunk Observability Cloud metrics to calculate usage for traces-analyzed-per-minute (TAPM) and host subscription plans. Limits for host subscription plans are based on the number of hosts and containers sending data to APM. Limits for TAPM subscription plans are based on the number of traces you send to APM per minute.

APM provides a value for each usage metric the system collects for each subscription usage period. Use the charts on the APM Subscription Usage page that plot these metrics so you can monitor the billed value for each metric.

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

   * - ``sf.org.apm.numMonitoringMetricSets``
     - Monitoring MetricSets
     - The cardinality of Monitoring MetricSets for each 10-minute window.

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
