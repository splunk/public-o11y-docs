.. _logs-set-up-logconnect:

*******************************************************************
Set up Log Observer Connect for Splunk Enterprise
*******************************************************************

Set up Log Observer Connect by integrating Log Observer with Splunk Enterprise. If you are in a Splunk Cloud Platform environment and want to set up Log Observer Connect, see :ref:`logs-scp`. 

When you set up Log Observer Connect, your Splunk Enterprise logs data remains in Splunk Enterprise. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

Region and version availability
==============================================================
Splunk Log Observer Connect is available in the AWS regions us0, us1, and eu0. Splunk Log Observer Connect is compatible with Splunk Enterprise 8.2 and higher. 

.. note:: You can collect data using both the Splunk Distribution of OpenTelemetry Collector and the Universal Forwarder without submitting any duplicate telemetry data. See :ref:`collector-with-the-uf` to learn how.

Prerequisites
==============================================================
Ensure that token authentication is enabled in your Splunk Enterprise instance. See :new-page:`Securing Splunk Enterprise: Enable or disable token authentication <https://docs.splunk.com/Documentation/Splunk/latest/Security/EnableTokenAuth>` to learn how.

Set up Log Observer Connect
==============================================================
To set up Log Observer Connect for Splunk Enterprise, follow these steps:

1. In Observability Cloud, go to :guilabel:`Settings > Log Observer Connect` and click :guilabel:`Add new connection`.

2. Click :guilabel:`Splunk Enterprise`.

3. Follow the instructions in the integration guided setup to do the following in Splunk Enterprise:

   a. Create a new role in your Splunk Enterprise instance.

   b. Select the Splunk Enterprise indexes that you want to search in Log Observer Connect. 

   c. Create and configure a new user in your Splunk Enterprise instance.

   d. Obtain certificates for securing inter-Splunk communication. See :new-page:`Configure and install certificates in Splunk Enterprise for Splunk Log Observer Connect <https://quickdraw.splunk.com/redirect/?product=Observability&location=splunk.integration.third.party&version=current>` to learn how. 

4. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

.. note:: Manage concurrent search limits using your current strategy in Splunk Enterprise. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Enterprise. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in the Log Observer Connect UI. For example, if there are three concurrent users accessing the Log Observer Connect UI at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Enterprise.

Troubleshooting
==============================================================
See :ref:`logs-LOconnect-troubleshoot` to learn how to solve common  issues with Log Observer Connect.
