.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-use-case-business-hours:

Limit notifications for the checkout service to business hours
*********************************************************************************************

.. meta::
   :description: Schedule use case for Incident Intelligence for limiting notifications to business hours.


If you  want responders to receive notifications only during business hours you can achieve this by creating a schedule with a business-hours shift that you add as the only step in the incident workflow for the service.

Create a schedule
====================================================================================================

Follow these steps to create your primary schedule:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`On-call schedules` tab.
#. Select :guilabel:`Create new schedule`.
#. Select the pencil icon to edit the schedule name. For this example, name the schedule "Victors team, checkout service". Select the checkmark icon to save your schedule name.  
#. (Optional) Add a teams tag if you want to associate your schedule with a team. The teams tag makes finding a schedule in an incident workflow easier. It also sorts the team members at the top of the responder list when adding responders to your schedule shifts. To add a teams tag, enter the team name in the :guilabel:`Teams tag` field and select the team when it appears.

Create a business-hours shift
====================================================================================================

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
====================================================================================================

Your last step to create the schedule for this scenario is to add your schedule to the incident workflow for your checkout service. 

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select the :guilabel:`Services` tab.
#. Locate your checkout service and select :guilabel:`Edit` from the :guilabel:`Actions` menu.
#. Select the :guilabel:`Incident workflows` tab.
#. Add the schedule to the first step. 
    #.  Select :guilabel:`Configure invite` under :guilabel:`Immediately`.
    #.  Enter the schedule name "Victors team, checkout service" in the :guilabel:`Search schedules` field and select the schedule when it appears.
    #.  Select :guilabel:`Add responders`.
#. Select :guilabel:`Save workflow`.
