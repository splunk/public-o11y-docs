[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** N/A (SaaS)

**VictorOps Version Required: Enterprise (for Ack-Back function
described in this article)**

**What you need to know:**  This integration makes use of a feature,
`Outbound
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__.
To get more information about this feature please reach out to your
account executive or the VictorOps support team.

[/ht_toggle]

This guide walks you through the setup process for integrating Zendesk
with VictorOps.  Once complete, Zendesk will be able to automatically
trigger, acknowledge, and resolve incidents in VictorOps.  Additionally,
acknowledgement of the incident on the VictorOps side can trigger a
status change to “pending” (or whatever status you desire) in Zendesk.

--------------

**In VictorOps**
================

From the main timeline select *Integrations* then search for Zendesk in
the *3rd Party Integrations* tab.

..image images/Integrations-page.png

If the integration has not yet been enabled, click the *Enable
Integration* button to generate your configuration values as seen here:

..image images/Zendesk-API-Key.png

Copy this endpoint URL to your clipboard.  You will need it when
configuring Zendesk.

**Routing Key:**
~~~~~~~~~~~~~~~~

The routing key that will be used for this integration should be
included in the destination URL.  It is essential that you replace what
you see here with the actual routing key you intend to use.  Everything
after the final forward slash must be replaced with the key you have
configured in VictorOps.  For example, assuming a routing_key value of
“database”:

………36437/**$routing_key**    ==>   ……..36437/**database**

Routing keys in VictorOps can be set up and associated by clicking
on *Settings >>  Routing Keys.*

For more information on routing keys and best practices, click
`HERE <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

 **In Zendesk**
===============

--------------

Create a target
---------------

From your Zendesk portal select the *Settings Gear* on the left
side-menu.

..image images/Zendesk-Settings.png

 

Under the *Settings* section, select *Extensions.*

..image images/Extensions.png

 

In the resulting menu, click on *add a target.*

..image images/Add-a-Target.png

 

Select the *HTTP Target* option.

..image images/HTTP.png

 

Configure the HTTP target with an intuitive name.  Paste in the endpoint
URL you copied from VictorOps (Be sure to change the routing_key value
to a valid routing key as noted above).  Select a *Method*
of *POST* and *Content type* of *JSON.*  Leave the *Basic
Authentication* box unchecked and the *Test target* option selected and
click *Submit.*

..image images/HTTP-Target.png

 

Copy and paste in the following *JSON body*, and click *Submit.*

{ “message_type”:“info”, “entity_id”:“Test alert from Zendesk”,
“state_message”:“testing from Zendesk” }

 

If configured correctly, you should see a 200 success response similar
to this.

..image images/zendesk_200_response@2x.png

 

Check your VictorOps timeline for a new event.  This is an INFO message
which will not create a new incident in VictorOps, but is intended only
to confirm that Zendesk can successfully send events to VictorOps.

..image images/INFO-alert.png

 

Finally, click the *x* to exit the success message.  Change the option
to *Create target* and click *Submit.*

..image images/Create-Target.png

--------------

Configure Alerts to VictorOps
-----------------------------

 

In the left side-menu, locate the section for *Business Rules* and
select *Triggers.*

..image images/Triggers.png

 

From the *Triggers* menu select *Add trigger.*

..image images/Add-Trigger.png

 

 

Give the trigger an intuitive name and description.  Click *Add
condition* and add the following two conditions:

**- Status is New** **- Ticket is Created**

Note: You may alter these to further filter which conditions will alert
VictorOps or to fit your specific work-flow if you do not wish to create
a VictorOps incident for *every* new case.

..image images/Critical-Trigger.png

 

Under the *Actions* section, click *Add Action*.  In the first dropdown
(left), scroll down to the *Notifications* sections and select *Notify
target.*  In the second dropdown (right), select the VictorOps target
you created earlier.

..image images/Critical-Trigger-Payload.png

 

Copy the JSON payload below and paste it into the *JSON body* box, then
click *Create.*

**Critical Alert**
~~~~~~~~~~~~~~~~~~

{ “entity_id”:“{{ticket.id}}”, “message_type”:“CRITICAL”,
“state_message”:“{{ticket.comments_formatted}}”,
“monitoring_tool”:“Zendesk”, “alert_url”:“{{ticket.link}}”,
“ticket_id”:“{{ticket.id}}”, “Ticket External
I.D.”:“{{ticket.external_id}}”, “Ticket Origin”:“{{ticket.via}}”,
“Ticket Status”:“{{ticket.status}}”, “Ticket
Priority”:“{{ticket.priority}}” }

 

This trigger will open a new incident in VictorOps.  You will now need
to replicate this process to create two more triggers that will send
alerts to VictorOps for acknowledgement and recovery events when cases
are assigned or closed in Zendesk.  You will reuse the same target
created earlier for each new trigger.  Again, you can change the trigger
conditions to fit your specific needs.

**Acknowledgement Alert**
~~~~~~~~~~~~~~~~~~~~~~~~~

This trigger will send acknowledgement alerts to VictorOps, to ack the
incident and stop paging and escalation.

Conditions: **Status is Pending.**

..image images/Acknowldge-Trigger.png

 

Payload:

{ “entity_id”:“{{ticket.id}}”, “message_type”:“ACKNOWLEDGEMENT”,
“state_message”:“{{ticket.comments_formatted}}”,
“monitoring_tool”:“Zendesk”, “alert_url”:“{{ticket.link}}”,
“ticket_id”:“{{ticket.id}}”, “Ticket External
I.D.”:“{{ticket.external_id}}”, “Ticket Origin”:“{{ticket.via}}”,
“Ticket Status”:“{{ticket.status}}”, “Ticket
Priority”:“{{ticket.priority}}” }

**Resolved Alert**
~~~~~~~~~~~~~~~~~~

This trigger will send recovery notifications to VictorOps to close out
the incident.

Conditions: **Status is Closed.**

..image images/Resolved-Trigger.png

 

Payload:

{ “entity_id”:“{{ticket.id}}”, “message_type”:“RECOVERY”,
“state_message”:“{{ticket.comments_formatted}}”,
“monitoring_tool”:“Zendesk”, “alert_url”:“{{ticket.link}}”,
“ticket_id”:“{{ticket.id}}”, “Ticket External
I.D.”:“{{ticket.external_id}}”, “Ticket Origin”:“{{ticket.via}}”,
“Ticket Status”:“{{ticket.status}}”, “Ticket
Priority”:“{{ticket.priority}}” }

--------------

Ack Back (optional)
===================

Using our `Custom Outgoing
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
feature, it is possible to have the acknowledgement of a Zendesk
incident in VictorOps automatically transition the related Zendesk case
to a status of *pending* (or whatever status you prefer).

First you will need to build the appropriate destination URL for your
Zendesk account like so.  Note that certain parts of the URL must be URL
encoded in order to function properly, so make sure you follow this
structure exactly.

The example built below assumes the following:

-  The Zendesk subdomain is **company**.zendesk.com
-  The email address of a Zendesk user is **johnny.devops@company.com**
-  The API token generated by Zendesk is **abc123efg456hij789**
   (Instructions for generating your API key in Zendesk below)

The Destination URL
~~~~~~~~~~~~~~~~~~~

The structure of the URL is as follows:

https://**{email-address}**/token:**{yourAPI-token}**\ @\ **{your-subdomain}**.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json

Given the example data above, the final URL would be the following:

https://**johnny.devops**\ %40\ **company.com**\ %2Ftoken:**abc123efg456hij789**\ @\ **company**.zendesk.com/api/v2/tickets/${{ALERT.ticket_id}}.json

Note the following crucial elements:

-  The “@” symbol in the email address is encoded as “%40”
-  The forward slash before the word *token* is encoded as “%2F”
-  The “@” symbol just before the sub-domain is **NOT encoded**.
-  The ${{ALERT.ticket_id}} phrase is not altered in any way (This
   syntax is required to dynamically insert the Zendesk ticket ID into
   the URL when the webhook is triggered)

Generate the Zendesk API Key.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the left side-menu, locate the *Channels* section and click on *API.*

..image images/API.png

 

In the *Zendesk API* menu, on the *Settings* tab, make sure that *Token
Access* is enabled and then click the “+” button to generate a new key.

..image images/Zendesk-Token-Access.png

 

Give the key a name.  Click the *Copy* button to copy the key you your
clipboard, and click *Save*.

..image images/Zendesk-API-Key-1.png

 

Set Up the Outgoing Webhook
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Back in VictorOps, click *Integrations* >> *Outgoing Webhooks.* In the
Outgoing Webhooks menu, click *Add Webhook.*

..image images/Outgoing-webhooks.png

 

For the *Event* dropdown, choose **Incident-Acknowledged.**

For the *Method,* choose **PUT.**

For the *Content Type,* choose **application/json.**

In the *To:* box, paste the complete destination URL described above.

In the *Payload:* box, paste the following payload (You can change the
status value to your preferred status):

{ “ticket”:{ “status”: “pending” } }

Finally, give the webhook a brief description and click *Save*.

..image images/Zendesk-webhook.png

 

If you have any questions please contact `VictorOps
support <mailto:victorops-support@splunk.com?Subject=Zendesk%20VictorOps%20Integration>`__.
