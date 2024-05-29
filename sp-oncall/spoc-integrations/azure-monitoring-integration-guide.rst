.. _msazure-monitor-spoc:

Microsoft Azure Monitor integration for Splunk On-Call
*******************************************************

.. meta::
    :description: Configure the Microsoft Azure Monitor integration for Splunk On-Call.

Microsoft Azure Monitor allows you to gain visibility and control across your hybrid cloud with simplified operations management and security. This integration allows you to make use of Splunk On-Call incident management for all your Azure alerts. The following instructions guide you through the integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call
==================

Activate the Microsoft Azure integration by navigating to :guilabel:`Integrations`, :guilabel:`All integrations`. Select the :guilabel:`Azure Monitoring` integration option, then select :guilabel:`Enable Integration`.

Copy the service API endpoint to your clipboard. Make sure to update the routing keys. See :ref:`spoc-routing-keys`.


Azure Monitoring configuration
==================================================

To send requests to trigger an incident in Splunk On-Call, you can use alerting, which is native to Azure's Monitoring functionality.

Follow these steps:

1. Login to Azure portal. From the menu, select :guilabel:`Monitoring`, :guilabel:`Alerts`, :guilabel:`New Alert Rule`.
2. Define the alert rule based on your monitoring needs.
3. Define the alert details with any name and description.
4. Select a new action group to call your new Splunk On-Call Service API Endpoint.

   1. For all the names, fill in a value of ``splunkoncall`` to help define
      the action.
   2. For the action, select ``webhook``.
   3. Paste the service endpoint you copied to your clipboard from Splunk On-Call.
   4. Turn on the common alert schema.

5. Select :guilabel:`OK`.
6. Make sure to link the newly created Splunk On-Call action group to the desired alert rules.

Alerts flow into the Splunk On-Call timeline based on the trigger conditions.
