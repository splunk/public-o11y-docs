.. _about-spoc

************************************************************************
What is Splunk On-Call?
************************************************************************

.. meta::
   :description: About the team admin roll in Splunk On-Call.


Splunk On-Call is incident management software that allows teams to maintain a culture of high availability without slowing down the
innovation process. The moment something goes wrong, Splunk On-Call will spring people to action, automatically.


We offer two getting started guides: one for admins and one for users.

Getting Started Guide for Admins
=====================================

The Team page is your central location for configuring teams, schedules, rotations, and escalation policies.

.. image:: /_images/spoc/team-page.png
    :width: 100%
    :alt: The Team page has several tabs to allow you to access schedules, rotations, and escalation policies.


Set up
----------

:ref:`Add Users <manage-users>`- The most important first step of setting up Splunk On-Call is adding users. To add new users:

-  Leverage their email address in the portal (:guilabel:`Users`, then :guilabel:`Invite User`)
-  Utilize our API (ID & Key required, can be found in :guilabel:`Integrations` then :guilabel:`API`) 
   Uploading a lot of users? Reach out to us, and we'll help you out.

XXXXXX`Create Teams <https://help.victorops.com/knowledge-base/teams/>`XXXXXX - Teams hold user lists, on-call shifts, and escalation policies. To
create a team, navigate to the :menuselection:`Teams` section from the top nav bar. From the :menuselection:`Teams` page select  :guilabel:`Add Team`. Then choose a name.

   -  We recommend standardizing your team names to clearly delineate across teams. You can choose team names based on service, internal team name, and so on. Use whatever makes sense to your organization, but aim for consistency.


XXXXXX`Invite Users <https://help.victorops.com/knowledge-base/removing-a-user/>`XXXXXX *and Declare Admins* - Once you've built a few teams, the next step is to add people. You can add invited users. Then, establish a hierarchy of users based on user roles. For example, admins, users, and XXXXXX`Team Admins <https://help.victorops.com/knowledge-base/how-to-set-up-team-admins/>`XXXXXX.

XXXXXX`Build Rotations <https://help.victorops.com/knowledge-base/rotations/>`-  Rotations are your recurring on-call schedules—basically groups of on-call shifts. A shift is shared across a number of people.

-  You can also reach out to us for help setting up your custom rotation. 
   .. note:: A scheduled rotation doesn't automatically mean you're on-call; rotations need to be tied to an escalation policy.

XXXXXX`Create Escalation
Policies <https://help.victorops.com/knowledge-base/team-escalation-policy/>`XXXXXX - Escalation policies determine which incidents are routed, to whom they are routed, and how they are escalated. Essentially, an escalation policy is how Splunk On-Call escalates a triggered event.

-  Best practice for setting up your escalation policy is to establish a minimum of three escalation paths: on-duty user, previous or next user in a rotation, and manager or team lead.
-  XXXXXX`Read this post <https://help.victorops.com/knowledge-base/tips-tricks-multiple-escalation-policies/>`XXXXXX for more tips and tricks on how to manage multiple alert behaviors within a single team.

XXXXXX`Configure Routing Keys <https://help.victorops.com/knowledge-base/routing-keys/>`XXXXXX - Routing keys tie the alerts from your monitoring tools to the specific team (or escalation policy) in Splunk On-Call. This helps get the right person on the problem and reduce alert noise for those unrelated to a specific incident. These can be found by navigating to :menuselection:`Settings` then :menuselection:`Routing Keys`.

-  Keep them simple! Use the name of the team/policy that is handling the alerts, the service/host for the alert, monitoring tool the alert is coming from. Although routing keys are case insensitive, we recommend using all lowercase letters to prevent alerts from going to the default routing team.

   -  Matching team name: CloudOps (team) = cloudops (routing key)
   -  Matching monitoring tool: Splunk (tool) = splunk (routing key)

XXXXXX `Integrations <https://victorops.com/integrations/>`XXXXXX - The final piece is to set up your custom integrations. Integrations will feed alerts into Splunk On-Call in order to create incidents which will then page out.

- For a full list of integrations, see XXXXXX` <https://help.victorops.com/article-categories/integrations/>`XXXXXX
- Can't find what you're looking for? Check out our XXXXXX`generic email <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`XXXXXX or XXXXXX`REST endpoints <https://help.victorops.com/knowledge-base/victorops-restendpoint-integration/>`XXXXXX
- We recommend setting up any chat integrations or non-alerting integrations before setting up your alerting integrations.

XXXXXX`Rules
Engine <https://help.victorops.com/knowledge-base/transmogrifier/>`XXXXXX - The Rules Engine is a `Full-Stack <https://victorops.com/pricing>` service level feature. It is a rules engine that allows you to set set certain conditions, and trigger custom actions - such as
annotating alerts with images, links, notes, overwrite alert fields, or add new fields - when those conditions are met.

Reporting on Team activity and performance
--------------------------------------------------

As an admin, it is important that you are able to track and report out on team activity and performance in order to continuously improve.
Navigate to the :menuselection:`Reports` page in the top navigation menu.

-  XXXXXX`Post Incident
   Review <https://help.victorops.com/knowledge-base/post-incident-review/>`XXXXXX -  gain historical insight on incidents and a documented account of how you solved the problem.
-  XXXXXX`Performance (MTTA/MTTR) Report <https://help.victorops.com/knowledge-base/mttamttr-report/>`XXXXXX - tells the story of your investment in Splunk On-Call and the practice of DevOps.
-  XXXXXX`On-Call Report <https://help.victorops.com/knowledge-base/on-call-report/>`XXXXXX - take a look into time spent on-call and number of incidents worked by team or user.
-  XXXXXX`Incident Frequency Report <https://help.victorops.com/knowledge-base/incident-frequency-report/>`XXXXXX - analyze the flow of incidents after the fact so you can go upstream to solve the incident causing the problem in your system.

Adjusting License Numbers
------------------------------

If you ever need to significantly increase or decrease your Splunk On-Call license numbers, please reach out to your Regional Sales Manager
or Customer Success Manager. If you are unsure of who to engage, please send your inquiry to victorops-sales@splunk.com.

Getting Started Guide - Users
=====================================

Mobile downloads are available at:
`iOS <https://itunes.apple.com/us/app/victorops/id696974262?mt=8>`__ &
`Android <https://play.google.com/store/apps/details?id=com.victorops.androidclient&hl=en>`__



Main Dashboard layout
---------------------------

Familiarize yourself with the layout of the main dashboard.

.. image:: /_images/spoc/timeline-nav-1.png
    :width: 100%
    :alt: An image showing the main parts of the Splunk On-Call dashboard.

XXXXXX`Single Sign On
(SSO) <https://help.victorops.com/knowledge-base/single-sign-sso/>`XXXXXX -  if your org is using SSO, please check XXXXXX`this article <https://help.victorops.com/knowledge-base/single-sign-sso/>`XXXXXX for setup instructions and the step-by-step process in order to link
your Splunk On-Call user to your orgss IDP.

`Personal Paging Policies <https://help.victorops.com/knowledge-base/paging-policy/>`- Your Personal Paging Policy is your definition of how you'd like to be notified by Splunk On-Call when an incident is routed to you. Your options for notifications are push, email, SMS, and phone call.

`Custom (Time Based) <https://help.victorops.com/knowledge-base/custom-paging-policies-time-based/>`- Custom policies are restricted to certain times of the day/week. When you are being paged for an incident, we will execute the first matching policy in the list top to bottom. Your primary policy will be used if none of your custom policies match the current time.
    -  Best Practice: The more diverse your paging policies, in terms of steps and methods of contact, the better.

Incident Actions
-------------------------

Different scenarios require different actions when dealing with an
incident.

-  Acknowledgment -  can be executed via Push, SMS, or Phone notification & within the web/mobile clients. Will cease paging and  assign you to the incident.
-  `S_nooze\_ <https://help.victorops.com/knowledge-base/snooze/>`__ - can be executed within the web/mobile clients. Will cease paging of an incident for a defined time period. When the time period is reached, the incident will then be retriggered and begin paging out again.
-  `Reroute <https://help.victorops.com/knowledge-base/reroute-an-incident/>`- can be executed within the web/mobile clients. Redirects an incident to a user(s) or escalation policy(s).
-  Resolve -can be executed via Push, SMS, or Phone notification and within the web or mobile clients. Will end the incident as being complete - no further action needed.

Processing Incidents in Splunk On-Call
-------------------------------------------

How to find the right incident information:

- Details/Payload - contains preconfigured alert data from your monitoring tools related to the incident.
- Incident Specific Timeline* - captures all Splunk On-Call events related to the incident.
- `Annotations <https://help.victorops.com/knowledge-base/transmogrifier-annotations/>`- additional context added by the `Rules
   Engine <https://help.victorops.com/knowledge-base/transmogrifier/>` rules you've setup. Can annotate links, notes, and images to be
   delivered in hand with the alert payload.

On-call Awareness
-------------------------

- When am I on-call? - your user card within the People Pane will display your current and upcoming on-call shift information. Your
   profile also contains an `on-call calendar export <https://help.victorops.com/knowledge-base/calendar-export/>` link for 3rd party calendars.

- Who else is on-call with me? - the Splunk On-Call oak leaf icon on a user card in the People Pane denotes a person as being on-call
   currently.

-  Team's Schedule - your team's schedule can be found in the Settings
   page and by selecting the dropdown icon in line with your team.

-  Escalation Policy Awareness - when on-call, it is important to know how your team's escalation policies are structured and who exactly an incident may escalate to and when if you do not respond. You can find these within each team.

Coverage Activities
--------------------------

- `Scheduled Overrides <https://help.victorops.com/knowledge-base/scheduled-overrides/>` - allow users to request on-call coverage for any planned absence.

- `Manual Take On-Call <https://help.victorops.com/knowledge-base/manual-take-call/>` - take someone's on-call shift one-off. On-call personnel change in real time.


How does an incident get to me?
----------------------------------


.. image:: /_images/spoc/vo-incident-flow.png
    :width: 100%
    :alt: Splunk On-Call takes alerts from detectors and used the policies you've configured to page users.

    