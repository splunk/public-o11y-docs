.. _notif-types:

************************************************************************
Notification Aggregation
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.

Splunk On-Call offers many notification options including email, SMS,
phone, and push notifications. This article highlights each of the
different options.

Please note that a maximum amount of 4 separate phone numbers (for
SMS/Phone notifications) can be implemented into any given Splunk
On-Call user profile.

**Push**
~~~~~~~~

Push notifications are sent through the application. We use push for:

-  Paging
-  On-call changes
-  Chats (timeline and private)
-  Control Call

When a push notification is used to deliver a page, you will have the
option to acknowledge, reroute, or snooze the incident straight from the
notification.

.. image:: images/Phone.png

**SMS**
~~~~~~~

SMS notifications can be used in your personal paging policy. The
message you receive is, at most, 160 characters, and it displays the
incident number, entity_display_name, and response code if 2 way SMS is
supported. When you receive an SMS notification, two codes are included
in the message so you can acknowledge and/or resolve the alert by
responding with the correct five-digit code. Please note that these
response codes expire after 1 hour.

.. image:: images/VO-SMS-example-screen.png

SMS Subscription Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You may stop and start our SMS notification subscription by replying to
the message with STOP or START. Although, it is best to manage your
notifications from the personal profile page in Splunk On-Call.

**Email**
~~~~~~~~~

Emails can be used for pages. Emails can also be used as reminders that
your Splunk On-Call instance is in `Maintenance
Mode <https://help.victorops.com/knowledge-base/maintenance-mode/>`__,
or that you have a gap in your schedule due to a `Scheduled
Override <https://help.victorops.com/knowledge-base/scheduled-overrides/>`__ that
is not covered.

Paged incident: |notificationtype3|

Scheduled Override:

.. image:: images/Scheduled-Override.png

Maintenance Mode:

.. image:: images/Maintence-mode.png

**Phone**
~~~~~~~~~

Phone calls are used for paging. The “entity_display_name” field is read
aloud and then an option to acknowledge or resolve the alert is offered.

-  Press 4 to acknowledge
-  Press 6 to resolve

For a list of phone numbers used by On-Call please refer to the
following article:

`VictorOps Phone
Numbers <https://help.victorops.com/knowledge-base/mobile-app-getting-started/#add-victorops-to-your-contacts>`__

.. |notificationtype3| image:: images/notificationtype3.png
