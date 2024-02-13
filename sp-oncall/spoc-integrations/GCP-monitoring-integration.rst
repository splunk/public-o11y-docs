.. _GCP-monitoring-spoc:

Google Cloud Platform (GCP) Monitoring integration for Splunk On-Call
***************************************************************************

.. meta::
    :description: Configure the Google Cloud Platform (GCP) Monitoring integration for Splunk On-Call.

Google Cloud Platform (GCP) Monitoring (formerly Stackdriver) provides full-stack intelligent monitoring of infrastructure, systems, and apps. Use this guide to integrate GCP Monitoring with Splunk On-Call.

In Splunk On-Call
========================

1. In Splunk On-Call, select :guilabel:`Settings` then :guilabel:`Alert Behavior` then :guilabel:`Integrations` then :guilabel:`GCP Monitoring`.
2. To turn on the integration, select :guilabel:`Enable Integration`. Your endpoint URL is generated. 
3. Replace the ``$routing_key`` portion of the URL with the actual routing key you want to use. The integration can't send alerts if the routing key is empty. To view or configure routing keys in Splunk On-Call, select :guilabel:`Alert Behavior` then :guilabel:`Route Keys`.

In Google Cloud Platform
==============================

1. Navigate to :guilabel:`Monitoring` then :guilabel:`Alerting` then select :guilabel:`EditNotification Channels` option.
2. Scroll to :guilabel:`Webhooks` and select :guilabel:`Add New`.
3. Under the :guilabel:`Endpoint URL` enter the address you copied from your Splunk On-Call GCP Monitoring integration page. 
4. Enter your display name in :guilabel:`Display Name`, for example, Splunk On-Call.
5. Leave :guilabel:`Use HTTP Basic Auth` unselected.
6. Select :guilabel:`Test Connection`. The :guilabel:`Test Connection` button doesn't trigger an incident in Splunk On-Call but you have to select it to save. To test the integration you need to manually trigger an alert in GCP Monitoring.
7. Select :guilabel:`Save`.
8. Add the on-call webhook notification channel you created to your desired alerting policies.
