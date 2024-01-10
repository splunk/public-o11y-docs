.. _admin-manage-team-membership:

***************************************************
Manage teams in Splunk Observability Cloud
***************************************************

.. meta::
   :description: Learn how to how to manage teams and team membership.

Managing teams in Splunk Observability Cloud means creating and deleting teams, as well as managing membership and team security.


.. _admin-create-team:

Create a team
============================================================================

To create a team, you must be a Splunk Observability Cloud administrator.

To create a team, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings` then :menuselection:`Teams`.

#. Select :guilabel:`Create New Team`.

#. In the :guilabel:`Team name` dialog box, enter a name for the team.

#. (Optional) In the :guilabel:`Description` field, enter a description of the team. 

#. From the :guilabel:`Add Users` list, you can search for users with the search text box.

#. Continue to add users to the team.

#. When you're finished adding users, select :guilabel:`Create`. The new team name appears in the list of teams. 


.. _admin-delete-team:

Delete a team
============================================================================

To delete a team, you must be a Splunk Observability Cloud administrator.

To delete a team, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. Find the name of the team.

#. Select the :guilabel:`Actions` menu icon next the team name, then select :menuselection:`Delete Team`.

#. Splunk Observability Cloud displays a dialog box that asks you to confirm the deletion. Select :guilabel:`Delete`.

The team no longer appears in the list of teams.


Change team name
============================================================================

To learn which roles can change the name of a team, see :ref:`about-team-roles`.

To change the team name, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. Find the name of the team and select the team.

#. Select the :guilabel:`Edit` icon next the team name.

#. When you're finished editing the name, select :guilabel:`Enter to save your changes`. 

.. note:: The Team name is case-insensitive. If you attempt to change the team name from :strong:`Team` to :strong:`team`, you will see a message that the name already exists. 

The team now appears with the name you changed it to.


Add team members
============================================================================

For the roles that can add and remove team members, see :ref:`about-team-roles`.

To add or remove team members, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. Find the name of the team.

#. Select the :guilabel:`Actions` menu (|more|) next to the team name and select :menuselection:`Add users`.

#. Use the :guilabel:`Add Users` field to search for users by name or email to add them to the team.

   * To add a team member, select the email address of the member.

#. Select :guilabel:`Add`.

Remove team members
============================================================================

For the roles that can add and remove team members, see :ref:`about-team-roles`.

To remove team members, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. Find the name of the team whose member list you want to edit.

#. On the Users tab, select the :guilabel:`Actions` menu (|more|) next to the name of the user you want to remove from the team.

#. Select :guilabel:`Remove from team`


View a user's team membership
============================================================================

You can search by a user's name to view a list of the teams to which they belong.

To view which teams a user belongs to, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. In the search bar, enter the name of the user and ensure that :guilabel:`Users` is selected. You can search by the user's name or email address.



