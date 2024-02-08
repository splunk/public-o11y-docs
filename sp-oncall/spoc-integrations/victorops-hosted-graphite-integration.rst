Hosted Graphite allows  you to display your monitoring data on beautiful
graphs and dashboards plus alerting. The following guide will walk you
through the steps needed to integrate these two systems.

**In VictorOps**
----------------

From the main timeline go to **Settings** then **Alert
Behavior** then **Integrations.** 

.. image:: /_images/spoc/Integration-ALL-FINAL.png

Select the **Hosted Graphite** integration and copy the **Service API
Endpoint** to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-17.png

**In Hosted Graphite**
----------------------

From the main web interface select **Alerts** and then **Notification
Channels.**

.. image:: /_images/spoc/hosted2.png
   :alt: hosted2

   hosted2

Next add a new **Notification Channel.**

.. image:: /_images/spoc/hosted3.png
   :alt: hosted3

   hosted3

Select the **VictorOps** “Notification Type”, give the “Notification
Channel” a name and then put in your API key you copied from the
VictorOps web portal.

.. image:: /_images/spoc/hosted4.png
   :alt: hosted4

   hosted4

Save your new VictorOps “Notification Channel”. Now you can use this
channel when creating new “Alerts” in Hosted Graphite. To set up an
alert go select **Alerts** from the left sidebar.

.. image:: /_images/spoc/hosted5.png
   :alt: hosted5

   hosted5

When Creating or editing an alert select VictorOps as the “Notify me
with…” option.

.. image:: /_images/spoc/hosted6.png
   :alt: hosted6

   hosted6

Select **Save Alert** and you are done.

If you have any questions please contact `VictorOps
Support <mailto:Support@victorops.com?Subject=Hosted%20Graphite%20VictorOps%20Integration>`__.
