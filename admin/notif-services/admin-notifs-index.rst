.. _admin-notifs-index:

************************************************************************************
Send alert notifications to third-party services using Splunk Observability Cloud
************************************************************************************

.. meta::
      :description: In addition to sending alert notifications via email, you can send alert notifications to various other services, such as PagerDuty, Slack, and BigPanda.
      :keywords: alert detector notification bigpanda slack pagerduty servicenow victorops outlook Microsoft teams Jira

.. toctree::
   :hidden:

   Send alert notifications to Amazon EventBridge<amazoneventbridge>
   Send alert notifications to BigPanda<bigpanda>
   Send alert notifications to Jira<jira>
   Send alert notifications to Microsoft Teams<microsoftteams>
   Send alert notifications to Opsgenie<opsgenie>
   Send alert notifications to PagerDuty<pagerduty>
   Send alert notifications to ServiceNow<servicenow>
   Send alert notifications to Slack<slack>
   Send alert notifications to Splunk On-Call<splunkoncall>
   Send alert notifications to xMatters<xmatters>
   Send alert notifications to a webhook<webhook>

..
  link to :ref:`sending alert notifications<manage-notifications>` instead once doc is migrated

In addition to sending alert notifications by email (see :ref:`manage-notifications`), you can configure Splunk Observability Cloud to send alert notifications to the following third-party services:

* Amazon EventBridge

  See :ref:`amazoneventbridge`.

* BigPanda

  See :ref:`bigpanda`.

* Jira

  See :ref:`jira`.

* Microsoft Teams

  See :ref:`microsoftteams`.

* Opsgenie

  See :ref:`opsgenie`.

* PagerDuty

  See :ref:`pagerduty`.

* ServiceNow

  See :ref:`servicenow`.

* Slack

  See :ref:`slack`.

* Splunk On-Call (VictorOps)

  See :ref:`splunkoncall`.

* xMatters

  See :ref:`xmatters`.

You can also configure Observability Cloud to send alert notifications to a webhook. See :ref:`webhook`.

These notification service integrations enable you to configure Observability Cloud to automatically send alert notifications to these third-party services and webhooks when a detector alert condition is met and when the condition clears.

Depending on the third-party service, the alert notification can create notifications, incidents, or issues, for example, based on information sent in the Observability Cloud alert notification.

For information about how to use detectors, events, alerts, and notifications, see :ref:`get-started-detectoralert`.

.. _naming-note:

.. admonition:: About naming your integrations

   When a user adds an alert recipient to a detector, they choose from the notification service integration names you create when configuring these integrations. For this reason, provide descriptive and unique names for the integrations you create. This helps ensure that users get enough information from an integration name to be able to select the correct recipient for the alert notifications.
