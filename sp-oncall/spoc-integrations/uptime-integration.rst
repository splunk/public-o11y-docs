.. _uptime-spoc:

Uptime integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Uptime integration for Splunk On-Call.

Uptime checks your website at 1 minute intervals from 30 different locations across 7 continents. The following walks through an easy integration to get your Uptime notifications in the Splunk On-Call timeline.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
====================================

In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`, :guilabel:`Uptime.com`.

.. image:: /_images/spoc/vo-side-uptime@2x.png
   :alt: Uptime integration

If the integration isn't active, select :guilabel:`Enable Integration` to generate your API Key.

.. image:: /_images/spoc/vo-uptime-2@2x.png
   :alt: API key

Uptime configuration
====================================

From the main dashboard, select :guilabel:`Notifications`, :guilabel:`Integrations`, :guilabel:`New Profile`.

.. image:: /_images/spoc/uptime-slide-1.png
   :alt: New profile in Uptime

Select Splunk On-Call as the provider type. Add the API Key from the Splunk On-Call integration page, then add the desired routing key.

.. image:: /_images/spoc/Uptime-slide-2.png
   :alt: Configure profile

Select :guilabel:`Save` to complete the integration.

