.. _reroute-an-incident:

************************************************************************
Re-route incidents
************************************************************************

.. meta::
   :description: Splunk On-Call offers the ability to route an existing incident to
individual users, teams of users or escalation policies.


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


This will produce a prompt where you can search for Escalation Policies and *Users* to reroute to.

|image1| |image2|

Selecting a User(s) to reroute to will invoke notifications according to
that user's Personal Paging Policy.

Selecting an *Escalation Policy* will cause the incident to be processed
by that policy, which may or may not result an any users being notified
immediately depending on the way the policy is configured.

Once you have selected the appropriate users or policies, click
“Reroute”.

**Mobile**
~~~~~~~~~~

An Incident can be rerouted directly from a push notification by holding
down the notification, and then selecting “Reroute”.

.. image:: images/Push-reroute.png

There is also the ability to reroute an incident from within the mobile
application. To do so tap into respective incident and in the bottom
right corner there is the ACK or REROUTE buttons and on the left hand
corner is SNOOZE:

.. image:: images/App-Reroute.png

Select **Reroute**

From the Reroute page, select the **escalation policies** or
direct **Users** to be notified in the reroute. Once you have finished
marking your selection, tap the **Reroute** icon in the upper right
corner to confirm your decision.

.. image:: images/App-Reroute-escalation-policy.png

.. |image1| image:: images/Reroute-Escalation-Policies.png
.. |image2| image:: images/Reroute-Users.png
