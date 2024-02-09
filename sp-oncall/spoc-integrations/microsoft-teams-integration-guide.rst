Splunk>VictorOps app for Microsoft Teams
**********************************************************

Use the Splunk>VictorOps app in Microsoft Teams to handle critical incidents from the tool of your choice. This application is bi-directional so you can see the entire payload of your incidents, acknowledge and resolve incidents. Splunk On-Call maps your Microsoft Teams user so that all reporting is accurate and no information is lost.

Requirements
================

*  Enterprise level Splunk On-Call account and global admin permissions
*  Microsoft Teams organization admin permission
*  Microsoft Teams team owner for the team the app is to be installed for 

How the app works
======================

* Splunk On-Call routes all single or multiple-responder incidents to the subscribed Microsoft Teams channel.
* A new card is created in the Microsoft Teams channel for incident management. The incident card is updated as incident events occur.
* Microsoft Teams users can take incident management actions on incidents, for example, snooze, reroute, acknowledge, add responders, and resolve, from either Splunk>VictorOps app or Microsoft Teams.

Install the app
================

1.  Download the Splunk>VictorOps app from the Microsoft Store, then select the app icon to begin the installation process.
2.  Select :guilabel:`Add to a team` and then select a channel for the Splunk>VictorOps app. When you install the Splunk>VictorOps app in a specific channel in a team makes Splunk>VictorOps app available for all channels in that team.
3.  Select :guilabel:`Set up a bot` to add the app to your team and begin the configuration process.

You can run the installation process again to select channels from additional teams to expand access to the Splunk>VictorOps app.

Configure the app
=====================

Before you get started configuring the app, make sure that you meet the prerequisites for configuring the app.

Prerequisites
----------------
* You must log in as an Microsoft Teams organization administrator and team owner
* You must also have a Splunk On-Call account that uses the same email address as the Microsoft Teams organization administrator

After installing the app and adding it to a team, you need to configure the app. 

1. Once you add the Splunk>VictorOps app to a team, a :guilabel:`Welcome to VictorOps` card shows in that team's General channel. You can also run the bot command ``@Splunk VictorOps configure`` to generate a new card in a channel.
2. Select :guilabel:`Configure`.
3. Select :guilabel:`Add Configuration`.
4. Enter your Splunk On-Call organizations API ID and API Key.
5. Select :guilabel:`Allow application to access MS Teams account details`.
6. Enter administrative credentials when prompted by Microsoft Teams.
7. Select :guilabel:`Accept` to provide consent.
8. Select :guilabel:`Save` to complete the configuration.

.. note:: It can take as long as 10 seconds for Microsoft Teams to register your consent. If you receive an unable to connect error, try again after 10 seconds. If the problem continues, contact Support.

Map your channels
------------------

Next, you need to define mapping to channels within your Microsoft Teams instance. You can do so by mapping entire Splunk On-Call teams to a default channel or by mapping specific Splunk On-Call escalation policies.

1. To begin, a Microsoft Teams team owner can run the ``@Splunk VictorOps mapchannel`` command in any channel where the app is installed.
2. Select :guilabel:`Map Channel` in the resulting card.
3. Select :guilabel:`Add Mapping` to open the :guilabel:`Add Default Channel Mapping` dialog box.
4. Select a configured connection in :guilabel:`VictorOps Organization`.
5. Select a :guilabel:`VictorOps Team`.
6. Select a :guilabel:`Microsoft Teams Team`.
7. Select a :guilabel:`Microsoft Teams Channel`.
8. Select :guilabel:`Save`.

Your mapping displays in the Default Mapping table. 

If the selected Microsoft Teams Team doesn't have the Splunk>VictorOps application installed, you receive a warning with an option to install the app. Install the app and select :guilabel:`Save`.

.. image:: /_images/spoc/MS1.png
    :alt: Splunk>VictorOps app default channel mapping
    :width: 95%

Escalation policy mapping
-----------------------------

#. Select the :guilabel:`Escalation Policy Mapping` tab.
#. Select :guilabel:`Add Mapping` to open the :guilabel:`Add Escalation Policy to Channel Mapping` dialog box.
#. Select a configured connection in :guilabel:`VictorOps Organization`.
#. Select a :guilabel:`VictorOps Escalation Policy`. Escalation polices are listed alphabetically within their Splunk On-Call teams.
#. Select a :guilabel:`Microsoft Teams Team`.
#. Select your :guilabel:`Channel Settings`. You can map new incidents to an existing channel within a selected Team or you can create a new channel within that team for each new incident. If you select the option to create new channels, you can either:
    * Add only the Splunk On-Call users being paged by the escalation to the Microsoft Teams team associated with the channel. This option only works for Microsoft Teams members with corresponding accounts in the configured VictorOps organization, matched on email address.
    * Add all Splunk On-Call users in the escalation policy to the Microsoft Teams team associated with the channel. This option only works for Microsoft Teams members with corresponding accounts in the configured VictorOps organization, matched on email address.
    * Last, you can leave all users as-is by leaving these options unselected.  
#. Select :guilabel:`Save`.

.. image:: /_images/spoc/MS3.png
    :alt: Splunk>VictorOps app escalation policy mapping
    :width: 95%

Your mapping displays in the Escalation Policy Mapping table.

If the selected Microsoft Teams Team doesn't have the Splunk>VictorOps application installed, you receive a warning with an option to install the app. Install the app and select :guilabel:`Save`.

Splunk>VictorOps bot commands
-----------------------------

You can call the Splunk>VictorOps bot by running ``@Splunk VictorOps`` in any channel where the app is installed. The following are available commands:

* ``help``: Use the help command to display the list of bot commands.
* ``configure``: Use the configure command to configure the app in the current channel. You can also use this command to edit your connections.
* ``mapchannel``: Use the mapchannel command to create default and escalation policy channel mappings.
* ``createincident``: Use the createincident command to create an incident that alerts the selected escalation policies or users with the specified incident description, body, and acknowledgement behavior.

Uninstall the app
====================

You can uninstall the Splunk>VictorOps app at the Microsoft Teams organization or team level. A Microsoft Teams organization administrator has permission to uninstall at either level. A Microsoft Teams team owner can only manage their own team's settings. What a team owner has permission to do varies and might be inadequate for uninstalling the Splunk>VictorOps app.

Uninstall at a team level
------------------------------

Uninstalling at the team level automatically unsubscribes and removes the Splunk>VictorOps app from all channels within that team. 

#. Select :guilabel:`Teams` in the sidebar.
#. Select :guilabel:`More options...`.
#. Select :guilabel:`Manage team`.
#. On the :guilabel:`Apps` tab, select :guilabel:`Uninstall` next to Splunk>VictorOps.
#. Select :guilabel:`Uninstall` to confirm.

Uninstall at the organization level
---------------------------------------

Uninstalling at the organization level automatically removes the Splunk>VictorOps app from all teams within the org.

#. Select :guilabel:`Apps` in the sidebar.
#. Select :guilabel:`Splunk>VictorOps` menu.
#. Select :guilabel:`Delete`.
#. Select :guilabel:`I understand the app will be deleted for all users`.
#. Select :guilabel:`Delete app` to confirm.

.. caution:: If you uninstall the Splunk>VictorOps at at the organization level channels are not unsubscribed. As a workaround, uninstall at the team level prior to removing at the organization level.

MS Teams permissions required for the Splunk>VictorOps app
=============================================================

The Splunk>VictorOps app requires the following MS Teams permissions:

*  Allow the Teams app to manage itself for all teams
*  Manage Teams apps for all teams
*  Read installed Teams apps for all teams
*  Create channels
*  Read and write all group memberships
*  Read all group memberships
*  Read and write directory data
*  Read directory data
*  Read and write all groups
*  Read all groups
*  Read all users' full profiles
*  Read and write all users' full profiles
*  Sign in and read user profile
