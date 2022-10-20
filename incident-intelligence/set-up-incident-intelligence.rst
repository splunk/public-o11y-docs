.. _set-up-incident-intelligence:

.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

Set up Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: To route incidents to the necessary teams and people, you need to complete your incident response configuration.

To route incidents to the necessary teams and people, you need to first generate alerts and then complete your incident response configuration. Incident response configuration is where you create and configure services, and create on-call schedules. After you complete your incident response configuration, users can begin responding to incidents. 

Complete these tasks to get started with Incident Intelligence:

#. :ref:`setup-alerts`
#. :ref:`setup-service`
#. :ref:`setup-alert-routing`
#. :ref:`setup-alert-grouping`
#. :ref:`setup-incident-workflows`
#. :ref:`setup-manage-on-call-schedules`

.. _setup-alerts:

Generate alerts
=====================

To generate alerts in Incident Intelligence, you can define a detector or ingest alerts using an ingest endpoint. See :ref:`generate-alerts`.

.. _setup-service:

Create a service
=====================

Use services to organize incidents depending on the impacted environmental component. Begin by creating a service. See :ref:`create-service`.

.. _setup-alert-routing:

Configure the alerts that are routed to your service
=======================================================

Next, use alert routing to associate alerts with a service. If an alert matches your alert filter conditions, it is routed to the service. See :ref:`configure-alert-routing`.

.. _setup-alert-grouping:

Configure how alerts are grouped
=====================================

After you configure which alerts are routed to your service, use alert grouping to manage which alerts create an incident and how alerts are grouped into incidents.

.. _setup-incident-workflows:

Configure incident workflows for your service
===============================================

After you manage which alerts create an incident and how alerts are grouped into incidents, use incident workflows to determine who is notified when a new incident is triggered. See :ref:`configure-incident-workflows`.

.. _setup-manage-on-call-schedules:

Create your on-call schedules
===============================

Use an on-call schedule as a step in your service incident workflows. See :ref:`create-manage-on-call-schedules`.