Splunk>VictorOps for MS Teams Integration
=========================================

 

[ht_message title=“Warning! This integration is not available yet!”
id=“” class=“” style=“background-color: #ff9966;” ]

Do NOT attempt to install this integration until the approval process
has completed. Contact support for more details about when this
integration will be available (victorops-support@splunk.com).
[/ht_message] The Splunk>VictorOps for MS Teams Integration allows teams
to work from MS Teams while leveraging the notification and coordination
capabilities of Splunk>VictorOps. 

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

-  Splunk On-Call Account
-  MS Teams Organization Admin Permission

[/ht_toggle]

How the App Works
-----------------

-  VictorOps will route all incidents - single- or multiple-responder -
   to any subscribed Teams channel.
-  A new card is created for incident management and is updated as
   incident events occur.
-  Microsoft Teams users may perform incident management actions -
   snoozing, rerouting, acknowledging, adding responders, and resolving
   -  from either Splunk>VictorOps or Microsoft Teams.

Installation
------------

-  Download the Splunk>VictorOps app from the Microsoft Store, then
   click the app's icon to begin the installation process.
-  Click **Add to a team**, then select a channel for the
   Splunk>VictorOps bot and any incoming VictorOps incidents.  Note that
   installing into any channel in a team will make Splunk>VictorOps
   available for *all* channels in that team.
-  Click **Set up a bot** to add the app to your team and begin the
   configuration process.
-  You may rerun the installation process and select channels from
   additional teams to expand access to the Splunk>VictorOps app.

 

Configuration
-------------

Once installed and added to a team, the app must be configured for
first-time use.  To complete this process, you must be signed in as a
Teams org administrator, and must also have a VictorOps account using
the same email address. 

-  Once Splunk>VictorOps has been added to a team, a **Welcome to
   VictorOps** card is displayed in that team's General channel.  You
   may also execute the bot command *@Splunk VictorOps configure* to
   generate a new card in your current channel.  Click the **Configure**
   button in this card to begin the process.
-  Click **Add Configuration**, then enter your On-Call org's API ID and
   API Key.  
-  Once the API details are added, click on the *Allow application to
   access MS Teams account details* checkbox.
-  Provide administrative credentials when prompted by Microsoft, click
   **Accept** to provide consent, then click **Save** to complete
   configuration. 

NOTE:  Due to a limitation in Microsoft Graph API, it may take as long
as 10 seconds for consent to be recognized.  If saving returns an
“unable to connect” error, please try again after 10 seconds has
elapsed.  If the problem continues, please contact our Support team.

 

Mapping Channels
----------------

As a final step, you will need to define mapping to channels within your
Microsoft Teams instance.  This can be done broadly by mapping entire
On-Call teams to a default channel, or more granularly by mapping
specific Escalation Policies.

To begin, execute the @Splunk VictorOps mapchannel command in any
channel in which the app is installed, and click the Map Channel button
in the resulting card.

**Default Mapping**
~~~~~~~~~~~~~~~~~~~

-  Click Add Mapping to display the Add Default Channel Mapping modal.
-  Select a configured connection from the VictorOps Organization
   dropdown list, then select your desired VictorOps Team.
-  Select your desired Microsoft Teams Team, and then the Microsoft
   Teams Channel within it.
-  Click Save.  If the selected Team does not yet have the application
   installed, you will receive a warning, along with a single-click
   option to install the app at that time.  Once this is complete, click
   Save once again.
-  Your mapping will now display in the Default Mapping table, where it
   can be edited or deleted.

.. image:: /_images/spoc/MS1.png

**Escalation Policy Mapping**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Click on the Escalation Policy Mapping tab, then click Add Mapping to
   display the Add Escalation Policy to Channel Mapping modal.
-  Select a configured connection from the VictorOps Organization
   dropdown list, then select your desired VictorOps Escalation Policy.
   Note that these are listed alphabetically within their VictorOps
   teams.
-  Select your desired Microsoft Teams Team, then choose your Channel
   Settings. You may map new incidents to an existing channel within
   your selected Team, or you may choose to create a new channel within
   that Team for each new incident.
-  If you choose to create new channels, you have the further option of
   controlling which Teams users are added to that channel's Microsoft
   Teams Team. Note that this functionality only works for Teams
   members with corresponding accounts in the configured VictorOps
   organization, matched on email address. You may leave all
   members as-is, you may add only members who are being paged for the
   incident, or you may add all members of the VictorOps team associated
   with the incident's Escalation Policy.
-  Click Save. If the selected Team does not yet have the application
   installed, you will receive a warning, along with a single-click
   option to install the app at that time. Once this is complete, click
   Save once again.
-  Your mapping will now display in the Escalation Policy Mapping table,
   where it can be edited or deleted.

.. image:: /_images/spoc/MS2.png

.. image:: /_images/spoc/MS3.png

Splunk>VictorOps Bot Commands
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

NOTE:  Currently, a limitation in Teams prevents automatic
unsubscription from individual channels when the app is removed at the
organization level.  We recommend uninstalling at a team level prior to
removing at the organizational level until this is resolved.
