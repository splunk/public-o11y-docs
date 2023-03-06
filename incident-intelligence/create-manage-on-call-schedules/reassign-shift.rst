.. _reassign-shift:

Reassign a full or partial shift
************************************************************************

.. meta::
   :description: Steps to reassign a full on-call shift or parts of a shift.
   
You can reassign full or partial on-call shifts to other team members if you are unable to be on call. Alternatively, you can also take a current or future shift from someone. This is helpful if the current on-call responder is unable to reassign the shift themselves, for example during an emergency.

There are two ways to reassign shifts, depending on what page you are viewing in Incident Intelligence:

* From the main Incident Intelligence page, select :guilabel:`On-call Schedule`. In the side-pane that opens, select :guilabel:`Reassign Shift`.
* From the Incident Management page, select the :guilabel:`On-call schedules` tab, then :guilabel:`Reassign shift`

.. _reassign-shift-to-other:

Reassign a full or partial shift
========================================

If you are unable to complete a current or upcoming shift, you can reassign all or part of that shift to another team member. You can reassign one hour increments if needed, for example if you have an appointment. You can reassign one of your own shifts or reassign someone else's shift for them.

To reassign a shift follow these steps: 

#. Do one of the following:

   - On the main Incident Intelligence page, select :guilabel:`On-call Schedule`. In the side-pane that opens, select :guilabel:`Reassign Shift`.
  
   - On the Incident Management page, select the :guilabel:`On-call schedules` tab, then :guilabel:`Reassign shift`

#. On the Reassign Shifts window, select the time range you are unavailable including the dates and times.


#. (Optional) If required, enter the name of the shift owner. The default is set to the current user.
#. Select :guilabel:`Search for schedules` to find the shift to reassign. Any shifts impacted by the time frame you selected display. 
#. In :guilabel:`Reassign to`, enter the name of the team member who will take the shift or partial shift. 
#. Save your changes.

In the updated schedule, the shift or partial shift that was reassigned is now assigned to the new team member. Additionally. there is a notification that tells you who the shift was reassigned from.

.. _take_shift:

Take a full or partial shift
==================================

Similar to reassigning a shift, you can take a shift from another team member. 

To take a full or partial shift from someone:

#. On the main Incident Intelligence page, select :guilabel:`On-call Schedule`. 
#. Select the name of the on-call team whose schedule you want to modify. The current on-call schedule displays.
#. Select the :guilabel:`Take shift` icon (|takeshift|). The Take on-call shift dialog displays.
#. You have two options:

   - To take the entire remaining shift, turn on the radio button for :guilabel:`Take remaining duration of this on-call shift`.
  
   - To take a few hours of the shift beginning immediately, ensure the radio button is inactive and select the number of hours you want to take from the :guilabel:`Take __ hour(s) of this on-call shift`.

#. Select :guilabel:`Take shift`.

The on-call schedule updates to reflect the shift reassignment selected.


View a list of reassigned shifts
=====================================

To view a list of all shift reassignments:

#. Log in to Splunk Observability Cloud and navigate to :menuselection:`Settings > Incident Management`.
#. Select the On-call schedules tab.
#. In the On-call schedules section, select :guilabel:`Reassignments`.
#. You can review the list of reassigned shifts, listed by the original shift owner. You can edit the shift assignment by selecting the action menu.





See also
============

* :ref:`ii-create-manage-on-call-schedules`
* :ref:`ii-schedule-scenarios`
* :ref:`ii-whos-on-call`





