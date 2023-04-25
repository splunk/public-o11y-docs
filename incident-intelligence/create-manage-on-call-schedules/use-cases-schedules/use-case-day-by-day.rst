.. _ii-use-case-day-by-day:

Use case: Create every-other-day coverage using the day-by-day shift type
***************************************************************************

.. meta::
   :description: Schedule use case for every-other-day coverage in Incident Intelligence.

Skyler, the site reliability engineering (SRE) manager for Buttercup Industries, needs to create a on-call schedule for the checkout service SREs with the following coverage needs:

- Skyler needs coverage for the checkout service Monday through Sunday.
- Skyler wants to schedule his SREs so that they are on call every other day. He wants to create 2 rotations:
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

.. image:: /_images/incident-intelligence/use-cases/Day-by-day-create-schedule.png
      :width: 50%
      :alt: Create a schedule for the checkout service.

.. raw:: html

   <embed>
      <h2 id="ii-create-mwf-shift">Skyler creates a day-by-day shift for Monday, Wednesday, and Friday coverage</h2>
   </embed>

Skyler creates a M,W,F shift in the schedule for the checkout service. Using the day-by-day shift type Skyler creates the every-other-day coverage they need Day-by-day shifts are designed to span 24 hours or fewer on select days of the week. This option is best if you want to create short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.

Skyler selects a shift handoff of three, which and adds the SREs as responders. 

.. image:: /_images/incident-intelligence/use-cases/Business-Hours-Shift.png
      :width: 50%
      :alt: Business-hours shift in web service primary schedule.

Using the schedule preview, Skyler verifies that the business-hours shift is configured correctly. Alex is on call Monday-Friday from 8 AM to 5 PM for one week and then Deepu, the next responder, takes over.

.. image:: /_images/incident-intelligence/use-cases/Business-Hours-Schedule-Preview.png
      :width: 99%
      :alt: Schedule preview for business-hours.

.. raw:: html

   <embed>
      <h2 id="ii-create-trss-shift">Skyler creates a day-by-day shift for Tuesday,Thursday, Saturday, and Sunday coverage</h2>
   </embed>

Day-by-day shifts are configured to span 24 hours on select days of the week. This option is best if you want to create short-term shifts that are staggered on specific days of the week, with responders rotating on a more frequent basis.

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Heroes team, web application service". Select the checkmark icon to save your schedule name. 
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears. 
#. Enter a shift name. For this example, enter "Weekday coverage, business hours".
#. Select a shift start date.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` menu.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` menu. You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a day-by-day shift that includes coverage for business hours Monday to Friday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. For an example of a multi-shift schedule, see the next scenario

.. raw:: html

   <embed>
      <h2 id="ii-add-incident-workflow">Skyler adds the primary and secondary schedules to the incident workflow in the incident policy for the web application service</h2>
   </embed>

Skyler adds the primary and secondary schedules as the first and second step in the incident workflow for the incident policy for the web application service. 

.. image:: /_images/incident-intelligence/use-cases/add_to_incident_workflow.png
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