SiteScope monitors more than 100 different target types for critical
health and performance characteristics. You can also extend your
monitoring environment by creating your own monitor types and
customizing existing monitors.  The following guide will walk you
through this integration.

In VictorOps
------------

From the VictorOps web portal, select *Integrations.* From the resulting
list of integration options, select the **HP SiteScope** integration
option.

Copy the **Service** **Email** to the clipboard.  Be sure to replace the
“$routing_key” section with the actual routing key you intend to use.

In HP SiteScope
---------------

On your SiteScope server, add 3 files with the following names and
contents in the templates.mail directory
(i.e. …\\SiteScope\\templates.mail).

Filename: **VictorOps_CRITICAL**

[Subject: /// CRITICAL]

This alert is from SiteScope at

Monitor: : Tags: Group: Status: Sample #:

Time:

———————- Detail ———————-

Filename: **VictorOps_WARNING**

[Subject: /// WARNING]

This alert is from SiteScope at

Monitor: : Tags: Group: Status: Sample #:

Time:

———————- Detail ———————-

Filename: **VictorOps_RECOVERY**

[Subject: /// RECOVERY]

This alert is from SiteScope at

Monitor: : Tags: Group: Status: Sample #:

Time:

———————- Detail ———————-

From the HP SiteScope web interface, right-click on the **Context
Tree**, then select **New**, then **Alert**.

..image images/SiteScope_new_alert.png

Enter “VictorOps” in the “Name” field and “VictorOps Alerts” in the
“Alert description” field.  Check the checkbox next to “SiteScope” in
the “Alert Targets” section.  In the “Alert Actions” section, click on
the **New Alert Action** icon.

..image images/SiteScope_VO_alert_settings.png

Click on **Email** in the “Action Type” list.

..image images/SiteScope_action_type.png

Enter “Error Action” in the “Action name” field.  Paste the **Email
Address** from the “In VictorOps” section into the “Addresses” field.
 Select **VictorOps_CRITICAL** from the “Template” dropdown menu.
 Select **Error** in the “Status Trigger” section, then click **OK**.

..image images/SiteScope_error_action.png

In the “Alert Actions” section, click on the **New Alert Action** icon.

..image images/SiteScope_repeat_new_alert_action.png

Click on **Email** in the “Action Type” list.

..image images/SiteScope_action_type.png

Enter “Warning Action” in the “Action name” field.  Paste the **Email
Address** from the “In VictorOps” section into the “Addresses” field.
 Select **VictorOps_WARNING** from the “Template” dropdown menu.
 Select **Warning** in the “Status Trigger” section, then click **OK**.

..image images/SiteScope_warning_action.png

In the “Alert Actions” section, click on the **New Alert Action** icon.

..image images/SiteScope_repeat_new_alert_action-1.png

Click on **Email** in the “Action Type” list.

..image images/SiteScope_action_type.png

Enter “Recovery Action” in the “Action name” field.  Paste the **Email
Address** from the “In VictorOps” section into the “Addresses” field.
 Select **VictorOps_RECOVERY** from the “Template” dropdown menu, then
check the checkbox next to “Mark this action to close alert”.
 Select **Good** in the “Status Trigger” section, then click **OK**.

..image images/SiteScope_recovery_action.png

Click **OK**.

..image images/SiteScope_settings_ok.png

Select **VictorOps** from the alert list, then click on the **Test**
icon.

..image images/SiteScope_test.png

Click **OK**.

..image images/SiteScope_test_exec.png

You should see a confirmation that the email alerts were successfully
sent to your VictorOps email address.  Click **OK**.

..image images/SiteScope_confirm.png

Alerts should now show up in your VictorOps timeline.
