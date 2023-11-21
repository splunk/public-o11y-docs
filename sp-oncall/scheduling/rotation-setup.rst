.. _rotation-setup:

************************************************************************
Rotations and shifts
************************************************************************

.. meta::
   :description: Create an on-call schedule, which includes rotations, shifts, and escalation policies.


Once a team has been created in Splunk On-Call the Team Admin or a Global Admin can start creating on-call schedules. An on-call schedule
consists of 3 components: Rotations, Shifts, and Escalation Policies.

A rotation is a recurring schedule, that consists of one or more shifts, with members who rotate through a shift.

A rotation may be used as a step in a team's escalation policy.

.. note:: Being scheduled for a rotation does not necessarily mean that you're on-call unless the rotation is part of the team's escalation
policy. For details about escalation policies, see :ref:`team-escalation-policy`.

There are three different types of shifts available in a rotation: 
* 24/7 
* Partial Day, and 
* Multi-day

Create an On-Call rotation
===========================================

When creating an on-call rotation, name the rotation something intuitive relative to who and what the rotation is for. For example, Support Primary.

To create an on-call rotation:
#. Navigate to the :guilabel:`Rotations` tab of your team. Once on the page, select :guilabel:`Add Rotation`.

#. Give the rotation a name.
#. Decide which of the three types of shifts is needed for the on-call schedule: 24x7, Partial Day, or Multi-Day.
#. Give the shift a name. For example: Daytime On-call.
#. Set the timezone, days, start and end times, and when the next handoff should occur. If setting up a 24x7 shift, handoffs can only occur on a daily cadence, while a Multi-Day shift handoff can only occur on a weekly cadence.
    A few things to note about Partial Day Rotations:
       - Option for weekly or daily handoff
       - Daily Handoff has a maximum of 12 days
       - If using daily handoff, 7 days will not rotate the same as 1 week. The system will hand off every 7 shifts not every 7 calendar
      days. Days where there are no shifts scheduled, will be skipped. For example, if the shift is Monday-Fridau, the handoff will skip the weekend because there are no shifts on the weekend.
#. Select :guilabel:`Save Rotation` to save the shift.
#. Once your rotation is saved, a week-long rotation preview will appear with an :guilabel:`Add Members` tab. Select :guilabel:`Select a member to add…` and a dropdown will reveal all members that can be added. Select one or more members to add to the shift. These members will be added in the order they were clicked.
      ..note:: Users can be added more than once in the shift order. To re-arrange the order of users, easily drag and drop the users to the desired order. To remove a user from the shift order, select the X next to the user's name.
#. Once users have been added to the shift, another shift can be added to this rotation or an escalation policy can be set up for this rotation.

..note:: Being scheduled for a rotation does not necessarily mean that you're on-call unless the rotation is part of the team's escalation policy.

Editing an Already Created Rotation or Shift
=====================================================

On the Rotations tab, Global Admins and Teams Admins have the ability to edit current rotations and shifts.

View or edit rotations
--------------------------

To rename or delete a rotation select the more menu to the right of the rotation name. To expand the different rotations, select the caret icon. From there admins have the option to add, remove or reorder users in a shift, edit the shift, or delete the shift.

Add, remove or reorder users in a shift
------------------------------------------------

To add, remove, or reorder users in a shift select the people icon. Admins can drag and drop the order of users, select the “x” to remove a user or add a user by selecting the drop-down and clicking on the user's name.

Change current user on-call
------------------------------------

Changing the current on-call user is as simple as selecting :guilabel:`Set Current` next to the user name.

Setting Current means the user is either on call at that moment, or they were the most recent person on call. For example, if you are configuring the order for your weekend shifts during a weekday, you will need to select Current for the user prior to the user you'd want on call for the coming weekend.
