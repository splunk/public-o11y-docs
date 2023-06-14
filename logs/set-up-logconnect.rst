.. _logs-set-up-logconnect:

*******************************************************************
Set up Log Observer Connect for Splunk Enterprise
*******************************************************************

.. meta::
  :description: Connect your Splunk Enterprise instance to Splunk Observability Cloud. Set up Log Observer Connect to investigate logs in context with metrics and traces.

Set up Log Observer Connect by integrating Log Observer with Splunk Enterprise. If you are in a Splunk Cloud Platform environment and want to set up Log Observer Connect, see :ref:`logs-scp`. 

When you set up Log Observer Connect, your Splunk Enterprise logs data remains in Splunk Enterprise. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

Region and version compatibility
==============================================================

Splunk Log Observer Connect is available in the AWS regions us0, us1, eu0, jp0, and au0. Splunk Log Observer Connect is compatible with Splunk Enterprise 8.2 and higher. 

.. note:: You can collect data using both the Splunk Distribution of OpenTelemetry Collector and the Universal Forwarder without submitting any duplicate telemetry data. See :ref:`collector-with-the-uf` to learn how.

Prerequisites
==============================================================

Ensure the following configuration in your Splunk Enterprise instance:

* Token authentication is active on your Log Observer Connect service account. See :new-page:`Securing Splunk Enterprise: Enable or disable token authentication <https://docs.splunk.com/Documentation/Splunk/latest/Security/EnableTokenAuth>` to learn how.

* Allow these IPs:

  - us0: ``34.199.200.84``, ``52.20.177.252``, ``52.201.67.203``, ``54.89.1.85``
  - us1: ``44.230.152.35``, ``44.231.27.66``, ``44.225.234.52``, ``44.230.82.104``
  - eu0: ``108.128.26.145``, ``34.250.243.212``, ``54.171.237.247``
  - jp0: ``35.78.47.79``, ``35.77.252.198``, ``35.75.200.181``
  - au0: ``13.54.193.47``, ``13.55.9.109``, ``54.153.190.59``

* Expose port ``8089`` to all the IPs of the realms you're using.


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
In Splunk Enterprise, follow the instructions in the guided setup for the integration to do the following:

1. To configure a role in Splunk Enterprise for the Log Observer Connect service account, go to :guilabel:`Settings > Roles`.
      
2. Select the role you want to use for the Log Observer Connect service account. The service account is a user role that can access the specific Splunk Enterprise indexes that you want your users to search in Log Observer Connect. 
      
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

7. Next, in Splunk Enterprise, go to :guilabel:`Settings > Users` and create the user for the Log Observer Connect service account. In the :guilabel:`Assign roles` section, assign to the user the role you created in the preceeding steps for the Log Observer Connect service account.
   
      .. image:: /_images/logs/CreateUser.png
         :width: 100%
         :alt: This screenshot shows the Create user page in Splunk Enterprise where you can assign a user to the service account role.

8. Obtain certificates for securing inter-Splunk communication. See :new-page:`Configure and install certificates in Splunk Enterprise for Splunk Log Observer Connect <https://quickdraw.splunk.com/redirect/?product=Observability&location=splunk.integration.third.party&version=current>` to learn how. Copy only the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Enterprise instance.

9. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

.. note:: Manage concurrent search limits using your current strategy in Splunk Enterprise. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Enterprise. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in the Log Observer Connect UI. For example, if there are three concurrent users accessing the Log Observer Connect UI at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Enterprise.

Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common  issues with Log Observer Connect.
