.. _apm-billing-usage-index:

*************************************************
Monitor Splunk APM subscription usage
*************************************************

.. meta::
   :description: View APM subscription usage information and download usage reports to monitor your organization.

.. note:: Use this topic to understand general aspects of subscription usage and consumption for Splunk APM. For more detailed billing-related queries, contact your Splunk Account Team.

View Splunk APM subscription usage data to monitor your organization's usage against its subscription plan and limits. 

Prerequisite
==============

To view the APM subscription usage page, you must have the admin or usage role.

View APM subscription usage
==================================

Go to :guilabel:`Settings` then :guilabel:`Subscription Usage` and select the :strong:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings` then :guilabel:`Billing and Usage`.

The subscription usage page displays the following information about your organization's usage:

* The type of plan
* The subscription limits for your subscription plan - This information is available when you select a tile on the subscription usage page.
* The monthly billed value of each subscription limit - This information is available when you select a tile on the subscription usage page.

.. note::

   The APM subscription usage page displays a tile for Monitoring MetricSets (MMS), but the metric that powers the chart is not currently available on the subscription usage page. Select :guilabel:`View Detailed Usage Reports` to your current histogram MMS data. For more information about detailed usage reports, see :ref:`view-apm-billing-reports`.

For any questions about subscription usage, contact tech support or your sales representative.

How APM calculates usage
=========================================

APM calculates usage for your subscription plan. There are 2 types of subscription plans: host or traces analyzed per minute (TAPM). To learn more about how APM monitors billing and usage for each subscription plan type, see :ref:`analyze-apm-billing-usage`.

Download detailed usage reports
===================================

Download detailed usage reports for recent usage periods to better understand your usage. Reports break down usage in a usage period and provide the following information:

* The number of billed hosts and containers, if applicable. Host and container data is available per minute.
* The number of billed TAPM, if applicable. TAPM data is available per minute. 
* The billed trace volume. Trace volume data is available per minute.
* The number of billed Troubleshooting MetricSets (TMS). TMS data is available per minute.
* The number of billed Monitoring MetricSets (MMS). MMS data is only available for histogram MMS and is only available in the usage report. MMS data is available at 10-minute intervals.

For more information about detailed usage reports, see :ref:`view-apm-billing-reports`.