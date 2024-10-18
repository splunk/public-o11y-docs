.. _threatstack-spoc:

Threat Stack integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Threat Stack integration for Splunk On-Call.

The following guide walks you through the steps needed to integrate your Threat Stack alerts into the Splunk On-Call
timeline.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
==========================================

From the Splunk On-Call web portal, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

|image1|

Select the Threat Stack Integration.

.. image:: /_images/spoc/Integrations-victorops-7.png
   :alt: Threat Stack integration

Turn on the integration and copy the service API endpoint to the clipboard.

.. image:: /_images/spoc/Integrations-victorops-8.png
   :alt: API endpoint URL

Threat Stack configuration
==========================================

From the main Threat Stack screen, select :guilabel:`Settings`, :guilabel:`Integrations`. Select the Splunk On-Call integration.

.. image:: /_images/spoc/threat2.png
   :alt: Select Splunk On-Call integration

Enter a name and description for the integration, then paste in the URL you copied from Splunk On-Call.

.. image:: /_images/spoc/threat3.png
   :alt: Integration details

Select the alert severity you want to send to Splunk On-Call.

.. image:: /_images/spoc/threat4.png
   :alt: Select alert severity

This completes the integration process.

.. |image1| image:: /_images/spoc/settings-alert-behavior-integrations-e1480978368974.png
