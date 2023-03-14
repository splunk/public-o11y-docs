.. _logs-scp:

*******************************************************************
Set up Log Observer Connect for Splunk Cloud Platform
*******************************************************************

.. meta::
  :description: Connect your Splunk Cloud Platform instance to Splunk Observability Cloud. Set up Log Observer Connect to investigate logs in context with metrics and traces.

Set up Log Observer Connect by integrating Log Observer with Splunk Cloud Platform. If you are in a Splunk Enterprise environment and want to set up Log Observer Connect, see :ref:`logs-set-up-logconnect`.

When you set up Log Observer Connect, your logs data remains strictly in your Splunk Cloud Platform instance and is accessible only to Log Observer Connect. Log Observer Connect does not store or index your logs data. There is no additional charge for Log Observer Connect.

Region and version availability
==============================================================
Splunk Log Observer Connect is available in the AWS regions us0, us1, eu0, jp0, and au0. Log Observer Connect is not supported in GovCloud regions. Splunk Log Observer Connect is compatible with Splunk Cloud Platform versions 8.2 and higher. Log Observer Connect is not available for Splunk Cloud Platform trials.

.. note:: You can collect data using both the Splunk Distribution of OpenTelemetry Collector and the universal forwarder without submitting any duplicate telemetry data. See :ref:`collector-with-the-uf` to learn how.

Prerequisites
==============================================================
Ensure that token authentication is enabled in your Splunk Cloud Platform instance. See :new-page:`Securing Splunk Cloud Platform: Enable or disable token authentication token <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how. 

Set up Log Observer Connect
==============================================================
To set up Log Observer Connect for Splunk Cloud Platform without help from the Support team, follow these steps:

Observability Cloud
----------------------------------------------------------------
1. In Observability Cloud, go to :guilabel:`Settings > Log Observer Connect` and select :guilabel:`Add new connection`. If you don't see :guilabel:`Log Observer Connect` in :guilabel:`Settings`, you are not an administrator in Observability Cloud. Contact your organization's Observability Cloud administrator to perform this integration.

2. Select :guilabel:`Splunk Cloud Platform`. 

Splunk Cloud Platform
----------------------------------------------------------------
3. In Splunk Cloud Platform, follow the instructions in the guided setup for the integration to do the following:

   a. Configure a service account in Splunk Cloud Platform. The service account is a user role that can access the specific Splunk Cloud Platform indexes that you want your users to search in Log Observer Connect.

      .. image:: /_images/logs/setupLOC1.png
         :width: 100%
         :alt: This screenshot shows how to go to Roles in Splunk Cloud Platform where you will set up a service account for Log Observer Connect.
      

   b. Configure users in the Splunk Cloud Platform.
   
      .. image:: /_images/logs/setupLOC2.png
         :width: 100%
         :alt: This screenshot shows the Create user page in Splunk Cloud Platform where you can assign a user to the service account role.

   c. Attach the role and the user you created in the integration guided setup.

   d. Secure a connection to your Splunk Cloud Platform instance in Observability Cloud. To get help from Splunk Support, :ref:`Submit a support ticket <support-ticket>`. To do it yourself, select :guilabel:`Download this script` in the guided setup section, :guilabel:`Secure connection to the Splunk platform`, and follow the instructions on screen. When you run the script, the Admin Config Service API does the following:
   
      - Adds Observability Cloud IPs and your local machine's IP to your Splunk Cloud Platform allow list to allow Log Observer Connect services and your machine to connect to your Splunk Cloud Platform instance through the management port
      
      - Fetches a certificate chain
      
      - Removes your local machine's IP from the allow list
      
4. Copy only the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Cloud Platform instance. The script returns 3 certificates. Copy only the first certificate. The following is an example of a certificate. Be sure to include ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----``.

   .. code-block:: bash

      -----BEGIN CERTIFICATE-----
      MIIFJzCCBA+gAwIBAgISA+6+LuTJWVH+R8wTIO8d9frsMA0GCSqGSIb3DQEBCwUA
      MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD
      EwJSMzAeFw0yMjExMjgxNjE1NTlaFw0yMzAyMjYxNjE1NThaMBwxGjAYBgNVBAMT
      EWxvZ290ZXN0LnNwbGsueHl6MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
      AQEAyLktSn1nk6dxsWC/2PHgb4eSKxoxyEHvah1VlFU56NM5WuzBBAiHE85VlM9z
      FgggVV6Ztqw8kFp4F1hrU3E0gOhmQDSjbQHT7On+w2+TOoga7CiRdAzIMZRGSp/K
      qgLzsBIZ0Z27U15RknqtOXcptkXORzfjIecdJS+12l+ICe62xx2Tsmcdd36dXUlu
      UlMyI4hAFJvyow6pa4Vn5EDtZlOxDs7FbxuKuozgV1MMoMgumVBYxTGxU26BDfAd
      w2zMILNWbSVd9mEYMD1d+V2G5j5Or8jjpcdeU5HJuTqBm8orFJFflHw9x1VCdKgd
      sAIewTGVh9f0Ifo8o1RV53mpKQIDAQABo4ICSzCCAkcwDgYDVR0PAQH/BAQDAgWg
      MB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0G
      A1UdDgQWBBQp6jnoMxUYvH/XVxHACYB1JcT+xjAfBgNVHSMEGDAWgBQULrMXt1hW
      y65QCUDmH6+dixTCxjBVBggrBgEFBQcBAQRJMEcwIQYIKwYBBQUHMAGGFWh0dHA6
      Ly9yMy5vLmxlbmNyLm9yZzAiBggrBgEFBQcwAoYWaHR0cDovL3IzLmkubGVuY3Iu
      b3JnLzAcBgNVHREEFTATghFsb2dvdGVzdC5zcGxrLnh5ejBMBgNVHSAERTBDMAgG
      BmeBDAECATA3BgsrBgEEAYLfEwEBATAoMCYGCCsGAQUFBwIBFhpodHRwOi8vY3Bz
      LmxldHNlbmNyeXB0Lm9yZzCCAQMGCisGAQQB1nkCBAIEgfQEgfEA7wB1AK33vvp8
      /xDIi509nB4+GGq0Zyldz7EMJMqFhjTr3IKKAAABhL89Cg8AAAQDAEYwRAIgLi7C
      mYDsD/yF2/ko7VdjKjILTS1L8xOD6wlhyk0RTjsCIBH5rnW3meF9FEixSdmVKo/8
      LP+tylev2W8sQJfROocXAHYAtz77JN+cTbp18jnFulj0bF38Qs96nzXEnh0JgSXt
      tJkAAAGEvz0LVgAABAMARzBFAiB/RbgI5Nl4vUEBDi/h9J3vQVXS4u2HdL2LXcq4
      YykeUwIhAKcjcLy7PcLiKjGo/PWSj2bzGGTURw6K9ueAX+86qktwMA0GCSqGSIb3
      DQEBCwUAA4IBAQAsvFEG2B3YQjjlatoFHjn01mgCuXnXPPA5qtaderZTh2HOrgql
      XXZukbnmUP04D7ggXV2HEPfyPsgnn+BDbaAMXttCkzwJPAfgFjfaS0qQEZ64r7s7
      i9UqTcBHP8Rezeu3qlLi7OqWdXX6TF/d+4+5zwmEfA24SlgmZilQPbVtaI9tWTcH
      t5rkj8V4KbxMOE/cRGyjjKoQysgHSxa/Fg/Z+lQkApj5lKQLtouVXSAAC638KoXf
      NzxdIRuj2lWaKX4eUGTr6hF4AobaOByXzvJW4GvT48106Yxusx69/eRirTFokaTM
      2c+wNdSUEh+4s+hu/rrhYia5/4oQcnE6q6BW
      -----END CERTIFICATE-----

5. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

   .. note:: Manage concurrent search limits using your current strategy in Splunk Cloud Platform. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Cloud Platform. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in Log Observer Connect. For example, if there are three users accessing Log Observer Connect at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Cloud Platform.

.. _support-ticket:

Submit a support ticket
===================================================================
If you were not able to run the script in step 3d in the preceeding section, you may submit a support ticket to do this on your behalf. Submit a ticket to Splunk Support to configure your Splunk Cloud Platform instance’s IP allow list. Configuring your allow list properly opens your Splunk Cloud Platform instance management port to Log Observer Connect, which can then search your Splunk Cloud Platform instance log data. After Splunk Support prepares your Splunk Cloud Platform instance, you can securely create a connection to Log Observer Connect.

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
