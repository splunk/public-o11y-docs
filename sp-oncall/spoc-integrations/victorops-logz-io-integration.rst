Logz.io provides a cloud-based log analytics service with additional
features such as predictive fault detection, alerts, multi-user access
and role definitions.  The platform uses machine-learning algorithms to
find critical log events before they impact operations, providing users
with information about their systems and applications.  The following
guide will walk you through this integration.

In VictorOps
------------

In VictorOps, click on **Settings** >> **Alert Behavior**
>> **Integrations** >> **REST** integration option\_.\_

..image images/integrations.png

If the REST endpoint integration has not been enabled, click the
green **Enable** button to generate your endpoint destination URL.  Copy
the **URL to notify** to the clipboard.

..image images/REST-Endpoint-final.png

In Logz.io
----------

From the Logz.io web interface, click on **Alerts**.

..image images/Logz_web_interface.png

Select **ALERT ENDPOINTS**.

..image images/Logz_alert_def.png

Click **Create a New Endpoint**.

..image images/Logz_create_new_endpoint.png

In the “ADD A NEW ENDPOINT” form, select **Custom** from the “Type”
dropdown list.  Fill out the “Name” and “Description” fields.  Paste
the **URL to notify** from the “In VictorOps” section into the “URL”
field.  Select **POST** for the “Method”.  Finally, paste the text below
into the “Body” field, then click **SAVE**.

{ “message_type”: “CRITICAL”, “entity_id”: “{{alert_title}}”,
“entity_display_name”: “{{alert_description}}”, “alert_severity”:
“{{alert_severity}}”, “state_message”: “{{alert_event_samples}}”,
“monitoring_tool”: “Logz.io” }

..image images/Logz_add_a_new_end-1.png

Click on **logz.io** to return to the main tab.

..image images/Logz_back_to_main.png

You can now add the VictorOps notification endpoint to your alerts.  In
order to test the notification endpoint, click on **Create Alert**.

..image images/Logz_create_alert.png

Select **Equal to** from the “Condition” dropdown menu.  Enter “99” in
the “Threshold” field, then click **Continue**.

..image images/Logz_io.png

Enter a name in the “Name” field, then click **CONTINUE**.

..image images/Logz_definitions.png

Set “Suppress notifications for” **5 MINUTES**, then
select **VictorOps** from the “Notifications endpoint” dropdown menu,
the click **CREATE ALERT**.

..image images/Logz_triggers.png

Confirm that an alert shows up in the VictorOps timeline.

..image images/Logz_vo_confirm.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Logz.io%20VictorOps%20Integration>`__.
