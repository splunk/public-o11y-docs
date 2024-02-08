Sysdig cloud is the container-native monitoring solution, built for
visibility, alerting, and troubleshooting of container and microservice
environments. The following guide will walk you through the necessary
steps to integrate Sysdig with VictorOps.

**In VictorOps**
----------------

From the VictorOps web portal select **Settings** then **Alert
Behavior** then **Integrations**.

.. image:: /_images/spoc/settings-alert-behavior-integrations-e1480978368974.png

 

Select the **Sysdig** Integration.

.. image:: /_images/spoc/Integrations-victorops-9.png

 

Copy the “Service API Key” to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-10.png

**In Sysdig**
-------------

Select the S\ **ettings Menu** icon in the upper right corner
then **Notifications.** Hit the plus next to **MY CHANNELS**, in the
drop down menu Select **VictorOps**

.. image:: /_images/spoc/Sysdig2.png
   :alt: sysdig2

   sysdig2

On the following screen paste in your VictorOps API key you previously
copied to your clipboard, place in an appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__, give
the channel a name, and then make enable the option to “Resolve incident
when a notification goes to OK state or you resolve it from Sysdig
Cloud.”

Finally hit **CREATE CHANNEL** and you are done.

.. image:: /_images/spoc/Sysdig3.png
   :alt: sysdig3

   sysdig3

If you have any questions please reach out to the VictorOps `support
team <mailto:support@victorops.com?Subject=Sysdig%20VictorOps%20Integration>`__.
