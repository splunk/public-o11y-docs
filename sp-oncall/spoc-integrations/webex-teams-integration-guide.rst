.. _webex-spoc:

Webex Teams integration for Splunk On-Call
********************************************

.. meta::
    :description: Configure the Webex Teams integration for Splunk On-Call.

The Splunk On-Call and Webex Teams integration allows you to surface incidents from your Splunk On-Call account in Webex Teams, notifying you where you're already working and reducing tool switching during emergencies.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

Webex Teams Account and Moderator permissions are required.

Webex Teams configuration
============================

Follow these steps to set up the Webex Teams integration:

#. Navigate to the :strong:`Incoming Webhooks` app on the Webex App Hub and select :guilabel:`Connect`.

#. Authenticate as required, then select :guilabel:`Accept`.

#. Navigate back to the Incoming Webhooks app tab and refresh.

#. When prompted, provide a webhook name and select a space for the webhook.

   .. image:: /_images/spoc/spoc/webex-webhooks.jpg
      :alt: Incoming webhooks app

#. Select :guilabel:`Add` and copy the Webhook URL to your clipboard.

Splunk On-Call configuration
=================================

Follow these steps to set up the Webex Teams integration:

#. Navigate to :guilabel:`Integrations`, guilabel:`Outgoing Webhooks` and select :guilabel:`Add Webhook`.

#. Enter the following values for the new webhook:

   - :guilabel:`Event`: Incident-Triggered
   - :guilabel:`Method`: POST
   - :guilabel:`Content Type`: application/json
   - :guilabel:`Custom Headers`: none
   - :guilabel:`To`: Your webhook URL copied from Webex
   - :guilabel:`Payload`:

      .. code-block:: json

         { “markdown”:
         “:math:`{{ALERT.entity\_display\_name}}<br>`\ {{ALERT.state_message}}” }

#. Select :guilabel:`Save`.

(Optional) Only send a notification for alerts directed to a specific routing key
------------------------------------------------------------------------------------------

You can reduce the scope of the outgoing webhook so that it only posts a message in Webex Teams when your specified routing key is present in the Splunk On-Call incident.

To do so, navigate back to the outgoing webhook you created under :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks` and edit the webhook:

#. Navigate to the :guilabel:`To` field and highlight the random string following ``https://webexapis.com/v1/webhooks/incoming/``.

#. Copy the random string to your clipboard and replace it with ``${{ALERT.webexteams-field}}``. For example, ``https://webexapis.com/v1/webhooks/incoming/${{ALERT.webexteams-field}}``.

#. Save your changes.

#. Navigate to the alert rules engine under :guilabel:`Settings`, :guilabel:`Alert Rules Engine` and select :guilabel:`Add Rule`.

#. Specify the routing_key you want to have trigger the message in Webex Teams.

#. Skip down to the :guilabel:`Transform these alert fields` section and set ``webexteams-field`` to the portion of the
URL you copied earlier. The following image shows a sample resulting URL:

.. image:: /_images/spoc/spoc/webex-rules.jpg
   :alt: Fields for configuring Webex notifications

#. Save the rule.

When the routing key you've specified is present on an alert, the rule applies and creates a field called ``webexteams-field`` with the URL portion you pasted in as the value.

(Optional) Segment notifications to different Webex Teams
------------------------------------------------------------------------------------------------------

To segment notifications to different Webex Teams spaces based on the routing key of the alert, follow these steps:

#. Navigate to the Incoming Webhooks page on the Webex App Hub.

#. Provide a new webhook name.

#. Specify the space you want the notification to be sent to.

#. Select :guilabel:`Add`.

#. Copy the resulting webhook URL to the clipboard.

#. Continue the previous instruction sections specifying the different routing keys you want to send to your Webex Space. Repeat these steps as necessary for all the routing keys and spaces you want to integrate with.
