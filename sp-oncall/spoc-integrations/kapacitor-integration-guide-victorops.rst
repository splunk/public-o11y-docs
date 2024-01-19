Kapacitor is an open source data processing framework that makes it easy
to create alerts, run ETL jobs and detect anomalies.  The following
guide will walk you through this integration.

In VictorOps

From the VictorOps web portal, select *Integrations.* From the resulting
list of integration options, select **Kapacitor**. On the resulting
page, click **Enable Integration**.

Copy the **Service API Key** to the clipboard, ensuring to replace
“$routing_key” with a valid routing key. All alerts from this
integration configuration will route through the specified routing key.

In Kapacitor
------------

In the Kapacitor configuration file (“kapacitor.conf” for example),
locate the “[victorops]” section, then set “enabled” to ``true``,
“api-key” to the API key from the “URL to notify” from the “In
VictorOps” section above, and “routing-key” to the actual routing key
you intend to use.

[victorops] enabled = true api-key =
“558e7ebc-XXXX-XXXX-XXXX-XXXXXXXXXXXX” routing-key = “Sample_route”

Now you will be able to chain “.victorOps()” and “.routingKey()” in the
TICKscript.

Alert will be sent to VictorOps with the routing_key set to the value of
“routing-key” in the Kapacitor configuration file:

stream \|alert() .victorOps()

Alert will be sent to VictorOps with the routing_key set to
“Another_route”:

stream \|alert() .victorOps() .routingKey(‘Another_route')

If you want to send all alerts to VictorOps without explicitly stating
it in the TICKscript, then set “global” to ``true`` in the “[victorops]”
section of the Kapacitor configuration file.

[victorops] enabled = true api-key =
“558e7ebc-XXXX-XXXX-XXXX-XXXXXXXXXXXX” routing-key = “Sample_route”
global = true

Alerts from Kapacitor should now appear in VictorOps as they are
generated.
