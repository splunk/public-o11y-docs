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
      
4. Copy the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Cloud Platform instance. The script returns 3 certificates. Be sure to copy only the first certificate and include ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----``. The following is an example of a certificate. 

      ``-----BEGIN CERTIFICATE-----
      MIIEiDCCA3CgAwIBAgIQYtRkQZS4gkQSqEN/3NaYgjANBgkqhkiG9w0BAQsFADBG
      MQswCQYDVQQGEwJVUzEiMCAGA1UEChMZR29vZ2xlIFRydXN0IFNlcnZpY2VzIExM
      QzETMBEGA1UEAxMKR1RTIENBIDFDMzAeFw0yMzAyMjAwOTE1MzRaFw0yMzA1MTUw
      OTE1MzNaMBkxFzAVBgNVBAMTDnd3dy5nb29nbGUuY29tMFkwEwYHKoZIzj0CAQYI
      KoZIzj0DAQcDQgAEOU31sc6basWKjNmWj0gWF9ewzDavJK3QKASkQ/V7XwatprPh
      /vnuEzWx8vYY1Rlfcy5Yhsxpa/Cb9Iomn+wIaqOCAmgwggJkMA4GA1UdDwEB/wQE
      AwIHgDATBgNVHSUEDDAKBggrBgEFBQcDATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQW
      BBQilv+CDxMpP/SuW5VTeT4rzLTAoTAfBgNVHSMEGDAWgBSKdH+vhc3ulc09nNDi
      RhTzcTUdJzBqBggrBgEFBQcBAQReMFwwJwYIKwYBBQUHMAGGG2h0dHA6Ly9vY3Nw
      LnBraS5nb29nL2d0czFjMzAxBggrBgEFBQcwAoYlaHR0cDovL3BraS5nb29nL3Jl
      cG8vY2VydHMvZ3RzMWMzLmRlcjAZBgNVHREEEjAQgg53d3cuZ29vZ2xlLmNvbTAh
      BgNVHSAEGjAYMAgGBmeBDAECATAMBgorBgEEAdZ5AgUDMDwGA1UdHwQ1MDMwMaAv
      oC2GK2h0dHA6Ly9jcmxzLnBraS5nb29nL2d0czFjMy9tb1ZEZklTaWEyay5jcmww
      ggEFBgorBgEEAdZ5AgQCBIH2BIHzAPEAdwCt9776fP8QyIudPZwePhhqtGcpXc+x
      DCTKhYY069yCigAAAYZuUlZbAAAEAwBIMEYCIQDlwIgI7EnPSD21IsDsf1botxy/
      Blfi2jKy60WpGq+XNgIhAI8L2XYzQ8OEGsw7JmpWC/hOKSB18n6wqB3EMWYFoaRc
      AHYAejKMVNi3LbYg6jjgUh7phBZwMhOFTTvSK8E6V6NS61IAAAGGblJWVQAABAMA
      RzBFAiBd+rIH4lPny35N5OmGqOEYNXl3rK7pfzfjZH0sFF30TwIhAKK4pgWZO0IN
      fTzqnyWKEbmqy6lyNvl/khtYreqsvE0eMA0GCSqGSIb3DQEBCwUAA4IBAQCyw1us
      +cEBWh7HglwAoU1TMStbdNrugviDQ3DoBnGL4N+sCjOfXzCXGhINLwzv8KfAZV+Y
      0IX4nGNyliDu7Gd6vt+pnyLUsI2fTfPZq6Po14rNGaC8vRHcN+Yo317ylo6sQD6E
      Z04CmlIA4JUzEtj1H6tj69RjyxDqV5EXsGLJ+DIJ4JYAm5xi6gEvFkdhnVYvHV5W
      0BNRR+EO4Vw/tOkpyisemMt9L9aFZ4HaEuiSvL3R/HGU94uCxXc+TFwmVTelVFZN
      eP4Q0ck4ooUOd7XgCc5qdvCiCiD/268+gBNSHhJSPZXeuzC6vL7mMKVY4I80sKKP
      F+4goIJZUyLdHZ+a
      -----END CERTIFICATE-----``

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
