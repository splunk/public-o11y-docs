.. _Uptime-Robot-spoc:

Uptime Robot integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Uptime Robot integration for Splunk On-Call.

You can integrate Splunk On-Call with Uptime Robot to notify stakeholders of application performance issues and downtime. Set monitors and thresholds in Uptime Robot and manage associated on-call rotations and calendars, alert rules, and escalation policies in Splunk On-Call. 

Requirements
=================

* Versions supported: Starter, Growth, or Enterprise

Enable Uptime Robot in Splunk On-Call
==========================================

1. Go to :guilabel:`Integrations` then :guilabel:`3rd Party Integrations` then :guilabel:`Uptime Robot`.
2. Select :guilabel:`Enable Integration`. 
3. Copy the :guilabel:`Service API Key` to your clipboard.

.. image:: /_images/spoc/uptimerobot-integration-enabled.png
   :alt: Enable uptime integration
   :width: 95%

Configure Splunk On-Call in Uptime Robot
===============================================

1. From the main dashboard select :guilabel:`My Settings`. 
2. Under :guilabel:`Alert Contacts` select :guilabel:`Add Alert Contact`.

   .. image:: /_images/spoc/Add-Alert-Contact.png
      :alt: Create an alert contact in Uptime Robot
      :width: 95%

3. Select :guilabel:`Web-Hook` for the :guilabel:`Alert Contact Type`.

   .. image:: /_images/spoc/uptime-robot-new-alert-contact-webhook.png
      :alt: Select webhook alert contact type in Uptime Robot
      :width: 75%

4. Enter a name in :guilabel:`Friendly Name`.
5. Paste your service API key that you obtained when enabling the integration in Splunk On-Call in :guilabel:`URL to Notify`.
6. Make the following change to the service API key URL:
    * Replace ``“$routing_key`` with the routing key you want to use.
    * Add a trailing `?` to the end of the URL to meet Uptime Robot syntax requirements. This doesn't affect alert routing.
7. Leave the :guilabel:`POST Value` blank.
8. Leave the JSON check box unselected.
9. Select :guilabel:`Create Alert Contact`.

   .. image:: /_images/spoc/Details-for-new-alert-contact.png
         :alt: Configure alert contact in Uptime Robot
         :width: 95%

10. To add this alert contact to 1 of your monitors, select the gear icon next to the monitor and then select :guilabel:`Edit`.

    .. image:: /_images/spoc/Edit-the-monitor.png
         :alt: Add alert contact to a monitor in Uptime Robot
         :width: 35%

11. Select the your new alert contact and then select :guilabel:`Save Changes`.

    .. image:: /_images/spoc/add-victorops-to-the-alerting.png
         :alt: Select your alert contact in a monitor in Uptime Robot
         :width: 95%

Now, when an alert is triggered in Uptime Robot a message is sent to the Splunk On-Call timeline.
