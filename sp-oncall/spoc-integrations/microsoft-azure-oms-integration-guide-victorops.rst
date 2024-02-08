Microsoft Azure Monitor allows you to gain visibility and control across
your hybrid cloud with simplified operations management and security.
This integration allows you to make use of VictorOps incident management
for all your Azure alerts.

The following will guide you through the integration. Microsoft Azure
OMS has been deprecated, but we will leverage the same endpoint in
VictorOps with the below steps to receive alerts from Azure Monitor.

**In VictorOps**.
-----------------

First you must enable the Microsoft Azure integration.

.. image/_images/spoc/Navigate-to-Integrations.png

Select the **Microsoft Azure OMS** integration option.

Click **Enable Integration**.

Copy the **Service API Endpoint** to your clipboard. Make sure to
update the `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__.

.. image/_images/spoc/API-key-for-Azure-Integration.png

**In Azure OMS**
----------------

 

**Logic App**

Create a `Logic
App <https://docs.microsoft.com/en-us/rest/api/logic/>`__. The Logic App
will serve as the central structure for the integration with VictorOps.
Follow these steps:

-  **Create a new Logic App** by clicking the *Create Resource* button
   in the top left corner of the Azure Portal. You can equivalently
   follow the first couple steps
   in `this <https://docs.microsoft.com/en-us/azure/logic-apps/quickstart-create-first-logic-app-workflow>`__ documentation.
-  **Name the application** whatever you'd like, but preferably
   ‘VictorOps'
-  **Select** an existing **Resource Group** or create a new one
-  For now, at least, check the box to pin the application to the
   dashboard
-  Click **create**, it will now take a few moments to deploy
-  From the dashboard, select the Logic App you have just created.From
   the Logic App blade, select Logic App Designer
-  For the trigger condition, select “**When an HTTP Request is
   received**”

 

-  Click **New Step, s**\ elect **Add an Action**
-  Select **Request Response**
-  |image2|
-  For now, you can just leave it as responding with a 200 status code
-  Click :guilabel:`New Step`, select :guilabel:`Add an Action`

Select :guilabel:`HTTP - HTTP`.

-  Method: **POST**

-  URL: **VictorOps Azure Integration Endpoint** (Previously copied)

-  Headers: **Content-Type** | **application/json**

-  Body:

{ “data”:“@triggerBody()”,
“entity_display_name”:“@triggerBody()\\['data'\\]\\['status'\\]”,
“entity_id”:“@triggerBody()\\['data'\\]\\['context'\\]\\['activityLog'\\]\\['eventDataId'\\]”,
“message_type”:“@if(equals(triggerBody()\\['data'\\]\\['status'\\],'Activated'),'critical','recovery')”,
“state_message”:“@triggerBody()\\['data'\\]\\['context'\\]\\['activityLog'\\]\\['properties'\\]\\['responseBody'\\]”
}

-  The azure variables for each field can be changed for customized
   alerts in VictorOps. The azure variables include: timestamp, id,
   name, conditiontype, condition, severity, subscriptionId,
   resourceGroupName, resourceName, resourceType, resourceId,
   portalLink.
-  Below is the code view of the body. This is the best spot to edit the
   values in the payload

.. image/_images/spoc/Code-view-post-payload.png

-  Once you finish editing the payload, double check all the values in
   the HTTP post action and save.
-  Back in the Logic App Designer and under the “*When an HTTP Request
   is Received*”, the url has now been generated. **Copy this url** to
   the clipboard.

**Alerts**

In order to send requests to trigger the Logic App just made we can
leverage the Alerting which is native to Azure's Monitoring
functionality. Follow these steps:

1. From the left menu pane, select **Monitoring**>> **Alerts** >> **New
   Alert Rule**
2. Define the alert trigger.
3. Define the alert details with any name and description
4. For the last step, select a **New Action Group**, this action group
   will fire a webhook towards your new Logic App.

   1. For all the names, fill in a value of “victorops”
   2. For the action, select webhook
   3. For the url of the webhook, **paste the url copied earlier** from
      the Logic App

5. Save

Alerts should now flow into the VictorOps timeline based on the trigger
conditions. If you have any questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Azure%20OMS%20VictorOps%20Integration>`__.

.. |image1| image:: /_images/spoc/Logic-App-Designer.png
.. |image2| image:: /_images/spoc/Response-200.png
