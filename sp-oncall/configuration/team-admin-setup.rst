.. _team-admin-setup:

************************************************************************
Set up Team Admins in Splunk On-Call
************************************************************************

.. meta::
   :description: Set up Team Admins in Splunk On-Call to manage scheduling for their team, add users, and schedule overrides.



The Team Admin permission is an Enterprise level feature and can be assigned to Splunk On-Call users on a team-by-basis. A User may be promoted to a Team Admin role from the Users list within a team. Once promoted to Team Admin, that User has permissions to manage all aspects of that team. 

.. note:: The Team Admin role is not related to role-based access control (RBAC). It is an additional role that allows a user additional permissions compared to other users on that team.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

You must be a Global Admin to create the first Team Admin on a team.

Assign a user the Team Admin role
==========================================

A user with the role of Global Admin is required to create the first Team Admin* on a team. 

#. Navigate to the Users tab within a specific team. 
#. Select the pencil icon on the right-hand side to promote a User to a Team Admin.
#. Select :guilabel:`Confirm` when prompted to give this user Team Admin permissions. In the Users Table, the Team Admin role will display as user. In the column labeled “teams” an asterisk (*) next to the team name indicates they are a team admin for that team.

As a Team Admin, that user has a higher level of permissions. They are able to manage all scheduling aspects for the respective team, add users to their team, and schedule overrides. Team Admins can also promote other users to Team Admins. This allows teams to be more self-sufficient.

If you need to demote a Team Admin back to a User role, use the same pencil icon to the right of the user's name.

..note::  Designate at least one Team Admin per team. This lightens the administrative tasks of Global Admins.



Convert Global Admins to Team Admins
===============================================

By default, all Global Admins will have Team Admin permissions on every team. If you need to downgrade a Global Admin in your account to a Team Admin, the following steps are required:

1. Navigate to the Personal Profile for that person and change their Admin role to User.

2. Navigate to the Team where this User will be promoted to Team Admin. This user will need to be a member of that team to be promoted to Team Admin. Use the pencil icon on the right-hand side of the Users Table to promote that User to a Team Admin.


User Management
--------------------


- Team Admins have the ability to add users to an org. They can't remove users from an Org.
- Team Admins have permission to add and remove users on their teams.


Team Management
==========================

Rotations & Escalation Policies
--------------------------------------

Team Admins have permissions to create, modify, and delete rotations and escalation policies for their teams. For more details, see:

- :ref:`rotation-setup`
- :ref:`team-escalation-policy`

Team Creation
---------------------

If a user is a Team Admin for at least one team, they have the ability to create new teams. When they create a new team, they're automatically designated as a Team Admin for that team.


Scheduled Overrides
-------------------

Create/Delete
^^^^^^^^^^^^^^^^^^^^

Team Admins can manage Scheduled Overrides for members of their team(s). They can create or delete overrides for all users on their teams.

Assignment/Reset
^^^^^^^^^^^^^^^^^^^^

Team Admins can only assign members of their teams to cover escalation policies that fall within their teams. If an override contains coverage requests for escalation policies outside of that Team Admin's teams, the Team Admin won't have access to assign a user to cover it. Team Admins can reset coverage for escalation policies in teams they're Team Admins for or for any override they personally take.


Billing
-------

Team Admins don't have access to billing within Splunk On-Call. Global Admin is the only role with this access.
