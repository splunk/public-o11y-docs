.. _outlyer-integration-spoc:

Outlyer integration for Splunk On-Call
******************************************

.. meta:: 
    :description: Configure the Outlyer integration for Splunk On-Call.

Outlyer is a monitoring service for DevOps and Operations teams running
Cloud, SaaS, Microservices and IoT deployments. Designed for today's
dynamic environments that need beyond cloud-scale monitoring, it makes
monitoring effortless so you can concentrate on running a better service
for your users. The following guide walks you through this
integration.

In Splunk On-Call
--------------------

From the Splunk On-Call web portal, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`, then :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
    :alt: The "Alert Behavior" menu with "Integrations" selected.

Select the :guilabel:`Outlyer` integration option.

.. image:: /_images/spoc/Outlyer1-final.png
    :alt: A card displaying the Outlyer integration logo.

Select :guilabel:`Enable Integration`.

.. image:: /_images/spoc/Outlyer-2-final.png
    :alt: A blue button stating "Enable Integration".

Copy the :guilabel:`Service API Endpoint` to the clipboard. Make sure to replace
the "$routing_key" section with the actual routing key you intend to
use. 

.. note:: To view or configure route keys in VictorOps, select :guilabel:`Alert Behavior`, then :guilabel:`Route Keys`.

.. image:: /_images/spoc/Outlyer-3-skitch.png
    :alt: The service API endpoint section with a routing key.

In Outlyer
---------------

From the Outlyer web interface, select the account you want to use for
the integration.

.. image:: /_images/spoc/Organization_Overview-Outlyer-1.png
    :alt: An Outlyer web dashboard with a sample account.

Select :guilabel:`Alerts` from the sidebar.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_8_40_16_AM.png
    :alt: A button stating "Alerts" with an alarm clock symbol next to it.

Select an existing alert or :guilabel:`ADD NEW ALERT` if you need to create an
alert to integrate.

.. image:: /_images/spoc/Alerts_list-Outlyer.png
    :alt: The alerts menu displays a list of alerts. Each alert contains a state, title, alert criteria, alert actions, and any agents causing problems.

Select :guilabel:`ACTIONS`.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_8_45_15_AM.png
    :alt: A menu for a sample alert. An arrow points to the "Actions" tab.

Select :guilabel:`ADD NEW ACTION`.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer.png
    :alt: A green button stating "Add new action".

Select :guilabel:`Call a Webhook` from the dropdown menu.

.. image:: /_images/spoc/Screen_Shot_2017-03-17_at_9_10_28_AM.png
    :alt: A menu displaying two options: "Send an email" and "Call a webhook".

Paste the "URL to notify" that you copied from the
Splunk On-Call Integrations page for Outlyer in the "Webhook URL" field, then
enter ``"monitoring_tool": "Outlyer"`` inside the curly braces of the
"Extra payload" field. Finally, select :guilabel:`TEST WEBHOOK`.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer-1.png
    :alt: A green button stating "Test webhook".

The test returns a green "Response: 200 (OK)" message. Select :guilabel:`CREATE NEW ACTION`.

.. image:: /_images/spoc/SampleAlert-Alert_detail-Outlyer-2.png
    :alt: A green button stating "Create new action".

Check for the notification in Splunk On-Call.

.. image:: /_images/spoc/Timeline-VictorOps_Test-2.png
    :alt: An Outlyer notification in the Splunk On-Call web interface. 

You have completed setting up this integration. If you have any
questions, contact :new-page:`VictorOps support <mailto:Support@victorops.com?Subject=Outlyer%20VictorOps%20Integration>`.
