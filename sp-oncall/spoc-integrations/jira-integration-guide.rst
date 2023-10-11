**About Jira and Splunk On-Call**
---------------------------------

The Splunk On-Call and Jira integration helps with project and ticket
tracking while centralizing incident information in Splunk On-Call.
Depending on how your organization is using
`Jira <https://www.atlassian.com/software/jira>`__, an issue could
represent a software bug, a project task, a helpdesk ticket, a leave
request form, etc. The Splunk On-Call and Jira integration works in two
ways: 1) The Jira integration allows you to create a new Jira ticket for
any incident that comes into Splunk On-Call. 2) You can create Splunk
On-Call incidents whenever a new issue is added to a Jira ticket.

Splunk On-Call and Jira: Flexible Project and Ticket Tracking for
Software Teams

-  Create new Jira tickets for incidents that comes into Splunk On-Call

   -  Integrate Jira issues with every Splunk On-Call incident by adding
      the Jira email address to the first step of that team’s escalation
      policy

-  Create Splunk On-Call incidents whenever a new issue is added to your
   Jira project.
-  The Splunk On-Call and Jira integration empowers continuous delivery
   *and* site reliability through detailed project tracking in both Jira
   and Splunk On-Call

This integration provides a wide range of customizable configuration
options, so there is not just one way to set this up. This guide aims to
provide you with all the tools you will need to setup this integration
to fit your workflows.

Jira Webhook Integration Guide
------------------------------

Getting Started
~~~~~~~~~~~~~~~

From the Splunk On-Call web portal navigate to *Integrations >> 3rd
Party Integrations >> Jira (webhook)* and click *Enable
Integration.* Copy your **Service API Endpoint** to the clipboard to be
used later in future steps. Replace the *$routing_key* with whichever
routing key is desired (leaving it blank will route to the default
routing key in Splunk On-Call).

**In Jira (Webhook Integration)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the main web interface, select the cog in the upper right hand
corner and then **System.** 

.. figure:: images/Jnew1.png
   :alt: select webhooks in Jira

   select webhooks in Jira

In the left side bar under “Advanced” select **WebHooks**.

.. figure:: images/jnew2.png
   :alt: select webhooks in Jira - 2

   select webhooks in Jira - 2

Select **+ Create a Webhook**. Give the WebHook a name, set the status
to **Enabled**, and paste in the VictorOps JIRA URL.

.. figure:: images/jnew3.png
   :alt: Select + Create a Webhook - Jira VictorOps

   Select + Create a Webhook - Jira VictorOps

You will then have the options to use specific JQL queries to send only
certain issues.

Next select the events you would like to send to Splunk On-Call for. In
our example we have chosen to send a webhook whenever an “Issue” is
created, updated or deleted.

.. figure:: images/jnew4.png
   :alt: select the events you would like to have a webhook sent to
   VictorOps for

   select the events you would like to have a webhook sent to VictorOps
   for

Finally un-check the “Exclude body” check box so that JIRA sends JSON,
and click **Create**.

Now when an issue is created in JIRA, a CRITICAL incident will be
created in Splunk On-Call and any updates will be sent to the timeline
as an alert associated to that incident (including info messages when a
comment is added). When the issue is resolved or deleted in JIRA, the
incident will be resolved in Splunk On-Call. That is the out of the box
functionality. Any additional functionality you desire can be
accomplished through the use of custom fields and the `Rules
Engine <https://help.victorops.com/knowledge-base/transmogrifier/>`__.

**In Splunk On-Call (Webhook Integration)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that webhooks are being sent from JIRA, we have a number of options
on how we can manipulate those into different types of alerts and update
JIRA issues based on actions in Splunk On-Call. We will start with using
the Rules Engine to create a simple rule. For example you may want to
adjust the severity level of an alert based on the priority that was set
in JIRA or the jira.issue.fields.priority.name. Let’s say for all JIRA
issues with a priority of Sev 4 you want to make those WARNING alerts in
Splunk On-Call. The rule would look like:

.. image:: images/Screen-Shot-2019-08-14-at-11.00.20-AM.png

Next, to send information based on actions in Splunk On-Call back into
JIRA you will need to setup `Outbound
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
to accomplish this. You can do things such as update the status of a
ticket when the incident is acknowledged in Splunk On-Call, or add a
comment or assignee to the JIRA ticket. The following example will walk
you through how to add a comment to a JIRA ticket when someone writes in
the associated incident timeline in Splunk On-Call.

From the Splunk On-Call web portal, navigate to *Integrations >>
Outgoing Webhooks* and click *Add Webhook*.

Set the “Event” to “Incident-Chats” Set the “Method” to POST Set the
“Content Type” to application/json Next, click on the ‘Add a Customer
Header’ to set an authentication header. You will first need to Base64
encode your username and API token key all together, like this :
JIRA_USERNAME:JIRA_API_TOKEN. You can use this `site to do
so. <https://www.base64encode.org/>`__ Once you have encoded that value,
you will add ‘Authorization’ in the first box, and the encoded key on
the second with the word ‘Basic’ in front of it. Like this:

Authorization: Basic
<`BASE_64_ENCODE <https://www.base64decode.org/>`__\ \_OF_JIRA_USERNAME:API_TOKEN>

Set the “To” to the JIRA rest endpoint for issue comments.

Set the “Payload” to include the chat text from the incident timeline.
The payload should look like so:

``{"body": "Via Splunk On-Call Timeline: ${{CHAT.TEXT}}"}``

The final result should like like so:

.. image:: images/Jira-Webhook-Example2.png

 

Now every time a chat is entered into the timeline a comment will be
added to the issue in JIRA.

Some important JIRA fields for both the Rules Engine and the Outbound
Webhooks are:

jira.issue.fields.status.id jira.issue.fields.status.name
jira.issue.fields.priority.id jira.issue.fields.priority.name
jira.issue.id jira.issue.key

For Additional information on JIRA’s API see the documentation
`here <https://docs.atlassian.com/jira/REST/cloud/#api/2/issue>`__.

This is just one of many ways to set up this integration, if you are
trying to setup a custom workflow and have any questions please contact
support.

 

Jira Service Desk Integration
-----------------------------

JIRA Software offers flexible issue and project tracking for software
teams. Splunk On-Call has two integrations with JIRA, one for each
direction. The first will allow you to create a new JIRA ticket for any
incident that comes into Splunk On-Call. The second one below allows you
to create Splunk On-Call incidents whenever a new issue is added to your
JIRA project.

-  `Splunk On-Call =>JIRA <#v2j>`__ (Email Endpoint)
-  `Splunk On-Call =>JIRA <#v2j2>`__ (Custom URL)

Splunk On-Call =>JIRA (Email Endpoint)

This integration requires that you setup a JIRA email that creates and
updates Issues. This is only available with `JIRA Service
Desk. <https://www.atlassian.com/software/jira/service-desk>`__ For more
information see the documentation
`HERE <https://confluence.atlassian.com/jira/creating-issues-and-comments-from-email-185729464.html>`__.

**In Jira (Service Desk Integration)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The first step is to set up an “Incoming mail handler” for the project
you want to receive issues from Splunk On-Call. To do so, select
**Settings** (gear icon) and then **System**.

.. figure:: images/Jira1.png
   :alt: setup an Incoming mail handler - Jira VictorOps

   setup an Incoming mail handler - Jira VictorOps

In the left sidebar under “Mail” select **Incoming Mail.**

.. figure:: images/Jira2.png
   :alt: select Incoming Mail

   select Incoming Mail

Under “Mail Handlers” select **Add Incoming mail handler**.

.. figure:: images/Jira3.png
   :alt: add incoming mail handler - Jira VictorOps

   add incoming mail handler - Jira VictorOps

Give it a name and select the appropriate handler you want to use for
this integration (We suggest the “Create a new issue or add a comment to
an existing issue” option), then hit Next.

.. figure:: images/Jira4.png
   :alt: Create a new issue or add a comment to an existing issue - Jira
   VictorOps

   Create a new issue or add a comment to an existing issue - Jira
   VictorOps

Select the Project you want to associate this integration with, then
select **Add**. In this example we selected the “Splunk On-Call Critical
Incidents”.

.. figure:: images/Jira5.png
   :alt: adding VictorOps Critical Incidents project - Jira

   adding VictorOps Critical Incidents project - Jira

Next, retrieve the email address associated to the project. To do this
go into your projects administration page and select **Email
requests.** Copy the email you want to use to your clipboard.

.. figure:: images/Jira6.png
   :alt: projects administration page and select Email requests

   projects administration page and select Email requests

**In Splunk On-Call (Service Desk Integration)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will use the JIRA email address as part of a team’s escalation policy
so that when an alert is routed to that team, a ticket is created. This
gives you two options:

1) Create JIRA issues from specific Splunk On-Call incidents by
   re-routing incidents to a “New JIRA Ticket” team that has a single
   escalation step to send an email to the JIRA email address. 2) Create
   JIRA issues from every Splunk On-Call incident that goes to a team by
   adding the JIRA email address to the first step of that teams
   escalation policy.

The following will walk you through the first option.

In the Splunk On-Call web portal navigate to *Teams* then click *Add
Team*. Add your JIRA Email address to the first step of this team’s
Escalation Policy.

When you want to create a JIRA issue from any Splunk On-Call incident,
re-route that incident to the “New JIRA Ticket” team.

For any questions or feedback, please `contact Splunk On-Call
Support <https://help.victorops.com/knowledge-base/how-to-contact-splunk-on-call-support/>`__.

Splunk On-Call to Jira (Custom URL)
-----------------------------------

This integration method utilizes a custom URL and the Splunk On-Call
`Rules
Engine <https://help.victorops.com/knowledge-base/transmogrifier/>`__ to
generate a JIRA ticket with information from the alert automatically
added.

**In Splunk On-Call (Custom URL)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the web portal select *Settings* >> *Alert Rules* *Engine* and
click *Add a Rule*.

Set the rule to match on the alerts you would want to create JIRA
tickets from.  Next, add an Annotation and select the URL type. Give it
a name and then build a custom create JIRA ticket using documentation
from Atlassian here:

`Altassian
Documentation <https://confluence.atlassian.com/display/JIRAKB/Creating+Issues+via+direct+HTML+links>`__

You can use `Variable
Expansion <https://help.victorops.com/knowledge-base/transmogrifier/#variable-expansion>`__
within the Rules Engine to build the URL in a way that pulls in
information for the ticket dynamically. The exact format of the
necessary URL is highly variable based on your specific Jira
environment.  Below are some examples where we set the Description,
Summary and Label fields.

``https://YOUR_DOMAIN_HERE.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10506&issuetype=1&description=${{state_message}}&summary=${{entity_id}}&labels=${{labels}}``

``https://YOUR_DOMAIN_HERE.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10000&description=${{state_message}}&summary=${{entity_id}}&labels=${{labels}}``

Within the Splunk On-Call incident, this rule will create a clickable
annotation. Now whenever the rule matches on an alert, you will have a
one-touch option to create a JIRA ticket that already has information
pulled directly from the Splunk On-Call alert.

For any questions or feedback, please `contact Splunk On-Call
Support <https://help.victorops.com/knowledge-base/how-to-contact-splunk-on-call-support/>`__.
