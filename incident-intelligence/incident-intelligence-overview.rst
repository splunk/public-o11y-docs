.. _ii-incident-intelligence-overview:

Splunk Incident Intelligence overview
************************************************************************

Welcome to Incident Intelligence. Use this high-level overview to better understand the end-to-end journey of an incident. These icons are used in the overview graphics to symbolize key terms and processes in Incident Intelligence and Splunk Observability Cloud:

.. image:: /_images/incident-intelligence/overview/Incident-Intelligence-Overview-Terms.svg
      :width: 50%
      :align: center
      :alt: Incident Intelligence key terms and icons.

Typical alert generation creates alert noise
==============================================

Detectors within Splunk Observability Cloud monitor your systems. As an Observability Cloud user, you can configure detectors at varying thresholds to generate alerts when something unusual happens, such as a bug or issue. When a detector meets a specified threshold, it generates alerts. A single detector can generate multiple alerts, particularly when several issues occur at once, or when an issue persists over time and causes further problems downstream. The end result is a countless number of generated alerts.

The following diagram shows generated alerts and the downstream noise they create:


.. image:: /_images/incident-intelligence/overview/Incident-Intelligence-Overview1.svg
      :width: 99%
      :align: center
      :alt: Alert generation creates alert noise.

Incident policies route and group alerts into incidents that trigger workflows
========================================================================================

You can determine which alert signals are the most important to the performance of your infrastructure and use alerts to intelligently trigger incidents that you want responders to investigate. First, create alert routing and grouping conditions using alert metadata to filter alerts into incidents. This process reduces alert noise and allows responders to map an issue back to the system or service where it occurred. Second, create an incident workflow that automatically runs time-based hierarchical steps when an incident is triggered. All incident workflows must include a notification to a person, such as a responder in an on-call schedule. If a responder doesn't acknowledge an incident when they are on call, the incident is escalated to the next step in the workflow. This entire process is called an incident policy.

The following workflow shows the end-to-end incident policy process, starting with an alert, moving into routing and grouping, and ending with a notification to the on-call responder: 

.. image:: /_images/incident-intelligence/overview/Incident-Intelligence-Overview2.svg
      :width: 99%
      :align: center
      :alt: Incident policies route and group alerts into incidents that trigger workflows.

Responders are notified when a triggered incident workflow routes to an on-call schedule
============================================================================================

On-call scheduling ensures the correct person is notified at the right time to resolve system issues as soon as they occur. An on-call schedule contains a group of responders who understand a specific part of the system architecture. Responders rotate through their schedule every day, week, or month based on how their schedule is set up by a team manager or admin. On-call schedules are included as a step in an incident workflow. When an incident is triggered, the first step in the workflow routes to a schedule, and the responder who is on call for that schedule is paged.

The following diagram shows how on-call schedules and incident workflows work together to ensure the correct responder is notified of an incident:

.. image:: /_images/incident-intelligence/overview/Incident-Intelligence-Overview3.svg
      :width: 99%
      :align: center
      :alt: On-call schedules, triggered in incident workflows, notify the appropriate responder.

End-to-end incident response process
=======================================

This simplified end-to-end incident response flow demonstrates the value of Incident Intelligence. An issue appears in the system that is noticed by detectors monitoring that system or service. The detectors fire, causing a spike in generated alerts. Those alerts are mapped to an incident policy and the influx of activity triggers an incident. The workflow for that incident policy connects to an on-call schedule and a responder is paged. The responder acknowledges the incident and begins investigating the root cause by looking at the alerts grouped under that incident. They resolve the incident and verify their solution. Alerts decrease and the system returns to normal. 

The following diagram shows this entire incident response process: 


.. image:: /_images/incident-intelligence/overview/Incident-Intelligence-Overview4.svg
      :width: 99%
      :align: center
      :alt: End-to-end incident response process.
