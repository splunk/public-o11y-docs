.. _global-admin:

************************************************************************
Get started as a Global admin
************************************************************************

.. meta::
   :description: About the global admin  roll in Splunk On-Call.



As a Global Admin, you have the highest level of permissions in the Splunk On-Call platform. You're responsible for the overall workflow and management of integrations and users.

As a Global Admin, you have access to all functionality across the platform including scheduling, integrations, teams, and users. While many of these responsibilities will fall on your Alert and Team Admins, there are three that are unique to the Global Admin role. Global admins have permission to take the following actions: 

Permissions specific to a Team Admin:

* Billing information
* API access
* Granting user permission



Recommendations to be a Successful Alert Admin
======================================================

* Setup profile and familiarize yourself with Splunk On-Call: Setup your personal profile and create a personal paging policy. Explore the mobile and web platforms to get comfortable before beginning your configurations.

* Invite Users: This can be done via the user page by selecting the “invite user” button or via the API. 
    - Configuring SSO prior to adding users helps ensure all users link their SSO account. Reach out to the Splunk On-Call Support team for assistance with SSO configuration.
    - Keep a company-wide user naming convention. This is best achieved by using the name of your email, first.last. If needed, append the username with your Splunk On-Call instance “-orgname” to ensure uniqueness (example: jsmith-acme). Use the API to enforce the desired usernames when inviting users. Note: Email invitations let users create their own usernames, so internal communication will be important to ensure naming conventions are followed. 

* Assign Roles: Splunk On-Call has four roles you can assign to users. For details on user roles, see :ref:`user-roles-permissions`. Restrict user permissions as much as possible in order to limit the number of users making changes. Recommendation: 1-2 Global Admins per org, 1-2 Alert Admins per org, and 1-2 Team Admins per team.

* Create your teams: Determine the role of each team in Splunk On-Call and create each team within the teams' page. Assign 1-2 team admins per team to manage on-call schedules and users. Keep a team naming convention that is intuitive to each team role or the alerts they work. (For example. Support, Backend, Security, Data.)

*  Optimize Splunk On-Call configuration to achieve the desired workflow: Determine which alerts from your monitoring tools need to be sent into Splunk On-Call. Ensure admins for your monitoring tools are assigned alert admin permissions in Splunk On-Call in order to configure the integrations. Only send critical, actionable alerts into Splunk On-Call. Avoid unnecessary or noisy alerts – This will help reduce alert fatigue and make it easier to manage your incidents. 

* Familiarize yourself with Splunk On-Call Reports: Splunk On-Call has four reports that can be utilized to evaluate your incident response, identify and correct weaknesses, and track on-call user metrics. For details on the available reports, see :ref:`reports-main`.
* Global Alert Configuration & Settings:  Configuring your global alert settings will improve your workflow and ensure no alert goes unresolved. 
    - Auto-Resolve & Pop-Out-Of-Ack
    - Incident Creation based on Entity State
    - Incident Resolve Notifications
  
* Understand Maintenance Mode and when to use it: Maintenance Mode allows you to temporarily mute alerts in order to complete server maintenance, or other work, without unnecessarily disrupting your teammates with incident paging. It does not prevent alerts from entering Splunk On-Call; it only stops specific alerts from paging on-call users. Note: Global and Alert Admins can begin Maintenance Mode.

* Get to know the Splunk On-Call API: Only Global Admins have the ability to enable the Splunk On-Call API and create API keys. The API can be used to pull Splunk On-Call data, make scripts, etc. You can access the :new-page:`public API <https://portal.victorops.com/public/api-docs.html?_ga=2.169602981.562369111.1519752971-1195437206.1519752971#/Users>` as well as from the API tab under Integrations. Use your API ID and up to five keys to perform calls.  