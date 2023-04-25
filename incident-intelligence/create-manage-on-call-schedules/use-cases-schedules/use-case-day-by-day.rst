.. _ii-use-case-day-by-day:

Use case: Create ________ coverage using the day-by-day shift type
************************************************************************

.. meta::
   :description: Schedule use case for creating business-hours and nights-and-weekends rotations in Incident Intelligence.

Day-by-day shifts let you define coverage for specific days of the week. For example, one responder covers Monday-Friday from 8 AM to 5 PM for 1 week. Follow these steps to set up this example.

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
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a day-by-day shift that includes coverage for business hours Monday-Friday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. For an example of a multi-shift schedule, see the next scenario

