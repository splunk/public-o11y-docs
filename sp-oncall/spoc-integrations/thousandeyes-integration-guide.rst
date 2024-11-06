.. _thousandeyes-spoc:

ThousandEyes integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the ThousandEyes integration for Splunk On-Call.

The Splunk On-Call integration with ThousandEyes requires that you've implemented ThousandEyes in your environment. The following is a walkthrough on how to activate and configure the integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
========================================

From the main timeline select :guilabel:`Integrations`. From the resulting lists of integrations, select :guilabel:`ThousandEyes`.

If the integration isn't active, select :guilabel:`Enable Integration`. Copy the resulting service URL to your clipboard.

.. note::
   
   Replace the ``$routing_key`` string at the end of the alert with a valid routing key from your Splunk On-Call instance. You can do this after pasting the URL into ThousandEyes. A valid, complete service URL looks like the following:

   ``https://alert-mapping.victorops.com/integrations/thousandeyes/v1/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/thisIsMyRoutingKey``

   Where ``thisIsMyRoutingKey`` is a valid routing key in your Splunk On-Call instance.

ThousandEyes configuration
========================================

Navigate to the Alert Rules interface by selecting :guilabel:`Alerts`, :guilabel:`Alert Rules`. Locate the alert rule that you want to alert Splunk On-Call on. Expand this rule and select the :guilabel:`Notifications` tab.

Under the :guilabel:`Webhooks` section, select :guilabel:`Configure Webhooks`. If you have already configured webhooks for this alert, select :guilabel:`Edit Webhooks` and then select :guilabel:`Add a new webhook`.

Give the webhook a name and paste the Splunk On-Call service URL from the previous step, ensuring to replace ``$routing_key`` with a valid routing key from your Splunk On-Call instance. Leave the :guilabel:`Auth Type` value set to ``None``.

To test the webhook, select :guilabel:`Test`. A message appears in the dialog box stating :guilabel:`Webhook test completed successfully` after ThousandEyes has successfully sent a test webhook.

Select :guilabel:`Add New Webhook` to save the configuration. Select this new webhook from the list of webhooks to activate the webhook.

