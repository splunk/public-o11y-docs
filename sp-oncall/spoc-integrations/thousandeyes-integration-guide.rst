[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

Required: ThousandEyes Implemented Environment

VictorOps Version Required: Starter, Growth, or Enterprise

[/ht_toggle]

The VictorOps integration with ThousandEyes requires that you’ve
implemented ThousandEyes in your environment. The following is a brief
walkthrough on how to enable and configure the integration.

--------------

In VictorOps
------------

From the main timeline select Integrations. From the resulting lists of
integrations, select ThousandEyes.

If the integration has not yet been enabled, click the “Enable
Integration” button. Copy the resulting service URL to your clipboard.

**NOTE:** The $routing_key at the end of the alert will need to be
replaced with a valid routing key from your VictorOps instance. This can
be completed after pasting the URL into ThousandEyes. A valid, complete
service URL should appear as follows:

``https://alert-mapping.victorops.com/integrations/thousandeyes/v1/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/thisIsMyRoutingKey``

Where thisIsMyRoutingKey is a valid routing key in your VictorOps
instance.

--------------

In ThousandEyes
---------------

Navigate to the Alert Rules interface by selecting *Alerts >> Alert
Rules.* 

Locate the alert rule that you wish to alert VictorOps on. Expand this
rule and select the **Notifications** tab. Under the **Webhooks**
section, click the **Configure Webhooks** link, or, if you have already
configured webhooks for this alert, click **Edit Webhooks.** Click **Add
a new webhook.**

Give the webhook a meaningful name and paste the VictorOps service URL
from the VictorOps step above, ensuring to replace **$routing_key** with
a valid routing key from your VictorOps instance. Leave the **Auth
Type** value set to **None**.

To test the webhook, click the **Test** button. You will see a message
appear in the modal stating, “Webhook test completed successfully” after
ThousandEyes has successfully sent a test webhook.

Click **Add New Webhook** to save this configuration. Select this new
webhook from the list of webhooks to activate the webhook.
