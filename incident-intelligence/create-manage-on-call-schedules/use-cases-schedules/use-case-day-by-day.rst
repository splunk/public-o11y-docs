.. _ii-use-case-day-by-day:

Use case: Create every-other-day coverage using the day-by-day shift type
***************************************************************************

.. meta::
   :description: Schedule use case for every-other-day coverage in Incident Intelligence.

Skyler, the site reliability engineering (SRE) manager for Buttercup Industries, needs to create a on-call schedule for the checkout service SREs with the following coverage needs:

- Skyler needs coverage for the checkout service Monday through Sunday.
- Skyler wants to schedule his SREs so that they are on call every other day. He wants to create two rotations:
   - Rotation 1: Monday, Wednesday, and Friday 24x7
   - Rotation 2: Tuesday, Thursday, Saturday, and Sunday 24x7

For these coverage needs, Skyler takes the following steps to configure a schedule that meets these coverage needs:

.. raw:: html

   <embed>
      <ol>
            <li><a href="#ii-create-schedule">Sklyer creates a schedule for the checkout service</a>
            <li><a href="#ii-create-mwf-shift">Skyler creates a day-by-day shift for Monday, Wednesday, and Friday coverage</a></li>
            <li><a href="#ii-create-trss-shift">Skyler creates a day-by-day shift for Tuesday,Thursday, Saturday, and Sunday coverage</a></li>
            <li><a href="#ii-add-incident-workflow">Skyler adds the schedule to the incident workflow in the incident policy for the checkout service</a></li>
            <li><a href="#ii-enable-incident-policy">Skyler enables the checkout service</a></li>
      </ol>
   </embed>

.. raw:: html

   <embed>
      <h2 id="ii-create-schedule">Sklyer creates a schedule for the checkout service</h2>
   </embed>

Skyler creates a new schedule for the checkout service and names it accordingly. Skyler adds a Checkout teams tag to make the schedule easier to find. The teams tag also sorts the list of responders so they're easier to find and select when Skyler adds them to a shift later.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-create-checkout-schedule.png
      :width: 50%
      :alt: Create a schedule for the checkout service.

.. raw:: html

   <embed>
      <h2 id="ii-create-mwf-shift">Skyler creates a day-by-day shift for Monday, Wednesday, and Friday coverage</h2>
   </embed>

Skyler creates a M,W,F shift in the schedule for the checkout service. Using the day-by-day shift type Skyler creates the every-other-day coverage they need. Day-by-day shifts are designed to span 24 hours or fewer on select days of the week. This option is best if you want to create short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.

Skyler selects a shift handoff of three, which configures the shift to assign the same responder as on call for Monday, Wednesday, and Friday. Skyler then adds the SREs as responders. 

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-MWF-shift.png
      :width: 50%
      :alt: M,W,F shift in checkout schedule.

Using the schedule preview, Skyler verifies that they configured the M,W,F shift correctly. Alex is on call Monday, Wednesday, and Friday for 24 hours and then the next responder takes over.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-MWF-preview.png
      :width: 99%
      :alt: Schedule preview for M,W,F shift.

.. raw:: html

   <embed>
      <h2 id="ii-create-trss-shift">Skyler creates a day-by-day shift for Tuesday,Thursday, Saturday, and Sunday coverage</h2>
   </embed>

Skyler creates a T,R,S,U shift in the schedule for the checkout service. Using the day-by-day shift type Skyler creates the every-other-day coverage they need. Day-by-day shifts are designed to span 24 hours or fewer on select days of the week. This option is best if you want to create short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.

Skyler selects a shift handoff of four, which configures the shift to assign the same responder as on call for Tuesday, Thursday, Saturday, and Sunday. Skyler then adds the SREs as responders. 

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-TRSU-shift.png
      :width: 50%
      :alt: T,R,S,U shift in checkout schedule.

Using the schedule preview, Skyler verifies that they configured the T,R,S,U shift correctly. Alex is on call Tuesday, Thursday, Saturday, and Sunday for 24 hours and then the next responder takes over.

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-TRSU-preview.png
      :width: 99%
      :alt: Schedule preview for T,R,S,U shift.

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the checkout schedule to the incident workflow in the incident policy for the checkout service</h2>
   </embed>

Skyler adds the checkout schedule as the first step in the incident workflow for the incident policy for the checkout service. 

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-incident-policy.png
      :width: 99%
      :alt: Add schedule as first step in the incident workflow within the checkout service incident policy.

.. raw:: html

   <embed>
      <h2 id="ii-enable-incident-policy">Skyler enables the checkout service</h2>
   </embed>

With the schedule configured and added to the incident policy, Skyler then enables the incident policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.


.. raw:: html

   <embed>
      <h2>Summary</h2>
   </embed>

Skyler created the every-other-day coverage they needs by creating a single schedule for the checkout service with two day-by-day shifts: one shift for Monday, Wednesday, and Friday coverage and second for Tuesday, Thursday, Saturday, and Sunday coverage. Skyler added the schedule to the incident workflow in the incident policy for the checkout service. Skyler then enabled the policy so that alerts begin flowing and triggering incidents that notify the responders in the newly-configured schedule.

.. raw:: html

   <embed>
      <h2>Learn more</h2>
   </embed>

* For steps to set up an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
* For steps to create an incident policy, including steps for incident workflows, see :ref:`ii-create-configure-incident-policies`.