.. _infrastructure-gcp:

**********************************
Monitor Google Cloud Platform
**********************************

.. meta::
   :description: Learn how to monitor GCP infrastructure resources with Splunk Observability Cloud.

.. note::
   To start monitoring Google Cloud Platform resources, you must first connect to GCP, and log in with your administrator credentials. See :ref:`get-started-gcp` for details.

Monitor Google Cloud Platform (GCP) service metrics with Splunk Observability Cloud. Observability Cloud provides infrastructure monitoring features using Google Cloud Operations. See the Google Cloud documentation for more information.

You can also export and monitor data from these sources running in your GCP environment, as described in the following table.

.. list-table::
   :header-rows: 1
   :widths: 30, 20, 50

   * - :strong:`Get data in`
     - :strong:`Monitor`
     - :strong:`Description`

   * - :ref:`get-started-k8s`
     - :ref:`infrastructure-k8s`
     - Collect metrics and logs from Kubernetes clusters running in Google Compute Engine (GCE) or Google Kubernetes Engine (GKE) instances.

   * - - :ref:`get-started-linux`
       - :ref:`get-started-windows`
     - :ref:`infrastructure-hosts`
     - Collect metrics and logs from Linux and Windows hosts running in GCE instances.

   * - :ref:`get-started-application`
     - :ref:`get-started-apm`
     - Collect application metrics and spans running in hosts or Kubernetes clusters.

.. _monitor-gcp-services:

Monitor GCP services and identify problems
=====================================================

View the health of GCP services at a glance from the Infrastructure page. This page provides a key metric for each service. You can also drill down into specific instances of a GCP service. For example, view key metrics for the GCE service, and filter for a specific ID to analyze a particular GCE instance.

Follow these steps to analyze problems with GCP services from the Infrastructure page:

1. Select :strong:`Navigation menu > Infrastructure` and view the :strong:`Google Cloud Platform` category.
2. Select the specific service you want to analyze. For example, select :strong:`Cloud Storage` to view metrics for a specific bucket. If you see “No Data Found,” you need to first configure an integration.
3. Compare instances of the service along the following metrics with the :strong:`Color by` drop-down list. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. To apply visually accessible color palettes on custom dashboards and charts and throughout Infrastructure Monitoring, select :strong:`Account Settings > Color Accessibility.`

   You can color by metrics like CPU utilization and filter by dimensions like geographic region.
4. Group instances based on metadata about each instance with the :strong:`Group by` drop-down list.

   You can group instances according to the region or resource group they are running in or the environment tag. Use this to see correlations between different parts of your infrastructure and its performance.
5. Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.

   Set the :strong:`Scope` to analyze outliers from across the entire visible population of instances, or only within groups defined by the dimension or property you grouped instances by.

   You can select one of two :strong:`Strategies` to find outliers, as described in the following table.

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Strategy`
        - :strong:`Description`

      * - ``Deviation from Mean``
        - Instances appear as red that exceed the mean value of the metric by at least three standard deviations. Use this setting to find the most extreme outliers.
      * - ``Deviation from Median``
        - Instances appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.
6. Select a specific instance you want to investigate further to view all the metadata and key metrics for the instance. For every instance, Observability Cloud provides a default dashboard.

   Analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series (MTS) for key metrics.

Use default dashboards to monitor GCP services
==============================================

Splunk Observability Cloud provides default dashboards for supported GCP services. Default dashboards are available in dashboard groups based on the GCP service that a dashboard represents data for.

To find default dashboards for GCP services, select :strong:`Navigation menu > Dashboards` and search for the GCP service you want to view dashboards for.

Explore built-in content
========================

Observability Cloud collects data from many cloud services. To see all of the navigators provided for data collected in your organization, go to the Infrastructure page. To see all the pre-built dashboards for data collected in your organization, select :strong:`Dashboards > Built-in`.

.. note::

  GCP Compute Engine instances are powered by their respective public cloud service as well as the Splunk Distribution of OpenTelemetry Collector. You need both for all the charts to display data in the built-in dashboards.

  - If you have only the public cloud service and the Smart Agent configured, some charts in the built-in dashboards for GCP Compute Engine instances display no data.
  - If you have only the public cloud service configured, you can see all the cards representing the services where data come from, but some charts in the built-in dashboards for GCP Compute Engine instances display no data.
  - If you have only Smart Agent configured, GCP Compute Engine instance navigator isn't available.


.. _gcp-unique-id:

Uniquely identifying Google Cloud Platform resources
=============================================================================

All of the metrics that the StackDriver integration sends contain a dimension called ``gcp_id``. The value of this dimension starts with the project ID that contains the resource followed by ``_`` (underscore) and then other properties specific to that resource. If you install collectd on a Compute Engine instance using the :new-page:`standard install script <https://github.com/signalfx/signalfx-collectd-installer>` this dimension is automatically added.

The simplest way to manually send metrics with this dimension to discover the unique ID value is to find a time series that contains this dimension using the Metadata Catalog. The time series should contain other dimensions that give a more friendly identification to the underlying Google Cloud Platform resource.

Dimensions
=============================================================================

The metric time series associated with Google Cloud Platform metrics have the following generic dimensions that are common to all services.

.. list-table::
    :header-rows: 1

    * - :strong:`Dimension name`
      - :strong:`Description`

    * - ``gcp_id``
      - unique identifier for GCP objects

    * - ``project_id``
      - project ID of the monitored resource

    * - ``monitored_resource``
      - name of the monitored resource

    * - ``service``
      - service to which the metric belongs

Apart from the above dimensions, each service also has a dimension that identifies the resource to which the metric belongs. For example, Compute instances have an ``instance_id`` dimension to identify an instance, and Storage buckets have a ``bucket_name`` dimension to identify a bucket.

Resource metadata
=============================================================================

The Google Cloud Platform integration also queries the GCP API for metadata about the resources it is monitoring, so you can filter and group metrics by this metadata in charts and in the Infrastructure Navigator.

-  Metadata that are common to all services within a project (project-level metadata) are put on properties of ``project_id`` dimension.

-  Metadata that are service-specific (service-level metadata) are put on properties of the ``gcp_id`` dimension.

Project-level metadata
------------------------------

Here is the metadata that is currently synced at a project level:

.. list-table::
    :header-rows: 1

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``creationTimestamp``
      - ``gcp_project_creation_time``
      - time project was created (e.g. ``Thu Oct 19 18:16:25 UTC 2017``)

    * - Labels \*
      - ``gcp_project_label_<name-of-label>`` (if user has labels)
      - all project-wide labels except for ``signalfx-id``

    * - ``name``
      - ``gcp_project_name``
      - human readable project name

    * - ``project_number``
      - ``gcp_project_number``
      - project_number given by GCP

    * - ``status``
      - ``gcp_project_status``
      - project status (e.g. ``ACTIVE``, ``DELETE_IN_PROGRESS``, ``DELETE_REQUESTED``)

\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_project_label_key1`` and ``gcp_project_label_key2``.)


Service-level metadata
------------------------------

Here is the metadata that is synced at a service level for the services listed below.


.. _compute-engine-properties:

Compute Engine instance
++++++++++++++++++++++++++++

For Google Cloud Platform Compute Engine instances, Infrastructure Monitoring gets a subset of metadata about the instance, as well as custom metadata specified by the user at an instance level.

.. note::
   The Compute Engine instance metadata table includes two custom properties that are now deprecated, as well as information about which properties replace the deprecated properties.

:strong:`Compute Engine instance metadata`

.. list-table::
    :header-rows: 1

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - Whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user)

    * - ``scheduling.onHostMaintenance``
      - ``gcp_behavior_on_maintenance``
      - Maintenance behavior for the instance

    * - ``scheduling.preemptible``
      - ``gcp_preemptibility``
      - True if the instance is preemptible; otherwise false

    * - ``cpuPlatform``
      - ``gcp_cpu_platform``
      - CPU platform used by this instance

    * - ``CPU``
      - ``gcp_cpus``
      - Number of virtual CPUs that are available to the instance

    * - ``creationTimestamp``
      - ``gcp_creation_time``
      - Time when the instance was created,  (e.g. ``Thu Oct 19 18:16:25 UTC 2017``)

    * - ``description``
      - ``gcp_description``
      - Description of this instance

    * - ``disks[].licenses[]`` \*
      - ``gcp_image_license``
      - License corresponding to the disks used by the instance

    * - ``canIpForward``
      - ``gcp_ip_forward``
      - Whether to allow this instance to send and receive packets with non-matching destination or source IPs

    * - ``machineType``
      - ``gcp_machine_type``
      - Type of gcp machine to which this instance corresponds

    * - ``memory``
      - ``gcp_memory``
      - Amount of physical memory available to the instance, defined in MB

    * - ``metadata`` \*\*
      - ``gcp_metadata_<metadata-key>``
      - Custom metadata key for the instance (generated based on includelisted properties specified when :ref:`completing the integration in Splunk Infrastructure Monitoringx<gcp-three>`)

    * - ``status``
      - ``gcp_status``
      - String containing instance status and status code, for example ``Code=2, Status=RUNNING``. This property is now deprecated, and won't contain new statuses introduced by GCP such as ``REPAIRING`` or ``SUSPENDING``. Use ``gcp_instance_status`` instead.

    * - ``status``
      - ``gcp_instance_status``
      - Status of the instance, for example ``RUNNING`` or ``STAGING``.

    * - ``self_link``
      - ``gcp_self_link``
      - Instance self link as reported by GCP

    * - ``standard_id``
      - ``gcp_standard_id``
      - Instance ID in a format enforced by Splunk Observability Cloud, for example ``https://compute.googleapis.com/compute/v1/projects/testProject/zones/us-central1-a/instances/testInstance``. This property is now deprecated. Use ``gcp_self_link`` instead.

\* There is not a one-to-one mapping between the gcp_image_license property to one in GCP because the property value is derived from the licenses of the disks associated with the compute instance.

\*\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:val1``, ``key2:val2``] as the metadata property, we will have two properties: ``gcp_metadata_key1`` and ``gcp_metadata_key2``.)

For detailed information on properties, see Google Cloud documentation.

Cloud Spanner instance
++++++++++++++++++++++++++++++++

Spanner instances currently sync the following properties:

.. list-table::
    :header-rows: 1

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``state``
      - ``gcp_state``
      - state of the spanner instance (e.g. ``CREATING``, ``READY``)

    * - Labels \*
      - ``gcp_label_<name-of-label>`` (if user has labels)
      - user |hyph| specified labels

\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_label_key1`` and ``gcp_label_key2``.)

Cloud Storage Bucket
+++++++++++++++++++++++++++++++++++++

Storage buckets currently sync the following properties:

.. list-table::
    :header-rows: 1

    * -   :strong:`GCP name`
      -   :strong:`Custom property`
      -   :strong:`Description`

    * -   ``creationTimestamp``
      -   ``gcp_creation_time``
      -   time at which the bucket was created,  (e.g. ``Thu Oct 19 18:16:25 UTC 2017``)

    * -  Labels \*
      -   ``gcp_label_<name-of-label>`` (if user has labels)
      -   user |hyph| specified labels

    * -   Storage class
      -   ``gcp_storage_class``
      -   bucket's storage class, such as ``coldline``

\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_label_key1`` and ``gcp_label_key2``.)


Supported GCP services
======================

You can monitor the following :ref:`GCP services <gcp-integrations>` in Observability Cloud.
