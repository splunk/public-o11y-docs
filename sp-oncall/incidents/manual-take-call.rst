
.. _manual-take-call:

************************************************************************
Manually Take an on-call shift
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.




Manual Take On-Call is an action you can perform in Splunk On-Call to take someone's on-call shift from them. Rather than editing the entire team's schedule or creating a scheduled override, Manual Take On-Call allows your
your on-call teams to swap/change personnel in real-time. This is a helpful option for absences due to illness or appointments that last for part or all of a shift.


A Manual Take On-Call allows one user to take on-call responsibilities from another user. 


.. image:: /_images/spoc/take-oncall1.png
    :width: 100%
    :alt: Within the Team, navigate to the People pane to take another user's shift.

#. This can be done by navigating to the :guilabel:`People` pane within the Timeline.
#. Select the user whose shift you want to take. 
#. Locate the Escalation Policy for which you wish to take on-call responsibilities. 
#. Select :guilabel:`Take Shift` beside the appropriate Escalation Policy and respond to the confirmation prompt to take the on-call responsibility from that user, for that team.

Clear Take
================

After you have manually taken a shift you and the individual that you took on-call for, both have the option to clear the "Take". The :guilabel:`Clear Take` button will appear next to the escalation policy both in your user profile card and the other individual's user profile card.


Take Back
===============

If someone takes a shift from you, you have the option to "Take Back" that shift, effectively ending that take. The :guilabel:`Take Back`  button will appear next to the escalation policy in your profile card and that of the person who took the shift from you.


Things to Note
=====================

Hard-coded user in the Escalation policy
---------------------------------------------

When you :guilabel:`Take On-Call` for a user who is hard-coded in the first step of an Escalation Policy, that is they are in a :guilabel:`Notify User` step, Splunk On-Call imposes a thirty day limit on the take. The end day and time will appear in the descriptive text beneath the escalation policy that you took on-call for in the user profile card.


.. image:: /_images/spoc/take-oncall2.png
    :width: 100%
    :alt: Withi

Take On-call in the Calendar View
--------------------------------------

A :guilabel:`Take On-call` is denoted by a strikethrough in the main calendar as opposed to the colored bar associated with scheduled overrides. For details on scheduled overrides, see :ref:`scheduled-overrides`.



Mobile app
---------------

For instructions on how to perform manual takes, see :ref:`mobile-schedule-overrides`.

Email sent out if Scheduled Overrides remain unassigned
-----------------------------------------------------------

If there is a scheduled override that remains unassigned and begins within the next seven days, an email will be sent out to Global or Team admins. This email will be sent out at approximately 2 AM UTC with reminders to provide coverage on these overrides.  Global Admins will see all the account's overrides in the email within this threshold. Team Admins will only receive an email for their Team's scheduled overrides within that upcoming week.

In order to not receive these emails, all scheduled overrides need to be assigned to either another user or the original user as the “override user” to keep them on-call.

