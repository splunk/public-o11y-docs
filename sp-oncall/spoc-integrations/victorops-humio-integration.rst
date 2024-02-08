[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required: Getting Started, Standard,** or
**Enterprise**

[/ht_toggle]

Humio puts your system's data at your fingertips instantly and empowers
you to answer questions to effectively do your job.

The Humio integration with VictorOps allows you to be notified when a
specified Humio Alert query returns a result.

--------------

 In VictorOps
-------------

From the main timeline, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Humio**

..image:: /_images/spoc/Settings@2x.png

 

If the integration has not yet been enabled, click the “Enable
Integration” button. Copy the “Service API Endpoint” to your clipboard.
Be sure to replace the “$routing_key” section with the actual routing
key you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

..image:: /_images/spoc/Integrations_-_votest-vo2-5-kb.jpg

--------------

 In Humio
---------

From the Homepage, click on the Dataspace where you'd like to set up
your VictorOps integration.\ |image

Next, at the top of the screen, click **Alerts**.

..image:: /_images/spoc/sandbox___Search-kb.jpg

Then go to Notifiers, New Notifier

..image:: /_images/spoc/Notifier-kb.png

For **Notification Type**, click on the drop-down menu and select
**VictorOps**.

Give the VictorOps Notifier a name and leave the behavior of the alert
as ‘critical'.

For the ‘The routing key that will be used for this integration should
be included in the destination URL' field, paste in the Service API
Endpoint you'd previously copied from VictorOps, making sure to swap out
the $routing_key at the end with the VictorOps routing key you'd like to
utilize.

Finally, click **Create Notifier**.\ |image2|

Next, we'll create an Alert to utilize this Notifier with.

Click on **Alerts** and then **New Alert**.

..image:: /_images/spoc/Alert-kb.png

You'll now define the criteria you would like to be notified for. In the
example, we've set the criteria to be when a 400 error occurs.

You'll also give the alert an intuitive name, select the notifier to use
when the criteria is met (the one you just created), and choose a
Notification Frequency, which is the maximum frequency at which
notifications are sent.

You can also click ‘Run' to see what results will return for the
criteria you've defined

Finally, ensure that the ‘Enabled' box is checked, and then click
**Create**.

..image:: /_images/spoc/Alert-Creation-kb.png

You're all set. Now whenever something in Humio matches the Alert
criteria you've defined, you'll receive an alert within VictorOps at the
cadence you've defined with the Notification Frequency.

.. |image| _images/spoc/dataspaces-kb.png
.. |image2| _images/spoc/New-Notifier-kb.png
