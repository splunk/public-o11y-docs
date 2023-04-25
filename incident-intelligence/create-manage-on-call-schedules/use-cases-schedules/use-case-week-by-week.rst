.. _ii-use-case-week-by-week:

Use case: Create ________ coverage using the week-by-week shift type
************************************************************************

.. meta::
   :description: Schedule use case for creating business-hours and nights-and-weekends rotations in Incident Intelligence.

Week-by-week shifts let you define coverage that is consistent week after week. For example, one responder covers weekends from 5 PM Friday to 8 AM Monday for 4 weeks. Follow these steps to set up this example schedule.

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Heroes team, web application service". Select the checkmark icon to save your schedule name.  
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears.
#. Enter a shift name. For this example, enter "Weekend coverage".
#. Select a shift start date.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Fridays` at :guilabel:`05:00 PM` in the :guilabel:`Starts on` menu.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` menu.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`4` to have the same responder cover the weekend shift for 4 weeks. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a week-by-week shift that includes coverage for weekends from 5 PM Friday to 8 AM Monday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. See for an example of a multi-shift schedule. 