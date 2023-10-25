.. _LOconnect-default-index:

*****************************************************************************
Reset the default Log Observer Connect indexes
*****************************************************************************

When a Splunk Observability Cloud administrator sets up Log Observer Connect, they select one or more Splunk platform indexes as the default indexes that users can search in the Log Observer Connect UI. For more information, see :ref:`logs-scp` or :ref:`logs-set-up-logconnect`. An administrator can reset the default index or indexes by following the steps on this page.

Prerequisites
=============================================================================
You must be a Splunk Observability Cloud administrator to reset the default Log Observer Connect index.


Reset the default Log Observer Connect index
=============================================================================
To reset the default index or indexes that Log Observer Connect users can search, follow these steps:

1. Log on to Splunk Observability Cloud.

2. Go to :guilabel:`Settings` then :guilabel:`Log Observer Connect`.
   
   A list of your Log Observer Connect connections appears. Each connection is associated with a Splunk platform index or set of indexes. These indexes are searchable in the Log Observer Connect UI.

3. Select the three-dot menu next to the connection associated with the default Splunk platform indexes you want as the default searchable indexes in the Log Observer Connect UI, then select :guilabel:`Make default` from the drop-down list.
   
   The indexes associated with the connection you select is the new default Splunk platform index or indexes that users can search in the Log Observer Connect UI.