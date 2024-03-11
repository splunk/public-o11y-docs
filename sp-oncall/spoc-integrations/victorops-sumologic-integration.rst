.. _sumologic-spoc:

Sumo Logic integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the <integrationName> integration for Splunk On-Call.

<Add description of the integration here>

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Sumo Logic is the industry's leading secure and purpose-built
cloud-based machine data analytics service that leverages big data for
real-time IT insights.

This integration uses the Sumo Logic “Connections” option to send
webhooks to the Splunk On-Call REST endpoint, creating incidents in the
timeline. The following guide describes the steps needed to
integrate the two platforms.

Splunk On-Call configuration
------------------------------

In Splunk On-Call, select :guilabel:`Integrations`. If the integration has not yet been
enabled, click the :guilabel:`Enabble Integration` button to generate your endpoint
URL. Copy this URL for use in the Sumo Logic portion of integration
configuration. Be sure to replace the “$routing_key” section with the
actual routing key you intend to use.

Sumo Logic configuration
---------------------------

From the main dashboard select **Manage** then **Connections.**

.. image:: /_images/spoc/Sumo2.png
   :alt: sumo2

   sumo2

Add a new Connection.

.. image:: /_images/spoc/Sumo3.png
   :alt: sumo3

   sumo3

Select the **Webhook** connection type.

.. image:: /_images/spoc/Sumo4.png
   :alt: sumo4

   sumo4

Give the Connection a name and description and pPaste in the URL you got
from the Splunk On-Call portal. No Authorization Header is needed. 
Copy the following JSON payload and paste it into the “Payload” box.

.. note:: Depending on your scheduled search settings, you may want to use :guilabel:`SearchQuery` for the "state\_message" field in place of :guilabel:`SearchDescription`.

.. code-block:: none

   {“message_type”:“CRITICAL”,

   “entity_id”:“{{SearchName}}”,

   “state_message”:”{{SearchQuery}}”,

   “Search Description”:“{{SearchDescription}}”,

   “Search Name”:“{{SearchName}}”,

   “Number of Raw Results”:“{{NumRawResults}}”

   }

.. image:: /_images/spoc/Sumo5.png
   :alt: sumo5

   sumo5

Add as many additional fields to the payload as you want.

.. image:: /_images/spoc/Sumo6.png
   :alt: sumo6

   sumo6

Make sure to test the connection and verify that you receive a 200 response
code.

Lastly, add the Splunk On-Call connection to one of your
scheduled searches. To do this, select **Library** and then choose one
of your searches.

.. image:: /_images/spoc/Sumo7.png
   :alt: sumo7

   sumo7

From the search screen, select :guilabel:`Edit`.

.. image:: /_images/spoc/Sumo8.png
   :alt: sumo8

   sumo8

Select to **Edit this search's schedule >**

.. image:: /_images/spoc/Sumo9.png
   :alt: sumo9

   sumo9

Under “Alert Type” select :guilabel:`Webhook` and then choose
the Splunk On-Call webhook set up earlier.

You also have the option to "Customize Payload" for individual searches,
becasue you can add or edit any field on a per-search basis.

Finally, click :guilabel:`Save`.

.. image:: /_images/spoc/Sumo10.png
   :alt: sumo10

   sumo10
