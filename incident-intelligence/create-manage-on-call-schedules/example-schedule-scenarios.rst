.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-example-schedule-scenarios:

WIP Example on-call schedule scenarios
************************************************************************

.. meta::
   :description:

Review these common example schedule scenarios and the steps to create them in Incident Intelligence to better understand how to create on-call schedules. 

Example schedule scenario one: Week-by-week coverage
==========================================================

Week-by-week shifts let you define coverage that is consistent week after week. For example, one responder that covers weekends from 5 PM Friday to 8 AM Monday for 4 weeks. Follow these steps to set up this example scenario.

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
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
#. Under :guilabel:`Add team members`, add one or more team members to the shift.
#. Enter team member names and select them when they appear. 
#. Drag team members in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a week-by-week shift that includes coverage for weekends from 5 PM Friday to 8 AM Monday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component.

Example schedule scenario two: Day-by-day coverage
=====================================================

Day-by-day shifts let you define coverage specific days of the week. For example, one responder that covers Monday-Friday from 8 AM to 5 PM for 1 week. Follow these steps to set up this example scenario.

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
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
#. Under :guilabel:`Add team members`, add one or more team members to the shift.
#. Enter team member names and select them when they appear. 
#. Drag team members in the list to reorder.
#. Select :guilabel:`Save shift`. 

You now have a schedule with a day-by-day shift that includes coverage for business hours Monday-Friday. You can add additional shifts within this schedule to create coverage for other days of the week for this same team and environmental component.

Example schedule three: Business hours and nights-and-weekend rotation
=========================================================================

- You need coverage for your web application service from 9 AM to 5 PM on Monday through Friday of each week, with multiple people on the team being on call for a whole week at a time.
- You also need coverage for your web application service on the weekends. The weekend coverage is one person who is on call from Friday at 5 PM to Monday at 9 AM.

Example schedule scenario four: Limit notifications during business hours
============================================================================

See also
============

* :ref:`ii-whos-on-call`
* :ref:`ii-my-on-call-schedule`
* :ref:`ii-sync-on-call-schedule`