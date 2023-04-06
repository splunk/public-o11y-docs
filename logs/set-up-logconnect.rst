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

* Token authentication is active. See :new-page:`Securing Splunk Enterprise: Enable or disable token authentication <https://docs.splunk.com/Documentation/Splunk/latest/Security/EnableTokenAuth>` to learn how.

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

1. In Observability Cloud, go to :guilabel:`Settings > Log Observer Connect` and click :guilabel:`Add new connection`.

2. Click :guilabel:`Splunk Enterprise`.

3. Follow the instructions in the integration guided setup to do the following in Splunk Enterprise:

  a. Create a new role in your Splunk Enterprise instance.

  b. Select the Splunk Enterprise indexes that you want to search in Log Observer Connect. 

  c. Create and configure a new user in your Splunk Enterprise instance.

  d. Obtain certificates for securing inter-Splunk communication. See :new-page:`Configure and install certificates in Splunk Enterprise for Splunk Log Observer Connect <https://quickdraw.splunk.com/redirect/?product=Observability&location=splunk.integration.third.party&version=current>` to learn how. Copy only the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Enterprise instance.

4. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

.. note:: Manage concurrent search limits using your current strategy in Splunk Enterprise. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Enterprise. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in the Log Observer Connect UI. For example, if there are three concurrent users accessing the Log Observer Connect UI at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Enterprise.

Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common  issues with Log Observer Connect.
