.. _statuspage-integration:

Statuspage integration for Splunk On-Call
**********************************************************

Use the Splunk On-Call integration with StatusPage.io to provide real-time, updated status messages to stakeholders. Use templates or create new incidents that update Statuspage.io subscribers from within the Splunk On-Call.

Requirements
====================

* Splunk On-Call version required: Full-Stack

Obtain your organization API key from StatusPage.io
========================================================

1. Select your user icon in the bottom left-hand corner and then select :guilabel:`API info`.
2. Under :guilabel:`Organization API keys` copy the API key to your clipboard.

Configure the integration in Splunk On-Call
===============================================

1. Go to :guilabel:`Integrations` then :guilabel:`StatusPage.io`.
2. Select :guilabel:`Enable Integration`. 
3. Paste your StatusPage.io API Key in :guilabel:`StatusPage API Token`.

   .. image:: /_images/spoc/1-Insert-API-token-1.png
      :alt: Enable the integration and provide your API key
      :width: 95%

4. Select your StatusPage.io ID from the drop-down menu:

   .. image:: /_images/spoc/2.-Select-page-ID.png
      :alt: Select your Statuspage.io ID
      :width: 95%

Go the timeline in Splunk On-Call to find the StatusPage.io icon in the upper right-hand corner. Select the StatusPage.io icon for options to create new StatusPage.io incidents.

.. image:: /_images/spoc/3.-SPIO-Icon-1.png
   :alt: StatusPage.io icon
   :width: 95%

When you create a new incident you can use a template or populate the incident details manually: 

.. image:: /_images/spoc/4.-New-SPIO.png
   :alt: Create a new StatusPage incident
   :width: 95%

You can also update existing incidents:

.. image:: /_images/spoc/5.-Update-SPIO.png
   :alt: Update an existing StatusPage incident
   :width: 95%
