Panopta integration for Splunk On-Call
**********************************************************

Panopta provides Website & server monitoring for developers, IT
managers, SaaS companies and Hosting Providers. Precision accuracy +
intelligent alerting that scales w/ you.

The Following guide will walk you through the steps needed to get the
integration into VictorOps.

**In VictorOps**
----------------

 In the VictorOps portal go to **Settings** >> **Alert
Behavior** >> **Integrations**

.. image:: /_images/spoc/Integration-ALL-FINAL.png

 

Select the **Panopta** Integration.

.. image:: /_images/spoc/Panopta-final.png

Copy the “Service API Endpoint”

.. image:: /_images/spoc/Panopta-2-final.png

Make sure to add the
appropriate `Routing <https://help.victorops.com/knowledge-base/routing-keys/>`__ Key
to your Endpoint URL.

**In Panopta**
--------------

From the Alerting drop down menu in the control panel, choose the
Integrations tab.

.. image:: /_images/spoc/New_VictorOps_Integration-Google_Docs.png

There is a Webhooks integration you'll want to select to get started
with your VictorOps integration.

.. image:: /_images/spoc/New_VictorOps_Integration-Google_Docs-1.png

Label the webhook VictorOps. Under the Incident Webhook tab, set the
request method to POST, and the postback URL as the VictorOps REST
endpoint URL from Step 1.

.. image:: /_images/spoc/New_VictorOps_Integration-Google_Docs-2.png

Select a Raw Payload as your payload type, then copy in the following
JSON snippet in the code box.

``{"message_type":"CRITICAL","entity_id":"$name", "state_message":"$items - $reasons","monitoring_tool":"Panopta"}``

.. image:: /_images/spoc/New_VictorOps_Integration-Google_Docs-3.png

 

To also send a recovery message to VictorOps, create a second webhook
under the Clear Webhook tab. Give it a name, like VictorOps Recovery).
Choose POST as your Request Method, and paste in your VictorOps REST
endpoint URL for the Postback URL.

``{"message_type":"RECOVERY","entity_id":"$name", "state_message":"$items - $reasons","monitoring_tool":"Panopta"}``

 

If you have any questions please reach out to the VictorOps `Support
Team <mailto:support@victorops.com?Subject=Panopta%20VictorOps%20Integration>`__.
