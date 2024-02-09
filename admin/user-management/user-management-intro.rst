.. _user-managment-intro:

********************************************************************************
Manage users and teams
********************************************************************************

.. meta::
   :description: Learn how to manage users, teams and roles.

.. toctree::
   :hidden:

   Manage teams TOGGLE <teams/manage-teams>
   Manage users TOGGLE <users/manage-users>
   Manage roles TOGGLE <roles/roles-and-capabilities-about>
  


The foundational tasks of configuring your org include adding users, assigning them to teams, and managing roles and access permissions for users. Most organizations plan to roll Splunk Observability Cloud  out across their enterprise footprint and will have multiple internal customers. Often it involves different requirements when using the various features of the product.

To manage these internal customers you can use the :ref:`Teams <admin-manage-teams>` feature, this allows you to organize users together in a team and manage them as a functional unit.

A user with Admin privilege can manage teams, this includes adding or removing users and assigning a Team Admin.

By default, users can choose to join or leave teams at will. For larger organizations we recommend that you enable :ref:`enhanced team security <enhanced-team-security>`. This is especially useful if the teams are assigned a certain amount of usage rights with their associated tokens.

For an overview of the various team roles and permissions, see :ref:`about-team-roles`.

Teams can also assign :ref:`team specific notification <admin-team-notifications>` methods for alerts raised by detectors that are set up in Splunk Observability Cloud as different teams might have different escalation methods for their alerts.

Determining naming convention for teams is essential to ensure uniformity and easily identified when assigning access tokens to be able to control data ingest limits. One of the more common best practices is to synch Team and Token names such as:

Team name: FRONTEND_DEV_TEAM 
Token name: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

This will make it easier to identify the owners of tokens when viewing the usage reports.
