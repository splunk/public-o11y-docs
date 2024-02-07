.. _spoc-alert-aggregation:

************************************************************************
Notification Aggregation
************************************************************************

.. meta::
   :description: Notifications begin to be aggregated when a large number of alerts are received in a short period of time.


Notifications begin to be aggregated when a large number of alerts are received in a short period of time. Splunk On-Call will automatically start this process when an alert storm is detected, to limit the number of notifications paging out. In order to completely mute all or specific alerts, see :ref:`rules-engine-transf`.


Notification Aggregation is triggered only in the event that three unique incidents are opened within a 60-second window. Once Notification Aggregation is triggered notifications for new incidents will not
immediately send upon opening but rather on a one-minute interval. A single notification will then display the number of incidents the user is being paged for, rather than for each. The medium of the
notification sent will align with whichever methods are specified within the user's personal paging policy of which they are in. Furthermore, if no new incidents arrive and the triggered alerts remain unacknowledged the next page will follow the user's paging policy.

When notification aggregation is not triggered, multiple incidents will page traditionally exactly as outlined in the personal paging policy of the user.

In order to exit Notification Aggregation, all incidents associated with the user, regardless of when they were opened in the process, must be acknowledged. Another way of phrasing this is the user must have zero incidents associated with them in the triggered state.

Below is an explanation of a few different scenarios.

.. list-table::
   :header-rows: 1
   :widths: 25, 15, 60

   * - :strong:`Action in Timeline`
     - :strong:`Aggregation`
     - :strong:`Expected Response`
   * - Two incidents are created in the Timeline in under 60 seconds.  
     - No
     - Notifications sent out for both incidents to the user on-call.
   * - Four incidents are created in the Timeline in under 60 seconds.
     - Yes
     - Three notifications sent out during the first minute then one in the following minute.
   * - Ten incidents are created in the Timeline every minute for five minutes
     - Yes
     - Three notifications sent out during the first minute then one for the following four minutes.


Alert Aggregation
=====================

Splunk On-Call aggregates alerts based on the entity_id field value within the incident payload. 

In the following image, in the Timeline, you will see incident #642 and four subsequent alerts tethered to it. If an Incident is in an Ack'd or Critical state while multiple alerts with the same entity_id continue to arrive in the Timeline, then the alerts will roll up under the incident and only page out based on the original  alert.

.. image:: /_images/spoc/nofif-alert-agg1.png
    :width: 100%
    :alt: Incident 642 has four subsequent alerts tied to it.


This alert aggregation works with Critical, Warning, and Ack'd message types as long the entity_id is shared between events. For more information regarding fields like entity_id and message_type, see :ref:`incident-fields-glossary.`

.. _note:: Alerts aggregating under a Warning message_type will aggregate normally unless the message_type value of the alert changes status from Warning to Critical. If this value changes in status from its source then any Ack'd incident will "Pop off of Ack" and return to a triggered state to start paging an on-call user.
