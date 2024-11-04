.. _gcp-connect:

*********************************************************************
Connect to Google Cloud Platform: Guided setup and other options 
*********************************************************************

.. meta::
   :description: Connect your Google Cloud Platform / GCP account to Splunk Observability Cloud.

Connect to GCP using the guided setup
============================================

Follow these steps to connect to GCP:

#. :ref:`gcp-one`
#. :ref:`gcp-two`
#. :ref:`gcp-three`

.. _gcp-one:

1. Select a role for your GCP service account
--------------------------------------------------------------------------------------

You can use GCP's :strong:`Viewer` role as it comes with the permissions you need for most scenarios. 

Alternatively you can create a more restrictive role using the permissions in the table:

.. list-table::
   :header-rows: 1
   :widths: 35 45 20

   *  - :strong:`Permission`
      - :strong:`Required?`
      - :strong:`Included in GCP's Viewer role?`

   *  - ``compute.instances.list``
      - Yes, if the Compute Engine service is activated
      - Yes

   *  - ``compute.machineTypes.list``
      - Yes, if the Compute Engine service is activated
      - Yes

   *  - ``container.clusters.list``
      - Yes, if the Kubernetes (GKE) service is activated
      - Yes

   *  - ``container.nodes.list``
      - Yes, if the Kubernetes (GKE) service is activated
      - Yes

   *  - ``container.pods.list``
      - Yes, if the Kubernetes (GKE) service is activated
      - Yes

   *  - ``monitoring.metricDescriptors.get``
      - Yes
      - Yes

   *  - ``monitoring.metricDescriptors.list``
      - Yes
      - Yes

   *  - ``monitoring.timeSeries.list``
      - Yes
      - Yes

   *  - ``resourcemanager.projects.get``
      - Yes, if you want to sync project metadata (such as labels)
      - Yes

   *  - ``serviceusage.services.use``
      - Yes, if you either want to activate the use of a quota from the project where metrics are stored or sync cloud sql metadata
      - No, but included in ``roles/serviceusage.serviceUsageConsumer``

   *  - ``spanner.instances.list``
      - Yes, if the Spanner service is activated
      - Yes

   *  - ``storage.buckets.list``
      - Yes, if the Spanner service is activated
      - Yes

   *  - ``cloudsql.databases.list``
      - Yes, if the cloud sql service is activated
      - Yes

   *  - ``cloudsql.instances.list``
      - Yes, if the cloud sql service is activated
      - Yes

   *  - ``pubsub.topics.list``
      - Yes, if the pub/sub service is activated
      - Yes

   *  - ``pubsub.subscriptions.list``
      - Yes, if the pub/sub service is activated
      - Yes

   *  - ``run.jobs.list``
      - Yes, if the cloud run service is activated
      - Yes

   *  - ``run.revisions.list``
      - Yes, if the cloud run service is activated
      - Yes

   *  - ``cloudasset.assets.searchAllResources``
      - Yes, if the cloud run service is activated
      - Yes

   *  - ``cloudfunctions.functions.list``
      - Yes, if the cloud functions service is activated
      - Yes


.. _gcp-two:

2. Configure GCP
--------------------------------------------------------------------------------------

To configure your GCP service, follow these steps:

#. In a new window or tab, go to the Google Cloud Platform website, and log into your GCP account.
#. Open the GCP web console, and select a project you want to monitor.
#. From the sidebar, select :menuselection:`IAM & admin`, then :menuselection:`Service Accounts`.
#. Go to :guilabel:`Create Service Account` at the top of the screen, and complete the following fields:

   .. list-table::
      :header-rows: 1
      :widths: 40 60

      *  - :strong:`Field`
         - :strong:`Description`

      *  - Service account name
         - Enter ``Splunk``.

      *  - Service account ID
         - This field autofills after you enter ``Splunk`` for Service account name.

      *  - Service account description
         - Enter the description for your service account.

#. Select :guilabel:`CREATE`.
#. (Optional) Select a role to grant this Service account access to the selected project, then select :guilabel:`CONTINUE`.
#. Activate Key type :guilabel:`JSON`, and select :guilabel:`CREATE`. A new service account key JSON file is then downloaded to your computer.
#. In a new window or tab, go to :new-page:`Cloud Resource Manager API <https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com?pli=1>`, and activate the Cloud Resource Manager API. You need to activate this API so Splunk Infrastructure Monitoring can use it to validate permissions on the service account keys.

.. _gcp-projects:

.. note:: To monitor multiple GCP projects, repeat the steps described in this section for each one of the projects.

.. _gcp-three:

3. Start the integration
--------------------------------------------------------------------------------------

By default, all supported services are monitored, and any new services added later are also monitored. When you set integration parameters, you can choose to import metrics from a subset of the available services.

#. Log in to Splunk Observability Cloud. 
#. Open the :new-page:`Google Cloud Platform guided setup <https://login.signalfx.com/#/integrations/gcp>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   
   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.

   #. In the :guilabel:`Cloud Integrations` section, select the :guilabel:`Google Cloud Platform` tile to open the Google Cloud Platform guided setup.

   #. Go to :guilabel:`New Integration`.

#. Enter a name for the new GCP integration, then :guilabel:`Add Project`. 
#. Next, select :guilabel:`Import Service Account Key`, and select one or more of the JSON key files that you downloaded from GCP in :ref:`Configure GCP <gcp-two>`.
#. Select :guilabel:`Open`. You can then see the project IDs corresponding to the service account keys you selected.
#. To import :ref:`metrics <gcp-metrics>` from only some of the available services, follow these steps:

   - Go to :guilabel:`All Services` to display a list of the services you can monitor.
   - Select the services you want to monitor, and then :guilabel:`Apply`.

#.  Select the rate (in seconds) at which you want Splunk Observability Cloud to poll GCP for metric data, with 1 minute as the minimum unit, and 10 minutes as the maximum unit. For example, a value of 300 polls metrics once every 5 minutes. 
#. Optional: 

   - List any additional GCP service domain names that you want to monitor, using commas to separate domain names in the :strong:`Custom Metric Type Domains` field. 
      
      - For example, to obtain Apigee metrics, add ``apigee.googleapis.com``.
      - To learn about custom metric type domain syntax, see :new-page:`Custom metric type domain examples <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview#Custom-metric-type-domain-examples>` in the Splunk developer documentation.

   - If you select Compute Engine as one of the services to monitor, you can enter a comma-separated list of Compute Engine Instance metadata keys to send as properties. These metadata keys are sent as properties named ``gcp_metadata_<metadata-key>``.

   - Select :strong:`Use quota from the project where metrics are stored` to use a quota from the project where metrics are stored. The service account provided for the project needs either the ``serviceusage.services.use`` permission, or the `Service Usage Consumer` role.

Your GCP integration is now complete.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

Alternatives to connect to GCP
============================================

.. _gcp-api:

Integrate GCP using the API 
--------------------------------------------------------------------------------------

You can also integrate GCP with Splunk Observability Cloud using the GCP API. See :new-page:`Integrate Google Cloud Platform Monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview#Specifying-custom-metric-type-domains>` in our developer portal for details.

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
