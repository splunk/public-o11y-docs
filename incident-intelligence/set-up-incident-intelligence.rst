:orphan:

.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _set-up-incident-intelligence:

************************************************************************
Set up Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: To route incidents to the necessary teams and people, you need to complete your incident response configuration.

Splunk Incident Intelligence is added to your Observability Cloud environment on your behalf. To route incidents to the necessary teams and people, you need to first ingest alerts and then complete your incident response configuration. Incident response configuration is where you define and configure services, and create on-call schedules. After you complete your incident response configuration, users can begin responding to incidents. Follow these steps to get started with Incident Intelligence:

#. :ref:`Ingest alerts.<ingest-alerts>`
#. :ref:`Define your service.<define-service>`
#. :ref:`Configure your service.<configure-service>`
#. :ref:`Create your on-call schedules.<on-call-schedules>`

.. _ingest-alerts:

Ingest alerts
================

Incident Intelligence ingests alerts from the following Observability Cloud event sources.

- Splunk APM
- Splunk Infrastructure Monitoring
- Splunk NPM

To ingest alerts into Incident Intelligence, you have to define a detector for the available event sources and route that detector to a service in Incident Intelligence. See :ref:`get-started-detectoralert` for more information about configuring detectors. See :ref:`define-service` and :ref:`configure-alert-routing` for steps to define a service and route alerts to the service. 

.. _define-service:

Define your service
=======================
Service-based routing automatically organizes and routes incidents depending on the impacted service. The service that an incident is associated with determines who is notified of an incident. 

To create a service, complete the following steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` > :guilabel:`Create service`.
#. Give your service a unique name and a description. 
#. Select :guilabel:`Create service`.

After you create your service, you are directed to configure your service with alert routing, alert rules, and incident workflows. 

.. _configure-service:

Configure your service
============================
Next, manage how alerts are handled for a specific service. To do so, you need to configure the service with alert routing, alert rules, and incident workflows. 

.. _configure-alert-routing:

Configure your service’s alert routing
-----------------------------------------

Use alert routing to associate alerts with a service. If an alert matches your alert filter conditions, it is routed to the service. To set up your alert routing for the service, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service you want to add alert routing conditions to.
#. On the :guilabel:`Alert Routing` tab, the list of alerts that are currently routed to the service display.
#. To filter the alerts routed to the service, select :guilabel:`Add Filters`. 
#. Select a filter field. Use :guilabel:`source` to route alerts based on a detector name. 
#. Select the :guilabel:`=` (equal to) or :guilabel:`!=` (not equal to) operator.
#. Select a filter value. 
#. Select enter to save your condition. 
#. Repeat steps 4-8 for any additional alert routing conditions that you want to set up. By default, multiple conditions are joined by an ``AND`` operator. To switch an ``AND`` operator to ``OR``, select the ``AND`` operator and select ``OR``.
#. Review the list of alerts that are currently routed to the service to confirm your filter conditions are correct. 
#. Select :guilabel:`Save alert routing` when you are finished setting up your alert routing conditions.

.. _configure-alert-grouping:

Configure your service’s alert grouping
------------------------------------------

Use alert grouping to manage which alerts create an incident and how alerts are grouped into incidents. Alert grouping is specific to each service and you can customize it to create the workflow that works for you. You can use alert severity to determine if an incident is created and also group alerts by time period. To configure alert grouping, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service you want to add alert grouping conditions to. Each service can have one alert grouping rule.
#. On the :guilabel:`Alert grouping` tab, select the minimum severity level you want to require for an incident to be triggered in the drop-down list next to :guilabel:`Trigger an incident when alerts reach severity level`.
#. If you want to group alerts into incidents, select :guilabel:`Group alerts from the same time period into incidents`, and then select a time period between 1 hour and 24 hours, from the drop-down list next to :guilabel:`Create a new incident if there is a pause in alerts for`.
#. Select :guilabel:`Save alert grouping`.

.. _configure-incident-workflows:

Configure your service’s incident workflow
-----------------------------------------------

Use incident workflows to determine who is notified when a new incident is triggered. To create an automatic incident workflow, add a series of escalating steps to notify responders of the incident. To add an incident workflow, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service where you want to create an incident workflow.
#. Select the :guilabel:`Incident workflows` tab. 
#. To add responders, select :guilabel:`Configure invite` under :guilabel:`Immediately`. 
#. In the :guilabel:`Configure invite` window add responders or schedules.
    #. Enter user names in the :guilabel:`Search people` field and select the user when they appear. Select the :guilabel:`X` icon to remove a responder. Repeat these steps until you have all the responders you want to invite to incidents for this service.
    #. Enter a schedule name in the :guilabel:`Search schedules` field and select the schedule when it appears. Select the :guilabel:`X` icon to remove a schedule. You can only select one schedule in a given incident workflow step.
#. Select :guilabel:`Add responders`.
#. Select :guilabel:`Add New Step` to add additional escalating steps with additional responders to your incident workflow.
#. Select an elapsed time period in the drop-down list next to :guilabel:`If unacknowledged after`.
#. Select :guilabel:`Configure invite` to add responders as you did in the previous steps.
#. Repeat these steps until you have a complete incident workflow for the service. 

.. _on-call-schedules:

Create your on-call schedules
=================================

An on-call schedule consists of one or more shifts, with members who rotate through a shift. Use an on-call schedule as a step in your service incident workflows.

Example schedule scenario
-----------------------------
Consider this example schedule scenario and use it in the following schedule-creation steps. 

- You create a web application service that you configure to route alerts from your web application. See :ref:`Define your service<define-service>` and :ref:`Configure your service’s alert routing<configure-alert-routing>` for steps to define a service and configure a service’s alert routing.
- You need coverage for your web application service from 9 AM to 5 PM on Monday through Friday of each week, with each person on the team being on call for a whole week at a time.
- You also need coverage for your web application service on the weekends. The weekend coverage is one person who is on call from Friday at 5 PM to Monday at 9 AM.

Create an on-call schedule
-------------------------------

.. raw:: html
    :file: on-call_schedule_steps.html

After you save your shift, review the schedule details in the :guilabel:`Schedule Preview` to confirm that you've configured your schedule shifts as intended. The schedule preview includes schedule info for up to one year. Select :guilabel:`Next Month` and :guilabel:`Previous Month` to navigate the schedule preview. Select :guilabel:`Back to all schedules` when you are finished adding shifts to your on-call schedule.

Now that you've created an on-call schedule, add it to the incident workflow for your web application service. See :ref:`Configure your service’s alert routing<configure-alert-routing>` for steps to configure an incident workflow.

View who’s on call
---------------------

You can view who's on call from the :guilabel:`Incidents` and :guilabel:`Alerts` tabs in Incident Intelligence.

* If you are on call, :guilabel:`You are currently on call` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs. To view on-call schedule details select :guilabel:`You are currently on call`. 
* If you are not on call, :guilabel:`On-call schedules` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs. To view  on-call schedule details select :guilabel:`On-call schedules`.  

Use the following tools in the :guilabel:`My on-call schedule` drawer:

.. list-table::
   :header-rows: 1
   :widths: 50, 50
            

   * - :strong:`My on-call schedule section`
     - :strong:`Description`

   * - Current on-call shift details
     - If you are currently on-call, your on-call shift displays with the shift end date and time.
   * - YOUR UPCOMING ON-CALL SHIFTS
     - View one year of your upcoming on-call shifts.
   * - Who's on call?
     - Search for a specific schedule to access the following schedule details:
        * Currently on call - Use this tab to view the team members who are currently on call and next on call and when the shifts start and end. 
        * Search schedule - Use this tab to view one year of upcoming on-call shifts. Use the date picker to view schedule on a specific date. 


You can also view who's on all in :guilabel:`Incident Response Configuration`. To do so, follow these steps: 

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`On-call schedules`. 
#. Select the schedule for which you want to view who’s on call.
#. The :guilabel:`Who’s on call` widget displays the following information:

.. list-table::
   :header-rows: 1
   :widths: 50, 50
          

   * - :strong:`Who's on call for a specific schedule section`
     - :strong:`Description`

   * - Currently on call
     - Use this tab to view the team members who are currently on call and next on call and when the shifts start and end. 
   * - Search schedule 
     - Use this tab to view one year of upcoming on-call shifts. Use the date picker to view schedule on a specific date. 

.. _sync-on-call-schedule:

Sync your on-call schedule to your personal calendar
=======================================================

To access your personal on-call schedule follow these steps: 

#. On the :guilabel:`Incidents` or :guilabel:`Alerts` tab in Incident Intelligence, select either :guilabel:`You are currently on call` or :guilabel:`On-call schedules`. (If you are on call, :guilabel:`You are currently on call` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs. If you are not on call, :guilabel:`On-call schedules` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs.)
#. Select :guilabel:`Sync to calendar`.
#. Copy the link.

You can paste this link in a browser to download the calendar. If you want to sync your on-call schedule to your personal calendar follow the steps for your calendar app.

.. _sync-to-google-calendar:

Sync your on-call schedule to your Google Calendar
------------------------------------------------------

To sync your on-call schedule to your Google Calendar, follow these steps:

#. Go to your Google Calendar.
#. Select the plus icon next to :guilabel:`Other calendars`.
#. Select :guilabel:`From URL`.
#. Paste your copied Incident Intelligence calendar URL.
#. Select :guilabel:`Add calendar`.

The calendar is added to your other calendars. The default calendar name is the URL. To change the calendar name follow these steps:

#. Select the options icon next to the calendar. 
#. Select :guilabel:`Settings`.
#. Edit the calendar name and any other settings you want to change.

.. _sync-to-microsoft-outlook:

Sync your on-call schedule to your Microsoft Outlook Calendar
----------------------------------------------------------------

To sync your on-call schedule to your Microsoft Outlook Calendar, follow these steps:

#. Go to your Microsoft Outlook Calendar.
#. Select :guilabel:`Add calendar` > :guilabel:`Subscribe from web`.
#. Paste your copied Incident Intelligence calendar URL.
#. Enter a calendar name and customize any other settings you want.
#. Select :guilabel:`Import`.

The calendar is added to your other calendars. 

.. _sync-to-iOS-calendar:

Sync your on-call schedule to Calendar for iOS
--------------------------------------------------

To sync an on-call schedule to your Calendar for iOS, follow these steps:

#. On the :guilabel:`Incidents` or :guilabel:`Alerts` tab in Incident Intelligence, select either :guilabel:`You are currently on call` or :guilabel:`On-call schedules`. (If you are on call, :guilabel:`You are currently on call` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs. If you are not on call, :guilabel:`On-call schedules` displays on the :guilabel:`Incidents` and :guilabel:`Alerts` tabs.)
#. Select :guilabel:`Sync to calendar`.
#. Go to your iOS Calendar.
#. Select :guilabel:`File` > :guilabel:`New Calendar Subscription...`.
#. Paste your copied Incident Intelligence calendar URL.
#. Select :guilabel:`Subscribe`.
#. Enter a name and customize any other settings you want.
#. Select :guilabel:`OK`.

The calendar is added to your other calendars. 