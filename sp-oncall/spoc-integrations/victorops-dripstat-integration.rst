DripStat is the smartest Java APM, providing code level visibility in
production. The Splunk On-Call (formerly VictorOps) integration allows
you to send your DipStat alerts into the Splunk On-Call Timeline. The
following guide will walk you through how to setup this simple
integration. 

**In Splunk On-Call**
---------------------

From the top navigation, select **Integrations**. 

Select the **DripStat** integration and copy the **Service API
Endpoint** to your clipboard.

.. image:: images/Integrations_-_victorops-18.png

**In DripStat**
---------------

From the main dashboard select **Alerts** then the **Integrations** tab
then choose the **VictorOps** integration.

.. figure:: images/drip4.png
   :alt: drip4

   drip4

Enter in your Splunk On-Call API key and the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ for
this integration. Then select **Save**.

.. figure:: images/drip5.png
   :alt: drip5

   drip5

That's it! You can now manage the integration from the previous
integration tab.

.. figure:: images/drip6.png
   :alt: drip6

   drip6

If you have any questions please contact `Splunk On-Call
Support <mailto:Support@victorops.com?Subject=DripStat%20VictorOps%20Integration>`__.
