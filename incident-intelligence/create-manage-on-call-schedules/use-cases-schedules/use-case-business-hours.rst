.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-use-case-business-hours:

Use case: Business hours and nights-and-weekend rotation for the web application service
*********************************************************************************************

.. meta::
   :description: Schedule use case for Incident Intelligence for a business hours and nights-and-weekends rotation.

Skyler, the site reliability engineering (SRE) manager for Buttercup Industries, needs to create a on-call schedule for the web application SREs with the following coverage needs:

- Skyler needs coverage for the web application service for business hours Monday through Friday of each week, with one responder on the team being on call for a whole week.
- Skyler also needs coverage for the web application service for nights and weekends. Night coverage is 5 PM to 8 AM Monday through Friday. Weekend coverage is one responder who is on call from Friday at 5 PM to Monday at 8 AM.
- Finally, Skyler needs one responder on call 24x7 as secondary coverage for one week Monday through Sunday.

For these coverage needs, Skyler takes the following steps to configure a schedule that meets these coverage needs:

.. raw:: html

   <embed>
      <ol>
            <li><a href="#ii-create-primary-schedule">Sklyer creates a schedule for the primary coverage that includes three shifts:</a>
                  <ol>
                        <li><a href="#ii-create-business-shift">Skyler creates a business-hours shift</a></li>
                        <li><a href="#ii-create-weeknights-shift">Skyler creates a weeknights shift</a></li>
                        <li><a href="#ii-create-weekends-shift">Skyler creates a weekends shift</a></li>
                  </ol>

            </li>
            <li><a href="#ii-create-secondary-schedule">Skyler creates a schedule for secondary coverage with a 24x7 shift</a></li>
            <li><a href="#ii-add-incident-workflow">Skyler adds the primary and secondary schedules to the incident workflow in the incident policy for the web application service</a></li>
            <li><a href="#ii-enable-incident-policy">Skyler enables the web application service</a></li>
      </ol>
   </embed>


.. raw:: html

   <embed>
      <h2 id="ii-create-primary-schedule">Skyler creates a schedule for primary coverage</h2>
   </embed>

Skyler creates a new schedule for primary coverage for the web application service and names it accordingly: Web application - primary. Skyler adds a WebApp teams tag to make the schedule easier to find. The teams tag also sorts the list of responders so they're easier to find and select when Skyler adds them to a shift later.

.. image:: /_images/incident-intelligence/Create_Schedule.png
      :width: 50%
      :alt: Create a primary schedule for the web application.

.. raw:: html

   <embed>
      <h3 id="ii-create-business-shift">Skyler creates a business-hours shift</h3>
   </embed>

Skyler creates a business-hours shift in the primary schedule for the web application. Using the day-by-day shift type Skyler creates the nightly gap in coverage they need. Skyler selects a shift handoff of five and adds the SREs as responders. 


.. image:: /_images/incident-intelligence/Business-Hours-Shift.png
      :width: 50%
      :alt: Business-hours shift in web service primary schedule.

Using the schedule preview, Skyler verifies that the business-hours shift is configured correctly. Alex is on call Monday-Friday from 8 AM to 5 PM for one week and then Deepu, the next responder, takes over.

.. image:: /_images/incident-intelligence/Business-Hours-Schedule-Preview.png
      :width: 99%
      :alt: Schedule preview for business-hours.

.. raw:: html

   <embed>
      <h3 id="ii-create-weeknights-shift">Skyler creates a weeknights shift</h3>
   </embed>

Next, Skyler creates a weeknights shift in the primary schedule for the web application. Using the day-by-day shift type Skyler creates the daily gap in coverage they need. Skyler selects a shift handoff of four, as there are only four weeknights to cover since Friday is covered by the weekends shift. Finally, Skyler adds the SREs as responders. 

.. image:: /_images/incident-intelligence/Weeknights-Shift.png
      :width: 50%
      :alt: Weeknights shift in web service primary schedule.

Using the schedule preview, Skyler notices that the way the responders are ordered in the shifts, there are responders who have a weeknights shift that immediately follows their business-hours shift. 

.. image:: /_images/incident-intelligence/Back-To-Back-Shifts.png
      :width: 99%
      :alt: Schedule preview with back-to-back responder shifts.

Skyler reorders the responders so responders have a week off between their business-hours shift and their weeknights shift and uses the schedule preview to confirm that the responders are ordered appropriately.

.. image:: /_images/incident-intelligence/Reordered-Responders.png
      :width: 99%
      :alt: Schedule preview with reordered responders.

.. raw:: html

   <embed>
      <h3 id="ii-create-weekends-shift">Skyler creates a weekends shift</h3>
   </embed>

Finally, Skyler creates a weekends shift in the primary schedule for the web application service. For the weekend shift Skyler uses the week-by-week shift type, as there is no gap in coverage, and selects one for the shift handoff.

.. image:: /_images/incident-intelligence/Weekends-Shift.png
      :width: 50%
      :alt: Weekends shift in web service primary schedule.

Skyler wants the responder for the weeknights shift to be the same as the subsequent weekends shift. Skyler uses the schedule preview to confirm that the responders are in the correct order to achieve this.

.. image:: /_images/incident-intelligence/Weekends-Shift.png
      :width: 50%
      :alt: Weekends shift schedule preview.

.. raw:: html

   <embed>
      <h2 id="ii-create-secondary-schedule">Skyler creates a schedule for secondary coverage with a 24x7 shift</h2>
   </embed>

Skyler creates a new schedule for secondary coverage for the web application service and names it accordingly: Web application - secondary. Skyler adds the WebApp teams tag again to make the schedule easier to find. The teams tag also sorts the list of responders so they’re easier to find and select when Skyler adds them to a shift later.

.. image:: /_images/incident-intelligence/Create_secondary_schedule.png
      :width: 50%
      :alt: Create a secondary schedule for the web application.

.. raw:: html

   <embed>
      <h3>Skyler creates a 24x7 shift within the schedule for secondary coverage</h3>
   </embed>

Skyler creates a 24x7 shift in the secondary schedule for the web application. Using the week-by-week shift type Skyler creates 24x7 as secondary coverage for one week Monday through Sunday. Skyler selects a shift handoff of one and adds the SREs as responders.

.. image:: /_images/incident-intelligence/24x7_shift.png
      :width: 50%
      :alt: 24x7 shift in web service secondary schedule.

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the primary and secondary schedules to the incident workflow in the incident policy for the web application service</h2>
   </embed>

Skyler adds the primary and secondary schedules as the first and second step in the incident workflow for the incident policy for the web application service. 

.. image:: /_images/incident-intelligence/add_to_incident_workflow.png
      :width: 99%
      :alt: Add schedules as first and second steps in the incident workflow within the web application service incident policy.

.. raw:: html

   <embed>
      <h2 id="ii-enable-incident-policy">Skyler enables the web application service</h2>
   </embed>

With the schedules configured and added to the incident policy, Skyler then enables the incident policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedules.


.. raw:: html

   <embed>
      <h2>Summary</h2>
   </embed>

.. raw:: html

   <embed>
      <h2>Learn more</h2>
   </embed>

* For steps to set up an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
* For steps to create an incident policy, including steps for incident workflows, see :ref:`ii-create-configure-incident-policies`.