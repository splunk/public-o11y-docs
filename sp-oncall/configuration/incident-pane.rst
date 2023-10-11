[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** N/A (SaaS)

**VictorOps Version Required:** Standard and Enterprise

**What you need to know:** The Incident Pane serves as a repository for
recent activities in your Timeline.

[/ht_toggle]

The Incident Pane, located to the right of the Timeline, houses alerts
that come into VictorOps. We currently store 7 days or 1,000 events
worth of timeline alert history, whichever comes first. Historical data
that fall outside of the aforementioned storage parameters of the
Incident Pane may be obtained through the use of the `VictorOps
API <https://help.victorops.com/knowledge-base/api/>`__. For further
information on the VictorOps API please see the related Knowledge Base
articles via the link above.

--------------

Incident Owner Tabs
===================

The tabs along the top level in the Incident Pane are the Incident Owner
tabs which define the association of incidents by all activity,
individual user interaction (*Your Incidents*) and team interaction.
These tabs allow you to quickly limit the scope of work from all
incidents to incidents that pertain only to you and your team.

In order to display all or only certain panes (People, Timeline &
Incident) click on the “Customize View” and in this drop-down, a user
can de-select any of the options and then re-select if wanted.

.. image:: images/Incident-Pane-Custom-Views.png

--------------

Incident Status Tabs
====================

The Incident Pane, located to the right of the Timeline, houses alerts
that come into VictorOps. At the top of the Incident Pane, you will see
three categories: *Triggered, Acknowledged, and Resolved*.

.. image:: images/Incident-Status-Tabs.png

From the *Triggered* tab, you may select a single incident or multiple
incidents to *Ack,* re-route, or snooze.

.. image:: images/Incident-Status.png

From the *Acked* tab, you may select a single incident or multiple
incidents to *Resolve,* reroute, or snooze.

.. image:: images/ACK-RES-Incidents.png

Once a Triggered incident has been Ack’d and Resolved, you may view it
in the *Resolved* tab. Here, and in the other tabs, you may select a
single incident to review. You may also pop the incident details out
into separate window for easier viewing.

.. image:: images/Resolved-tab-incidents.png

Also, please notice the `Control Call (Conference
Calling) <https://help.victorops.com/knowledge-base/control-call-conference-calling/>`__
and `Maintenance
Mode <https://help.victorops.com/knowledge-base/maintenance-mode/>`__
icons in the upper right-hand corner of the Incident Pane. Control Call
is an Enterprise level feature that enables quick and effective
communication via conference call with your team when you’re in the
midst of a firefight. Maintenance Mode, on the other hand, allows you to
temporarily silence alerts in order to complete work without
unnecessarily paging on-call teammates. For further information on these
features please see the related Knowledge Base articles via the links
above.

--------------

New Triggered Incident
======================

When a new incident reaches the VictorOps timeline, the incident will
appear in the triggered incidents tab.

.. image:: images/Triggered-Incident-in-timeline.png

Once the triggered incident appears under the *Triggered* incident tab
you may Ack it by clicking on the check mark in the upper right corner
of the incident.

.. image:: images/Triggered-Incident-in-timeline-1.png

You also have the option to acknowledge multiple incidents at one time.
In order to do this, you check the box on the left corner of the
triggered incident in the incident pane.

.. image:: images/Select-incidents-to-resolve.png

--------------

Incident Details
================

The Incident Details view provides a holistic overview of all
information related to a particular incident including annotation. The
incident details view can be accessed in a few ways:

-  Incident number link located on the top of alert card (Incident #177
   Datadog in screenshot below)
-  Incident Details link in bottom right corner of alert card
-  Incident number link in the bottom right corner of the alert card

.. image:: images/Incident-card-pop-out.png

-  Annotations can be found on the bottom right corner of incident cards

   -  Note: Annotations are added to incidents using the Rules Engine.
      This feature is only available in the Full Stack plan.

.. image:: images/Annotations-in-an-Alert.png

The incident details view contains the incident card and three tabs
displaying the detailed payload, Incident Timeline (i.e. all events from
the timeline related to the incident), and annotations from the most
recent alert.

.. image:: images/Tabs-in-the-incident-details.png

Incidents can be acknowledged, rerouted, and resolved from this view.
Additional responders can be added from this view as well.

.. image:: images/ack-from-the-incident-details.png

Popping-out the incident details view for a particular incident will
open a new window with a more expansive display. This is useful if there
are multiple annotations or a lengthy payload or incident timeline.

.. image:: images/pop-out-incident-details-new-window.png

Below is an example of the incident popped-out in a new window with a
transformed Annotation.

.. image:: images/incpopout.png

Note: It isn’t possible to attach annotations to manually created
incident using the Rules Engine. Manually created incidents will never
show annotations in the Incident Details View.

If an incident doesn’t have annotations attached to it, VictorOps will
display the following message.

.. image:: images/Manual-incidents-cannot-have-annotations.png
