:orphan:

.. _notif-types:

************************************************************************
Notification Aggregation
************************************************************************

.. meta::
   :description: Splunk On-Call offers many notification options including email, SMS, phone, and push notifications. This topic highlights each of the different options.

Splunk On-Call offers many notification options including email, SMS, phone, and push notifications. This topic highlights each of the
different options.

Please note that a maximum amount of 4 separate phone numbers for SMS/Phone notifications can be implemented into any given Splunk
On-Call user profile.

Push
==========

Push notifications are sent through the application. We use push for:

-  Paging
-  On-call changes
-  Chats (timeline and private)
-  Control Call

When a push notification is used to deliver a page, you will have the option to acknowledge, reroute, or snooze the incident straight from the notification.

.. image:: /_images/spoc/notif-types1.png
    :width: 100%
    :alt: Splunk On-Call push notification.


SMS
===========

SMS notifications can be used in your personal paging policy. The message you receive is, at most, 160 characters, and it displays the
incident number, entity_display_name, and response code if two-way SMS is supported. When you receive an SMS notification, two codes are included in the message so you can acknowledge aor resolve the alert by responding with the correct five-digit code. These response codes expire after 1 hour.

.. image:: /_images/spoc/notif-types2.png
    :width: 100%
    :alt: Splunk On-Call SMS notification.


SMS Subscription Management
====================================

You may stop and start our SMS notification subscription by replying to the message with STOP or START. Although, it is best to manage your notifications from the personal profile page in Splunk On-Call.

Email
==============

Emails can be used for pages. Emails can also be used as reminders that your Splunk On-Call instance is in :ref:`maintenance-mode`, or that you have a gap in your schedule due to a :ref:`scheduled-overrides` that is not covered.

.. image:: /_images/spoc/notif-types3.png
    :width: 100%
    :alt: Splunk On-Call email notification.

Scheduled Override:

.. image:: /_images/spoc/notif-types4.png
    :width: 100%
    :alt: Splunk On-Call scheduled override email.

Maintenance Mode:

.. image:: /_images/spoc/notif-types5.png
    :width: 100%
    :alt: Splunk On-Call scheduled maintenance override.

Phone
============

Phone calls are used for paging. The “entity_display_name” field is read
aloud and then an option to acknowledge or resolve the alert is offered.

-  Press 4 to acknowledge
-  Press 6 to resolve

For a list of phone numbers used by Splunk On-Call, see :ref:`mobile-get-started`.
