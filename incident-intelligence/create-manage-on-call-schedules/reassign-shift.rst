.. _reassign-shift:

Reassign a full or partial shift in Incident Intelligence
************************************************************************

.. meta::
   :description: Steps to reassign a full on-call shift or parts of a shift in Incident Intelligence.
   
You can reassign full or partial on-call shifts to other team members if you are unable to be on call. Alternatively, you can take a current or future shift from someone. This is helpful if the current on-call responder is unable to reassign the shift themselves, for example during an emergency.

There are two ways to reassign shifts, depending on what page you are viewing in Incident Intelligence:

* From the main Incident Intelligence page, select :guilabel:`On-call Schedule`. In the side-pane that opens, select :guilabel:`Reassign Shift`.
* From the Incident Management page, select the :guilabel:`On-call schedules > Reassignments` tab, then :guilabel:`Reassign shift`.

When reassigning shifts, keep in mind:

- You must reassign coverage for the entire time period that the original shift owner is unavailable. That is, you cannot leave part of any shift unassigned.
  
- If you are reassigning a shift to multiple people, the reassigned times cannot overlap.
  
- You cannot reassign a shift to someone who is also unavailable.
  
- In the :guilabel:`Reassign Shift` dialog, the initial timeframe you select is the time range that the individual is unavailable. The shifts that display are those assigned during that time range.



.. _reassign-shift-to-other:

Reassign a full or partial shift
========================================

If you are unable to complete a current or upcoming shift, you can reassign all or part of that shift to one or more team members. You can reassign coverage in 1 hour increments if needed, for example if you have an appointment. You can reassign one of your own shifts or reassign someone else's shift for them.


To reassign a shift, follow these steps: 

#. Do one of the following:

   - On the main Incident Intelligence page, select :guilabel:`On-call Schedule`. In the side-pane that opens, select :guilabel:`Reassign Shift`.
  
   - On the Incident Management page, select the :guilabel:`On-call schedules > Reassignments` tab, then :guilabel:`Reassign shift`.
  
#. On the :guilabel:`Reassign Shifts` window, select the time range you are unavailable, including the dates and times. This does not need to match shift start and end times. This is the time that the person is unavailable.
#. (Conditional) If required, enter the name of the shift owner. The default is set to the current user. If you are reassigning shifts on behalf of another team member, enter their name in the :guilabel:`Reassign from` field.
#. Select :guilabel:`Search for schedules` to find the shift to reassign. Any shifts impacted by the time frame you selected are displayed. This includes shifts from another schedule, if the same user is assigned to more than one schedule.
#. In :guilabel:`Reassign to`, enter the name of the team member who will take the shift or partial shift. 
#. (Conditional) If you need to reassign multiple team members to one or more shifts, select :guilabel:`Add Responder` and select another :guilabel:`Time range` and team member who will take over that shift.
#. Save your changes.

In the updated schedule, the shift or partial shift that was reassigned is now assigned to the new team member. 

.. _take_shift:

Take a full or partial shift
==================================

Similar to reassigning a shift, you can take a shift from another team member. 

To take a full or partial shift from someone, follow these steps:

#. On the main Incident Intelligence page, select :guilabel:`On-call Schedule`. 
#. Select the name of the on-call team whose schedule you want to modify. The current on-call schedule displays.
#. Select the :guilabel:`Take shift` icon (|takeshift|). The Take on-call shift dialog displays.
#. You have two options:

   - To take the entire remaining shift, select the button for :guilabel:`Take remaining duration of this on-call shift`.
  
   - To take a few hours of the shift beginning immediately, ensure the radio button is not selected and select the number of hours you want to take from the :guilabel:`Take __ hour(s) of this on-call shift`.

#. Select :guilabel:`Take shift`.

The on-call schedule updates to reflect the shift reassignment selected.


View a list of reassigned shifts
=====================================

To view a list of all shift reassignments, follow these steps:

#. Log in to Splunk Observability Cloud and navigate to :menuselection:`Settings > Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. In the On-call schedules section, select :guilabel:`Reassignments`.
#. You can review the list of reassigned shifts, listed by the original shift owner. You can edit the shift assignment by selecting the action menu (|more|).





See also
============

* :ref:`ii-create-manage-on-call-schedules`
* :ref:`ii-scenarios-schedules`
* :ref:`ii-whos-on-call`





