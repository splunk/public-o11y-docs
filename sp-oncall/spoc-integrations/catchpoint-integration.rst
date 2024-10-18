.. _catchpoint-integration-spoc:

Catchpoint integration for Splunk On-Call
**********************************************************

.. meta:: 
   :description: Configure the Catchpoint integration for Splunk On-Call.

Requirements
========================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Catchpoint delivers world-class Web Performance Monitoring for all
internet services: Website, Mobile, App, Ads, API, DNS, CDN, Streaming,
Cloud, & more.

The following walks you through the steps needed to integrate
Catchpoint with Splunk On-Call.

In Splunk On-Call
=====================

In Splunk On-Call, select :guilabel:`Integrations`, then :guilabel:`Catchpoint`.

If the integration isn't active, select the :guilabel:`Enable Integration` button to generate your endpoint URL. Replace the ``$routing_key`` section with the actual routing key
you intend to use. To view or configure routing keys in Splunk On-Call, select :guilabel:`Settings`, then :guilabel:`Routing Keys`.

.. image:: /_images/spoc/Catchpoint-skitch.png
   :alt: The Catchpoint integration in Splunk On-Call. The integration displays a routing key under "Service API Endpoint".

In Catchpoint
=================

#. Navigate to :guilabel:`Settings`, then :guilabel:`API`.

.. image:: /_images/spoc/catchpoint2.png
   :alt: The "Settings" tab containing the "API" menu.

#. Under Alert Webhook set the status to Active, Paste in your "API URL"
   that you got in Splunk On-Call.

#. Select :guilabel:`Template`, then :guilabel:`Add new`.

.. image:: /_images/spoc/Screenshot-2017-05-18-15.33.00.png
   :alt: The "Status" menu with an "Add new" option highlighted.

#. Give it a name ("VictorOps Integration", for example) and set the
   Format to ``JSON``.

.. image:: /_images/spoc/API___Catchpoint_®.png
   :alt: The "Add template" menu with a filled-in bubble labelled "JSON".

#. Paste the following code in the *Template* section:

.. code-block::

   {
   “message_type”:“:math:`{switch('`\ {notificationLevelId}','0','warning','1','critical','2','recovery','3','recovery')}”,
   “monitoring_tool”: “Catchpoint”, “entity_display_name”: “Catchpoint
   Alert for ${testName} on node :math:`{nodeDetails(`\ {nodeName})}”,
   “entity_id”: “:math:`{testId}\_`\ {AlertInitialTriggerDateUtcEpoch}”,
   “state_message”: “Alert Type
   ID-:math:`{alertTypeId}, Test Type ID-`\ {testTypeId},
   Node-:math:`{nodeDetails('`\ {nodeName}')}, Product-
   :math:`{productId}, Test\_url-`\ {testUrl}” }

#. Select your newly created template, and select :guilabel:`Save`.

.. image:: /_images/spoc/Screenshot-2017-05-18-15.43.31.png
   :alt: An arrow points to a green buttoned stating "Save".

If you're looking for additional variables to add to your payload, log into your Catchpoint account and seek out the Alert Webhook Macros.
You can add as many variables as you want, but customizing the
parameters of the existing Template might result in degraded
functionality.
