.. _reroute-an-incident:

************************************************************************
Re-route incidents
************************************************************************

.. meta::
   :description: Splunk On-Call offers the ability to route an existing incident to individual users, teams of users or escalation policies.


Sometimes, users who are paged for an issue may need to reroute the incident, either to another team, or to a specific individual. Splunk On-Call offers the ability to route an existing incident to
individual users, teams of users or escalation policies.

What you need to know
===============================

-  When an incident is routed directly to a user, the user will be paged in accordance with their personal paging policy until it has been acknowledged.
-  When an incident is routed to one or more escalation policies, it will page and escalate in accordance with the steps indicated in the policy.
-  You will want to ensure your team members have appropriately set up their policies such that important incidents aren't being routed to email purgatory.

Web Portal
=============

From the :guilabel:`Incident Management` pane, select the reroute symbol:

.. image:: /_images/spoc/reroute1.png
    :width: 100%
    :alt: The reroute option is the middle icon.


This will produce a prompt where you can search for Escalation Policies and Users to reroute to.

.. image:: /_images/spoc/reroute2.png
    :width: 100%
    :alt: The reroute options.


.. image:: /_images/spoc/reroute3.png
    :width: 100%
    :alt: The reroute options.


Selecting a user to reroute to will invoke notifications according to that user's Personal Paging Policy.

Selecting an Escalation Policy will cause the incident to be processed by that policy, which may or may not result an any users being notified immediately depending on the way the policy is configured.

Once you have selected the appropriate users or policies, select :guilabel:`Reroute`.

Mobile
===============

An incident can be rerouted directly from a push notification by holding down the notification, and then selecting :guilabel:`Reroute`.

.. image:: /_images/spoc/reroute4.png
    :width: 100%
    :alt: The mobile push notification has a Reroute option.

There is also the ability to reroute an incident from within the mobile application. To do so, tap into respective incident and in the bottom right corner there is the ACK or REROUTE buttons and on the left hand corner is SNOOZE:

.. image:: /_images/spoc/reroute5.png
    :width: 100%
    :alt: The mobile push notification has a Reroute option.

Select :guilabel:`Reroute`.

From the Reroute page, select the escalation policies or direct users to be notified in the reroute. Once you have finished marking your selection, tap the :guilabel:`Reroute` icon in the upper right
corner to confirm your decision.

.. image:: /_images/spoc/reroute6.png
    :width: 100%
    :alt: The mobile options to reroute an incident.
