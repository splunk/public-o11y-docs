:orphan:

.. _delayed-notifications:

************************************************************************
Configure delayed notifications
************************************************************************

.. meta::
   :description: Configure Splunk On-Call escalation policies to delay notifications from being sent, or use a re-route to postpone a notification to alert you later.


Sometimes alerts resolve themselves and you don't need to be paged for them immediately. Other times, you get an alert that does not need immediate attention but you don't want it to get lost.

Using Splunk On-Call escalation policies you can delay notifications from being sent, or use a re-route to postpone a notification to alert you later.

To configure a delayed notification:

#. Create a new team and give it a name. The example below uses “Delayed Notification”.

.. image:: /_images/spoc/notif-delayed1.png
    :width: 100%
    :alt: Create a new team.


#. Set the first step of the escalation policy to “If still unacked after 60 minutes,” then route the alert to your on-call team using the “Notify the on duty user in [rotation]” option.

.. image:: /_images/spoc/notif-delayed2.png
    :width: 100%
    :alt: Create a new team.

#. Finally setup a :ref:`Routing Key <spoc-routing-keys>` so that alerts can be sent directly to this new team.

You can now use this team for two forms of delayed notifications.

1. Route alerts directly to this team and if they automatically resolve before the second step, no pages will be sent

2. Re-route alerts that you want to look at later to this team, and they will begin paging you again after the specified amount of time.
