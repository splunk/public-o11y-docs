.. _apm-billing-usage-index:

*************************************************
Monitor Splunk APM subscription usage
*************************************************

.. meta::
   :description: View APM subscription usage information and download usage reports to monitor your organization.

.. note:: General aspects of subscription usage and consumption for Splunk APM. For more detailed billing-related queries, contact your Splunk Account Team.

View Splunk APM subscription usage data to monitor your organization's usage against its subscription plan and entitlements. You have to be an administrator to view the APM Subscription Usage page for your organization. Go to :strong:`Settings > Subscription Usage` and select the :strong:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.

For any questions about subscription usage, contact your tech support member or sales representative.

The Subscription Usage page explains the following information about your organization:

- The type of plan

- The entitlement limits for your subscription plan

- The monthly billed value of each entitlement

- The per-minute usage of each entitlement

.. note::

   The APM Subscription Usage page displays a tile for Monitoring MetricSets, but the metric that powers the chart is not currently available.

How APM calculates usage
=========================================

APM calculates per-minute usage for your subscription plan. There are two types of subscription plans: :strong:`host` and :strong:`traces analyzed per minute (TAPM)`. To learn more about how APM monitors billing and usage for each subscription plan type, see :ref:`analyze-apm-billing-usage`.

For each subscription plan type, download detailed usage reports for recent usage periods. Reports break down usage for each minute in a usage period and provide the following type of information:

- The number of billed hosts and containers, if applicable

- The number of billed TAPM, if applicable

- The number of billed Troubleshooting MetricSets

- The billed trace volume

For more information about detailed usage reports, see :ref:`view-apm-billing-reports`.