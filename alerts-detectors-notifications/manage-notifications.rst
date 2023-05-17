.. _manage-notifications:

*****************************************************************
Manage notification subscribers 
*****************************************************************



.. meta::
  :description: Learn how to set recipients for your Observability Cloud notifications, so that new alerts and their resolution get to the right people in your organization.

When a :ref:`detector <create-detectors>` triggers an alert in Observability Cloud, a notification is sent to the recipients you defined. Each recipient is a subscriber to the detector that triggers the alert.

You can manage the subscribers for all notifications sent by your detectors at any time, so that new alerts and their status are sent to the right people, channels, and systems in your organization.

.. _receiving-notifications:

To manage the notification recipients of existing detectors:

- :ref:`Manage detector subscriptions from Alerts <manage-subs>`.
- :ref:`Subscribe to a detector using the bell icon <subscribe>`.
- :ref:`Edit the detector and change its rules <build-rules>`.

.. note:: If you're not receiving notifications as expected, see if any detector rules have been disabled (see :ref:`manage-rules`). Also check the |mtab| to make sure notifications haven't been :ref:`temporarily suspended <mute-notifications>`.

.. _manage-subs:

Manage subscribers from the Detectors tab
============================================================

To manage the subscribers to a specific detector:

#. Go to :guilabel:`Alerts` and select the :guilabel:`Detectors` tab.
#. Select the more icon (|more|) of the detector you want to edit.
#. In the actions menu, select :menuselection:`Manage Subscriptions`.
#. In the dialog box, select :guilabel:`Add Recipient`.

.. note:: Recipients can be added separately for each rule.

.. _subscribe:

Subscribe to alerts using the Detector menu
============================================================

You can manage subscriptions to any detector linked to a chart by using the detector (or bell) icon in each chart that has active detectors. To learn more, see :ref:`list-active-alerts`.

To subscribe to a linked detector from a chart:

#. Select the :guilabel:`Detector` menu (bell icon).
#. Select the detector, then select :guilabel:`Subscribe`.

   .. image:: /_images/alerts-detectors-notifications/manage-notifications/detector-subscribe.png
      :width: 75%
      :alt: Subscribing to a detector using the Detector menu

.. _remove-recipients:

Remove notification recipients from a detector
=============================================================

To stop sending notifications to a recipient, open the detector from the :guilabel:`Detectors` tab and edit each rule. 

You can also :ref:`manage-subs` to see a list of current recipients and select the :guilabel:`X` next to any recipient to unsubscribe them.

Do more with your notifications
=============================================================

To further manage your subscriptions and notifications:

-  :ref:`admin-notifs-index`.
-  :ref:`admin-team-notifications`.
-  :ref:`mute-notifications`.
