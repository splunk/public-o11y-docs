The VictorOps and Opsview integration will allow you to use VictorOps as
a “Notification Method” for all your alerting needs. The following is a
quick walkthrough of how to set up the Opsview integration with
VictorOps:

**In VictorOps**
----------------

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Opsview** |image

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

..image images/Integrations_-_VictorOps_Demo_18.png

 

**In Opsview**
--------------

From the main Dashboard select **settings** then **Notifications
Methods.**

..image images/OpsView2-300x128.png

Select the **VictorOps** notification method 

..image images/OpsView3-300x127.png

Make the notification method Active, and then add your routing key in
the **Contact Variables** input, and your API key in the **API
Key** input.

..image images/OpsView4-300x110.png

You are then able to test the integration.

And you're done!

**Note:**\ * VictorOps only works with Nagios notifications, BSM
notifications are not currently supported.*

.. |image image:: images/Integration-ALL-FINAL.png
