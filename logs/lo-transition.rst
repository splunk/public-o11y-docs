.. _lo-transition:


*********************************************************************************************
Accomplish logs pipeline rules in Splunk platform
*********************************************************************************************

.. meta::
  :description: Discover how you can transition from Splunk Log Observer to Splunk Log Observer Connect where you can ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.


All customers who ingest logs into Splunk Observability Cloud now use Log Observer Connect, a bridge between Splunk Observability Cloud and Splunk platform. Using the Splunk platform allows you to ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and use logging for security use cases. 

The following sections explain how to achieve all logging pipeline features in Splunk platform.

.. _transition-processing-rules:

Log processing rules
---------------------------------------------------------------------------------------------
You can process data in the Splunk platform using the following methods:

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



Live Tail
--------------------------------------------------------------------------------------------
To achieve Live Tail functionality, adjust the time range picker in the Splunk platform Search & Reporting app to :guilabel:`All time (real-time)` or :guilabel:`30 second window`. You must select :guilabel:`Search` again and rerun your search to see the most recent log events because live events do not stream in unprompted. For more information, see :new-page:`Select time ranges to apply to your search <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2308/Search/Selecttimerangestoapply>`