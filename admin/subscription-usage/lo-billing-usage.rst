.. _lo-billing-usage:

*********************************************************************
Monitor Log Observer subscription usage
*********************************************************************

.. meta::
   :description: How Log Observer calculates subscription usage information so you can monitor your organization.

.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

Use the Log Observer subscription usage page to view charts that track your organization's Log Observer usage against its entitlements. You have to be an administrator to view the Subscription Usage page for your organization. 

To view your organization's Log Observer subscription usage, go to :guilabel:`Settings > Subscription Usage` and select the :guilabel:`Log Observer` tab. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.

What Log Observer tracks 
====================================

Log Observer provides visibility to your logging ingest and indexing usage, measured in gigabytes. Ingestion and indexing are measured separately. The monthly ingest and indexing allowance your org has purchased displays along with your term start and end dates. This lets you  monitor when you need to renew your quotas.

There are three charts available:
   * Current usage - The current monthly total usage for each of ingest and indexing. Your plan limits are indicated on the chart.
   * Ingest usage trend - The ingest usage trend for the current month against your plan total.
   * Index usage trend - The index usage trend for the current month against your plan total.

Only indexing performed by Log Observer is tracked as part of your indexing usage. If you pipe the log information ingested by Log Observer for storage or indexing elsewhere, that usage is not included in the data on this page.
