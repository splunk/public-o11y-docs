Stackdriver integration for Splunk On-Call
**********************************************************

Stackdriver has been migrated to Google Cloud Platform (GCP) Monitoring.
GCP Monitoring provides full-stack intelligent monitoring of
infrastructure, systems, and apps.

The following guide will walk you through the steps required to
integrate GCP Monitoring (formerly Stackdriver) with Splunk On-Call.

**In Splunk On-Call**
---------------------

1. In Splunk On-Call, select **Settings** *>>* **Alert Behavior** *>>*
   **Integrations** *>>* **Stackdriver (this will soon be updated to GCP
   Monitoring)**
2. If the integration has not yet been enabled, click the “Enable
   Integration” button to generate your endpoint URL as seen below.  Be
   sure to replace the “$routing_key” section with the actual routing
   key you intend to use.  **The integration will not properly send
   alerts if the routing key is left blank.**  (To view or configure
   routing keys in Splunk On-Call, click *Alert Behavior >> Route Keys*)

--------------

**In Google Cloud Platform** 
-----------------------------

1. Navigate to **Monitoring** >> **Alerting** then select the ‘**Edit
   Notification Channels**' option at the top of the page.
2. From here scroll down to ‘**Webhooks**' and click ‘**Add New**'.
3. Under the **Endpoint URL** enter the address you copied from your
   Splunk On-Call Stackdriver integration page. For **Display Name**
   enter your desired display name such as ‘Splunk On-Call'.
4. Leave ‘Use HTTP Basic Auth' **unchecked**.
5. Click ‘**Test Connection**' and then ‘**Save**'.

   -  **NOTE**: The ‘Test Connection' button will not work to trigger an
      incident in Splunk On-Call but must be pressed in order to click
      Save. To test the integration you will need to manually trigger a
      real alert in GCP Monitoring.

6. Add the on-Call (VictorOps) Webhook Notification Channel you just
   created to your desired Alerting Policies and you are DONE!
