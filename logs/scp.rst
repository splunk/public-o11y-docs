.. _logs-scp:

*******************************************************************
Set up Log Observer Connect for Splunk Cloud Platform
*******************************************************************

.. meta::
  :description: Connect your Splunk Cloud Platform instance to Splunk Observability Cloud. Set up Log Observer Connect to investigate logs in context with metrics and traces.

Set up Log Observer Connect by integrating Log Observer with Splunk Cloud Platform. If you are in a Splunk Enterprise environment and want to set up Log Observer Connect, see :ref:`logs-set-up-logconnect`.

When you set up Log Observer Connect, your logs data remains in your Splunk Cloud Platform instance and is accessible only to Log Observer Connect. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

.. note:: You can collect data using both the Splunk Distribution of the OpenTelemetry Collector and the Universal Forwarder without submitting any duplicated telemetry data. See :ref:`collector-with-the-uf` to learn how.

Region and version availability
==============================================================

Splunk Log Observer Connect is available in the following Splunk Observability realms: us0, us1, us2, eu0, jp0, and au0. It's not available for Splunk Cloud Platform trials and is not supported in GovCloud regions.  

Splunk Log Observer Connect is compatible with Splunk Cloud Platform versions 9.0.2209 and higher. 

Prerequisites
==============================================================

To configure the Splunk Cloud service account user in the following section you must have the sc_admin role.

Ensure the following configuration in your Splunk Cloud instance:

* Token authentication is enabled for your Log Observer Connect service account in your Splunk Cloud Platform instance. See :new-page:`Securing Splunk Cloud Platform: Enable or disable token authentication token <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how. 

* Allow these IPs:

  - us0: ``34.199.200.84``, ``52.20.177.252``, ``52.201.67.203``, ``54.89.1.85``
  - us1: ``44.230.152.35``, ``44.231.27.66``, ``44.225.234.52``, ``44.230.82.104``
  - eu0: ``108.128.26.145``, ``34.250.243.212``, ``54.171.237.247``
  - jp0: ``35.78.47.79``, ``35.77.252.198``, ``35.75.200.181``
  - au0: ``13.54.193.47``, ``13.55.9.109``, ``54.153.190.59``

Set up Log Observer Connect
==============================================================
To set up Log Observer Connect for Splunk Cloud Platform without help from the Support team, follow these steps:

Splunk Observability Cloud
----------------------------------------------------------------
In Splunk Observability Cloud, do the following:

1. Go to :guilabel:`Settings > Log Observer Connect` and select :guilabel:`Add new connection`. If you don't see :guilabel:`Log Observer Connect` in :guilabel:`Settings`, you are not an administrator in Splunk Observability Cloud. Contact your organization's Splunk Observability Cloud administrator to perform this integration.

2. Select :guilabel:`Splunk Cloud Platform`. 

Splunk Cloud Platform
----------------------------------------------------------------
To configure the Splunk Cloud service account user in the following section you must have the sc_admin role.

In Splunk Cloud Platform, follow the instructions in the guided setup for the integration to do the following:

1. To configure a role in Splunk Cloud Platform for the Log Observer Connect service account, go to :guilabel:`Settings > Roles`.

      .. image:: /_images/logs/setupLOC1.png
         :width: 100%
         :alt: This screenshot shows how to go to Roles in Splunk Cloud Platform where you will set up a service account for Log Observer Connect.
      
2. Select the role you want to use for the Log Observer Connect service account. The service account is a user role that can access the specific Splunk Cloud Platform indexes that you want your users to search in Log Observer Connect. 
      
3. On the :guilabel:`Capabilities` tab, ensure that ``edit_tokens_own`` is selected. Also, ensure that ``indexes_list_all`` is not selected.

      .. image:: /_images/logs/CapabilitiesTab1.png
         :width: 100%
         :alt: This screenshot shows the Capabilities tab in user configuration.

4. On the :guilabel:`Indexes` tab in the :guilabel:`Included` column, deselect :guilabel:`*(All internal indexes)` and select the indexes that you want users to query in Log Observer Connect.

      .. image:: /_images/logs/IndexesTab1.png
         :width: 100%
         :alt: This screenshot shows the Indexes tab in user configuration.

5. On the :guilabel:`Resources` tab, enter a :guilabel:`Standard search limit` of 40 for both :guilabel:`Role search job limit` and :guilabel:`User search job limit`. Enter 0 for :guilabel:`Real-time search limit` for both role and user search job limits.

   The limit of 40 assumes that you have 10 Log Observer Connect users. To determine your ideal :guilabel:`Standard search limit`, multiply the number of Log Observer Connect users you have by 4. For example, if you have 20 Log Observer users, enter a :guilabel:`Standard search limit` of 80 for both :guilabel:`Role search job limit` and :guilabel:`User search job limit`.

      .. image:: /_images/logs/ResourcesTab1.png
         :width: 100%
         :alt: This screenshot shows recommended configuration for role search job limit and user search job limit.

6. Now, in the :guilabel:`Role search time window limit` section of the :guilabel:`Resources` tab, select :guilabel:`Custom time` and enter 2,592,000 seconds (30 days) for the maximum time window for searches for this role. For the earliest searchable event time for this role,  select :guilabel:`Custom time` and enter 7,776,000 seconds (90 days). In the :guilabel:`Disk space limit` section enter a :guilabel:`Standard search limit` of 1000 MB.

      .. image:: /_images/logs/ResourcesTab2.png
         :width: 100%
         :alt: This screenshot shows recommended configuration for role search time window limit and disk space limit.

7. Next, in Splunk Cloud Platform, go to :guilabel:`Settings > Users` and create the user for the Log Observer Connect service account. In the :guilabel:`Assign roles` section, assign to the user the role you created in the preceeding steps for the Log Observer Connect service account.
   
      .. image:: /_images/logs/CreateUser.png
         :width: 100%
         :alt: The Create user page in Splunk Cloud Platform where you can assign a user to the service account role.

.. _download-certificate:

8. Secure a connection to your Splunk Cloud Platform instance in Splunk Observability Cloud. To get help from Splunk Support, :ref:`Submit a support ticket <support-ticket>`. To do it yourself, add your public IPv4 address to your Splunk Cloud Platform allow list by following instructions in :new-page:`Add subnets to IP allow lists <https://docs.splunk.com/Documentation/SplunkCloud/latest/Admin/ConfigureIPAllowList#Add_subnets_to_IP_allow_lists>`. 

   If you are in a GCP environment, add the following additional IP addresses to your Splunk Cloud Platform allow list:

         * 35.247.113.38/32
   
         * 35.247.32.72/32
   
         * 35.247.86.219/32
      
9. Access your Splunk Cloud Platform management port (for example, stackname.splunkcloud.com:8089) and use your browser's secure connection to download the certificate.

   a. For example, in the Chrome browser, select the lock icon in the address bar, then select :guilabel:`Connection is secure`.

      .. image:: /_images/logs/chrome-secure1A.png
         :width: 50%
         :alt: This screenshot shows how to find the lock icon for secure download in Google Chrome.
   
   b. Next, select :guilabel:`Certificate is valid`.

      .. image:: /_images/logs/chrome-secure2A.png
         :width: 50%
         :alt: This screenshot shows how to download a certificate in Google Chrome.

   c. On the :guilabel:`Details` tab, select :guilabel:`Export`.

      .. image:: /_images/logs/chrome-secure3A.png
         :width: 60%
         :alt: This screenshot shows how to finish downloading a certificate in Google Chrome.

10.  Go back to the Log Observer Connect guided setup and select :guilabel:`Next`. Enter your service account username, password, and Splunk platform URL, then upload the certificate you downloaded in the previous step to complete the guided setup.

11.  Remove your IPv4 address from the IP allowlist that you added in step 8. If you are in a GCP environment, do not remove the additional GCP IP addresses that you added in step 8.

12.  Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

   .. note:: Manage concurrent search limits using your current strategy in Splunk Cloud Platform. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Cloud Platform. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in Log Observer Connect. For example, if there are three users accessing Log Observer Connect at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Cloud Platform.

.. _support-ticket:

Submit a support ticket
===================================================================
If you were not able to independently secure a connection to your Splunk Cloud Platform instance in step 8 in the previous section, you may submit a support ticket from your Splunk Cloud Platform instance to do this on your behalf. Submit a ticket to Splunk Support to configure your Splunk Cloud Platform instance's IP allow list. Configuring your allow list properly opens your Splunk Cloud Platform instance management port to Log Observer Connect, which can then search your Splunk Cloud Platform instance log data. After Splunk Support prepares your Splunk Cloud Platform instance, you can securely create a connection to Log Observer Connect.

To submit a support ticket, follow these steps:

1. Find the following:

   a. Your Splunk Observability Cloud organization name and region. To see this information in Splunk Observability Cloud, go to :guilabel:`Settings`, then select your profile name.
   
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

2. Select :guilabel:`Save and Activate`.


Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common issues with Log Observer Connect.
