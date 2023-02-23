.. _roles-and-permissions:

***************************************************
About roles and permissions
***************************************************

.. meta::
   :description: Learn how to how to manage teams and team membership.




Users are assigned to roles. A role contains a set of capabilities. Capabilities specify what actions are available to roles. For example, capabilities determine whether someone with a particular role is allowed to create detectors or dashboards. The various capabilities are listed in "XXXXXXXXXXXXX".

By default, Splunk Observability Cloud comes with the following roles predefined:

* admin -- this role has the most capabilities assigned to it.
* power -- this role can edit all shared objects (saved searches, etc) and alerts, tag events, and other similar tasks.
* user -- this role can create and edit its own saved searches, run searches, edit its own preferences, create and edit event types, and other similar tasks.
  



This table presents the available user roles and their permissions. Some team roles and permissions change based on whether enhanced team security is enabled. For example, when you enable enhanced team security, the Team Manager role is available, and Observability Cloud administrators or Team Managers must add users.

To learn more about enabling enhanced team security, see :ref:`enhanced-team-security`.

.. list-table::
  :widths: 20,20,20,20,20

  * - :strong:`Permission`
    - :strong:`Admin`
    - :strong:`Team Manager` (Available with enhanced team security enabled)
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
    - * Yes, when enhanced team security is disabled
      * No, when enhanced team security is enabled
    - No

  * - :strong:`Join team`
    - Yes
    - Not applicable: A Team Manager doesn't join a team. Only an existing Team Member can be assigned this role.
    - Not applicable: A Team Member is already on a team and doesn't need to join.
    - * Yes, when enhanced team security is disabled
      * No, when enhanced team security is enabled. A user must be added by an Admin or Team Manager

  * - :strong:`Add member`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Assign Team Manager role to Team Member`
    - * Not applicable, when enhanced team security is disabled. The Team Manager role isn't available when enhanced team security is disabled
      * Yes, when enhanced team security is enabled
    - Yes
    - * Not applicable, when enhanced team security is disabled. The Team Manager role isn't available when enhanced team security is disabled
      * No, when enhanced team security is enabled
    - * Not applicable, when enhanced team security is disabled. The Team Manager role isn't available when enhanced team security is disabled
      * No, when enhanced team security is enabled

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
