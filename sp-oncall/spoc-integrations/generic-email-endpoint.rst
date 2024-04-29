.. _email-generic-spoc:

Email Endpoint Integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Email Endpoint Integration for Splunk On-Call.

The generic email endpoint is a basic email ingestion interface you can use to send emails to a specially crafted Splunk On-Call address to create, acknowledge, or resolve incidents in your timeline. The integrations accepts emails from any monitoring tool or email service provider.

The ability to modify the subject line of the email is a crucial component of the Email Endpoint Integration. If you can't customize the subject or body of the email, see :ref:`legacy-email-spoc` and :ref:`recommended-rules-email`

.. note:: Email alerts might be delayed by email handlers. Whenever possible use the REST endpoint instead. See :ref:`spoc-rest-endpoint`.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==================================

Log in to the Splunk On-Call portal and select :guilabel:`Integrations`, :guilabel:`Email Generic`.

.. image:: /_images/spoc/Integrations-Page-1.png
   :alt: Email endpoint integration

Select :guilabel:`Enable Integration` to generate your email endpoint address. After you activate it, the integration generates the generic email endpoint address. Select whether non-parseable emails are treated as info or critical alerts
under :guilabel:`Email Options`.

.. image:: /_images/spoc/Email-Integration-page-1.png
   :alt: Email options


Email endpoint address
==================================

Your On-Call email endpoint address consists of 3 parts:

1. The email endpoint key, a long string of numbers, characters, and dashes prior to the routing key. It's unique to your organization in On-Call. Although you can revoke a key and generate a new one, only 1 endpoint key can because available to you at a time.

2. The routing key, which you can use to route an email endpoint initiated incident to a specific team or teams within On-Call. In the following example, the routing key is ``database``:

   .. code-block:: text

      70ysj-6ks..(endpoint key)..9284\ **+database**\ @alert.victorops.com

   Routing keys in On-Call are case-sensitive and must match the routing key name in the routing segment of the email
   endpoint. For more information on setting up routing keys, see :ref:`spoc-routing-keys`.

   .. note:: if your email provider prohibits using a ``+`` sign, try with a dot (``.``).

3. The last part of the email endpoint address is the email domain: ``@alert.victorops.com``.

.. _formatting-emails-spoc:

Formatting emails and handling incidents
====================================================================

When using the email endpoint, the resulting behavior of the On-Call platform depends on the use of predefined keywords in the subject line of the email. You can use any of the following keywords:

-  ``CRITICAL``: Opens a new incident, triggering whatever escalation policy you configured for the team receiving the incident. The patterns recognized are "critical" and "problem".
-  ``WARNING``: Adds an entry to the timeline, and can either create a new incident or show visually based on    your configuration at :guilabel:`Settings`, :guilabel:`Alert Configuration`. The patterns recognized are "warn" and "warning".
-  ``INFO``: Posts an informational event in the timeline, without creating an incident. Nobody gets paged. The patterns recognized are "info", "informational" and "information".
-  ``ACKNOWLEDGEMENT``: Acknowledges an incident. The platform stops paging users. The patterns recognized are "acked", "acknowledge", "acknowledgement" and "acknowledged".
-  ``RECOVERY``: Resolves an open incident. The platform will stop paging users. It is not necessary for an incident to be acknowledged before it can be resolved. The patterns recognized are "resolved", "recovered", "recovery", "ok", and "closed".

When an email is ingested by On-Call, the subject line is parsed and the keywords are removed. Similarly, if the texts ``Re:`` , ``Fwd:``, or ``Fw:`` appear at the beginning of the subject line, they are parsed and removed. Any remaining text in the subject line becomes the title and main identity of the resulting incident (``entity_id`` field).

The body of the message is included as text in the ``state_message`` field of the incident. A best practice is to include the keyword at the end of the subject line to avoid issues with spaces in the title of the incident.

If an email does not contain any of these keywords, it is not parseable.

Sample incident
==================================

The following example email results in the creation of a new incident that is routed to the team "Lost".

.. image:: /_images/spoc/Sent-Email-3.png
   :alt: Sample subject

The resulting incident looks like the following:

.. image:: /_images/spoc/Incident-1.png
   :alt: Incident triggered

You can acknowledge the previous sample incident by sending the same email but replacing the keyword ``CRITICAL`` with the keyword ``ACKNOWLEDGEMENT``. To resolve it, replace the keyword ``ACKNOWLEDGEMENT`` with the keywords ``RESOLVED`` or ``OK``.

Troubleshooting autoresolution
==================================

Make sure that the subject line of the email is the same for all emails related to a given incident, excluding the keyword.

For example, if you send an email with the subject line "Database server DB6 is down CRITICAL" and then you send an email to resolve the incident with the subject line "Database server DB6 is up RECOVERY", the On-Call platform does not recognize that the second email is related to the incident opened by the first, because the ``entity_id`` for the first alert contains the word ``down``, while the ``entity_id`` for the resolution message contains the word ``up``.

.. _legacy-email-spoc:

Legacy email systems
========================

Some legacy monitoring tools don't permit users to alter the content of the subject line of their email notifications. In this case, you can use the Rules Engine tool (Enterprise only) to control the workflow of incidents generated by that tool. Contact support using the in-product chat for help with this configuration.

.. _recommended-rules-email:

Recommended Rules Engine rules
================================

You can limit sending alerts through the email integration depending on the flexibility you have over your email system. If you have the ability to modify the subject line and body of the email you can transform critical alerts into a recovery state. For this use case, see the following sample rule. Note the spaces on either side of the keyword ``UP``.

.. image:: /_images/spoc/Rules-Engine-1.png
   :alt: Sample rule for Rules Engine

This rule looks for the keyword or phrase ``UP`` in the email body (``state_message`` in the payload) using wildcard
matching, denoted by the asterisks. If the keyword or phrase ``UP`` is present in the body of the email, then the ``message_type`` turns to ``RECOVERY``. You can replace this with any of the parseable fields listed in :ref:`formatting-emails-spoc`.

Regular expressions
===============================

You can use regular expressions for advanced email use cases. For more information, see :ref:`rules-engine-regex`.
