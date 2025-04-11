.. _gcp-connect:

*********************************************************************
Connect to Google Cloud Platform: Guided setup and other options 
*********************************************************************

.. meta::
  :description: Connect your Google Cloud Platform / GCP account to Splunk Observability Cloud.

You can connect your GCP account and send data to Splunk Observability Cloud with the following methods:

* :ref:`gcp-connect-ui`
* :ref:`gcp-api`
* :ref:`gcp-terraform`

.. note:: Before you connect, make sure to read :ref:`gcp-prereqs`.

.. _gcp-connect-ui:

Connect to GCP using the guided setup
============================================

Follow these steps to connect to GCP:

* :ref:`gcp-one`
* :ref:`gcp-two`
* :ref:`gcp-three`

.. _gcp-one:

1. Define a role for your GCP principal
--------------------------------------------------------------------------------------

Use GCP's :strong:`Viewer` role as it comes with the permissions you need for most scenarios.

To customize the permissions for your role refer to :ref:`gcp-prereqs-role-permissions`.

.. _gcp-two:

2. Configure your GCP services
--------------------------------------------------------------------------------------

To configure your GCP service: 

#. Log into your GCP account and select the project you want to monitor in the GCP web console.

#. Authenticate your GCP project using Workload Identity Federation or Service Account Keys. For more details, see :ref:`gcp-prereqs-authenticate`.

.. _gcp-projects:

.. note:: To monitor multiple GCP projects, repeat the steps described in this section for each one of the projects.

.. _gcp-three:

3. Connect your GCP services to Splunk Observability Cloud and start the integration
--------------------------------------------------------------------------------------

By default, Splunk Observability Cloud monitors all supported services, and any new services added later are also monitored. When you set the parameters for your integration you can choose to import metrics from a subset of the available services.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

Log in to Splunk Observability Cloud and open the :new-page:`Google Cloud Platform guided setup <https://login.signalfx.com/#/integrations/gcp>`. Optionally, you can navigate to the guided setup on your own:

  #. In the left navigation menu, select :menuselection:`Data Management`.

  #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

  #. In the integration filter menu, select :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.

  #. In the :guilabel:`Cloud Integrations` section, select the :guilabel:`Google Cloud Platform` tile to open the Google Cloud Platform guided setup.

Authenticate with Workload Identity Federation (WIF)
++++++++++++++++++++++++++++++++++++++++++++++++

1. In the wizard, select Workload Identity Federation (WIF) as the authentication method.

2. Continue to define the connection with GCP: 
  
  * Poll rate. Select the rate (in seconds) at which you want Splunk Observability Cloud to poll GCP for metric data, with 1 minute as the minimum unit, and 10 minutes as the maximum unit. For example, a value of 300 polls metrics once every 5 minutes.   

  * Specify if you want to use quota from the project where metrics are stored. See more at :ref:`gcp-quota`.

  * Note that GCP metadata is automatically imported.

3. Prepare your GCP account following the steps on the UI.

4. Establish the connection: 

  * Name your integration.

  * Import your WIF configuration. Learn more at :ref:`gcp-prereqs-authenticate`.
  
  * Add your projects.

  * Select your access token.

5. Select the data to import: 

  * Specify which GCP services you want to monitor.
  
  * Optionally you can import additional data. See more at :ref:`gcp-additional-data`.

Your GCP integration is now complete!

Authenticate with Service Account keys
++++++++++++++++++++++++++++++++++++++++++++++++

1. In the wizard, select Service Account keys as the authentication method.

2. Continue to define the connection with GCP: 
  
  * Poll rate. Select the rate (in seconds) at which you want Splunk Observability Cloud to poll GCP for metric data, with 1 minute as the minimum unit, and 10 minutes as the maximum unit. For example, a value of 300 polls metrics once every 5 minutes.   

  * Specify if you want to use quota from the project where metrics are stored. See more at :ref:`gcp-quota`.

  * Note that GCP metadata is automatically imported.

3. Prepare your GCP account following the steps on the UI.

4. Establish the connection: 

  * Name your integration.

  * Project. Select :guilabel:`Import service account keys` to add a new project. Your project's ID is automatically extracted from the imported file. Follow the prompts to authenticate it. For more details, see :ref:`gcp-prereqs-authenticate`.

  * Select your access token.

5. Select the data to import.

  * Specify which GCP services you want to monitor.
  
  * Optionally you can import additional data. See more at :ref:`gcp-additional-data`.

Your GCP integration is now complete!

.. _gcp-quota:

Use a single principal for your resources
--------------------------------------------------------------------------------------

In IAM you can grant access to your resources to one or more entities called principals, regardless of the authentication method (single Service Account or Workload Identity Federation). 

If you're using a single principal for multiple projects, GCP tracks all API usage quota in the project where the principal originates from, which can result in throttling in your integration. To mitigate this, select :strong:`Use quota from the project where metrics are stored`. To use this option the principal provided for the project needs either the ``serviceusage.services.use`` permission or the Service Usage Consumer role.

For a more detailed description see :new-page:`Principals <https://cloud.google.com/iam/docs/overview#concepts_related_identity>` in GCP's docs.

.. _gcp-additional-data:

Import additional data
--------------------------------------------------------------------------------------

On step 5 of the guided set-up you can configure the import of the following additional data:

* Custom metric type domains. To list any additional GCP service domain names that you want to monitor, use commas to separate domain names in the :strong:`Custom Metric Type Domains` field. For example, to obtain Apigee metrics, add ``apigee.googleapis.com``.

      - For information on the available GCP metric domains refer to the official GCP docs at :new-page:`Google Cloud metrics <https://cloud.google.com/monitoring/api/metrics_gcp>`. 

      - To learn about custom metric type domain syntax, see :new-page:`Custom metric type domain examples <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview#Custom-metric-type-domain-examples>` in the Splunk developer documentation.

* Compute metadata included list. If you select Compute Engine as one of the services to monitor, you can enter a comma-separated list of Compute Engine Instance metadata keys to send as properties. These metadata keys are sent as properties named ``gcp_metadata_<metadata-key>``.

Alternatives to connect to GCP
============================================

.. _gcp-api:

Integrate GCP using the API 
--------------------------------------------------------------------------------------

You can also integrate GCP with Splunk Observability Cloud using the GCP API. 

See :new-page:`Integrate Google Cloud Platform Monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview#Specifying-custom-metric-type-domains>` in our developer portal for details.

.. _gcp-terraform:

Connect to GCP using Terraform
--------------------------------------------------------------------------------------

To connect using Terraform, see :ref:`terraform-config`.

Next steps
============================================

To validate your setup, examine the details of your GCP integration as displayed in the list at the end of the setup page.

* For details about the metrics provided by an GCP integration, see :ref:`gcp-metrics`
* To send logs from GCP to Splunk Observability Cloud, follow the instructions in :ref:`gcp-logs`
* Learn about Splunk Observability Cloud's :ref:`GCP Infrastructure Monitoring options <infrastructure-gcp>`
* To learn more about Splunk Observability Cloud's data model, refer to :ref:`data-model`
