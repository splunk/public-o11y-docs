.. _slack-spoc:

Slack integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the Slack integration for Splunk On-Call.

The Splunk On-Call and Slack integration centralizes communication for engineers, developers, and IT managers. The
Slack integration bridges the communication gap between on-call incident response and remediation to improve collaboration and reduce MTTR.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Essential
- Enterprise

You must be a Slack administrator to configure this integration. If you prefer not to have a Slack admin in the required Slack channels, create a Slack Admin Service User. See :ref:`slack-spoc-svc` for more details.

.. caution:: Deactivate the old Slack (webhook) integration prior to activating the Slack integration.


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


Configure the integration
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

.. code-block::

   { “channel”: “#general”, “username”: “Splunk On-Call”, “icon_url”:
   “https://victorops.com/assets/img/branding/logo-yellow-mark.png”,
   “attachments”: [ { “fallback”:“What this image is in case it does not
   render”, “title”: “https://en.wikipedia.org/wiki/Australian_Cattle_Dog”,
   “image_url”:
   “http://i.dailymail.co.uk/i/newpix/2018/04/21/05/4B606CDA00000578-0-image-a-32_1524284530816.jpg”,
   “color”: “danger” } ] }

For further reference on attaching content and links to Slack using a webhook, see the Slack official documentation.

Multichannel configuration using Slack Apps
==========================================================

The multichannel configuration allows you to set up more than one Splunk On-Call organization to send messages into a single Slack workspace, or a single Splunk On-Call organization to send messages into multiple Slack workspaces. You can use this config in tandem with the above Slack App configuration.

.. note:: This integration doesn't support bidirectional communication. Multichannel configuration is for Splunk On-Call to Slack only.

To configure the multichannel set-up with Splunk On-Call, you need:

* Splunk On-Call Enterprise and administrative privileges in Slack  
* Custom outgoing webhooks. See :ref:`custom-outbound-webhooks` for more information  

Configure in Slack
-------------------------------------------------

To configure multichannel in Slack, follow these steps:

#. Navigate to :new-page:`Slack's Incoming Webhooks documentation <https://api.slack.com/messaging/webhooks>` and select :guilabel:`Create your Slack app`.  
#. When prompted on the next screen, select :guilabel:`From scratch`.  
#. Provide a name for the app and select the Slack workspace you'd like to develop the app in, and select :guilabel:`Create App`.
#. On the following screen, under :guilabel:`Add features and functionality`, select :guilabel:`Incoming Webhooks`.  
#. Toggle :guilabel:`Activate Incoming Webhooks` to :guilabel:`On`.  
#. Toward the bottom of the screen, select :guilabel:`Add New Webhook to Workspace` and choose the channel you'd like to post messages to.  
#. Copy the newly-generated Webhook URL and head over to Splunk On-Call.

Configure in Splunk On-Call
-------------------------------------------------

To configure multichannel in Splunk On-Call, follow these steps:

#. In Splunk On-Call, navigate to :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks`.  
#. Select :guilabel:`Add Webhook`.  On the :guilabel:`Event` dropdown menu, select :guilabel:`Incident-Triggered`.  
#. Leave :guilabel:`Method` as :guilabel:`POST` and :guilabel:`Content Type` as :guilabel:`application/json`.  
#. Paste the Webhook URL you've copied in the previous section into the :guilabel:`To:` box.
#. In the Payload section of the webhook, paste in the following alert payload template:

  .. code-block:: text
    
      {
      "text":"${{ALERT.entity_display_name}},${{ALERT.entity_id}},${{ALERT.state_message}}"
      }

You can customize this payload as you see fit to include relevant fields for your use case. The major limitation from the Slack side is that all of these fields must be included within the text field. For detailed information on Splunk On-Call Outbound webhooks, see :ref:`custom-outbound-webhooks`.

Optional configuration to only send a Slack message for incidents directed to a specific routing key
---------------------------------------------------------------------------------------------------------------------------------------------------

With some configuration adjustments, you can reduce the scope of the Outgoing Webhook so that it only successfully posts a message in Slack when your specified routing key is present in the Splunk On-Call incident.

Follow these steps:

1. Navigate back to the Outgoing Webhook you created under :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks` and edit the webhook.  
2. Navigate to the :guilabel:`To` field and highlight the portion following the last ``/`` symbol. It should be a random string looking something like ``X8VM8fMXYoJYgEcupBWFmSD7``.
3. Copy this random string to your clipboard and replace it with ${{ALERT.slackwebhook-field}}.  The full URL should now look something like

  .. code-block:: text
      
    https://hooks.slack.com/services/TCUG253D8/B07G6SF7X8P/${{ALERT.slackwebhook-field}}

4. Save your changes and navigate to the Alert Rules Engine under :guilabel:`Settings`,:guilabel:`Alert Rules Engine`. Select the blue Add Rule button.
5. In the top line, specify the routing_key you’d like to have trigger the message in Slack.  Next, skip down to the :guilabel:`Transform these alert fields` section and set the slackwebhook-field to the portion of the URL you copied earlier.  The resulting rule should look similar to the below.

  .. code-block:: text

      When routing_key matches test
      Set slackwebhook-field to new value X8VM8fMXYoJYgEcupBWFmSD7

6. Select the blue save button to save the rule. This optional configuration is now complete.

When the routing key you’ve specified is present on an alert, this alert rule will apply and create a field called slackwebhook-field with a value of the URL portion you pasted in. This slackwebhook-field value is then dynamically pulled in on the Outgoing Webhook, completing the URL and giving it a valid destination to send to. For all alerts that don’t contain this routing key, the webhook will be attempted and will fail as it will be directed to ``https://hooks.slack.com/services/TCUG253D8/B07G6SF7X8P/${{ALERT.slackwebhook-field}}``.

Optional configuration to segment notifications to different Slack channels based on the routing key of the alert
---------------------------------------------------------------------------------------------------------------------------------------------------

This section largely builds off of the previous one, and takes it a step further and walks through the creation of multiple Slack Apps, each with their own webhooks that direct to different spaces.

Follow these steps:

#. Navigate back to the "Configuration in Slack" section of this article and run through the steps again. This will create a new Slack App with a new Incoming Webhook directed to a different Slack channel.
#. After the new Slack app and Incoming Webhook have been created, navigate back to the Alert Rules Engine in Splunk On-Call.  
#. Create one more alert rule that is very similar to the rule previously created in the "Optional configuration to only send a Slack message for incidents directed to a specific routing key" section. The only differences will be the ``routing_key`` value the rule is matching on and the URL portion, which will correspond to the newly-generated Incoming Webhook URL.

Repeat the creation of Slack Apps, Incoming Webhooks, and Alert Rules for all of the routing keys and Slack channels you'd like to integrate with. This will allow notifications to hit different Slack channels based on the ``routing_key`` values of the alerts.

Legacy Slack integration guides
======================================

Transfer of ownership in Slack
-----------------------------------------

Make sure to recognize the administrative rights of your Slack environment. If you are not the Primary Owner of your Slack workspace you need to seek out permission to transfer ownership in order to integrate with Splunk On-Call.

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

Once authorized, select a Slack channel.

.. image:: /_images/spoc/Slack-select-your-Slack-channel.png
   :alt: Choosing a Slack channel

Finally, you are redirected back to Splunk On-Call and a message shows that the Authentication is successful.

.. image:: /_images/spoc/Slack-VO-Sucess.png
   :alt: Authentication success

Splunk On-Call web interface settings
---------------------------------------

From the web UI, you can configure aspects of the integration. For example, you can select a Slack channel you'd like to integrate with and control the message notifications from Splunk On-Call to Slack.

.. image:: /_images/spoc/VO-integration-configuration.png
   :alt: Select a channel

After you finish configuring your settings, save them.

.. image:: /_images/spoc/VO-Slack-Save.png
   :alt: Saving your settings - Splunk On-Call Slack integration

Invite the Splunk On-Call Bot to the channel
-----------------------------------------------

In Slack, mention the ``@VictorOps`` bot user to add it to your channel if it doesn't automatically appear.

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

In the Splunk On-Call Timeline, you're notified of Acknowledge and Resolve actions that occurred in Slack.

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
