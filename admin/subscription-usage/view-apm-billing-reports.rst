.. _view-apm-billing-reports:

********************************************************************
View Splunk APM usage reports for your subscription plan
********************************************************************

.. meta::
   :description: View detailed APM billing information and download usage reports with metrics for your subscription plan.


.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.


Get detailed APM usage reports for recent usage periods to analyze subscription usage values and per-minute usage. You have to be an administrator to view the :guilabel:`Subscription Usage` page for your organization.

Download an APM usage report
==============================

APM usage reports are available as tab-delimited text files. They include metrics and subscription usage for the entire usage period and break down usage for each minute in the usage period. Follow these steps to view and download a usage report:

1. Go to :guilabel:`Settings > Subscription Usage` and select the :strong:`APM` tab.
   Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.

2. Select :guilabel:`View Detailed Usage Reports`.

3. Select the usage report for the usage period you want to analyze. The usage report opens in a new tab.

4. To download the report, right-click the usage report and save it as a ``.txt`` file.

Metrics for host subscription plans
-----------------------------------

In addition to per-minute usage metrics, usage reports for host subscription plans include the following information about your organization's usage:

- The number of billed hosts

- The number of billed containers

- The number of billed Troubleshooting MetricSets

- The billed trace volume

- 50% of the peak number of hosts

- 50% of the peak number of containers

- 50% of the peak number of Troubleshooting MetricSets

- 50% of the peak trace volume

- The average number of hosts

- The average number of containers

- The average number of Troubleshooting MetricSets

- The average trace volume in bytes

.. note:: To generate and download per-minute subscription usage reports for your hosts and containers, see :ref:`host-diagnostics-report-apm`.

Metrics for TAPM subscription plans
-----------------------------------

In addition to per-minute usage metrics, usage reports for TAPM subscription plans include the following information about your organization's usage:

- The number of billed TAPM

- The number of billed Troubleshooting MetricSets

- The billed trace volume

- 50% of the peak number of TAPM

- 50% of the peak number of Troubleshooting MetricSets

- 50% of the peak trace volume

- The average number of TAPM

- The average number of Troubleshooting MetricSets

- The average trace volume in bytes
