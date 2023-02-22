.. _manage-users:

********************************************************
Manage users in Splunk Observability Cloud
********************************************************

.. meta::
   :description:  Manage users: add, remove, grant admin access, view login details, and unlock an account.



.. toctree::
   :hidden:

   Connect to AWS<assign-user-roles>
   About roles and permissions<roles-and-permissions>
   

.. note:: To create or manage users and teams, you must have administrator access. To get this access, an existing administrative adds it to your user profile. See :ref:`request-admin` for more information.


Users with administrative access for an organization can run the following actions:

* :ref:`Add users to the organization <add-users-organization>`
* :ref:`Remove users from the organization <remove-users-organization>`
* :ref:`Grant and revoke administrative access <manage_admin-access>`

Any user can run the following actions:

* :ref:`request-admin`
* :ref:`look-up-user-login`
* :ref:`user-account-locked`

Only the current user can run the following actions:

* :ref:`change_time_zone_color_accessibility`
* :ref:`api-access-token`


.. raw:: html

  <embed>
    <h2 id="add-users-organization">Add users to the organization</h2>
  </embed>


Add users to your organization by sending them an email invitation.

To send invitations to users, follow these steps:

#. From the Splunk Observability home page, expand the left navigation menu and select :guilabel:`Settings`.
#. Select :guilabel:`Users`.
#. Select :guilabel:`Invite User`.
#. Enter the email addresses of your desired members in the dialog box. Separate each email address with a comma or single blank space.
#. Select :guilabel:`Send Invitation`.

Users receive an email from Splunk Observability Cloud containing instructions for signing into
the organization. After they sign up, their names appear in the menu in the
:menuselection:`Settings > Users` list.


.. raw:: html

   <embed>
      <h2 id="remove-users-organization">Remove users from the organization</h2>
   </embed>


To remove users from the organization, follow these steps:

#. From the Splunk Observability menu, select :menuselection:`Settings > Users`.
   A table of current members appears in the main panel.
#. Use the Search field to find the name of the user you want to remove, either by name or email address.
#. Select the :guilabel:`Actions` () menu icon next the username, then select :menuselection:`Remove User`.
#. Observability Cloud displays a dialog box that asks you to confirm the deletion. Select:abbr:`Delete`.

The user no longer appears in the list of members.

.. raw:: html

   <embed>
   <h2 id="look-up-user-login">Look up when a user logged in</h2> 
   </embed>



You can look up when a user logged in to Observability Cloud by looking at user session creation events. To do this:

#. In the left navigation menu, select :menuselection:`Dashboards`.

#. Open any dashboard.

#. Select `Event Overlay`.

#. In the :guilabel:`Event Overlay` field, enter :guilabel:`SessionLog`.

    .. image:: /_images/admin/look-up-user-login.png
      :width: 100%
      :alt: This screenshot shows a dashboard with the SessionLog value entered in the Event Overlay field.

#. Select :guilabel:`SessionLog`.

#. The :guilabel:`Event Feed` menu displays user and token session events. A :guilabel:`User Session Created` event indicates when a user logged in to Observability Cloud.


.. raw:: html

   <embed>
   <h2>What to expect<a name="user-account-locked" href="#user-account-locked" title="Address a locked user account"> </a></h2>
   </embed>

After a user makes too many unsuccessful login attempts, Observability Cloud locks that user's account.

The user's account is locked for several minutes before the user can try to log in again.

If you need to unlock an account before the lock period ends, contact :ref:`support`.
