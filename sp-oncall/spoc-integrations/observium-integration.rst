.. _observium-spoc:

Observium integration for Splunk On-Call
************************************************

.. meta::
    :description: Configure the Observium integration for Splunk On-Call.

Observium is an autodiscovering network monitoring platform supporting a wide range of device types, platforms, and operating systems. The Splunk On-Call integration allows you to send Observium notifications into the Splunk On-Call timeline. The following guide walks you through the steps needed to configure this integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==============================

From the main timeline select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Search for an integration

Select the :guilabel:`Observium` Integration.

.. image:: /_images/spoc/Observium-final.png
   :alt: Observium integration

Turn on the integration, then copy the service API endpoint to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-4.png
   :alt: API endpoint URL for Observium

.. note:: The variable name at the end of the API service endpoint might vary. For example, ``$incident_alert`` instead of ``$routing_key``.

Observium configuration
=======================================

In Observium, create a new contact. For the :strong:`Transport Method`, select :guilabel:`Splunk On-Call`.

Make sure that the :strong:`Contact Status` is turned on. Set an appropriate routing key and paste the REST endpoint URL from your clipboard.

.. image:: /_images/spoc/Observium4.png
   :alt: Configuring the new contact

Select :guilabel:`Save Changes` to complete the integration.

