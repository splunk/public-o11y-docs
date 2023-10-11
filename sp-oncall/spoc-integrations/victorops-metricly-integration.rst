`Metricly <https://www.virtana.com/products/cloudwisdom/>`__ has become
`CloudWisdom <https://help.victorops.com/knowledge-base/cloudwisdom-previously-metricly/>`__.

Previously Metricly offered adaptive monitoring and smart analytics to
help your DevOps team efficiently manage cloud operations and
applications. The following guide will walk you through the steps needed
to integrate the two systems.

**In VictorOps**
----------------

From the VictorOps web portal select *Integrations.*

Select the *Metricly* integration and copy the **Service API
Endpoint** to your clipboard.

.. image:: images/integrations_metricly_enabled.png

Make sure to add the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ to the
end of the URL.

**In Metricly**
---------------

In Metricly create a Webhook Notification by:

1. Hover over your username in the top right-hand corner, then
   Click *Notifications*.

|image1|

1. Click *Webhook*, then *Add Webhook.*

|image2|

Give the notification a name (VictorOps in example).

Make sure the Notification is Enabled.

Paste in your **Post URL (Service API Endpoint)** from VictorOps you
copied to your clipboard earlier.

No further authentication or headers are needed.

For the Payload, select *Custom*\ **.** Then, either create your own
JSON payload using these `REST Endpoint
Examples <https://help.victorops.com/knowledge-base/victorops-restendpoint-integration/>`__ or
contact VictorOps support for assistance.

.. figure:: images/Screen-Shot-2017-10-10-at-11.54.07-AM.png
   :alt: netuitive2

   netuitive2

Testing the integration will send an alert into the VictorOps timeline.
Once the test is successful hit save and you are done.

If you have any questions please contact `VictorOps
Support <mailto:Support@victorops.com?Subject=Metricly%20VictorOps%20Integration>`__.

.. |image1| image:: images/Metricly_notifications-1.png
   :target: https://help.victorops.com/metricly_notifications-2/
.. |image2| image:: images/Metricly_addwebhook.png
   :target: https://help.victorops.com/metricly_addwebhook/
