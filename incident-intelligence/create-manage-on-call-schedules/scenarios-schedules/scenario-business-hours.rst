.. _ii-scenario-business-hours:

Scenario: Skyler creates business-hours and nights-and-weekend rotations for the web application service
**********************************************************************************************************

.. meta::
   :description: Schedule scenario for creating business-hours and nights-and-weekends rotations in Incident Intelligence.

Skyler, the site reliability engineering (SRE) manager for Buttercup Games, needs to create an on-call schedule for the web application SREs with the following coverage needs:

- Skyler needs coverage for the web application service for business hours Monday through Friday of each week, with one responder on the team being on call for a whole week.
- Skyler also needs coverage for the web application service for nights and weekends. Night coverage is 5 PM to 8 AM Monday through Friday. Weekend coverage is one responder who is on call from Friday at 5 PM to Monday at 8 AM.
- Finally, Skyler needs one responder on call 24x7 as secondary coverage for one week Monday through Sunday.

Skyler takes the following steps to configure a schedule that meets these coverage needs:

.. raw:: html

   <embed>
      <ol>
            <li><a href="#ii-create-primary-schedule">Skyler creates a schedule for the primary coverage that includes three shifts: a business-hours shift, a weeknights shift, and a weekends shift.</a></li>
            <li><a href="#ii-create-secondary-schedule">Skyler creates a schedule for secondary coverage with a 24x7 shift</a></li>
            <li><a href="#ii-add-incident-workflow">Skyler adds the primary and secondary schedules to the incident workflow in the incident policy for the web application service</a></li>
            <li><a href="#ii-enable-incident-policy">Skyler enables the incident policy for the web application service</a></li>
      </ol>
   </embed>


.. raw:: html

   <embed>
      <h2 id="ii-create-primary-schedule">Skyler creates a schedule for primary coverage</h2>
   </embed>

#. Skyler creates a new schedule for primary coverage for the web application service and names it accordingly: **Web application service - primary**. 
#. Skyler adds a **WebApp** teams tag to make the schedule easier to find. The teams tag also sorts the list of responders so they're easier to find and select when Skyler adds them to a shift later. The following image shows the new schedule Skyler creates with the teams tag. 

.. image:: /_images/incident-intelligence/use-cases/Create_Schedule.png
      :width: 50%
      :alt: Create a primary schedule for the web application.

.. raw:: html

   <embed>
      <h3 id="ii-create-business-shift">Skyler creates a business-hours shift</h3>
   </embed>

Skyler creates a business-hours shift in the primary schedule for the web application. Using the day-by-day shift type, Skyler creates the nightly gap in coverage for the business-hours shift. Skyler selects a shift handoff of **5** and adds the SREs as responders as shown in the following image.


.. image:: /_images/incident-intelligence/use-cases/Business-Hours-Shift.png
      :width: 50%
      :alt: Business-hours shift in web service primary schedule.

Using the :guilabel:`Schedule Preview`, Skyler verifies that the business-hours shift is configured correctly. As shown in the following image, Alex is on call Monday through Friday from 8 AM to 5 PM for one week, and then Deepu, the next responder, takes over.

.. image:: /_images/incident-intelligence/use-cases/Business-Hours-Schedule-Preview.png
      :width: 99%
      :alt: Schedule Preview for business-hours.

.. raw:: html

   <embed>
      <h3 id="ii-create-weeknights-shift">Skyler creates a weeknights shift</h3>
   </embed>

Next, Skyler creates a weeknights shift in the primary schedule for the web application. Using the :guilabel:`Day-by-day` shift type, Skyler creates the daily gap in coverage they need for the business-hours shift. There are only four weeknights to cover because Fridays are covered by the weekends shift, so Skyler selects a shift handoff of 4. Finally, Skyler adds the SREs as responders, as shown in the following image. 

.. image:: /_images/incident-intelligence/use-cases/Weeknights-Shift.png
      :width: 50%
      :alt: Weeknights shift in web service primary schedule.

Using the :guilabel:`Schedule Preview`, shown in the following image, Skyler notices that because of the way the responders are ordered in the shifts, some responders have a weeknights shift that immediately follows their business-hours shift. The order of shifts that Skyler sees is shown in the following image.

.. image:: /_images/incident-intelligence/use-cases/Back-To-Back-Shifts.png
      :width: 99%
      :alt: Schedule Preview with back-to-back responder shifts.

Skyler reorders the responders so that the responders have a week off between their business-hours shift and their weeknights shift. Skyler then uses the :guilabel:`Schedule Preview`, shown in the following image, to confirm that the responders are ordered appropriately.

.. image:: /_images/incident-intelligence/use-cases/Reordered-Responders.png
      :width: 99%
      :alt: Schedule Preview with reordered responders.

.. raw:: html

   <embed>
      <h3 id="ii-create-weekends-shift">Skyler creates a weekends shift</h3>
   </embed>

Finally, Skyler creates a weekends shift in the primary schedule for the web application service. For the weekends shift, Skyler uses the :guilabel:`Week-by-week` shift type, as there is no gap in coverage, and selects **1** for the shift handoff. The following image shows the weekends shift within the primary schedule for the web application service. 

.. image:: /_images/incident-intelligence/use-cases/Weekends-Shift.png
      :width: 50%
      :alt: Weekends shift in web service primary schedule.

Skyler wants the responder for the weeknights shift to be the same as the responder for the subsequent weekends shift. Skyler uses the :guilabel:`Schedule Preview`, shown in the following image, to confirm that the responders are in the correct order. 

.. image:: /_images/incident-intelligence/use-cases/Weekends-Schedule-Preview.png
      :width: 50%
      :alt: Weekends shift Schedule Preview.

.. raw:: html

   <embed>
      <h2 id="ii-create-secondary-schedule">Skyler creates a schedule for secondary coverage with a 24x7 shift</h2>
   </embed>

Skyler creates a new schedule for secondary coverage for the web application service and names it accordingly: **Web application service - secondary**. Skyler adds the **WebApp** teams tag again to make the schedule easier to find. The teams tag also sorts the list of responders so they’re easier to find and select when Skyler adds them to a shift later. The following image shows the new schedule Skyler creates with the teams tag. 

.. image:: /_images/incident-intelligence/use-cases/Create_secondary_schedule.png
      :width: 50%
      :alt: Create a secondary schedule for the web application.

.. raw:: html

   <embed>
      <h3>Skyler creates a 24x7 shift within the schedule for secondary coverage</h3>
   </embed>

Skyler creates a 24x7 shift in the secondary schedule for the web application. Using the :guilabel:`Week-by-week` shift type, Skyler creates 24x7 as secondary coverage for one week, Monday through Sunday. Skyler selects a shift handoff of **1** and adds the SREs as responders.

.. image:: /_images/incident-intelligence/use-cases/24x7_shift.png
      :width: 50%
      :alt: 24x7 shift in web service secondary schedule.

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the primary and secondary schedules to the incident workflow</h2>
   </embed>

Skyler adds the primary and secondary schedules as the first and second steps in the :guilabel:`Incident workflow` for the incident policy for the web application service. The incident workflow that Skyler creates is shown in the following image:

.. image:: /_images/incident-intelligence/use-cases/add_to_incident_workflow.png
      :width: 99%
      :alt: Add schedules as first and second steps in the incident workflow within the web application service incident policy.

.. raw:: html

   <embed>
      <h2 id="ii-enable-incident-policy">Skyler enables the incident policy for the web application service</h2>
   </embed>

With the schedules configured and added to the incident policy, Skyler enables the incident policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedules.

.. raw:: html

   <embed>
      <h2>Summary</h2>
   </embed>

Skyler created the coverage they need by creating the following schedules and shifts:

* A primary schedule for the web application service with two shifts: 
   * A day-by-day shift for business-hours coverage 
   * A day-by-day shift for weeknights coverage
* A secondary schedule for the web application service with one shift: 
   * A week-by-week shift for weekends coverage

Skyler added the schedules as the first and second steps in the incident workflow in the incident policy for the web application service. Skyler then enabled the policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.

.. raw:: html

   <embed>
      <h2>Learn more</h2>
   </embed>

* For steps to set up an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
* For steps to create an incident policy, including steps for incident workflows, see :ref:`ii-create-configure-incident-policies`.