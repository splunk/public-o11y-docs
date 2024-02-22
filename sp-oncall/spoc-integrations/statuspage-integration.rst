.. _statuspage-integration:

Statuspage integration for Splunk On-Call
**********************************************************

Use the Splunk On-Call integration with Statuspage to provide real-time, updated status messages to stakeholders. Use templates or create new incidents that update Statuspage subscribers from within the Splunk On-Call.

Requirements
====================

* Splunk On-Call version required: Full-Stack

Obtain your organization API key from Statuspage
========================================================

1. Select your user icon in the bottom left-hand corner and then select :guilabel:`API info`.
2. Under :guilabel:`Organization API keys` copy the API key to your clipboard.

Configure the integration in Splunk On-Call
===============================================

1. Go to :guilabel:`Integrations` then :guilabel:`Statuspage`.
2. Select :guilabel:`Enable Integration`. 
3. Paste your Statuspage API Key in :guilabel:`StatusPage API Token`.

   .. image:: /_images/spoc/1-Insert-API-token-1.png
      :alt: Enable the integration and provide your API key
      :width: 35%

4. Select your Statuspage ID from the drop-down menu:

   .. image:: /_images/spoc/2.-Select-page-ID.png
      :alt: Select your Statuspage ID
      :width: 75%

Go the timeline in Splunk On-Call to find the Statuspage icon in the upper right-hand corner. Select the Statuspage icon for options to create new Statuspage incidents.

.. image:: /_images/spoc/3.-SPIO-Icon-1.png
   :alt: Statuspage icon
   :width: 75%

When you create a new incident you can use a template or populate the incident details manually: 

.. image:: /_images/spoc/4.-New-SPIO.png
   :alt: Create a new Statuspage incident
   :width: 75%

You can also update existing incidents:

.. image:: /_images/spoc/5.-Update-SPIO.png
   :alt: Update an existing Statuspage incident
   :width: 75%
