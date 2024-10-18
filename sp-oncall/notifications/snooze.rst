
.. _snooze:

************************************************************************
Snooze an incident
************************************************************************

.. meta::
   :description: Snooze makes on-call more bearable by allowing users to silence paging on unactionable or less-urgent alarms for a specified period of time..


Snooze makes on-call more bearable by allowing users to silence paging on unactionable or less-urgent alarms for a specified period of time. At the end of the defined time window, the incident will resume paging the on-call user.


How to snooze an incident
=================================

Triggered or acknowledged incidents can be snoozed by selecting the clock icon on the incident cards in the incident pane. The icon is found in the upper right-hand corner of the card.

.. image:: /_images/spoc/snooze1.png
    :width: 100%
    :alt: The snooze button is in the upper right-hand corner of an incident card.


Selecting this icon prompts the user with a modal to select an end time for the snooze. Incidents can be snoozed in 30-minute increments up to 24 hours.

.. image:: /_images/spoc/snooze2.png
    :width: 100%
    :alt: Select the snooze interval.


After an incident is Snoozed, a new incident message is sent to the Timeline indicating who snoozed the incident and the expiration time:


.. image:: /_images/spoc/snooze3.png
    :width: 100%
    :alt: Once snoozed, a new message is sent.


The incident will remain under the Acknowledged tab in the Incident Pane until the snooze expires. If a triggered incident is snoozed, Splunk On-Call will automatically move it to Acknowledged. If an acknowledged incident is snoozed, it will remain acknowledged.


.. image:: /_images/spoc/snooze4.png
    :width: 100%
    :alt: The snooze is acknowledged.



When snooze expires
===========================

When a snooze expires, the incident will begin paging the on-call user for the previously paged escalation policy. If the incident didn't have a policy associated (example: the incident was created manually and sent to a single user), then that user will be paged.



Changing Snooze Expiration Time
===============================

If you need more time for a different task or have selected the wrong expiration time, it's easy to modify the snooze. Select the
:guilabel:`Snoozed Until` link.

.. image:: /_images/spoc/snooze5.png
    :width: 100%
    :alt: The snooze is acknowledged.

Now select a new expiration time for the snooze.

.. image:: /_images/spoc/snooze6.png
    :width: 100%
    :alt: The new expiration time.



Rerouting or resolving snoozed incidents
==============================================

Snoozed incidents can be rerouted or resolved. Both of these actions effectively end the snooze.


Cancelling snooze
=================

Didn't mean to snooze? Reroute the incident to yourself to cancel the snooze. For information on rerouting an incident, see :ref:`reroute-an-incident`.



Who can snooze?
===============

Anyone can snooze any triggered or acknowledged incident. If a user snoozes an incident that was previously acknowledged by someone else, that incident becomes snoozed or acknowledged in that user's name.

Only the user who snoozed an incident can modify the snooze time on the incident.
