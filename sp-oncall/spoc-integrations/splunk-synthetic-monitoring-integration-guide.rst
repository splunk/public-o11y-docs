Splunk Synthetic Monitoring verifies applications are performing well
and alerts you to user experience problems before they impact your
customers.  Integrating Splunk Synthetic Monitoring with Splunk On-Call
allows you to send alert notifications into the Splunk On-Call timeline.

You must be an administrator in Splunk Synthetic Monitoring and a Global
or Alert Admin in Splunk On-Call to establish this integration.

**In Splunk On-Call**
---------------------

In Splunk On-Call, select **Integrations** *>>* **Splunk Synthetic
Monitoring**

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL.  Copy this URL to
your clipboard.

**In Splunk Synthetic Monitoring (Rigor)**
------------------------------------------

From the Rigor Monitoring web portal, select the 3 dot menu next to your
profile icon in the upper righthand corner and select **Alert
Webhooks**.

..image:: /_images/spoc/Frame-6.png

Click the **+ New** button to create a new webhook and select **Splunk
On-Call** as the type.

..image:: /_images/spoc/Frame-5.png

Give the webhook a name and specify your trigger or triggers.  In the
“send request to” box for each trigger, replace the default
*https://alert.victorops.com/integrations/<<YOUR_VICTOROPS_REST_ENDPOINT>>*
with the URL you'd previously copied.

On each trigger, also replace the trailing $routing_key value with the
Splunk On-Call routing key you'd like this webhook to hit.  For more
information on routing keys, see `this
article. <https://help.victorops.com/knowledge-base/routing-keys/>`__

You're welcome to leave the payloads at their default values, or if you
find it more appropriate, replace the default variables with ones more
catered towards your use case.

Once finished, click the **Test** button to test the integration out. 
This will send and alert with your specified payloads into the Splunk
On-Call timeline.

Lastly, hit the **Create** button at the bottom of the screen to save
your Alert Webhook.  Splunk Synthetic Monitoring will now send a
notification to Splunk On-Call whenever the trigger conditions are met.
