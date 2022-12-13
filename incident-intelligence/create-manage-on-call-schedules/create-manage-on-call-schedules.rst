.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-create-manage-on-call-schedules:

Create and manage on-call schedules
************************************************************************

.. meta::
   :description: Steps to create on-call schedules for Incident Intelligence in Splunk Observability Cloud.
    

.. toctree::
   :hidden:

   example-schedule-scenarios
   sync-on-call-schedule
   whos-on-call


When an incident occurs, it is important to contact a responder who understands that part of the system architecture to fix the problem. You can accomplish this through scheduling. An on-call schedule consists of a rotating group of responders that are assigned shifts for incident response. Use an on-call schedule as a step in your service incident workflows.

.. raw:: html

   <embed>
      <h2>Create an on-call schedule</h2>
   </embed>

Follow these steps to create a schedule. See :ref:`ii-schedule-scenarios` for steps to create specific schedule scenarios.

.. raw:: html
    :file: on-call_schedule_steps.html

After you save your shifts, review the schedule details in the :guilabel:`Schedule Preview` to confirm that you've configured your schedule shifts as intended. The schedule preview includes schedule info for up to one year. Select :guilabel:`Next Month` and :guilabel:`Previous Month` to navigate the schedule preview. Select :guilabel:`Back to all schedules` when you are finished adding shifts to your on-call schedule.

Now that you've created an on-call schedule, add it to the incident workflow for your web application service. See :ref:`ii-configure-incident-workflows`.

.. raw:: html

   <embed>
      <h2>See also</h2>
   </embed>

* :ref:`ii-schedule-scenarios`
* :ref:`ii-whos-on-call`
* :ref:`ii-sync-on-call-schedule`