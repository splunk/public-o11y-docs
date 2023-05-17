.. _detector-manage-permissions:

********************************************************************************
View and manage permissions for detectors
********************************************************************************



.. meta::
   :description: Learn how to manage access permissions for detectors.

|hr|
:strong:`Available in Enterprise Edition`
|hr|

To help you manage write permissions, Observability Cloud lets you view
grant and revoke permissions for detectors.

To learn more about write permissions, see :ref:`about-write-permissions`.

If you want to get write permission for a detector, or if you want to modify permissions,
first determine who already has permissions by displaying the :strong:`Permissions` list.
You can then ask a user who has permission to add you to the permissions list.

.. _display-write-permissions-detectors:

Display a detector permissions list
=============================================

To display the permissions list for a detector, follow these steps:

#. Open the detector.
#. Select the detector's actions menu (|more|), then select :menuselection:`Permissions`.

.. note:: You can open a detector from the :guilabel:`Detectors` tab on the :guilabel:`Alerts` page.


.. _grant-revoke-permissions:

Grant and revoke permissions for detectors
=========================================================

After you display a permissions list for a detector, you can start to grant or revoke write permissions
for users or teams. To grant or revoke permissions for a detector, you need write permission for the detector.

.. _procedure-grant-write-permissions:

Grant write permissions for detectors
---------------------------------------------------------

To grant write permissions for a detector, follow these steps:

#. Display the permissions for the item by selecting the detector's actions menu (|more|) and selecting :guilabel:`Permissions`.
#. To start using specific write permissions for a detector,
   uncheck :guilabel:`Anyone in this organization can edit`. You are now the
   only user who can edit the item.
#. Select :guilabel:`Add user or team`, then select the users or teams to whom
   you want to grant write permissions for the item.
#. Select :guilabel:`Save`

.. _procedure-revoke-write-permissions:

Revoke write permissions for detectors
---------------------------------------------------------

To revoke write permissions for a detector, follow these steps:

#. Display the permissions for the item by selecting the detector's actions menu (|more|) and selecting :guilabel:`Permissions`.
#. To remove a user or team, select the :guilabel:`x` next to the user or team name.
#. Select :guilabel:`Save`

.. note:: Important

   You can remove your own write permission from a detector.
   If you do this deliberately or by accident, and you're not an administrator,
   you can't grant yourself write permission again.
   Instead, you have to find someone else with write permission to grant you
   write permission.

   
.. _detector-action-table:

Detector actions that require write permission
============================================================================

The following table describes detector actions that require write permissions.

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
