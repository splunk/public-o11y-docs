Healthchecks.io is a free and open source service. Setting up monitoring
for your cron jobs only takes minutes.  The following guide will walk
you through this integration.

In VictorOps
------------

From the VictorOps web portal, select **Settings**, then **Alert
Behavior**, then **Integrations**.

 images/Integration-ALL-FINAL.png

Select the **Healthchecks.io** integration option.

 images/Healthcheck-final.png

Click **Enable Integration**.

 images/Healthcheck-2-final.png

Copy the **Service API Endpoint** to the clipboard.  Be sure to replace
the “$routing_key” section with the actual routing key you intend to
use. (To view or configure route keys in VictorOps, click **Alert
Behavior**, then **Route Keys**)

 images/Healthcheck-3-final.png

In Healthchecks.io
------------------

Login to the healthchecks.io web interface and click **INTEGRATIONS**.

 images/My_Checks_-_healthchecks_io.png

Under the “Add More” section, locate “VictorOps” and click **Add
Integration**.

 images/Integrations_-_healthchecks_io.png

Under “Integration Settings”, paste the “URL to notify” from the
previous “In VictorOps” section into the “Post URL” field.  Click **Save
Integration**.

 images/Add_VictorOps_-_healthchecks_io.png

You should now see “VictorOps” listed as one of your integrations.

 images/Integrations_-_healthchecks_io-1.png

You should start receiving alerts from healthchecks.io in your VictorOps
timeline when they are generated.

 images/Timeline_-_VictorOps_Test.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=healthchecks.io%20VictorOps%20Integration>`__.
