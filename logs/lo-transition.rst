.. _lo-transition:


**************************************************************************************************************
Splunk Log Observer transition
**************************************************************************************************************

.. meta::
  :description: Discover how you can transition from Splunk Log Observer to Splunk Log Observer Connect where you can ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.


All Splunk Log Observer customers, who are sending log data to Splunk Observability cloud today, must transition to using Splunk Cloud Platform or Splunk Enterprise as the central platform for logs by the end of December 2023. Splunk Observability Cloud will continue to support Log Observer functionality and user experience with Splunk Log Observer Connect as a bridge between Splunk Observability Cloud and Splunk Cloud Platform. Transitioning to the Splunk platform, whether it is Splunk Cloud Platform or Splunk Enterprise, as the back-end for log storage does not impact your ability to use Splunk Observability Cloud to correlate logs, metrics, and traces.

Using the Splunk platform allows you to ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and use logging for security use cases. 


How to transition to Log Observer Connect
==============================================================================================================

To transition to Splunk Log Observer Connect, you must take the following actions:

1. Reach out to your Splunk regional sales manager to request assistance with the transition. The deadline is November 15, 2023.

2. Connect your Splunk platform instance to your Log Observer Connect instance. See :ref:`logs-scp` or :ref:`logs-set-up-logconnect`, depending on the type of Splunk platform deployment you have.

3. If you have a Splunk Cloud Platform deployment, set up an HEC token to forward or mirror your existing Log Observer logs to Splunk Cloud Platform. See :ref:`forward-logs` to learn how. 

Verify log data transfer
==============================================================================================================
After completing the preceding steps, you can store data in both Log Observer and your Splunk platform instance for 30 days. During the 30-day window you can verify that the data in your Splunk platform instance from Log Observer Connect matches the Log Observer data. There is no disruption to your functionality during this time. 

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
You can continue using existing log processing rules. See :ref:`logs-processors` for more information. You can turn your existing log processing rules off and on. However, you cannot create new log processing rules or edit existing rules.

Going forward, you can process data in the Splunk platform using the following methods:

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
     - See :new-page:`Overview of event processing <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2305/Data/Overviewofeventprocessing>`.

   * - Edge Processor
     - See :new-page:`About the Edge Processor solution <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/EdgeProcessor/AboutEdgeProcessorSolution>`

   * - Data Stream Processor
     - See :new-page:`Use the Data Stream Processor <https://docs.splunk.com/Documentation/DSP/1.4.2/User/About>`.


.. _transition-infinite-logging:

Infinite logging rules
--------------------------------------------------------------------------------------------------------------
You can continue using existing infinite logging rules. See :ref:`logs-infinite` for more information. You can turn your existing infinite logging rules off and on. However, you cannot create new infinite logging rules or edit existing rules.

Going forward, determine the best option for your organization by discussing with your Splunk representative the following types of data storage:

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Storage type`
     - :strong:`Documentation`

   * - Dynamic Data Active Archive
     - See :new-page:`Store expired Splunk Cloud Platform data in a Splunk-managed archive <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2305/Admin/DataArchiver>`

   * - Dynamic Data Self Storage
     - See :new-page:`Store expired Splunk Cloud Platform data in your private archive <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/Admin/DataSelfStorage>`
   
   * - Ingest actions
     - See :new-page:`Use ingest actions to improve the data input process <https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/DataIngest>`


.. _transition-search-time-rules:

Search-time processing rules
--------------------------------------------------------------------------------------------------------------
You cannot use search-time processing rules in the Log Observer Connect UI. Search-time rules are the application of log processing rules across historical data. See :ref:`logs-search-time-rules` for more information. 

Going forward, you can utilize the following methods for processing data at search time in Splunk Cloud Platform:

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Search-time processing method`
     - :strong:`Documentation`

   * - Field extractor
     - See :new-page:`Build field extractions with the field extractor <https://docs.splunk.com/Documentation/SplunkCloud/latest/Knowledge/ExtractfieldsinteractivelywithIFX>`

   * - Field aliases
     - See :new-page:`Create field aliases in Splunk Web <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2305/Knowledge/Addaliasestofields>`


.. _transition-live-tail:

Live Tail
--------------------------------------------------------------------------------------------------------------
The Live Tail feature of Log Observer ends in January 2024. In Splunk Cloud Platform, you can achieve similar functionality by adjusting the time range picker to :guilabel:`All time (real-time)` or :guilabel:`30 second window`. You must select :guilabel:`Search` again and rerun your search to see the most recent log events because live events do not stream in unprompted. For more information, see :new-page:`Select time ranges to apply to your search <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/Search/Selecttimerangestoapply>`