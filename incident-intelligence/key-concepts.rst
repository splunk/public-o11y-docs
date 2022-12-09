.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-key-concepts:

Key concepts in Splunk Incident Intelligence 
**************************************************

Here are some important concepts you need to know to successfully use Splunk Incident Intelligence:

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Concept`
     - :strong:`Description`
   
   * - Acknowledged
     - Incident responders select this status to indicate that they are aware of the incident. The status lifecycle for incidents is triggered, then acknowledged, and then resolved. Acknowledging an incident prevents the escalation to the next step in an incident workflow.

   * - Alert 
     - An alert is an event that meets a defined threshold or criteria. 

   * - Alert grouping
     - Use alert grouping to automate incident trigger conditions and group alerts. Alert grouping conditions are set up at the service level to let you customize the grouping rules for each service. 

   * - Alert routing
     - Alert routing associates alerts with a service. If an alert matches your configured alert routing conditions, it is routed to the service.

   * - Detector
     - Use a detector to specify the events for which you want to create an alert that is ingested into Incident Intelligence.

   * - Incident Management
     - The entire configuration process for a service in Incident Intelligence. This is where you create a service and configure alert routing, alert grouping, and incident workflows for incidents associated with a service. 

   * - Incident
     - An unplanned interruption to a service or reduction in the quality of a service that needs to be resolved. Each incident is made up of alerts that are ingested into Incident Intelligence.

   * - Incident action
     - Any status-changing event taken by a user or the system on an incident. Incident responders can acknowledge, resolve, or reject an incident. These actions update the incident status to reflect the most recent action. 

   * - Incident status
     - Where an incident is in its lifecycle. The status of an incident changes based on alert grouping conditions, as well as actions from a user. Throughout the lifecycle of an incident, the incident status can go from triggered, to acknowledged, to resolved or rejected. 

   * - Incident workflow
     - A configurable series of escalation steps that run in response to a triggered incident. Incident workflows determine who is notified of an incident and the time interval for notifications. You can also use incident workflows to manage how incidents are routed, add automation steps, and route to an on-call schedule.

   * - Incident alerting
     - The primary mechanism of Incident Intelligence. It is the process by which alerts and events are ingested at scale and grouped to create incidents. As alerts and events are ingested into Incident Intelligence, they pass through a series of data transformations, such as alert routing and alert grouping. 

   * - Maintenance
     - A service status that mutes all associated incidents. Use service maintenance for planned outages.

   * - Mean time to acknowledge (MTTA)
     - The average time it takes from when an incident is triggered to when the incident is acknowledged.

   * - Mean time to resolve (MTTR)
     - The average time it takes from when an incident is triggered to when the incident is resolved.

   * - Muted
     - An incident status that is set when the associated service is put into maintenance. 

   * - On-call schedules
     - An on-call schedule consists of one or more shifts, with members who rotate through a shift. Use an on-call schedule as a step in your services' incident workflows.

   * - Rejected
     - An incident status that incident responders can set to indicate that the incident is rejected. The status lifecycle for incidents is triggered, then acknowledged, and then resolved. Setting an incident status to rejected prevents the escalation to the next step in an incident workflow. When you reject an incident, it is considered invalid and closed; you will no longer be able to make updates to the incident.

   * - Resolved
     - An incident status that incident responders set to indicate that the incident is resolved. The status lifecycle for incidents is triggered, then acknowledged, and then resolved. Resolving an incident status prevents the escalation to the next step in an incident workflow.

   * - Service
     - Services let you organize incidents depending on the impacted component in your environment. Services include alert-routing and alert-grouping rules and an incident workflow. 

   * - Service-based routing
     - Incident Intelligence relies on a service-based routing scheme. Service-based routing automatically organizes and routes incidents depending on the service that it’s impacting. Rather than routing to a combination of teams and policies, the service an incident is associated with determines who is notified of the incident. 

   * - Snoozed
     - An incident status that is set when responders snooze the incident.

   * - Triggered
     - The initial stage of an incident is triggered. Incidents are triggered based on the alert grouping conditions you configured for the service.