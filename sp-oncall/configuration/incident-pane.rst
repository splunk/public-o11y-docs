.. _incident-pane:

************************************************************************
Incident Pane
************************************************************************

.. meta::
   :description: About the Incident pane in Splunk On-Call which displays incoming alerts.

Requirements
=======================

Versions Supported: N/A (SaaS)
VictorOps Version Required: Standard andEnterprise

The Incident Pane serves as a repository for recent activities in your Timeline. The Incident Pane, located to the right of the Timeline, houses alerts that come into VictorOps. We currently store seven days or 1,000 events worth of timeline alert history, whichever comes first. Historical data that fall outside of the aforementioned storage parameters of the Incident Pane may be obtained through the use of the :new-page:`VictorOps API <https://help.victorops.com/knowledge-base/api/>`.


Incident Owner tabs
===========================

The tabs along the top level in the Incident Pane are the Incident Owner tabs which define the association of incidents by all activity, individual user interaction and team interaction. These tabs allow you to quickly limit the scope of work from all incidents to incidents that pertain only to you and your team.

In order to display all or only certain panes (People, Timeline & Incident) select :guilabel:`Customize View` and in this drop-down, a user can de-select any of the options and then re-select if wanted.

.. image:: /_images/spoc/spo-incidentpane.png
    :width: 100%
    :alt: Select the views to display using the Customize View drop-down.



Incident Status tabs
==========================

The Incident pane, located to the right of the Timeline, houses alerts that come into Splunk On-Call. At the top of the Incident pane, you will see three categories: :guilabel:`Triggered`, :guilabel:`Acknowledged`, and :guilabel:`Resolved`.

.. image:: /_images/spoc/spo-incident-status.png
    :width: 100%
    :alt: Select the status to display.


From the :guilabel:`Triggered` tab, you may select a single incident or multiple
incidents to ack, re-route, or snooze.

.. image:: /_images/spoc/incident-status2.png
    :width: 100%
    :alt: Select the status to display.


From the :guilabel:`Acked` tab, you may select a single incident or multiple
incidents to Resolve, reroute, or snooze.

.. image:: /_images/spoc/incidents-ack.png
    :width: 100%
    :alt: Select a response.


Once a Triggered incident has been ack'd and resolved, you may view it in the :guilabel:`Resolved` tab. Here, and in the other tabs, you may select a single incident to review. You may also pop the incident details out into separate window for easier viewing.

.. image:: /_images/spoc/incidents-resolved.png
    :width: 100%
    :alt: View resolved incidents on the Resolved tab.


Also, note the Control Call (Conference Calling) and Maintenance Mode icons in the upper right-hand corner of the Incident Pane. Control Call is an Enterprise-level feature that enables quick and effective communication via conference call with your team when you're in the midst of a firefight. Maintenance Mode, on the other hand, allows you to temporarily silence alerts in order to complete work without unnecessarily paging on-call teammates. 


New triggered incident
===============================

When a new incident reaches the Splunk On-Call timeline, the incident will appear in the triggered incidents tab.

.. image:: /_images/spoc/incident-triggered1.png
    :width: 100%
    :alt: View new incidents on the Triggered tab.


Once the triggered incident appears under the :guilabel:`Triggered` incident tab you may Ack it by selecting the check mark in the upper right corner of the incident.

.. image:: /_images/spoc/incident-triggered2.png
    :width: 100%
    :alt: Acknowledge the triggered incident.


You also have the option to acknowledge multiple incidents at one time. In order to do this, you select the box on the left corner of the triggered incident in the incident pane.

.. image:: /_images/spoc/incidents-resolved.png
    :width: 100%
    :alt: Acknowledge multiple incidents.


Incident details
=======================

The Incident Details view provides a holistic overview of all information related to a particular incident including annotation. The incident details view can be accessed in a few ways:

-  Incident number link located on the top of alert card (Incident #177 Datadog in screenshot below)
-  Incident Details link in bottom right corner of alert card
-  Incident number link in the bottom right corner of the alert card

.. image:: /_images/spoc/incident-details1.png
    :width: 100%
    :alt: Select the incident number link.


-  Annotations can be found on the bottom right corner of incident cards

   -  Note: Annotations are added to incidents using the Rules Engine. This feature is only available in the Full Stack plan.

.. image:: /_images/spoc/incident-details2.png
    :width: 100%
    :alt: Add annotations.


The incident details view contains the incident card and three tabs displaying the detailed payload, Incident Timeline (that is, all events from the timeline related to the incident), and annotations from the most recent alert.

.. image:: /_images/spoc/incident-details3.png
    :width: 100%
    :alt: Add annotations.

Incidents can be acknowledged, rerouted, and resolved from this view. Additional responders can be added from this view as well.

.. image:: /_images/spoc/incident-details4.png
    :width: 100%
    :alt: Add responders if needed.

Popping-out the incident details view for a particular incident will open a new window with a more expansive display. This is useful if there are multiple annotations or a lengthy payload or incident timeline.

.. image:: /_images/spoc/incident-details5.png
    :width: 100%
    :alt: Add responders if needed.

Below is an example of the incident popped-out in a new window with a transformed Annotation.

.. image:: /_images/spoc/incident-details6.png
    :width: 100%
    :alt: Add responders if needed.

.. :note:: It isn't possible to attach annotations to manually created incident using the Rules Engine. Manually created incidents will never show annotations in the Incident Details View.

If an incident doesn't have annotations attached to it, Splunk On-Call will display the following message.

.. image:: /_images/spoc/incident-details7.png
    :width: 100%
    :alt: Manually triggered incidents can't have annotations.
