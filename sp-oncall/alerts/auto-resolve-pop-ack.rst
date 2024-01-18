.. _auto-resolve:

************************************************************************
Auto-resolve
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Click on *Settings* >> Click on *Alert Configuration.* To **pop out of
ack**, select “Acknowledged incidents will return to triggered after”
and then a timeframe. To **auto-resolve**, click “Auto-resolve incidents
after” and then select a timeframe.

**Pop Out of Ack:**
-------------------

In the midst of a major fire-storm (or in the middle of the night) it is
possible for incidents that have been acknowledged to be forgotten or
ignored.  This feature allows admins to configure the amount of time an
incident can sit in an acknowledged state before it is automatically
re-triggered.

Simply check the box and select a time-frame and any incidents that have
been acknowledged but unresolved for that time-frame will automatically
be re-triggered.  The incident will return to a triggered (un’acked)
state and start again at the beginning of the escalation policy for the
team that received the incident initially.

**Auto Resolve:**
-----------------

The Auto-Resolve function allows admins to automatically resolve any
incidents that have been open longer than a configured time-frame.

**Please note that both of these features are global settings, which
means that they will be applied to ALL incidents.**
