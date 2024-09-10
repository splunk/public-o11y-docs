.. _logs-set-up-logconnect:

*******************************************************************
Set up Log Observer Connect for Splunk Enterprise
*******************************************************************

.. meta::
  :description: Connect your Splunk Enterprise instance to Splunk Observability Cloud. Set up Log Observer Connect to investigate logs in context with metrics and traces.

Set up Log Observer Connect by integrating Log Observer with Splunk Enterprise. When you set up Log Observer Connect, Splunk Observability Cloud uses the Splunk Enterprise search head to authenticate the service account and to run searches.

If you are in a Splunk Cloud Platform environment and want to set up Log Observer Connect, see :ref:`logs-scp`. 

When you set up Log Observer Connect, your Splunk Enterprise logs data remains in Splunk Enterprise. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

.. note:: You can collect data using both the Splunk Distribution of the OpenTelemetry Collector and the Universal Forwarder without submitting any duplicated telemetry data. See :ref:`collector-with-the-uf` to learn how.

Region and version compatibility
==============================================================

.. include:: /_includes/logs/loc-availability.rst

Prerequisites
==============================================================

To set up Log Observer Connect for Splunk Enterprise, you must have an administrator role in Splunk Observability Cloud. You must also be an administrator in Splunk Enterprise.

You need your service account username, password, Splunk platform URL (search head cluster), and a certificate.

Ensure the following configuration in your Splunk Enterprise instance:

* Token authentication is active on your Log Observer Connect service account. See :new-page:`Securing Splunk Enterprise: Enable or disable token authentication <https://docs.splunk.com/Documentation/Splunk/latest/Security/EnableTokenAuth>` to learn how.

* Make sure you can access these IP addresses from the Splunk Enterprise host or network:

  - us0: ``34.199.200.84``, ``52.20.177.252``, ``52.201.67.203``, ``54.89.1.85``
  - us1: ``44.230.152.35``, ``44.231.27.66``, ``44.225.234.52``, ``44.230.82.104``
  - us2: ``35.247.113.38/32``, ``35.247.32.72/32``, ``35.247.86.219/32``
  - eu0: ``108.128.26.145``, ``34.250.243.212``, ``54.171.237.247``
  - eu1: ``3.73.240.7``, ``18.196.129.64``, ``3.126.181.171``
  - eu2: ``13.41.86.83``, ``52.56.124.93``, ``35.177.204.133``
  - jp0: ``35.78.47.79``, ``35.77.252.198``, ``35.75.200.181``
  - au0: ``13.54.193.47``, ``13.55.9.109``, ``54.153.190.59``

* Expose port ``8089`` to all the IPs of the realms you're using. Log Observer Connect needs to be able to access the search head on port ``8089``. It doesn't need to directly access the deployer or indexers. For example, if you have a search head cluster with load balancer in front of the members of the search head cluster, you allow the incoming traffic to the load balancer.

.. caution:: Check with your security team before you add these IPs to the allow list of your firewall rules or to your security groups in AWS.

Set up Log Observer Connect
==============================================================
To set up Log Observer Connect for Splunk Enterprise, follow these steps:

Splunk Observability Cloud
----------------------------------------------------------------
In Splunk Observability Cloud, do the following:

1. Go to :guilabel:`Settings > Log Observer Connect` and select :guilabel:`Add new connection`. If you don't see :guilabel:`Log Observer Connect` in :guilabel:`Settings`, you are not an administrator in Splunk Observability Cloud. Contact your organization's Splunk Observability Cloud administrator to perform this integration.

2. Select :guilabel:`Splunk Enterprise`. 

Splunk Enterprise
----------------------------------------------------------------
You must create a user and role in your Splunk Enterprise search head to serve as a service account for Splunk Observability Cloud.

In your Splunk Enterprise search head, follow the instructions in the guided setup for the integration to do the following:

1. To configure a role in Splunk Enterprise for the Log Observer Connect service account, go to :guilabel:`Settings > Roles`.
      
2. Select the role you want to use for the Log Observer Connect service account. The service account is a user role that can access the specific Splunk Enterprise indexes that you want your users to search in Log Observer Connect. 
      
3. On the :guilabel:`Capabilities` tab, ensure that ``edit_tokens_own`` and ``search`` are selected. Also, ensure that ``indexes_list_all`` is not selected.

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

6. Now, in the :guilabel:`Role search time window limit` section of the :guilabel:`Resources` tab, select :guilabel:`Custom time` and enter 2592000 seconds (30 days) for the maximum time window for searches for this role. For the earliest searchable event time for this role, select :guilabel:`Custom time` and enter 7776000 seconds (90 days). In the :guilabel:`Disk space limit` section enter a :guilabel:`Standard search limit` of 1000 MB.

      .. image:: /_images/logs/ResourcesTab2.png
         :width: 100%
         :alt: This screenshot shows recommended configuration for role search time window limit and disk space limit.

7. Next, in Splunk Enterprise, go to :guilabel:`Settings > Users` and create the user for the Log Observer Connect service account. In the :guilabel:`Assign roles` section, assign to the user the role you created in the preceeding steps for the Log Observer Connect service account.
   
      .. image:: /_images/logs/CreateUser.png
         :width: 100%
         :alt: This screenshot shows the Create user page in Splunk Enterprise where you can assign a user to the service account role.

8. Add a Workload Rule in Splunk Enterprise to limit the amount of time that Log Observer Connect searches can run. This limit maintains a responsive experience for Log Observer users and reduces the chances that Log Observer Connect searches are queued. Follow the guidance in :new-page:`Create a Workload Rule in Splunk Web <https://docs.splunk.com/Documentation/SplunkCloud/9.2.2403/Admin/CreateWLMRules#Create_a_workload_rule_in_Splunk_Web>` and configure the rule as follows:

.. code-block:: none

   Predicate: user=[your_Log_Observer_Connect_service-account_name] AND runtime>5m
   Schedule: Always on
   Action: Abort search

.. image:: /_images/logs/WorkloadMgmt.png
         :width: 100%
         :alt: This screenshot shows the configuration of the Workload Rule.

The Workload Rule limits each Log Observer Connect search to 5 minutes.

9. Obtain certificates for securing inter-Splunk communication. See :new-page:`Configure and install certificates in Splunk Enterprise for Splunk Log Observer Connect <https://quickdraw.splunk.com/redirect/?product=Observability&location=splunk.integration.third.party&version=current>` to learn how. Copy only the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Enterprise instance.

10. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

.. note:: Manage concurrent search limits using your current strategy in Splunk Enterprise. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Enterprise. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in the Log Observer Connect UI. For example, if there are three concurrent users accessing the Log Observer Connect UI at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Enterprise.

Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common issues with Log Observer Connect.
