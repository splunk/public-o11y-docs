.. _lo-transition:


**************************************************************************************************************
Splunk Log Observer transition
**************************************************************************************************************

.. meta::
  :description: Discover how you can transition from Splunk Log Observer to Splunk Log Observer Connect where you can ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.

All Splunk Log Observer customers must transition to Splunk Log Observer Connect by January 2024. Log Observer customers can now use Splunk Cloud Platform and Splunk Enterprise for logging and data analytics. Using the Splunk platform allows you to ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and use logging for security use cases. You can still use Splunk Observability Cloud for observability. Migrating from Log Observer to the Splunk platform for logging does not have any impact on your ability to use Splunk Observability Cloud to correlate logs, metrics, and traces.

How to transition to Log Observer Connect
==============================================================================================================

To transition to Splunk Log Observer Connect, you must take the following actions:

1. Reach out to your Splunk regional sales manager to request assistance with the transition. The deadline is October 31, 2023.

2. Connect your Splunk platform instance to your Log Observer Connect instance. See :ref:`logs-scp` or :ref:`logs-set-up-logconnect`, depending on the type of Splunk platform deployment you have.

3. If you have a Splunk Cloud Platform deployment, set up an HEC token to forward or mirror your existing Log Observer logs to Splunk Cloud Platform. See :ref:`forward-logs` to learn how. 

Verify log data transfer
==============================================================================================================
After completing the preceding steps, you will be able to store data in both Log Observer and your Splunk platform instance for 30 days. During the 30-day window you can verify that the data in your Splunk platform instance from Log Observer Connect matches the Log Observer data. There is no disruption to your functionality during this time. 

Changes in logging after the transition
==============================================================================================================
After your transition to Log Observer Connect, you experience changes in the following logging functionality:

* :ref:`Log processing rules <transition-processing-rules>`
* :ref:`Infinite logging rules <transition-infinite-logging>`
* :ref:`Search-time processing rules <transition-search-time-rules>`
* :ref:`Live Tail <transition-live-tail>`


.. _transition-processing-rules:

Log processing rules
--------------------------------------------------------------------------------------------------------------
You can continue using existing log processing rules. See :ref`logs-processors` for more information. You can turn your existing log processing rules off and on. However, you cannot create new log processing rules or edit existing rules.

Going forward, you can process data at ingest time with Splunk Cloud Platform functionality, including the following:

- Ingest actions
- .conf configuration
- Edge Processor
- Data Stream Processor


.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Processing method`
     - :strong:`Documentation`

   * - Field extractions
     - See :new-page:`Build field extractions with the field extractor <https://docs.splunk.com/Documentation/SplunkCloud/latest/Knowledge/ExtractfieldsinteractivelywithIFX>` 
   
   * - Ingest actions
     - See :new-page:`Use ingest actions to improve the data input process <https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/DataIngest>`

   * - .conf configuration
     - See :ref:`bigpanda`.

   * - Edge Processor
     - See :new-page:`About the Edge Processor solution <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/EdgeProcessor/AboutEdgeProcessorSolution>`

   * - Data Stream Processor
     - See :new-page:`Processing data in motion using the Splunk Data Stream Processor <https://docs.splunk.com/Documentation/DSP/1.4.2/User/About>`.


.. _transition-infinite-logging:

Infinite logging rules
--------------------------------------------------------------------------------------------------------------
You can continue using existing infinite logging rules. See :ref`logs-infinite` for more information. You can turn your existing infinite logging rules off and on. However, you cannot create new infinite logging rules or edit existing rules.

Going forward, you can archive data in Splunk Cloud Platform using Dynamic Data Active Archive. See :new-page:`Store expired Splunk Cloud Platform data in a Splunk-managed archive <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2305/Admin/DataArchiver>` for more information.

.. _transition-search-time-rules:

Search-time processing rules
--------------------------------------------------------------------------------------------------------------
You cannot use search-time processing rules. Search-time rules are the application of log processing rules across historical data. See :ref:`logs-search-time-rules` for more information. Going forward, you can utilize the global time range picker in Splunk Cloud Platform dashboards to do search-time processing.

.. _transition-live-tail:

Live Tail
--------------------------------------------------------------------------------------------------------------
The Live Tail feature of Log Observer ends in January 2024. There is no equivalent in Splunk Cloud Platform.
