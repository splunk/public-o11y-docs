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

.. raw:: html

  <h2>List of SignalFx IP addresses</h2>

The following table contains a list of the IP addresses that you can use to allow incoming traffic (such as alert webhook requests) from SignalFx realms. Use these IP addresses as sources on an allow list.

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 30 70

  * - Realm
    - IP addresses
  * - us0
    - * 34.199.200.84/32
      * 52.20.177.252/32
      * 52.201.67.203/32
      * 54.89.1.85/32
  * - us1
    - * 44.230.152.35/32
      * 44.231.27.66/32
      * 44.225.234.52/32
      * 44.230.82.104/32
  * - eu0
    - * 108.128.26.145/32
      * 34.250.243.212/32
      * 54.171.237.247/32
  * - jp0
    - * 35.78.47.79/32
      * 35.77.252.198/32
      * 35.75.200.181/32
  * - au0
    - * 13.54.193.47/32
      * 13.55.9.109/32
      * 54.153.190.59/32
  * - us2
    - * 35.247.113.38/32
      * 35.247.32.72/32
      * 35.247.86.219/32
  * - pypl-us0
    - * 34.71.191.98/32
      * 35.223.99.128/32
      * 104.197.78.46/32
      * 34.71.238.212/32
      * 34.71.87.119/32
      * 35.222.12.253/32
      * 34.69.78.213/32
      * 104.198.193.192/32
      * 35.224.108.3/32
      * 35.225.25.230/32
      * 34.72.179.217/32
      * 34.68.200.146/32
  * - pypl-us1
    - * 34.106.103.12/32
      * 34.106.108.234/32
      * 34.106.11.108/32
      * 34.106.113.160/32
      * 34.106.120.216/32
      * 34.106.123.171/32
      * 34.106.128.116/32
      * 34.106.14.16/32
      * 34.106.141.111/32
      * 34.106.157.73/32
      * 34.106.158.172/32
      * 34.106.159.153/32
      * 34.106.159.219/32
      * 34.106.159.223/32
      * 34.106.168.26/32
      * 34.106.182.151/32
      * 34.106.188.199/32
      * 34.106.189.216/32
      * 34.106.19.16/32
      * 34.106.193.1/32
      * 34.106.201.22/32
      * 34.106.202.167/32
      * 34.106.204.94/32
      * 34.106.205.136/32
      * 34.106.208.43/32
      * 34.106.217.166/32
      * 34.106.222.206/32
      * 34.106.225.130/32
      * 34.106.23.30/32
      * 34.106.238.30/32
      * 34.106.240.76/32
      * 34.106.244.239/32
      * 34.106.255.197/32
      * 34.106.37.199/32
      * 34.106.4.109/32
      * 34.106.4.142/32
      * 34.106.47.126/32
      * 34.106.47.239/32
      * 34.106.48.122/32
      * 34.106.53.18/32
      * 34.106.54.83/32
      * 34.106.60.229/32
      * 34.106.76.151/32
      * 34.106.86.186/32
      * 34.106.89.25/32
      * 34.106.31.9/32
      * 34.106.198.31/32
      * 34.106.29.89/32
      * 34.106.187.198/32
      * 34.106.248.219/32