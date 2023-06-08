.. _get-started-logs:

*************************************
Introduction to Splunk Log Observer
*************************************

.. meta::
   :description: Get started investigating issues with Splunk Log Observer. Resolve incidents faster through log filtering, aggregations, and analysis.



If you do not have a Log Observer entitlement and instead use Log Observer Connect, see :ref:`logs-intro-logconnect`. 

=========================================
What is Log Observer?
=========================================

Troubleshoot your application and infrastructure behavior using high-context logs in these applications:

- Log Observer
- Log Observer Connect

In Log Observer, you can perform codeless queries on logs to detect the source of problems in your systems. You can also extract fields from logs to set up log processing rules and transform your data as it arrives or send data to Infinite Logging S3 buckets for future use. See
:ref:`LogObserverFeatures` to learn more about Log Observer capabilities.

In Log Observer Connect, you can perform codeless queries on your Splunk Enterprise or Splunk Cloud Platform logs. See :ref:`logs-intro-logconnect` to learn what you can do with the Splunk platform integration.

.. _LogObserverFeatures:

=========================================
What can I do with Log Observer?
=========================================
The following table lists features available to customers with a Log Observer entitlement. If you don't have a Log Observer entitlement in Observability Cloud, see :ref:`logs-intro-logconnect` to discover features available to customers of the Splunk platform integration.

.. list-table::
   :header-rows: 1
   :widths: 40, 30, 30

   * - :strong:`Do this`
     - :strong:`With this tool`
     - :strong:`Link to documentation`

   * - View your incoming logs grouped by severity over time and zoom in or out to the time period of your choice.
     - Timeline
     - :ref:`logs-timeline`

   * - Create a chart to see trends in your logs.
     - Log metricization rules
     - :ref:`logs-metricization`

   * - Find out which path in your API has the slowest response time.
     - Log aggregations
     - :ref:`logs-aggregations`

   * - Filter your logs to see only logs that contain the field :guilabel:`error`.
     - Logs table
     - :ref:`logs-keyword`

   * - Redact data to mask personally identifiable information in your logs.
     - Field redaction processors
     - :ref:`field-redaction-processors`

   * - Confirm that a recent fix stopped a problem.
     - Live Tail
     - :ref:`logs-live-tail`

   * - Apply processing rules across historical data to find a problem in the past.
     - Search-time rules
     - :ref:`logs-search-time-rules`

   * - Transform your data or a subset of your data as it arrives in Observability Cloud.
     - Log processing rules
     - :ref:`logs-processors`

   * - Minimize expense by archiving unindexed logs in Amazon S3 buckets for potential future use.
     - Infinite Logging rules
     - :ref:`logs-infinite`

   * - See the metrics, traces, and infrastructure related to a specific log.
     - Related Content
     - :ref:`get-started-scenario`


=========================================
Get started with Log Observer
=========================================
If you have a Log Observer entitlement and want to set up Log Observer and start performing queries on your logs, see :ref:`logs-logs`.

If you don't have a Log Observer entitlement in Observability Cloud, see :ref:`logs-set-up-logconnect` or :ref:`logs-scp` to learn how to set up Log Observer Connect and begin querying your Splunk platform logs.