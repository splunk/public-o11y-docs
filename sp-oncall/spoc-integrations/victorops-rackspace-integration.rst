Send your Rackspace alerts directly into the VictorOps timeline using
the following guide.

**In VictorOps**
----------------

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Rackspace** |image

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

..image images/Integrations_-_VictorOps_Demo_17.png

**In Rackspace**
----------------

From the web portal select the account dropdown in the upper right hand
corner and then **Account Settings.** 

.. figure:: images/Rackspace2.png
   :alt: rackspace2

   rackspace2

From the account settings screen select the **Servers** dropdown and
then **Rackspace Intelligence.**

.. figure:: images/Rackspace3.png
   :alt: rackspace3

   rackspace3

From the Rackspace Intelligence screen select the **Notify** option and
then **Notification Plans** then **Create Notification Plan.** Give the
Plan a name and select **Create Notification Plan.** 

.. figure:: images/Rackspace4.png
   :alt: rackspace4

   rackspace4

Once the plan has been created select **Add Notifications.**

.. figure:: images/Rackspace5.png
   :alt: rackspace5

   rackspace5

Select **Create a new notification**

.. figure:: images/Rackspace6.png
   :alt: rackspace6

   rackspace6

A dropdown will appear, enter in a name for your new notification, then
select **VictorOps** as the type, paste in your API key and add the
appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ for
this “Notification Plan”. Select **Create and Select Notification** then
**Save Notification Plan** and you are done!

.. figure:: images/Rackspace7.png
   :alt: rackspace7

   rackspace7

.. |image image:: images/Integration-ALL-FINAL.png
