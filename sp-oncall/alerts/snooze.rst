.. _snooze:

************************************************************************
Snooze an incident
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


Snooze makes on-call more bearable by allowing users to silence paging on unactionable or less-urgent alarms for a specified period of time. At the end of the defined time window, the incident will resume paging the on-call user.

--------------

How to Snooze an Incident
-------------------------

Triggered or acknowledged incidents can be snoozed by clicking the clock
icon on the incident cards in the incident pane. The icon is found in
the upper right-hand corner of the card.

.. image:: images/Snooze-button.png

Clicking this icon prompts the user with a modal to select an end time
for the snooze. Incidents can be snoozed in 30-minute increments up to
24 hours.

.. image:: images/how-to-snooze-it.png

After an incident is Snoozed, a new incident message is sent to the
Timeline indicating who snoozed the incident and the expiration time:

.. image:: images/SNooZE-in-The-Timeline.png

The incident will remain under the Acknowledged tab in the Incident Pane
until the snooze expires. If a triggered incident is snoozed, VictorOps
will automatically move it to Acknowledged. If an acknowledged incident
is snoozed, it will remain acknowledged.

.. image:: images/Snooze-in-the-ack-tab.png

--------------

When Snooze Expires
===================

When a snooze expires, the incident will begin paging the on-call user
for the previously paged escalation policy. If the incident didn't have
a policy associated (example: the incident was created manually and sent
to a single user), then that user will be paged.

--------------

Changing Snooze Expiration Time
===============================

If you need more time for a different task or have selected the
wrong expiration time, it's easy to modify the snooze. Click on the
*Snoozed Until* link, as indicated in the image below.

.. image:: images/Link-to-change-snooze.png

Now select a new expiration time for the snooze.

.. image:: images/Modify-Snooze.png

--------------

Rerouting/Resolving Snoozed Incidents
=====================================

Snoozed incidents can be rerouted or resolved. Both of these actions
effectively end the snooze.

--------------

Cancelling Snooze
=================

Didn't mean to snooze? `reroute the
incident <https://help.victorops.com/knowledge-base/reroute-an-incident/>`__
to **yourself** to cancel the snooze.

--------------

Who can Snooze?
===============

Anyone can snooze any triggered or acknowledged incident. If a user
snoozes an incident that was previously acknowledged by someone else,
that incident becomes snoozed/acknowledged in that user's name.

Only the user who snoozed an incident can modify the snooze time on the
incident.
