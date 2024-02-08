.. _Zendesk-spoc:

Zendesk integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Zendesk integration for Splunk On-Call.

Use the Zendesk integration for Splunk On-Call to automatically trigger, acknowledge, and resolve incidents in Splunk On-Call. You can also, use the integration to have the acknowledgement of an incident on the Splunk On-Call side trigger a status change in Zendesk.

Requirements
==================

* The Zendesk integration is compatible with the Enterprise version of Splunk On-Call.
* This optional acknowledge back steps make use of outbound webhooks.

Enable the Zendesk integration in Splunk On-Call
========================================================

1. From the main timeline select :guilabel:`Integrations` then search for Zendesk on the :guilabel:`3rd Party Integrations` tab.

.. image:: /_images/spoc/Integrations-page.png
   :alt: Integrations page
   :width: 95%

2. If you haven't enabled the integration, select :guilabel:`Enable Integration` to generate your configuration values as seen in the following image:

.. image:: /_images/spoc/Zendesk-API-Key.png
   :alt: API key for Zendesk integration
   :width: 95%

3. Copy this service API endpoint URL to your clipboard. You need it when configuring Zendesk.

Customize the endpoint URL to use your routing key
=====================================================

Customize the service API endpoint URL to use the routing key for the Zendesk integration. To do so, replace  ``$routing_key`` with your routing key. For example, assuming a routing_key value of "database": ``.....36437/$routing_key` becomes ``.....36437/database``

You can set up routing keys in Splunk On-Call under :guilabel:`Settings` then :guilabel:`Routing Keys`. For more information on routing keys and best practices, see :ref:`routing-keys`

Create a target in Zendesk
================================

1. From your Zendesk portal, select :guilabel:`Settings` on the side-menu.

.. image:: /_images/spoc/Zendesk-Settings.png
   :alt: Zendesk settings
   :width: 95%

2. Under the :guilabel:`Settings` section, select :guilabel:`Extensions.`

.. image:: /_images/spoc/Extensions.png
   :alt: Zendesk extensions
   :width: 95%

3. In the resulting menu, select :guilabel:`add a target`.

.. image:: /_images/spoc/Add-a-Target.png
   :alt: Add target in Zendesk extensions
   :width: 95%

4. Select the :guilabel:`HTTP Target` option.

.. image:: /_images/spoc/HTTP.png
   :alt: HTTP target option in Zendesk extensions
   :width: 95%

5. Give the HTTP target with a name. 
6. Paste the endpoint URL you copied from Splunk On-Call with the valid routing key. 
7. In :guilabel:`Method` select :guilabel:`POST`.
8. In :guilabel:`Content type` select :guilabel:`JSON`. 
9. Leave :guilabel:`Basic Authentication` unselected.
10. Select the :guilabel:`Test target` option.
11. Select :guilabel:`Submit`.

.. image:: /_images/spoc/HTTP-Target.png
   :alt: HTTP target configuration in Zendesk extensions
   :width: 95%

12. Copy and paste in the following JSON body.
13. Select :guilabel:`Submit`.

.. code-block:: json

   { 
      "message_type":"info", 
      "entity_id":"Test alert from Zendesk",
      "state_message":"testing from Zendesk"
   }

14. If you configured the integration correctly, you see a 200 success response similar to this.

.. image:: /_images/spoc/zendesk_200_response@2x.png
   :alt: 200 success response in HTTP target configuration in Zendesk
   :width: 75%

15. Check your Splunk On-Call timeline for a new event. This is an INFO message which, doesn't create a new incident in Splunk On-Call. It is intended only
to confirm that Zendesk can successfully send events to Splunk On-Call.

.. image:: /_images/spoc/INFO-alert.png
   :alt: Splunk On-Call test event
   :width: 95%

16. Exit the success message. 
17. Change the option to :guilabel:`Create target` and select :guilabel:`Submit`.

.. image:: /_images/spoc/Create-Target.png
   :alt: Create target option in the HTTP target in Zendesk extensions
   :width: 95%

Configure alerts from Zendesk to Splunk On-Call
===================================================

1. In the Zendesk side-menu, locate the section for :guilabel:`Business Rules` and select :guilabel:`Triggers`.

.. image:: /_images/spoc/Triggers.png
   :alt: Zendesk triggers
   :width: 55%

2. From the :guilabel:`Triggers` menu, select :guilabel:`Add trigger`.

.. image:: /_images/spoc/Add-Trigger.png
   :alt: Add a trigger in Zendesk
   :width: 95%

3. Enter a name and description. Select :guilabel:`Add condition` and add the following 2 conditions. These 2 conditions create a Splunk On-Call incident for every new case in Zendesk. You can alter these to further filter which conditions alert Splunk On-Call to fit your specific workflow.

* Status is New
* Ticket is Created

.. image:: /_images/spoc/Critical-Trigger.png
   :alt: Trigger conditions
   :width: 75%

4. Under the :guilabel:`Actions` section, select :guilabel:`Add Action`. In the first dropdown menu, scroll to the :guilabel:`Notifications` sections and select :guilabel:`Notify target`. In the second dropdown menu, select the Splunk On-Call target you created earlier.

.. image:: /_images/spoc/Critical-Trigger-Payload.png
   :alt: Configure trigger actions
   :width: 75%

5. Copy the following JSON payload and paste it into the :guilabel:`JSON body` field, then select :guilabel:`Create`.

Critical alert
------------------

This trigger opens a new incident in Splunk On-Call. 

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

You need to replicate this process to create 2 more triggers that send alerts to Splunk On-Call for acknowledgement and recovery events when cases
are assigned or closed in Zendesk. Reuse the same target created earlier for each new trigger. You can change the trigger conditions to fit your specific needs.

Acknowledgement alert
-------------------------

This trigger sends acknowledgement alerts to Splunk On-Call, to acknowledge the incident and stop paging and escalation.

Condition
* Status is Pending

.. image:: /_images/spoc/Acknowldge-Trigger.png
   :alt: Acknowledge trigger
   :width: 75%

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
----------------------

This trigger sends recovery notifications to Splunk On-Call to close out the incident.

Condition: 

* Status is Closed

.. image:: /_images/spoc/Resolved-Trigger.png
   :alt: Resolved trigger
   :width: 95%

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

(Optional) Use an outgoing webhook to acknowledge back 
==========================================================

Using Splunk On-Call Custom Outgoing Webhooks, you can have the acknowledgement of a Zendesk incident in Splunk On-Call automatically transition the related Zendesk case to a status you specify.

Create the destination URL
---------------------------

First, you need to build the appropriate destination URL for your Zendesk account. Certain parts of the URL must be URL encoded to function properly, so make sure you follow the structure exactly.

The following example assumes the following:

*  The Zendesk subdomain is buttercupgames.zendesk.com
*  The email address of a Zendesk user is alex\@buttercupgames.com
*  The API token generated by Zendesk is abc123efg456hij789


The structure of the URL is as follows:

``https://<email-address>/token:<yourAPI-token>@<your-subdomain>.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json``

Given the example data, the final URL is as follows:

``https:/alex%40buttercupgames.com%2Ftoken:abc123efg456hij789@company.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json``

Here is a summary of the crucial encoding elements:

*  The @ symbol in the email address is encoded as ``%40``.
*  The forward slash before the word token is encoded as ``%2F``.
*  The @ symbol before the subdomain isn't encoded.
*  ``${{ALERT.ticket_id}}`` isn't altered in any way. This syntax is required to dynamically insert the Zendesk ticket ID into the URL when the webhook is triggered.

.. _Zendesk-api-token:

Generate a Zendesk API token
----------------------------------------------

1. In the side-menu, locate the :guilabel:`Channels` section and select :guilabel:`API`.

.. image:: /_images/spoc/API.png
   :alt: API channel in Zendesk
   :width: 95%

2. Under :guilabel:`Zendesk API`, select the :guilabel:`Settings` tab. 
3. Turn on :guilabel:`Token Access`.
4. Select the :guilabel:`+` to generate a new token.

.. image:: /_images/spoc/Zendesk-Token-Access.png
   :alt: Token access in Zendesk API
   :width: 95%

3. Give the token a name. 
4. Select :guilabel:`Copy` button to copy the token to your clipboard.
5. Select :guilabel:`Save`.

.. image:: /_images/spoc/Zendesk-API-Key-1.png
   :alt: Copy new token in Zendesk API
   :width: 95%

Set up the outgoing webhook
----------------------------------------------

1. In Splunk On-Call, select :guilabel:`Integrations` then :guilabel:`Outgoing Webhooks`. 
2. Under Outgoing Webhooks, select :guilabel:`Add Webhook`.
3. For :guilabel:`Event`, select :guilabel:`Incident-Acknowledged`.
4. For :guilabel:`Method`, select :guilabel:`PUT`.
5. For :guilabel:`Content Type`, select :guilabel:`application/json`.
6. In the :guilabel:`To` field, paste the complete destination URL described previously.

.. image:: /_images/spoc/Outgoing-webhooks.png
   :alt: Add an outgoing webhook in Splunk On-Call
   :width: 95%

7. In the :guilabel:`Payload` field, paste the following payload. You can change the status value to your preferred status.

.. code-block:: json

   { 
      "ticket":{ 
         "status": "pending" 
      } 
   }

8. Enter a description for the webhook and select :guilabel:`Save`.

.. image:: /_images/spoc/Zendesk-webhook.png
   :alt: Outgoing webhook configuration in Splunk On-Call
   :width: 75%