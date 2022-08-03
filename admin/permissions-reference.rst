.. _admin--permissions-reference:

********************************************************************************
Permissions reference
********************************************************************************

.. meta::
   :description: Splunk Observability Cloud write permissions reference

|hr|
:strong:`Write permissions are available in Enterprise Edition`
|hr|

The following tables describe actions that require write permissions:

* Dashboard group actions
* Dashboard and mirror actions
* Detector actions

.. _dashboard-group-action-table:

Dashboard group actions that require write permission
============================================================================

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
     - 

:sup:`*` You must have write permission for the dashboard or mirror.

.. _dashboard-mirror-action-table:

Dashboard and mirror actions that require write permission
============================================================================

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

.. TODO Link to dashboard mirrors and write permissions

To learn more about write permission differences between dashboards and mirrors,
see Dashboard mirrors and write permissions.

.. _detector-action-table:

Detector actions that require write permission
============================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Action`
     - :strong:`Requires write permission`

   * - Edit or delete a detector
     - x

   * - Subscribe to or manage subscriptions for a detector
     - x
   
   * - Add or remove links between a detector and a team
     - x
   
   * - Manage muting rules for a detector
     -

   