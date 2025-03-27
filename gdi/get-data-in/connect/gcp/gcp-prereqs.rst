.. _gcp-prereqs:

********************************************************
GCP authentication, permissions and supported regions 
********************************************************

.. meta::
   :description: Connect your Google Cloud Platform / GCP account to Splunk Observability Cloud.

.. _gcp-prerequisites:

Prerequisites
============================================

You must be an administrator of your Splunk Observability Cloud organization to create a GCP connection.

.. _gcp-prereqs-authenticate:

Authenticate your Google account 
============================================

Authenticate using Workload Identity Federation (recommended)
--------------------------------------------------------------------------------------

Use Workload Identity Federation (WIF) to authenticate your GCP account in Splunk Observability Cloud. It's safer, and with WIF you won't have to export and rotate service account keys.

To set up Workload Identity Federation to authenticate Splunk Observability Cloud to access your GCP Cloud Monitoring data take these steps: 

#. Follow the instructions in the :new-page:`Workload Identity Federation Setup Utils <https://github.com/signalfx/gcp_workload_identity_federation>` GitHub repo.

#. Run the :new-page:`Workload Identity Federation Setup Script <https://github.com/signalfx/gcp_workload_identity_federation/blob/main/cli/README.md>` or use the :new-page:`Terraform Setup Module <https://github.com/signalfx/gcp_workload_identity_federation/blob/main/terraform/README.md>`.

To learn more refer to GCP's :new-page:`Workload Identity Federation <https://cloud.google.com/iam/docs/workload-identity-federation>` documentation.

Authenticate using Service Account Keys
--------------------------------------------------------------------------------------

Alternatively you can use your service account keys to integrate your GCP services with Splunk Observability Cloud. Before you proceed read Google's official announcement on GCP permission policies at :new-page:`Introducing stronger default Org Policies for our customers <https://cloud.google.com/blog/products/identity-security/introducing-stronger-default-org-policies-for-our-customers/>`.

To authenticate using your service account keys go to the GCP console and follow these steps:

#. From the sidebar, select :menuselection:`IAM & admin`, then :menuselection:`Service Accounts`.

#. Go to :guilabel:`Create Service Account` at the top of the screen, complete the following fields, and select :guilabel:`CREATE`.

   * **Service account name**. Enter ``Splunk``.

   * **Service account ID**. This field autofills after you enter ``Splunk`` for Service account name.

   * **Service account description**. Enter the description for your service account.

#. Select a role to grant this Service account access to the selected project, then select :guilabel:`CONTINUE`.

#. Activate Key type :guilabel:`JSON`, and select :guilabel:`CREATE`. A new service account key JSON file is then downloaded to your computer. You will need this key to authenticate in the :guilabel:`Import Service Account Key` step in Splunk Observability Cloud.

#. In a new window or tab, go to :new-page:`Cloud Monitoring API <https://cloud.google.com/monitoring/api/v3>` and activate it. Splunk Observability Cloud uses this API to validate permissions on the service account keys.

For more information, refer to GCP's docs on :new-page:`Service account keys <https://cloud.google.com/iam/docs/service-account-creds#key-types>`. 

.. _gcp-prereqs-role-permissions:

GCP role permissions
============================================

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

.. _gcp-prereqs-regions:

Supported regions 
============================================

Splunk Observability Cloud supports all GCP regions. 