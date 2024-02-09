Microsoft teams integration for Splunk On-Call
**********************************************************

Use the Splunk>VictorOps app in Microsoft Teams application to handle critical incidents from the tool of your choice. This application is bi-directional so you can see the entire payload of your incidents, acknowledge and resolve incidents. Splunk On-Call maps your Microsoft Teams user so that all reporting is accurate and no information is lost.

Requirements
================

-  Enterprise level Splunk On-Call account and global admin permissions
-  Microsoft Teams organization admin permission and team owner for the team the app is to be installed for 

How the app works
======================

-  Splunk On-Call routes all single or multiple-responder incidents to a subscribed Microsoft Teams channel.
-  A new card is created for incident management and is updated as incident events occur.
-  Microsoft Teams users can perform incident management actions like snoozing, rerouting, acknowledging, adding responders, and resolving from either Splunk>VictorOps or Microsoft Teams.

Instal the app
================

1.  Download the Splunk>VictorOps app from the Microsoft Store, then select the app icon to begin the installation process.
2.  Select :guilabel:`Add to a team`, then select a channel for the Splunk>VictorOps bot and any incoming VictorOps incidents. Note that
   installing into any channel in a team makes Splunk>VictorOps available for all channels in that team.
3.  Select :guilabel:`Set up a bot` to add the app to your team and begin the configuration process.

You can run the installation process again to select channels from additional teams to expand access to the Splunk>VictorOps app.

Configure the app
=====================

Once installed and added to a team, you need to configure for first-time use. 

Prerequisites
----------------
* You must log in as an Microsoft Teams organization administrator and team owner
* You must also have a Splunk On-Call account that uses the same email address as the Microsoft Teams organization administrator

1. Once you add the Splunk>VictorOps app to a team, a :guilabel:`Welcome to VictorOps` card is displayed in that team's General channel. You can also execute the bot command ``@Splunk VictorOps configure`` to generate a new card in a channel.
2. Select :guilabel:`Configure`.
3. Select :guilabel:`Add Configuration`.
4. Enter your Splunk On-Call organizations API ID and API Key.
5. Select :guilabel:`Allow application to access MS Teams account details`.
6. Enter administrative credentials when prompted by Microsoft Teams.
7. Select :guilabel:`Accept` to provide consent.
8. Select :guilabel:`Save` to complete the configuration.

.. note:: It can take as long as 10 seconds for consent to be recognized. If you receive an unable to connect error, try again after 10 seconds. If the problem continues, contact Support.

Map your channels
----------------

As a final step, you need to define mapping to channels within your Microsoft Teams instance. You can do so by mapping entire Splunk On-Call teams to a default channel or by mapping specific Splunk On-Call escalation policies.

1. To begin, a Microsoft Teams team owner can execute the ``@Splunk VictorOps mapchannel`` command in any channel where the app is installed.
2. Select :guilabel:`Map Channel` in the resulting card.
3. Select :guilabel:`Add Mapping` to open the `Add Default Channel Mapping` dialog box.
4. Select a configured connection in :guilabel:`VictorOps Organization`.
5. Select a :guilabel:`VictorOps Team`.
6. Select a :guilabel:`Microsoft Teams Team`.
7. Select a :guilabel:`Microsoft Teams Channel`.
8. Select :guilabel:`Save`.

Your mapping displays in the Default Mapping table. 

If the selected Microsoft Teams Team doesn't have the Splunk>VictorOps application installed, you receive a warning with an option to install the app. Install the app and select :guilabel:`Save`.

.. image:: /_images/spoc/MS1.png

**Escalation Policy Mapping**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Select the :guilabel:`Escalation Policy Mapping` tab.
#. Select :guilabel:`Add Mapping` to open the :guilabel:`Add Escalation Policy to Channel Mapping` dialog box.
#. Select a configured connection in :guilabel:`VictorOps Organization`.
#. Select a :guilabel:`VictorOps Escalation Policy`. Escalation polices are listed alphabetically within their Splunk On-Call teams.
#. Select a :guilabel:`Microsoft Teams Team`.
#. Select your :guilabel:`Channel Settings`. You can map new incidents to an existing channel within a selected Team or you can create a new channel within that team for each new incident.
    #. If you select the option to create new channels, you have the further option to control which Teams to add users to that channel's Microsoft Teams Team Note that this functionality only works for Teams members with corresponding accounts in the configured VictorOps organization, matched on email address.  #. You may leave all members as-is, you may add only members who are being paged for the incident, or you may add all members of the VictorOps team associated with the incident's Escalation Policy.
#. Select :guilabel:`Save`.

Your mapping displays in the Escalation Policy Mapping table.

If the selected Microsoft Teams Team doesn't have the Splunk>VictorOps application installed, you receive a warning with an option to install the app. Install the app and select :guilabel:`Save`.

.. image:: /_images/spoc/MS2.png

.. image:: /_images/spoc/MS3.png

Splunk>VictorOps bot commands
-----------------------------

The Splunk>VictorOps bot can be called by any user executing **@Splunk
VictorOps** in any channel where the app has been installed.  Supported
commands include:

-  

   -  **help**\ \_:  Displays the list of available bot commands.\_

      -  **configure**\ \_:  Displays a Welcome card with Configure
         button in the current channel; allows you to define and edit
         your connections.\_
      -  **mapchannel:  Displays a Map Channel card and button in the
         current channel; allows you to create Default and Escalation
         Policy channel mappings.**
      -  **createincident:** Creates an incident alerting the selected
         Escalation Policies and/or Users with the specified incident
         description, body, and acknowledgement behavior.

MS Teams List of Permissions
----------------------------

**The MS Teams App would like to:**

-  

   -  Allow the Teams app to manage itself for all teams

      -  Manage Teams apps for all teams
      -  Read installed Teams apps for all teams
      -  Create channels
      -  Read and write all group memberships
      -  Read all group memberships
      -  Read and write directory data
      -  Read directory data
      -  Read and write all groups
      -  Read all groups
      -  Read all users' full profiles
      -  Read and write all users' full profiles
      -  Sign in and read user profile

Uninstallation
--------------

The Splunk>VictorOps app can be uninstalled at the team or organization
level.  While a Teams org administrator has adequate permission to
perform both tasks, a Team owner will only be able to manage their own
team's settings, and team members' permissions can vary and may be
inadequate.

Uninstalling at a team level automatically unsubscribes and removes the
VictorOps bot from all channels within that team.  To uninstall at a
team level:

-  

   -  Click on the **Teams** entry in the sidebar.

      -  Select the team's **More options…** menu, then click **Manage
         team**.
      -  **On the Apps tab, click the Uninstall icon to the right of the
         Splunk>VictorOps entry.**
      -  Click **Uninstall** to confirm removal.

Uninstalling at the organization level automatically removes the
Splunk>VictorOps bot from all teams within the org.  To uninstall at an
organization level:

-  

   -  Click on the **Apps** entry in the sidebar.

      -  Click on the **Splunk>VictorOps** icon's ellipse menu, then
         click **Delete**.
      -  **Select the I understand the app will be deleted for all users
         checkbox.**
      -  Click **Delete app** to confirm removal.

Known Constraints
-----------------

Currently, a limitation in Teams prevents automatic unsubscription from
individual channels when the app is removed at the organizational level.
We recommend uninstalling at a team level prior to removing at the
organizational level until this is resolved.
