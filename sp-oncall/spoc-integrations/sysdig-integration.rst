.. _sysdig-spoc:

Sysdig integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Sysdig integration for Splunk On-Call.

Sysdig cloud is the container-native monitoring solution, built for visibility, alerting, and troubleshooting of container and microservice environments. The following guide walks you through the necessary steps to integrate Sysdig with Splunk On-Call.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
====================================

From the Splunk On-Call web portal select :guilabel:`Settings` then :guilabel:`Alert Behavior` then :guilabel:`Integrations`.

.. image:: /_images/spoc/settings-alert-behavior-integrations-e1480978368974.png
   :alt: Integrations menu

Select the :guilabel:`Sysdig` integration.

.. image:: /_images/spoc/Integrations-victorops-9.png
   :alt: Sysdig integration button

Copy the service API key to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-10.png
   :alt: API key for the Sysdig integration


Sysdig configuration
====================================

Select the :guilabel:`Settings Menu`, then select :guilabel:`Notifications`. Select the plus next to :guilabel:`MY CHANNELS`. In the menu, select :guilabel:`VictorOps` (now Splunk On-Call).

.. image:: /_images/spoc/Sysdig2.png
   :alt: Select Splunk On-Call

In the following screen, paste your Splunk On-Call API key you previously copied to your clipboard, place in an appropriate routing key, give the channel a name, and then turn on :guilabel:`Resolve VictorOps incidents`.

Finally, select :guilabel:`Create channel`.

.. image:: /_images/spoc/Sysdig3.png
   :alt: Create the channel
