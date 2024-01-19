[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Enterprise**

**VictorOps Version Required: N/A SaaS**

[/ht_toggle]

An **annotation** is a bit of information or link to a resource
you can add to the payload of any incident that meets the matching
condition for a rule. It can be a URL, an image URL, or a Note (just a
blob of plain text). You can add multiple annotations to a single rule
by clicking *+ Add an Annotation.*

**URLs**
--------

When annotating a URL, you must add a “label”, which is the text that
your users will see in the payload of the incident.  Clicking on the
annotation will take the user directly to the URL.

If the payload from your monitoring tool includes a URL link in a field,
you can use variable expansion (explained below) to import the value of
that field into the annotation.

`Variable
Expansion <https://help.victorops.com/knowledge-base/transmogrifier-variable-expansion/>`__
*: The Rules Engine can pull the content of an alert field into the
rule, thus allowing users to dynamically update any annotation or
transformation with data from the alert. This can be done using the
payload field with the
syntax: *\ **:math:`{{field\_name}}**. Or it can be done by using a regular expression (RegEx) capture group with the syntax: **`\ {{\\n}}**
*where n is the number of the capture group.* 

**Common Example:**  Appending a URL to a Runbook to the Alert

The Rule:

   **When** state_message **matches** \*Server is DOWN\*

   **Annotate the alert with:** URL [select from dropdown] Runbook
   [label linked to url]

Then, when the state_message of an alert matches Server is DOWN, the
runbook appears under the “annotations” tab on the alert card.

--------------

**Image URLs**
--------------

Any image hosted at a URL can be rendered as an image in the payload of
an incident.

Please note that VictorOps does not accept attachments and we do not
store images.  Any images annotated to incidents must be hosted and
available via URL link.

If the payload from your monitoring tool includes an image URL in a
field, you can use variable expansion to import the value of that field
into the annotation as you see here.

   **When** field_of_your_choice **matches** * **using** wildcard

   **Annotate the alert with:** Image URL [selected from dropdown] Load
   Graph [label] ${{load_graph_field_name_here}}

--------------

**Notes**
---------

Annotating a note into your incidents allows you to deliver a specific
message to your users in plain text. Notes will be displayed in the
Alert Annotations section at the top of the alert upon clicking *More
Info*.

Adding Annotations via Alert Fields
-----------------------------------

The Alert Rules Engine isn't the only way annotations can be added to
alerts.  If alerts are being directed to a REST-style integration,
annotations can be automatically created by including fields with the
proper syntax in the alert payload.

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
