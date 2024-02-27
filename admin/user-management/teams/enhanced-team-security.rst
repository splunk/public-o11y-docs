.. _enhanced-team-security:

***************************************************
Turn on enhanced team security
***************************************************

.. meta::
   :description: Learn how to how to manage teams and team membership.

Managing teams in Splunk Observability Cloud means creating and deleting teams, as well as managing membership and team security.




.. _admin-team-controls:

Turn on enhanced team security
============================================================================

|hr|

:strong:`Available in Enterprise Edition`

|hr|

By default, every user can join any team in your organization. If you want to restrict users from being able to join any team, you can turn on the enhanced team security setting. Turning on the enhanced team security setting also makes the Team Manager role available to teams.

Team Manager role is not part of role-based access control (RBAC). The Team Manager role allows an individual to run administrative tasks for the team. For example, editing the team description, adding or removing team members, and modifying the team notification policies. These permissions apply only to the team they are a member of and do not apply across the entire organization. 
  
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

.. note:: You can't promote a team member with the ``read_only`` RBAC role to team manager. For more information about RBAC roles, see :ref:`about-team-roles`.

To learn more about enabling enhanced team security, see :ref:`admin-team-controls`.

.. list-table::
  :header-rows: 1
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
