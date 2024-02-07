Observium is a low-maintenance auto-discovering network monitoring
platform supporting a wide range of device types, platforms and
operating systems. The VictorOps integration allows you to send
Observium notifications into the VictorOps timeline. The following guide
will walk you through the steps needed to configure this integration.

**In VictorOps**
----------------

From the main timeline select **Settings** >> **Alert Behavior**
>> **Integrations**

..image images/Integration-ALL-FINAL.png

Select the **Observium** Integration.

..image images/Observium-final.png

Enable the integration if it has not already been enabled, then copy the
entire “Service API Endpoint” to your clipboard.

..image images/Integrations_-_victorops-4.png

**In Observium**
----------------

Create a new Contact, for the “Transport Method” select **VictorOps**.
Make sure that the “Contact Status” is enabled. Set an appropriate
routing key. Finally paste in the REST endpoint URL from your clipboard.

.. figure:: images/Observium4.png
   :alt: observium4

   observium4

Select **Save Changes** and you are done. If you have any issues please
reach out to `VictorOps
support <mailto:support@victorops.com?Subject=Observium%20VictorOps%20Integration>`__.
