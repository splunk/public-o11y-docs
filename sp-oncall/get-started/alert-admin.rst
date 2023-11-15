.. _team-admin:

************************************************************************
Get started as a Team admin
************************************************************************

.. meta::
   :description: About the team admin roll in Splunk On-Call.



If you are new to Splunk On-Call a great place to start is with the topic :ref:`user-role`. Once you a familiar with your user permissions, learn about the Alert admin role.

A user can be elevated to a Team Admin for one or more teams. Likewise, there may be multiple Team Admins within a single team. As a Team Admin, you're responsible for a team.s on-call schedules, escalation policies, and the overall management of the users who are apart of your team. Team admins have permission to take the following actions: 

Permissions specific to a Team Admin:

* Invite users to your team
* Edit the paging policies of team members
* Create, edit, or delete schedulesCread or assign schedued overrides for team members



Recommendations to be a Successful Alert Admin
======================================================

* Create Routing Keys: Routing Keys are responsible for directing the alerts to the correct escalation policy in order to page the correct on-call user. Think of these as the “postage” of each alert. Reach out to Team Admins to assist with naming conventions for Routing Keys in order to ensure that escalation policies and routing key names are in sync and simple to identify.

* Enable and configure integrations: Search for the integrations you need on the XXXXXXX integrations page XXXXXX. If you do not see an integration listed, you can always use the Generic Rest Endpoint or Email integration based on the capabilities of your tools. Use the Integration Guides to configure your integrations.  Make sure you are only sending critical, actionable alerts to Splunk On-Call to avoid alert fatigue and confusion. 

* Confirm alerts are directed to the corresponding teams: After configuring your integrations, make sure that incidents are routing and behaving properly by sending test alerts.

* Create Rules Engine Rules: You can modify fields, add annotations, and redirect alerts based on certain matching conditions. The Rules Engine even has regex capabilities to parse out portions of fields or create time-based rules. 

*  Configure custom outgoing webhooks: Webhooks allow you to pass information outside of Splunk On-Call based on actions taken within Splunk On-Call such as a triggered incident or a chat. When combined with the Rules Engine, they can be configured to conditionally fire. 

* Maintenance mode: If you need to perform maintenance for one of your integrations, you can turn on maintenance mode for a specific routing key or all routing keys. Maintenance mode will mute paging for the given period of time, and resume paging once ended. 

.. note:: Maintenance Mode does not stop the alerts from coming into Splunk On-Call, just from paging the on-call users when they do come in.