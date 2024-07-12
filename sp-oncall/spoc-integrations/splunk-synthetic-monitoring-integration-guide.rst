.. _splunk-synthetics-spoc:

Splunk Synthetic Monitoring integration for Splunk On-Call
************************************************************

.. meta::
    :description: Configure the Splunk Synthetic Monitoring integration for Splunk On-Call.

Splunk Synthetic Monitoring verifies applications are performing well and alerts you to user experience problems before they impact your
customers. Integrate Splunk Synthetic Monitoring with Splunk On-Call to send alert notifications into the Splunk On-Call timeline.

Requirements
======================

You must be an administrator in Splunk Synthetic Monitoring and a Global or Alert Admin in Splunk On-Call to configure this integration.

Configure Splunk On-Call
==============================

1. In Splunk On-Call, select :guilabel:`Integrations` then :guilabel:`Splunk Synthetic Monitoring`. 
2. Select :guilabel:`Enable Integration` to generate your endpoint URL. Copy the endpoint URL for use in the next steps.

Configure Splunk Synthetic Monitoring
==========================================

#. In Splunk Synthetic Monitoring, select the 3-dot menu next to your profile icon and select :guilabel:`Alert Webhooks`.

   .. image:: /_images/spoc/Frame-6.png
    :width: 65%
    :alt: Select Alert Webhooks from the 3-dot menu in Splunk Synthetic Monitoring.

#. Select :guilabel:`New` to create a new webhook and select :guilabel:`Splunk On-Call` as the type.

   .. image:: /_images/spoc/Frame-5.png
    :width: 95%
    :alt: Select New to create a new webhook in Splunk Synthetic Monitoring.

#. Give the webhook a name and specify your triggers. In :guilabel:`Send request to` for each trigger, replace the default ``https://alert.victorops.com/integrations/<<YOUR_VICTOROPS_REST_ENDPOINT>>`` with the URL you copied from Splunk On-Call. 
#. On each trigger, replace the trailing ``$routing_key`` value with the Splunk On-Call routing key you want this webhook to call. For more information on routing keys, see :ref:`spoc-routing-keys`.
#. You can leave the default values for payloads or replace the default variables with variables for your use case.
#. Select :guilabel:`Test` to test the integration. This sends and alert with your specified payloads into the Splunk On-Call timeline.
#. Select :guilabel:`Create` to save your Alert Webhook. Splunk Synthetic Monitoring will now send a notification to Splunk On-Call whenever the trigger conditions are met.
