.. _logs-scp:

*******************************************************************
Set up Log Observer Connect for Splunk Cloud Platform
*******************************************************************

.. meta::
  :description: Connect your Splunk Cloud Platform instance to Splunk Observability Cloud. Set up Log Observer Connect to investigate logs in context with metrics and traces.

Set up Log Observer Connect by integrating Log Observer with Splunk Cloud Platform. If you are in a Splunk Enterprise environment and want to set up Log Observer Connect, see :ref:`logs-set-up-logconnect`.

When you set up Log Observer Connect, your logs remain in your Splunk Cloud Platform instance and are accessible only to Log Observer Connect. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

.. note:: You can collect data using both the Splunk Distribution of the OpenTelemetry Collector and the Universal Forwarder without submitting any duplicated telemetry data. See :ref:`collector-with-the-uf` to learn how.

Region and version availability
==============================================================



.. raw:: html

   <div class="include-start" id="logs/loc-availability.rst"></div>

.. include:: /_includes/logs/loc-availability.rst

.. raw:: html

   <div class="include-stop" id="logs/loc-availability.rst"></div>




.. _logs-scp-prereqs:

Prerequisites
==============================================================

To configure the Splunk Cloud service account user in the following section you must have the sc_admin role.

Ensure the following configuration in your Splunk Cloud instance:

* Token authentication is enabled for your Log Observer Connect service account in your Splunk Cloud Platform instance. See :new-page:`Securing Splunk Cloud Platform: Enable or disable token authentication token <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how. 

* Allow these IPs for Search Head API in :guilabel:`IP allow list` settings. See :new-page:`https://docs.splunk.com/Documentation/SplunkCloud/9.1.2312/Admin/ConfigureIPAllowList`.

  - us0: ``34.199.200.84``, ``52.20.177.252``, ``52.201.67.203``, ``54.89.1.85``
  - us1: ``44.230.152.35``, ``44.231.27.66``, ``44.225.234.52``, ``44.230.82.104``
  - eu0: ``108.128.26.145``, ``34.250.243.212``, ``54.171.237.247``
  - eu1: ``3.73.240.7``, ``18.196.129.64``, ``3.126.181.171``
  - eu2: ``13.41.86.83``, ``52.56.124.93``, ``35.177.204.133``
  - jp0: ``35.78.47.79``, ``35.77.252.198``, ``35.75.200.181``
  - au0: ``13.54.193.47``, ``13.55.9.109``, ``54.153.190.59``
  - us2 (for GCP): ``35.247.113.38/32``, ``35.247.32.72/32``, ``35.247.86.219/32``

Set up Log Observer Connect
==============================================================

To set up Log Observer Connect for Splunk Cloud Platform without help from the Support team, follow these steps:

Splunk Observability Cloud
----------------------------------------------------------------

In Splunk Observability Cloud, do the following:

1. Go to :guilabel:`Settings` then  :guilabel:`Log Observer Connect` and select :guilabel:`Add new connection`. If you don't see :guilabel:`Log Observer Connect` in :guilabel:`Settings`, you are not an administrator in Splunk Observability Cloud. Contact your organization's Splunk Observability Cloud administrator to perform this integration.

2. Select :guilabel:`Splunk Cloud Platform`. Next, log in to Splunk Cloud Platform as an administrator and follow the instructions in the next section.

Splunk Cloud Platform
----------------------------------------------------------------

To configure the Splunk Cloud service account user in the following section you must have the sc_admin role.

In Splunk Cloud Platform, follow the instructions in the guided setup for the integration to do the following:

1. To configure a role in Splunk Cloud Platform for the Log Observer Connect service account, select :guilabel:`Settings` then select :guilabel:`Roles`.

      .. image:: /_images/logs/setupLOC1.png
         :width: 100%
         :alt: This screenshot shows how to go to Roles in Splunk Cloud Platform where you will set up a service account for Log Observer Connect.
      
   Select the role from which you want the Log Observer Connect service account to inherit capabilities. The Log Observer Connect service account is a role that can access the specific Splunk Cloud Platform indexes that you want your users to search in Log Observer Connect. Typically, admins select the Splunk Cloud Platform :guilabel:`user` role as the base role for a Log Observer Connect service account.
      
2. On the :guilabel:`Indexes` tab in the :guilabel:`Included` column, deselect :guilabel:`*(All internal indexes)` and select the indexes that you want users to query in Log Observer Connect.

      .. image:: /_images/logs/IndexesTab1.png
         :width: 100%
         :alt: This screenshot shows the Indexes tab in user configuration.

3. On the :guilabel:`Capabilities` tab, ensure that ``edit_tokens_own`` and ``search`` are selected. Also, ensure that ``indexes_list_all`` is not selected.

      .. image:: /_images/logs/CapabilitiesTab1.png
         :width: 100%
         :alt: This screenshot shows the Capabilities tab in user configuration.

4. On the :guilabel:`Resources` tab, enter a :guilabel:`Standard search limit` of 40 for both :guilabel:`Role search job limit` and :guilabel:`User search job limit`. Enter 0 for :guilabel:`Real-time search limit` for both role and user search job limits.

   The limit of 40 assumes that you have 10 Log Observer Connect users. To determine your ideal :guilabel:`Standard search limit`, multiply the number of Log Observer Connect users you have by 4. For example, if you have 20 Log Observer users, enter a :guilabel:`Standard search limit` of 80 for both :guilabel:`Role search job limit` and :guilabel:`User search job limit`.

      .. image:: /_images/logs/ResourcesTab1.png
         :width: 100%
         :alt: This screenshot shows recommended configuration for role search job limit and user search job limit.

5. Now, in the :guilabel:`Role search time window limit` section of the :guilabel:`Resources` tab, select :guilabel:`Custom time` and enter 2592000 seconds (30 days) for the maximum time window for searches for this role. Do not use commas when entering numbers. For the earliest searchable event time for this role,  select :guilabel:`Custom time` and enter 7776000 seconds (90 days). In the :guilabel:`Disk space limit` section enter a :guilabel:`Standard search limit` of 1000 MB. Select :guilabel:`Save`.

      .. image:: /_images/logs/ResourcesTab2.png
         :width: 100%
         :alt: This screenshot shows recommended configuration for role search time window limit and disk space limit.

6. Next, in Splunk Cloud Platform, go to :guilabel:`Settings` then :guilabel:`Users` and create the user for the Log Observer Connect service account. In the :guilabel:`Assign roles` section, assign to the user the role you created in the preceeding steps for the Log Observer Connect service account.
   
      .. image:: /_images/logs/CreateUser.png
         :width: 100%
         :alt: The Create user page in Splunk Cloud Platform where you can assign a user to the service account role.


7. Add a Workload Rule in Splunk Cloud Platform to limit Log Observer Connect searches to 5 minutes. This limit maintains a responsive experience for Log Observer users and reduces the chances that Log Observer Connect searches are queued. Follow the guidance in :new-page:`Create a Workload Rule in Splunk Web <https://docs.splunk.com/Documentation/SplunkCloud/9.2.2403/Admin/CreateWLMRules#Create_a_workload_rule_in_Splunk_Web>` and configure the rule as follows:

   .. code-block:: none

      Predicate: user=[your_Log_Observer_Connect_service-account_name] AND runtime>5m
      Schedule: Always on
      Action: Abort search

   After creating the Workload Rule, it appears in Workload Management on the Workload Rules tab as follows:

   .. image:: /_images/logs/WorkloadMgmt.png
            :width: 90%
            :alt: This screenshot shows the configuration of the Workload Rule limiting Log Observer Connect searches to 5 minutes.

.. _download-certificate:

8. Secure a connection to your Splunk Cloud Platform instance in Splunk Observability Cloud. See :ref:`logs-scp-prereqs` for more information on the IPs to allow.

   * To get help from Splunk Support, :ref:`Submit a support ticket <support-ticket>`. 

   * To do it yourself, add your public IPv4 address to your Splunk Cloud Platform allow list by following instructions in :new-page:`Add subnets to IP allow lists <https://docs.splunk.com/Documentation/SplunkCloud/latest/Admin/ConfigureIPAllowList#Add_subnets_to_IP_allow_lists>`. 

9. Go back to the Log Observer Connect guided setup and select :guilabel:`Next`. Enter the following:

    * Connection name (Be sure to give each connection a unique name.)
   
    * Service account username
   
    * Password
   
    * Splunk platform URL ``https://<stackname>.splunkcloud.com:8089``

10.  Remove your IPv4 address from the IP allowlist that you added in step 9. If you are in a GCP environment, do not remove the additional GCP IP addresses that you added in step 8. Select :guilabel:`Next`.

11. On the :guilabel:`Configure permissions` page of the guided setup, select the Splunk Observability Cloud users who you want to give access to this connection and the associated Splunk Cloud Platform indexes.

12. Select :guilabel:`Save and activate`.


   .. note:: Manage concurrent search limits using your current strategy in Splunk Cloud Platform. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Cloud Platform. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in Log Observer Connect. For example, if there are three users accessing Log Observer Connect at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Cloud Platform.

.. _support-ticket:

Submit a support ticket
===================================================================

If you were not able to independently secure a connection to your Splunk Cloud Platform instance in step 9 in the previous section, you may submit a support ticket from your Splunk Cloud Platform instance to do this on your behalf. Submit a ticket to Splunk Support to configure your Splunk Cloud Platform instance's IP allow list. Configuring your allow list properly opens your Splunk Cloud Platform instance management port to Log Observer Connect, which can then search your Splunk Cloud Platform instance log data. After Splunk Support prepares your Splunk Cloud Platform instance, you can securely create a connection to Log Observer Connect.

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
      Request: Please securely open our Splunk Cloud Platform instance management port (8089) and add the IP addresses of the above realm to our allow list so that we can enable Log Observer Connect.

Troubleshooting
==============================================================

See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common issues with Log Observer Connect.
