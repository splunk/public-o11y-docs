.. _lo-billing-usage:

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

To see the usage charts and metrics for your subscription plan, go to :guilabel:`Settings > Subscription Usage` and select the :strong:`APM` tab. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.  The following sections detail the metrics for TAPM and host subscription plans respectively.

