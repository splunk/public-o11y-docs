.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-schedule-scenarios:

On-call schedule scenarios
************************************************************************

.. meta::
   :description: Applied on-call schedule scenarios to help you learn how to create on-call schedules for Incident Intelligence in Splunk Observability Cloud.

Find the scenario that fits your situation to learn how to create your on-call schedule. For basic on-call schedule creation steps see :ref:`ii-create-manage-on-call-schedules`.

Scenario 1: Week-by-week coverage
==========================================================

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
#. Select :guilabel:`Fridays` at :guilabel:`05:00 PM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`4` to have the same responder cover the weekend shift for 4 weeks. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a week-by-week shift that includes coverage for weekends from 5 PM Friday to 8 AM Monday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. See :ref:`scenario-three` for an example of a multi-shift schedule. 

Scenario 2: Day-by-day coverage
=====================================================

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

You now have a schedule with a day-by-day shift that includes coverage for business hours Monday-Friday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. For an example of a multi-shift schedule, see the next scenario.

.. _scenario-three:

Scenario 3: Business hours and nights-and-weekend rotation for the web application service
==========================================================================================================

Coverage needs:

- You need coverage for your web application service for business hours Monday through Friday of each week, with one responder on the team being on call for a whole week.
- You also need coverage for your web application service for nights and weekends. Night coverage is 5 PM to 8 AM Monday through Friday. Weekend coverage is one responder who is on call from Friday at 5 PM to Monday at 9 AM.
- Finally, you need one responder on call 24x7 as secondary coverage for one week Monday through Sunday.

For these coverage needs, you need to create two schedules, one for the primary coverage that includes three shifts: one for business hours, a second for nights coverage, and a third for weekends. The second schedule is your schedule for secondary coverage. Finally, you need to add these schedules to two steps in the incident workflow for the web application service. Follow these steps to create schedules for these coverage needs. 

Create a schedule for primary coverage
----------------------------------------

Follow these steps to create your primary schedule:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Heroes team, web application service, primary". Select the checkmark icon to save your schedule name.  
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears.

Create a business-hours shift
-------------------------------

Follow these steps to create a day-by-day shift for business hours coverage:

#. Select :guilabel:`Add new shift`
#. Enter a shift name. For this example, enter "Business hours".
#. Select a Monday for your shift start date to correctly configure this shift for Monday-Friday.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5` to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift is on-call on the start date you selected. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a weeknights shift
------------------------------------

Follow these steps to create a day-by-day shift for weeknight coverage:

#. Enter a shift name. For this example, enter "Weeknights".
#. Select a shift start date that is the same Monday you selected in your business hours shift.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily end time` drop-down list. You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5` to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift is on-call on the start date you selected in step 2. If there is an overlap in the responders across your shifts, use the schedule preview to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a weekends shift
------------------------------------

Follow these steps to create a week-by-week shift for weekend coverage:

#. Enter a shift name. For this example, enter "Weekends".
#. Select a shift start date that is the Friday that follows the Monday you selected in your previous shifts.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Fridays` at :guilabel:`05:00 PM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5` to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift is on-call on the start date you selected in step 2. For this shift, start with the same responder you added first in the weeknight shift so that that responder is on call for the weeknights shift and the subsequent weekends shift. Use the schedule preview to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a schedule for secondary coverage
-------------------------------------------

Follow these steps to create your secondary schedule:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Heroes team, web application service, secondary". Select the checkmark icon to save your schedule name. 
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears. 

Create a 24x7 shift
------------------------------------

Follow these steps to create a week-by-week shift for secondary 24x7 coverage:

#. Enter a shift name. For this example, enter "24x7".
#. For the shift start date select the Monday that follows the Monday you selected for your business hours shift.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`1` to have the same responder cover one week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift is on-call on the start date you selected in step 2. If there is an overlap between your primary and secondary responders, use the schedule preview for your primary schedule to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`.

Add your primary and secondary schedules to the incident workflow for the web application service
-------------------------------------------------------------------------------------------------------

Your last step to for this scenario is to add your primary and secondary schedules to the incident workflow for your web application service. 

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`Incident policies` tab.
#. Locate your web application service and select :guilabel:`Edit` from the :guilabel:`Actions` menu.
#. Select the :guilabel:`Incident workflows` tab.
#. Add the primary schedule to the first step. 
    #.  Select :guilabel:`Configure invite` under :guilabel:`Immediately`.
    #.  Enter the schedule name "Heroes team, web application, primary" in the :guilabel:`Search schedules` field and select the schedule when it appears.
    #.  Select :guilabel:`Add responders`.
#. Add the secondary schedule to the second step. 
    #. In the second step, select a time interval next to :guilabel:`If unacknowledged after`; this is the length of time you want to pass before paging the responder on call in your secondary schedule.
    #. Select :guilabel:`Configure invite`.
    #.  Enter the schedule name "Heroes team, web application, secondary" in the :guilabel:`Search schedules` field and select the schedule when it appears.
    #.  Select :guilabel:`Add responders`.
#. Select :guilabel:`Save workflow`.

Scenario 4: Limit notifications for the checkout service to business hours
====================================================================================================

If you  want responders to receive notifications only during business hours you can achieve this by creating a schedule with a business-hours shift that you add as the only step in the incident workflow for the checkout service incident policy.

Create a schedule
----------------------------------------

Follow these steps to create your primary schedule:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Victors team, checkout service". Select the checkmark icon to save your schedule name.  
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears.

Create a business-hours shift
-------------------------------

Follow these steps to create a day-by-day shift for business hours coverage:

#. Select :guilabel:`Add new shift`.
#. Enter a shift name. For this example, enter "Business hours".
#. Select a shift start date on a Monday to correctly configure this shift for Monday-Friday.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5` to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift is on-call on the start date you selected. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Add your schedule to the incident workflow for the checkout service
-------------------------------------------------------------------------------------------------------

Your last step to create the schedule for this scenario is to add your schedule to the incident workflow for your checkout service. 

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`Incident policies` tab.
#. Locate your checkout service and select :guilabel:`Edit` from the :guilabel:`Actions` menu.
#. Select the :guilabel:`Incident workflows` tab.
#. Add the schedule to the first step. 
    #.  Select :guilabel:`Configure invite` under :guilabel:`Immediately`.
    #.  Enter the schedule name "Victors team, checkout service" in the :guilabel:`Search schedules` field and select the schedule when it appears.
    #.  Select :guilabel:`Add responders`.
#. Select :guilabel:`Save workflow`.



See also
============

* :ref:`ii-create-manage-on-call-schedules`
* :ref:`ii-whos-on-call`
* :ref:`ii-sync-on-call-schedule`