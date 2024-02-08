.. _slack-spoc:

Slack integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the Slack integration for Splunk On-Call.

The Splunk On-Call and Slack integration centralize communication for engineers, developers, and IT managers. The
Slack integration bridges the communication gap between on-call incident response and remediation to improve collaboration and reduce MTTR.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Essential
- Enterprise

You must be a Slack administrator to configure this integration. If you prefer not to have a Slack admin in the required Slack Channels, create a Slack Admin Service User. See :ref:`slack-spoc-svc` for more details.

.. caution:: Deactivate the old Slack (webhook) integration** prior to activating the Slack integration.


Slack configuration
==========================

The following sections explain how to set up this integration.

.. _slack-spoc-svc:

Ownership of the integration
------------------------------

You must have Slack Admin or higher permissions to configure this integration.

Create a Slack Admin Service User to configure this integration and ensure the functionality of the integration is not dependent on any specific user.

If you are not an Owner or Admin of your Slack Workspace, request to have a Slack Admin Service User created or seek increased permissions from your Slack Admin.

.. caution:: If the Slack Admin who configured the integration leaves the Slack Workspace, reach out to Splunk On-Call Support immediately to avoid service disruption of your Slack Integration.


Configure the Integration
--------------------------------

From the Splunk On-Call web portal, go to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Slack` and select :guilabel:`Enable Integration`.

In the resulting Slack screen, enter the workspace you want to integrate, then log in. Then, authorize the application.

.. note:: In Splunk On-Call, you must select a default Slack channel. The default channel doesn't register any activity if all options are not checked.


Add channel mappings
------------------------------

On the Slack integrations page in Splunk On-Call, select :guilabel:`Add Mapping`.

You must first select a default channel for the integration. This is required. You might prevent incident activity and notifications to this channel by leaving all boxes unchecked.

Select the Splunk On-Call Escalation Policy and Slack channel you'd like to map, then select the message types you'd like Splunk On-Call to send to this Slack channel in the :guilabel:`Channel Settings` section. Unchecking the boxes is a good way to limit noise and control information flow into specific channels.


Private channels
------------------------------

When mapping to private Slack channels you must give the Splunk On-Call app permission to post to your private Slack channel. First, map your Escalation Policy to your desired private Slack channel. Private channels are listed below the public channels.

Next, in your private Slack channel, mention Splunk On-Call or select :guilabel:`Add an app`. Finally, give the app permission by selecting :guilabel:`Invite Them`.

.. note:: The scope of private channels is limited to the channels that the person who integrates Splunk On-Call to Slack has access to. If you want all private channels to be mapped to Splunk On-Call, create a service account that has access to all private channels for this use.


Usage in Slack
--------------------------------

Triggered Splunk On-Call incidents route to specified Slack Channels based on Escalation Policy as per your specifications in the previous steps. From Slack you can acknowledge, reroute, resolve, and even snooze incidents using the buttons in the incident card in Slack.

There are 3 Slack slash commands that work with Splunk On-Call:

* ``/victor-linkuser``

* ``/victor-unlinkuser``

* ``/victor-createincident``

When using the ``createincident`` command, make sure to use the full syntax, including brackets as displayed in the command preview. For example, to create an incident:

.. code-block:: text

   /victor-createincident [this is an example message] for [victorops-username]

To keep communication about an incident in one place, use a hashtag and the incident number to reference a specific incident within Slack, for example ``#incident123``. The message that contains the hashtag appears in the relevant
incident's timeline within Splunk On-Call.


Adding Annotations using Webhooks
---------------------------------------------

You can have annotations sent to a Slack channel using Custom Outgoing Webhooks.

In the following payload, the ``title`` field carries the clickable link and the ``image_url`` is the rendered image as defined in the Rules Engine:

.. code-block:: json

   { “channel”: “#general”, “username”: “Splunk On-Call”, “icon_url”:
   “https://victorops.com/assets/img/branding/logo-yellow-mark.png”,
   “attachments”: [ { “fallback”:“What this image is in case it does not
   render”, “title”: “https://en.wikipedia.org/wiki/Australian_Cattle_Dog”,
   “image_url”:
   “http://i.dailymail.co.uk/i/newpix/2018/04/21/05/4B606CDA00000578-0-image-a-32_1524284530816.jpg”,
   “color”: “danger” } ] }

For further reference on attaching content and links to Slack using a webhook, see the Slack official documentation.

Multichannel configuration using custom webhooks
==================================================

The following instructions require Splunk On-Call Enterprise and administrative privilges in Slack. To configure multichannel with Splunk On-Call you need custom outgoing webhooks. See :ref:`custom-outbound-webhooks` for more information.

.. note::  Bidirectional communication is not supported outside of the main Splunk On-Call Slack App channel. Multi-channel configuration is Splunk On-Call to Slack only.

Custom Outgoing Webhooks configuration overview
----------------------------------------------------

This configuration allows you to segregate Splunk On-Call incidents into their own separate Slack channels based on the ``routing_key`` value in Splunk On-Call Incident-specific chats in Splunk On-Call. The configuration adds the name of the user that acknowledged and resolved the incidents, and provides links in Slack that take the user directly to
the incidents in Splunk On-Call.

The following sections show how to configure the Slack App for Incoming Webhooks, create Splunk On-Call Outgoing Webhooks, and create new Rules Engine rules to help steer Splunk On-Call incidents and chats into specified Slack
channels.

Custom Configuration in Slack
-------------------------------------------------

Within Slack, in Slack's App Directory, add a new incoming webhook configuration.

When creating the new incoming webhook, select your main Splunk On-Call Slack channel as the target for the :guilabel:`Post to Channel` section under :guilabel:`Integration Settings`. This is the Channel that's declared in the Splunk On-Call Slack App integration page. 


As a final step before saving, copy the Webhook URL and save it for use when you set up the Splunk
On-Call custom Outgoing Webhooks.


Custom configuration in Splunk On-Call
-------------------------------------------------

Within Splunk On-Call you'll want to leverage our custom Outgoing
Webhooks and Rules Engine to steer Splunk On-Call incident, shift
change, and chat activity to designated channels in Slack.

Rules engine
^^^^^^^^^^^^^^^^^^^^^

#. In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Rules Engine`

#. Select :guilabel:`Add a Rule`. Don't check :guilabel:`Stop after this rule has been applied`.

The first rule adds the slugified version of your organization name, also known as the "org slug", to all incidents. Your org slug is located at the end of the URL. For example, if the URL is ``https://portal.victorops.com/client/my-company``, then the org slug is ``my-company``.

For the matching condition of this rule, specify:

.. code.block:: text

   When entity_id matches *

The asterisk indicates a wild card, and as such catches all incidents regardless of ``entity_id`` value.

For the Transform, specify to set the literal value of ``org_slug`` to the new value of your specific org slug:

.. code-block:: text

   Set org_slug to new value <your_org_slug>

As a last step, create rules to associate your Slack channels to their appropriate ``routing_keys`` in Splunk On-Call. In this example, the ``routing key`` is ``ops`` and the name of the Slack channel is ``support``:

.. code-block:: text

   When routing_key matches <Your_routing_key>

For the transform, use ``alert field = slack_channel AND new value = (Slack channel name here)``, like in the following example. Don't include a sign before the channel name.

.. image:: /_images/spoc/Transmog2@2x.png
   :alt: Transform rule

If you have many Slack channels and many routing keys, you need 1 rule per Splunk On-Call routing_key. Configure one Rules Engine rule per routing key to send routed alerts to specific slack channels.

Outgoing webhooks
^^^^^^^^^^^^^^^^^^^^

#. Navigate to :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks`.

#. Create 4 different outgoing webhooks based on :guilabel:`Event Type`. All of these webhooks use the same URL you copied from Slack in the :guilabel:`To Field:`.

You can copy and paste the following templated payload. To add more variables to your payload, see the :guilabel:`Available Variables` column next to the payload. As long as you have the required Rules Engine rules, no editing of the payload is required.

.. image:: /_images/spoc/Slack-2-MC-5@2x.png
   :alt: Configuring outgoing webhooks with Splunk On-Call

Configure the following webhooks by selecting :guilabel:`Add Webhook` each time, then scroll down to the new window.

**1) Incident Chats to Slack:**

-  Event: Incident-Chats
-  Method: POST
-  Content Type: application/json
-  To: Your Slack URL from step 8 of the basic setup
-  Payload:

   .. code-block:: json

      { “channel”:
      “#\ :math:`{{ALERT.slack\_channel}}",  "username": "Splunk On-Call Chat (`\ {{CHAT.USER_ID}})”,
      “icon_url”:
      “https://victorops.com/assets/img/branding/logo-yellow-mark.png”,
      “attachments”: [{ “text”:
      “:math:`{{CHAT.TEXT}} \\n <https://portal.victorops.com/client/`\ {{ALERT.org_slug}}#/incident/:math:`{{STATE.INCIDENT\_NAME}}|\*#`\ {{STATE.INCIDENT_NAME}}\*:
      ${{ALERT.monitoring_tool}}: ${{ALERT.entity_display_name}}>”, “color”:
      “#4dc3ff”, “mrkdwn_in”: [“text”] }] }

-  Description: Send incident chats to their appropriate Slack channel

**2) Critical Incidents to Slack:**

-  Event: Incident-Triggered
-  Method: POST
-  Content Type: application/json
-  To: Your Slack URL from step 3 of the basic setup
-  Payload:

   .. code-block:: json

      {
      “channel”:“#\ :math:`{{ALERT.slack\_channel}}",  "username":"Splunk On-Call",  "icon\_url":"https://victorops.com/assets/img/branding/logo-yellow-mark.png",  "attachments": \[  {  "title":"CRITICAL INCIDENT TRIGGERED",  "text": "<https://portal.victorops.com/client/`\ {{ALERT.org_slug}}#/incident/:math:`{{STATE.INCIDENT\_NAME}}|\*#`\ {{STATE.INCIDENT_NAME}}\*:
      ${{ALERT.monitoring_tool}}: ${{ALERT.entity_display_name}}>”,
      “color”:“danger”, “mrkdwn_in”: [“text”] } ] }

-  Description: Send triggered incidents to their appropriate Slack
   channel

**3) Acknowledgements to Slack:**

-  Event: Incident-Acknowledged
-  Method: POST
-  Content Type: application/json
-  To: Your Slack URL from step 3 of the basic setup
-  Payload:

   .. code-block:: json

      { “channel”:“#${{ALERT.slack_channel}}”, “username”:“Splunk On-Call”,
      “icon_url”:“https://victorops.com/assets/img/branding/logo-yellow-mark.png”,
      “attachments”: [ { “title”:“ACKNOWLEDGED by
      :math:`{{STATE.ACK\_USER}}",  "text": "<https://portal.victorops.com/client/`\ {{ALERT.org_slug}}#/incident/:math:`{{STATE.INCIDENT\_NAME}}|\*#`\ {{STATE.INCIDENT_NAME}}\*:
      ${{ALERT.monitoring_tool}}: ${{ALERT.entity_display_name}}>”,
      “color”:“warning”, “mrkdwn_in”: [“text”] } ] }

-  Description: Send incident acknowledgements to their appropriate
   Slack channel

**4) Recoveries to Slack:**

-  Event: Incident-Resolved
-  Method: POST
-  Content Type: application/json
-  To: Your Slack URL from step 3 of the basic setup
-  Payload:

   .. code-block:: json

      { “channel”:“#${{ALERT.slack_channel}}”, “username”:“Splunk On-Call”,
      “icon_url”:“https://victorops.com/assets/img/branding/logo-yellow-mark.png”,
      “attachments”: [ { “title”:“RESOLVED by
      :math:`{{STATE.ACK\_USER}}",  "text": "<https://portal.victorops.com/client/`\ {{ALERT.org_slug}}#/incident/:math:`{{STATE.INCIDENT\_NAME}}|\*#`\ {{STATE.INCIDENT_NAME}}\*:
      ${{ALERT.monitoring_tool}}: ${{ALERT.entity_display_name}}>”,
      “color”:“good”, “mrkdwn_in”: [“text”] } ] }

-  Description: Send incident recovery events to their appropriate Slack
   channel

End result in Slack
-----------------------------

In Slack, each channel see incident activity based on routing key for the configured webhooks. As you can see in the
following image there's a incoming triggered event, Acknowledged event, Resolved event, and a Chat.

.. image:: /_images/spoc/Slack-2-MC-6@2x.png
   :alt: Incoming Triggered event, Acknowledged event, Resolved event, and a Chat


Legacy Slack integration guides
======================================

Transfer of Ownership in Slack
-----------------------------------------

Make sure to recognize the administrative rights of your Slack environment. If you are not the Primary Owner of your  Slack workspace you need to seek out permission to transfer ownership in order to integrate with Splunk On-Call.

In Splunk On-Call
--------------------------------------------

From the Splunk On-Call web portal select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/integrations.png
   :alt: Integrations menu

Next, select the Slack integration tile.

.. image:: /_images/spoc/New-Slack-Enable-1.0.png
   :alt: Splunk On-Call - Finding Slack on Integrations Module

Then select :guilabel:`Enable Integration.`. This brings up a Slack authentication screen to first pick the team you want to integrate with and then to log in.

.. image:: /_images/spoc/Slack-Sign-in-to-your-Workspace.png
   :alt: Slack authentication screen on victorops

Then, enter your email and password.

.. image:: /_images/spoc/Slack.png
   :alt: Email and password prompt for integration screen

Next, authorize the application.

.. image:: /_images/spoc/Authorize_access_to_your_account___Splunk On-CallQA_Slack.png
   :alt: Integration authorization - Slack and Splunk On-Call

Once authorized, select a Slack channel.

.. image:: /_images/spoc/Slack-select-your-Slack-channel.png
   :alt: Choosing a Slack channel

Finally, you are redirected back to Splunk On-Call and a message shows that the Authentication is successful.

.. image:: /_images/spoc/Slack-VO-Sucess.png
   :alt: Authentication success

Splunk On-Call web interface Settings
---------------------------------------

From the web UI, you can configure aspects of the integration. For example, you can select a Slack channel you'd like to integrate with and control the message notifications from Splunk On-Call to Slack.

.. image:: /_images/spoc/VO-integration-configuration.png
   :alt: Select a channel

After you finish configuring your settings, save them.

.. image:: _images/spoc/VO-Slack-Save.png
   :alt: Saving your settings - Splunk On-Call Slack integration

Invite the Splunk On-Call Bot to the channel
-----------------------------------------------

In Slack, mention the ``@VictorOps`` bot user to add it to your channel if it doesn't automatically appear.

.. image:: /_images/spoc/Slack-Splunk On-Call.png
   :alt: In Slack - invite the bot

Linking your Slack user to your Splunk On-Call User
------------------------------------------------------

From Slack, you can use the Slash command ``/linkuser`` to generate a link that initiates the linking process.

.. image:: /_images/spoc/In-Slack-linkuser-.png
   :alt: Using linkuser command to link Slack with Splunk On-Call

After running the ``/linkuser`` command, log into your Splunk On-Call account to be notified that your user is linked.

.. image:: /_images/spoc/Slack-linkuser-Salck-and-VO-connected-.png
   :alt: Notification of link

Once you're connected you can acknowledge incidents in Slack. If you do not link your user, incident actions in Slack aren't passed to Splunk On-Call.

.. note:: If you need to unlink your Splunk On-Call user from your Slack user, contact Splunk On-Call Support.

Acknowledge and resolve in Slack
----------------------------------------------

Now that your user is linked you can interact with Splunk On-Call incidents from the Slack channel.

.. image:: /_images/spoc/Slack-Splunk On-CallQA-2.png
   :alt: Slack test incident

.. image:: /_images/spoc/Slack-Splunk On-CallQA-3.png
   :alt: Splunk On-Call Slack alert incident example

In the Splunk On-Call Timeline, you're notified of Acknowledge and Resolve actions that occurred in Slack.

.. image:: /_images/spoc/Slack-New-Timeline.png
   :alt: Splunk On-Call timeline slack notification


Legacy Slack Webhook guide
===============================

The following guide requires Slack 2.x and Splunk On-Call Getting Started/Essentials or Enterprise for Multi-Channel configuration. You must be an admin user in Splunk On-Call.

The basic configuration links your Splunk On-Call timeline, bidirectionally, to a single Slack channel. The advanced configuration provides links and routing to multiple Slack channels with some limitations and requires the basic setup first.

#. From the Splunk On-Call Timeline select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

   .. image:: /_images/spoc/integrations.png
      :alt: Integrations screen

#. Scroll down and select the :guilabel:`Slack (webhook)` integration button. If the integration has not been activated, select :guilabel:`Enable Integration`.

#. Copy the :guilabel:`Outgoing Webhook URL` that is generated and keep this page open.

#. From your Slack account (as an Admin) navigate to the channel you wish to link and select the settings icon. Select :guilabel:`Add an app or integration`.

#. In the search function, type ``webhooks`` and select :guilabel:`Incoming WebHooks`.

#. Select :guilabel:`Add Configuration`.

#. Select the channel you want to link to your Splunk On-Call timeline.

#. Copy the webhooks URL to your clipboard.

#. Scroll to the bottom and select :guilabel:`Save Settings`.

#. Paste the URL into the :guilabel:`Incoming Webhook URL` section.

#. Return to the Slack integrations search function, and type ``webhooks``. Select :guilabel:`Outgoing WebHooks`.

#. Select :guilabel:`Add Configuration`.

   .. image:: /_images/spoc/SlackAddOutgoingConfig@2x-1.png
      :alt: Add Configuration.

#.  Select :guilabel:`Add Outgoing WebHooks Integration`.

#. Scroll down to th :guilabel:`Integration Settings` section. Select the channel you are linking with Splunk On-Call and then paste the URL you copied from the :guilabel:`Outgoing Webhooks URL` section in Splunk On-Call in step 3 into the :guilabel:`URL(s)` section in Slack.

#. Scroll to the bottom and select :guilabel:`Save Changes`.

#. Return to the Slack integration settings in Splunk On-Call and read through the :guilabel:`Slack Options` section to fine tune the integration.

#. Navigate to your main timeline in Splunk On-Call, and enter any text into one of the two chat bars and press the Enter or Return key. The chat appears in your Slack channel. Reply to the chat from within Slack and to see the
response in the Splunk On-Call timeline.

.. image:: /_images/spoc/Slack-legacy-App-Timeline.png
   :alt: Enter any text into one of the two chat bars and press Enter or Return