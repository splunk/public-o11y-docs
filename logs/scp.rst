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
Splunk Log Observer Connect is available in the following Splunk Observability realms: us0, us1, us2, eu0, jp0, and au0. Splunk Log Observer Connect is compatible with Splunk Cloud Platform versions 8.2 and higher. Splunk Log Observer Connect is not available for Splunk Cloud Platform trials and is not supported in GovCloud regions. 

.. note:: You can collect data using both the Splunk Distribution of OpenTelemetry Collector and the universal forwarder without submitting any duplicate telemetry data. See :ref:`collector-with-the-uf` to learn how.

Prerequisites
==============================================================
Ensure that token authentication is enabled for your Log Observer Connect service account in your Splunk Cloud Platform instance. See :new-page:`Securing Splunk Cloud Platform: Enable or disable token authentication token <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how. 
The Splunk Cloud users you configure in the following section must have the sc_admin role.

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
         :alt: This screenshot shows the Create user page in Splunk Cloud Platform where you can assign a user to the service account role.

8. Secure a connection to your Splunk Cloud Platform instance in Splunk Observability Cloud. To get help from Splunk Support, :ref:`Submit a support ticket <support-ticket>`. To do it yourself, open the third section in the guided setup called :guilabel:`Secure connection to the Splunk platform`. You can either select :guilabel:`Download this script` and follow the instructions on screen, or you can copy the script from the guided setup, then paste it into a shell script and run it. When you run the script, the Admin Config Service API does the following:
   
      - Adds Splunk Observability Cloud IPs and your local machine's IP to your Splunk Cloud Platform allow list to allow Log Observer Connect services and your machine to connect to your Splunk Cloud Platform instance through the management port
      
      - Fetches a certificate chain
      
      - Removes your local machine's IP from the allow list
      
9. Copy the first certificate in the chain and paste it on the next page of the guided setup to securely connect Log Observer Connect and your Splunk Cloud Platform instance. The script returns 3 certificates. Be sure to copy only the first certificate and include ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----``. The following is an example of a certificate. 

      ``-----BEGIN CERTIFICATE-----``
      
      ``MIIEiDCCA3CgAwIBAgIQYtRkQZS4gkQSqEN/3NaYgjANBgkqhkiG9w0BAQsFADBG
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
      F+4goIJZUyLdHZ+a``

     ``-----END CERTIFICATE-----``

10. Make sure to give each connection a unique name on the final page of the Log Observer Connect guided setup.

   .. note:: Manage concurrent search limits using your current strategy in Splunk Cloud Platform. All searches initiated by Log Observer Connect users go through the service account you create in Splunk Cloud Platform. For each active Log Observer Connect user, four back-end searches occur when a user performs a search in Log Observer Connect. For example, if there are three users accessing Log Observer Connect at the same time, the service account for Log Observer Connect initiates approximately 12 searches in Splunk Cloud Platform.

.. _support-ticket:

Submit a support ticket
===================================================================
If you were not able to run the script in step 3d in the preceeding section, you may submit a support ticket from your Splunk Cloud Platform instance to do this on your behalf. Submit a ticket to Splunk Support to configure your Splunk Cloud Platform instance’s IP allow list. Configuring your allow list properly opens your Splunk Cloud Platform instance management port to Log Observer Connect, which can then search your Splunk Cloud Platform instance log data. After Splunk Support prepares your Splunk Cloud Platform instance, you can securely create a connection to Log Observer Connect.

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
