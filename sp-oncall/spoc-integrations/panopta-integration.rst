.. _panopta-spoc:

Panopta integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Panopta integration for Splunk On-Call.

The following guide walks you through the steps needed to get the Panopta integration into Splunk On-Call.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
=====================================

In the Splunk On-Call portal go to :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Integrations menu

Select the :menuselection:`Panopta` integration.

.. image:: /_images/spoc/Panopta-final.png
   :alt: Panopta integrationº

Copy the service API endpoint URL.

.. image:: /_images/spoc/Panopta-2-final.png
   :alt: Endpoint URL

Make sure to add the appropriate routing key to your endpoint URL. See :ref:`spoc-routing-keys`.

Panopta configuration
=====================================

1. From the Alerting menu in the control panel, select the :guilabel:`Integrations` tab.

2. Select the webhooks integration.

3. Name the integration. Under the :guilabel:`Incident Webhook` tab, set the request method to POST, and the postback URL as the Splunk On-Call REST endpoint URL from the previous step.

4. Select a raw payload as your payload type, then copy the following JSON snippet in the code box:

```json
{"message_type":"CRITICAL","entity_id":"$name", "state_message":"$items - $reasons","monitoring_tool":"Panopta"}
```

To also send a recovery message to Splunk On-Call, create a second webhook under the :guilabel:`Clear Webhook` tab. Give it a name, like Splunk On-Call Recovery. Select POST as your request method, and paste in your Splunk On-Call REST
endpoint URL for the Postback URL.

```json
{"message_type":"RECOVERY","entity_id":"$name", "state_message":"$items - $reasons","monitoring_tool":"Panopta"}
```
