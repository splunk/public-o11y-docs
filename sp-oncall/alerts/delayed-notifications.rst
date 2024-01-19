.. _delayed-notifications:

************************************************************************
Configure delayed notifications
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Sometimes alerts resolve themselves and you don't need to be paged for
them immediately. Other times, you get an alert that does not need
immediate attention but you don't want it to get lost.

Using VictorOps escalation policies you can delay notifications from
being sent, or use a re-route to postpone a notification to alert you
later.

**Directions:**
~~~~~~~~~~~~~~~

Create a new team and give it a name, “Delayed Notification” in the
example below. 

.. image:: images/Delayed-Notification-team.png

Set the first step of the escalation policy to “If still unacked after
60 minutes,” then route the alert to your on-call team using the “Notify
the on duty user in [rotation]” option. 

.. image:: images/Delayed-Notification-Escalation-Policy.png

Finally setup a `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ so that
alerts can be sent directly to this new team.

You can now use this team for two forms of delayed notifications.

1) Route alerts directly to this team and if they automatically resolve
   before the second step, no pages will be sent

2) Re-route alerts that you want to look at later to this team, and they
   will begin paging you again after the specified amount of time.
