
.. _msazure-monitor-spoc:

Microsoft Azure Monitor integration for Splunk On-Call
**************************************************

.. meta::
    :description: Configure the Microsoft Azure Monitor integration for Splunk On-Call.



Microsoft Azure Monitor allows you to gain visibility and control across
your hybrid cloud with simplified operations management and security.
This integration allows you to make use of VictorOps incident management
for all your Azure alerts.

The following will guide you through the integration.

**In VictorOps**
----------------

First, you must enable the Microsoft Azure integration by going to
**Integrations** *>>* **All integrations**

Select the **Azure Monitoring** integration option.

Click **Enable Integration**.

Copy the **Service API Endpoint** to your clipboard. Make sure to
update the `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__.

**In Azure Monitoring**
-----------------------

**Alerts**

In order to send requests to trigger an incident in VictorOps, we can
leverage Alerting which is native to Azure's Monitoring functionality.
Follow these steps:

1. Login to Azure portal. From the left menu pane,
   select **Monitoring**>> **Alerts** >> **New Alert Rule**
2. Define the alert rule based on your monitoring needs.
3. Define the alert details with any name and description.
4. For the last step, select a **New Action Group**, this action group
   will fire towards your new VictorOps Service API Endpoint.

   1. For all the names, fill in a value of “victorops” to help define
      the action.
   2. For the action, select webhook
   3. Paste the Service Endpoint you copied to your clipboard from
      VictorOps for URI.
   4. Enable the common alert schema should be toggled to YES.\ |image

5. Click OK
6. Finally, make sure to link the newly created VictorOps action group
   to the desired alert rules.

Alerts should now flow into the VictorOps timeline based on the trigger
conditions. If you have any questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Azure%20OMS%20VictorOps%20Integration>`__.

.. |image1/_images/spoc/Screen_Shot_2019-12-19_at_11_43_54_AM.png
