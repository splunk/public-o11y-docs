About Splunk On-Call and the REST Endpoint
==========================================

The REST Endpoint allows you to send customized alerts and incident
details into the Splunk On-Call timeline. Alerts get sent into the
Splunk On-Call incident workflow with fields such as
*message_type*, *entity_id*, and/or *state_message*. As these alerts
come into Splunk On-Call, they are routed directly to the proper person
or team with incident details that give the on-call responder more
context.

**Splunk On-Call REST Endpoint Establishes Incident Lifecycle
Workflows**

-  Send alerts straight into Splunk On-Call with detailed incident
   context
-  Collaborate around issues in the Splunk On-Call timeline via incident
   prioritization, escalation, native chat, runbook links, and more
-  Remediate incidents more quickly with automated contextual alerting,
   communication, and incident workflow management in one centralized
   location

The Splunk On-Call REST Endpoint accepts alerts from any source via an
**HTTPS POST request** in **JSON format**. As long as you can configure
the content of the request, you can trigger, acknowledge, or resolve
incidents in Splunk On-Call.

Enable the REST Endpoint Integration
====================================

In VictorOps, click on *Integrations >> 3rd Party Integrations >> REST -
Generic.*

.. image:: images/Rest-EndPoint-Integration-Page.jpg

 

If the REST endpoint integration has not been enabled, click the
blue *Enable* button to generate your endpoint destination URL. Note
that the REST endpoint is different than the `general
API <https://help.victorops.com/knowledge-base/api/>`__ and is the
preferred method to create incidents.

**REST Endpoint Integration Routing Key**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: images/Rest_EndPoint_Enable_Pageblur.jpg

 

The routing key that will be used for this integration should be
included in the destination URL.  It is essential that you replace what
you see here with the actual routing key you intend to use.  Everything
after the final forward slash must be replaced with your key.  For
example, assuming a routing_key value of “database”:

………36437/**$routing_key**    ==>   ……..36437/**database**

Routing keys in Splunk On-Call can be set up and associated by clicking
on *Settings >> Routing Keys.*

For more information on routing keys and best practices, click
`HERE <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

Recommended REST Endpoint Integration Fields
============================================

**Technically, only the message_type field is absolutely required.**
 You could use {“message_type”:“critical”} as the body and generate an
incident.  However, in order to get the most out of the integration, we
recommend including the fields listed below.  These fields help
establish the workflow and lifecycle of an incident in Splunk On-Call,
but keep in mind that **you can also include any number of additional,
custom fields that you may find useful**. For more information on
different fields that Splunk On-Call uses please see the `glossary of
fields
table <https://help.victorops.com/knowledge-base/incident-fields-glossary/#glossary-of-fields>`__.

[table id=restFields /]

**Expected Responses**
~~~~~~~~~~~~~~~~~~~~~~

Success messages will display the result and the entity_id of the
incident.

{ “result”:“success”, “entity_id”:“Your entity_id here” }

Failure messages will display the result as well as an error message
explaining the reason for the failure.

{ “result”:“failure”, “message”:“Missing fields: message_type” }

--------------

**Example Alerts**
------------------

Trigger a Critical Incident
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This request will open a new incident.

{ “message_type”:“CRITICAL”, “entity_id”:“disk
space/db01.mycompany.com”, “entity_display_name”:“Critically Low Disk
Space on DB01”, “state_message”:“The disk is really really full. Here is
abunch of information about the problem” }

Response:

{ “result” : “success”, “entity_id” : “disk space/db01.mycompany.com” }

Incident created:

.. image:: images/Incident-Card.jpg

Resolve an Incident
~~~~~~~~~~~~~~~~~~~

This request will resolve the same incident opened in the example above
(notice the entity_id is the same, allowing our system to identify to
which incident this request should be applied)

{ “message_type”:“RECOVERY”, “entity_id”:“disk
space/db01.mycompany.com”, “entity_display_name”:“Critically Low Disk
Space on DB01”, “state_message”:“Memory was added to the disk. All is
well now” }

Response:

{ “result” : “success”, “entity_id” : “disk space/db01.mycompany.com” }

Incident Resolved:

.. image:: images/Recovery-Incident-Card.jpg

--------------

cURL and Incident Response
~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also invoke this with a cURL command by imitating this syntax
(You must insert your own REST endpoint key and routing_key value):

curl -X POST -d ‘{“entity_id”:“ID of the
incident”,“message_type”:“critical”,“state_message”:“hi, this is some
state message.”}’
https://alert.victorops.com/integrations/generic/20131114/alert/[YOUR_REST_ENDPOINT_KEY]/[ROUTING_KEY_HERE]

Annotations
===========

By adding an annotation field to the alert payload you can include
annotations in an alert being sent into Splunk On-Call via the REST
Endpoint. INFO, WARNING, and CRITICAL alerts can be annotated by adding
the annotation field to the JSON payload.

Note: When an incident is in an acknowledged state and a new alert with
the same entity_id comes into the Splunk On-Call Timeline the alert will
be
`aggregated <https://help.victorops.com/knowledge-base/notification-alert-aggregation/>`__
under the open incident. Any new annotations carried in the most recent
alert will be added to the annotation tab of the incident. The
annotations will also be reflected within each alert payload.

.. image:: images/Annotations-REST.jpg

Annotation Payloads:
~~~~~~~~~~~~~~~~~~~~

.. image:: images/Annotation-Payload.jpg

There are three types of annotations accepted by Splunk On-Call through
the syntax below. Note: You can customize the title of your annotation
at the end of your annotation syntax. For example, in the above
screenshot the title of the URL annotation will appear in Splunk On-Call
as “Runbook”.

Example Payloads:
~~~~~~~~~~~~~~~~~

URL: *vo_annotate.u.url*
                        

{ “monitoring_tool”: “API”, “message_type”:“INFO”,
“entity_id”:“disk.space/db01”, “entity_display_name”:“Approaching Low
Disk Space on DB01”, “state_message”:“The disk is really really full.
Here is a bunch of information about the problem”,
“vo_annotate.u.Runbook”:“https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/”
}

Note: *vo_annotate.s.note*
                          

*Note: Annotations have a 1124 character limit*

{ “monitoring_tool”: “API”, “message_type”:“INFO”,
“entity_id”:“disk.space/db01”, “entity_display_name”:“Approaching Low
Disk Space on DB01”, “state_message”:“The disk is really really full.
Here is a bunch of information about the problem”,
“vo_annotate.s.Note”:“Once Disk Space is critically low there will be an
incident!” }

Image URL: *vo_annotate.i.image*
                                

{ “monitoring_tool”: “API”, “message_type”:“INFO”,
“entity_id”:“disk.space/db01”, “entity_display_name”:“Approaching Low
Disk Space on DB01”, “state_message”:“The disk is really really full.
Here is a bunch of information about the problem”,
“vo_annotate.i.Graph”:“https://community.iotawatt.com/uploads/db6340/original/1X/266a3917cc86317830ae9cda3e91c7689a6c73a7.png”
}
