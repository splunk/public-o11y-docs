.. _fusionreactor-cloud-spoc:

FusionReactor Cloud integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the FusionReactor Cloud integration for Splunk On-Call.



FusionReactor Cloud moves FusionReactor from being an on-premise monitor
into a Hybrid monitoring solution - extending FR's feature set to
enhance the monitoring, historic data analysis and alerting capability
to new levels.  The following guide will walk you through this
integration.

In VictorOps
------------

From the VictorOps web portal, select **Settings** >> **Alert Behavior
>>** **Integrations**

.. image:: images/Integration-ALL-FINAL.png

Select the **FusionReactor Cloud** integration option.

.. image:: images/Integration-FusionReactor-final.png

Click **Enable Integration**.

.. image:: images/Integration-Fusion2-final.png

Copy the **Service API Endpoint** to the clipboard.  Be sure to replace
the “$routing_key” section with the actual routing key you intend to
use. (To view or configure route keys in VictorOps, click **Alert
Behavior**, then **Route Keys**)

.. image:: images/Integration-Fusion4-final.png

In FusionReactor Cloud
----------------------

From the FusionReactor Cloud web interface, select **Alerting** from the
left sidebar.

.. image:: images/Screen_Shot_2017-03-21_at_1_42_33_PM.png

Click on the **Subscriptions** tab.

.. image:: images/n_Shot_2017-03-21_at_1_42_49_PM.png

Click on **Configure Services**.

.. image:: images/Screen_Shot_2017-03-21_at_1_43_59_PM.png

Locate “VictorOps” in the “Alerting Settings” list, then
click **Configure**.

.. image:: images/Screen_Shot_2017-03-21_at_1_44_38_PM.png

Paste the “URL to notify” from the previous “In VictorOps” section into
the “REST Endpoint” field, then click **Save**.

.. image:: images/Screen_Shot_2017-03-21_at_1_45_56_P.png

“VictorOps” should be colored green in the “Alerting Settings” list now.

.. image:: images/Screen_Shot_2017-03-21_at_1_46_26_PM.png

Scroll to the top of the “Alerting Settings” list, then click **Back to
Subscriptions**.

.. image:: images/Screen_Shot_2017-03-21_at_1_46_55_P.png

Click **Create New Subscription**.

.. image:: images/Screen_Shot_2017-03-21_at_1_47_31_PM.png

Enter a name for the subscription in the “Name” field, then select the
options in the “On state change to” section that you want.

.. image:: images/Screen_Shot_2017-03-21_at_1_49_46_PM.png

Click on the “Service” dropdown menu, then select **VictorOps**.

.. image:: images/Screen_Shot_2017-03-21_at_1_49_56_PM.png

Click **Save Subscription**.

.. image:: images/Screen_Shot_2017-03-21_at_1_50_46_PM.png

Click on the **Checks** tab.

.. image:: images/Screen_Shot_2017-03-21_at_1_51_26_PM.png

Click **Edit** of the check that you want to subscribe to.

.. image:: images/Screen_Shot_2017-03-21_at_1_53_06_PM.png

Click **Subscriptions**.

.. image:: images/Screen_Shot_2017-03-21_at_1_53_20_PM.png

Set the toggle to **on** for the subscription you created earlier, then
click **Save Check**.

.. image:: images/Screen_Shot_2017-03-21_at_1_53_58_PM.png

Click on the **Subscriptions** tab.

.. image:: images/FusionReactor_Cloud.png

Click on **Test** of the subscription you created.

.. image:: images/FusionReactor_Cloud-1.png

Check for the notification in VictorOps.

.. image:: images/Screen_Shot_2017-03-21_at_1_58_33_PM.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=FusionReactor%20Cloud%20VictorOps%20Integration>`__.
