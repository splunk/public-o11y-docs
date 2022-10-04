.. _logs-scp:

*******************************************************************
Set up Log Observer Connect for Splunk Cloud Platform
*******************************************************************

Set up Log Observer Connect by integrating Log Observer with Splunk Cloud Platform. If you are in a Splunk Enterprise environment and want to set up Log Observer Connect, see :ref:`logs-set-up-logconnect`.

When you set up Log Observer Connect, your logs data remains strictly in your Splunk Cloud Platform instance and is accessible only to Log Observer Connect. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

Region and version availability
==============================================================
Splunk Log Observer Connect is available in the AWS regions us0, us1, and eu0. Splunk Log Observer Connect is compatible with Splunk Cloud Platform versions 8.2 and higher. Log Observer Connect is not available for Splunk Cloud Platform trials.

.. note:: You can collect data using both the Splunk Distribution of OpenTelemetry Collector and the universal forwarder without submitting any duplicate telemetry data. See :ref:`collector-with-the-uf` to learn how.

Prerequisites
==============================================================
Ensure that token authentication is enabled in your Splunk Cloud Platform instance. See :new-page:`Securing Splunk Cloud Platform: Enable or disable token authentication token <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth.html>` to learn how.

Set up Log Observer Connect
==============================================================
To set up Log Observer Connect for Splunk Cloud Platform, follow these steps:

1. In Observability Cloud, go to :guilabel:`Settings > Log Observer Connect` and select :guilabel:`Add new connection`. If you don't see :guilabel:`Log Observer Connect` in :guilabel:`Settings`, you are not an administrator in Observability Cloud. Contact your organization's Observability Cloud administrator to perform this integration.

2. Select :guilabel:`Splunk Cloud Platform`.

3. Follow the instructions in the guided setup for the integration to do the following in Splunk Cloud Platform:

   a. Configure a service account in Splunk Cloud Platform. The service account is a user role that can access the specific Splunk Cloud Platform indexes that you want your users to search in Log Observer Connect.

   b. Configure users in the Splunk Cloud Platform.

   c. Attach the role and the user you created in the integration guided setup.

   d. Secure a connection to your Splunk Cloud Platform instance in Observability Cloud. To get help from Splunk Support, :ref:`Submit a support ticket <support-ticket>`. To do it yourself, select :guilabel:`Download this script` in the guided setup section, :guilabel:`Secure connection to the Splunk platform`, and follow the instructions on screen. When you run the script, the Admin Config Service API does the following:
   
      - Adds Observability Cloud IPs and your local machine's IP to your Splunk Cloud Platform allow list to allow Log Observer Connect services and your machine to connect to your Splunk Cloud Platform instance through the management port
      
      - Fetches a server certificate
      
      - Removes your local machine's IP from the allow list
      
4. Copy and paste the server certificate on the next page to securely connect Log Observer Connect and your Splunk Cloud Platform instance.

5. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

   .. note:: Manage concurrent search limits using your current strategy in Splunk Cloud Platform. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Cloud Platform. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in Log Observer Connect. For example, if there are three users accessing Log Observer Connect at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Cloud Platform.

.. _support-ticket:

Submit a support ticket
===================================================================
Submit a ticket to Splunk Support to configure your Splunk Cloud Platform instance’s IP allow list. Configuring your allow list properly opens your Splunk Cloud Platform instance management port to Log Observer Connect, which can then search your Splunk Cloud Platform instance log data. After Splunk Support prepares your Splunk Cloud Platform instance, you can securely create a connection to Log Observer Connect.

To submit a support ticket, follow these steps:

1. Find the following:

   a. Your Observability Cloud organization name and region. To see this information in Observability Cloud, go to :guilabel:`Settings`, then select your profile name.
   
   b. Your Splunk Cloud Platform instance name, the URL prefix of your Splunk Cloud Platform deployment, which is formatted as such: [Your_instance_name].splunkcloud.com.

2. Log in to your Splunk Cloud Platform instance and select :guilabel:`Support`.

3. Select :guilabel:`Support Portal` from the drop-down list to submit a case ticket.

4. In the description of your ticket, paste the following and enter the relevant values for your organization:

   .. code-block:: bash

      OrgID: <enter-orgid>
      Realm: <enter-realm>
      Instance Name: <instance-name>
      Request: Please securely open our Splunk Cloud Platform instance management port (8089) and add the IP addresses of the above realm to our allow list. Also, please provide us with the SSL certificate chain in this ticket so that we can enable Log Observer Connect.
   

When you receive the SSL certificate from Splunk Support in your support ticket, do the following:

1. Paste the first certificate stanza in the final section of the Log Observer Connect guided setup, :guilabel:`Set up Observability Cloud`.

2. Click :guilabel:`Save and Activate`.


Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common issues with Log Observer Connect.
