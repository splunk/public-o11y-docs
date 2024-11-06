.. _fusionreactor-cloud-spoc:

FusionReactor Cloud integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the FusionReactor Cloud integration for Splunk On-Call.



FusionReactor Cloud moves FusionReactor from being an on-premise monitor into a Hybrid monitoring solution - extending FR's feature set to
enhance the monitoring, historic data analysis and alerting capability to new levels.  The following guide will walk you through this
integration.

In Splunk On-Call
============================

#. From the Splunk On-Call interface, select :guilabel:`Settings`, then  :guilabel:`Alert Behavior`. Select :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png

#. Select the :guilabel:`FusionReactor Cloud` integration.

.. image:: /_images/spoc/Integration-FusionReactor-final.png

#. Select :guilabel:`Enable Integration`.

.. image:: /_images/spoc/Integration-Fusion2-final.png

#. Copy the :guilabel:`Service API Endpoint` to the clipboard. Be sure to replace the `$routing_key` section with the actual routing key you intend to use. To view or configure route keys in Splunk On-Call, select :guilabel:`Alert Behaviors`:guilabel`Route Keys`.

.. image:: /_images/spoc/Integration-Fusion4-final.png

In FusionReactor Cloud
=================================

#. From the FusionReactor Cloud interface, select :guilabel:`Alerting` from the left sidebar.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_42_33_PM.png

#. Select the :guilabel:`Subscriptions` tab.

.. image:: /_images/spoc/n_Shot_2017-03-21_at_1_42_49_PM.png

#. Select :guilabel:`Configure Services`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_43_59_PM.png

#. Locate Splunk On-Call (formerly VictorOps) in the :guilabel:`Alerting Settings` list, then select :guilabel:`Configure`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_44_38_PM.png

#. Paste the `URL to notify` from the preceding In VictorOps section into the REST Endpoint field, then select :guilabel:`Save`.

     .. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_45_56_P.png

     “VictorOps” should be colored green in the “Alerting Settings” list now.

     .. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_46_26_PM.png

#. Scroll to the top of the Alerting Settings list, then select :guilabel:`Back to Subscriptions`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_46_55_P.png

#. Select :guilabel:`Create New Subscription`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_47_31_PM.png

#. Enter a name for the subscription in the Name field, then select the options in the `On state change to` section that you want.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_49_46_PM.png

#. Select Splunk On-Call (formerly VictorOps) from the :guilabel:`Service`  menu.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_49_56_PM.png

#. Select :guilabel:`Save Subscription`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_50_46_PM.png

#. Selct :guilabel:`Checks`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_51_26_PM.png

#. Select :guilabel:`Edit` of the check that you want to subscribe to.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_53_06_PM.png

#. Select :guilabel:`Subscriptions`.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_53_20_PM.png

$. Set the toggle to :menuselection:`On` for the subscription you created earlier, then .

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_53_58_PM.png

#. Select  the :guilabel:`Subscriptions`` tab.

.. image:: /_images/spoc/FusionReactor_Cloud.png

#. Select the :guilabel:`Test` of the subscription you created.

.. image:: /_images/spoc/FusionReactor_Cloud-1.png

#. Check for the notification in Splunk On-Call.

.. image:: /_images/spoc/Screen_Shot_2017-03-21_at_1_58_33_PM.png

You have completed setting up this integration. 