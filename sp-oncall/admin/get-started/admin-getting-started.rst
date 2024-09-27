.. _admin-getting-started:

************************************************************************
Getting Started Guide for Splunk On-Call Admins
************************************************************************

.. meta::
   :description: About  Splunk On-Call.

.. toctree::
   :hidden:

   onboarding-milestones
   Manage users TOGGLE <../../user-roles/manage-users>
   Create teams <../../user-roles/configure-teams>
   Rotations and shifts <../../on-call-schedules/rotation-setup>
   Team escalation policy <../../alerts/team-escalation-policy>
   egress-filtering-cloudflare
   team-dashboard
   spoc-support
   spoc-system-requirements
   tls-security-protocol

The Team page is your central location for configuring teams, schedules, rotations, and escalation policies.

.. image:: /_images/spoc/team-page.png
    :width: 100%
    :alt: The Team page has several tabs to allow you to access schedules, rotations, and escalation policies.


.. raw:: html

  <embed>
    <h2>Set up</h2>
  </embed>


- :ref:`Add Users <manage-users>`- The most important first step of setting up Splunk On-Call is adding users. To add new users:

-  Leverage their email address in the portal (:guilabel:`Users`, then :guilabel:`Invite User`)
  
-  Utilize our API (ID & Key required, can be found in :guilabel:`Integrations` then :guilabel:`API`) 
   Uploading a lot of users? Reach out to us, and we'll help you out.

- :ref:`Create Teams <configure-teams>`: Teams hold user lists, on-call shifts, and escalation policies. To create a team, navigate to the :menuselection:`Teams` section from the top nav bar. From the :menuselection:`Teams` page select  :guilabel:`Add Team`. Then choose a name.

    -  We recommend standardizing your team names to clearly delineate across teams. You can choose team names based on service, internal team name, and so on. Use whatever makes sense to your organization, but aim for consistency.


- :ref:`Invite Users <manage-users>` and Declare Admins - Once you've built a few teams, the next step is to add people. You can add invited users. Then, establish a hierarchy of users based on user roles. For example, admins, users, and :ref:`Team Admins <team-admin-setup>`.

- :ref:`Build Rotations <rotation-setup>`-  Rotations are your recurring on-call schedules—basically groups of on-call shifts. A shift is shared across a number of people.

-  You can also reach out to us for help setting up your custom rotation. 
   .. note:: A scheduled rotation doesn't automatically mean you're on-call; rotations need to be tied to an escalation policy.

:ref:`Create Escalation Policies <team-escalation-policy>` - Escalation policies determine which incidents are routed, to whom they are routed, and how they are escalated. Essentially, an escalation policy is how Splunk On-Call escalates a triggered event.

-  Best practice for setting up your escalation policy is to establish a minimum of three escalation paths: on-duty user, previous or next user in a rotation, and manager or team lead.
-  :ref:`Read this post <mult-escalation-policies>` for more tips and tricks on how to manage multiple alert behaviors within a single team.

- :ref:`Configure Routing Keys <spoc-routing-keys>` - Routing keys tie the alerts from your monitoring tools to the specific team (or escalation policy) in Splunk On-Call. This helps get the right person on the problem and reduce alert noise for those unrelated to a specific incident. These can be found by navigating to :menuselection:`Settings` then :menuselection:`Routing Keys`.

-  Keep them simple. Use the name of the team/policy that is handling the alerts, the service/host for the alert, monitoring tool the alert is coming from. Although routing keys are case insensitive, we recommend using all lowercase letters to prevent alerts from going to the default routing team.

   -  Matching team name: CloudOps (team) = cloudops (routing key)
   -  Matching monitoring tool: Splunk (tool) = splunk (routing key)

The final piece is to set up your custom integrations. Integrations will feed alerts into Splunk On-Call in order to create incidents which will then page out.

- For a full list of integrations, see :ref:`integrations-main-spoc`.
- Can't find what you're looking for? Check out our :ref:`generic email <email-generic-spoc>` or `REST endpoints <spoc-rest-endpoint>`
- We recommend setting up any chat integrations or non-alerting integrations before setting up your alerting integrations.

:ref:`Rules Engine <alert-rules-engine>` - The Rules Engine is a `Full-Stack <https://victorops.com/pricing>` service level feature. It is a rules engine that allows you to set set certain conditions, and trigger custom actions - such as
annotating alerts with images, links, notes, overwrite alert fields, or add new fields - when those conditions are met.



.. raw:: html

  <embed>
    <h2>Reporting on Team activity and performance</h2>
  </embed>



As an admin, it is important that you are able to track and report out on team activity and performance in order to continuously improve.
Navigate to the :menuselection:`Reports` page in the top navigation menu.

-  :ref:`Post Incident Review <post-incident-review>` -  gain historical insight on incidents and a documented account of how you solved the problem.
-  :ref:`Performance (MTTA/MTTR) Report <mtta-mttr>` - tells the story of your investment in Splunk On-Call and the practice of DevOps.
-  :ref:`On-Call Report <reports>` - take a look into time spent on-call and number of incidents worked by team or user.
-  :ref:`Incident Frequency Report <incident-frequency>` - analyze the flow of incidents after the fact so you can go upstream to solve the incident causing the problem in your system.


.. raw:: html

  <embed>
    <h2>Adjusting License Numbers</h2>
  </embed>



If you ever need to significantly increase or decrease your Splunk On-Call license numbers,  reach out to your Regional Sales Manager or Customer Success Manager. If you are unsure of who to engage,  send your inquiry to victorops-sales@splunk.com.

