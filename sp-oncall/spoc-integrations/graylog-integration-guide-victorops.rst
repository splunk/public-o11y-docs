`Graylog <https://www.graylog.org/>`__ is an open source centralized log
management solution built to open standards for capturing, storing, and
enabling real-time analysis of terabytes of machine data.

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

VictorOps Version Required: Starter, Growth, or Enterprise

Graylog Version Required: 3.1+

[/ht_toggle]

 

Configuration in VictorOps
--------------------------

In VictorOps, navigate to **Integrations >> Graylog**.

Once selected, click **Enable Integration** and copy the **Service API
Endpoint** for later use.

Configuration in Graylog 3.1+
-----------------------------

Create VictorOps Notification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open the web UI for Graylog, by default this is set to
http://127.0.0.1:9000. From there, login and go to **Alerts >>
Notifications** and select **Create Notification**. Then, go ahead and
give this notification a title and description that you'll remember.
You'll then want to select :guilabel:`HTTP Notification` for notification type
and copy the :guilabel:`Service API Endpoint` from above into the :guilabel:`URL` field.

/_images/spoc/graylog1-2.png

Put the appropriate routing key at the end of the url and be sure to add
it to Graylog's whitelisted URL's if you have that enabled.

Next click **Execute Test Notification.** This should produce an info
type alert on your timeline if everything is setup properly.

/_images/spoc/graylog2.png

Now your notification is all setup! Be sure to click **Create/Update**
to save this notification.

*Note: If you'd like Graylog to notify multiple routing keys, you will
need to setup a new Notification for each routing key.*

 

Add VictorOps Notification to an Event Definition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Under the **Alerts** tab in Graylog, navigate to **Event Definitions**
and either create a new **Event Definition** or **Edit** a pre-existing
one. Then go to the **Notifications** tab of the **Event
Definition** and click **Add Notification**. Select the notification you
just made and click **Done**.

/_images/spoc/graylog3.png

Splunk On-Call automatically aggregates alerts with the same **Event
Definition ID**.

Troubleshooting
~~~~~~~~~~~~~~~

Need help setting up the VictorOps Graylog integration?

For detailed assistance, please email victorops-support@splunk.com or
click the chat bubble in the lower right corner of your screen!
