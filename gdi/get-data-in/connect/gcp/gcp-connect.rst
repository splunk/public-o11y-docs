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

1. Define a role for your GCP service account
--------------------------------------------------------------------------------------

Use GCP's :strong:`Viewer` role as it comes with the permissions you need for most scenarios.

To customize the permissions for your role refer to :ref:`gcp-prereqs-role-permissions`.

.. _gcp-two:

2. Configure GCP
--------------------------------------------------------------------------------------

To configure your GCP service: 

#. Log into your GCP account and select the project you want to monitor in the GCP web console.

#. From the sidebar, select :menuselection:`IAM & admin`, then :menuselection:`Service Accounts`.

#. Go to :guilabel:`Create Service Account` at the top of the screen, complete the following fields, and select :guilabel:`CREATE`.

   * **Service account name**. Enter ``Splunk``.

   * **Service account ID**. This field autofills after you enter ``Splunk`` for Service account name.

   * **Service account description**. Enter the description for your service account.

#. (Optional) Select a role to grant this Service account access to the selected project, then select :guilabel:`CONTINUE`.

#. Activate Key type :guilabel:`JSON`, and select :guilabel:`CREATE`. A new service account key JSON file is then downloaded to your computer. You will need this key to authenticate in Splunk Observability Cloud.

#. In a new window or tab, go to :new-page:`Cloud Resource Manager API <https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com?pli=1>`, and activate the Cloud Resource Manager API. You need to activate this API so Splunk Observability Cloud can use it to validate permissions on the service account keys.

.. _gcp-projects:

.. note:: To monitor multiple GCP projects, repeat the steps described in this section for each one of the projects.

.. _gcp-three:

3. Connect to Splunk Observability Cloud and start the integration
--------------------------------------------------------------------------------------

By default, Splunk Observability Cloud monitors all supported services, and any new services added later are also monitored. When you set integration parameters, you can choose to import metrics from a subset of the available services.

#. Log in to Splunk Observability Cloud and open the :new-page:`Google Cloud Platform guided setup <https://login.signalfx.com/#/integrations/gcp>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.
   
   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.

   #. In the :guilabel:`Cloud Integrations` section, select the :guilabel:`Google Cloud Platform` tile to open the Google Cloud Platform guided setup.

#. In the GCP guided setup enter a name for your new GCP integration, then :guilabel:`Add Project`. 

#. Next, select :guilabel:`Import Service Account Key`, and select one or more of the JSON key files that you downloaded from GCP in :ref:`Configure GCP <gcp-two>`.

#. Select :guilabel:`Open`. You can then see the project IDs corresponding to the service account keys you selected.

#. To import :ref:`metrics <gcp-metrics>` from only some of the available services, follow these steps:

   - Go to :guilabel:`All Services` to display a list of the services you can monitor.
   - Select the services you want to monitor, and then :guilabel:`Apply`.

#. Select the rate (in seconds) at which you want Splunk Observability Cloud to poll GCP for metric data, with 1 minute as the minimum unit, and 10 minutes as the maximum unit. For example, a value of 300 polls metrics once every 5 minutes. 

Your GCP integration is now complete.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

Options
++++++++

Optionally you can: 

* To list any additional GCP service domain names that you want to monitor, use commas to separate domain names in the :strong:`Custom Metric Type Domains` field. For example, to obtain Apigee metrics, add ``apigee.googleapis.com``.

   - For information on the available GCP metric domains refer to the official GCP docs at :new-page:`Google Cloud metrics <https://cloud.google.com/monitoring/api/metrics_gcp>`. 

   - To learn about custom metric type domain syntax, see :new-page:`Custom metric type domain examples <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview#Custom-metric-type-domain-examples>` in the Splunk developer documentation.

* If you select Compute Engine as one of the services to monitor, you can enter a comma-separated list of Compute Engine Instance metadata keys to send as properties. These metadata keys are sent as properties named ``gcp_metadata_<metadata-key>``.

* Select :strong:`Use quota from the project where metrics are stored` to use a quota from the project where metrics are stored. The service account provided for the project needs either the ``serviceusage.services.use`` permission, or the `Service Usage Consumer` role.

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
