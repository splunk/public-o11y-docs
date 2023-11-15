.. _global-admin-training:

********************************************
Global Admin Training
****************************************************

.. note:: New to Splunk On-Call? A great place to get acquainted with the platform is through our User Training, found
`here <https://help.victorops.com/knowledge-base/user-training/>` Once you familiarize yourself with User permissions, come back to this
article to learn more about your increased responsibilities as a Global
Admin.

Your Role as a Global Admin
==================================

As a Global Admin, you have the highest level of permissions in the Splunk On-Call platform. You're responsible for the overall workflow and
management of integrations and users.

Your Permissions as a Global Admin
=========================================

As a Global Admin, you have access to all functionality across the platform including scheduling, integrations, teams, and users. While
many of these responsibilities will fall on your Alert and Team Admins, there are three that are unique to the Global Admin role.


Permissions unique to a Global Admin:
-  Billing Information
-  API Access
-  Granting User Permission


View all  XXXXXX`User Roles and Permissions! <https://help.victorops.com/knowledge-base/user-roles-and-permissions/>`

Your Resources as a Global Admin
====================================

Knowledge Base: The extensive Splunk On-Call `Knowledge Base <https://help.victorops.com/>` is always a good place to start if
you are unsure how something works or are in need of some tips!

Contact Splunk On-Call Support: All users have the ability to reach out to Splunk On-Call support at any time.

   #. Live Chat:If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call
Support team.
   #. Splunk Support Portal:You can open a Splunk On-Call support case in the Splunk Support Portal:https://login.splunk.com/
   #. Have a billing question?** Reach out to your Account Manager pr reach out to the billing team at vo_billing@splunk.com

If you are facing any issues when trying to contact us please have a
look
`HERE <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`

Recommendations for Configuring your Splunk On-Call Account
================================================================

#. Setup profile and familiarize yourself with Splunk On-Call: Setup your personal profile and create a personal paging policy. Explore the mobile and web platforms to get comfortable before beginning your configurations. Quick video on `Personal Paging Polices! <https://share.vidyard.com/watch/gpRuaMFxCK8wZyB9oFRXBA?>`__

#. Invite Users: This can be done via the user page by selecting the :guilabel::`Invite user` button or via the API. Quick video on `Adding
Users in Splunk On-Call <https://share.vidyard.com/watch/Qsz3gv47pTC4dkhV1zpWaU?>` and  `Removing Users in Splunk
On-Call <https://share.vidyard.com/watch/1dXmEF5dGyKbLfc7z5xu3Z?>`.

   - Best Practice Tip: Configuring SSO prior to adding users helps ensure all users link their SSO account. Reach out to the Splunk On-Call Support team for assistance with SSO configuration.

   - Best Practice Tip: Keep a company-wide user naming convention. This is best achieved by using the name of your email, first.last. If needed, append the username with your Splunk On-Call instance “-orgslug” to ensure uniqueness (example: jsmith-acme). Use the API to enforce the desired usernames when inviting users. 
   .. note:: Email invitations let users create their own usernames, so internal communication will be important to ensure naming conventions are followed.

#. Assign Roles: Splunk On-Call has four roles you can assign to users. **Quick video on** `assigning roles in Splunk
On-Call <https://share.vidyard.com/watch/PwAT8XL1K8RYfmQGk8KD2d?>`

   - Global Admin: Organization & Management of the overall Splunk On-Call Account
   - Team Admin: Oversees a Team's configurations and users
   - Alert Admin: Oversees Integration Configurations
   - User: On-call responsibilities & takes action on incidents

   - Best Practice Tip" Restrict user permissions as much as possible in order to limit the number of users making changes. Recommendation: 1-2 Global Admins per org, 1-2 Alert Admins per org, and 1-2 Team Admins per team.

#. Create your teams: Determine the role of each team in Splunk On-Call and create each team within the team's page. Assign one or two team admins per team to manage on-call schedules and users.

   - Best Practice Tip:  Keep a team naming convention that is intuitive to each team role or the alerts they work. For example: Support, Backend, Security, Data, etc.

#. Optimize Splunk On-Call configuration to achieve the desired workflow: Determine which alerts from your monitoring tools need to be
sent into Splunk On-Call. Ensure admins for your monitoring tools are assigned alert admin permissions in Splunk On-Call in order to configure
the integrations

   - Best Practice Tip:  Only send critical, actionable alerts into Splunk On-Call. Avoid unnecessary or noisy alerts/ This will help
reduce alert fatigue and make it easier to manage your incidents.

#. Familiarize yourself with Splunk On-Call Reports: Splunk On-Call has four reports that can be utilized to evaluate your
incident response, identify and correct weaknesses, and track on-call user metrics.

   -  `Post-Incident
      Review <https://help.victorops.com/knowledge-base/post-incident-review/>`__

      -  `Response
         Metrics <https://help.victorops.com/knowledge-base/mtta-mttr-report/>`__
      -  `On-Call Review (Enterprise
         Only) <https://help.victorops.com/knowledge-base/on-call-report/>`__
      -  `Incident Frequency (Enterprise
         Only) <https://help.victorops.com/knowledge-base/incident-frequency-report/>`__

#. Global Alert Configuration & Settings: Configuring your global alert settings will improve your workflow and ensure no alert goes
unresolved.

-  Auto-Resolve and Pop-Out-Of-Ack
-  Incident Creation based on Entity State
-  Incident Resolve Notifications

#. Understand Maintenance Mode and when to use it: Maintenance Mode allows you to temporarily mute alerts in order to complete server
maintenance, or other work, without unnecessarily disrupting your teammates with incident paging. It *does not* prevent alerts from
entering Splunk On-Call; it only stops specific alerts from paging on-call users. 

   .. note:: Global and Alert Admins can begin Maintenance Mode.

#. Get to know the Splunk On-Call API: Only Global Admins have the ability to enable the Splunk On-Call API and create API keys. The API
can be used to pull Splunk On-Call data, make scripts, etc. You can access the public API `HERE <https://portal.victorops.com/public/api-docs.html?_ga=2.169602981.562369111.1519752971-1195437206.1519752971#/>`__ as well as from the API tab under Integrations. Use your API ID and up
to five keys to perform calls.

Global Admin Checklist
============================

- I understand and am familiar with the web UI and mobile platforms
- I have invited the users important to the implemetation of Splunk On-Call
- I have enabled a Team Admin for each team.
- I have enabled one or two Alert Admins to take chare of integration configurations.
- I have set Global Alert Configurations that will optimize my org's workflow.
- I know where to find the API and how to access it.
- I know how to reach out to Splunk On-Call Support.
  
