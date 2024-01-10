.. _admin-notifs-index:

************************************************************************************
Send alert notifications to third-party services using Splunk Observability Cloud
************************************************************************************

.. meta::
      :description: In addition to sending alert notifications via email, send alert notifications to other services, such as PagerDuty, Slack, and BigPanda.

.. toctree::
   :hidden:

   Send alerts to Amazon EventBridge<amazoneventbridge>
   Send alerts to BigPanda<bigpanda>
   Send alerts to Jira<jira>
   Send alerts to Microsoft Teams<microsoftteams>
   Send alerts to Opsgenie<opsgenie>
   Send alerts to PagerDuty<pagerduty>
   Send alerts to ServiceNow<servicenow>
   Send alerts to Slack<slack>
   Send alerts to Splunk On-Call<splunkoncall>
   Send alerts to Webhook<webhook>
   Send alerts to xMatters<xmatters>
   
..
  link to :ref:`sending alert notifications<manage-notifications>` instead once doc is migrated

In addition to sending alert notifications by email (see :ref:`manage-notifications`), you can configure Splunk Observability Cloud to send alert notifications to the following third-party services:


.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Third-party`
     - :strong:`Link to documentation`

   * - Amazon EventBridge
     - See :ref:`amazoneventbridge`

   * - BigPanda
     - See :ref:`bigpanda`.

   * - Jira
     - See :ref:`jira`.

   * - Microsoft Teams
     - See :ref:`microsoftteams`.

   * - Opsgenie
     - See :ref:`opsgenie`.

   * - PagerDuty
     - See :ref:`pagerduty`.

   * - ServiceNow
     - See :ref:`servicenow`.

   * - Slack
     - See :ref:`slack`.

   * - Splunk On-Call (VictorOps)
     - See :ref:`splunkoncall`.

   * - Webhook
     - See :ref:`webhook`.

   * - xMatters
     - See :ref:`xmatters`.



You can also configure Observability Cloud to send alert notifications to a webhook. See :ref:`webhook`.

These notification service integrations allow you to configure Observability Cloud to automatically send alert notifications to these third-party services and webhooks when a condition for a detector alert is met and when the condition clears.

Depending on the third-party service, the alert notification can create notifications, incidents, or issues, for example, based on information sent in the Observability Cloud alert notification.

For information about how to use detectors, events, alerts, and notifications, see :ref:`get-started-detectoralert`.

.. _naming-note:

.. note:: About naming your integrations

   When a user adds an alert recipient to a detector, they can choose from the notification service integration names you create when configuring these integrations. For this reason, provide descriptive and unique names for the integrations you create. This helps ensure that users get enough information from an integration name to be able to select the correct recipient for the alert notifications.
