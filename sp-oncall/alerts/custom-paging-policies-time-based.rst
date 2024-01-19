.. _custom-paging-policy:

************************************************************************
Get started as user
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.

Your personal Paging Policy is executed when an incident is routed to
you based on a team's Escalation Policy. Need more information, learn
about **team escalation
policies** `here <http://help.victorops.com/knowledge-base/team-escalation-policy/>`__.
Your Paging Policy is part of your personal profile and gives you
control of how you're contacted when incidents are routed to you.

With Custom Paging Policies, you can choose to receive notifications by
the time of day, contact method (**push**, **SMS**, **email**, or
**phone)**, and at the intervals you prefer.

When an incident is routed to you, either directly or via an escalation
policy that you're on-call for, you may determine how you're contacted
based on the time of day.

Custom Paging Policies
----------------------

Custom paging policies are restricted to certain times of the day/week
and you may create multiple. When an incident is routed to you, we'll
execute the first matching policy in the list, top to bottom. If none of
your custom personal paging policies match the current time, your
`primary paging
policy <https://help.victorops.com/knowledge-base/paging-policy/>`__
will be used.

NOTE: You can create custom paging policies that overlap. VictorOps will
evaluate the list top to bottom and execute the first matching custom
personal paging policy.

.. image:: images/TBPP4@2x-1.png

**Setup**
~~~~~~~~~

Custom, time-based personal paging policies are built by configuring the
following for each step:

1. Name of the policy (only for custom)
2. The time interval for paging
3. Contact method
4. Day/time (only for custom)

.. image:: images/TBPP5@2x.png

Here is an example paging policy:

1. When Splunk On-Call detects an incident, immediately send Push
   Notification and a message to my Email
2. If the incident hasn't been acknowledged after 1 minute, send an SMS
   message to my mobile number.
3. After 15 minutes, and every 15 minutes until the incident is
   acknowledged, call my cell phone/home phone.

**Ignore Custom Paging Policies Option**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On all escalation policies, there is a checkbox called **Ignore Custom
Paging Policies**.

Team Admins have the option to check this box when they are creating
escalation policies that handle incidents for critical systems. This
feature ensures that on-call users are paged using the `primary paging
policy <https://help.victorops.com/knowledge-base/paging-policy/>`__,
ignoring a user's custom personal paging policy. This extra layer of
control can be used by Admins to ensure critical incidents aren't
overlooked.

For any questions or feedback, please `contact VictorOps
Support <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`__.
