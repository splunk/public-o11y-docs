:orphan:

.. _get-started-users:

************************************************************************
Getting started guide for Splunk On-Call users
************************************************************************

.. meta::
   :description: About  Splunk On-Call.

.. toctree::
   :hidden:

Mobile downloads are available at:
- :new-page:`iOS <https://itunes.apple.com/us/app/victorops/id696974262?mt=8>` 
- :new-page:`Android <https://play.google.com/store/apps/details?id=com.victorops.androidclient&hl=en>`

Main Dashboard layout
---------------------------

Familiarize yourself with the layout of the main dashboard.

.. image:: /_images/spoc/timeline-nav-1.png
    :width: 100%
    :alt: An image showing the main parts of the Splunk On-Call dashboard.

:ref:`Single Sign On (SSO) <single-sign-sso>` -  if your org is using SSO, please check :ref:`this article <single-sign-sso>` for setup instructions and the step-by-step process in order to link your Splunk On-Call user to your org's IDP.

:ref:`Personal Paging Policies <primary-paging>`- Your Personal Paging Policy is your definition of how you'd like to be notified by Splunk On-Call when an incident is routed to you. Your options for notifications are push, email, SMS, and phone call.

:ref:`Custom (Time Based) <custom-paging-policy>`- Custom policies are restricted to certain times of the day/week. When you are being paged for an incident, we will execute the first matching policy in the list top to bottom. Your primary policy will be used if none of your custom policies match the current time.
    -  Best Practice: The more diverse your paging policies, in terms of steps and methods of contact, the better.

Incident Actions
-------------------------

Different scenarios require different actions when dealing with an
incident.

-  Acknowledgment -  can be executed via Push, SMS, or Phone notification & within the web/mobile clients. Will cease paging and  assign you to the incident.
-  :ref:`Snooze <snooze>` - can be executed within the web/mobile clients. Will cease paging of an incident for a defined time period. When the time period is reached, the incident will then be retriggered and begin paging out again.
-  :ref:`Reroute <reroute-an-incident>`- can be executed within the web/mobile clients. Redirects an incident to a user(s) or escalation policy(s).
-  Resolve -can be executed via Push, SMS, or Phone notification and within the web or mobile clients. Will end the incident as being complete - no further action needed.

Processing Incidents in Splunk On-Call
-------------------------------------------

How to find the right incident information:

- Details/Payload - contains preconfigured alert data from your monitoring tools related to the incident.
- Incident Specific Timeline* - captures all Splunk On-Call events related to the incident.
- :ref:`Annotations <rules-engine-annot>`- additional context added by the `Rules Engine <alert-rules-engine>` rules you've setup. Can annotate links, notes, and images to be delivered in hand with the alert payload.

On-call Awareness
-------------------------

- When am I on-call? - your user card within the People Pane will display your current and upcoming on-call shift information. Your
   profile also contains an :ref:`on-call calendar export <calendar-export>` link for 3rd party calendars.

- Who else is on-call with me? - the Splunk On-Call oak leaf icon on a user card in the People Pane denotes a person as being on-call
   currently.

-  Team's Schedule - your team's schedule can be found in the Settings
   page and by selecting the dropdown icon in line with your team.

-  Escalation Policy Awareness - when on-call, it is important to know how your team's escalation policies are structured and who exactly an incident may escalate to and when if you do not respond. You can find these within each team.

Coverage Activities
--------------------------

- :ref:`Scheduled Overrides <scheduled-overrides>` - allow users to request on-call coverage for any planned absence.

- :ref:`Manual Take On-Call <manual-take-call>` - take someone's on-call shift one-off. On-call personnel change in real time.


How does an incident get to me?
----------------------------------


.. image:: /_images/spoc/vo-incident-flow.png
    :width: 100%
    :alt: Splunk On-Call takes alerts from detectors and used the policies you've configured to page users.

    