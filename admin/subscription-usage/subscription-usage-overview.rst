.. _subscription-overview:

*********************************************************************
Monitor and manage subscription usage and billing
*********************************************************************

.. meta::
   :description: Monitor your Infrastructure Monitoring, APM, and Log Observer subscription usage. 

.. toctree::
   :hidden:

   APM subscription usage <apm-billing-usage-index>
   APM billing reports <view-apm-billing-reports>
   Analyze APM usage <analyze-apm-billing-usage>
   Infrastructure subscription usage (Host and metrics plans) <monitor-imm-billing-usage>
   Manage Infrastructure billing (Host and metrics plans) <imm-billing>
   Infrastructure subscription usage (DPM plans) <dpm-usage>
   Logs subscription usage <lo-billing-usage>
   RUM subscription usage <rum-subscription-usage>
   View parent-child subscription usage <parent-child-orgs>

View Splunk Observability Cloud subscription usage data to monitor your organization's usage against its subscription plan and entitlements. 

You must be an Splunk Observability Cloud administrator to view the Subscription Usage page for your organization. Go to :guilabel:`Settings` then :guilabel:`Subscription Usage`.

.. _usage-source:

.. raw:: html

   <embed>
      <h2>Usage and billing by source</h2>
   </embed>

Splunk Observability Cloud admins can monitor billing usage for the following:

-  :ref:`Monitor Splunk APM subscription usage <apm-billing-usage-index>`
-  :ref:`Analyze Splunk APM subscription usage data for your subscription plan <analyze-apm-billing-usage>`
-  :ref:`View APM billing reports <view-apm-billing-reports>`
-  :ref:`Monitor Splunk Infrastructure Monitoring subscription usage (Host plans) <monitor-imm-billing-usage>`
-  :ref:`Manage Infrastructure costs and billing (Host plans) <imm-billing>`
-  :ref:`Monitor Splunk Infrastructure Monitoring subscription usage (DPM plans only) <dpm-usage>`
-  :ref:`Monitor Log Observer subscription usage <lo-billing-usage>`
-  :ref:`Monitor RUM subscription usage <rum-subscription-usage>` 
-  :ref:`Monitor parent-child subscription usage <parent-child-orgs>`

.. _system-limits:

.. raw:: html

   <embed>
      <h2>System limits</h2>
   </embed>

Splunk Observability Cloud has system limits that help ensure good performance, stability, and reliability. Exceeding these limits might degrade your experience. 

If you exceed your ingestion limits you might incurr in overcost. To help avoid overage fees, :ref:`create a detector <create-detectors>` to proactively monitor for potential overages and receive alerts when you are nearing a subscription limit.

Make sure you understand what's included in your subscription. For more detailed queries about your subscription and billing, contact your Splunk Account Team. 

Learn more at :ref:`per-product-limits` and the following docs:

* :ref:`System limits for Splunk APM <apm-system-limits>`

* :ref:`System limits for Splunk Infrastructure Monitoring <sys-limits>` 
   
   * Data ingest can be limited at the source by Cloud providers. You can track this with the metric ``sf.org.num.<cloudprovidername>ServiceClientCallCountThrottles``.

* :ref:`Log Observer Connect limits <lo-connect-limits>` and :ref:`Log Observer limits <logs-limits>`

* :ref:`System limits for Splunk RUM <rum-limits>`