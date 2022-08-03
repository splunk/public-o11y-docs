.. _admin-manage-users:

**********************************
Create and manage users
**********************************

.. meta::
   :description: Learn how to how to manage users.

.. toctree::
   :hidden:

.. note:: To create or manage users and teams, you must have administrator access.
   To get this access, an existing administrative adds it to your user profile.

Users with administrative access for an organization can perform the following actions:

* :ref:`Add users to the organization <add-users-organization>`
* :ref:`Remove users from the organization <remove-users-organization>`
* :ref:`Grant and revoke administrative access <manage_admin-access>`

.. _add-users-organization:

Add users to the organization
============================================================================

Add users to your organization by sending them an email invitation.

To send invitations to users, follow these steps:

#. From the main menu, select :menuselection:`Organization Settings > Invite Members`.
   The :guilabel:`Invite New Members` dialog box appears.
#. Enter the full email address of each user you want to invite. Separate addresses with commas (,).
#. Click :guilabel:`Invite`.
#. The message :guilabel:`Sent!` appears in the dialog box, and then the dialog box closes.

Users receive an email from Splunk Observability Cloud containing instructions for signing into
the organization. After they complete this signup, their names appear in the menu in the
:menuselection:`Organization Settings > Members` list.

.. _remove-users-organization:

Remove users from the organization
============================================================================

To remove users from the organization, follow these steps:

#. From the main menu, select :menuselection:`Organization Settings > Members`.
   A table of current members appears in the main panel.
#. Find the name of the user you want to remove.
#. Click the :guilabel:`Actions` () menu icon next the user name, then select :menuselection:`Remove Member`.
#. Observability Cloud displays a dialog box that asks you to confirm the deletion. Click :guilabel:`Delete`.
#. The user no longer appears in the list of members.

.. _manage_admin-access:

Grant and revoke administrative access
============================================================================

As a user with administrative access, you can grant or revoke administrative access for
other users.

To grant administrator privileges to a user, follow these steps:

#. From the main menu, select :menuselection:`Organization Settings > Members`.
   A table of current members appears in the main panel.
#. Find the name of the user.
#. Click the :guilabel:`Actions` () menu icon next the user name, then select :menuselection:`Grant Admin`.

To revoke administrator privileges from a user, follow these steps:

#. From the main menu, select :menuselection:`Organization Settings > Members`.
   A table of current members appears in the main panel.
#. Find the name of the user.
#. Click the :guilabel:`Actions` () menu icon next the user's name, then select :menuselection:`Revoke Admin`.




