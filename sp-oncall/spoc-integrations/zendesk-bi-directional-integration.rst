.. _Zendesk-spoc:

Zendesk integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Zendesk integration for Splunk On-Call.

<Add description of the integration here>

Requirements
==================

* This integration is compatible with the Enterprise version of Splunk On-Call:
* This Zendesk integration makes use of outbound webhooks.


This guide walks you through the setup process for integrating Zendesk with Splunk On-call. Once complete, Zendesk can automatically trigger, acknowledge, and resolve incidents in Splunk On-call. Additionally,acknowledgement of the incident on the Splunk On-call side can trigger a status change in Zendesk.

In Splunk On-call
==================

From the main timeline select :guilabel:`Integrations` then search for Zendesk on the :guilabel:`3rd-Party Integrations` tab.

.. image:: /_images/Integrations-page.png
   :alt: Integrations page

If you haven't enabled the integration, select :guilabel:`Enable Integration` to generate your configuration values as seen in the following image:

.. image:: /_images/Zendesk-API-Key.png
   :alt: API key for Zendesk integration

Copy this endpoint URL to your clipboard. You need it when configuring Zendesk.

Routing key
-----------------

Include the routing key for this integration in the destination URL. It is essential that you replace what you see here with the actual routing key you intend to use. Replave everything after the final forward slash with the key you configured in Splunk On-call. For example, assuming a routing_key value of "database":

``.....36437/**$routing_key**`` becomes ``.....36437/database``

You can set up routing keys in Splunk On-call under :guilabel:`Settings` then :guilabel:`Routing Keys`. For more information on routing keys and best practices, see :ref:`routing-keys`

Create a target in Zendesk
================================

From your Zendesk portal, select :guilabel:`Settings` on the side-menu.

.. image:: /_images/Zendesk-Settings.png
   :alt: Zendesk settings

Under the :guilabel:`Settings` section, select :guilabel:`Extensions.`

.. image:: /_images/Extensions.png
   :alt: Zendesk extensions

In the resulting menu, select :guilabel:`add a target`.

.. image:: /_images/Add-a-Target.png
   :alt: Add target in Zendesk extensions

Select the :guilabel:`HTTP Target`` option.

.. image:: /_images/HTTP.png
   :alt: HTTP target option in Zendesk extensions

Give the HTTP target with a name. Paste the endpoint URL you copied from Splunk On-call with the valid routing key. Select a :guilabel:`Method`
of :guilabel:`POST` and :guilabel:`Content type` of :guilabel:`JSON`. Leave the :guilabel:`Basic Authentication` box unselected and the :guilabel:`Test target` option selected and select :guilabel:`Submit`.

.. image:: /_images/HTTP-Target.png
   :alt: HTTP target configuration in Zendesk extensions

Copy and paste in the following JSON body and select :guilabel:`Submit`.

.. code-block:: json

   { 
      "message_type":"info", 
      "entity_id":"Test alert from Zendesk",
      "state_message":"testing from Zendesk"
   }

If you configured the integration correctly, you see a 200 success response similar to this.

.. image:: /_images/zendesk_200_response@2x.png
   :alt: 200 success response in HTTP target configuration in Zendesk

Check your Splunk On-call timeline for a new event. This is an INFO message which doesn't create a new incident in Splunk On-call, but is intended only
to confirm that Zendesk can successfully send events to Splunk On-call.

.. image:: /_images/INFO-alert.png
   :alt: Splunk On-call test event

Finally, exit the success message. Change the option to :guilabel:`Create target` and select :guilabel:`Submit`.

.. image:: /_images/Create-Target.png
   :alt: Create target option in the HTTP target in Zendesk extensions

Configure alerts to Splunk On-call
-----------------------------------

In the side-menu, locate the section for :guilabel:`Business Rules` and select :guilabel:`Triggers`.

.. image:: /_images/Triggers.png
   :alt: Zendesk triggers

From the :guilabel:`Triggers` menu, select :guilabel:`Add trigger`.

.. image:: /_images/Add-Trigger.png
   :alt: Add a trigger in Zendesk

Enter a name and description. Select :guilabel:`Add condition` and add the following 2 conditions:

* Status is New
* Ticket is Created

These 2 conditions create a Splunk On-call incident for every new case in Zendesk. You can alter these to further filter which conditions alert
Splunk On-call to fit your specific workflow.

.. image:: /_images/Critical-Trigger.png
   :alt: Trigger conditions

Under the :guilabel:`Actions` section, select :guilabel:`Add Action`. In the first dropdown menu, scroll to the :guilabel:`Notifications` sections and select :guilabe:`Notify target`. In the second dropdown menu, select the Splunk On-call target you created earlier.

.. image:: /_images/Critical-Trigger-Payload.png
   :alt: Configure trigger actions

Copy the following JSON payload and paste it into the :guilabel:`JSON body` field, then select :guilabel:`Create`.

Critical alert
~~~~~~~~~~~~~~~~~~

This trigger opens a new incident in Splunk On-call. 

.. code-block:: json
   { 
      "entity_id":"{{ticket.id}}", 
      "message_type":"CRITICAL",
      "state_message":"{{ticket.comments_formatted}}",
      "monitoring_tool":"Zendesk", 
      "alert_url":"{{ticket.link}}",
      "ticket_id":"{{ticket.id}}", 
      "Ticket External I.D.":"{{ticket.external_id}}", 
      "Ticket Origin":"{{ticket.via}}",
      "Ticket Status":"{{ticket.status}}", 
      "Ticket Priority":"{{ticket.priority}}" 
   }

You need to replicate this process to create 2 more triggers that send alerts to Splunk On-call for acknowledgement and recovery events when cases
are assigned or closed in Zendesk. Reuse the same target created earlier for each new trigger. You can change the trigger conditions to fit your specific needs.

Acknowledgement alert
~~~~~~~~~~~~~~~~~~~~~~~~~

This trigger sends acknowledgement alerts to Splunk On-call, to acknowledge the incident and stop paging and escalation.

Condition
* Status is Pending

.. image:: /_images/Acknowldge-Trigger.png
   :alt: Acknowledge trigger

JSON payload:

.. code-block:: json
   { 
      "entity_id":"{{ticket.id}}", 
      "message_type":"ACKNOWLEDGEMENT",
      "state_message":"{{ticket.comments_formatted}}",
      "monitoring_tool":"Zendesk", 
      "alert_url":"{{ticket.link}}",
      "ticket_id":"{{ticket.id}}", 
      "Ticket External I.D.":"{{ticket.external_id}}", 
      "Ticket Origin":"{{ticket.via}}",
      "Ticket Status":"{{ticket.status}}", 
      "Ticket Priority":"{{ticket.priority}}" 
   }

Resolved alert
~~~~~~~~~~~~~~~~~~

This trigger sends recovery notifications to Splunk On-call to close out the incident.

Condition: 
* Status is Closed

.. image:: /_images/Resolved-Trigger.png
   :alt: Resolved trigger

JSON payload:

.. code-block:: json
   { 
      "entity_id":"{{ticket.id}}", 
      "message_type":"RECOVERY",
      "state_message":"{{ticket.comments_formatted}}",
      "monitoring_tool":"Zendesk", 
      "alert_url":"{{ticket.link}}",
      "ticket_id":"{{ticket.id}}", 
      "Ticket External I.D.":"{{ticket.external_id}}", 
      "Ticket Origin":"{{ticket.via}}",
      "Ticket Status":"{{ticket.status}}", 
      "Ticket Priority":"{{ticket.priority}}"
   }

(Optional) Acknowledge back 
==============================

Using Splunk On-call Custom Outgoing Webhooks, you can have the acknowledgement of a Zendesk incident in Splunk On-call automatically transition the related Zendesk case to a status you specify.

First, you need to build the appropriate destination URL for your Zendesk account. Certain parts of the URL must be URL encoded to function properly, so make sure you follow the structure exactly.

The following example built assumes the following:

-  The Zendesk subdomain is buttercupgames.zendesk.com
-  The email address of a Zendesk user is alex@buttercupgames.com
-  The API token generated by Zendesk is abc123efg456hij789. See :ref:`_Zendesk-api-token` for steps to create an API token.

The Destination URL
~~~~~~~~~~~~~~~~~~~

The structure of the URL is as follows:

``https://{email-address}/token:{yourAPI-token}@{your-subdomain}.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json``

Given the example data, the final URL is as follows:

``https:/alex%40company.com%2Ftoken:abc123efg456hij789@company.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json``

Here is a summary of the crucial encoding elements:

*  The @ symbol in the email address is encoded as ``%40``.
*  The forward slash before the word token is encoded as ``%2F``.
*  The @ symbol before the subdomain isn't encoded.
*  ``${{ALERT.ticket_id}}`` isn't altered in any way. This syntax is required to dynamically insert the Zendesk ticket ID into the URL when the webhook is triggered.

.. _Zendesk-api-token:

Generate a Zendesk API token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the side-menu, locate the :guilabel:`Channels` section and select :guilabel:`API`.

.. image:: /_images/API.png
   :alt: API channel in Zendesk

Under :guilabel:`Zendesk API`, select the :guilabel:`Settings` tab. Turn on :guilabel:`Token Access` and then select the :guilabel:`+` to generate a new token.

.. image:: /_images/Zendesk-Token-Access.png
   :alt: Token access in Zendesk API

Give the token a name. select :guilabel:`Copy` button to copy the token to your clipboard, and select :guilabel:`Save`.

.. image:: /_images/Zendesk-API-Key-1.png
   :alt: Copy new token in Zendesk API

Set up the Outgoing webhook
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Splunk On-call, select :guilabel:`Integrations` then :guilabel:`Outgoing Webhooks`. Under Outgoing Webhooks, select :guilabel:`Add Webhook`.

.. image:: /_images/Outgoing-webhooks.png
   :alt: Add an outgoing webhook in Splunk On-call

* For :guilabel:`Event`, select :guilabel:`Incident-Acknowledged`.
* For :guilabel:`Method`, select :guilabel:`PUT`.
* For :guilabel:`Content Type`, select :guilabel:`application/json`.
* In the :guilabel:`To` field, paste the complete destination URL described previously.
* In the :guilabel:`Payload` field, paste the following payload. You can change the status value to your preferred status.

.. code-block:: json
   { 
      "ticket":{ 
         "status": "pending" 
      } 
   }

Finally, give the webhook a brief description and select :guilabel:`Save`.

.. image:: /_images/Zendesk-webhook.png
   :alt: Outgoing webhook configuration in Splunk On-call