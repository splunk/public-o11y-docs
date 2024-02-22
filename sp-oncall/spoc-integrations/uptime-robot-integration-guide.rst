Uptime Robot integration for Splunk On-Call
**********************************************************

Every 5 minutes, Uptime Robot can check up to fifty monitors to determine website downtime and performance. In addition to monitoring uptime, downtime and website response times, Uptime Robot offers the ability to create public status pages. Integrated with VictorOps, Uptime Robot gives you the capability to seamlessly notify both internal and external stakeholders to application performance issues and downtime.

Set monitors and thresholds in Uptime Robot and manage associated on-call rotations and calendars, alert rules, and escalation policies in VictorOps. Build visibility into website performance and automate critical on-call processes to create efficient incident response workflows and make on-call suck less

Spend less time worrying about website performance or downtime. The VictorOps and Uptime Robot integration creates a holistic system for website monitoring, incident detection, on-call response and remediation.

Requirements
=================

* Versions Supported: Starter, Growth, or Enterprise

Enable Uptime Robot in Splunk On-Call
==========================================

1. Go to :guilabel:`Integrations` then :guilabel:`3rd Party Integrations` then :guilabel:`Uptime Robot`.
2. Select :guilabel:`Enable Integration`. 
3. Copy the :guilabel:`Service API Key` to your clipboard.

.. image:: /_images/spoc/uptimerobot-integration-enabled.png
   :alt: Enable uptime integration

Configure Splunk On-Call in Uptime Robot
===============================================

1. From the main dashboard select :guilabel:`My Settings`. 
2. Under :guilabel:`Alert Contacts` select :guilabel:`Add Alert Contact`.

.. image:: /_images/spoc/Add-Alert-Contact.png

3. Select :guilabel:`Web-Hook` for the :guilabel:`Alert Contact Type`.
4. Enter a name in :guilabel:`Friendly Name`.
5. Paste your service API key that you obtained when enabling the integration in Splunk On-Call in :guilabel:`URL to Notify`.
6. Make the following change to the service API key URL:
    * Replace ``“$routing_key`` with the routing key you want to use.
    * Add a trailing `?` to the end of the URL to meet Uptime Robot syntax requirements. This doesn't affect alert routing.
7. Leave the POST value blank.
8. Leave the JSON check box unselected.
9. Select :guilabel:`Create Alert Contact`.

.. image:: /_images/spoc/uptime-robot-new-alert-contact-webhook.png
   :alt: Create alert contact in Uptime Robot

Here is an example configuration.

.. image:: /_images/spoc/Details-for-new-alert-contact.png

To add this Alert Contact to 1 of your monitors, select the gear icon next to the monitor and then select :guilabel:`Edit`.

.. image:: /_images/spoc/Edit-the-monitor.png

Select the your new alert contact and then select :guilabel:`Save Changes`.

.. image:: /_images/spoc/add-victorops-to-the-alerting.png

Now, when an alert is triggered in Uptime Robot a message is sent to the Splunk On-Call timeline.
