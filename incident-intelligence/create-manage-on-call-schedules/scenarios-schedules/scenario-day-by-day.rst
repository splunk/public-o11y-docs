.. _ii-scenario-day-by-day:

Scenario: Skyler creates every-other-day coverage using the Day-by-day shift type
***********************************************************************************

.. meta::
   :description: Schedule scenario for every-other-day coverage in Incident Intelligence.

Skyler, the site reliability engineering (SRE) manager for Buttercup Games, needs to create an on-call schedule for the checkout service SREs. To cover the checkout service Monday through Sunday and have the SREs on call every other day, Skyler wants to create two rotations:

   - Rotation 1: Monday, Wednesday, and Friday 24x7
   - Rotation 2: Tuesday, Thursday, Saturday, and Sunday 24x7

Skyler takes the following steps to configure a schedule that meets these coverage needs:

.. raw:: html

   <embed>
      <ol>
            <li><a href="#ii-create-schedule">Skyler creates a schedule for the checkout service</a>
            <li><a href="#ii-create-mwf-shift">Skyler creates a day-by-day shift for Monday, Wednesday, and Friday coverage</a></li>
            <li><a href="#ii-create-trss-shift">Skyler creates a day-by-day shift for Tuesday, Thursday, Saturday, and Sunday coverage</a></li>
            <li><a href="#ii-add-incident-workflow">Skyler adds the schedule to the incident workflow in the incident policy for the checkout service</a></li>
            <li><a href="#ii-enable-incident-policy">Skyler enables the incident policy for the checkout service</a></li>
      </ol>
   </embed>

.. raw:: html

   <embed>
      <h2 id="ii-create-schedule">Skyler creates a schedule for the checkout service</h2>
   </embed>

Skyler creates a new schedule for the checkout service and names it accordingly: **Checkout service**. Skyler adds a **Checkout** teams tag to make the schedule easier to find. The teams tag also sorts the list of responders so they're easier to find and select when Skyler adds them to a shift later. The following image shows the new schedule Skyler creates with the teams tag. 

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-create-checkout-schedule.png
      :width: 50%
      :alt: Create a schedule for the checkout service.

.. raw:: html

   <embed>
      <h2 id="ii-create-mwf-shift">Skyler creates a day-by-day shift for Monday, Wednesday, and Friday coverage</h2>
   </embed>

#. Skyler creates a shift named **M,W,F** in the schedule for the checkout service. 
#. Using the :guilabel:`Day-by-day` shift type, Skyler creates the every-other-day coverage they need. Day-by-day shifts are designed to span 24 hours or fewer on select days of the week and are ideal for short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.
#. Skyler selects a shift handoff of **3**, which configures the shift to assign the same responder as on call for Monday, Wednesday, and Friday. Skyler then adds the SREs as responders. The following image shows the T,R,S,U shift within the schedule for the checkout service.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-MWF-shift.png
      :width: 50%
      :alt: M,W,F shift in checkout schedule.

Using the :guilabel:`Schedule Preview`, Skyler verifies that they configured the **M,W,F** shift correctly. As shown in the following image, Alex is on call Monday, Wednesday, and Friday for 24 hours, and then the next responder takes over.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-MWF-preview.png
      :width: 99%
      :alt: Schedule Preview for M,W,F shift.

.. raw:: html

   <embed>
      <h2 id="ii-create-trss-shift">Skyler creates a day-by-day shift for Tuesday, Thursday, Saturday, and Sunday coverage</h2>
   </embed>

#. Skyler creates a shift named, T,R,S,U in the schedule for the checkout service. 
#. Using the :guilabel:`Day-by-day` shift type, Skyler creates the every-other-day coverage they need. Day-by-day shifts are designed to span 24 hours or fewer on select days of the week and are ideal for creating short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.
#. Skyler selects a shift handoff of **4**, which configures the shift to assign the same responder as on call for Tuesday, Thursday, Saturday, and Sunday. Skyler then adds the SREs as responders. 

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-TRSU-Shift.png
      :width: 50%
      :alt: T,R,S,U shift in checkout schedule.

Using the :guilabel:`Schedule Preview`, Skyler verifies that they configured the **T,R,S,U** shift correctly. As shown in the following image, Alex is on call Tuesday, Thursday, Saturday, and Sunday for 24 hours, and then the next responder takes over.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-TRSU-preview.png
      :width: 99%
      :alt: Schedule Preview for T,R,S,U shift.

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the checkout schedule to the incident workflow</h2>
   </embed>

Skyler adds the checkout schedule as the first step of the :guilabel:`Incident workflow` for the checkout service incident policy. The incident workflow that Skyler creates is shown in the following image.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-incident-policy.png
      :width: 99%
      :alt: Add schedule as first step in the incident workflow within the checkout service incident policy.

.. raw:: html

   <embed>
      <h2 id="ii-enable-incident-policy">Skyler enables the incident policy for the checkout service</h2>
   </embed>

With the schedule configured and added to the incident policy, Skyler enables the incident policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.


.. raw:: html

   <embed>
      <h2>Summary</h2>
   </embed>

Skyler created the every-other-day coverage they need by creating a single schedule for the checkout service with two day-by-day shifts: one shift for Monday, Wednesday, and Friday coverage and a second shift for Tuesday, Thursday, Saturday, and Sunday coverage. Skyler added the schedule to the incident workflow in the incident policy for the checkout service. Skyler then enabled the policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.

.. raw:: html

   <embed>
      <h2>Learn more</h2>
   </embed>

* For steps to set up an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
* For steps to create an incident policy, including steps for incident workflows, see :ref:`ii-create-configure-incident-policies`.
* For a scenario with a multi-shift schedule and primary and secondary coverage, see :ref:`ii-scenario-business-hours`.