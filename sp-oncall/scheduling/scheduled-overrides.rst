.. _scheduled-overrides:

========================================
Scheduled Overrides
=========================================

.. meta::
   :description: Scheduled Overrides allow users to request on-call coverage for planned absences.


Scheduled Overrides allow users to request on-call coverage for planned absences. If a current shift needs to be covered on short notice, see :ref:`manual-take-call`.


Scheduling an Override
=============================

From within any team's page select, :guilabel:`Scheduled Overrides` and then :guilabel:`Schedule an Override`. You can then choose who the override will be for as well as the start and end dates and times.

.. image:: /_images/spoc/override1-1.png
    :width: 100%
    :alt: The Create Scheduled Override allows you to choose who the override is for and when.

.. note:: Overrides can not be scheduled within 30 minutes of the current time.

Once the override has been created, a user still need to be assigned to the override. If the override remains unassigned, the original user will remain on-duty.

Assigning an Override
=========================

Global Admins can assign anyone to scheduled overrides, while Team Admins are able to create and assign overrides for anyone on their team.

In order to view all overrides, only your team's overrides, or only your personal overrides, make sure to select the desired view on the drop-down under the scheduled override description.


.. image:: /_images/spoc/override2.png
    :width: 100%
    :alt: Use the drop-down to select which overrides you want to view.

Select the caret icon to the right of the override to view the escalation policies which need to be assigned.

.. image:: /_images/spoc/override3.png
    :width: 100%
    :alt: Use the drop-down to select which overrides you want to view.

For each escalation policy, select the user from the dropdown who will be assigned to the override.

If only a particular escalation policy needs to be assigned and the original user is still to be on-call for their other escalation policies, be sure to select the original user as the override user to keep them on-call.

Taking an Override
==========================

If you are the user who will be covering someone's override, select :guilabel:`Take` next to the escalation policy which you are to cover.

.. image:: /_images/spoc/override4.png
    :width: 100%
    :alt: Select the Take button to cover another team member's override.

View the Override on the On-Call Schedule
====================================================

To see the override on the On-Call Schedule, navigate to the On-Call Schedule tab within the team for which the user is to be covered.

.. image:: /_images/spoc/oncall1.png
    :width: 100%
    :alt: Select the Take button to cover another team member's override.

Expand the on-call schedule by clicking on the caret icon to right. The override will show as an orange block and the user's username who is now on-call for the given time will be present as well.

Scheduled Overrides via Mobile
------------------------------------

For information on how to create, assign, and view Scheduled Overrides using the mobile app, see :ref:`mobile-schedule-overrides`.

Email sent out if Scheduled Overrides remain unassigned
============================================================

If there is a scheduled override that remains unassigned and begins within the next 7 days, an email will be sent out to Global and Team Admins. This email will be sent out at roughly 2 AM UTC with reminders to provide coverage on these overrides. Global Admins will see all the account's overrides in the email within this threshold, while Team Admins will only receive an email for their Team's scheduled overrides within that upcoming week.

In order to not receive these emails, all scheduled overrides need to be assigned to either another user or the original user as the override
user to keep them on-call.
