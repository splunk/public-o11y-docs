.. _admin-manage-permissions:

********************************************************************************
Manage permissions for detectors, dashboard groups, and dashboards
********************************************************************************

.. meta::
   :description: Learn about write permissions and how to set permissions for detectors, dashboard groups, and dashboards

|hr|
:strong:`Available in Enterprise Edition`
|hr|

.. _about-permissions:

Write permissions
============================================================================

By default, except for built-in dashboards, anyone can edit any detector, dashboard group,
or detector. To prevent users from inadvertently making changes to one of these items,
you can specify write permissions for the item. Use write permissions in the
following situations:

* As a user, limit write permissions on your user dashboard group
* As a team member, specify that only other team members can edit an item
* As an administrator, specify that only specific users can edit items that
  monitor critical or sensitive information

.. _permission-rules:

Rules for setting permissions
--------------------------------------------------------------------------------

Permissions work in the following way:

* You can set permissions for detectors, dashboard groups, and dashboards.
* If an item doesn't have any permissions set, all users have write permission for the item.
  By default, a new detector, dashboard group, or dashboard has no permissions set.
* Anyone who has write permission for an item can grant or revoke all permissions for the item.
* Anyone who has write permission can grant write permission to individual users or teams.
* Administrators can grant and revoke permissions for any item.

.. admonition:: Important

   Permissions help prevent accidental changes, but they don't
   disable changes. Consider the following:

   * If a team has write permission for an item, any user can
     join that team and thus gain write access to that particular item.
   * Administrators can add themselves to the permissions list for an item to gain
     write permission for it.
   * A user with write permissions to an item can add or remove others from the
     permissions for that item.

.. _manage-write-permissions:

Manage write permissions
============================================================================

To help you manage write permissions, Observability Cloud lets you view
grant, and revoke permissions.

The section :ref:`permission-rules` describes the rules that govern permissions.

If you want to get write permission for an item, or if you want to modify permissions,
first determine who already has permissions by displaying the Permissions list.
You can then ask a user who has permission to add you to the permissions list.

.. _display-write-permissions-items:

Display write permissions for an item
--------------------------------------------------------------------------------

The following procedures describe how to display write permissions for detectors,
dashboard groups, and dashboards.

.. _display-write-permissions-dashboard-group:

Display a dashboard group permissions list
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To display the permissions list for a dashboard group, follow these steps:

#. Display the dashboard group.
#. Click the :guilabel:`Actions` menu icon, then select :menuselection:`Permissions`.

.. _display-write-permissions-dashboard:

Display a dashboard permissions list
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To display the permissions list for a dashboard, follow these steps:

#. Display the dashboard.
#. Click the :guilabel:`Actions` menu icon, then select :menuselection:`Permissions`.

.. _display-write-permissions-detectors:

Display a detector permissions list
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To display the permissions list for a detector, follow these steps:

#. Open the detector.
#. Click the :guilabel:`Actions` menu icon, then select :menuselection:`Permissions`.

.. note:: You can open a detector from the :guilabel:`Detectors` tab on the :guilabel:`Alerts` page

.. _grant-revoke-permissions:

Grant and revoke permissions
--------------------------------------------------------------------------------

After you display a permissions list, you can start to grant or revoke write permission
for users or teams. To grant or revoke permissions for an item, you need write permission for the item.

The following illustrations show the process for setting permissions for a
dashboard; the technique for adding or removing permissions is identical for
detectors. If you are setting permissions for a dashboard group, you can also
specify permissions for individual dashboards in the group.

The procedure for granting and revoking permissions is the same for dashboards and
detectors. For dashboard groups, you can also grant and revoke permissions for
individual dashboards in the group.

.. _procedure-grant-write-permissions:

Grant write permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To grant write permissions for an item, follow these steps:

#. Display the permissions for the item. To learn more, see :ref:`display-write-permissions-items`.
#. To start using specific write permissions for an item,
   uncheck :guilabel:`Anyone in this organization can edit`. You are now the
   only user who can edit the item.
#. Click :guilabel:`Add user or team`, then select the users or teams (or both) to whom
   you want to grant write permissions for the item.
#. Click :guilabel:`Save`

.. _procedure-revoke-write-permissions:

Revoke write permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To revoke write permissions, follow these steps:

#. Display the permissions for the item. To learn more, see :ref:`display-write-permissions-items`.
#. To remove a user or team, click the :guilabel:`x` next to the user or team name.
#. Click :guilabel:`Save`

.. admonition:: Important

   You can remove your own write permission from an item.
   If you do this deliberately or by accident, and you're not an administrator,
   you can't grant yourself write permission again.
   Instead, you have to find someone else with write permission to grant you
   write permission.
