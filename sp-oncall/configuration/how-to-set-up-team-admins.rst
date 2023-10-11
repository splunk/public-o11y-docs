The *Team Admin* permission set is an *Enterprise* level feature and can
be assigned to Splunk On-Call users on a per team basis. A *User* may be
promoted to a Team Admin role from the Users list within a team. Once
promoted to Team Admin, that User has permissions to manage all aspects
of that team. 

Getting Started
---------------

To get started, a user with the role of *Global Admin* will be required
to create the first *Team Admin* on a team. To do this, navigate to
the Users tab within a specific team. Click the pencil icon on the
right-hand side to promote a User to a Team Admin.

You will then be asked to confirm that you want to promote this user to
a Team Admin role. Click ‘Confirm’ to give this user Team Admin
permissions. In the Users Table, the Team Admin role will display as
“user”. In the column labeled “teams” a \* next to the team name will
indicate they are a team admin for that team.

As a Team Admin, a user has a higher level of permissions. They will be
able to manage all scheduling aspects for the respective team, add users
to their team, and schedule overrides. Team Admins can also promote
other users to Team Admins. This allows teams to be more
self-sufficient.

If you need to demote a Team Admin back to a User role, use the same
pencil icon to the right of the users name. A pop up will appear
confirming that you want to change this users permissions. 

Note: We recommend you designate at least one Team Admin per team. This
lightens the administrative tasks of Global Admins.

--------------

Converting Global Admins to Team Admins
---------------------------------------

By default, all Global Admins will have Team Admin permissions on every
team. If you need to downgrade a Global Admin in your account to a Team
Admin, the following steps are required:

1. Navigate to the Personal Profile for that person and change their
Admin role to *User.*

2. Navigate to the Team where this User will be promoted to Team Admin.
Note: This user will need to be a member of that team to be promoted to
Team Admin. Use the pencil icon on the right-hand side of the Users
Table to promote that User to a Team Admin. 

--------------

User Management
---------------

Adding Users to Orgs
~~~~~~~~~~~~~~~~~~~~

Team Admins have the ability to **add users to an org** because we
recognize the importance of being able to onboard new team members into
Splunk On-Call. Note: They can’t remove users from an Org.

Adding Users to Teams
~~~~~~~~~~~~~~~~~~~~~

Team Admins have permission to add and remove users on their teams.

--------------

Team Management
---------------

Rotations & Escalation Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Team Admins have permissions to create, modify, and delete rotations and
escalation policies for their teams. Please reference these articles for
help performing these actions:

`Splunk On-Call Knowledge Base:
Rotations <https://help.victorops.com/knowledge-base/rotations/>`__

`Splunk On-Call Knowledge Base: Escalation
Policies <https://help.victorops.com/knowledge-base/team-escalation-policy/>`__

Team Creation
~~~~~~~~~~~~~

If a user is a Team Admin for at least one team, they have the ability
to create new teams. When they create a new team, they’re automatically
designated as a Team Admin for that team.

--------------

Scheduled Overrides
-------------------

Create/Delete
~~~~~~~~~~~~~

Team Admins can manage Scheduled Overrides for members of their team(s).
They can create/delete overrides for all users on their teams. 

Assignment/Reset
~~~~~~~~~~~~~~~~

Team Admins can only assign members of their teams to cover escalation
policies that fall within their teams. If an override contains coverage
requests for escalation policies *outside* of that Team Admin’s teams,
the Team Admin won’t have access to assign a user to cover it. Team
Admins can reset coverage for escalation policies in teams they’re Team
Admins for or for any override they personally take.

--------------

Billing
-------

Team Admins don’t have access to billing within Splunk On-Call. Global
Admin is the only role with this access.
