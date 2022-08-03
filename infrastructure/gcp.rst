.. _infrastructure-gcp:

**********************************
Monitor GCP
**********************************

.. meta::
   :description: Learn how to monitor GCP infrastructure resources with Splunk Observability Cloud.

Monitor GCP service metrics with Splunk Observability Cloud. Any user can monitor GCP services in Observability Cloud.

Before you can start monitoring any GCP resources, you have to :ref:`get-started-gcp`. You have to be an administrator to export GCP data.

Observability Cloud uses :new-page:`Google Cloud Operations <https://cloud.google.com/stackdriver/docs>` to provide robust infrastructure monitoring capabilities.

You can also export and monitor data from these sources running in your GCP environment:

.. list-table::
   :header-rows: 1
   :widths: 30, 20, 50

   * - :strong:`Get data in`
     - :strong:`Monitor`
     - :strong:`Description`

   * - :ref:`get-started-k8s`
     - :ref:`infrastructure-k8s`
     - Collect metrics and logs from Kubernetes clusters running in GCE instances or GKE.

   * - - :ref:`get-started-linux`
       - :ref:`get-started-windows`
     - :ref:`infrastructure-hosts`
     - Collect metrics and logs from Linux and Windows hosts running in GCE instances.

   * - :ref:`get-started-application`
     - :ref:`get-started-apm`
     - Collect application metrics and spans running in hosts or Kubernetes clusters.

Monitor GCP services from the Infrastructure Overview
=====================================================

View the health of GCP services at a glance from the Infrastructure Overview. This view provides a key metric for each service. You can also drill down into specific instances of a GCP service. For example, view key metrics for the GCE service, and filter for a specific ID to analyze a particular GCE instance.

Follow these steps to analyze problem GCP services from the Infrastructure Overview:

1. Select :strong:`Navigation menu > Infrastructure` and view the :strong:`Google Cloud Platform` category.
2. Select the specific service you want to analyze.
3. Compare instances of the service along the following metrics with the :strong:`Color by` dropdown menu. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. To apply visually accessible color palettes on custom dashboards and charts and throughout Infrastructure Monitoring, go to :strong:`Account Settings > Color Accessibility.`

   You can color by metrics like CPU utilization and filter by dimensions like geographic region.
4. Group instances based on metadata about each instance with the :strong:`Group by` dropdown menu.

   For example, you can see instances in groups according to the region or resource group they are running in or the environment tag. This is useful because you can see correlations between different parts of your infrastructure and its performance.
5. Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.

   Set the :strong:`Scope` to the entire population of instances or to the dimension you grouped instances by.

   There are two :strong:`Strategies` you can select to find outliers:

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Strategy`
        - :strong:`Description`

      * - ``Deviation from Mean``
        - Instances appear as red that exceed the mean value of the metric by at least three standard deviations. This setting is helpful for finding extreme outliers.

      * - ``Deviation from Median``
        - Instances appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.
6. Select a specific instance you want to investigate further to view all the metadata and key metrics for the instance. For every instance, Observability Cloud provides a default dashboard.

   Analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series for key metrics with a 10-second resolution.

Use default dashboards to monitor GCP services
==============================================

Observability Cloud provides default dashboards for supported GCP services. Default dashboards are available in dashboard groups based on the GCP service a dashboard represents data for.

To find default dashboards for GCP services, select :strong:`Navigation menu > Dashboards` and search for the GCP service you want to view dashboards for.

Explore built-in content
========================

Splunk Observability Cloud collects data from many cloud services. To see all of the navigators provided for data collected in your organization, go to the Infrastructure page. To see all the pre-built dashboards for data collected in your organization, go to :strong:`Dashboards > Built-in`.


..
  Supported GCP services
  ======================

  You can monitor these GCP services in Observability Cloud:

  .. hlist::
    :columns: 2

    - App Engine
    - BigQuery
    - Cloud Bigtable
    - Cloud Composer
    - Cloud Dataflow
    - Cloud Dataproc
    - Cloud Datastore
    - Cloud Filestore
    - Cloud Functions
    - Cloud Interconnect Dedicated
    - Cloud Internet of Things Core
    - Cloud Machine Learning
    - Cloud Pub/Sub
    - Cloud Router
    - Cloud Run
    - Cloud SQL
    - Cloud Spanner
    - Cloud Storage
    - Cloud Tasks
    - Cloud VPN
    - Compute Engine
    - Compute Engine HTTP(S) Load Balancing
    - Container Engine
    - Firebase Database
    - Firebase Hosting
    - Google Cloud Endpoints APIs
    - Knative
    - Kubernetes (GKE)
    - Memorystore for Redis
    - Stackdriver Logging
    - Stackdriver Monitoring
