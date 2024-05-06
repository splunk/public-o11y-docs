.. _alert-admin:

************************************************************************
Get started as an Alert admin
************************************************************************

.. meta::
   :description: About the alert admin  role in Splunk On-Call.



If you are new to Splunk On-Call a great place to start is with the topic :ref:`user-role`. Once you a familiar with your user permissions, learn about the Alert admin role. The role of Alert Admin provides separate permissions required to manage people and schedules from those necessary to manage technical and high-risk behavior into two roles. The full list of Splunk On-Call user permissions includes:

-  Global Admin: Retains all permissions
-  Team Admin: Manages people and scheduling
-  Alert Admin: Manages the technical aspects of creating and optimizing alerts
-  User: Alert response


As an alert admin, you are responsible for managing alert configuration, integrations, and their workflow. Your permissions are organization-wide. The proper management and upkeep of integrations are essential to your alert workflow.

Alert Admins have permission to take the following actions: 

* Integration Configuration
* Management of Routing Keys & Rules
* Creation & Upkeep of Webhooks
* Maintenance Mode



Recommendations to be a successful Alert Admin
======================================================

* Create Routing Keys: Routing Keys are responsible for directing the alerts to the correct escalation policy in order to page the correct on-call user. Think of these as the “postage” of each alert. Reach out to Team Admins to assist with naming conventions for Routing Keys in order to ensure that escalation policies and routing key names are in sync and simple to identify.

* Enable and configure integrations: Search for the integrations you need on the :ref:`integrations-main-spoc` page. If you do not see an integration listed, you can always use the Generic Rest Endpoint or Email integration based on the capabilities of your tools. Use the Integration Guides to configure your integrations.  Make sure you are only sending critical, actionable alerts to Splunk On-Call to avoid alert fatigue and confusion. 

* Confirm alerts are directed to the corresponding teams: After configuring your integrations, make sure that incidents are routing and behaving properly by sending test alerts.

* Create Rules Engine Rules: You can modify fields, add annotations, and redirect alerts based on certain matching conditions. The Rules Engine even has regex capabilities to parse out portions of fields or create time-based rules. 

*  Configure custom outgoing webhooks: Webhooks allow you to pass information outside of Splunk On-Call based on actions taken within Splunk On-Call such as a triggered incident or a chat. When combined with the Rules Engine, they can be configured to conditionally fire. 

* Maintenance mode: If you need to perform maintenance for one of your integrations, you can turn on maintenance mode for a specific routing key or all routing keys. Maintenance mode will mute paging for the given period of time, and resume paging once ended. 

.. note:: Maintenance Mode does not stop the alerts from coming into Splunk On-Call, just from paging the on-call users when they do come in.



