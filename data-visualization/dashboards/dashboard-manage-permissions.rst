.. _dashboard-manage-permissions:

********************************************************************************
Specify who can see and edit your dashboard groups and dashboards
********************************************************************************

.. meta::
   :description: Learn how to view, grant, and revoke access permissions for dashboard groups in Splunk Observability Cloud, and manage read and write permissions. 

|hr|
:strong:`Available in Enterprise Edition`
|hr|

To help you manage read and write permissions, Observability Cloud lets you view, grant, and revoke permissions. 

To learn more about permissions, see :ref:`about-permissions`.

If you want to get read or write permission for a dashboard group or dashboard, or if you want to modify permissions,
first determine who already has permissions by displaying the :strong:`Permissions` list.
You can then ask a user who has permission to add you to the permissions list.

.. _display-permissions-dashboards-and-dashboard-group:

Display a dashboard group or dashboard permissions list
============================================================

The following procedures describe how to display permissions for dashboard groups and dashboards.

.. _display-write-permissions-dashboard-group:

Display a dashboard group permissions list
------------------------------------------------

To display the permissions list for a dashboard group, follow these steps:

#. Display the dashboard group.
#. Click the :guilabel:`Actions` menu icon, then select :menuselection:`Permissions`.

.. _display-write-permissions-dashboard:

Display a dashboard permissions list
------------------------------------------------

To display the permissions list for a dashboard, follow these steps:

#. Display the dashboard.
#. Click the :guilabel:`Actions` menu icon, then select :menuselection:`Permissions`.

.. _grant-revoke-permissions-dashboards:

Grant and revoke permissions for dashboard groups and dashboards
====================================================================

After you display a permissions list for a dashboard group or dashboard, you can change read or write permissions
for users or teams. To change permissions for a dashboard group or dashboard, you need write permission for the item.

To change permissions for a dashboard group or dashboard, follow these steps:

1. Display the permissions for the item by clicking the :guilabel:`Actions` menu and selecting :guilabel:`Permissions`.
2. Select one of the following options from the drop-down menu:
 
.. list-table::
  :header-rows: 1
  :widths: 33 67
    
  * - :strong:`Option`
    - :strong:`Description`
  
  * - Inherit from Dashboard Group (only available for dashboards)
    - Default setting for a new dashboard. Permissions for this dashboard are inherited from the dashboard group you save it to.
    
  * - Everyone can Read or Write
    - Default setting for a new dashboard groups. This option allows everyone in your organization to see and edit the item.
    
  * - Restricted Write Access
    - Everyone in your organization can view the item. Specific users or teams can be added to edit the item.
      
  * - Restricted Read and Write access
    - Only the creator of the item has read and write permissions by default. Specific users or teams can be added to view and/or edit the item.

3. If you select :guilabel:`Restricted Write Access` or :guilabel:`Restricted Read and Write access`, click the :guilabel:`>` next to the drop-down menu to see the list of teams and users in the permission settings. Click :guilabel:`Add Team or User`, then select the users or teams for whom you want to grant read or write permissions.
4. To remove a user or team, click the :guilabel:`x` next to the user or team name.
5. Click :guilabel:`Save`

.. _dashboard-group-action-table:

Dashboard group actions that require write permission
============================================================================

The following table describes dashboard group actions that require write permissions.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Action`
     - :strong:`Requires write permission`

   * - Add dashboards or mirrors to a group
     - x

   * - Rearrange the order of dashboard tabs in the group
     - x

   * - Rename or delete the group
     - x

   * - Manage links to teams
     - Required for linking custom dashboard groups;
       not required for linking built-in dashboard groups.

   * - For a non-mirrored dashboard, change overrides and save back to the group :sup:`*`
     -

   * - For a mirror, change the overrides for a mirror and save it back to the group
     - x

   * - Make any other changes to a dashboard or mirror in the group, such as moving,
       resizing, or editing its charts :sup:`*`
     -

   * - Remove a mirror from the group
     - x

   * - Delete a dashboard :sup:`*`.
     - Required for both the dashboard and the dashboard group it belongs to.

:sup:`*` You must have write permission for the dashboard or mirror.

.. _dashboard-mirror-action-table:

Dashboard and mirror actions that require write permission
============================================================================

The following table describes dashboard and mirror actions that require write permissions.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Action`
     - :strong:`Requires write permission`

   * - Add or delete charts
     - x

   * - Edit and save any chart
     - x

   * - Paste charts
     - x

   * - Resize and rearrange charts
     - x

   * - Rename the dashboard
     - x

   * - Delete the dashboard. You can only delete a dashboard if it has no mirrors.
     - x

   * - Share the dashboard
     -

   * - Share or copy charts that are on the dashboard
     -

   * - Create a mirror
     -

   * - Remove a mirror
     - You don’t need write permission for the dashboard itself, but you do need write
       permission for the dashboard group that contains the dashboard.

   * - Save changes to the filter and dashboard variable options in the
       dashboard :guilabel:`Overrides` bar
     - For a non-mirrored dashboard, you need write permission for the dashboard.
       For a mirrored dashboard, you need write permissions for the dashboard group.

To learn more about write permission differences between dashboards and mirrors,
see :ref:`dashboard-mirror-permissions`.
