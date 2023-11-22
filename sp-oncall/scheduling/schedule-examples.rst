
.. _schedule-examples:

************************************************************************
Schedule examples
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.



A virtually limitless number of scheduling options can be configured in Splunk On-Call. Two of the most common scenarios are described in the following sections.

.. note:: Only Global and Team Admins have the ability to create and edit schedules.

Scenario 1: Multiple people on-call during business hours
================================================================

Multiple people on-call during business hours. One person takes turns doing nights and weekends, One person takes turns doing 24x7 secondary coverage

Main points:

- Create a rotation called "Business Hours" with one Partial Day type shift for each user you would like on-call during Business Hours.
- Create a rotation called "Nights and Weekends" with one Partial Day type shift for the weeknights portion, and one Multi-day type shift for the weekend.
- Create a rotation called "Secondary" with a 24/7 type shift
- Make three escalation policies that use these rotations with "Notify the on duty users in rotation" actions in Step 1. Set Step 2 of the Nights and Weekends and Business Hours escalation policies to execute the Secondary escalation policy


Configure the Business Hours rotation
----------------------------------------------

#. Navigate to the team you'd like to implement this schedule for and add all of the appropriate users using the :guilabel:`Invite User` button.
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

#. Create the "Nights and Weekends' rotation by selecting :guilabel:`Add a Rotation`.
#. Name the rotation "Nights and Weekends" and select :guilabel:`Partial Day` for the first shift type.
#. Name the first shift "Weeknights".
    #. In the section with Monday through Friday in blue lettering, deselect Friday. Also, change the hours to cover all week-hours that are not covered by the Business Hours rotation. For example, if your  business hours are 8 AM to 5 PM, your Weeknights shift should be 5 PM to 8 AM. If your Business Hours are 9 AM to 4 PM, your Weeknights
    shift should be 4 PM to 9 AM.
    #. Change the :guilabel:`The next handoff happens` date to the next upcoming Monday.
    #. Select :guilabel:`Save Shift`.
    #. To add users to this shift, select :guilabel:`Manage Members` then :guilabel:`Select a User to add`. The order that you add the users in will dictate the week they end up on-duty. The first user you add will do the current week, the next user the week after, the third user the third week. You can re-order them after adding by dragging them on the :menuselection:`Members` page.
#. After adding the appropriate users, select :guilabel:`Add another Shift` and select :guilabel:`Multi-day` for the type.
    #. Name this shift “Weekends” and adjust the hours to those desired.
    #. Select :guilabel:`Save Shift`.
    #. To add users to this shift, select :guilabel:`Manage Members` then :guilabel:`Select a User to add`. The order that you add the users in will dictate the week they end up on-duty. You can re-order these users after adding by dragging them around within this menu.
#. When finished, select :guilabel:`I'm Done, Save this Rotation`.

Configure a Secondary rotation
-------------------------------------------

The next part of the configuration process will involve creating a Secondary rotation to serve as a backup in case either the Business Hours or Nights and Weekends user doesn't respond in a set amount of time.

#. Select :guilabel:`Add a Rotation`.
#. Name the rotation “Secondary” and select :guilabel:`24/7` for the shift type.
#. Name the shift “Secondary Shift” and change the handoff time to the appropriate one. This is typically when business hours begin for your organization.
#. Change the :guilabel:`The next handoff happens` date to the next upcoming Monday.
#. Select :guilabel:`Save Shift`/
#. To add users to the shift :guilabel:`Manage Members` then :guilabel:`Select a User to add`.The order that you add the users in will dictate the week they end up on-duty. The first user you add will do the current week, the next user the week after, the third user the third week. You can re-order these users after adding by dragging them around within this menu.
#. When finished, select :guilabel:`I'm Done, Save this Rotation`.


Configure the Escalation Policies
-----------------------------------------

Next, you will create an escalation policy. 

#.  Navigate to :menuselection:`Escalation Policies` and select :guilabel:`Add Escalation Policy`.
#.  Name this one "Secondary" and set the first step to immediately “Notify the on-duty users in rotation: Secondary”.
#.  Select :guilabel:`Save` and then refresh your page. This will allow the newly-created escalation policy to be available for selection in other escalation policies.
#.  Navigate to :menuselection:`Escalation Policies` and select :guilabel:`Add Escalation Policy`, and call the Policy Name “Business Hours”.
#. Set the first step to Immediately "Notify the on-duty users in rotation: Business Hours".
#. Select :guilabel:`Add Step` and set Step 2 to “If still unacked after 15 minutes”, “Execute Policy: Secondary”. 
    This will link the Business Hours and Secondary escalation policies together. If the Business Hours users doesn't respond after 15 minutes, the Secondary user will be paged.
#. Select :guilabel:`Save` and then refresh your page.
#. Select :menuselection:`Escalation Policies` and then :guilabel:`Add Escalation Policy`. Name this policy "Nights and Weekends".
    The format of this escalation policy is similar to the Business Hours escalation policy, with the Nights and Weekends rotation specified in Step 1 instead of the Business Hours rotation. This links the Nights and Weekends and Secondary escalation policies together so that if the Nights and Weekends
    on-call user doesn't respond in 15 minutes, it will escalate to the Seconday user.
#. Select :guilabel:`Save`.

Configure Routing Keys
---------------------------------

The final part of this configuration involves assigning routing keys to the Business Hours and Nights and Weekends escalation policies.

#. Navigate to :guilabel:`Settings` then :guilabel:`Routing Keys`.
#. On the :menuselection:`Routing Keys` page you can assign an existing routing key to the escalation policies, assign them to the Default Routing Policy, or create a new routing key and assign the escalation policies to it.
#. To assign the escalation policies to an existing routing key, hover your mouse over the key until a pencil icon shows on the far right, and then select the pencil icon.
#. Locate the Business Hours and Nights and Weekends escalation policies which are categorized under the team you've created them on and select them.
#. Select the blue checkbox to save your changes.
#. To assign the escalation policies to the Default Routing Policy, hover your mouse over the row until a pencil icon shows, and then select the escalation policies.

Scenario 2: Only get alerted for certain alerts during business hours
============================================================================


Main points:

- Create a Rotation called “Business Hours” with one Partial Day type shift for each user you would like on-call during Business Hours.
- Specify this Rotation in the first step of an Escalation Policy.
- Create a Routing Key called “bus-hours-only” and direct it at that Escalation Policy
- (Optional) Create Rules Engine  rules to have this Routing Key applied to the appropriate alerts.


Configure the Business Hours rotation
--------------------------------------------

Navigate to the team you'd like to implement this schedule for and add all of the appropriate users using the :guilabel:`Invite User` button.
#. Navigate to the :menuselection:`Rotations` tab and select :guilabel:`Add Rotation`.
#. Name the rotation "Business Hours" and select "Partial Day" for the shift type.
    #. Name the first shift either after the user who will be occupying it or just call it "Shift 1" and set the hours.
    #. Set the shift hours.
    #. Select :guilabel:`Save Shift`.
    
    .. note::  Ignore the "Handoff happens every X week" and "The next handoff happens X" fields because this shift is being created with the intent to not handoff.

    #. Next, add the appropriate user to this shift by selecting :guilabel:`Manage Members` and then :guilabel:`Select a User to add`.
    #. After adding the appropriate user, select :guilabel:`Add Another Shift`.
#. Select :guilabel:`Partial Day` and repeat the process from the previous steps. You will end up creating one shift for each user you would like on-call simultaneously during the business day.
#. When finished, select :guilabel:`I'm Done, Save this Rotation`.



Configure the Escalation Policies
------------------------------------------

Next, you will create an escalation policy. 

#.  Navigate to :menuselection:`Escalation Policies` and select :guilabel:`Add Escalation Policy`.
#.  Name this one "Business Hours Only" and set the first step to immediately “Notify the on-duty users in rotation: Business Hours".
#.  Select :guilabel:`Save` and then refresh your page. This will allow the newly-created escalation policy to be available for selection in other escalation policies.



Configure the Routing Keys
----------------------------------

The next part of this configuration will involve assigning a routing key to the Business Hours Only escalation policy.

#. Navigate to :guilabel:`Settings` then :guilabel:`Alert Rules Engine`.
#. Select :guilabel:`Add Key` and name the routing key "bus-hours-only".
#. In the dropdown menu, select the :guilabel:`Busines Hours Only` escalation policy, located under the team you created it for.
#. Select the blue checkbox to save your changes.
#. Once you've created this routing key, go into your monitoring tools and assign this routing key to the alerts you only want to page during business hours. Optionally, follow the rules engine steps. You should be able to locate instructions on where to edit the routing key in your specific monitoring tool by finding that tool's integration guide. If you have any questions, contact victorops-support@splunk.com.