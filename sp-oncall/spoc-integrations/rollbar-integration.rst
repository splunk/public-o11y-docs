.. _rollbar-spoc:

Rollbar integration for Splunk On-Call
******************************************************

.. meta::
    :description: Configure the Rollbar integration for Splunk On-Call.

Use the Rollbar integration for Splunk On-Call to send your Rollbar notification directly to the Splunk On-Call timeline. Follow these steps to get the integration implemented.

Implementation steps
=========================

1. From :new-page:`Rollbar, <https://rollbar.com/blog/victorops-incident-management/>` select :guilabel:`Settings` from the top of your screen, and then :guilabel:`Notifications` from the left side bar. 
2. Under :guilabel:`Available Channels` select VictorOps. 

   .. image:: /_images/spoc/Rollbar1.png

3. You will then be presented with 2 input boxes. One for API Key and 1 for Routing Key, both of which can be found in the Splunk On-Call interface.
  
   .. image:: /_images/spoc/Rollbar2.png

In Splunk On-Call, select :guilabel:`Integrations` and then :guilabel:`Rollbar`. If the integration has not yet been configured, select :guilabel:`Enable Integration` to generate your endpoint URL. Be sure to replace the `$routing_key`` section with the actual routing key you intend to use.

Resolve via Splunk On-Call
================================

.. note:: This feature requires the Full-Stack features set in order to access :ref:`custom-outbound-webhooks`.

Recoveries in Splunk On-Call can be passed to Rollbar as a resolve. To do this, an access token from Rollbar is needed to leverage the API. This token can be found under :guilabel:`Settings` and then :guilabel:`Menu options`. Copy the value of the `post_client_item`.

.. image:: /_images/spoc/Rollbar_access_token@2x.png

#. In Splunk On-Call, navigate to :guilabel:`Integrations`, and then :guilabel:`Outgoing Webhooks`. 

#. Select :guilabel:`Add Webhooks`. Use the following values for your configuration and be sure to replace the access token with value copied from Rollbar.

-  Action: `Incident-Resolved`
-  Method: `PATCH`
-  Content-Type: `application/json`
-  To: `https://api.rollbar.com/api/1/item/${{ALERT.rollbar_item_id}}?access_token=YOUR_ACCESS_TOKEN_HERE`
-  Payload: `{“status”:“resolved”}`

In the end, your webhook should look like the following image:

.. image:: /_images/spoc/Rollbar_recovery_webhook@2x.png

