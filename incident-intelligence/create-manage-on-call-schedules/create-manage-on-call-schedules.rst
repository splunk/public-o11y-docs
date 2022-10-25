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


An on-call schedule consists of one or more shifts, with members who rotate through a shift. Use an on-call schedule as a step in your service incident workflows.

.. raw:: html

   <embed>
      <h2>Example schedule scenario</h2>
   </embed>

Consider this example schedule scenario and use it in the following schedule-creation steps. 

- You create a web application service that you configure to route alerts from your web application. See :ref:`Create a service<ii-create-service>` and :ref:`ii-configure-alert-routing` for steps to define a service and configure a service’s alert routing.
- You need coverage for your web application service from 9 AM to 5 PM on Monday through Friday of each week, with each person on the team being on call for a whole week at a time.
- You also need coverage for your web application service on the weekends. The weekend coverage is one person who is on call from Friday at 5 PM to Monday at 9 AM.

.. raw:: html

   <embed>
      <h2>Steps to create an on-call schedule</h2>
   </embed>

.. raw:: html
    :file: on-call_schedule_steps.html

After you save your shift, review the schedule details in the :guilabel:`Schedule Preview` to confirm that you've configured your schedule shifts as intended. The schedule preview includes schedule info for up to one year. Select :guilabel:`Next Month` and :guilabel:`Previous Month` to navigate the schedule preview. Select :guilabel:`Back to all schedules` when you are finished adding shifts to your on-call schedule.

Now that you've created an on-call schedule, add it to the incident workflow for your web application service. See :ref:`ii-configure-incident-workflows`.

.. raw:: html
   
   <embed>
   <h2>See also</h2>
   </embed>


* :ref:`ii-sync-on-call-schedule`
* :ref:`ii-whos-on-call`