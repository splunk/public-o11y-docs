.. _apm-extended-trace-retention:

***************************************
Configure extended trace retention
***************************************

.. Metadata updated: 1/23/23

.. meta::
  :description: Learn about extended trace retention in APM. 

When you reference specific traces in your internal workflow tracking or ticketing systems, you might want to retain access to those traces beyond the default retention period of 8 days. With extended trace retention, Splunk APM automatically extends the retention of all traces you view in the user interface so you don't lose your work.

Extended trace retention is enabled by default for an extended retention period of 30 days. You can customize the length of this extended retention period (up to 13 months) or opt out of extended retention in your APM Configuration settings. 

Note that extended trace retention applies specifically to traces viewed in the Splunk APM UI. The default 8 day retention period still applies to all other raw traces and to Troubleshooting MetricSets. 

.. You can also use the APM Extended Trace Retention API to request specific traces be retained by ``traceId``. See :new-page:`APM Extended Trace Retention API <https://quickdraw.splunk.com/redirect/?product=Observability&location=trace-retention-api&version=current>` to learn how to use this API. 

Customize your extended retention period
===============================================
Before you choose your extended retention period, consider any compliance requirements in your industry, such as the European General Data Protection Regulation (GDPR), that dictate how long you should retain customer information. 

Follow these steps to change your extended retention period: 

#. On the Splunk APM landing page, select :guilabel:`APM Configuration` and choose :guilabel:`APM Services & Traces`. The :guilabel:`APM Services & Traces` page opens. 
#. Under :guilabel:`Trace Retention`, ensure the radio button for :guilabel:`Retain traces for a selected period of time beyond the default period` is selected.
#. Under :guilabel:`Retention Period`, select the radio button for your desired retention period. Options include 30 days, 60 days, 90 days, and 13 months. 

With extended trace retention enabled, any trace viewed in the Splunk APM UI is automatically stored for the selected retention period. 

Disable extended retention
==================================
If you don't want your traces to be retained beyond the default retention period, follow these steps to disable extended trace retention for traces viewed in the UI.

#. On the Splunk APM landing page, select :guilabel:`APM Configuration` and choose :guilabel:`APM Services & Traces`. The :guilabel:`APM Services & Traces` page opens. 
#. Under :guilabel:`Trace Retention`, select the radio button for :guilabel:`Retain traces for the default period.`
