Outlyer integration for Splunk On-Call
**********************************************************

Outlyer is a monitoring service for DevOps & Operations teams running
Cloud, SaaS, Microservices and IoT deployments. Designed for today's
dynamic environments that need beyond cloud-scale monitoring, it makes
monitoring effortless so you can concentrate on running a better service
for your users.  The following guide will walk you through this
integration.

In VictorOps
------------

From the VictorOps web portal, select **Settings**, then **Alert
Behavior**, then **Integrations**.

.. image:: /_images/spoc/Integration-ALL-FINAL.png

Select the **Outlyer** integration option.

.. image:: /_images/spoc/Outlyer1-final.png

Click **Enable Integration**.

.. image:: /_images/spoc/Outlyer-2-final.png

Copy the **Service API Endpoint** to the clipboard.  Be sure to replace
the “$routing_key” section with the actual routing key you intend to
use. (To view or configure route keys in VictorOps, click **Alert
Behavior**, then **Route Keys**)

.. image:: /_images/spoc/Outlyer-3-skitch.png

In Outlyer
----------

From the Outlyer web interface, select the account you want to use for
the integration.

.. image:: /_images/spoc/Organization_Overview-Outlyer-1.png

Select **Alerts** from the left sidebar.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_8_40_16_AM.png

Select an existing alert or **ADD NEW ALERT** if you need to create an
alert to integrate.

.. image:: /_images/spoc/Alerts_list-Outlyer.png

Select **ACTIONS**.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_8_45_15_AM.png

Click **ADD NEW ACTION**.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer.png

Select **Call a Webhook** from the dropdown menu.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_9_10_28_AM.png

Paste the “URL to notify” that you copied from the
VictorOps Integrations page for Outlyer in the “Webhook URL” field, then
enter ``"monitoring_tool": "Outlyer"`` inside the curly braces of the
“Extra payload” field, then select **TEST WEBHOOK**.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer-1.png

You should see a green “Response: 200 (OK)” message.  Click **CREATE NEW
ACTION**.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer-2.png

Check for the notification in VictorOps.

.. image:: /_images/spoc/Timeline-VictorOps_Test-2.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Outlyer%20VictorOps%20Integration>`__.
