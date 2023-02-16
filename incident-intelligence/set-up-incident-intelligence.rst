.. _ii-set-up-incident-intelligence:

Set up Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: Steps to configure your incident management in Incident Intelligence in Splunk Observability Cloud.

To route incidents to the necessary teams and people, you need to first generate alerts. Next, you'll complete your incident response configuration which includes creating and configuring incident policies and creating on-call schedules. After you configure your incident policies and schedules, users can begin responding to incidents. 

Prerequisite
===============================================================

- You must be an Observability Cloud administrator to configure and set up Incident Intelligence.

Get started
================

Complete these tasks to get started with Incident Intelligence:

#. Ingest alerts in Incident Intelligence. See :ref:`ii-ingest-alerts`.
#. Create incident policies to organize your alerts and incidents based on the impacted environmental component, for example, your web application service or checkout service. See :ref:`ii-create-configure-incident-policies`.
#. Configure the alert routing within the incident policy to associate alerts with an incident policy. See :ref:`ii-configure-alert-routing`.
#. Configure alert grouping within the incident policy to manage which alerts create an incident and how alerts are grouped into incidents. See :ref:`ii-configure-alert-grouping`.
#. Configure the incident workflow within the incident policy to determine who is notified when a new incident is triggered. See :ref:`ii-configure-incident-workflows`. 
#. Create an on-call schedule and add them as a step in your incident workflows. See :ref:`ii-create-manage-on-call-schedules`.

This completes the setup for Incident Intelligence. You are ready to begin responding to incidents. See :ref:`ii-respond-manage-incidents`.