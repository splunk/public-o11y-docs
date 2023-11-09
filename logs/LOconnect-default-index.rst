.. _LOconnect-default-index:

*****************************************************************************
Reset the default Log Observer Connect index
*****************************************************************************
A Splunk Observability Cloud administrator sets your organization's default Log Observer Connect index for the Log Observer Connect service account at two times:

- When initially setting up Log Observer Connect (See :ref:`logs-scp` or :ref:`logs-set-up-logconnect`.) 

- When an organization with a full Log Observer entitlement forwards logs from Log Observer to the Splunk platform (See :ref:`forward-logs`.)

An administrator can reset the default index for the Log Observer service account by following the steps on this page.


Prerequisites
=============================================================================
You must be a Splunk Observability Cloud administrator to reset the default Log Observer Connect index.


Reset the default Log Observer Connect index
=============================================================================
To reset the default Log Observer Connect index, follow these steps:

1. Log on to Splunk Observability Cloud.

2. Go to :guilabel:`Settings` then :guilabel:`Log Observer Connect`.
   
   A list of your Log Observer Connect connections appears. Each connection is associated with a default Splunk platform index.

3. Select the three-dot menu next to the connection associated with the default index you want as the default searchable index in the Log Observer Connect UI, then select :guilabel:`Make default` from the drop-down list.
   
   The index associated with the connection you select is the new default Splunk platform index that users can search in the Log Observer Connect UI.