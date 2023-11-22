
.. _schedule-examples:

************************************************************************
Schedule examples
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.



A virtually limitless number of scheduling options can be configured in Splunk On-Call. Two of the most common scenarios are described in the following sections.

.. note:: Only Global and Team Admins have the ability to create and edit schedules.

Scenario #1
========================

Multiple people on-call during business hours. One person takes turns doing nights and weekends, One person takes turns doing 24x7 secondary coverage

Main points:

- Create a rotation called "Business Hours" with one Partial Day type shift for each user you would like on-call during Business Hours.
- Create a rotation called "Nights and Weekends" with one Partial Day type shift for the weeknights portion, and one Multi-day type shift for the weekend.
- Create a rotation called "Secondary" with a 24/7 type shift
- Make three escalation policies that use these rotations with "Notify the on duty users in rotation" actions in Step 1. Set Step 2 of the Nights and Weekends and Business Hours escalation policies to execute the Secondary escalation policy


Configure the Business Hours rotation
----------------------------------------------

#. To start, navigate to the team you'd like to implement this schedule for and add all of the appropriate users using the :guilabel:`Invite User` button.
#. Navigate to the :menuselection:`Rotations` tab and select :guilabel:`Add Rotation`.
#. Name the rotation "Business Hours" and select "Partial Day" for the shift type
    #. Name the first shift either after the user who will be occupying it or just call it "Shift 1" and set the hours.
    #. Select :guilabel:`Save Shift`.
    
    .. note::  Ignore the "Handoff happens every X week" and "The next handoff happens X" fields because this shift is being created with the intent to not handoff.

    #. Next, add the appropriate user to this shift by selecting :guilabel:`Manage Members` and then :guilabel:`Select a User to add`.
    #. After adding the appropriate user, select :guilabel:`Add Another Shift`.
#. Select :guilabel:`Partial Day` and repeat the process from the previous steps. You will end up creating one shift for each user you would like on-call simultaneously during the business day.
#. When finished, select :guilabel:`I'm Done, Save this Rotation`.

Configure the Nights and Weekends rotation
----------------------------------------------

#.  Create the "Nights and Weekends' rotation by selecting :guilabel:`Add a Rotation`.
#.  Name the rotation "Nights and Weekends" and select "Partial Day" for the first shift type.
#.  Name the first shift "Weeknights".
#.  In the section with Monday through Friday in blue lettering, deselect Friday. Also, change the hours to cover all week-hours that are not covered by the Business Hours rotation. For example, if your  business hours are 8 AM to 5 PM, your Weeknights shift should be 5 PM to 8 AM. If your Business Hours are 9 AM to 4 PM, your Weeknights
    shift should be 4 PM to 9 AM.
#.  Change the :guilabel:`The next handoff happens` date to the next upcoming Monday.
#.  Finally, click “Save Shift”
#.  Next, add the appropriate users to this shift by clicking the Manage
    Members button and then “Select a User to add…”
#.  The order that you add the users in will dictate the week they end
    up on-duty (the first user you add will do the current week, the
    next user the week after, the third user the third week…).  You can
    re-order them after adding by dragging them around on the “Members”
    menu
9.  After adding the appropriate users, click “Add Another Shift” and
    select “Multi-day” for the type
10. Call this shift “Weekends” and adjust the hours to those desired
11. Click “Save Shift” when done
12. Again, click the Manage Members button and add in your users,
    recognizing that the order you add them will dictate the week they
    are on-duty.  You can re-order these users after adding by dragging
    them around within this menu.
13. Finally, click “I’m Done, Save this Rotation”

**Secondary Rotation**

1. The next part of the configuration process will involve creating a
   “Secondary” rotation to serve as a backup in case either the Business
   Hours or Nights and Weekends user(s) doesn’t respond in a set amount
   of time
2. To start, click “Add a Rotation”
3. Call the rotation “Secondary” and select 24/7 for the shift type
4. Call the shift “Secondary Shift”, change the handoff time to the
   appropriate one (typically when business hours begin for your
   organization), and change the “The next handoff happens” to the next
   upcoming Monda
5. When done, click “Save Shift”
6. Next, add your users to this shift by clicking the Manage Members
   button and then “Select a user to add”, noting that the order you add
   them in will dictate the order they are on-duty (i.e. the first user
   you add will do the current week, next user you add will do the next
   week, the third user you add will do the third week…)
7. When finished, click “I’m Done, Save this Rotation”

**Escalation Policies**

1.  Next, navigate to the Escalation Policies tab and click “Add
    Escalation Policy”
2.  Name this one “Secondary” and set the first step to Immediately
    “Notify the on-duty users in rotation: Secondary”
3.  After clicking “Save”, refresh your page.  This will allow the
    just-created escalation policy to be available for selection in
    other escalation policies
4.  Again, click “Add Escalation Policy” and this time, call the Policy
    Name “Business Hours”
5.  Set the first step to Immediately “Notify the on-duty users in
    rotation: Business Hours”
6.  Click “Add Step” and set Step 2 to “If still unacked after 15
    minutes”, “Execute Policy: : Secondary”
7.  This will link the Business Hours and Secondary escalation policies
    together, so to speak, such that if the Business Hours users don’t
    respond after 15 minutes, the Secondary user will be paged
8.  After clicking “Save”, again click “Add Escalation Policy” and call
    this one “Nights and Weekends”
9.  The format of this escalation policy will be extremely similar to
    the Business Hours escalation policy, just with the Nights and
    Weekends rotation specified in Step 1 instead of the Business Hours
    rotation
10. Similarly, this links the Nights and Weekends and Secondary
    escalation policies together so that if the Nights and Weekends
    on-call user doesn’t respond in 15 minutes, the Secondary user will
    be escalated to
11. Next, click “Save”

**Routing Keys**

The final part of this configuration will involve assigning routing keys
to the Business Hours and Nights and Weekends escalation policies

1. To navigate here, click *Settings >> Routing Keys*
2. From this screen, you can assign an existing routing key to the
   escalation policies, assign them to the Default Routing Policy,
   and/or create a new routing key and assign the escalation policies to
   it.
3. To assign the escalation policies to an existing routing key, hover
   your mouse over the key until a pencil icon shows on the far right,
   and then click the pencil icon
4. After clicking the pencil icon, locate the Business Hours and Nights
   and Weekends escalation policies (categorized under the team you’ve
   created them on) and select them
5. When finished, click the blue checkbox to save your changes
6. To assign the escalation policies to the Default Routing Policy,
   you’ll very similarly hover your mouse over the row until a pencil
   icon shows, and then select the escalation policies

Scenario #2
-----------

**Only get alerted for certain alerts during business hours**

Large Points:

-  Create a Rotation called “Business Hours” with one Partial Day type
   shift for each user you would like on-call during Business Hours
-  Specify this Rotation in the first step of an `Escalation
   Policy <https://help.victorops.com/knowledge-base/team-escalation-policy/>`__
-  Create a `Routing
   Key <https://help.victorops.com/knowledge-base/routing-keys/>`__
   called “bus-hours-only” and direct it at that Escalation Policy
-  (Optional) Create `Rules
   Engine <https://help.victorops.com/knowledge-base/transmogrifier/>`__
   rules to have this Routing Key applied to the appropriate alerts

**Process:**

**Business Hours rotation**

1.  To start, navigate to the team you’d like to implement this schedule
    on and add all of the appropriate users using the ‘Add User’ button.
2.  Next, go to the Rotations tab and click “Add Rotation
3.  Name the Rotation “Business Hours” and select “Partial Day” for the
    shift type
4.  Name the first shift either after the user who will be occupying it
    (i.e. Mike’s Shift) or just call it “Shift 1”
5.  Set the hours to the appropriate ones
6.  Click “Save Shift
7.  Note: We’re able to ignore the “Handoff happens every X week” and
    “The next handoff happens X” fields because this shift is being
    created with the intent to not handoff
8.  Next, add the appropriate user to this shift by clicking the Manage
    Members button and then “Select a User to add…
9.  After adding the appropriate user, click “Add Another Shift”
10. Again, select “Partial Day” and repeat the process from the previous
    steps.  You will end up creating one shift for each user you would
    like on-call simultaneously during the business day (in my example 4
    users will be on-call simultaneously
11. When finished, click “I’m Done, Save this Rotation”

 

 

**Escalation Policies**

1. Next, navigate to the Escalation Policies tab and click “Add
   Escalation Policy”
2. Name this one “Business Hours Only” and set the first step to
   Immediately “Notify the on duty users in rotation: Business Hours
3. Click “Save”

**Routing Keys**

The next part of this configuration will involve assigning a routing key
to the Business Hours Only escalation Policy

1. To navigate here, click *Settings >> Alert Rules Engine*
2. Click “Add Key” and name the routing key “bus-hours-only”
3. In the dropdown menu locate the Business Hours Only escalation policy
   (categorized under the team you’ve created it on) and select it
4. Click the blue Check box to Save
5. Once you’ve created this routing key, you’ll likely want to go into
   your monitoring tools and assign this routing key to the alerts you
   only want to page during business hours (or optionally follow the
   rules engine steps below).  You should be able to locate instructions
   on where to edit the routing key in your specific monitoring tool(s)
   by finding that tool’s integration guide in this Knowledge Base
   repository, but if you have any questions, feel free to shoot an
   email to victorops-support@splunk.com
