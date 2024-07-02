

.. _custom-paging-policy:

************************************************************************
Configure custom time-based paging policy
************************************************************************

.. meta::
   :description: Configure custom time-based paging policies in Splunk On-Call.

Your personal Paging Policy is executed when an incident is routed to you based on a team's Escalation Policy. For more information, see :ref:`team-escalation-policy`. Your Paging Policy is part of your personal profile and gives you control of how you're contacted when incidents are routed to you.

With custom Paging Policies, you can choose to receive notifications by the time of day, contact method (Push, SMS, email, or
phone), and at the intervals you prefer.

When an incident is routed to you either directly or by using an escalation policy that you're on-call for, you may determine how you're contacted based on the time of day.

Custom Paging Policies
==============================

Custom paging policies are restricted to certain times of the day or week and you may create multiple. When an incident is routed to you, we'll execute the first matching policy in the list, top to bottom. If none of your custom personal paging policies match the current time, your primary paging policy will be used.

.. note:: You can create custom paging policies that overlap. Splunk On-Call will evaluate the list top to bottom and execute the first matching custom personal paging policy.

.. image:: /_images/spoc/page-policy-timebased1.png
    :width: 100%
    :alt: Configure custom time-based paging policies.


Setup
--------------

Custom, time-based personal paging policies are built by configuring the following for each step:

1. Name of the policy (only for custom)
2. The time interval for paging
3. Contact method
4. Day/time (only for custom)

.. image:: /_images/spoc/page-policy-timebased2.png
    :width: 100%
    :alt: Configure custom time-based paging policies.


Here is an example paging policy:

1. When Splunk On-Call detects an incident, immediately send Push Notification and a message to my Email
2. If the incident hasn't been acknowledged after 1 minute, send an SMS message to my mobile number.
3. After 15 minutes, and every 15 minutes until the incident is acknowledged, call my cell phone/home phone.

Ignore Custom Paging Policies Option
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On all escalation policies, there is a checkbox called :guilabel:`Ignore Custom Paging Policies`.

Team Admins have the option to check this box when they are creating escalation policies that handle incidents for critical systems. This feature ensures that on-call users are paged using the primary paging policy, ignoring a user's custom personal paging policy. This extra layer of control can be used by Admins to ensure critical incidents aren't overlooked.

