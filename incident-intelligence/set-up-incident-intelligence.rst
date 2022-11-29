.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-set-up-incident-intelligence:

Set up Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: To route incidents to the necessary teams and people, you need to complete your incident management.

To route incidents to the necessary teams and people, you need to first generate alerts and then complete your incident management. Incident Management is where you create and configure services, and create on-call schedules. After you complete your incident management, users can begin responding to incidents. 

Complete these tasks to get started with Incident Intelligence:

#. :ref:`ii-setup-alerts`
#. :ref:`ii-setup-service`
#. :ref:`ii-setup-alert-routing`
#. :ref:`ii-setup-alert-grouping`
#. :ref:`ii-setup-incident-workflows`
#. :ref:`ii-setup-manage-on-call-schedules`

.. _ii-setup-alerts:

Ingest alerts
=====================

To begin using Incident Intelligence you need to ingest alerts in Incident Intelligence. You can create a detector for the one of the available alert sources to automatically pass alerts into Incident Intelligence or ingest third-party alerts using an ingest endpoint. See :ref:`ii-ingest-alerts` to get started ingesting alerts in Incident Intelligence.

.. _ii-setup-service:

Create a service
=====================

Next, you need to create services to organize your alerts and incidents based on the impacted environmental component. Begin by creating a service. See :ref:`ii-create-configure-services` for steps to create a service.

.. _ii-setup-alert-routing:

Configure the alerts that are routed to your service
=======================================================

Next, use alert routing to associate alerts with a service. If an alert matches your alert routing filter conditions, it is routed to the service. See :ref:`ii-configure-alert-routing` for steps to create alert routing rules.

.. _ii-setup-alert-grouping:

Configure how alerts are grouped
=====================================

After you configure which alerts are routed to your service, use alert grouping to manage which alerts create an incident and how alerts are grouped into incidents. See :ref:`ii-configure-alert-grouping` for steps to create your alert grouping rules.

.. _ii-setup-incident-workflows:

Configure incident workflows for your service
===============================================

After you manage which alerts create an incident and how alerts are grouped into incidents, use incident workflows to determine who is notified when a new incident is triggered. See :ref:`ii-configure-incident-workflows`. 

.. _ii-setup-manage-on-call-schedules:

Create your on-call schedules
===============================

You can use on-call schedules as a step in your incident workflow. See :ref:`ii-create-manage-on-call-schedules` for steps to create an on-call schedule.

This completes the setup for Incident Intelligence and you are ready to begin responding to incidents. See :ref:`ii-respond-manage-incidents`.