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

Authenticate your Google account 
============================================

You need your service account keys to be able to integrate your GCP services with Splunk Observability Cloud. Check the restrictions on your organization's account keys before connecting to Splunk Observability Cloud. 

For more information, refer to: 

* GCP's docs on :new-page:`Service account keys <https://cloud.google.com/iam/docs/service-account-creds#key-types>` 
* Google's official announcement on the new permission policies at :new-page:`Introducing stronger default Org Policies for our customers <https://cloud.google.com/blog/products/identity-security/introducing-stronger-default-org-policies-for-our-customers/>`

Authenticate using Workload Identity Federation
--------------------------------------------------------------------------------------

Alternatively, if you're connecting to Splunk Observability Cloud using the API you can use :new-page:`GCP's Workload Identity Federation (WIF) <https://cloud.google.com/iam/docs/workload-identity-federation>` to access your Google Cloud resources and authenticate them. It's safer, and with WIF you won't have to export and rotate service account keys.

See how to authenticate with WIF in the Splunk Observability Cloud developer documentation at :new-page:`Integrate GCP <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview>`.

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