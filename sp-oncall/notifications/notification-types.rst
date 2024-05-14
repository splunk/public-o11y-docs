
.. _notif-types:

************************************************************************
Notification types
************************************************************************

.. meta::
   :description: Splunk On-Call offers many notification options including email, SMS, phone, and push notifications. This topic highlights each of the different options.


.. toctree::
    :hidden:

    snooze
    delayed-notifications
    call-notification-numbers




Splunk On-Call offers many notification options including email, SMS, phone, and push notifications. This topic highlights each of the different options.

.. note:: A maximum amount of four separate phone numbers for SMS and Phone notifications can be implemented into any given Splunk On-Call user profile.

You can also configure delayed notifications for alerts that may auto-resolve within a set time frame. For details, see 


.. raw:: html

  <embed>
    <h2>Push notification</h2>
  </embed>


Push notifications are sent through the application. We use push for:

-  Paging
-  On-call changes
-  Chats (timeline and private)
-  Control Call

When a push notification is used to deliver a page, you will have the option to acknowledge, reroute, or snooze the incident straight from the notification.

.. image:: /_images/spoc/notif-types1.png
    :width: 100%
    :alt: Splunk On-Call push notification.


.. raw:: html

  <embed>
    <h2>SMS</h2>
  </embed>

SMS notifications can be used in your personal paging policy. The message you receive is, at most, 160 characters, and it displays the
incident number, entity_display_name, and response code if two-way SMS is supported. When you receive an SMS notification, two codes are included in the message so you can acknowledge aor resolve the alert by responding with the correct five-digit code. These response codes expire after 1 hour.

.. image:: /_images/spoc/notif-types2.png
    :width: 100%
    :alt: Splunk On-Call SMS notification.


.. raw:: html

  <embed>
    <h2>SMS Subscription Management</h2>
  </embed>

You may stop and start our SMS notification subscription by replying to the message with STOP or START. Although, it is best to manage your notifications from the personal profile page in Splunk On-Call.


.. raw:: html

  <embed>
    <h2>Email</h2>
  </embed>

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

.. raw:: html

  <embed>
    <h2>Phone</h2>
  </embed>

Phone calls are used for paging. The “entity_display_name” field is read
aloud and then an option to acknowledge or resolve the alert is offered.

-  Press 4 to acknowledge
-  Press 6 to resolve

For a list of phone numbers used by Splunk On-Call, see :ref:`mobile-get-started`.
