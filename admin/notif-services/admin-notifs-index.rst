.. _admin-notifs-index:

************************************************************************************
Send alert notifications to services using Splunk Observability Cloud
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
   Send alerts to Splunk platform<splunkplatform>
   Send alerts to Webhook<webhook>
   Send alerts to xMatters<xmatters>
   

In addition to sending alert notifications by email (see :ref:`manage-notifications`), you can configure Splunk Observability Cloud to send alert notifications to the following services:

The following table shows third-party service integrations

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Third-party service`
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

   * - Webhook
     - See :ref:`webhook`.

   * - xMatters
     - See :ref:`xmatters`.

The following table shows Splunk service integrations:

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Splunk service`
     - :strong:`Link to documentation`

   * - Splunk On-Call (VictorOps)
     - See :ref:`splunkoncall`.

   * - Splunk platform
     - See :ref:`splunkplatform`.

These notification service integrations allow you to configure Splunk Observability Cloud to automatically send alert notifications to these third-party services and webhooks when a condition for a detector alert is met and when the condition clears.

Depending on the third-party service, the alert notification can create notifications, incidents, or issues, for example, based on information sent in the Splunk Observability Cloud alert notification.

For information about how to use detectors, events, alerts, and notifications, see :ref:`get-started-detectoralert`.

.. _naming-note:

.. note:: About naming your integrations

   When a user adds an alert recipient to a detector, they can choose from the notification service integration names you create when configuring these integrations. For this reason, provide descriptive and unique names for the integrations you create. This helps ensure that users get enough information from an integration name to be able to select the correct recipient for the alert notifications.

.. raw:: html

  <h2>List of SignalFx IP addresses</h2>

The following table contains a list of the IP addresses that you can use to allow incoming traffic (such as alert webhook requests) from SignalFx realms. Use these IP addresses as sources on an allow list.

.. _ipaddress-note:

.. note:: New SignalFx IP addresses

   As part of our ongoing infrastructure expansion, Splunk is adding new IP addresses (marked with an asterisk * in the table referenced below) to SignalFx realms. These IP addresses will become active by November 1st, 2025.
   If your organization uses IP allow lists to control network traffic, please add these new IP addresses to your existing allow lists before the advised date, while keeping the current IP addresses in your allow lists.

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
      * 3.213.126.84/32\ :sup:`*`
      * 3.213.180.202/32\ :sup:`*`
      * 107.20.133.167/32\ :sup:`*`
      * 44.218.172.57/32\ :sup:`*`
  * - us1
    - * 44.230.152.35/32
      * 44.231.27.66/32
      * 44.225.234.52/32
      * 44.230.82.104/32
      * 52.25.165.141/32\ :sup:`*`
      * 100.22.10.37/32\ :sup:`*`
      * 44.244.87.29/32\ :sup:`*`
      * 52.35.147.71/32\ :sup:`*`
  * - eu0
    - * 108.128.26.145/32
      * 34.250.243.212/32
      * 54.171.237.247/32
      * 54.74.50.205/32\ :sup:`*`
      * 34.240.86.238/32\ :sup:`*`
      * 18.200.127.69/32\ :sup:`*`
  * - eu1
    - * 3.73.240.7
      * 18.196.129.64
      * 3.126.181.171
      * 3.65.69.124/32\ :sup:`*`
      * 52.28.246.163/32\ :sup:`*`
      * 3.64.236.188/32\ :sup:`*`
  * - eu2
    - * 13.41.86.83
      * 52.56.124.93
      * 35.177.204.133
      * 3.10.90.137/32\ :sup:`*`
      * 13.43.28.243/32\ :sup:`*`
      * 35.178.45.205/32\ :sup:`*`
  * - jp0
    - * 35.78.47.79/32
      * 35.77.252.198/32
      * 35.75.200.181/32
      * 54.199.72.126/32\ :sup:`*`
      * 54.65.248.210/32\ :sup:`*`
      * 35.78.155.194/32\ :sup:`*`
  * - au0
    - * 13.54.193.47/32
      * 13.55.9.109/32
      * 54.153.190.59/32
      * 52.63.153.198/32\ :sup:`*`
      * 13.238.129.162/32\ :sup:`*`
      * 52.63.252.167/32\ :sup:`*`
  * - us2
    - * 35.247.113.38/32
      * 35.247.32.72/32
      * 35.247.86.219/32
