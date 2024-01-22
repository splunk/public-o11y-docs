.. _logs-LOconnect-troubleshoot:

*******************************************************************
Troubleshoot Log Observer Connect setup
*******************************************************************


.. meta::
  :description: See Log Observer Connect's limits on MB of data ingested or indexed per month, limits on the number and type of processing rules, and search query limits.

This topic helps Log Observer Connect administrators and users resolve issues that might arise when searching Splunk platform indexes in Log Observer Connect.

Log Observer Connect users see unauthorized Splunk platform indexes 
========================================================================
When searching in Log Observer Connect, users might see Splunk Enterprise or Splunk Cloud Platform indexes that are unauthorized for Log Observer Connect users.

Cause
------------------------------------------------------------------------
All Splunk Enterprise and Splunk Cloud Platform users can list all indexes by default. However, if the ``indexes_list_all`` capability is enabled in ``authorize.conf``, access to all indexes is limited to only those roles with this capability. 

If Log Observer Connect users see an index in Log Observer Connect that is not authorized for Log Observer Connect users, contact your Splunk Enterprise or Splunk Cloud Platform administrator. 

Solution
------------------------------------------------------------------------
To limit Splunk platform indexes for Log Observer Connect users, a Splunk Enterprise or Splunk Cloud Platform administrator must follow these steps:

1. Log in as an administrator in your Splunk platform instance.

2. Splunk Cloud Platform administrators can skip this step. If the ``indexes_list_all`` capability is not present in your Splunk Enterprise instance, create a ``[capability::indexes_list_all]`` stanza in ``authorize.conf``. Once the configuration is set in ``authorize.conf``, the ``indexes_list_all`` capability is deactivated for all roles. The administrator can then add this capability for select roles in the UI or in ``authorize.conf``. 
3. Enable ``indexes_list_all`` capability for the admin role and any other roles that need to access the indexes. For more information about adding capabilities to a role, see :new-page:`Define roles on the Splunk plaftorm with capabilities <https://docs.splunk.com/Documentation/Splunk/9.0.4/Security/Rolesandcapabilities>`.

4. Go to :guilabel:`Settings > Roles` and click the name of your Log Observer Connect service account role.

5. On the :guilabel:`Capabilities` tab, deselect ``indexes_list_all`` to prevent Log Observer Connect users from seeing all Splunk platform indexes. 


The connection appears to work, but there are no logs
========================================================================

Cause
------------------------------------------------------------------------
The index in your Splunk platform instance does not contain logs. Alternatively, you did not select a specific index in Log Observer Connect.

Solution
------------------------------------------------------------------------
Select an index in your Splunk platform instance that contains logs. Select a specific index in Log Observer Connect.


The connection appears to work, but the index I need is not selectable
========================================================================

Cause
------------------------------------------------------------------------
You are trying to target an internal index.

Solution
------------------------------------------------------------------------
Do not try to target an internal index. Internal indexes start with “_” such as “_internal”. Internal indexes are not compatible with Log Observer Connect.

Certain indexes, such as indexes defined in orphaned apps, do not appear for the REST endpoint /services/data/indexes. Move indexes defined in orphaned apps to a different indexes.conf. In Splunk Cloud Platform, this requires assistance from Splunk Support. In Splunk enterprise, it requires server command line access.
