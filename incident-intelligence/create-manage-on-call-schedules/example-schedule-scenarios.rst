.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-example-schedule-scenarios:

Example on-call schedule scenarios
************************************************************************

.. meta::
   :description:

Review these common example schedule scenarios and the steps to create them in Incident Intelligence to better understand how to create on-call schedules. 

Example schedule scenario one: Week-by-week coverage
==========================================================

Week-by-week shifts let you define coverage that is consistent week after week. For example, one responder covers weekends from 5 PM Friday to 8 AM Monday for 4 weeks. Follow these steps to set up this example scenario.

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Heroes team, web application service". Select the :guilabel:`checkmark` icon to save your schedule name.  
#. Enter a shift name. For this example scenario, enter "Weekend coverage".
#. Select a shift start date.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Fridays` at :guilabel:`05:00 PM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`4`, to have the same responder cover the weekend shift for 4 weeks. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a week-by-week shift that includes coverage for weekends from 5 PM Friday to 8 AM Monday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. See :ref:`example-scenario-three` for an example of a multi-shift schedule. 

Example schedule scenario two: Day-by-day coverage
=====================================================

Day-by-day shifts let you define coverage for specific days of the week. For example, one responder covers Monday-Friday from 8 AM to 5 PM for 1 week. Follow these steps to set up this example scenario.

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Heroes team, web application service". Select the :guilabel:`checkmark` icon to save your schedule name.  
#. Enter a shift name. For this example scenario, enter "Weekday coverage, business hours".
#. Select a shift start date.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. (You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.)
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a day-by-day shift that includes coverage for business hours Monday-Friday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component. See :ref:`example-scenario-three` for an example of a multi-shift schedule. 

.. _example-scenario-three:

Example schedule three: Business hours and nights-and-weekend rotation for the web application service
==========================================================================================================

Schedule scenario coverage needs:

- You need coverage for your web application service for business hours Monday through Friday of each week, with one responder on the team being on call for a whole week.
- You also need coverage for your web application service for nights and weekends. Nights coverage is 5 PM to 8 AM Monday through Friday. Weekend coverage is one responder who is on call from Friday at 5 PM to Monday at 9 AM.
- Finally, you need one responder on call 24x7 as secondary coverage for one week Monday - Sunday.

To achieve these coverage needs, you need to create two schedules, one for the primary coverage that includes three shifts, one for business hours, one for nights coverage, and a third for weekends. The second schedule is your schedule for secondary coverage. Finally, you need to add these schedules to two steps in the incident workflow for the web application service. Follow these steps to create coverage for this example scenario.

Create a schedule for primary coverage
----------------------------------------

Follow these steps to create your primary schedule:

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Heroes team, web application, service primary". Select the :guilabel:`checkmark` icon to save your schedule name.  

Create a business-hours shift
-------------------------------

Follow these steps to create a day-by-day shift for business hours coverage:

#. Select :guilabel:`Add new shift`
#. Enter a shift name. For this example scenario, enter "Business hours".
#. Select a shift start date. Your start date should be a Monday to correctly configure this shift for Monday-Friday.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. (You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.)
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift will be on-call on the start date you selected in step 2. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a weeknights shift
------------------------------------

Follow these steps to create a day-by-day shift for weeknights coverage:

#. Enter a shift name. For this example scenario, enter "Weeknights".
#. Select a shift start date. Your start date should be the Monday you selected in your business hours shift.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily end time` drop-down list. (You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.)
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift will be on-call on the start date you selected in step 2. If there is an overlap in the responders across your shifts, use the schedule preview to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a weekends shift
------------------------------------

Follow these steps to create a week-by-week shift for weekends coverage:

#. Enter a shift name. For this example scenario, enter "Weekends".
#. Select a shift start date. Your start date should be the Friday that follows the Monday you selected in your previous shifts.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Fridays` at :guilabel:`05:00 PM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift will be on-call on the start date you selected in step 2. For this shift, start with the same responder you added first in the weeknight shift so that that responder is on call for the weeknights shift and the subsequent weekends shift. Use the schedule preview to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Create a schedule for secondary coverage
-------------------------------------------

Follow these steps to create your secondary schedule:

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Heroes team, web application service, secondary". Select the :guilabel:`checkmark` icon to save your schedule name.  

Create a 24x7 shift
------------------------------------

Follow these steps to create a week-by-week shift for secondary 24x7 coverage:

#. Enter a shift name. For this example scenario, enter "24x7".
#. Select a shift start date. Your start date should be the Monday that follows the Monday you selected for your business hours shift.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Week-by-week`.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Starts on` drop-down lists.
#. Select :guilabel:`Mondays` at :guilabel:`08:00 AM` in the :guilabel:`Ends on` drop-down lists.
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`1`, to have the same responder cover one week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift will be on-call on the start date you selected in step 2. If there is an overlap between your primary and secondary responders, use the schedule preview for your primary schedule to ensure each responder has enough time off between their on-call shifts. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`.

Add your primary and secondary schedules to the incident workflow for the web application service
-------------------------------------------------------------------------------------------------------

Your last step to achieve this schedule scenario is to add your primary and secondary schedules to the incident workflow for your web application service. To do so, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`Services` tab.
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

Example schedule scenario four: Limit notifications for the checkout service to business hours
====================================================================================================

If you only want responders to receive notifications during business hours you can achieve this by creating a schedule with a business-hours shift that you add as the only step in the incident workflow for the service.

Create a schedule
----------------------------------------

Follow these steps to create your primary schedule:

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the :guilabel:`pencil` icon to edit the schedule name. For this example scenario, name the schedule "Victors team, checkout service". Select the :guilabel:`checkmark` icon to save your schedule name.  

Create a business-hours shift
-------------------------------

Follow these steps to create a day-by-day shift for business hours coverage:

#. Select :guilabel:`Add new shift`
#. Enter a shift name. For this example scenario, enter "Business hours".
#. Select a shift start date. Your start date should be a Monday to correctly configure this shift for Monday-Friday.
#. Use the timezone picker to select the timezone for the coverage.
#. Under :guilabel:`Define shift coverage`, select :guilabel:`Day-by-day`.
#. Select :guilabel:`Monday` through :guilabel:`Friday`.
#. Select :guilabel:`08:00 AM` in the :guilabel:`Daily start time` drop-down list.
#. Select :guilabel:`05:00 PM` in the :guilabel:`Daily end time` drop-down list. (You need to uncheck :guilabel:`Create 24 hr shifts` to select a daily end time.)
#. Under :guilabel:`Customize shift handoff`, select :guilabel:`5`, to have the same responder cover the entire week. 
#. Under :guilabel:`Add responders`, add one or more responders to the shift. The first responder you add to the shift will be on-call on the start date you selected in step 2. 
    #. Enter responder names and select them when they appear. 
    #. Drag responders in the list to reorder.
#. Select :guilabel:`Save shift`. 

Add your schedule to the incident workflow for the checkout service
-------------------------------------------------------------------------------------------------------

Your last step to achieve this schedule scenario is to add your schedule to the incident workflow for your checkout service. To do so, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Management`.
#. Select the :guilabel:`Services` tab.
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
* :ref:`ii-my-on-call-schedule`
* :ref:`ii-sync-on-call-schedule`