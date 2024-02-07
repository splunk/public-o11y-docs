.. _users-assign-roles-ph3:



********************************************************
Assign roles to users in Splunk Observability Cloud
********************************************************

.. meta::
   :description:  Manage users: Add one or more roles to a user in Observability Cloud.


   
You can assign roles to existing and new users to determine what they can do and which features they can access in Splunk Observability Cloud. For example, certain roles allow users to create detectors or dashboards.

Users can have multiple roles at the same time. See :ref:`roles-and-capabilities` for more information. For details about each role and the associated capabilities, see :ref:`roles-and-capabilities-table`.

.. note:: To create or manage users, you must have administrator access. To get this access, an existing administrator adds it to your user profile. See :ref:`admin-manage-users` for more information.

View roles assigned to users
=====================================

To see the roles assigned to users in your organization, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
#. The roles for all users are in the :guilabel:`Roles` column of the table.



Assign roles when inviting new users
=====================================

To assign roles when inviting new users, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
#. Select :guilabel:`Invite Users`.
#. Enter the email addresses to invite.
#. Click the :guilabel:`Roles` field to select any of the available roles.
#. Select :guilabel:`Send Invitation` to confirm.


Assign roles to an existing user
=====================================

To assign roles to a user that's already a member of your organization, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
#. Find the name of the user.
#. Select the :guilabel:`Actions` (|verticaldots|) menu icon next to the username, then select :menuselection:`Manage Roles`.
#. In the :guilabel:`Manage Roles` dialog box, select one or more of the available roles, then select the right-pointing arrow to move the roles to the :guilabel:`Selected Roles` panel.
#. Select :guilabel:`Assign Roles` to confirm.

.. note:: You can use the :guilabel:`Add All` link to add all available roles to a user.


Remove roles from an existing user
=====================================

To remove roles from a user that's already a member of your organization, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
#. Find the name of the user.
#. Select the :guilabel:`Actions` (|verticaldots|) menu icon next the username, then select :menuselection:`Manage Roles`.
#. In the :guilabel:`Manage Roles` dialog box, select one or more of the selected roles, then select the left-pointing arrow to move the roles back to the :guilabel:`Available Roles` panel.
#. Select :guilabel:`Assign Roles` to confirm.

.. note:: You can use the :guilabel:`Remove All` link to add all available roles to a user.


Edit roles for multiple users
=====================================

To edit roles for multiple users at the same time, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
#. Find users using the search bar.
#. Select the users you want to edit.
#. Select ``-`` or ``+`` in the :guilabel:`Roles` bar at the bottom of the table to remove or add roles.
#. In the dialog box, select the roles you want to remove or add, depending on your previous choice.
#. Confirm your selection.



Edit user roles using the API
===============================

To view, add, or remove roles using the Observability Cloud REST API, see :new-page:`Organizations <https://dev.splunk.com/observability/reference/api/organizations/latest>` in the developer documentation.


