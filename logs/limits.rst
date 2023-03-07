.. _logs-limits:

*********************************************************************************************
Log Observer limits
*********************************************************************************************

.. meta::
  :description: See Log Observer limits on MB of data ingested or indexed per month, limits on the number and type of processing rules, and search query limits.

This page documents Splunk Log Observer service limits and behavior. System protection limits are meant to allow for stability and availability of multi-tenant systems and are subject to fine-tuning and change without notice.

Log Observer ingest and index limits
=============================================================================================

The following table lists Log Observer's log ingestion and indexing limits:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - MB ingested per month
     - Determined by your subscription

   * - MB indexed per month
     - Determined by your subscription

MB ingested per month
---------------------------------------------------------------------------------------------

The :guilabel:`Log volume ingestion` entitlement is determined by your organization's contract. It can be translated from Host purchased, or can be based on GB usage per month. The amount of this monthly capacity that you can use per hour or per minute, or "burst limit", is a multiple of your contractual limit. You can increase your contract limit MB/month. You cannot increase the burst limit MB/hour or MB/minute as it is a system limit to ensure the protection of your data.

:guilabel:`Important:` This limit is a system protection limit and is subject to change based on system availability and fine-tuning.

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Any log data that exceeds the limit in that bucket (hourly and minutely) will be dropped and not ingested.

.. note:: Splunk can increase this limit on a customer's request. The customer is subject to overage charges.

MB indexed per month
---------------------------------------------------------------------------------------------

The :guilabel:`Log volume indexed` entitlement is determined by your organization's contract. It can be translated from Host purchased, or can be based on GB usage per month. The amount of this monthly capacity that you can use per hour or per minute, or "burst limit", is a multiple of your contractual limit. You can increase your contract limit MB/month. You cannot increase the burst limit MB/hour or MB/minute as it is a system limit to ensure the protection of your data.

:guilabel:`Important:` This limit is a system protection limit and is subject to change based on system availability and fine-tuning.

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Any log data that exceeds the limit in that bucket (hourly and minutely) will be dropped and not indexed.ß

.. note:: Splunk can increase this limit on a customer's request. The customer is subject to overage charges.

Log Observer processing rule limits
=============================================================================================

The following table lists Log Observer's processing rule limits:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - Maximum number of processing rules
     - 128

Maximum number of processing rules
---------------------------------------------------------------------------------------------

This is the maximum number of processing rules that an organization can create. An organization can create 128 combined log processing rules, including field extraction rules, field copy rules, and field redaction rules. An organization can also create a total of 128 infinite logging rules and 128 log metricization rules.

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
No new log processing rules can be created. 

.. note:: Log Observer has a hard limit of 128 rules. Splunk cannot increase this limit at a customer's request.

Log Observer search query limits
=============================================================================================

The following table lists Log Observer's search query limits:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - Maximum number of saved search queries
     - 1,000

   * - Maximum number of logs processed for Fields Summary
     - 150,000

   * - Maximum number of concurrent live tails
     - 2,048

Maximum number of saved search queries
---------------------------------------------------------------------------------------------
This is the maximum number of saved search queries that can be created in an organization.

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The user experience might degrade and is not guaranteed to be functional.

Maximum number of logs processed for the Fields Summary
---------------------------------------------------------------------------------------------

The Log Observer UI displays a summary of fields and their value distribution. By default, it processes the most recent 150,0000 events to generate this view. 

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the search results contain more than 150,000 events, then only the latest 150,000 events are processed.

Maximum number of concurrent live tails
---------------------------------------------------------------------------------------------

This is the maximum number of live tails that can be running at the same time. These queries are dispatched as the user interacts with the Log Observer Live Tail UI. 

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Additional live tail queries are queued until an existing live tail is canceled. Live tail queries do not return data while queued. 
