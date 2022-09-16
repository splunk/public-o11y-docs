.. _about-permissions:

********************************************************************************
Read and write permissions in Splunk Infrastructure Monitoring
********************************************************************************

.. meta::
   :description: Learn about read and write permissions and how the default rules work for dashboard groups, dashboards, and detectors in Splunk Infrastructure Monitoring

|hr|
:strong:`Available in Enterprise Edition`
|hr|

.. _about-read-permissions:

Read permissions for dashboard groups and dashboards
============================================================================

Here are the default read permissions configuration.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Component`
     - :strong:`Permissions`
  
   * - Dashboard group
     - Everyone can see the dashboard group
   
   * - Dashboard
     - Permissions are inherited from the dashboard group it is saved to 
   

.. note:: Read permissions customization is not available for detectors.

To limit who can see your dashboards and dashboard groups, 
you can specify read permissions for the item. Use read permissions in the following situations:

.. list-table::
 :header-rows: 1
 :widths: 18 82

 * - :strong:`Role`
   - :strong:`Use case for read permissions`

 * - User
   - Limit read permissions on your user dashboard group
 
 * - Team member
   - Specify that only other team members can view an item
 
 * - Administrator
   - Specify that only specific users can view items that monitor critical or sensitive information

Rules for setting read permissions
----------------------------------------------------------

Read permissions work in the following way:

* You can set read permissions for dashboard groups and dashboards.
* By default, a new dashboard group or dashboard can be viewed by any user.
* Administrators can grant and revoke read permissions for any item.


.. _about-write-permissions:

Write permissions
============================================================================

Here are the default write permissions configuration.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Component`
     - :strong:`Permissions`
  
   * - Dashboard group
     - Everyone can make edits
   
   * - Dashboard
     - Permissions are inherited from the dashboard group it is saved to 
   
   * - Detector
     - Everyone can make edits


To prevent users from inadvertently making changes to one of these items,
you can specify write permissions for the item. Use write permissions in the
following situations:

.. list-table::
   :header-rows: 1
   :widths: 18 82

   * - :strong:`Role`
     - :strong:`Use case for write permissions`
  
   * - User
     - Limit write permissions on your user dashboard group
   
   * - Team member
     - Specify that only other team members can edit an item
   
   * - Administrator
     - Specify that only specific users can edit items that monitor critical or sensitive information

.. _permission-rules:

Rules for setting write permissions
----------------------------------------------------------

Write permissions work in the following way:

* You can set write permissions for detectors, dashboard groups, and dashboards.
* By default, a new detector, dashboard group, or dashboard can be edited by any user.
* Anyone who has write permission for an item can grant or revoke all permissions for the item.
* Anyone who has write permission can grant write permission to individual users or teams.
* Anyone who has write permission for an item also has read permission for the same item.
* Administrators can grant and revoke write permissions for any item.

.. admonition:: Important

   Permissions help prevent accidental changes, but they don't
   disable changes. Consider the following:

   * If a team has write permission for an item, any user can
     join that team and thus gain write access to that particular item.
   * Administrators can add themselves to the permissions list for an item to gain
     write permission for it.
   * A user with write permissions to an item can add or remove others from the
     permissions for that item.

.. _manage-permissions:

Read and write permissions management
============================================================================

- To learn how to customize read and write permissions for dashboard groups and dashboards, see :ref:`dashboard-manage-permissions`.
- To learn how to customize write permissions for detector, see :ref:`detector-manage-permissions`.
