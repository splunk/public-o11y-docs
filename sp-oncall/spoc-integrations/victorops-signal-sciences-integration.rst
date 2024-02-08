`Signal Sciences <https://www.signalsciences.com/>`__ gives you the
insights you need to prioritize your security resources to address
attacks as they occur.  With greater visibility and awareness, you can
make informed decisions and confidently run your web applications.  The
following guide will walk you through this integration.

In VictorOps
------------

From the VictorOps web portal, select **Settings** >> **Alert
Behavior** >> **Integrations**

..image:: /_images/spoc/Integration-ALL-FINAL.png

Select the `Signal
Sciences <https://www.signalsciences.com/>`__ integration option.

|image Copy the **Service API Endpoint** to the clipboard.  Be sure to
replace the “$routing_key” section with the actual routing key you
intend to use.  (To view or configure route keys in VictorOps,
click **Alert Behavior**, then **Route Keys**)

..image:: /_images/spoc/Integrations-SignalSciences_vo_endpoint.png

In Signal Sciences
------------------

From the `Signal Sciences <https://www.signalsciences.com/>`__ web
interface, click the **Configurations** drop down menu, then
select **Integrations**.

..image:: /_images/spoc/Zoom_Meeting_ID__340-382-347.png

Locate the “VictorOps alert” integration on the list of available
integrations and click the **Add** button to the right.

..image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__3_.png

Paste the “URL to notify” from the “In VictorOps” section into the
“Webhook URL” field, select the events that will trigger an alert, then
click **Add**.

..image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__5_-1.png

You should now see “VictorOps alert” listed as a configured integration.
 Click **Test** to send a test alert to VictorOps.  Make sure that you
see the alert show up in your VictorOps timeline.

..image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__4_-2.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Signal%20Sciences%20VictorOps%20Integration>`__.

.. |image| image:: /_images/spoc/SignalSciences-final.png
