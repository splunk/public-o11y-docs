.. _configure-teams:

************************************************************************
Configure teams
************************************************************************

.. meta::
   :description: How to configure teams in Splunk On-Call.

Configuring teams is easy with Splunk On-Call. Teams can have multiple escalation policies within them and may also include any number of users, with or without a rotation. For details on setting up rotations, see :ref:`rotation-setup`. Teams may have one or more on-call rotations to help make scheduling easy.

Create a Team
=======================

To create a team, select :guilabel:`Add Team`, choose a name, and then you are ready to setup that team's schedule or rotations and escalation policies.

.. image:: /_images/spoc/teams-add-teams.png
    :width: 100%
    :alt: Create new teams with the Add Team button.

Typically, teams will have groups of users in an on-call rotation however, escalation policies may include
no users at all and utilize a web-hook or an email address instead.

After creating your team, you'll have the option to add rotations and then setup the team's escalation policies. To learn more about routing specific alerts to specific teams,see :ref:`reroute-an-incident`.


Renaming a Team
====================

To rename a team, locate the Team you wish to rename. Select the “pencil and paper” icon to the right of that team's name. You will then be prompted to input the team's new name and then select :guilabel:`Rename`.

.. image:: /_images/spoc/teams-rename.png
    :width: 100%
    :alt: CTeams page with rename icon to right of team name
