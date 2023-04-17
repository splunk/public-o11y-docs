.. _subscription-overview:

*********************************************************************
Monitor subscription usage for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Monitor your Infrastructure Monitoring, APM, and Log Observer subscription usage. 

.. toctree::
   :hidden:

   apm-billing-usage-index
   view-apm-billing-reports
   analyze-apm-billing-usage
   apm-system-limits
   monitor-imm-billing-usage
   dpm-usage
   lo-billing-usage

View Splunk Observability subscription usage data to monitor your organization's usage against its subscription plan and entitlements. You must be an administrator to view the Subscription Usage page for your organization. Go to :guilabel:`Settings > Subscription Usage`. Depending on your org subscription model, this might be :guilabel:`Settings > Billing and Usage`.

.. _usage-source:

.. raw:: html

   <embed>
      <h2>Usage and billing by source<a name="usage-source" class="headerlink" href="#usage-source">¶</a></h2>
   </embed>

Observability Cloud admins can monitor billing usage for the following:

-  :ref:`Monitor Splunk APM subscription usage<apm-billing-usage-index>`
-  :ref:`Analyze Splunk APM subscription usage data for your subscription plan<analyze-apm-billing-usage>`
-  :ref:`Splunk APM system limits<apm-system-limits>`
-  :ref:`View APM billing reports<view-apm-billing-reports>`
-  :ref:`Monitor Splunk Infrastructure Monitoring subscription usage<monitor-imm-billing-usage>`
-  :ref:`Monitor Splunk Infrastructure Monitoring billing and usage (DPM plans only)<dpm-usage>`
-  :ref:`Monitor Log Observer subscription usage<lo-billing-usage>`

.. _usage-limits-throttling:

.. raw:: html

   <embed>
      <h2>Data ingestion limits<a name="usage-limits-throttling" class="headerlink" href="#usage-limits-throttling">¶</a></h2>
   </embed>

Observability Cloud has system limits that help ensure good performance, stability, and reliability. Exceeding these limits might degrade your experience. Learn more at :ref:`System limits for Splunk Infrastructure Monitoring <sys-limits>`. 

If you exceed your ingestion limits you might incurr in overcost. To help avoid overage fees, :ref:`create a detector <create-detectors>` to proactively monitor for potential overages and receive alerts when you are nearing a subscription limit.

.. caution:: Make sure you understand what's included in your subscription. For more detailed queries about your subscription and billing, contact your Splunk Account Team. 

Data ingest can be limited at the source by Cloud providers. You can track this with the metric ``sf.org.num.<cloudprovidername>ServiceClientCallCountThrottles``.