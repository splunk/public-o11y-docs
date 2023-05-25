.. _admin-manage-teams:

***************************************************
Manage teams in Splunk Observability Cloud
***************************************************

.. meta::
   :description: Learn how to how to manage teams and team membership.

Use Splunk Observability Cloud teams to coordinate teamwork. Managing teams in Splunk Observability Cloud means creating and deleting teams, as well as managing membership and team security.

Organize users with teams
========================================

As a Splunk Observability Cloud administrator, use teams to organize users by functional area, then you can connect users in a particular area to the detectors and dashboard groups that they're most interested in. For example, here are examples of some teams based on functional areas:

  * Security: Teams who monitor hardware and software security
  * Hardware operations: Teams who add, replace, or fix computer hardware
  * DevOps: Teams responsible for maintaining system uptime
  * Infrastructure IT: Teams who manage user access to systems

In these areas, each team might monitor specific metrics related to their functional area, or they might monitor a general set of metrics for the specific systems they manage, or both.

For example, your security team might focus on metrics that indicate login failures, because these failures indicate attempts to break into systems. You might also have several DevOps teams, each of which monitors CPU temperature and network response time metrics for the systems they manage.


Link teams to relevant Observability Cloud features and content
====================================================================

You can link teams to relevant dashboard groups and detectors, giving them focused access to the information they use the most.

To learn more about linking teams to dashboard groups and detectors, see :ref:`admin-team-notifications`.

.. raw:: html

  <embed>
    <h3>Set up team landing pages to provide a handy location for team resources</h3>
  </embed> 

A team landing page provides a customizable text area that you can use to provide useful information for the team. The team landing page also provides access to any dashboard groups and detectors that you linked to the team.

To learn more about team landing pages, see :ref:`admin-configure-page`.


Create team notifications
=======================================

Define team notifications to help ensure that your team receives the alerts it needs to stay informed.

To learn more about team notifications, see :ref:`admin-team-notifications`.


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

Enable enhanced team security
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

Some team roles and permissions change based on whether enhanced team security is turned on. For example, when you turn on enhanced team security, the Team Manager role is available, and Observability Cloud administrators or Team Managers must add users. For information about enhanced team security and team roles, see :ref:`about-team-roles`.
