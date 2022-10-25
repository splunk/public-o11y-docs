.. _ii-get-started-incident-intelligence:

.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

Introduction to Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: Get started collaboratively diagnosing and remediating issues across your environment using Incident Intelligence. 

Collaboratively diagnose and remediate issues across your environment using Incident Intelligence. Incident Intelligence lets site reliability engineers (SREs) in IT and DevOps resolve outages with alert correlation, incident response, and on-call routing, paired with automation and collaboration. 

How Incident Intelligence fits into Splunk Observability Cloud 
=================================================================

Splunk Observability Cloud provides a unified experience for collecting and monitoring metrics, logs, and traces from common data sources. Incident Intelligence is integrated into Observability Cloud to provide alert analytics and on-call management in one place. With Incident Intelligence, you can reduce alert noise, automate actions, and accelerate incident response. Incident Intelligence is an add-on for Splunk Observability Cloud. 

| For more information about Observability Cloud, see :ref:`welcome`. 

.. _feedback-incident-intelligence:

How to provide feedback
===========================
Feedback about your experience with Incident Intelligence is valuable. Use the following forms to share feedback or ask questions about Incident Intelligence :

- To share feedback about Incident Intelligence, see :new-page:`Incident Intelligence Ideas in Splunk Ideas <https://quickdraw.splunk.com/redirect/?product=Observability&location=beta.ideas&version=beta>`.
- To ask questions about Incident Intelligence, see :new-page:`Ask Questions about Incident Intelligence in the Splunk Community <https://quickdraw.splunk.com/redirect/?product=Observability&location=beta.questions&version=beta>`.

.. _wcidw-incident-intelligence:

Get started with Incident Intelligence
=====================================================

For a step-by-step tutorial on how to set up Incident Intelligence, see :ref:`ii-set-up-incident-intelligence`.

What can I do with Incident Intelligence?
===================================================
The following table provides an overview of what you can do with Incident Intelligence:

.. list-table::
   :header-rows: 1
   :widths: 50, 22, 28

   * - :strong:`Do this`
     - :strong:`With this tool`
     - :strong:`Link to documentation`

   * - Create services to automatically organize incidents depending on the impacted service.
     - Services
     - See :ref:`ii-create-configure-services`.

   * - Route alerts to associate them with a service.
     - Service-based alert routing
     - See :ref:`ii-configure-alert-routing`.

   * - Manage which alerts create an incident and how alerts are grouped into incidents. Use alert severity to determine if an incident is created and also group alerts by time period.
     - Alert grouping
     - See :ref:`ii-configure-alert-grouping`.

   * - Create incident workflows with a series of escalating steps to determine who is notified to respond when a new incident is triggered.
     - Incident workflows
     - See :ref:`ii-configure-incident-workflows`.

   * - Create on-call schedules and shifts to use as a step in your service incident workflows.
     - On-call schedules and shifts
     - See :ref:`ii-create-manage-on-call-schedules`.

   * - Use incident management tools to respond to incidents as they are triggered.
     - Incident response
     - See :ref:`ii-respond-manage-incidents`.
     

How Incident Intelligence works 
===================================

Incident Intelligence generates alerts and groups alerts to create incidents. Alerts then pass through a series of data preparations such as filters and enrichments. Alerts are then grouped based on the grouping rules that you configure. An incident is automatically triggered and escalated to the corresponding team if an alert or set of alerts meets the criteria for a critical incident. 

Required Incident Intelligence prerequisites and permissions
---------------------------------------------------------------------
- Before you start, sign the pre-release terms and have Incident Intelligence enabled in your Observability Cloud account. For more information, contact your sales representative.
- You must be an Observability Cloud administrator to configure and set up Incident Intelligence.
