.. _user-roles-permissions:

************************************************************************
Splunk On-Call user roles and permissions
************************************************************************

.. meta::
   :description: Splunk On-Call system requirements, including browsers, mobile support, and incident requirements.

.. toctree::
   :hidden:

   admin-quick-start
   getting-started-user
   manage-users
   add-user
   usernames
   configure-teams
   global-admin
   alert-admin
   team-admin
   team-admin-setup
   user-role
   new-user-sign
   user-training
   stakeholders



.. raw:: html

  <embed>
    <h2>User Roles and Permissions</h2>
  </embed>



There are five roles in Splunk On-Call:

* Global admin: Global access, no restrictions
* Team admin: Manages people and scheduling on a team basis
* Alert admin: Manages the technical aspects of creating and optimizing alerts
* User: alert responder
* Stakeholder: Read-only awareness

Global admin, alert admin, user, and stakeholder are global roles within Splunk On-Call. The Team admin role is assigned on a team basis. This means that the user that is a Team Admin for one team has permissions to manage people and schedules for only that team.

This means that a user can hold two roles. Here are the possible combinations:

* User & Team Admin
* Alert Admin & Team Admin
* Stakeholders can be considered separate from all other roles as these users cannot be placed in any on-call schedules nor take action on incidents.  They can be added to existing incidents and notified through their defined contact methods for awareness.  For comprehensive information on stakeholders, see :ref:`stakeholders`.

Learn about the following user roles and the permissions associated with each role:

.. list-table::
   :header-rows: 1
   :widths: 40, 60

   * - :strong:`Role`
     - :strong:`Description`


   * - :ref:`Global admin <global-admin>`
     - * The highest level of permissions in the Splunk On-Call platform 
       * Responsible for the overall workflow and management of integrations and users.
       * Access to all functionality across the platform including scheduling, integrations, teams, and users.


   * - :ref:`Alert admin <alert-admin>`
     - * Responsible for managing alert configuration, integrations, and their workflow.
       * Permissions are organization-wide.

   * - :ref:`Team admin <team-admin>`
     - * There can be multiple Team Admins within a single team. 
       * Responsible for a team's on-call schedules, escalation policies, and the overall management of the users who are apart of your team.

   * - :ref:`User <user-training>`
     - * There can be multiple Team Admins within a single team. 
       * Responsible for a team's on-call schedules, escalation policies, and the overall management of the users who are apart of your team.

   * - :ref:`Stakeholder <stakeholders>`
     - * A read-only user role that cannot take actions within the platform. 
       * Receives paging notifications and has limited access to the Splunk On-Call platform. 


.. raw:: html

  <embed>
    <h2>How to Change Global Roles</h2>
  </embed>


Only Global admins can change the user roles, including the roles of other Global admins.

To change a user's global role, navigate to :guilabel:`Users`, and select the name of the user to access their profile page. You may change the role of that user by selecting a new role from the Role dropdown. Your changes save automatically.

For information on how to manage Team Admin permissions, see :ref:`team-admin-setup`.

For more information regarding overall Admin permissions, including the Alert admin role, see  :ref:`user-roles-permissions`.


.. raw:: html

  <embed>
    <h2>How to change Stakeholder Roles</h2>
  </embed>



Users can be converted to or from a stakeholder role with the assistance of the support team.  Note that Stakeholders are priced differently from all other user roles so additional charges may be incurred if converting someone from a stakeholder to another role.

If interested in a stakeholder conversion, please contact the Support team and include the specific users you'd like to convert and what role you'd like them converted to.  If converting from one of the user role types to a stakeholder, ensure that the user is removed from all rotations and escalation policies and isn't actively being paged for any incidents.



The following tables provide a detailed breakdown of the specific permissions for each role.

.. raw:: html

  <embed>
    <h2>User Permissions</h2>
  </embed>


The following table identifies the user management capabilities of each Splunk On-Call role.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Invite user
     - Yes
     - 
     - Yes
     - 
     - 

   * - Delete user
     - Yes
     - 
     - 
     - 
     - 

   * - Increase seats
     - Yes
     - 
     - Yes
     - 
     - 

   * - View user profile
     - Yes
     - Only their own
     - For users on teams where they are a Team admin
     - Only their own
     - Only their own

   * - Manage contact methods
     - Yes
     - Only their own
     - For users on teams where they are a Team admin
     - Only their own
     - Only their own

   * - Manage paging policies
     - Yes
     - Only their own
     - For users on teams where they are a Team admin
     - Only their own
     - Only their own

   * - Manage global roles
     - Yes
     - 
     - 
     - 
     - 

   * - Promote user to Tead admin
     - Yes
     - 
     - For teams where they are the Team admin
     - 
     - 



.. raw:: html

  <embed>
    <h2>Team management</h2>
  </embed>

The following table identifies the team management capabilities of each Splunk On-Call role.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Create team
     - Yes
     - 
     - Yes
     - 
     - 

   * - Rename or delete team
     - Yes
     - 
     - For teams where they are a Team admin
     - 
     - 

   * - Add, remove users, or make team admin
     - Yes
     - 
     - For teams where they are a Team admines
     - 
     - 

   * - View rotations
     - Yes
     - Yes
     - For teams where they are a Team admin
     - Yes
     - 

   * - Create, edit, or delete rotations
     - Yes
     - 
     - For teams where they are a Team admin
     - 
     - 

   * - View escalation policies
     - Yes
     - Yes
     - For teams where they are a Team admin
     - Yes
     - 

   * - Create, edit, or delete escalation policies
     - Yes
     - 
     - For teams where they are a Team admin
     - 
     - 

   * - Take a scheduled Override
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Create or delete a scheduled Override
     - Yes
     - For themselves
     - For users on teams where they are the Team admin
     - For themselves
     - 

   * - Assign a scheduled Override
     - Yes
     - 
     - For Escalation Policies within a team where they are the Team admin
     - 
     - 

   * - Reset assignee to NULL for scheduled Override
     - Yes
     - For their own
     - For Escalation Policies within a team where they are the Team admin
     - For their own
     - 


.. raw:: html

  <embed>
    <h2>Alert and incident management</h2>
  </embed>


The following table identifies the alert and incident management capabilities of each Splunk On-Call role.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - View Integrations
     - Yes
     - Yes
     - Yes
     - Yes
     - Yes

   * - Enable or revoke integrations
     - Yes
     - Yes
     - 
     - 
     - 

   * - View incident configurations
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Enable or revoke incident configurations
     - Yes
     - Yes
     - 
     - 
     - 

   * - View routing keys
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Create, update, delete routing keys
     - Yes
     - Yes
     - 
     - es
     - 

   * - View and preview rules in Rules Engine
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Create, edit, reorder, enable, disable, and delete rules
     - Yes
     - Yes
     - 
     - 
     - 

   * - Outgoing webhooks: view, create, edit, delete, enable, disable
     - Yes
     - Yes
     - 
     - 
     - 

   * - VictorOps API: create, delete, rename, or revoke key
     - Yes
     - 
     - 
     - 
     - 

.. raw:: html

  <embed>
    <h2>On-Call actions</h2>
  </embed>

The following table identifies the on-call actions each Splunk On-Call role can perform.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Manual Take On-Call: take on-call
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Manual Take On-Call: take back
     - If they are the user whose shift was taken. That is, Kai takes a shift for Wei. Wei can Take Back. This is not role-dependent.
     - If they are the user whose shift was taken. That is, Kai takes a shift for Wei. Wei can Take Back. This is not role-dependent.
     - If they are the user whose shift was taken. That is, Kai takes a shift for Wei. Wei can Take Back. This is not role-dependent.
     - If they are the user whose shift was taken. That is, Kai takes a shift for Wei. Wei can Take Back. This is not role-dependent.
     - 

   * - Maintenance mode: Enter or exit
     - Yes
     - Yes
     - 
     - 
     - 

   * - Conference bridges: Start or End
     - Yes
     - Yes
     - 
     - 
     - 

   * - Incident Actions: View
     - Yes
     - Yes
     - Yes
     - Yes
     - View stakeholder information on specific incidents that a user has added them to

   * - Incident Actions: Ack, ack all, Resolve, resolve all, reroute, Snooze
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Incident actions: Edit snooze time
     - Only the user who snoozed the incident can change the time. This is not role-dependent.
     - Only the user who snoozed the incident can change the time. This is not role-dependent.
     - Only the user who snoozed the incident can change the time. This is not role-dependent.
     - Only the user who snoozed the incident can change the time. This is not role-dependent.
     - 

   * - Incident Actions: Add stakeholders to incidents
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Incident Actions: Create manual incident
     - Yes
     - Yes
     - Yes
     - Yes
     - 


.. raw:: html

  <embed>
    <h2>Billing</h2>
  </embed>


The following table identifies the billing capabilities of each Splunk On-Call role.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Change billing contact info
     - Yes
     - 
     - 
     - 
     - 

   * - Add payment method
     - Yes
     - 
     - 
     - 
     - 

   * - Update payment method
     - Yes
     - 
     - 
     - 
     - 

   * - Download PDF invoice
     - Yes
     - 
     - 
     - 
     - 

.. raw:: html

  <embed>
    <h2>Reporting</h2>
  </embed>



The following table identifies the reporting capabilities of each Splunk On-Call role.

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Post-incident review: View, print, create.
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Post-incident review: edit or delete
     - Yes
     - For reports they created
     - Yes
     - For reports they created
     - 

   * - MTTA or MTTR Performance: view or print
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - On-Call: view or print
     - Yes
     - Yes
     - Yes
     - Yes
     - 

   * - Incident frequency: view or print
     - Yes
     - Yes
     - Yes
     - Yes
     - 
