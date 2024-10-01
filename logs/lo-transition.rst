.. _lo-transition:


*********************************************************************************************
Splunk Log Observer transition
*********************************************************************************************

.. meta::
  :description: Discover how you can transition from Splunk Log Observer to Splunk Log Observer Connect where you can ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.


All customers who send logs to Splunk Observability Cloud are using Log Observer Connect, a bridge between Splunk Observability Cloud and Splunk platform. Using the Splunk platform allows you to ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and use logging for security use cases. 

The following sections explain how to achieve all logging pipeline features in Splunk platform.

.. _transition-processing-rules:

Log processing rules
---------------------------------------------------------------------------------------------
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
---------------------------------------------------------------------------------------------
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
---------------------------------------------------------------------------------------------
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
--------------------------------------------------------------------------------------------
To achieve Live Tail functionalit, adjust the time range picker in the Splunk platform Search & Reporting app to :guilabel:`All time (real-time)` or :guilabel:`30 second window`. You must select :guilabel:`Search` again and rerun your search to see the most recent log events because live events do not stream in unprompted. For more information, see :new-page:`Select time ranges to apply to your search <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/Search/Selecttimerangestoapply>`