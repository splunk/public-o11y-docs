Once a team has been created in Splunk On-Call the Team Admin or a
Global Admin can start creating on-call schedules. An on-call schedule
consists of 3 components: Rotations, Shifts, and Escalation Policies.

A rotation is a recurring schedule, that consists of one or more shifts,
with members who rotate through a shift.

A rotation may be used as a step in a team’s escalation policy.

**NOTE: Being scheduled for a rotation does not necessarily mean that
you’re on-call unless the rotation is part of the team’s** `Escalation
Policy <http://help.victorops.com/knowledge-base/team-escalation-policy/>`__\ **.**

There are three different types of shifts available in a rotation: 24/7,
Partial Day, and Multi-day.

Steps to Creating an On-Call Rotation
-------------------------------------

**Step 1:**

Navigate to the *Rotations* tab of your team. Once on the *Rotations*
tab select “Add Rotation”.

**BEST PRACTICE TIP:** Name the rotation something intuitive to who and
what the rotation is for. (ie. Support Primary).

**Step 2:**

Give the rotation a name.

**Step 3:**

Decide which of the 3 types of shifts is needed for the on-call schedule
(24x7, Partial Day, or Multi-Day).

**Step 4:**

Give the shift a name. (ie. Daytime On-call)

**Step 5:**

Set the timezone, days, start/end times, and when the next handoff
should occur.

If setting up a 24x7 shift, handoffs can only occur on a day cadence,
while a Multi-Day shift handoff can only occur on a weekly cadence.

A few things to note about Partial Day Rotations:

-  Option for **weekly or daily handoff**
-  Daily Handoff has a **maximum of 12 days**
-  If using daily handoff, 7 days will not rotate the same as 1 week

   -  The system will hand off every 7 *shifts* not every 7 *calendar
      days*. Days, where there are no shifts scheduled, will be skipped
      (i.e. if the shift is Mon-Fri, the handoff will skip the weekend
      because there are no shifts on the weekend).

**Step 6:**

Save the shift by selecting “Save Rotation”.

**Step 7:**

Once your rotation is saved, a week-long rotation preview will appear
with an ‘Add Members’ tab. Click on the “Select a member to add…” box,
and a dropdown will reveal all members that can be added. Select one or
more members to add to the shift. These members will be added in the
order they were clicked.

Users can be added more than once in the shift order. To re-arrange the
order of users, easily drag and drop the users to the desired order. To
remove a user from the shift order, simply click the “x” next to the
user’s name.

**Step 8:**

Once users have been added to the shift, another shift can be added to
this rotation or an `Escalation
Policy <https://help.victorops.com/knowledge-base/team-escalation-policy/>`__
can be set up for this rotation.

**NOTE: Being scheduled for a rotation does not necessarily mean that
you’re on-call unless the rotation is part of the team’s** `Escalation
Policy <http://help.victorops.com/knowledge-base/team-escalation-policy/>`__\ **.**

Editing an Already Created Rotation or Shift
--------------------------------------------

On the *Rotations* tab, Global Admins and Teams Admins have the ability
to edit current rotations and shifts.

**Viewing & Editing Rotations**

To rename or delete a rotation click on the hamburger menu to the right
of the rotation name.

To expand the different rotations click the carrot icon. From there
admins have the option to add/remove/reorder users in a shift, edit the
shift, or delete the shift.

**Add/Remove/Reorder Users in a Shift**

To add/remove/reorder users in a shift select the people icon. Admins
can drag and drop the order of users, click the “x” to remove a user or
add a user by selecting the drop-down and clicking on the user’s name.

**Change Current User On-Call**

Changing the current on-call user is as simple as selecting “Set
Current” next to the user name.

Setting “current” means the user is either on call at that moment,
or *they were the most recent person on call* (this can get a bit
tricky). For example, if you are configuring the order for your weekend
shifts during a weekday, you will need to select current for the user
prior to the user you’d want on call for the coming weekend.
