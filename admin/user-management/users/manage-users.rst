.. _admin-manage-users:

********************************************************
Create and manage users in Splunk Observability Cloud
********************************************************

.. meta::
   :description:  Manage users: add, remove, grant admin access, view login details, and unlock an account.

.. toctree::
   :hidden:

   app-preferences
   personal-info

To create or manage users and teams, you must have administrator access. To get this access, an existing administrator adds it to your user profile. 



.. raw:: html

  <embed>
    <h2>Add users to the organization<a name="add-users-organization" class="headerlink" href="#add-users-organization" title="Permalink to this headline"></a></h2>
  </embed>

You must be an administrator to add users to the org. Add users to your organization by sending them an email invitation.

To send invitations to users, follow these steps:

#. From the Splunk Observability home page, expand the left navigation menu and select :guilabel:`Settings`.
#. Select :guilabel:`Users`.
#. Select :guilabel:`Invite User`.
#. Enter the email addresses of your desired members in the dialog box. Separate each email address with a comma or single blank space.
#. In the :guilabel:`Roles` field to select any of the available roles.
#. Select :guilabel:`Send Invitation`.

Users receive an email from Splunk Observability Cloud containing instructions for signing intothe organization. After they sign up, their names appear in the menu in the :menuselection:`Settings` then :menuselection:`Users` list.


.. raw:: html

  <embed>
    <h2>Remove users from the organization<a name="remove-users-organization" class="headerlink" href="#remove-users-organization" title="Permalink to this headline"></a></h2>
  </embed>


You must be an administrator to remove users from the org.  To remove users from the organization, follow these steps:

#. From the Splunk Observability menu, select :menuselection:`Settings` then :menuselection:`Users`.
   A table of current members appears in the main panel.
#. Use the Search field to find the name of the user you want to remove, either by name or email address.
#. Select the :guilabel:`Actions` (|more|) menu icon next the username, then select :menuselection:`Remove User`.
#. Splunk Observability Cloud displays a dialog box that asks you to confirm the deletion. Select :menuselection:`Delete`.

The user no longer appears in the list of members.


.. raw:: html

  <embed>
    <h2>Grant and revoke administrative access<a name="manage-admin-access" class="headerlink" href="#manage-admin-access" title="Permalink to this headline"></a></h2>
  </embed>


You must be an administrator to grant the admin role to other users. 

To grant administrator privileges to a user, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
   A table of current users appears in the main panel.
#. Find the name of the user.
#. Select the :guilabel:`Actions` (|more|) menu icon next the username, then select :menuselection:`Manage Roles`.
#. In the :guilabel:`Manage Roles` dialog box, select one or more of the available roles, then select the right-pointing arrow to move the roles to the :guilabel:`Selected Roles` panel.
#. Select :guilabel:`Assign Roles` to confirm.

To revoke administrator privileges from a user, follow these steps:

#. From the left navigation menu, select :menuselection:`Settings` then :menuselection:`Users`.
   A table of current members appears in the main panel.
#. Find the name of the user.
#. Select the :guilabel:`Actions` (|more|) menu icon next the user's name, then select :menuselection:`Manage Roles`.
#. Select a non-admin role for the user.


.. raw:: html

  <embed>
    <h2>Request administrative access<a name="request-admin" class="headerlink" href="#request-admin" title="Permalink to this headline"></a></h2>
  </embed>

To receive administrator access, request the admin role from an existing administrator. 

Follow these steps to view a list of current admins:

#. From the Splunk Observability home page, select :guilabel:`Settings`. 
#. Select :guilabel:`Invite Users`.
#. Filter for Admins.

From the list, you can email or message any administrators to request admin status. 


.. raw:: html

  <embed>
    <h2>Look up when a user logged in<a name="look-up-user-login" class="headerlink" href="#look-up-user-login" title="Permalink to this headline"></a></h2>
  </embed>


You can look up when a user logged in to Splunk Observability Cloud by looking at user session creation events. To do this:

#. In the left navigation menu, select :menuselection:`Dashboards`.

#. Open any dashboard.

#. Select :guilabel:`Event Overlay`.

#. In the :guilabel:`Event Overlay` field, enter :guilabel:`SessionLog`.

    .. image:: /_images/admin/look-up-user-login.png
      :width: 100%
      :alt: This screenshot shows a dashboard with the SessionLog value entered in the Event Overlay field.

#. Select :guilabel:`SessionLog`.

#. The :guilabel:`Event Feed` menu displays user and token session events. A :guilabel:`User Session Created` event indicates when a user logged in to Splunk Observability Cloud.



.. raw:: html

  <embed>
    <h2>Address a locked user account<a name="user-account-locked" class="headerlink" href="#user-account-locked" title="Permalink to this headline"></a></h2>
  </embed>

After a user makes too many unsuccessful login attempts, Splunk Observability Cloud locks that user's account. The user's account is locked for several minutes before the user can try to log in again.

If you need to unlock an account before the lock period ends, contact :ref:`support`.
