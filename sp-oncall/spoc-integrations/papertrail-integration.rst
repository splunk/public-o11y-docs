.. _Papertrail-spoc:

Papertrail integration for Splunk On-Call
º******************************************************

.. meta::
    :description: Configure the Papertrail integration for Splunk On-Call.

Papertrail offers frustration-free log management. The following guide walks you through the Splunk On-Call integration with Papertrail.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
====================================

From the main timeline select :guilabel:`Settings`, :guilabel:`Alert
Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Select integration

Select the :guilabel:`Papertrail` integration and copy the service API key to
your clipboard.

.. image:: /_images/spoc/Papertrail-final.png
   :alt: Copy the API key


Papertrail configuration
====================================

From the :guilabel:`Events` screen select :guilabel:`Create Alert`.

.. image:: /_images/spoc/All_Systems_—_Example_Alert_—_Papertrail.png
   :alt: Sample alert in Papertrail

Select the :guilabel:`Splunk On-Call` integration option under :guilabel:`Monitoring &
Notifications`.

.. image:: /_images/spoc/Example_Alert_—_Papertrail.png
   :alt: Splunk On-Call integration option

Paste your service API key into the :guilabel:`REST Endpoint API Key` field. Place in the appropriate routing key and
message type for Papertrail.

.. image:: /_images/spoc/Create_Alert_—_Papertrail.png
   :alt: Create alert in Papertrail

Select :guilabel:`Create Alert`.
