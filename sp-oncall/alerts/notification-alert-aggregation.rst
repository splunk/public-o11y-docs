.. _spoc-alert-aggregation:

**Notification Aggregation**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notifications begin to be aggregated when a large number of alerts are
received in a short period of time. VictorOps will automatically start
this process when an alert storm is detected, to limit the number of
notifications paging out. In order to completely mute all or specific
alerts, see Rules Engine Transformations.

Notification Aggregation is triggered only in the event that three
unique incidents are opened within a 60-second window. Once Notification
Aggregation is triggered notifications for new incidents will not
immediately send upon opening but rather on a one-minute interval. A
single notification will then display the number of incidents the user
is being paged for – rather than for each. The medium of the
notification sent will align with whichever methods are specified within
the user's personal paging policy of which they are in. Furthermore, if
no new incidents arrive and the triggered alerts remain unacknowledged
the next page will follow the user's paging policy.

When notification aggregation is not triggered, multiple incidents will
page traditionally exactly as outlined in the personal paging policy of
the user.

In order to exit Notification Aggregation, all incidents associated with
the user– regardless of when they were opened in the process – must be
acknowledged. Another way of phrasing this is the user must have zero
incidents associated with them in the triggered state.

Below is an explanation of a few different scenarios.

+-----------------------+-----------------------+-----------------------+
| Action in Timeline    | Aggregation           | Expected Response     |
+=======================+=======================+=======================+
| Two incidents are     | x                     | Notifications sent    |
| created in the        |                       | out for both          |
| Timeline in under 60  |                       | incidents to the      |
| seconds               |                       | user(s) on-call       |
+-----------------------+-----------------------+-----------------------+
| Four Incidents are    | ✓                     | Three notifications   |
| created in the        |                       | sent out during the   |
| Timeline in under 60  |                       | first minute then one |
| seconds               |                       | in the following      |
|                       |                       | minute                |
+-----------------------+-----------------------+-----------------------+
| Ten Incidents are     | ✓                     | Three notifications   |
| created in the        |                       | sent out during the   |
| Timeline every minute |                       | first minute and then |
| for five minutes      |                       | one for the following |
|                       |                       | 4 minutes             |
+-----------------------+-----------------------+-----------------------+

 

**Alert Aggregation**
~~~~~~~~~~~~~~~~~~~~~

VictorOps aggregates alerts based on the **entity_id** field value
within the incident payload. Below, in the Timeline, you will see
incident #642 and four subsequent alerts tethered to it. If an Incident
is in an *Ack'd* or *Critical* state while multiple alerts with the same
**entity_id** continue to arrive in the Timeline, then the alerts will
roll up under the incident and only page out based on the original
alert.

.. image:: images/Timeline_-_EMStester.png

This alert aggregation works with *Critical, Warning,* and *Ack'd*
message types as long the **entity_id** is shared between events. For
more information regarding fields like **entity_id** and message_type
please see our `Glossary of Fields documentation  found
here <https://help.victorops.com/knowledge-base/incident-fields-glossary/#glossary-of-fields>`__.

Please Note: Alerts aggregating under a *Warning* **message_type** will
aggregate normally unless the **message_type** value of the alert
changes status from *Warning* to *Critical*. If this value changes
(escalates) in status from its source then any Ack'd incident will “Pop
of of Ack” and return to a triggered state to start paging an on-call
user.
