.. _Jira-spoc:

Jira integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Jira integration for Splunk On-Call.

The Splunk On-Call and Jira integration helps with project and ticket tracking while centralizing incident information in Splunk On-Call. Depending on how your organization is using Jira, an issue can represent a software bug, a project task, a helpdesk ticket, a leave request form, and so on.

The Splunk On-Call and Jira integration works in two ways

1. The Jira integration allows you to create a new Jira ticket for any incident that comes into Splunk On-Call.
2. You can create Splunk On-Call incidents whenever a new issue is added to a Jira ticket.

This integration provides a wide range of customizable configuration options, so there is not just one way to set this up. This guide aims to provide you with all the tools you will need to setup this integration to fit your workflows.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Jira Webhook Integration Guide
====================================

From the Splunk On-Call web portal navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Jira (webhook)` and select :guilabel:`Enable Integration`. Copy your :guilabel:`Service API Endpoint` to the clipboard to be used later in future steps. Replace the ``$routing_key`` with the routing key you want to use.

Jira configuration
---------------------------------

From the main web interface, select the cog in the upper right hand corner and then :guilabel:`System.`

.. image:: _images/spoc/Jnew1.png
   :alt: Select webhooks in Jira

In the left side bar under “Advanced” select :guilabel:`WebHooks`.

.. image:: _images/spoc/jnew2.png
   :alt: Select webhooks in Jira

Select :guilabel:`+ Create a Webhook`. Give the WebHook a name, set the status to :guilabel:`Enabled`, and paste in the Splunk On-Call Jira URL.

.. image:: _images/spoc/jnew3.png
   :alt: Select + Create a Webhook

You have the options to use specific JQL queries to send only certain issues.

Next select the events you want to send to Splunk On-Call for. The example sends a webhook whenever an issue is created, updated or deleted.

.. image:: _images/spoc/jnew4.png
   :alt: Select the events you would like to have a webhook sent to SPoC

Deselect :guilabel:`Exclude body` so that Jira sends JSON, then select :guilabel:`Create`.

When an issue is created in Jira, a ``CRITICAL`` incident is created in Splunk On-Call and any updates are sent to the timeline as an alert associated to that incident, including info messages when a comment is added. When the issue is resolved or deleted in Jira, the incident is resolved in Splunk On-Call.

Splunk On-Call configuration
-------------------------------------------

Now that webhooks are sent from Jira, you can manipulate those into different types of alerts and update
Jira issues based on actions in Splunk On-Call. Start with using the Rules Engine to create a simple rule.

For example you might want to adjust the severity level of an alert based on the priority that was set in Jira or the ``Jira.issue.fields.priority.name``. For all Jira issues with a priority of Sev 4 to create ``WARNING`` alerts in Splunk On-Call, the rule looks as follows:

.. image:: _images/spoc/Screen-Shot-2019-08-14-at-11.00.20-AM.png
   :alt: Sample rule

To send information based on actions in Splunk On-Call back into Jira you need to configure outbound webhooks. You can do things such as update the status of a ticket when the incident is acknowledged in Splunk On-Call, or add a
comment or assignee to the Jira ticket. The following example walks you through how to add a comment to a Jira ticket when someone writes in the associated incident timeline in Splunk On-Call.

From the Splunk On-Call web portal, navigate to :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks` and select :guilabel:`Add Webhook`.

Set the :guilabel:`Event` to :guilabel:`Incident-Chats`, the :guilabel:`Method` to ``POST`` and the :guilabel:`Content Type` to ``application/json``. Next, select :guilabel:`Add a Customer Header` to set an authentication header. You need to Base64 encode your username and API token key all together, like this: ``Jira_USERNAME:Jira_API_TOKEN``. 

After you have encoded that value, add :guilabel:`Authorization` in the first box and the encoded key on the second with the word ``Basic`` in front of it. For example:

.. code-block:: text

   Authorization: Basic
   <Encoded_String>

Set the ``To`` field to the Jira REST endpoint for issue comments. Set the payload to include the chat text from the incident timeline. The payload looks similar to the following:

``{"body": "Via Splunk On-Call Timeline: ${{CHAT.TEXT}}"}``

The final result looks like so:

.. image:: _images/spoc/Jira-Webhook-Example2.png
   :alt: Jira webhook example

Now every time a chat is entered into the timeline a comment is added to the issue in Jira.

Some important Jira fields for both the Rules Engine and the Outbound Webhooks are:

- ``Jira.issue.fields.status.id Jira.issue.fields.status.name``
- ``Jira.issue.fields.priority.id Jira.issue.fields.priority.name``
- ``Jira.issue.id Jira.issue.key``

Jira Service Desk integration
====================================

Jira Software offers flexible issue and project tracking for software teams. Splunk On-Call has two integrations with Jira Service Desk, one for each direction. With the first you can create a new Jira ticket for any incident that comes into Splunk On-Call. The second one helps you create Splunk On-Call incidents whenever a new issue is added to project.

Splunk On-Call to Jira (Email Endpoint)
------------------------------------------

This integration requires that you setup a Jira email that creates and updates Issues. This is only available with Jira Service Desk.

Jira configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set up an incoming mail handler for the project you want to receive issues from Splunk On-Call. To do so, select
:guilabel:`Settings` (gear icon) and then :guilabel:`System`.

.. image:: _images/spoc/Jira1.png
   :alt: Set up an Incoming mail handler

In the sidebar select :guilabel:`Incoming Mail`.

.. image:: _images/spoc/Jira2.png
   :alt: Select Incoming Mail

Select :guilabel:`Add Incoming mail handler`.

.. image:: _images/spoc/Jira3.png
   :alt: Add incoming mail handler

Give it a name and select the appropriate handler you want to use for this integration, like :guilabel:`Create a new issue or add a comment to an existing issue`. Then select :guilabel:`Next`.

.. image:: _images/spoc/Jira4.png
   :alt: Create a new issue or add a comment to an existing issue

Select the project you want to associate this integration with, then select :guilabel:`Add`. In this example you select the :guilabel:`Splunk On-Call Critical Incidents`.

.. image:: _images/spoc/Jira5.png
   :alt: Adding VictorOps Critical Incidents project

Retrieve the email address associated to the project. To do this go into your projects administration page and select :guilabel:`Email requests`. Copy the email you want to use to your clipboard.

.. image:: _images/spoc/Jira6.png
   :alt: Projects administration page and select Email requests

Splunk On-Call configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Jira email address as part of a team's escalation policy so that when an alert is routed to that team, a ticket is created. This gives you two options:

1. Create Jira issues from specific Splunk On-Call incidents by rerouting incidents to a "New Jira Ticket” team that has a single escalation step to send an email to the Jira email address.

2. Create Jira issues from every Splunk On-Call incident that goes to a team by adding the Jira email address to the first step of that teams escalation policy.

For the first option, follow these steps:

1. In the Splunk On-Call web portal navigate to :guilabel:`Teams`, then select :guilabel:`Add Team`. Add your Jira Email address to the first step of this team's Escalation Policy.

2. When you want to create a Jira issue from any Splunk On-Call incident, reroute that incident to the “New Jira Ticket” team.


Splunk On-Call to Jira (Custom URL)
-----------------------------------------

This integration method uses a custom URL and the Splunk On-Call Rules Engine to generate a Jira ticket with information from the alert automatically added.

Splunk On-Call configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

From the web portal select :guilabel:`Settings`, :guilabel:`Alert Rules`, :guilabel:`Engine` and select :guilabel:`Add a Rule`.

Set the rule to match on the alerts you want to create Jira tickets from. Next, add an Annotation and select the URL type. Give it a name and then build a custom create Jira ticket using documentation from Atlassian here:

`Altassian
Documentation <https://confluence.atlassian.com/display/JiraKB/Creating+Issues+via+direct+HTML+links>`__

You can use variable expansion within the Rules Engine to build the URL in a way that pulls in information for the ticket dynamically. The exact format of the necessary URL is highly variable based on your specific Jira environment. The following are some examples where we set the Description, Summary and Label fields.

``https://YOUR_DOMAIN_HERE.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10506&issuetype=1&description=${{state_message}}&summary=${{entity_id}}&labels=${{labels}}``

``https://YOUR_DOMAIN_HERE.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10000&description=${{state_message}}&summary=${{entity_id}}&labels=${{labels}}``

Within the Splunk On-Call incident, this rule creates a clickable annotation. Whenever the rule matches on an alert, you have a one-touch option to create a Jira ticket that already has information pulled directly from the Splunk On-Call alert.
