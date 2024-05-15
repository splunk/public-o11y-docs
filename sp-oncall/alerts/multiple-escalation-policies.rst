:orphan:

.. _mult-escalation-policies:

************************************************************************
Multiple escalation policies best practices
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


Having multiple escalation policies can be very useful as it allows for unique escalation paths for different types and severities of alerts within a single team.

Here are a few suggestions to help you optimize your account and workflow with multiple escalation policies.



Reduce the number of teams in your org
======================================================

If you have multiple teams with the same users than they can be condensed into one team with different escalation policies and routing
keys for separation of alerts. This higher level of organization helps you find who is on-call faster and reduces scheduling headaches.



Create Waiting Rooms to eliminate middle-of-the-night alerts from incidents known to auto-resolve
=====================================================================================================

Many of our customers have alerts that auto-resolve within a few minutes, so why wake up at 2 a.m.? In this case, if an incident has not
resolved after a period of time, only then should Splunk On-Call page you.

Here's a way to fix this:

1. Create a second escalation policy within your team called Waiting Room. Create a routing key (used to send alerts to the Waiting Room) and append it to the policy.
2. Next, designate the amount of time you feel comfortable with the alert existing prior to paging a human (for example, 10 minutes)—set this amount of time as the first step in the Waiting Room policy.
3. Lastly, once that amount of time has passed, reroute the alert to the Primary Policy. This is achieved by selecting :guilabel:`Execute Policy` as
   the action and designating the Primary Policy for the reroute.

Alerts that are routed to the :guilabel:`Waiting Room` policy will delay paging for the time specified in the first step, allowing time for them to auto-resolve before waking you up.


.. image:: /_images/spoc/waiting-room1.png
   :width: 100%
   :alt: Add the webshook to the escalation policy.



Surface secondary on-call schedules in your on-call calendar
=====================================================================

The second step of an escalation policy will not appear on your on-callvcalendar nor can overrides be scheduled for these shifts. If your company treats secondary on-call as 'on-call,' here's a tip to get Splunk On-Call to surface secondary in the on-call calendar and enable scheduled overrides for these responsibilities.

1. Create a secondary escalation policy in your team for users who will be backup (that is, on-call for the second step). This policy will have one step immediately notifying the rotation you have designated for backup users.
2. In the second step of your Primary Policy, select the :guilabel:`Execute Policy` action, and reference the Secondary Policy.


Schedule an Override for a single escalation policy
========================================================

Scheduled Overrides are on an Escalation Policy basis, and you may request coverage for a single policy. When you schedule an override,
Splunk On-Call will centralize and surface all the policies that would result in a page to you directly. If you don't require coverage for a particular policy, don't assign anyone to cover that specific policy, or assign it to yourself (original user) and Splunk On-Call will continue to alert you.
