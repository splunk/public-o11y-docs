.. _view-apm-billing-reports:

********************************************************************
View Splunk APM usage reports for your subscription plan
********************************************************************

.. meta::
   :description: View detailed APM billing information and download usage reports with metrics for your subscription plan.

.. note:: Use this topic to understand general aspects of subscription usage and consumption for Splunk APM. For more detailed billing-related queries, contact your Splunk Account Team.

Get detailed APM usage reports for recent usage periods to analyze subscription usage values. 

Prerequisite
================
To view the APM subscription usage page, you must have the admin or usage role.

Download an APM usage report
==============================

APM usage reports are available as tab-delimited text files. They include metrics and subscription usage for the entire usage period and break down usage. Follow these steps to view and download a usage report:

1. Go to :guilabel:`Settings` then :guilabel:`Subscription Usage` and select the :strong:`APM` tab.
   Depending on your org subscription model, this might be :guilabel:`Settings` then :guilabel:`Billing and Usage`.

2. Select :guilabel:`View Detailed Usage Reports`.

3. Select the usage report for the usage period you want to analyze. The usage report opens in a new tab.

4. To download the report, select the usage report and save it as a .txt file.

Metrics for host subscription plans
-----------------------------------

Usage reports for host subscription plans include the following information about your organization's usage:

* The number of billed hosts. Host data is available per minute.
* The number of billed containers. Container data is available per minute.
* The billed trace volume. Trace volume data is available per minute.
* The number of billed Troubleshooting MetricSets (TMS). TMS data is available per minute. 
* The number of billed Monitoring MetricSets (MMS). MMS data is available at 10-minute intervals.
* The average number of hosts.
* The average number of containers.
* The average number of Troubleshooting MetricSets.
* The average trace volume in bytes.

.. note:: To generate and download per-minute subscription usage reports for your hosts and containers, see :ref:`host-diagnostics-report-apm`.

Metrics for trace-analyzed-per-minute (TAPM) subscription plans
----------------------------------------------------------------

Usage reports for TAPM subscription plans include the following information about your organization's usage:

* The number of billed TAPM. TAPM data is available per minute.
* The billed trace volume. Trace volume data is available per minute.
* The number of billed Troubleshooting MetricSets (TMS). TMS data is available per minute. 
* The number of billed Monitoring MetricSets (MMS). MMS data is available at 10-minute intervals.
* The average number of TAPM.
* The average number of Troubleshooting MetricSets.
* The average trace volume in bytes.