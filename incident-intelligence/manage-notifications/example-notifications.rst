.. _ii-example-notifications:

Example notifications: Email, mobile push, SMS, and voice
***********************************************************

.. meta::
   :description: Review example notifications: email, voice, SMS, and mobile push. 

Each notification method provides a different level of detail about the triggered incident. See the following example info each notification method.

Email notification
====================

When you select email notification, you will receive an email with this content: 

.. image:: /_images/incident-intelligence/Email-notification-example.png
    :width: 75%
    :alt: Incident Intelligence email notification example content

You can select the incident link to go to the incident details where you can review details and acknowledge, dismiss, or resolve the incident.

SMS notification
====================

When you select SMS notification, you will receive an SMS message with this content: 

INC-[NUMBER] [SEVERITY] Incident title: [Link to incident in Splunk Observability Cloud].

You can select the incident link to go to the incident details where you can review details and acknowledge, dismiss, or resolve the incident.

Mobile push notification
============================

When you select mobile push notification, you will receive an push notification with this content: 

:strong:`INC-[NUMBER] Incident title`
[SEVERITY] for policy [incident policy name]: Rule "[rule name]" in detector "[detector name]" triggered at [date-time triggered]

You can select the notification to go to the incident details where you can review details and acknowledge, dismiss, or resolve the incident.

Voice notification
====================

When you select voice notification, you will receive a phone call that with this recorded phone message: "You are being paged by Splunk Incident Intelligence. You are an assigned responder for a triggered incident. Log in to Splunk Incident Intelligence to view the incident details and acknowledge."