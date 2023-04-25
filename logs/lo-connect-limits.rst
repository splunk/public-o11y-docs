.. _lo-connect-limits:

*********************************************************************************************
Log Observer Connect limits
*********************************************************************************************

.. meta::
  :description: See Log Observer Connect’s limits on MB of data ingested or indexed per month, limits on the number and type of processing rules, and search query limits.

This page documents Splunk Log Observer Connect service limits and behavior. System protection limits are meant to allow for stability and availability of multi-tenant systems and are subject to fine-tuning and change without notice.


Log Observer Connect search query limits
=============================================================================================
The following table lists Log Observer Connect's search query limits:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - Maximum number of saved search queries
     - 1,000

   * - Maximum number of logs processed for fields summary
     - 150,000


Maximum number of saved search queries
---------------------------------------------------------------------------------------------
This is the maximum number of saved search queries that can be created in an organization.

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The user experience might degrade and is not guaranteed to be functional.

Maximum number of logs processed for the fields summary
---------------------------------------------------------------------------------------------

The Log Observer Connect UI displays a summary of fields and their value distribution. By default, it processes the most recent 150,0000 events to generate this view. 

What happens when the limit is hit?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the search results contain more than 150,000 events, then only the latest 150,000 events are processed.


Other limits
=============================================================================================
Each Log Observer Connect user is also subject to the limits of their Splunk platform role. A user can only access Splunk platform resources that their Splunk platform role allows them to access. See :new-page:`About configuring role-based user access <https://docs.splunk.com/Documentation/Splunk/9.0.2/Security/Aboutusersandroles#Set_permission_granularity_with_custom_roles>` for more information.