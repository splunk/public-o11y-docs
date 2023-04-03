.. _intro-roles-users-teams:

*******************************************************************************
Introduction to roles, users, and teams in Splunk Observability Cloud
*******************************************************************************

.. meta::
   :description: Learn how to manage users, roles, and teams in Splunk Observability Cloud.

Use Splunk Observability Cloud teams to coordinate teamwork. Perform the following tasks to set up your teams and provide team members with resources that can help streamline their teamwork:

.. toctree::
   :hidden:

   About roles and capabilities <roles-and-capabilities-about>
   Matrix of roles and capabilities  <roles-and-capabilities-table>
   Assign roles to users <users-assign-roles>
   Create and manage users  <manage-users>
   Manage teams  <manage-membership>
   Manage team landing pages  <configure-page>
   Manage team notifications  <team-notifications>
   Link detectors and dashboards to teams  <associate-team>
   Enable enhanced team security  <enhanced-team-security>
   



.. raw:: html

  <embed>
    <h2>Create users in Observability Cloud</h2>
  </embed>

Admins can invite users to Splunk Observability Cloud. Each user must have a unique email address. For more information, see :ref:`manage-users`.


.. raw:: html

  <embed>
    <h2>Assign roles to users</h2>
  </embed>

  Splunk Observability Clouds lets you restrict access to certain features and data to specific groups of users using role-based access control. You assign roles to users. A role contains a set of capabilities. These capabilities define what actions are available to roles.  For details about each role and the associated capabilities, see :ref:`roles-and-capabilities-table. 


.. raw:: html

  <embed>
    <h2>Organize users into teams</h2>
  </embed>

As a Splunk Observability Cloud administrator, use teams to organize users by functional area, then you can connect users in a particular area to the detectors and dashboard groups that they're most interested in. For example, here are examples of some teams based on functional areas:

  * Security: Teams who monitor hardware and software security
  * Hardware operations: Teams who add, replace, or fix computer hardware
  * DevOps: Teams responsible for maintaining system uptime
  * Infrastructure IT: Teams who manage user access to systems

In these areas, each team might monitor specific metrics related to their functional area, or they might monitor a general set of metrics for the specific systems they manage, or both.

For example, your security team might focus on metrics that indicate login failures, because these failures indicate attempts to break into systems. You might also have several DevOps teams, each of which monitors CPU temperature and network response time metrics for the systems they manage.

To learn more about creating and managing teams, see :ref:`admin-manage-teams`.


