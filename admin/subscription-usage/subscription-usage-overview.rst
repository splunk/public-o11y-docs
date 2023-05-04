.. _subscription-overview:

*********************************************************************
Monitor and manage subscription usage
*********************************************************************

.. meta::
   :description: Monitor your Infrastructure Monitoring, APM, and Log Observer subscription usage. 

.. toctree::
   :hidden:

   APM subscription usage <apm-billing-usage-index>
   APM billing reports <view-apm-billing-reports>
   Analyze APM usage <analyze-apm-billing-usage>
   APM system limits <apm-system-limits>
   Infrastructure subscription usage (Host plans) <monitor-imm-billing-usage>
   Infrastructure subscription usage (DPM plans) <dpm-usage>
   Logs subscription usage <lo-billing-usage>

View Splunk Observability subscription usage data to monitor your organization's usage against its subscription plan and entitlements. 

You must be an Observability Cloud administrator to view the Subscription Usage page for your organization. Go to :guilabel:`Settings > Subscription Usage` or :guilabel:`Settings > Billing and Usage`, depending on your subscription model.

.. _usage-source:

.. raw:: html

   <embed>
      <h2>Usage and billing by source</h2>
   </embed>

Observability Cloud admins can monitor billing usage for the following:

-  :ref:`Monitor Splunk APM subscription usage<apm-billing-usage-index>`
-  :ref:`Analyze Splunk APM subscription usage data for your subscription plan<analyze-apm-billing-usage>`
-  :ref:`View APM billing reports<view-apm-billing-reports>`
-  :ref:`Splunk APM system limits<apm-system-limits>`
-  :ref:`Monitor Splunk Infrastructure Monitoring subscription usage<monitor-imm-billing-usage>`
-  :ref:`Monitor Splunk Infrastructure Monitoring billing and usage (DPM plans only)<dpm-usage>`
-  :ref:`Monitor Log Observer subscription usage<lo-billing-usage>`

.. _system-limits:

.. raw:: html

   <embed>
      <h2>System limits</h2>
   </embed>

Observability Cloud has system limits that help ensure good performance, stability, and reliability. Exceeding these limits might degrade your experience. 

Learn more at :ref:`per-product-limits` and the following docs:

* :ref:`System limits for Splunk Infrastructure Monitoring <sys-limits>` 
   
   * Data ingest can be limited at the source by Cloud providers. You can track this with the metric ``sf.org.num.<cloudprovidername>ServiceClientCallCountThrottles``.

* :ref:`APM system limits <apm-system-limits>`

* :ref:`Log Observer Connect limits <lo-connect-limits>` and :ref:`Log Observer limits <logs-limits>`

* :ref:`System limits for Splunk RUM <rum-limits>`

If you exceed your ingestion limits you might incurr in overcost. To help avoid overage fees, :ref:`create a detector <create-detectors>` to proactively monitor for potential overages and receive alerts when you are nearing a subscription limit.

.. caution:: Make sure you understand what's included in your subscription. For more detailed queries about your subscription and billing, contact your Splunk Account Team. 

