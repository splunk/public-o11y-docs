
.. _incident-fields-glossary:


*******************************************
Incident fields Glossary
********************************************


`Click here to skip to the Glossary of Fields <#glossary-of-fields>`__

Incidents in your Splunk On-Call timeline function like a simple table
with two columns: the field name, and the value of that field.  Field
names are either predefined automatically by Splunk On-Call, defined by
the integrated monitoring tool or created by a Rules Engine rule. This
makes an exhaustive list of all potential fields nearly impossible.
However, certain fields are always present, and this article defines and
explains those fields, how their values affect the behavior of an
incident, and how the Rules Engine can be used to manipulate those
fields.

--------------

**Anatomy of an Incident:**
---------------------------

When viewing an incident in the timeline, it appears as an abbreviated
version, displaying only a few fields that summarize the event. The
incident origin (monitoring tool), message_type (*critical*),
entity_display_name (*Tune Squad Deployed*), incident number (*#10*),
state_message (*Someone hit the red button*), and timestamp. It is not
possible to configure which fields are displayed here, however, you can
use the Rules Engine to transform these fields. |image1|

By clicking on the incident number, you can view the alert details. The
alert details include all the payload fields.

--------------

**Required / Important Fields:**
--------------------------------

**message_type:**

The *message_type* field is the one required field in Splunk On-Call
(all other fields would be filled in automatically). *message_type* is
used to determine the behavior of the alert when it arrives.

Possible values:

-  **CRITICAL** - Opens a new incident, which will set off an escalation
   policy and result in users being paged.
-  **WARNING** - May open a new incident depending on configuration
   in *Settings>>Alert Configuration>>“Create incidents for entities in
   [xxxxxxx] state”.* Otherwise, it will post information to the
   timeline without creating an incident or triggering any escalation
   policies.
-  **INFO** - Displays an entry in the timeline, without opening an
   incident (cannot trigger escalation or paging)
-  **ACKNOWLEDGEMENT** - Moves the incident from a triggered to
   acknowledged state (stops the escalation and paging)
-  **RECOVERY** /or/ **OK** - Resolves the incident (also stops
   escalation and paging if still active)

Note: if an alert is received with a different value in the
*message_type* field than these recognized ones, it will be accepted as
an **INFO** severity alert

**entity_id:**  This field serves as the central identity of an
incident.  It is used to recognize related events and must remain
consistent throughout the life-cycle of the incident.  This field is how
the Splunk On-Call platform knows that a particular recovery message
applies to a particular open incident.  When an incident is unresolved
(in a triggered or acknowledged state), and another critical message
arrives with the same *entity_id*, the new message will be rolled up
into the existing incident without creating a new incident.  This works
great for preventing duplicate notifications for the same problem, but
users must also be careful not to leave an incident unresolved for too
long or they risk missing a separate occurrence of the same problem.  If
not provided, this field will be auto-filled with a random String value.

**User / Monitor Defined Fields:**
----------------------------------

**routing_key**: This field controls the routing of incidents to
specific teams. Routing keys can be created and assigned to a team, or
teams, from the *Settings>>Routing Keys* page. An incident can only have
one single *routing_key* associated with it.

**entity_display_name**: Often times, the entity_id of an incident can
be long and full of jargon.  Setting the *entity_display_name* will
change how the incident appears in the timeline because it is the serves
as the title of the incident.  This field is also read aloud during
phone call notifications, which gives users an opportunity to simplify
and customize the message without affecting the life-cycle of the
incident.

**state_message**: The *state_message* field is meant to contain a more
verbose description of the problem.  It can also contain URL links.
 When using an email endpoint integration, the body of the email will
become the state_message field.

**hostname**: If there is a *hostname* field with a value in the
payload, we will display it after the *entity_display_name* in the
incident card:

.. image:: images/Screen-Shot-2019-04-23-at-4.05.36-PM.png

**custom_fields**: Users can add as many custom fields (with custom
names) to an incident as they wish.  This can be done by manually adding
the fields to the HTTP POST request, or by using the Rules Engine to
create a new field.

**Glossary of Fields:**
=======================

Character Limitations:
~~~~~~~~~~~~~~~~~~~~~~

The standard character limit for most payload fields is 1024. Notable
exceptions are state_message (20480) and entity_id (512).

[table id=4 /]

.. |image1| image:: images/Screen-Shot-2019-09-24-at-2.43.41-PM.png
