.. _admin-quick-start:

************************************************************************
Admin quick-start guide
************************************************************************

.. meta::
   :description: About Splunk On-Call, the incident management application.


   

Set up
===============

Add Users
---------------

The most important first step of setting up Splunk On-Call is adding users.
There are two main methods to add new users:
* Leverage their email address in the portal (Select :guilabel:`Users`, then :guilabel:`Invite User`.)
* Utilize our API (ID and Key required, which can be found by selecting :guilabel:`Integrations` then :guilabel:`API`)


Create Teams
----------------

Teams are made up of:

* user lists
* on-call shifts 
* escalation policies.

To create a team, navigate to the Teams section from the top nav bar. From the Teams page, select :guilabel:`Add Team`, then choose a name.

We recommend standardizing your team names to clearly delineate across teams. You can choose team names based on service, internal team name — whatever makes sense to your organization.

Invite Users and Declare Admins
-----------------------------------

Once you've built a few teams, the next step is to add people. You can add invited users. Then establish a hierarchy of users based on user roles, for example: Admins, Users, and Team Admins.

Create Rotations
-------------------

Rotations are your recurring on-call schedules: basically groups of on-call shifts. A shift is shared across a number of people. 

Note: A scheduled rotation doesn't automatically mean you're on-call; rotations need to be tied to an escalation policy.

Create Escalation Policies
-----------------------------

Escalation policies determine which incidents are routed, to whom they are routed, and how they are escalated. Essentially, an escalation policy is how Splunk On-Call escalates a triggered event.

A best practice for setting up your escalation policy is to establish a minimum of three escalation paths: on-duty user, previous/next user in a rotation, and manager/team lead. Read LINK this post LINK for more tips and tricks on how to manage multiple alert behaviors within a single team.


Configure Routing Keys
---------------------------

Routing keys tie the alerts from your monitoring tools to the specific team (or escalation policy) in Splunk On-Call. This helps get the right person on the problem and reduce alert noise for those unrelated to a specific incident. These can be found by navigating to Settings > Routing Keys.

Use the name of the team or policy that is handling the alerts, the service or host for the alert, monitoring tool the alert is coming from. Although routing keys are case insensitive, we recommend using all lowercase letters to prevent alerts from going to the default routing team.

* Matching team name: CloudOps (team) = cloudops (routing key)
* Matching monitoring tool: Splunk (tool) = splunk (routing key)



Integrations
--------------------

The final piece is to set up your custom integrations. Integrations will feed alerts into Splunk On-Call in order to create incidents which will then page out. For a full list of integrations—plus more information on how to set them up—check here. If you can't find what you're looking for check out the generic email or REST endpoints.

We recommend setting up any chat integrations or non-alerting integrations before setting up your alerting integrations.


Rules Engine
-------------------
The Rules Engine is a Full-Stack service level feature. It is a rules engine that allows you to set certain conditions and trigger custom actions such as annotating alerts with images/links/notes, overwrite alert fields or add new fields,  when those conditions are met.


Reporting on Team Activity and Performance
-------------------------------------------------
As an admin, it is important that you are able to track and report out on team activity and performance in order to continuously improve. Navigate to the Reports page in the top navigation menu.

Post Incident Review
----------------------------

Gain historical insight on incidents and a documented account of how you solved the problem.

* Performance (MTTA/MTTR) Report:  tells the story of your investment in Splunk On-Call and the practice of DevOps.
* On-Call Report: take a look into time spent on-call and number of incidents worked by team/user.
* Incident Frequency Report: analyze the flow of incidents after the fact so you can go upstream to solve the incident causing the problem in your system.
  

Adjusting License Numbers
-------------------------------
If you ever need to significantly increase or decrease your Splunk On-Call license numbers, please reach out to your Regional Sales Manager or Customer Success Manager. If you are unsure of who to engage, please send your inquiry to victorops-sales@splunk.com.
