[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Starter, Growth** or **Enterprise**

**VictorOps Version Required: N/A SaaS**

**What you need to know: The ability to modify the subject line of the
email is a crucial component of the Email Endpoint Integration.**

[/ht_toggle]

The On-Call generic email endpoint is a basic email ingestion interface
that allows you to send emails to a specially crafted VictorOps address
in order to create, acknowledge, or resolve incidents in your timeline.
Simply send an email from any monitoring tool or email service provider
to your assigned email endpoint address to receive a result in On-Call.

Please note, that the ability to modify the subject line of the email is
a crucial component of the Email Endpoint Integration. If you are unable
to customize the subject or body of the email, please refer to the
`Legacy Email
Systems <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__
and `Recommended Rules Engine
Rules <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/#recommended-rules-engine-rules>`__
section at the bottom of this article. Also, please feel free to contact
Support (via in-product chat or the Splunk Support Portal) for
assistance using our Rules Engine feature for custom handling of email
messages.

It is also worth noting that email alerts can be subjected to delay by
email handlers. Whenever possible we recommend instead of utilizing the
`REST
endpoint <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__.

**In On-Call**
==============

Please log into the `On-Call web
portal <https://portal.victorops.com/auth>`__ and then
select  *Integrations* *>> Email Generic.* 

.. image:: images/Integrations-Page-1.png

If the integration has not already been enabled, click the blue *Enable
Integration* button within the *Email* icon to generate your email
endpoint address. Once enabled, this integration will generate
the generic email endpoint address (partially obscured below). Select
whether non-parsable emails will be treated as info or critical alerts
under *Email Options.*

.. image:: images/Email-Integration-page-1.png

--------------

**Email Endpoint Address**
==========================

Your On-Call email endpoint address consists of three parts:

First, the *Email Endpoint Key,* the long string of numbers, characters,
and dashes prior to the routing key, is unique to your organization in
On-Call. And, although you may revoke a key and generate a new one, only
one endpoint key will be available to you at a time.

*The Routing Key*
(+\ :math:`routing\_key) can be used to route an email endpoint initiated incident to a specific team or teams within On-Call. For example, you've established a routing key named _database._ The phrase "`\ routing_key”
would be replaced with “database” to form the address as follows:

*Note: if your email provider prohibits using a plus sign (+), try
replacing it with a dot (.)*

70ysj-6ks..(endpoint key)..9284\ **+database**\ @alert.victorops.com

Please note, that a routing key in On-Call is case-sensitive and should
exactly match the routing key name in the routing language in the email
endpoint. Also please note that a routing key is not required, and may
be omitted from the email address altogether. Below please find the same
address without a routing key (notice that there is no “+” symbol):

70ysj-6ks..(endpoint key)..9284@alert.victorops.com

The last part of the email endpoint address is the email domain:
@alert.victorops.com.

For more information on setting up routing keys, see our `Knowledge Base
article on
Routing Keys <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

**Formatting Emails and Handling Incidents**
============================================

When using the email endpoint, the resulting behavior of the On-Call
platform will depend on the use of predefined keywords in the subject
line of the email as follows:

-  **CRITICAL** - This keyword will open a new incident, thus triggering
   whatever escalation policy has been configured for the team receiving
   the incident. The patterns recognized are “critical” and “problem”.
-  **WARNING** - This keyword will add an entry to the timeline, and can
   either create a new incident or simply show visually based on your
   configuration at *Settings* >> *Alert Configuration*. The patterns
   recognized are “warn” and “warning”.
-  **INFO** - This keyword will post an informational event in the
   timeline, without creating an incident. (Nobody gets paged). The
   patterns recognized are “info”, “informational” and “information”.
-  **ACKNOWLEDGEMENT** - This keyword, though rarely used, will
   acknowledge an incident. The platform will stop paging users. The
   patterns recognized are “acked”, “acknowledge”, “acknowledgement” and
   “acknowledged”.
-  **RECOVERY**- This keyword will resolve an open incident. The
   platform will stop paging users.  (It is not necessary for an
   incident to be acknowledged before it can be resolved). The patterns
   recognized are “resolved”, “recovered”, “recovery”, “ok”, and
   “closed”.

When an email is ingested by On-Call, the subject line is parsed and the
above keywords are removed. Similarly, if the text **Re:** , **Fwd:** ,
or **Fw:**  appear at the beginning of the subject line, they are parsed
and removed. Any remaining text in the subject line will become the
title and main identity of the resulting incident (*entity_id* field).
The body of the message will be included as text in the *state_message*
field of the incident. A best practice is to include the keyword at the
end of the subject line to avoid issues with spaces in the title of the
incident.

If an email does not contain any of these keywords, it is not parsable.

--------------

**Example Incident using Email Endpoint**
=========================================

The following example email will result in the creation of a new
incident that will be routed to the team Lost (routing key = lost).

.. image:: images/Sent-Email-3.png

Below, please find the resulting incident with the expanded payload in
On-Call.

.. image:: images/Incident-1.png

The above incident may be acknowledged by sending the same email but
replacing the keyword CRITICAL with the keyword ACKNOWLEDGEMENT.  It can
also be resolved by replacing the keyword ACKNOWLEDGEMENT with the
keywords RESOLVED or OK.

--------------

**Troubleshooting Auto-Resolution**
===================================

Make sure that the subject line of the email is the same for all emails
related to a given incident (excluding the keyword, obviously).  In
other words, if you were to send an email with the subject line
“Database server DB6 is down CRITICAL” and then you tried sending an
email to resolve the incident with the subject line “Database server DB6
is up RECOVERY”, the On-Call platform would not recognize that the
second email is related to the incident opened by the first (because the
entity_id for the first alert contains the word *down*, while the
entity_id for the resolution message is different, containing the
word *up* instead).

--------------

**Legacy Email Systems**
========================

Some legacy monitoring tools do not permit users to alter the content of
the subject line of their email notifications.  In this case, it may be
possible to use our Rules Engine tool (Enterprise only) to control the
workflow of incidents generated by that tool.  Contact our support team
via in-product chat for help with this configuration.

--------------

**Recommended Rules Engine Rules**
==================================

Sending alerts through the email integration can be limited depending on
the flexibility you have over your email system. If you have the ability
to modify the subject line and body of the email you may transform
Critical alerts into a Recovery state. For this use case, please see the
example Rules Engine rule below. Note the spaces on either side of the
keyword UP.

.. image:: images/Rules-Engine-1.png

With this Rules Engine rule, we are looking for a keyword or phrase “UP”
in the Email Body (state_message in the payload) using wildcard
matching, denoted by the asterisks. If the keyword or phrase “UP” is
present in the body of the email, then the message_type will transform
to RECOVERY (this can be replaced with any of the parsable fields listed
in the “Formatting Emails and Handling Incidents” section).

--------------

**Regular Expressions (RegEx)**
===============================

Regular Expressions can be utilized for advanced email use cases. Please
refer to the following articles for information on how to use RegEx in
the Rules Engine:

`Rules Engine: Matching
Conditions <https://help.victorops.com/knowledge-base/transmogrifier-matching-conditions/#matching-with-regular-expressions-regex>`__

`Rules Engine: Variable
Expansion <https://help.victorops.com/knowledge-base/transmogrifier-variable-expansion/#variable-expansion-via-regex-capture-group>`__

`Rules Engine:
Transformations <https://help.victorops.com/knowledge-base/transmogrifier-transformations/#transformcreate-fields-from-an-email-body-with-regex>`__
