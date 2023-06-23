.. _ii-scenario-week-by-week:

Scenario: Skyler creates weekly coverage using the Week-by-week shift type
*****************************************************************************

.. meta::
   :description: Schedule scenario for creating a weekly rotation in Incident Intelligence.

Skyler, the site reliability engineering (SRE) manager for Buttercup Games, needs to create an on-call schedule for SREs with weekly 24x7 coverage for the payment service Monday through Sunday.

Skyler takes the following steps to configure a schedule that meets these coverage needs:

.. raw:: html

   <embed>
      <ol>
            <li><a href="#ii-create-schedule">Skyler creates a schedule for the payment service</a>
            <li><a href="#ii-create-shift">Skyler creates a week-by-week shift for Monday through Sunday</a></li>
            <li><a href="#ii-add-incident-workflow">Skyler adds the schedule to the incident workflow</a></li>
            <li><a href="#ii-enable-incident-policy">Skyler enables the incident policy for the payment service</a></li>
      </ol>
   </embed>

.. raw:: html

   <embed>
      <h2 id="ii-create-schedule">Skyler creates a schedule for the payment service</h2>
   </embed>

Skyler creates a new schedule for the payment service and names it accordingly: **Payment service**. Skyler adds a **Payment** teams tag to make the schedule easier to find. The teams tag also sorts the list of responders so they're easier to find and select when Skyler adds them to a shift later. The following image shows the new schedule Skyler creates with the teams tag. 

.. image:: /_images/incident-intelligence/use-cases/Week-by-week-create-payment-schedule.png
      :width: 50%
      :alt: Create a schedule for the payment service.

.. raw:: html

   <embed>
      <h2 id="ii-create-shift">Skyler creates a week-by-week shift for weekly coverage</h2>
   </embed>

Skyler creates a weekly shift in the schedule for the payment service. Using the :guilabel:`Week-by-week` shift type Skyler creates the weekly coverage they need. Week-by-week shifts are designed to span over one week and repeat every week and are ideal for creating a long-term shift that spans the course of two to seven days, with responders rotating on a less frequent basis. 

Skyler selects a shift handoff of **1**, which configures the shift to assign the same responder as on call for the entire week, Monday through Sunday. Skyler then adds the SREs as responders. The weekly shift that Skyler creates is shown in the following image.

.. image:: /_images/incident-intelligence/use-cases/Week-by-week-shift.png
      :width: 50%
      :alt: Weekly shift in payment schedule.

Using the :guilabel:`Schedule Preview`, Skyler verifies that they configured the weekly shift correctly. As shown in the following image, Alex is on call Monday, through Sunday for 24 hours, and then the next responder takes over.

.. image:: /_images/incident-intelligence/use-cases/Week-by-week-preview.png
      :width: 99%
      :alt: Schedule Preview for weekly shift.

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the payment schedule to the incident workflow</h2>
   </embed>

Skyler adds the payment schedule as the first step of the :guilabel:`Incident workflow` for the payment service incident policy. The incident workflow that Skyler creates is shown in the following image.

.. image:: /_images/incident-intelligence/use-cases/Week-by-week-incident-policy.png
      :width: 99%
      :alt: Add schedule as first step in the incident workflow within the payment service incident policy.

.. raw:: html

   <embed>
      <h2 id="ii-enable-incident-policy">Skyler enables the incident policy for the payment service</h2>
   </embed>

With the schedule configured and added to the incident policy, Skyler enables the incident policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.


.. raw:: html

   <embed>
      <h2>Summary</h2>
   </embed>

Skyler created the weekly Monday through Sunday coverage they need by creating a single schedule for the payment service with a week-by-week shift. Skyler added the schedule to the incident workflow in the incident policy for the payment service. Skyler then enabled the policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.

.. raw:: html

   <embed>
      <h2>Learn more</h2>
   </embed>

* For steps to set up an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
* For steps to create an incident policy, including steps for incident workflows, see :ref:`ii-create-configure-incident-policies`.
* For a scenario with a multi-shift schedule and primary and secondary coverage, see :ref:`ii-scenario-business-hours`.
