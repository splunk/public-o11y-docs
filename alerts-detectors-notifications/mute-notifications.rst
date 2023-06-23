.. _mute-notifications:

*****************************************************************
Mute alert notifications
*****************************************************************



.. meta::
   :description: Learn how to stop sending alert notifications based on conditions. 

Muting is helpful when you need to stop sending alert notifications during situations that are known to trigger alerts, such as maintenance windows or tests. Muting allows you to reduce noise and focus on what really matters.

You can stop sending, or mute, alert notifications based on certain conditions you can specify. You can mute notifications for a specified period of time or indefinitely, although alerts and events are still generated, and appear in Observability Cloud. 

To see your existing muting rules or create new ones, go to :guilabel:`Alerts`, then select the :guilabel:`Muting Rules` tab.

.. image:: /_images/alerts-detectors-notifications/muting-notifications/mutingtab.png
      :width: 99%
      :alt: Muting rules tab in Alerts

.. _muting-period-notes:
.. _muting-period-after:

How muting works
=============================================================================

Alert notifications are muted according to :ref:`muting rules <rule-configure>`, which include a schedule that sets the muting period. During the muting period, notifications that match the rule aren't sent to :ref:`subscribers <manage-notifications>`. The only exception are clear notifications for alerts that were active before the muting period started.

After the muting period ends, Observability Cloud restarts sending to subscribers notifications for alerts that are still active, or for alerts triggered within the last 90 days of the muting period. To turn off sending alert notifications after the muting period has ended, edit the :ref:`muting rule configuration <rule-configure>`.

.. note:: Muting rules only affect notifications: When a muting rule is active, alerts and events that are muted by the rule are still generated.

.. _create-muting-rules:

Create muting rules
=============================================================================

To create a muting rule, you can either:

- :ref:`Mute specific detectors or alerts <rule-from-alerts-page>`.
- :ref:`Create muting rules based on group-by dimensions <rule-from-group-by>`.
- :ref:`Create muting rules from scratch <rule-from-scratch>`. 

.. _rule-from-alerts-page:

Mute specific detectors or alerts
--------------------------------------------------------------------------

Creating muting rules from existing detectors or alerts is the fastest way of muting notifications.

To mute a specific detector or alert:

#. Open the :guilabel:`Alerts` page, and locate the detector or active alert you want to mute.
#. Select the more icon (|more|) next to the detector or alert, and select :menuselection:`Create Muting Rule`.
#. :ref:`Configure and save the muting rule <rule-configure>`.

.. note:: To mute a detector while you're :ref:`editing it <create-detectors>`, select :menuselection:`Mute` from the detector's action menu (|more|).

.. _rule-from-group-by:

Create muting rules based on group-by dimensions
--------------------------------------------------------------------------

Muting rules automatically include dimensions specified in :guilabel:`Group By`, so that you can mute notifications from multiple detectors with a single muting rule.

To create muting rules based on group-by dimensions:

#. Open :guilabel:`Alerts`, then select either the :guilabel:`Active Alerts` or :guilabel:`Detectors` tab.
#. Specify the grouping dimensions using the :guilabel:`Group By` buttons.
#. Select the more button (|more|) next any grouped item, and select :menuselection:`Create Muting Rule`.
#. :ref:`Configure and save the muting rule <rule-configure>`.

.. note:: Achieve greater precision in your muting rules by using built-in :ref:`dimensions <metadata-dimension>` instead of metadata collected asynchronously, such as AWS tags.

.. _rule-from-scratch:

Create muting rules from scratch
--------------------------------------------------------------------------

Create or edit muting rules at any time from the :guilabel:`Muting Rules` tab in :guilabel:`Alerts`. 

To create a new muting rule from scratch:

#. Open :guilabel:`Alerts`, then select the :guilabel:`Muting Rules` tab.
#. :ref:`Configure and save the muting rule <rule-configure>`.

.. _rule-configure:

Configure your muting rule
=============================================================================

Configure your muting rule:

.. image:: /_images/alerts-detectors-notifications/muting-notifications/mutingrule-modal.png
      :width: 65%
      :alt: Configure a muting rule

#. Use :guilabel:`Add property` to add (or modify) one or more properties for which you want to mute notifications. If using groups, you can also type :strong:`sf_tags` to find a list of tags. When you add more than one property, the muting rule interprets the properties using the AND logical operator.
#. Specify the :guilabel:`Schedule` during which notifications are muted (muting period) using the predefined periods or by creating a custom period. You can also mute indefinitely.
#. Include a :guilabel:`Reason` for the muting rule. The text you enter in this field is displayed when you hover over a rule in the :guilabel:`Muting Rules` tab, and can help others understand why alerts are being muted.
#. Select whether you want to clear any existing alerts that match the conditions you have set. If you're muting certain alerts to address a known problem, you might want to clear existing alerts so you are starting from a clean slate. Clearing these alerts also notifies downstream systems, such as VictorOps, OpsGenie, and PagerDuty.
#. Select whether you want to receive notifications for alerts that are still active when the muting period ends. 
#. Select :guilabel:`Next` to view a summary of the muting conditions. If you want to turn on the muting rule, select :guilabel:`Save`. It can take up to a minute before a new muting rule goes into effect. 

.. note:: Observability Cloud allows a maximum of 9,500 muting rules.

.. _view-muting-rules:

Search and view muting rules
=============================================================================

You can search existing muting rules and view their details at any time, as well as browse muted notifications.

Active and scheduled muting rules
-----------------------------------------------------------------------------

To find active or scheduled muting rules, use the search field in the :guilabel:`Muting Rules` tab on the :guilabel:`Alerts` page.

You can also view information about active and scheduled muting rules from different places on the Alerts page.

.. _view-all-rules:

-  On the :guilabel:`Muting Rules` tab, you can view a list of all active and scheduled muting rules.

-  On the :guilabel:`Detectors` and the :guilabel:`Active Alerts` tabs, running or scheduled muting rules are indicated by  :guilabel:`NOTIFICATIONS MUTED` labels next to the muted detector. You can select the label to view muting rules for the associated detector.

.. note:: If you select :guilabel:`NOTIFICATIONS MUTED` and the :strong:`Muting Rules` tab displays an empty page, then the muting rule was created based on properties instead of created for a detector.

.. _muted-notifications:

Muted notifications
-------------------------------------------------------------------

If a notification was muted, an indicator is displayed wherever the event might send the notification, such as on the :guilabel:`Active Alerts` tab or in an event feed.

To see events related to past muting rules, you can use the :ref:`Events sidebar <events-sidebar>` or the :ref:`Event overlay<dashboard-event-overlay>`. Events are generated when the rule becomes active (notifications stop) and when the rule becomes inactive (notifications resume). 

   -  To find muting events in the Events sidebar, search for :guilabel:`sf_eventType:alertMuting`.

   -  To overlay muting events on a dashboard, search for :guilabel:`alertMuting` in the Event Overlay search box.

.. _cancel-muting-rules:

Cancel or delete muting rules
=============================================================================

Canceling an active muting rule and resuming notifications for an alert or detector are the same thing. A canceled muting rules is deleted from Observability Cloud before it expires. Scheduled muting rules that are not yet active can also be deleted before they start.

To cancel an active muting rule or delete a scheduled muting rule from :guilabel:`Alerts`:

- Select the :guilabel:`Muting Rules` tab, and locate the muting rule you want to cancel or delete.

-  Select the more icon (|more|) next to the muting rule and select :menuselection:`Resume Notifications` or :menuselection:`Delete`.

You can also cancel muting rules from a muted alert or detector:

-  On the :guilabel:`Active Alerts` or the :guilabel:`Detectors` tab, select the :guilabel:`muted` or the :guilabel:`notifications muted` label.

   - For a detector, select the muting rule, then select :menuselection:`Resume Notifications`.
   - For an active alert, select the more icon (|more|), then select :menuselection:`Resume Notifications`.

If there are multiple rules, select the rule for which you want to resume notifications. In each case, you can confirm that you want to resume sending notifications.