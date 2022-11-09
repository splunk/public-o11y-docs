.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-create-manage-on-call-schedules:

Create and manage on-call schedules
************************************************************************

.. meta::
   :description: 

.. toctree::
   :hidden:

   sync-on-call-schedule
   whos-on-call


When an incident occurs, it is important to contact a responder who understands that part of the system architecture to fix the problem. This is accomplished through scheduling. An on-call schedule consists of a rotating group of responders that are assigned shifts for incident response. Use an on-call schedule as a step in your service incident workflows.

.. raw:: html

   <embed>
      <h2>Steps to create an on-call schedule</h2>
   </embed>

Follow these steps to create a schedule. See for steps to create specific schedule scenarios.

.. raw:: html
    :file: on-call_schedule_steps.html

After you save your shift, review the schedule details in the :guilabel:`Schedule Preview` to confirm that you've configured your schedule shifts as intended. The schedule preview includes schedule info for up to one year. Select :guilabel:`Next Month` and :guilabel:`Previous Month` to navigate the schedule preview. Select :guilabel:`Back to all schedules` when you are finished adding shifts to your on-call schedule.

Now that you've created an on-call schedule, add it to the incident workflow for your web application service. See :ref:`ii-configure-incident-workflows`.

.. _ii-example-scenarios:

.. raw:: html

   <embed>
      <h2>Example schedule scenarios</h2>
   </embed>

Review these common example scenarios to better understand how to create on-call schedules. 


.. raw:: html

   <embed>
      <h3>Example schedule scenario one: Week-by-week coverage</h3>
   </embed>

Week-by-week shifts let you define coverage that is consistent week after week. For example, one responder that covers weekends from 5 PM Friday to 8 AM Monday for 4 weeks. Follow these steps to set up this example scenario.

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select the :guilabel:`On-call schedules`` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Heroes team, web application service". Select the :guilabel:`checkmark` icon to save your schedule name.  
#. Enter a shift name. For this example scenario, enter "Weekend coverage".
#. Select a shift start date.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Fridays` at :guilabel:`5:00 PM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`8:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`4`, to have the same responder cover the weekend shift for 4 weeks. 
#. Under :guilabel:`Add team members`, add one or more team members to the shift.
#. Enter team member names and select them when they appear. 
#. Drag team members in the list to reorder.
#. Select :guilabel:`Save shift`. 

.. raw:: html

   <embed>
      <h3>Example schedule scenario two: Day-by-day coverage</h3>
   </embed>

.. raw:: html

   <embed>
      <h3>Example schedule three: Business hours and nights-and-weekend rotation</h3>
   </embed>

- You need coverage for your web application service from 9 AM to 5 PM on Monday through Friday of each week, with multiple people on the team being on call for a whole week at a time.
- You also need coverage for your web application service on the weekends. The weekend coverage is one person who is on call from Friday at 5 PM to Monday at 9 AM.

.. raw:: html

   <embed>
      <h3>Example schedule scenario four: Limit notifications during business hours</h3>
   </embed>

.. raw:: html

   <embed>
      <h2>See also</h2>
   </embed>

* :ref:`ii-sync-on-call-schedule`
* :ref:`ii-whos-on-call`