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

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

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



.. _admin-team-controls:

Turn on enhanced team security
============================================================================

|hr|

:strong:`Available in Enterprise Edition`

|hr|

By default, every user can join any team in your organization. If you want to restrict users from being able to join any team, you can turn on the enhanced team security setting. Turning on the enhanced team security setting also makes the Team Manager role available to teams.

To learn more about team roles and permissions, see :ref:`about-team-roles`.

You must be a Splunk Observability Cloud administrator to apply this setting. This setting applies to every team in your organization.

To turn on the enhanced team security setting, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > General Settings`.

#. Select the :guilabel:`Restrict Access` check box.


.. _about-team-roles:

Team roles and permissions
============================================================================

This table presents the available team roles and their permissions. Some team roles and permissions change based on whether enhanced team security is turned on. For example, when you turn on enhanced team security, the Team Manager role is available, and Observability Cloud administrators or Team Managers must add users.

To learn more about enabling enhanced team security, see :ref:`admin-team-controls`.

.. list-table::
  :widths: 20,20,20,20,20

  * - :strong:`Permission`
    - :strong:`Admin`
    - :strong:`Team Manager` (Available with enhanced team security turned on)
    - :strong:`Team Member`
    - :strong:`User`

  * - :strong:`Create team`
    - Yes
    - No
    - No
    - No

  * - :strong:`Delete team`
    - Yes
    - No
    - No
    - No

  * - :strong:`View team landing page`
    - Yes
    - Yes
    - Yes
    - Yes

  * - :strong:`Edit team name and description`
    - Yes
    - Yes
    - * Yes, when enhanced team security is turned off
      * No, when enhanced team security is turned on
    - No

  * - :strong:`Join team`
    - Yes
    - Not applicable: A Team Manager doesn't join a team. Only an existing Team Member can be assigned this role.
    - Not applicable: A Team Member is already on a team and doesn't need to join.
    - * Yes, when enhanced team security is turned off
      * No, when enhanced team security is turned on. A user must be added by an Admin or Team Manager

  * - :strong:`Add member`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Assign Team Manager role to Team Member`
    - * Not applicable, when enhanced team security is turned off. The Team Manager role isn't available when enhanced team security is turned off
      * Yes, when enhanced team security is turned on
    - Yes
    - * Not applicable, when enhanced team security is turned off. The Team Manager role isn't available when enhanced team security is turned off
      * No, when enhanced team security is turned on
    - * Not applicable, when enhanced team security is turned off. The Team Manager role isn't available when enhanced team security is turned off
      * No, when enhanced team security is turned on

  * - :strong:`Remove member`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Edit notification policy`
    - Yes
    - Yes
    - Yes
    - No

  * - :strong:`Leave team`
    - * Yes, if on a team
      * Not applicable, if not on a team
    - Yes
    - Yes
    - Not applicable: A user must be on a team to leave a team

Permission to link a detector to a team is based on the detector's permissions. For example, if the user has write permission for a detector, they can link it to a team. To learn more, see :ref:`detector-manage-permissions`.

Permission to link a dashboard group to a team is based on the dashboard group's permissions. For example, if the user has write permission for a dashboard group, they can link it to a team. To learn more, see :ref:`dashboard-manage-permissions`.
